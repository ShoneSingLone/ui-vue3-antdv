import { defineComponent } from "vue";
import { xU } from "../../ventoseUtils";

export const Checkbox = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	computed: {
		checked: {
			get() {
				return this.properties?.value || false;
			},
			set(val) {
				this.listeners["onUpdate:value"](val);
			}
		}
	},
	render(vm) {
		const _properties = xU.omit(this.properties, [
			...this.propsWillDeleteFromConfigs
		]);
		return (
			<ElCheckbox
				v-model={this.checked}
				v-slots={this.slots}
				{...this.listeners}
				{..._properties}
			/>
		);
	}
});
