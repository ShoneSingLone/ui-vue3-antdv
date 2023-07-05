import { resolveComponent } from "vue";
import { xU } from "../../ventoseUtils";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isButton是否是Button样式
 * @param {any} slots}
 * @returns {any}
 */
export default ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	const Radio = resolveComponent("ElRadio");
	const RadioGroup = resolveComponent("ElRadioGroup");
	const RadioButton = resolveComponent("ElRadioButton");

	const PROPERTY_OPTIONS = properties.options;
	const componentPropertyOmitOptions = xU.omit(properties, ["options"]);

	const renderOptions = () => {
		if (properties.isButton) {
			return xU.map(PROPERTY_OPTIONS, option => {
				return <RadioButton value={option.value}>{option.label}</RadioButton>;
			});
		}
		return xU.map(PROPERTY_OPTIONS, option => {
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
