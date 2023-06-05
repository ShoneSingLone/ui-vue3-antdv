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
		component: () => import("./demo/DemoDirective.jsx")
	},
	{
		category: "inset",
		path: "/xIcon",
		component: () => import("./demo/DemoXIcon.vue")
	},
	{
		category: "inset",
		path: "/xButton",
		component: () => import("./demo/DemoXButton.vue")
	},
	{
		category: "inset",
		path: "/xDialog",
		component: () => import("./demo/DemoDialog.vue")
	},
	{
		category: "inset",
		path: "/xForm",
		component: () => import("./demo/DemoXForm.vue")
	},
	{
		category: "inset",
		path: "/xDataGrid",
		component: () => import("./demo/DemoXDataGrid.vue")
	},
	{
		category: "plugin",
		path: "/xMenuTree",
		component: () => import("./demo/DemoxMenuTree.vue")
	}
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});
