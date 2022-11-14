import { Select } from "ant-design-vue";
import { SelectOption } from "ant-design-vue/es/select";
import { h } from "vue";
import { EVENT_TYPE } from "../../tools/validate";
import { _ } from "../../loadCommonUtil";

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
