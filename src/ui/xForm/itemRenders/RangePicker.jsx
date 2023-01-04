import { Cpt_UI_locale } from "../../State_UI";
import { resolveComponent } from "vue";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框
 * @param {any} slots}
 * @returns {any}
 */
export default ({ properties, slots, listeners }) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	const RangePicker = resolveComponent("aRangePicker");

	/*let value = "";
	if (properties.value) {
		if (xU.isArray(properties.value)) {
			value = [
				xU.safeDate(properties.value[0]),
				xU.safeDate(properties.value[1])
			];
		}
	}*/
	console.log("properties", properties.value);
	return (
		<RangePicker
			{...properties}
			{...listeners}
			v-slots={slots}
			locale={Cpt_UI_locale.value.DatePicker}
		/>
	);
};
