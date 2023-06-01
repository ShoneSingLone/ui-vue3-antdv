<script lang="jsx">
import { defineComponent } from "vue";

export default defineComponent({
	name: "xView",
	props: {
		isShow: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	computed: {
		id() {
			return `xView_${this._.uid}`;
		}
	}
});
</script>

<template>
	<div v-show="!!isShow" :id="id" class="flex flex1">
		<div class="xView-body flex vertical flex1">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
[id^="xView"] {
	height: 100%;
	width: 1px;
	flex: 1;
	background: white;

	.xView-body {
		height: 100%;
		width: 100%;
		overflow: auto;
		padding: 0 10px;
	}
}
</style>
