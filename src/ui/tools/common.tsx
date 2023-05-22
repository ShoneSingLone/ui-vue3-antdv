import { markRaw, reactive } from "vue";
import Lodash from "lodash";

type t_ReactiveState = {
	/* 重置state，除了_$开通的函数 */
	_$resetSelf: Function;
	_$null: Function;
};

/**
 * state 状态管理，state尽量使用原始类型
 * methods以 _$ 开头
 * @param stateAndMethods
 * @returns
 */
export function newReactiveState<T>(stateAndMethods: T): T & t_ReactiveState {
	/* 记录默认的初始值 */
	/* @ts-ignore */
	const __defaultValues = {};

	function isFunctionInState({ value, prop }) {
		if (value) {
			const valueType = typeof value;
			let isFunction = valueType == "function";
			if (isFunction) {
				isFunction = /^_\$/.test(prop);
				if (isFunction) {
					return true;
				}
			}
		} else {
			return false;
		}
	}

	Lodash.each(stateAndMethods as any, (value: any, prop: string) => {
		if (isFunctionInState({ value, prop })) {
			stateAndMethods[prop] = markRaw(value);
			return;
		}

		try {
			/* 所有非function prop:state中尽量使用原始类型数据*/
			/* @ts-ignore */
			__defaultValues[prop] = Lodash.cloneDeep(value);
		} catch (error) {
			/* @ts-ignore */
			console.error(error);
		}
	});

	const innerVariablesAndMethods = {
		__defaultValues: markRaw(__defaultValues),
		/* 重置 */
		_$resetSelf: markRaw(function () {
			/* @ts-ignore */
			Lodash.each(stateAndMethods.__defaultValues, (value, prop) => {
				stateAndMethods[prop] = value;
			});
		}),
		/* unmount时清空数据 */
		_$null: markRaw(function () {
			/* @ts-ignore */
			Lodash.each(stateAndMethods, (value, prop: string) => {
				/* 以_$开头的methods */
				if (isFunctionInState({ value, prop })) {
					return;
				}
				/* 内置的变量和方法 */
				if (!Object.keys(innerVariablesAndMethods).includes(prop)) {
					delete stateAndMethods[prop];
				}
			});
		})
	};

	/* 添加内置状态和函数 */
	Lodash.each(
		innerVariablesAndMethods,
		(value, prop) => (stateAndMethods[prop] = value)
	);
	/* @ts-ignore */
	return reactive(stateAndMethods);
}
