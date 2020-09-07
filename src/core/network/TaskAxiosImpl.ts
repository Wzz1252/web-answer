import Task from "./Task";
import RequestSuccessListener from "./RequestSuccessListener";
import RequestFailListener from "./RequestFailListener";
import RequestUploadProgressListener from "./RequestUploadProgressListener";
import Request from "./Request";
import RequestConfig from "./RequestConfig";
import {RequestState} from "./enum/RequestState";
import RequestDownloadProgressListener from "./RequestDownloadProgressListener";
import TextUtils from "../../utils/TextUtils";
import Logger from "../Logger";
import {RequestMethod} from "./enum/MethodEnum";
import Header from "./entity/Header";
import ResponseEntity from "./entity/ResponseEntity";
import ResponseDataEntity from "./entity/ResponseDataEntity";
import axios, {AxiosPromise, AxiosResponse, CancelTokenSource} from "axios";
import qs from "qs";

const TAG = "NewTaskAxiosImpl";

/**
 * 基于 Axios 的网络请求类
 */
export default class TaskAxiosImpl<T> implements Task<T> {
	public successListener: Array<RequestSuccessListener<T>> = new Array<RequestSuccessListener<T>>();
	public failListener: Array<RequestFailListener<T>> = new Array<RequestFailListener<T>>();
	public uploadProgressListener?: RequestUploadProgressListener;
	public downloadProgressListener?: RequestUploadProgressListener;

	private request!: Request<T>;
	private requestConfig!: RequestConfig;
	private axiosTask!: AxiosPromise<T>;
	private cancelTokenSource!: CancelTokenSource;

	/**
	 * 当前请求的状态，以后用于重置任务
	 */
	private state: RequestState = RequestState.NONE;

	/**
	 * 是否已经终止任务，如果终止，重试等任务将不再执行
	 */
	private isAbort: boolean = false;
	private retry: number = 0;
	/**
	 * 当前重试次数
	 */
	private currentRetry: number = 0;

	public constructor() {
		this.createCancelToken();
	}

	public setRequestConfig(config: RequestConfig): void {
		this.requestConfig = config;
	}

	public setRequest(request: Request<T>): void {
		this.request = request;
	}

	public run(): void {
		this.createRequest(this.request);
	}

	/**
	 * 终止当前任务
	 */
	public abort(): void {
		this.isAbort = true;
		if (this.axiosTask && this.cancelTokenSource) {
			this.cancelTokenSource.cancel("fail abort");
		}
	}

	public addSuccessListener(listener: RequestSuccessListener<T>): void {
		this.successListener.push(listener);
	}

	public addFailListener(listener: RequestFailListener<T>): void {
		this.failListener.push(listener);
	}

	public setUploadProgressListener(listener: RequestUploadProgressListener): void {
		this.uploadProgressListener = listener;
	}

	public setDownloadProgressListener(listener: RequestDownloadProgressListener): void {
		this.downloadProgressListener = listener;
	}

	/**
	 * 获得当前任务的状态
	 */
	public getState(): RequestState {
		return this.state;
	}

	private initRequestConfig(): void {
		// 如果没有，创建一个默认的
		if (!this.requestConfig) {
			this.requestConfig = new RequestConfig();
		}
		this.retry = this.requestConfig.getRetry();
	}

	private setRetry(retry: number): void {
		this.retry = retry;
	}

	/**
	 * axios 清理
	 */
	private createCancelToken(): void {
		let cancelToken = axios.CancelToken;
		this.cancelTokenSource = cancelToken.source();
	}

	private async createRequest(request: Request<T>) {
		if (TextUtils.isEmpty(request.getUrl())) {
			this.callFailListener("-1", "fail 任务执行失败: URL 不能为 null", null);
			return;
		}

		// request 特殊前置处理
		let front = await request.getFrontListener();
		if (front) {
			await front(request);
		}

		Logger.log(TAG, "请求任务: ", request.getMethod(), request.getUrl());
		this.initRequestConfig();

		let url = request.getUrl();
		let data = this.disposeDataIsNull(request.getData());
		let method = request.getMethod() || RequestMethod.GET;
		let headers = this.parseHeaders(request.getHeaders());
		headers = this.disposeHeader(headers);

		this.state = RequestState.RUNNING;
		this.axiosTask = this.createStandardAxios(url, method, data, headers)
		// @ts-ignore
			.then((result: AxiosResponse<ResponseDataEntity<T>>) => {
				if (String(result.status) === "200") {
					let serviceData = result.data;
					if (String(serviceData.code) === "200") {
						this.callSuccessListener(serviceData.data, result, request);
					} else {
						this.handleFail(serviceData.code, serviceData.message, serviceData.data);
					}
				} else {
					this.handleFail("-1", "HTTP 错误", null);
				}
			})
			.catch((errData: any) => {
				if ("fail abort" == errData.message) {
					Logger.log(TAG, "任务终止: ", request.getUrl());
				} else {
					this.handleFail("-1", errData.message, null);
				}
			});
	}

