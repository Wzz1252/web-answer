import RequestSuccessListener from "./RequestSuccessListener";
import RequestFailListener from "./RequestFailListener";
import Task from "./Task";
import RequestCompleteListener from "./RequestCompleteListener";

/**
 * 队列模式
 */
export default interface TaskQueue<T extends any> {
    requestTasks: Array<Task<T>>;

    successListener?: RequestSuccessListener<T>;
    failListener?: RequestFailListener<T>;
    completeListener?: RequestCompleteListener;

    /**
     * 开始执行任务
     * @param success 成功回调
     * @param fail 失败回调
     */
    run(): void;

    setSuccessListener(listener: RequestSuccessListener<T>): void;

    setFailListener(listener: RequestFailListener<T>): void;

    setCompleteListener(listener: RequestCompleteListener): void;

    isAllFinish(): boolean;
}
