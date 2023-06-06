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
		if (!value) {
			value = "";
			return;
		}

		try {
			value = dayjs(value);
			if (typeof value === "object" && value.$d == "Invalid Date") {
				value = "";
				return;
			}
			xU(value, properties.value);
			if (value === "Invalid Date") {
				xU("properties.value", properties.value);
				value = "";
				return;
			}
		} catch (error) {

		} finally {
			return value;
		}
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

	const value = checkOneValue(properties.value);

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
