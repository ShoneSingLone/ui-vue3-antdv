import { defineComponent, h, markRaw } from "vue";

export default defineComponent(
	markRaw({
		name: "xRender",
		props: {
			render: {
				type: Function,
				required: true
			}
		},
		render() {
			return h(this.render, {
				vm: this,
				props: this.$props,
				attrs: this.$attrs
			});
		}
	})
);
