import MenuEntity from "@/entity/router/MenuEntity";

export default class RouteMetaEntity {
    title?: string;
    hide?: boolean = true;
    /**
     * 菜单
     */
    menu?: MenuEntity;
    authority?: any;
    extra?: any;

    /**
     * 面包屑
     */
    crumbs?: any[];
}
