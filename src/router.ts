import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
	{ path: "/Dev", component: () => import("./Dev.vue") },
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
