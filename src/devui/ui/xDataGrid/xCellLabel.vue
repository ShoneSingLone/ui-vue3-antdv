<script lang="jsx">
import { defineComponent } from "vue";
import $ from "jquery";

export default defineComponent({
	name: "xCellLabel",
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			loading: false,
			title: ""
		};
	},
	computed: {
		id() {
			return `xLabel_${this._.uid}`;
		}
	},
	watch: {
		configs: {
			immediate: true,
			handler(configs) {
				this.loading = !!configs.loading;
			}
		}
	},
	methods: {
		updateTitle(title) {
			if (this.title !== title) {
				this.title = title;
			}
		}
	},
	updated() {
		const $dom = $(`#${this.id}`);
		const domWidth = $dom.width();
		const $span = $(`#${this.id} > span`);
		const spanWidth = $span.width();
		/*如果没有省略号就不需要title*/
		if (domWidth < spanWidth) {
			const text = $dom.text();
			this.updateTitle(text);
		} else {
			this.updateTitle("");
		}
	}
});
</script>

<template>
	<div class="ellipsis" :title="title" :id="id">
		<span><slot /></span>
	</div>
</template>
