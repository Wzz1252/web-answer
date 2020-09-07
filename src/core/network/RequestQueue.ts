import BaseVue from "../base/BaseVue";
import TaskQueue from "./TaskQueue";
import RequestSuccessListener from "./RequestSuccessListener";
import RequestConfig from "./RequestConfig";
import RequestFailListener from "./RequestFailListener";
import RequestCompleteListener from "./RequestCompleteListener";
import Request from "./Request";
import Logger from "../Logger";
import TaskQueueSerialImpl from "./TaskQueueSerialImpl";
import Task from "./Task";
import TaskQueueParallelImpl from "./TaskQueueParallelImpl";
import ResponseEntity from "./entity/ResponseEntity";
import ResponseDataEntity from "./entity/ResponseDataEntity";
import TaskWxImpl from "./TaskWxImpl";
import TaskAxiosImpl from "@/core/network/TaskAxiosImpl";
import {Loading, Notification} from "element-ui";
import TextUtils from "@/utils/TextUtils"; 
import ConfirmBodyEntity from "@/entity/common/ConfirmBodyEntity";

const TAG = "RequestQueueNew";

export default class RequestQueue {
    /**
     * 默认磁盘缓存是 2MB
     */
    private DEFAULT_DISK_USAGE_BYTES: number = 2 * 1024 * 1024;

    private context?: BaseVue;
    private requestQueue: Array<TaskQueue<any>> = new Array<TaskQueue<any>>();
    /**
     * 每执行一次 {@link belowSerial()} 和 {@link belowParallel()} 计数器都会加一。
     * 计数器用来确定 RequestQueueTask 在队列中的位置
     */
    private belowCursor: number = -1;
    /**
     * 全局配置，每个 Request 可以单独设置，Request 的配置优先级高于全局的配置
     */
    private requestConfig!: RequestConfig;
    /**
     * 是否在请求的时候显示一个全局加载框
     */
    private isShowLoading: boolean = false;
    /** 加载容器依托的容器，例如：#app */
    private loadingTarget: string = "";
    /** 请求动画 */
    private loadingInstance: any;
    /**
     * 是否显示错误提示
     * 依赖 {@link context}
     */
    private isShowErrorMessage: boolean = true;
    private errorMessageOptions: ConfirmBodyEntity = {};

    // private loadingInstance?: any;

    private successListener?: RequestSuccessListener<any>;
    private failListener?: RequestFailListener<any>;
    private completeListener?: RequestCompleteListener;

    /**
     * 当前队列请求是否已经取消，如果取消将忽略其余的成功与错误回调
     */
    private canceled: boolean = false;

    private constructor(context?: BaseVue) {
        this.context = context;
    }

    /**
     * 创建一个请求队列
     * @param context Vue 的上下文
     */
    public static create(context?: BaseVue): RequestQueue {
        let queue = new RequestQueue(context);
        queue.belowParallel();
        return queue;
    }

    /**
     * 添加一个请求到队列
     */
    public addRequest<T>(request: Request<T>): RequestQueue {
        let queue = this.getTaskQueue();
        if (!queue) {
            Logger.warn(TAG, "AddRequest TaskQueue 出现错误!");
            return this;
        }
        // 如果有自己的请求库，使用自己的，否则使用默认的 axios
        if (request.getTask()) {
            queue.requestTasks.push(request.getTask());
        } else {
            let task = new TaskAxiosImpl<T>();
            task.setRequest(request);
            request.setTask(task);
            queue.requestTasks.push(task);
        }
        Logger.log(TAG, "addRequest: ", this.requestQueue);
        return this;
    }

    /**
     * 添加串行队列
     * 在此方法下面的 {@link addRequest()} 都会串行执行
     */
    public belowSerial<T>(): RequestQueue {
        let queueTask = new TaskQueueSerialImpl<T>();
        queueTask.requestTasks = new Array<Task<T>>();
        this.requestQueue.push(queueTask);
        this.belowCursor++;
        return this;
    }

