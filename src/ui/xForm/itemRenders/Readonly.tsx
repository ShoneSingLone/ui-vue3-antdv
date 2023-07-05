import { defineComponent } from "vue";

export const ReadonlyItem = defineComponent({
	props: ["value"],
	render() {
		return (
			<div
				class="x-input cursor-not-allowed xItem_readonly ellipsis"
				v-uiPopover={{ onlyEllipsis: true }}>
				{this.value}
				<span style="opacity:0">.</span>
			</div>
		);
	}
});
