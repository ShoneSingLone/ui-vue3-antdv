<script lang="jsx">
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import $ from "jquery";

export default defineComponent({
	name: "xForm",
	props: {
		labelStyle: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	emits: [],
	data() {
		return {};
	},
	computed: {
		/* 组件唯一标识 */
		xFormId() {
			return `xForm_${this._.uid}`;
		},
		labelStyleText() {
			return xU
				.map(
					xU.merge({ width: "120px", "text-align": "right" }, this.labelStyle),
					(value, prop) => `${prop}: ${value}`
				)
				.join(";");
		},

		styleContent() {
			return `#${this.xFormId} { width:100%; padding:0 16px; }
 #${this.xFormId} div.ant-form-item-label { ${this.labelStyleText} }`;
		}
	},
	mounted() {
		const $form = $(`#${this.xFormId}`);
		const $style = $("<style/>", { id: `style_${this.xFormId}` }).append(
			this.styleContent
		);
		$form.prepend($style);
	},
	watch: {
		styleContent() {
			this.updateStyle(this.styleContent);
		}
	},
	methods: {
		updateStyle(styleContent) {
			const $style = $(`#style_${this.xFormId}`);
			$style.html(styleContent);
		}
	}
});
</script>

<template>
	<form :id="xFormId">
		<slot />
	</form>
	<!-- <form :id="xFormId" style="opacity: 0"><slot></slot></form> -->
</template>

<style></style>
