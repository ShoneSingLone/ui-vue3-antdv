import { State_UI } from "../State_UI";
import { EVENT_TYPE } from "../tools/validate";
import { xU } from "../ventoseUtils";

const { $t } = State_UI;

/* 通过校验，无错 */
const SUCCESS = false;
/* 未通过校验 */
const FAIL = true;

export const RegexFn = {
	email: () => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	mobile: () => /^1[34578]\d{9}$/
};

/**
 *  暂时没想好，之前是msg根据i18n变化
 Object.defineProperty(options,"msg",{ get(){
		return msg();
	} });
 */
const makeFormRules = options => {
	options.trigger = options.trigger || [EVENT_TYPE.update];
	options.msg = options.msg || "";
	return options;
};

export const FormRules = {
	SUCCESS,
	FAIL,
	required(msg, trigger = [EVENT_TYPE.update]) {
		return makeFormRules({
			name: "required",
			msg: msg || $t("必填项").label,
			async validator(value) {
				/*必填的简单验证*/
				if (value) {
					/*不为空数组*/
					if (xU.isArray(value)) {
						if (value.length > 0) {
							return SUCCESS;
						} else {
							return FAIL;
						}
					}
					/*TODO:object*/
					return SUCCESS;
				}

				if (xU.isBoolean(value)) return SUCCESS;
				if (xU.isNumber(value) && !xU.isNaN(value)) return SUCCESS;

				return FAIL;
			},
			trigger
		});
	},
	demo() {
		return {
			name: "Demo",
			msg: "Demo",
			async validator(value) {
				await xU.sleep(1000);
				return FAIL;
			},
			trigger: [
				EVENT_TYPE.update,
				EVENT_TYPE.input,
				EVENT_TYPE.change,
				EVENT_TYPE.blur
			]
		};
	},
	email() {
		return {
			name: "email",
			msg: () => $t("请输入email").label,
			async validator(value) {
				if (RegexFn.email().test(value)) {
					return SUCCESS;
				}
				return FAIL;
			},
			trigger: [
				EVENT_TYPE.update,
				EVENT_TYPE.input,
				EVENT_TYPE.change,
				EVENT_TYPE.blur
			]
		};
	},
	custom({ name, msg, validator, trigger }) {
		return makeFormRules({
			name,
			msg,
			validator,
			trigger
		});
	}
};
