import { DatePicker } from "ant-design-vue";
import dayjs from "dayjs";
import { Cpt_UI_locale } from "../../State_UI";
import { _ } from "../../loadCommonUtil";

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
		_.doNothing(value, property.value);
		if (value === "Invalid Date") {
			_.doNothing("property.value", property.value);
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
