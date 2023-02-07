import { defineComponent, resolveComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "@ventose/ui";
import { diff } from "jsondiffpatch";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框 isTextarea
 * @param {any} slots}
 * @returns {any}
 */

export default defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	mounted() {
		xU("xItem Input");
	},
	data(vm) {
		return {
			oldComponent: "",
			ComponentInstance: "",
			_modelValue: ""
		};
	},
	methods: {
		diffComponent(type) {
			if (type === this.oldComponent) {
				return this.ComponentInstance;
			}
			this.oldComponent = type;
			this.ComponentInstance = resolveComponent(type);
			if (type === "aTextarea") {
				this.properties.autoSize = this.properties.autoSize || {
					minRows: 4,
					maxRows: 6
				};
			}
		}
	},
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
	computed: {
		modelValue: {
			get() {
				if (this._modelValue != this.properties?.value) {
					return this.properties?.value || "";
				} else {
					return this._modelValue;
				}
			},
			set(modelValue) {
				this._modelValue = modelValue;
				this.listeners["onUpdate:value"](modelValue);
			}
		},
		component({ properties }) {
			if (!this.ComponentInstance) {
				this.diffComponent("aInput");
			}
			if (properties.isPassword) {
				this.diffComponent("aInputPassword");
			} else if (properties.isNumber) {
				this.diffComponent("aInputNumber");
			} else if (properties.isTextarea) {
				this.diffComponent("aTextarea");
			} else if (properties.isSearch) {
				this.diffComponent("aInputSearch");
			}
			return this.ComponentInstance;
		}
	},
	render(vm) {
		const {
			properties,
			slots,
			listeners,
			propsWillDeleteFromConfigs,
			component
		} = vm;

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		/* 只读模式下的 */
		if (properties.readonly) {
			return <ReadonlyItem value={properties.value} />;
		}

		return (
			<component
				v-model:value={this._modelValue}
				{...xU.omit(properties, ["value", ...propsWillDeleteFromConfigs])}
				{...listeners}
				v-slots={slots}
			/>
		);
	}
});
