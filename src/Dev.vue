<script lang="ts">
//@ts-nocheck

import { defineComponent, markRaw } from "vue";

const PopoverContent = defineComponent(
	markRaw({
		template: `<aCard type="primary"> aCard </aCard>`
	})
);

export default defineComponent({
	data() {
		return {
			configsUiPopoverComponent: {
				content: PopoverContent
			}
		};
	}
});
</script>

<template>
	<aTag v-uiPopover="configsUiPopoverComponent">使用Vue组件</aTag>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
