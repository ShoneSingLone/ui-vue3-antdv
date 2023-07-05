<template>
	<ElContainer class="flex vertical" style="height: 100vh">
		<ElHeader style="background-color: black" class="flex start middle">
			<div class="padding10">
				<xButton @click="openStatsDialog"> 分析报告 </xButton>
			</div>
		</ElHeader>
		<ElContainer class="flex1" style="height: 1px">
			<ElAside width="200px">
				<ElMenu default-active="">
					<ElSubMenu index="sub1">
						<template #title>
							<span class="flex middle">
								<xIcon icon="UserOutlined" />
								<span class="ml4">单组件</span>
							</span>
						</template>
						<ElMenuItem
							:key="menu.path"
							:index="menu.path"
							v-for="menu in routes.filter(i => i.category == 'inset')">
							<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
						</ElMenuItem>
					</ElSubMenu>
					<ElSubMenu index="sub2">
						<template #title>
							<span class="flex middle">
								<xIcon icon="UserOutlined" />
								<span class="ml4">需要单独引用</span>
							</span>
						</template>
						<ElMenuItem
							:index="menu.path"
							:key="menu.path"
							v-for="menu in routes.filter(i => i.category == 'plugin')">
							<RouterLink :to="menu.path">{{ menu.path }}</RouterLink>
						</ElMenuItem>
					</ElSubMenu>
				</ElMenu>
			</ElAside>
			<ElScrollbar class="flex1">
				<RouterView />
			</ElScrollbar>
		</ElContainer>
	</ElContainer>
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
				content: ["./assets/libs/dist_VentoseUI/VentoseUI_stats.html", ""]
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
