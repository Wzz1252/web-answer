import router from '..'
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import {Route} from "vue-router";
import Logger from "../../core/Logger";
import RouteConfigEntity from "../../entity/router/RouteConfigEntity";
import RoutersMenu from "./RoutersMenu";

const TAG = "RouteManage";

/**
 * 全局路由管理器，首次打开网页会从网络获取最新的路由信息并缓存起来，同时会构建路由表。
 */
export default class RouterManager {
	private static sInstance: RouterManager;
	/**
	 * 缓存配置成功的路由表，每次刷新页面时只执行一次，退出登录时清空
	 */
	private cacheRouters: Array<RouteConfigEntity> = [];
	/**
	 * 缓存需要缓存的页面，每次刷新页面时只执行一次，退出登录时清空
	 */
	private cacheKeepAliveRouters: Array<string> = [];
	/**
	 * 缓存侧边栏的页面，每次刷新页面时只执行一次，退出登录时清空
	 */
	private cacheAsideRouters: Array<RouteConfigEntity> = [];

	private RouteManage() {
	}

	public static getInstance() {
		if (this.sInstance == null) {
			this.sInstance = new RouterManager();
		}
		return this.sInstance;
	}

	public init() {
		NProgress.configure({showSpinner: false})
		router.beforeEach(async (to: Route, from: Route, next: any) => {
			NProgress.start();
			this.nextPages(to, from, next);
		});
		router.afterEach((to: Route) => {
			NProgress.done();
		})
	}

	private nextPages(to: Route, from: Route, next: any) {
		this.nextLayout(to, from, next);
	}

	/**
	 * 如果 url 不正确，则重定向到首页
	 */
	private nextLayout(to: Route, from: Route, next: any) {
		next();
	}

	/**
	 * 跳转到登录页面
	 */
	private nextLogin(to: Route, from: Route, next: any) {
		if ('/login'.indexOf(to.path) !== -1) {
			next();
		} else {
			next(`/login`);
		}
	}

	/**
	 * 跳转到错误页面，一般是首次路由没有获取成功时调用
	 */
	private nextError(to: Route, from: Route, next: any) {
		next('/error');
	}

	private configureRouter(routerConfig: Array<any> = []) {
		this.mergeRouteConfigToRouter(RoutersMenu, routerConfig, (r: RouteConfigEntity) => {
			// 将需要缓存的路由保存起来
			r.keepAlive = r.keepAlive == undefined ? false : r.keepAlive;
			if (r.keepAlive && r.name) {
				this.cacheKeepAliveRouters.push(r.name);
			}
		});
		this.cacheRouters = RoutersMenu;
		this.cacheAsideRouters = this.cacheRouters.filter((item) => {
			return item.isAsideMenu;
		});
		Logger.log(TAG, "生成路由表: ", this.cacheRouters);
		Logger.log(TAG, "生成侧边栏路由表: ", this.cacheAsideRouters);
	}

	/**
	 * @param routers 工程路由文件集合
	 * @param routerConfig 从服务器获取的要展示的路由配置
	 * @param extensionFun 扩展方法，用来实现一些比较简单的逻辑
	 */
	private mergeRouteConfigToRouter(routers: Array<RouteConfigEntity>, routerConfig: Array<any>,
									 extensionFun: (r: RouteConfigEntity) => void) {
		for (let i = 0; i < routers.length; i++) {
			let router = routers[i];
			router.hide = true;
			// 遍历路由配置文件，如果存在将内容从配置中删除
			for (let j = 0; j < routerConfig.length; j++) {
				if (router.name === routerConfig[j]) {
					// 将配置文件中的权限赋予路由
					router.meta = this.setValueDefualt(router.meta, {});
					router.hide = false;
					routerConfig.splice(j, 1);
					break;
				}
			}
			if (router.children) {
				this.mergeRouteConfigToRouter(router.children || [], routerConfig, extensionFun);
			}
			// 为 undefined 变量赋一个默认值
			router.meta = this.setValueDefualt(router.meta, {});

			extensionFun(router);
		}
	}

	public setValueDefualt(v: any, defalut: any): any {
		return v == undefined ? defalut : v;
	}

	/**
	 * 返回一个拥有自动缓存的 keep-alive
	 * @param createElement
	 */
	public getKeepAliveRender(createElement: any): any {
		return createElement(
			'keep-alive', {
				props: {include: this.getKeepAliveRouters()}
			}, [createElement('router-view')]
		);
	}

	public getCacheRouters(): Array<RouteConfigEntity> {
		return this.cacheRouters;
	}

	public getCacheAsideRouters(): Array<RouteConfigEntity> {
		return this.cacheAsideRouters;
	}

	public getKeepAliveRouters(): Array<string> {
		return this.cacheKeepAliveRouters;
	}

	public clean() {
		this.cacheRouters = [];
		this.cacheAsideRouters = [];
		this.cacheKeepAliveRouters = [];
	}
}
