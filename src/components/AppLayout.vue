<template>
	<a-layout>
		<a-layout-header class="header">
			<div class="logo" />
			<a-menu
				v-model:selectedKeys="selectedKeys1"
				theme="dark"
				mode="horizontal"
				:style="{ lineHeight: '64px' }">
				<a-menu-item key="1">
					<div @click="openStatsDialog">latest buildのlib分析报告</div>
				</a-menu-item>
				<a-menu-item key="2">nav 2</a-menu-item>
				<a-menu-item key="3">nav 3</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout>
			<a-layout-sider width="200" style="background: #fff">
				<a-menu
					v-model:selectedKeys="selectedKeys2"
					v-model:openKeys="openKeys"
					mode="inline"
					:style="{ height: '100%', borderRight: 0 }">
					<a-sub-menu key="sub1">
						<template #title>
							<span class="flex middle">
								<xIcon icon="UserOutlined" />
								<span class="ml4">单组件</span>
							</span>
						</template>
						<a-menu-item
							:key="menu.path"
							v-for="menu in routes.filter(i => i.category == 'inset')">
							<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
						</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="sub1">
						<template #title>
							<span class="flex middle">
								<xIcon icon="UserOutlined" />
								<span class="ml4">单组件</span>
							</span>
						</template>
						<a-menu-item
							:key="menu.path"
							v-for="menu in routes.filter(i => i.category == 'inset')">
							<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
						</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="sub2">
						<template #title>
							<span class="flex middle">
								<xIcon icon="UserOutlined" />
								<span class="ml4">需要单独引用</span>
							</span>
						</template>
						<a-menu-item
							:key="menu.path"
							v-for="menu in routes.filter(i => i.category == 'plugin')">
							<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
						</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>Home</a-breadcrumb-item>
					<a-breadcrumb-item>List</a-breadcrumb-item>
					<a-breadcrumb-item>App</a-breadcrumb-item>
				</a-breadcrumb>
				<a-layout-content
					:style="{
						background: '#fff',
						padding: '24px',
						margin: 0,
						minHeight: '280px'
					}">
					<RouterView />
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { routes } from "../router";
import { UI } from "../ui";
export default defineComponent({
	data() {
		return {
			routes,
			selectedKeys1: ref<string[]>(["1"]),
			selectedKeys2: ref<string[]>(["1"]),
			collapsed: ref<boolean>(false),
			openKeys: ref<string[]>(["sub1"]),
			menus: [{ to: "xIcon" }, { to: "xButton" }, { to: "xDataGrid" }]
		};
	},
	methods: {
		openStatsDialog() {
			UI.layer.open({
				type: UI.layer.IFRAME,
				maxmin: true,
				fullscreen: true,
				content: ["./assets/html/stats.html", ""]
			});
		}
	}
});
</script>
<style>
#components-layout-demo-top-side-2 .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

.site-layout-background {
	background: #fff;
}

.ant-layout-content {
	overflow: auto;
}
</style>
