import Vue from "vue";
import Router from "vue-router";
import Routes from "./manage/Routes";

Vue.use(Router);

// @ts-ignore RouteConfigEntity 无法转换成 RouteConfig
const router = new Router({
	// @ts-ignore
	routes: Routes,
	mode: "history",
	base: process.env.BASE_URL
});
router.beforeEach((to: any, from: any, next: any) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
export default router;

