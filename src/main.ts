import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// @ts-ignore
// import VueResize from 'vue-resize'
// import 'vue-resize/dist/vue-resize.css'

// @ts-ignore
import VueResizeObserver from "vue-resize-observer";

// change element theme by myself
// import RouterManager from "./router/manage/RouterManager";
import Filters from "@/filters/Filter";
import "@/directive/index"

// 组件内部创建钩子
import Component from "vue-class-component";

// @ts-ignore
import VueTinymce from "@packy-tang/vue-tinymce";

Component.registerHooks([
	"beforeRouteEnter",//进入路由之前
	"beforeRouteLeave",//离开路由之前
	"beforeRouteUpdate"
]);

// RouterManager.getInstance().init();

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Filters);
Vue.use(VueTinymce);
// Vue.use(VueResize)
Vue.use(VueResizeObserver);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

