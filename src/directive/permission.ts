// 根据当前登录的用户的权限, 控制dom渲染: 有权限渲染, 无权限移除
// 用法类似v-if, 注意要求value是表达式, 例如: v-permission="'perm:manage'"
import Vue from "vue";

Vue.directive("permission", {
	inserted: function (el, binding) {
	},
});
