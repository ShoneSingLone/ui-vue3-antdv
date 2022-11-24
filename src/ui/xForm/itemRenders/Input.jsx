import { Input, InputNumber } from "ant-design-vue";
import { InputPassword, Textarea, InputSearch } from "ant-design-vue/es/input";
import { h } from "vue";
import { _ } from "../../loadCommonUtil";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isPassword 密码输入框 isTextarea
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	let component = Input;
	if (property.isPassword) {
		component = InputPassword;
	}
	if (property.isNumber) {
		component = InputNumber;
	}
	if (property.isTextarea) {
		component = Textarea;
		property.autoSize = property.autoSize || {
			minRows: 4,
			maxRows: 6
		};
	}
	if (property.isSearch) {
		component = InputSearch;
	}
	return <component {...property} {...listeners} v-slots={slots} />;
};
