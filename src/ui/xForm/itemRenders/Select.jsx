import { resolveComponent } from "vue";
import { xU } from "../../ventoseUtils";

export default ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	const Select = resolveComponent("aSelect");
	const SelectOption = resolveComponent("aSelectOption");
	const _property = xU.omit(properties, [
		...propsWillDeleteFromConfigs,
		"options",
		"renderOptions"
	]);
	const renderOptions = () => {
		if (properties.renderOptions) {
			return properties.renderOptions();
		} else {
			return xU.map(properties.options, option => {
				return <SelectOption value={option.value}>{option.label}</SelectOption>;
			});
		}
	};
	return (
		<Select
			{...listeners}
			{..._property}
			v-slots={{ default: renderOptions }}
		/>
	);
};
