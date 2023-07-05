<template>
	<el-container class="layout-container-demo" style="height: 500px">
		<el-header style="background-color: black;" class="flex start middle">
			<el-menu>
				<el-menu-item key="1">
					<div @click="openStatsDialog">latest buildのlib分析报告</div>
				</el-menu-item>
			</el-menu>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-scrollbar>
					<el-menu default-active="">
						<el-sub-menu index="sub1">
							<template #title>
								<span class="flex middle">
									<xIcon icon="UserOutlined" />
									<span class="ml4">单组件</span>
								</span>
							</template>
							<el-menu-item
								:key="menu.path"
								:index="menu.path"
								v-for=" menu  in  routes.filter(i => i.category == 'inset') ">
								<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
							</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="sub2">
							<template #title>
								<span class="flex middle">
									<xIcon icon="UserOutlined" />
									<span class="ml4">需要单独引用</span>
								</span>
							</template>
							<el-menu-item
								:index="menu.path"
								:key="menu.path"
								v-for=" menu  in  routes.filter(i => i.category == 'plugin') ">
								<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
							</el-menu-item>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<el-main>
				<RouterView />
			</el-main>
		</el-container>
	</el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { routes } from "../router";
import { UI } from "@ventose/ui";
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
#app {
	height: 100vh;
}

#components-layout-demo-top-side-2 .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}

.x-row-rtl #components-layout-demo-top-side-2 .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

.site-layout-background {
	background: #fff;
}

.x-layout-content {
	overflow: auto;
}
</style>
