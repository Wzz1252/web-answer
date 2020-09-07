import RouteConfigEntity from "../../entity/router/RouteConfigEntity";
import Index from "../../views/Index.vue";

export const constantRoutes: RouteConfigEntity[] = [
	{
		path: "/",
		redirect: {name: "Index"},

		meta: {},
	},
	{
		path: "/index",
		name: "Index",
		component: (resolve: (...modules: any[]) => void) => require(["@/views/Index.vue"], resolve),
		meta: {},
	},
	{
		path: "/develop",
		name: "Develop",
		component: (resolve: (...modules: any[]) => void) => require(["@/views/Develop.vue"], resolve),
		meta: {},
	},
	{
		path: "*",
		redirect: "/error",
		meta: {}
	},
];

export default constantRoutes;
