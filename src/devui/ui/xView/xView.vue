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
	<div v-show="!!isShow" :id="id">
		<slot />
	</div>
</template>
