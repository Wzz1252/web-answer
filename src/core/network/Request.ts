/**
 * 所有网络请求的基类
 * @param <T> 这个请求希望的解析类型
 *
 * - 缓存机制
 * - 重试机制
 */
import Task from "./Task";
import { RequestMethod } from "./enum/MethodEnum";
import Header from "./entity/Header";
import RequestSuccessListener from "./RequestSuccessListener";
import RequestFailListener from "./RequestFailListener";
import RequestUploadProgressListener from "./RequestUploadProgressListener";
import RequestDownloadProgressListener from "./RequestDownloadProgressListener";
import RequestConfig from "./RequestConfig";
import ResponseEntity from "./entity/ResponseEntity";
import ResponseDataEntity from "./entity/ResponseDataEntity";
import RequestFrontListener from "./RequestFrontListener";

export default class Request<T extends any> {
    private task!: Task<T>;

    /** 请求地址，格式：/cust/v1/xxx */
    private url!: string;

    /**
     * 请求数据体
     * 格式为：
     * {
     *      username: xxxx,
     *      object: {
     *          username: xxxx
     *      }
     * }
     */
    private data: any = {};

    /**
     * 请求类型
     */
    private method: RequestMethod = RequestMethod.GET;

    /**
     * 请求头
     */
    private headers: Array<Header> = new Array<Header>();

    /**
     * Request 标记，用于去多个 Request，默认以 url 作为 tag
     */
    private tag: string = "";

    /**
     * 是否忽略这个任务
     * 某些情况下，有些任务会根据业务逻辑决定执不执行，但链式调用会失去这种灵活性，通过设置此方法可以让队列决定是否执行他
     * 默认为 false
     */
    private isIgnore: () => boolean = () => false;

    /**
     * 配置文件
     */
    private requestConfig!: RequestConfig;

    /**
     * 请求成功的回调事件
     */
    private successListener?: RequestSuccessListener<T>;
    /**
     * 请求失败的回调事件
     */
    private failListener?: RequestFailListener<T>;
    /**
     * 上传事件监听
     */
    private uploadProgressListener?: RequestUploadProgressListener;
    /**
     * 下载事件监听
     */
    private downloadProgressListener?: RequestDownloadProgressListener;
    /**
     * 网络请求前置监听
     */
    private frontListener?: Promise<RequestFrontListener<T>>;

    private constructor() {}

    public static get<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.GET);
    }

    public static delete<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.DELETE);
    }

    public static head<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.HEAD);
    }

    public static options<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.OPTIONS);
    }

    public static post<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.POST);
    }

    public static put<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.PUT);
    }

    public static patch<T>(url: string): Request<T> {
        return Request.createRequst<T>(url, RequestMethod.PATCH);
    }

    private static createRequst<T>(url: string, method: RequestMethod): Request<T> {
        let request = new Request<T>();
        request.url = url;
        request.method = method;
        request.requestConfig = new RequestConfig();
        return request;
    }

    // public setIgnore(isIgnore: boolean): Request<T> {
    //     this.isIgnore = isIgnore;
    //     return this;
    // }

    public setIgnore(isIgnore: () => boolean): Request<T> {
        this.isIgnore = isIgnore;
        return this;
    }

    public getIgnore(): () => boolean {
        return this.isIgnore;
    }

    public setSuccessListener(listener: RequestSuccessListener<T>): Request<T> {
        this.successListener = listener;
        return this;
    }

    public setFailListener(listener: RequestFailListener<T>): Request<T> {
        this.failListener = listener;
        return this;
    }

    public setFrontListener(listener: Promise<RequestFrontListener<T>>): Request<T> {
        this.frontListener = listener;
        return this;
    }

    public getFrontListener(): Promise<RequestFrontListener<T>> | undefined {
        return this.frontListener;
    }

    public setUploadProgressListener(listener: RequestUploadProgressListener): Request<T> {
        this.uploadProgressListener = listener;
        return this;
    }

    public setDownloadProgressListener(listener: RequestDownloadProgressListener): Request<T> {
        this.downloadProgressListener = listener;
        return this;
    }

    public getTask(): Task<T> {
        return this.task;
    }

    public setTask(task: Task<T>): Request<T> {
        this.task = task;
        this.task.setRequest(this);
        let _this = this;
        task.addSuccessListener((data: T, result: ResponseEntity<T>) => {
            if (_this.successListener) {
                _this.successListener(data, result);
            }
        });
        task.addFailListener((error: ResponseDataEntity<T>) => {
            if (_this.failListener) {
                _this.failListener(error);
            }
        });
        return this;
    }

    public getUrl(): string {
        return this.url;
    }

    public getData(): any {
        return this.data || {};
    }

    public setData(data: any): Request<T> {
        this.data = data;
        return this;
    }

    public getMethod(): RequestMethod {
        return this.method;
    }

    public setMethod(method: RequestMethod): Request<T> {
        this.method = method;
        return this;
    }

    public getHeaders(): Array<Header> {
        return this.headers;
    }

    public setHeaders(headers: Array<Header>): Request<T> {
        this.headers = headers;
        return this;
    }

    public addHeader(key: string, value: string): Request<T> {
        this.headers.push(new Header(key, value));
        return this;
    }

    public getTag(): string {
        return this.tag;
    }

    public setTag(tag: string): Request<T> {
        this.tag = tag;
        return this;
    }

    public getRequestConfig(): RequestConfig {
        return this.requestConfig || new RequestConfig();
    }

    public setRequestConfig(requestConfig: RequestConfig): Request<T> {
        this.requestConfig = requestConfig;
        return this;
    }

    public setRetry(retry: number): Request<T> {
        this.requestConfig.setRetry(retry);
        return this;
    }
}
