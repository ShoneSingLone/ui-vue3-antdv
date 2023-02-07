import { defineComponent } from "vue";

export const ReadonlyItem = defineComponent({
	props: ["value"],
	render() {
		return (
			<div class="ant-input cursor-not-allowed xItem_readonly">
				{this.value}
			</div>
		);
	}
});
