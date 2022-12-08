import { h, resolveComponent } from "vue";
import { EVENT_TYPE } from "../../tools/validate";
import { _ } from "../../loadCommonUtil";

const Select = resolveComponent("aSelect");
const SelectOption = resolveComponent("aSelectOption");

export default ({ property, listeners }) => {
	const _property = _.omit(property, ["options"]);
	const renderOptions = () => {
		return _.map(property.options, option => {
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
