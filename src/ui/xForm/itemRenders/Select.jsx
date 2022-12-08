import { h, resolveComponent } from "vue";
import { EVENT_TYPE } from "../../tools/validate";
import { vUtils } from "../../ventoseUtils";

export default ({ property, listeners }) => {
	const Select = resolveComponent("aSelect");
	const SelectOption = resolveComponent("aSelectOption");
	const _property = vUtils.omit(property, ["options"]);
	const renderOptions = () => {
		return vUtils.map(property.options, option => {
			return <SelectOption value={option.value}>{option.label}</SelectOption>;
		});
	};

	return (
		<Select
			v-slots={{ default: renderOptions }}
			{...listeners}
			{..._property}
		/>
	);
};
