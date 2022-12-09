import { DatePicker } from "ant-design-vue";
import dayjs from "dayjs";
import { Cpt_UI_locale } from "../../State_UI";
import { xU } from "../../ventoseUtils";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isPassword 密码输入框
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	let value = "";
	if (property.value) {
		value = dayjs(property.value);
		xU.doNothing(value, property.value);
		if (value === "Invalid Date") {
			xU.doNothing("property.value", property.value);
			value = "";
		}
	}
	return (
		<DatePicker
			{...property}
			{...listeners}
			v-slots={slots}
			value={value}
			locale={Cpt_UI_locale.value.DatePicker}
		/>
	);
};
