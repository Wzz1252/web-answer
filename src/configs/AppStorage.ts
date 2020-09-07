
const TAG = "AppStorage";

export default class AppStorage {
    /**
     * 记录权限表
     */
    public static setRouteResourceActions(resource: Array<string>) {
        localStorage.setItem("route_resource_actions", JSON.stringify(resource));
    }

    public static getRouteResourceActions(): Array<string> {
        return JSON.parse(localStorage.getItem("route_resource_actions") || "[]");
    }
}
