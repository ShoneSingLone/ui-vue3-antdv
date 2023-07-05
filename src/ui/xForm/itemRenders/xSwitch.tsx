import { xU } from "../../ventoseUtils";
import { defineComponent } from "vue";

export const xSwitch = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	mounted() {
		xU("xItem ComponentSample");
	},
	data(vm) {
		return {
			_modelValue: ""
		};
	},
	methods: {},
	watch: {
		"properties.value"(value) {
			if (value !== undefined) {
				if (value !== this._modelValue) {
					this._modelValue = value;
				}
			}
		},
		_modelValue(modelValue) {
			this.listeners["onUpdate:value"](modelValue);
		}
	},
	computed: {},
	render(vm) {
		const { properties, listeners, propsWillDeleteFromConfigs } = vm;
		/*用span包裹：宽度自适应*/
		return (
			<div class="x-item_switch">
				<ElSwitch
					v-model={this._modelValue}
					{...xU.omit(listeners, ["onUpdate:value"])}
					{...xU.omit(properties, ["value", ...propsWillDeleteFromConfigs])}
				/>
			</div>
		);
	}
});
