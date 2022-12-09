import { resolveComponent } from "vue";
import { vUtils } from "../../ventoseUtils";

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

	const PROPERTY_OPTIONS = property.options;
	const componentPropertyOmitOptions = vUtils.omit(property, ["options"]);

	const renderOptions = () => {
		if (property.isButton) {
			return vUtils.map(PROPERTY_OPTIONS, option => {
				return <RadioButton value={option.value}>{option.label}</RadioButton>;
			});
		}
		return vUtils.map(PROPERTY_OPTIONS, option => {
			return <Radio value={option.value}>{option.label}</Radio>;
		});
	};

	return (
		<RadioGroup
			{...componentPropertyOmitOptions}
			{...listeners}
			v-slots={{ default: renderOptions }}
		/>
	);
};
