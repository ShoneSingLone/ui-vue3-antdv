import { Checkbox, Switch } from "ant-design-vue";
import { EVENT_TYPE } from "../../tools/validate";
import { h } from "vue";
import { vUtils } from "../../ventoseUtils";

/*
export default ({property, slots, listeners}) => {

    return <Switch {...property} {...listeners} v-slots={slots}/>;
};
*/

export default ({ property, slots, listeners }) => {
	const _property = vUtils.merge({}, property, {
		checked: property.value,
		onClick() {
			listeners["onUpdate:value"](!_property.value);
		}
	});
	/*用span包裹：宽度自适应*/
	return <span>{h(Switch, vUtils.omit(_property, ["value"]))}</span>;
};
