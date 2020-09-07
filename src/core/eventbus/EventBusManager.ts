import SubscriberListener from "./SubscriberListener";
import EventBusMessage from "./EventBusMessage";
import LifeCycleImpl from "@/core/base/LifeCycleImpl";

const TAG = "EventBusManager";

/**
 * 一款简易的程序内的事件通知管理，支持监听 Pages 的生命周期
 */
export default class EventBusManager implements LifeCycleImpl {
    private static sInstance: EventBusManager;

    public static getInstance(): EventBusManager {
        if (this.sInstance == null) {
            this.sInstance = new EventBusManager();
        }
        return this.sInstance;
    }

    private constructor() {
    }

    private subscriberListeners: Array<SubscriberListener> = [];

    /**
     * 添加一个订阅者
     * @param subscriber 事件订阅者
     */
    public register(subscriber: SubscriberListener) {
        if (!this.getSubscriberBySubscriber(subscriber)) {
            this.subscriberListeners.push(subscriber);
        }
    }

    /**
     * 移除一个事件订阅者
     *
     * @param subscriber 事件订阅者
     */
    public unRegister(subscriber: SubscriberListener) {
        let l = this.getSubscriberBySubscriber(subscriber);
        if (l) {
            this.subscriberListeners.splice(l.index, 1);
        }
    }

    /**
     * 是否注册事件
     *
     * @param subscriber 事件监听者
     * @return true: 已注册，false: 未注册
     */
    public isSubscriber(subscriber: SubscriberListener) {
        return this.getSubscriberBySubscriber(subscriber);
    }

    /**
     * 根据 SubscriberListener 获得当前栈中的指定对象，如果没有返回 null。
     * @param listener
     */
    public getSubscriberBySubscriber(listener: SubscriberListener): { listener: SubscriberListener, index: number } | null {
        for (let i = 0; i < this.subscriberListeners.length; i++) {
            let l = this.subscriberListeners[i];
            if (l.getUUID() === listener.getUUID()) {
                return { listener: l, index: i };
            }
        }
        return null;
    }

    /**
     * 简易版的分发器
     *
     * @param message
     */
    public post(message: EventBusMessage) {
        for (let i = 0; i < this.subscriberListeners.length; i++) {
            let l = this.subscriberListeners[i];
            l.onEventHandler(message);
        }
    }

    onBeforeDestroy(): void {
    }

    onBeforeMount(): void {
    }

    onBeforeUpdate(): void {
    }

    onCreated(): void {
    }

    onDestroyed(): void {
    }

    onMounted(): void {
    }

    onUpdated(): void {
    }

    onActivated(): void {
    }

    onDeactivated(): void {
    }

    onBeforeCreate(): void {
    }
}
