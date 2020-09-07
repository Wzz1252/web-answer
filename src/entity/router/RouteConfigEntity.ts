import { NavigationGuard, RedirectOption, RouteConfig } from "vue-router";
import { PathToRegexpOptions, RoutePropsFunction } from "vue-router/types/router";
import { AsyncComponent, ComponentOptions } from "vue";
import Vue from "vue/types/vue";
import RouteMetaEntity from "@/entity/router/RouteMetaEntity";

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent

// @ts-ignore
export default class RouteConfigEntity implements RouteConfig {
	/** 路由路径 */
	public path!: string;
	/** 路由的唯一名字，用来跳转和匹配路由配置文件 */
	public name?: string;
	// @ts-ignore
	public component?: Component;
	// @ts-ignore
	public components?: Component;
	public redirect?: RedirectOption;
	public alias?: string | string[];
	// @ts-ignore
	public children?: RouteConfigEntity[];
	public meta!: RouteMetaEntity;
	public beforeEnter?: NavigationGuard;
	public props?: boolean | Object | RoutePropsFunction;
	public caseSensitive?: boolean;
	public pathToRegexpOptions?: PathToRegexpOptions;

	// 是否隐藏当前列表
	public hide?: boolean = true;
	// 左侧导航菜单的索引
	public index?: string = "";
	// 是否是左侧导航菜单
	public isAsideMenu?: boolean = false;
	/**
	 * 是否使用<keep-alive>的缓存功能
	 * true:  开启缓存
	 * false: 关闭缓存
	 */
	public keepAlive?: boolean = false;
}
