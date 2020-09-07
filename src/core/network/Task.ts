import RequestSuccessListener from "./RequestSuccessListener";
import RequestFailListener from "./RequestFailListener";
import RequestConfig from "./RequestConfig";
import { RequestState } from "./enum/RequestState";
import Request from "./Request";

export default interface Task<T> {
    successListener?: Array<RequestSuccessListener<T>>;
    failListener?: Array<RequestFailListener<T>>;
    uploadProgressListener?: (progressEvent: any) => void;
    downloadProgressListener?: (progressEvent: any) => void;

    /** 执行任务 */
    run(): void;

    /** 停止任务 */
    abort(): void;

    /**
     * 设置配置文件
     * @param config
     */
    setRequestConfig(config: RequestConfig): void;

    /**
     * 成功回调
     * @param listener
     */
    addSuccessListener(listener: RequestSuccessListener<T>): void;

    /**
     * 失败回调
     * @param listener
     */
    addFailListener(listener: RequestFailListener<T>): void;

    /** 文件上传进度监听 */
    setUploadProgressListener(listener: (progressEvent: any) => void): void;

    /** 文件下载进度监听 */
    setDownloadProgressListener(listener: (progressEvent: any) => void): void;

    /** 返回当前的任务状态 */
    getState(): RequestState;

    setRequest(request: Request<T>): void;

    getRequest(): Request<T>;
}
