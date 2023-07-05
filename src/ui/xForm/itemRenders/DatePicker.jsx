import { ElDatePicker } from "element-plus";
import dayjs from "dayjs";
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

	const value = checkOneValue(properties.value);

	return (
		<ElDatePicker
			{...properties}
			{...listeners}
			v-slots={slots}
			value={value}
		/>
	);
};
