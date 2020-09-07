import Task from "./Task";
import RequestSuccessListener from "./RequestSuccessListener";
import RequestFailListener from "./RequestFailListener";
import RequestUploadProgressListener from "./RequestUploadProgressListener";
import Request from "./Request";
import RequestConfig from "./RequestConfig";
import { RequestState } from "./enum/RequestState";
import RequestDownloadProgressListener from "./RequestDownloadProgressListener";
import TextUtils from "../../utils/TextUtils";
import Logger from "../Logger";
import { RequestMethod } from "./enum/MethodEnum";
import Header from "./entity/Header";
import ResponseEntity from "./entity/ResponseEntity";
import ResponseDataEntity from "./entity/ResponseDataEntity";

const TAG = "NewTaskWxImpl";

/**
 * 基于 微信Request 的网络请求类
 */
export default class TaskWxImpl<T> implements Task<T> {
    public successListener: Array<RequestSuccessListener<T>> = new Array<RequestSuccessListener<T>>();
    public failListener: Array<RequestFailListener<T>> = new Array<RequestFailListener<T>>();
    public uploadProgressListener?: RequestUploadProgressListener;
    public downloadProgressListener?: RequestUploadProgressListener;

    private request!: Request<T>;
    private requestConfig!: RequestConfig;
    private requestTask!: any;
    // private cancelTokenSource!: CancelTokenSource;

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

    public constructor() {}

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
        if (this.requestTask) {
            this.requestTask.abort();
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

    // @ts-ignore
    private async createRequest(request: Request<T>) {
        if (TextUtils.isEmpty(request.getUrl())) {
            this.callFailListener("-1", "fail 任务执行失败: URL 不能为 null");
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

        // TODO 通用 sessionId
        // data.sessionId = AppStorage.getSessionId();

        this.state = RequestState.RUNNING;
        this.requestTask = this.createStandardWx(
            url,
            method,
            data,
            headers,
            (result: any) => {
                if (String(result.statusCode) === "200") {
                    let serviceData = result.data;
                    if (String(serviceData.code) === "200") {
                        this.callSuccessListener(serviceData.data, result, request);
                    } else {
                        this.handleFail(serviceData.code, serviceData.message);
                    }
                } else {
                    this.handleFail("-1", "HTTP 错误");
                }
            },
            (errData: any) => {
                if ("fail abort" == errData.message) {
                    Logger.log(TAG, "任务终止: ", request.getUrl());
                } else {
                    this.handleFail("-1", errData.message);
                }
            }
        );
    }

    /**
     * 创建标准的 Axios
     */
    private createStandardWx(url: string, method: RequestMethod, data: any, headers: any, success: any, fail: any): any {
        // @ts-ignore
        return uni.request({
            url: url,
            method: method,
            data: data,
            header: headers,
            success(res: any) {
                console.log("success: ", res);
                if (success) {
                    success(res);
                }
            },
            fail(res: any) {
                console.log("fail: ", res);
                if (fail) {
                    fail(res);
                }
            },
        });
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
    private disposeDataIsNull(data: any): any {
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

    private callSuccessListener(data: T, result: any, request: Request<T>): void {
        this.state = RequestState.SUCCESS;
        Logger.log(TAG, "请求成功: ", request.getMethod(), request.getUrl());

        let response = new ResponseEntity<T>();
        response.headers = result.headers;
        response.request = request;
        for (let i = 0; i < this.successListener.length; i++) {
            this.successListener[i](data, response);
        }
    }

    private callFailListener(code: string, message: string): void {
        this.state = RequestState.FAIL;
        let error = new ResponseDataEntity<T>();
        error.code = code;
        error.message = message;
        for (let i = 0; i < this.failListener.length; i++) {
            this.failListener[i](error);
        }
    }

    private handleFail(code: string, message: string): void {
        if (this.isAbort) {
            this.callFailListener(code, message);
            return;
        }
        if (this.isRetry()) {
            this.currentRetry++;
            Logger.log(TAG, "任务失败，开始重试，重试次数：", this.currentRetry);
            this.run();
            return;
        }
        this.callFailListener(code, message);
    }

    private isRetry(): boolean {
        return this.retry !== this.currentRetry;
    }

    private disposeHeader(header: any): Object {
        header = header || {};
        // @ts-ignore
        // header["content-type"] = "application/json;charset=UTF-8";
        // header["content-type"] = "application/x-www-form-urlencoded";
        // header["x-auth-token"] = UserManager.getInstance().getToken();
        return header;
    }

    getRequest(): Request<T> {
        return this.request;
    }
}
