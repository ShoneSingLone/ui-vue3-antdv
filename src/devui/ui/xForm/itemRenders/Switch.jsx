import { xU } from "../../ventoseUtils";

export default ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	const _property = xU.merge({}, properties, {
		checked: properties.value,
		onClick() {
			listeners["onUpdate:value"](!_property.value);
		}
	});
	/*用span包裹：宽度自适应*/
	return (
		<div class="x-item_switch">
			<aSwitch {...xU.omit(_property, ["value"])} />
		</div>
	);
};
