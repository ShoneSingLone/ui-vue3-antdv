import { defineComponent } from "vue";
import { xU } from "../../ventoseUtils";
import { ReadonlyItem } from "./Readonly";

export const ComponentSample = defineComponent({
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

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		/* 只读模式下的 */
		if (properties.isReadonly) {
			return <ReadonlyItem value={properties.value} />;
		}

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		const _property = xU.omit(properties, [
			...propsWillDeleteFromConfigs,
			"options",
			"renderOptions"
		]);
		const renderOptions = () => {
			if (properties.renderOptions) {
				return properties.renderOptions();
			}
			return null;
		};
		return (
			<ElInput
				{...listeners}
				{..._property}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
