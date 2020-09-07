/**
 * 邮箱正则
 */
const RegExpEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export default class CommonValidator {
    /**
     * 邮箱校验
     * element-ui 返回参数如下
     * @param rule
     * @param value
     * @param callback
     * @constructor
     */
    public static VALIDATE_EMAIL = (rule: any, value: any, callback: any) => {
        if (!RegExpEmail.test(value)) {
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    };
}
