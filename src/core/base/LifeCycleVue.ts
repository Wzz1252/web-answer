import { Component, Vue } from "vue-property-decorator";
import LifeCycleImpl from './LifeCycleImpl';
import EventBusMessage from '../eventbus/EventBusMessage';
import SubscriberListener from "../eventbus/SubscriberListener";
import EventBusManager from '../eventbus/EventBusManager';
import UUIDUtils from "../../utils/UUIDUtils";

const TAG = "LifeCycleVue";

@Component
export default class LifeCycleVue extends Vue implements LifeCycleImpl, SubscriberListener {
    public uuid: string = "";

    /**
     * 组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
     * created-> mounted-> activated
     */
    private activated() {
        this.onActivated();
    }

    /**
     * 在组件被停用时调用
     */
    private deactivated() {
        this.onDeactivated();
    }

    private created() {
        this.uuid = UUIDUtils.buildUUID(16, 16);
        this.onCreated();
        EventBusManager.getInstance().register(this);
    }

    private beforeMount() {
        this.onBeforeMount();
    }

    private mounted() {
        this.onMounted();
    }

    private updated() {
        this.onUpdated();
    }

    private beforeUpdate() {
        this.onBeforeUpdate();
    }

    private beforeDestroy() {
        this.onBeforeDestroy();
    }

    private destroyed() {
        this.onDestroyed();
        EventBusManager.getInstance().unRegister(this);
    }

    public onCreated(): void {
    }

    public onBeforeDestroy(): void {
    }

    public onBeforeMount(): void {
    }

    public onBeforeUpdate(): void {
    }

    public onDestroyed(): void {
    }

    public onMounted(): void {
    }

    public onUpdated(): void {
    }

    public getUUID(): string {
        return this.uuid;
    }

    public onEventHandler(event: EventBusMessage): void {
    }

    public onActivated(): void {

    }

    public onDeactivated(): void {

    }

    onBeforeCreate(): void {
    }
}
