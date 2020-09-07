import EventBusMessage from "./EventBusMessage";

export default interface SubscriberListener {
    onEventHandler(event: EventBusMessage): void;

    getUUID(): string;
}
