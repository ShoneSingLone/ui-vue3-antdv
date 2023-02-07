import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
	{ path: "/Dev", component: () => import("./Dev.vue") },
	//@ts-ignore
	{ path: "/xDirective", component: () => import("./devui/ui/directive/DemoDirective") },
	{ path: "/xIcon", component: () => import("./devui/ui/xIcon/DemoXIcon.vue") },
	{ path: "/xButton", component: () => import("./devui/ui/xButton/DemoXButton.vue") },
	{ path: "/xDialog", component: () => import("./devui/ui/xSingle/dialog/DemoDialog.vue") },
	{ path: "/xForm", component: () => import("./devui/ui/xForm/DemoXForm.vue") },
	{ path: "/xDataGrid", component: () => import("./devui/ui/xDataGrid/DemoXDataGrid.vue") }
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});
