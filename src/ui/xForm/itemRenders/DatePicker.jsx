import { DatePicker, RangePicker } from "ant-design-vue";
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
	function checkOneValue(value) {
		value = dayjs(value);
		xU.doNothing(value, properties.value);
		if (value === "Invalid Date") {
			xU.doNothing("properties.value", properties.value);
			value = "";
		}
		return value;
	}

	if (properties.isRange) {
		let value;
		if (xU.isArray(properties.value)) {
			value = [
				checkOneValue(properties.value[0]),
				checkOneValue(properties.value[1])
			];
		} else {
			value = [];
		}

		return (
			<RangePicker
				{...properties}
				{...listeners}
				v-slots={slots}
				value={value}
				locale={Cpt_UI_locale.value.DatePicker}
			/>
		);
	}

	return (
		<DatePicker
			{...properties}
			{...listeners}
			v-slots={slots}
			value={checkOneValue(properties.value)}
			locale={Cpt_UI_locale.value.DatePicker}
		/>
	);
};
