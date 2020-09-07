import {VNode} from "vue";
import {CloseEventHandler, MessageType} from "element-ui/types/message";

/** 确认框框 */
export default class ConfirmBodyEntity {
    /** Message text */
    message?: string | VNode;

    /** Message type */
    type?: MessageType;

    /** Custom icon's class, overrides type */
    iconClass?: string;

    /** Custom class name for Message */
    customClass?: string;

    /** Display duration, millisecond. If set to 0, it will not turn off automatically */
    duration?: number;

    /** Whether to show a close button */
    showClose?: boolean;

    /** Whether to center the text */
    center?: boolean;

    /** Whether message is treated as HTML string */
    dangerouslyUseHTMLString?: boolean;

    /** Callback function when closed with the message instance as the parameter */
    onClose?: CloseEventHandler;

    /** Set the distance to the top of viewport. Default is 20 px. */
    offset?: number;

}
