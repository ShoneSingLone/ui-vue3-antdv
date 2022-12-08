import _ from "lodash";
import { resolveComponent } from "vue";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isButton是否是Button样式
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	const Radio = resolveComponent("aRadio");
	const RadioGroup = resolveComponent("aRadioGroup");
	const RadioButton = resolveComponent("aRadioButton");

	const _property = vUtils.omit(property, ["options"]);
	const renderOptions = () => {
		if (property.isButton) {
			return vUtils.map(property.options, option => {
				return <RadioButton value={option.value}>{option.label}</RadioButton>;
			});
		}
		return vUtils.map(property.options, option => {
			return <Radio value={option.value}>{option.label}</Radio>;
		});
	};

	return (
		<RadioGroup
			{...property}
			{...listeners}
			v-slots={{ default: renderOptions }}
		/>
	);
};
