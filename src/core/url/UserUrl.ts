export default class UserUrl {
    /**
     * 用户登录
     * username: 用户名
     * password: 密码
     */
    public static URL_POST_LOGIN = () => "/op/v1/login";

    /**
     * 登出
     */
    public static URL_POST_LOGOUT = () => "/op/v1/logout";
}
