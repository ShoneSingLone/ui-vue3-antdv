<script lang="jsx">
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import $ from "jquery";

export default defineComponent({
	name: "xForm",
	props: {
		col: {
			type: Number,
			default: 1
		},
		labelStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		formStyle: {
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
		formStyleText() {
			return xU
				.map(xU.merge({}, this.formStyle), (value, prop) => `${prop}: ${value}`)
				.join(";");
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
			return [
				`#${this.xFormId} { width:100%; padding:0 16px; display: grid;grid-template-columns: repeat(${this.col},1fr);}`,
				`#${this.xFormId} { ${this.formStyleText} }`,
				`#${this.xFormId} div.x-form-item-label { ${this.labelStyleText} }`
			].join("\n");
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
