import { resolveComponent } from "vue";
import { xU } from "../../ventoseUtils";

export default ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
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
				return (
					<aSelectOption value={option.value}>{option.label}</aSelectOption>
				);
			});
		}
	};
	return (
		<aSelect
			{...listeners}
			{..._property}
			v-slots={{ default: renderOptions }}
		/>
	);
};
