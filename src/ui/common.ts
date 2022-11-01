//@ts-nocheck
import { _ } from "./loadCommonUtil";

/**
 * 对object set 或 get 属性值，保证不会undefined
 * MutatingProps(state,"user.role.public",false);
 * @param item
 * @param prop
 * @param val
 * @returns
 */
export const MutatingProps = (item, prop, val = null) => {
	item = item || {};
	const propArray = prop.split(".");
	let key = "";
	let nextItem = item;

	const setVal = () => {
		while ((key = propArray.shift())) {
			if (!key) {
				debugger;
			}
			/* 如果是最后一项，就赋值后退出 */
			if (propArray.length === 0) {
				nextItem[key] = val;
				return;
			} else {
				/* 继续循环，如果中间有undefined，添加中间项 */
				const _nextItem = nextItem[key];
				if (!_nextItem) {
					nextItem[key] = {};
				}
				nextItem = nextItem[key];
			}
		}
	};

	const getVal = () => {
		while ((key = propArray.shift())) {
			const _nextItem = nextItem[key];
			if (!_nextItem) {
				return nextItem[key];
			} else {
				if (propArray.length === 0) {
					return _nextItem;
				} else {
					nextItem = nextItem[key];
				}
			}
		}
		return nextItem;
	};

	/* 如果有输入 类似jQuery val() */
	if (
		val ||
		_.isString(val) ||
		_.isBoolean(val) ||
		(_.isNumber(val) && !_.isNaN(val))
	) {
		setVal(key, propArray, nextItem, val);
	} else {
		return getVal(key, propArray, nextItem);
	}
	return item;
};

/*
(() => {
  console.time('duration');
  const max = [...new Array(10000)].map((i, ii) => {
    const o = Date.now();
    let count = 0,
      c = Date.now();
    while (c <= o) {
      count++;
      c = Date.now();
    }
    return count;
  }).sort((a, b) => b - a)[0];
  console.log(max);
  console.timeEnd('duration'); //Max:11815 duration: 10010.89404296875 ms //count没超过两万，再做点其他计算，应该达不到这个数
})();*/

export const Utils = {
	dateFormat(date, format = "YYYY-MM-DD") {
		if (format === 1) {
			format = "YYYY-MM-DD HH:mm:ss";
		}
		const label = dayjs(date).format(format);
		return label === "Invalid Date" ? "--" : label;
	},
	keepDecimals(val, fractionDigits = 2) {
		let num = Number((val * 100) / 1024 / 100).toFixed(fractionDigits);
		if (num === "NaN") {
			num = "-";
		}
		return num;
	},
	valueToLabel(value, options) {
		const target = _.find(options, {
			value
		});
		if (target) {
			return target.label;
		} else {
			return "--";
		}
	}
};
