export default class RequestConfig {
    /**
     * 指定请求超时的毫秒数(0 表示无超时时间)
     * 如果请求话费了超过 `timeout` 的时间，请求将被中断
     */
    public timeout: number = 1000;

    /**
     * 表示跨域请求时是否需要使用凭证
     */
    public withCredentials: boolean = false;

    /**
     * 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
     */
    public responseType: string = "json";

    /**
     * 重试次数
     */
    private retry: number = 0;

    public getRetry(): number {
        return this.retry;
    }

    public setRetry(retry: number): void {
        this.retry = retry;
    }
}
