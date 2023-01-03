import { EVENT_TYPE } from "../../tools/validate";
import { xU } from "../../ventoseUtils";

export default ({ properties, slots, listeners }) => {
	const _property = xU.merge({}, properties, {
		checked: !!properties.value,
		onClick() {
			listeners["onUpdate:value"](!_property.value, EVENT_TYPE.update);
		}
	});
	return <aCheckbox {..._property} />;
};
