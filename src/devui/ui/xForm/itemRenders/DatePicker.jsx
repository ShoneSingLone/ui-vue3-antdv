import { DatePicker } from "ant-design-vue";
import dayjs from "dayjs";
import { Cpt_UI_locale } from "../../State_UI";
import { xU } from "../../ventoseUtils";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框
 * @param {any} slots}
 * @returns {any}
 */
export default ({ properties, slots, listeners }) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	let value = "";
	if (properties.value) {
		value = dayjs(properties.value);
		xU.doNothing(value, properties.value);
		if (value === "Invalid Date") {
			xU.doNothing("properties.value", properties.value);
			value = "";
		}
	}
	return (
		<DatePicker
			{...properties}
			{...listeners}
			v-slots={slots}
			value={value}
			locale={Cpt_UI_locale.value.DatePicker}
		/>
	);
};
