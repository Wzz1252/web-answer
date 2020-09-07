export default class EventBusMessage {
    public eventType: number = 0;

    public data1?: any;
    public data2?: any;

    constructor(eventType: number, data1: any = null, data2: any = null) {
        this.eventType = eventType;
        this.data1 = data1;
        this.data2 = data2;
    }
}
