/** 弹出框 */
export default class AlertBodyEntity {
    /**
     * MessageBox 标题
     */
    title: string = "标题内容";
    /**
     * MessageBox 消息正文内容
     */
    message: string = "";
    /**
     * 确定按钮的文本内容
     */
    confirmButtonText?: string = "确定";
    /**
     * 确定回调
     */
    callback?: () => void;
    /**
     * 是否将 message 属性作为 HTML 片段处理
     */
    dangerouslyUseHTMLString?: boolean = false;

}
