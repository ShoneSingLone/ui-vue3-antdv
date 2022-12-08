import { Cpt_UI_locale } from "../../State_UI";
import { vUtils } from "../../ventoseUtils";
import { resolveComponent } from "vue";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isPassword 密码输入框
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	const RangePicker = resolveComponent("aRangePicker");

	/*let value = "";
	if (property.value) {
		if (vUtils.isArray(property.value)) {
			value = [
				vUtils.safeDate(property.value[0]),
				vUtils.safeDate(property.value[1])
			];
		}
	}*/
	console.log("property", property.value);
	return (
		<RangePicker
			{...property}
			{...listeners}
			v-slots={slots}
			locale={Cpt_UI_locale.value.DatePicker}
		/>
	);
};