    /**
     * 添加并行队列
     * 在此方法下面的 {@link addRequest()} 都会并行执行
     */
    public belowParallel<T>(): RequestQueue {
        let queueTask = new TaskQueueParallelImpl<T>();
        queueTask.requestTasks = new Array<Task<T>>();
        this.requestQueue.push(queueTask);
        this.belowCursor++;
        return this;
    }

    public setSuccessListener(listener: RequestSuccessListener<any>): RequestQueue {
        this.successListener = listener;
        return this;
    }

    public setFailListener(listener: RequestFailListener<any>): RequestQueue {
        this.failListener = listener;
        return this;
    }

    public setCompleteListener(listener: RequestCompleteListener): RequestQueue {
        this.completeListener = listener;
        return this;
    }

    public setShowLoading(isShowloading: boolean, loadingTarget: string = ""): RequestQueue {
        this.isShowLoading = isShowloading;
        this.loadingTarget = loadingTarget;
        return this;
    }

    public getShowLoading(): boolean {
        return this.isShowLoading;
    }

    public setShowErrorMessage(isShowErrorMessage: boolean): RequestQueue {
        this.isShowErrorMessage = isShowErrorMessage;
        return this;
    }

    public getShowErrorMessage(): boolean {
        return this.isShowErrorMessage;
    }

    public setErrorMessageOptions(errorMessageOptions: ConfirmBodyEntity): RequestQueue {
        this.errorMessageOptions = errorMessageOptions;
        return this;
    }

    public getErrorMessageOptions(): object {
        return this.errorMessageOptions;
    }

    /**
     * 开始执行
     */
    public request<T>(request?: Request<T>): void {
        if (request) {
            this.addRequest(request);
            this.request();
        } else {
            let requestQueue = this.requestQueue || [];
            if (requestQueue.length <= 0) {
                Logger.log(TAG, "任务队列是空的，终止任务");
                return;
            }
            this.nextTaskQueue(this.requestQueue, 0);
        }
    }

    private getTaskQueue(): TaskQueue<any> | undefined {
        // -1 属于异常情况，避免一下
        let cursor = this.belowCursor === -1 ? 0 : this.belowCursor;
        return this.requestQueue[cursor] || undefined;
    }

    private nextTaskQueue<T>(taskQueue: Array<TaskQueue<T>>, count: number): void {
        let task = taskQueue[count];
        let _this = this;
        if (task) {
            task.setSuccessListener((data: T, result: ResponseEntity<T>) => {
                if (_this.canceled) {
                    return;
                }
                if (_this.successListener) {
                    _this.successListener(data, result);
                }
            });
            task.setFailListener((error: ResponseDataEntity<T>) => {
                if (_this.canceled) {
                    return;
                }
                if (_this.failListener) {
                    _this.failListener(error);
                }
                if (_this.isShowErrorMessage && _this.context) {
                    // @ts-ignore
                    _this.context.msgError(error.code + ": " + error.message, _this.getErrorMessageOptions());
                }
                _this.canceled = true;
                _this.closeLoading();
                return;
            });
            task.setCompleteListener(() => {
                count++;
                _this.nextTaskQueue(taskQueue, count);
            });
            this.showLoading();
            task.run();
        } else {
            // 能执行到这里说明任务都已经执行完成
            if (_this.completeListener) {
                _this.completeListener();
            }
            _this.closeLoading();
            return;
        }
    }

    private showLoading(): void {
        if (this.isShowLoading && !this.loadingInstance) {
            if (TextUtils.isEmpty(this.loadingTarget)) {
                this.loadingInstance = Loading.service({});
            } else {
                this.loadingInstance = Loading.service({target: this.loadingTarget});
            }
        }
    }

    private closeLoading(): void {
        if (this.loadingInstance) {
            this.loadingInstance.close();
            this.loadingInstance = null;
        }
    }
}
