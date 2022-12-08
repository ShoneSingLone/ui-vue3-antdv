import { h, resolveComponent } from "vue";
import { _ } from "../../loadCommonUtil";

const Input = resolveComponent("aInput");
const InputNumber = resolveComponent("aInputNumber");
const InputPassword = resolveComponent("aInputPassword");
const Textarea = resolveComponent("aTextarea");
const InputSearch = resolveComponent("aInputSearch");

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
