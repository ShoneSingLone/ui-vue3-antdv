import { Cpt_UI_locale } from "../../State_UI";
import { _ } from "../../loadCommonUtil";
import { resolveComponent } from "vue";
const RangePicker = resolveComponent("aRangePicker");

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isPassword 密码输入框
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	/*let value = "";
    if (property.value) {
        if (_.isArray(property.value)) {
            value = [
                _.safeDate(property.value[0]),
                _.safeDate(property.value[1])
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