	/**
	 * 创建标准的 Axios
	 */
	private createStandardAxios(url: string, method: RequestMethod, data: any, headers: any): AxiosPromise<T> {
		// 如果是表单形式提交，则对 transformRequest 进行特殊处理
		let isForm = headers["content-type"] === "application/x-www-form-urlencoded";
		// 如果是 GET 请求，就将 Key 改为 params
		let dataMode = method === RequestMethod.GET ? "params" : "data";
		let axio = axios({
			// @ts-ignore
			url: url,
			method: method,
			[dataMode]: data,
			headers: headers,
			cancelToken: this.cancelTokenSource.token,
			transformRequest: isForm
				? [
					(data: any, headers: any): any => {
						if (data && headers.post && ~headers.post["Content-Type"].indexOf("form-urlencoded")) {
							return qs.stringify(data);
						}
						return JSON.stringify(data);
					},
				]
				: undefined,
			paramsSerializer: (params: any): any => {
				return qs.stringify(params, {arrayFormat: "repeat"});
			},
			onUploadProgress: (progressEvent: any): any => {
				if (this.uploadProgressListener) {
					this.uploadProgressListener(progressEvent);
				}
			},
			onDownloadProgress: (progressEvent: any): any => {
				if (this.downloadProgressListener) {
					this.downloadProgressListener(progressEvent);
				}
			},
		});
		return axio;
	}

	/**
	 * 将数组形式的 Header 转换成 Json 对象的形式
	 */
	private parseHeaders(headers: Array<Header>): Object {
		let header = {} as any;
		headers.forEach((value: any): void => {
			header[value.key] = value.value;
		});
		return header;
	}

	/**
	 * 处理请求数据中 null 的问题，如果传入的是一个null，就将他忽略
	 */
	private disposeDataIsNull(data: any): Object {
		let newData = {} as any;
		let oldData = data || ({} as any);
		if (data instanceof Array) {
			newData = oldData;
		} else {
			for (let dataKey in oldData) {
				if (!oldData.hasOwnProperty(dataKey)) {
					continue;
				}
				let dataValue = oldData[dataKey] /*|| null*/; // 如果是 null 或者 "" 统一不传
				if (dataValue != undefined) {
					newData[dataKey] = dataValue;
				}
			}
		}
		return newData;
	}

	private callSuccessListener(data: T, result: AxiosResponse<ResponseDataEntity<T>>, request: Request<T>): void {
		this.state = RequestState.SUCCESS;
		Logger.log(TAG, "请求成功: ", request.getMethod(), request.getUrl());

		let response = new ResponseEntity<T>();
		response.headers = result.headers;
		response.request = request;
		for (let i = 0; i < this.successListener.length; i++) {
			this.successListener[i](data, response);
		}
	}

	private callFailListener(code: string, message: string, data: any): void {
		this.state = RequestState.FAIL;
		let error = new ResponseDataEntity<T>();
		error.code = code;
		error.message = message;
		error.data = data;
		for (let i = 0; i < this.failListener.length; i++) {
			this.failListener[i](error);
		}
	}

	private handleFail(code: string, message: string, data: any): void {
		if (this.isAbort) {
			this.callFailListener(code, message, data);
			return;
		}
		if (this.isRetry()) {
			this.currentRetry++;
			Logger.log(TAG, "任务失败，开始重试，重试次数：", this.currentRetry);
			this.run();
			return;
		}
		this.callFailListener(code, message, data);
	}

	private isRetry(): boolean {
		return this.retry !== this.currentRetry;
	}

	private disposeHeader(header: any): Object {
		header = header || {};
		return header;
	}

	getRequest(): Request<T> {
		return this.request;
	}
}
