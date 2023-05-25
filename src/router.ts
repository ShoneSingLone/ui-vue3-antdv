import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
	{ path: "/Dev", component: () => import("./Dev.vue") },
	{ path: "/Dev/a", component: () => import("./Dev.vue") },
	{ path: "/Dev/b/a", component: () => import("./Dev.vue") },
	{ path: "/Dev/b/b", component: () => import("./Dev.vue") },
	{ path: "/Dev/b/c/a", component: () => import("./Dev.vue") },
	{ path: "/Dev/b/c/b", component: () => import("./Dev.vue") },
	{
		category: "inset",
		path: "/xDirective",
		component: () => import("./ui/directive/DemoDirective.jsx")
	},
	{
		category: "inset",
		path: "/xIcon",
		component: () => import("./ui/xIcon/DemoXIcon.vue")
	},
	{
		category: "inset",
		path: "/xButton",
		component: () => import("./ui/xButton/DemoXButton.vue")
	},
	{
		category: "inset",
		path: "/xDialog",
		component: () => import("./ui/xSingle/dialog/DemoDialog.vue")
	},
	{
		category: "inset",
		path: "/xForm",
		component: () => import("./ui/xForm/DemoXForm.vue")
	},
	{
		category: "inset",
		path: "/xDataGrid",
		component: () => import("./ui/xDataGrid/DemoXDataGrid.vue")
	},
	{
		category: "plugin",
		path: "/xMenuTree",
		component: () => import("../entry/lib/xMenuTree/DemoxMenuTree.vue")
	}
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});
