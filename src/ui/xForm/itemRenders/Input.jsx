import { resolveComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "@ventose/ui";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框 isTextarea
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
	/* 只读模式下的 */
	if (properties.readonly) {
		return <ReadonlyItem value={properties.value} />;
	}

	let component = resolveComponent("aInput");
	if (properties.isPassword) {
		component = resolveComponent("aInputPassword");
	} else if (properties.isNumber) {
		component = resolveComponent("aInputNumber");
	} else if (properties.isTextarea) {
		component = resolveComponent("aTextarea");
		properties.autoSize = properties.autoSize || {
			minRows: 4,
			maxRows: 6
		};
	} else if (properties.isSearch) {
		component = resolveComponent("aInputSearch");
	}
	// properties.disabled=true;
	return (
		<component
			{...xU.omit(properties, propsWillDeleteFromConfigs)}
			{...listeners}
			v-slots={slots}
		/>
	);
};
