<script lang="jsx">
import { defineComponent, useAttrs, h, mergeProps, computed } from "vue";
import renders from "./itemRenders";
import { MutatingProps } from "../common";
import { checkXItem, EVENT_TYPE, TIPS_TYPE } from "../tools/validate";
import { _ } from "../loadCommonUtil";
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
			return _.map(
				_.merge({ width: "120px", "text-align": "left" }, this.labelStyle),
				(value, prop) => `${prop}: ${value}`
			).join(";");
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
