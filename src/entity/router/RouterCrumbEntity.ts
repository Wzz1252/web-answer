export default class RouterCrumbEntity {
    /**
     * 面包屑标题
     */
    name: string = "";
    /**
     * 要跳转的页面名称
     */
    to?: string = "";
    /**
     * 要跳转的页面路径
     */
    path?: string = "";
}
