import { Checkbox, CheckboxGroup } from "ant-design-vue";
import { h } from "vue";
import { EVENT_TYPE } from "../../tools/validate";

export default ({ property }) => {
	const _property = xU.merge({}, property, {
		checked: property.value,
		onClick() {
			_property["onUpdate:value"](!_property.value, EVENT_TYPE.update);
		}
	});
	return h(Checkbox, _property);
};
