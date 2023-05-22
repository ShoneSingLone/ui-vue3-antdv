import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
	{ path: "/Dev", component: () => import("./Dev.vue") },
	{ isHide: true, path: "/Dev/a", component: () => import("./Dev.vue") },
	{ isHide: true, path: "/Dev/b/a", component: () => import("./Dev.vue") },
	{ isHide: true, path: "/Dev/b/b", component: () => import("./Dev.vue") },
	{ isHide: true, path: "/Dev/b/c/a", component: () => import("./Dev.vue") },
	{ isHide: true, path: "/Dev/b/c/b", component: () => import("./Dev.vue") },
	{
		path: "/xDirective",
		component: () => import("./ui/directive/DemoDirective.jsx")
	},
	{ path: "/xIcon", component: () => import("./ui/xIcon/DemoXIcon.vue") },
	{ path: "/xButton", component: () => import("./ui/xButton/DemoXButton.vue") },
	{
		path: "/xDialog",
		component: () => import("./ui/xSingle/dialog/DemoDialog.vue")
	},
	{ path: "/xForm", component: () => import("./ui/xForm/DemoXForm.vue") },
	{
		path: "/xDataGrid",
		component: () => import("./ui/xDataGrid/DemoXDataGrid.vue")
	}
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});
