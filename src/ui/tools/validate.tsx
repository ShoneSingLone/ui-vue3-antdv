import { xU } from "../ventoseUtils";
import $ from "jquery";
import { State_UI } from "../State_UI";

export const getValueNeedVarify = ({ value, xItemConfigs }: any) => {
	if (value !== undefined) {
		return value;
	} else if (xItemConfigs.value !== undefined) {
		return xItemConfigs.value;
	} else {
		console.error(new Error("miss value"));
		return xItemConfigs.defaultValue;
	}
};

export const EVENT_TYPE = {
	validateForm: "validateForm",
	update: "update",
	change: "change",
	input: "input",
	blur: "blur",
	focus: "focus"
};

export const TIPS_TYPE = {
	success: "success",
	error: "error"
};

export async function validateItem(idSelector) {
	const allItems = $(`${idSelector} [id^=xItem_]`);
	xU.map(allItems, (domEle, index, $ele) => {
		console.log(State_UI.xItemCollection[domEle.id]);
	});
}

/**
 * 单独调用校验表单的方法:可以附加valuesCollection，以valuesCollection提供的prop为基准进行校验
 * 需要提供 configsForm 包含各个xItem configs
 * 有value 有rules => configs有validate属性（判断有rules就动态添加validate方法）
 * @param {*} configsForm
 * @returns
 */
export async function validateForm(
	configsForm: any,
	valuesCollection?: Object
) {
	let propsArray = Object.keys(configsForm);
	/* 如果提供 数据集，则以数据集的数据为校验对象 */
	if (valuesCollection) {
		propsArray = Object.keys(valuesCollection);
	}
	return Promise.all(
		xU.map(propsArray, prop => {
			const configs = configsForm[prop];
			const valueNeedVarify = getValueNeedVarify({
				//@ts-ignore
				value: (valuesCollection && valuesCollection[prop]) || configs.value,
				xItemConfigs: configs
			});

			return new Promise(resolve => {
				try {
					(() => {
						/*处理不校验的情况*/
						const isFalse = !configs.isShow;
						/*configs.isShow至少默认是个true，如果是falsy，则明确为不显示*/
						if (isFalse) {
							return resolve("");
						}
						const isResFalse =
							xU.isFunction(configs.isShow) && !configs.isShow();
						if (isResFalse) {
							return resolve("");
						}
						/*处理不校验的情况*/
					})();

					if (configs.validate) {
						/*
						 * xItem的validate使用了debounce ，
						 * 采用callback异步处理resolve,
						 * configs.validate完成之后调用resolve
						 * */
						/*触发方式是校验表单，将无视其他trigger规则，权重最大*/
						configs.validate({
							eventType: EVENT_TYPE.validateForm,
							value: valueNeedVarify,
							resolve
						});
					} else {
						resolve("");
					}
				} catch (error) {
					console.error(error);
				}
			});
		})
	)
		.then(results => {
			//@ts-ignore
			results = results.filter(res => res && res[0] && res[1]);
			return results;
		})
		.catch(error => {
			return error;
		});
}

/**
 * 没有错误信息则校验通过
 * @param {*} res
 * @returns
 */
export const AllWasWell = (res: any) => {
	return xU.isArray(res) && res.length === 0;
};

export const checkXItem = async ({
	xItemConfigs,
	fnCheckedCallback,
	value,
	FormItemId,
	resolve
}: any) => {
	const valueNeedVarify = getValueNeedVarify({ value, xItemConfigs });
	xItemConfigs.checking = true;
	fnCheckedCallback = fnCheckedCallback || xU.doNothing;
	FormItemId = FormItemId || xItemConfigs.FormItemId;
	let result;
	try {
		const { rules, prop } = xItemConfigs;
		result = await (async () => {
			let dontCheck = 0;
			for (const element of rules) {
				const rule = element;
				const trigger = rule.trigger || [];
				/* isFail */
				let isFail = await (async () => {
					/*如果是validateForm 无视 trigger 限定的事件列表，否则根据trigger列表 */
					let trigBy;
					const isNeedVerify = (() => {
						/*is ValidateForm*/
						if (
							xItemConfigs.validate.triggerEventsObj[EVENT_TYPE.validateForm]
						) {
							trigBy = "validateForm";
							return true;
						}
						const isInTrigger = (eventName: string) =>
							xItemConfigs.validate.triggerEventsObj[eventName];
						/*some Event In Trigger*/
						if (xU.some(trigger, isInTrigger)) {
							trigBy = `triggerEvent ${trigger.toString()}`;
							return true;
						}

						/*trigger Include Update*/
						if (trigger.includes(EVENT_TYPE.update)) {
							const updateTrigger = [
								EVENT_TYPE.change,
								EVENT_TYPE.input,
								EVENT_TYPE.blur
							];
							if (xU.some(updateTrigger, isInTrigger)) {
								trigBy = "update";
								return true;
							}
						}
						/* */
						return false;
					})();

					trigBy &&
						xU.doNothing(
							`%cValidate trigger off by [${trigBy}]`,
							"color:yellow;background:green;"
						);

					if (isNeedVerify) {
						const currentValue = (() => {
							try {
								return JSON.parse(JSON.stringify(valueNeedVarify));
							} catch (e) {
								return "";
							}
						})();
						const validateResult = await rule.validator(currentValue, {
							configs: xItemConfigs,
							rule
						});
						if (validateResult) {
							return validateResult;
						}
					} else {
						dontCheck++;
					}
					return false;
				})();

				/* 任意一个校验不通过，就可以停止循环返回结果了 */
				if (isFail) {
					return [prop, rule.msg, FormItemId];
				}
				/*false 继续*/
			}
			/*TODO:*/
			/*没有一个触发校验，则不需要修改tips*/
			if (dontCheck === rules.length) {
				/*不需要修改tips*/
				return [false, false];
			} else {
				return [prop, false];
			}
		})();
		fnCheckedCallback(result);
	} catch (error) {
		console.error(error);
	} finally {
		if (xU.isFunction(resolve)) {
			resolve(result);
		}
		/*校验执行后*/
		xItemConfigs.validate.triggerEventsObj = {};
		return result;
	}
};
