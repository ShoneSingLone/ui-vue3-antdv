import _ from "lodash";
import dayjs from "dayjs";
import $ from "jquery";
import { get as idbGet, set as idbSet } from "idb-keyval";

/* 组件属性是否是on开头，组件的事件监听*/
const onRE = /^on[^a-z]/;

const VueComponents: any = {};

const privateLodash = {
	..._,
	WORDS: {
		INVALID_DATE: "Invalid Date",
		format_ymd: "YYYY-MM-DD"
	},
	/**
	 * 用于Boundless 解析vue SFC文件
	 * @param {*} code
	 * @returns
	 */
	async asyncImportSFC(
		url: string,
		/* window.Vue */
		__Vue: object
	): Promise<object> {
		if (VueComponents[url]) {
			return VueComponents[url];
		}
		const scfSourceCode = await privateLodash.asyncLoadText(url);
		const scfObjSourceCode = privateLodash.VueLoader(scfSourceCode);
		VueComponents[url] = await privateLodash.getVueComponentBySourceCode(
			url,
			scfObjSourceCode,
			__Vue
		);
		return VueComponents[url];
	},
	async getVueComponentBySourceCode(
		url: string,
		scfObjSourceCode: string,
		__Vue: object
	): Promise<object> {
		const scfObjAsyncFn = new Function(
			"argVue",
			"argPayload",
			`console.log(\`${url}\`)\nreturn (${scfObjSourceCode})(argVue,argPayload);`
		);
		const scfObj = await scfObjAsyncFn(__Vue, {
			url
		});
		return scfObj;
	},
	/* * @parseContent：满足`return {}`形式的字符串 */
	parseContent: (returnSentence: string) => {
		if (!returnSentence) return;
		return new Function(`${returnSentence} return module();`);
	},
	payloadIdCount: 1,
	payloadIdCountMax: 40000,
	payloadDateNow: Date.now(),
	genId: (category: string) => {
		const { payloadIdCount, payloadIdCountMax, payloadDateNow } = privateLodash;
		if (payloadIdCount > payloadIdCountMax) {
			privateLodash.payloadIdCount = 1;
			privateLodash.payloadDateNow = Date.now();
		}
		return `${category}_${payloadDateNow}_${privateLodash.payloadIdCount++}`;
	},
	VueLoader: (code: string) => {
		function getSource(source: string, type: string) {
			var regex = new RegExp("<" + type + "[^>]*>");
			var openingTag: any = source.match(regex);
			if (!openingTag) return "";
			else openingTag = openingTag[0];
			var targetSource = source.slice(
				source.indexOf(openingTag) + openingTag.length,
				source.lastIndexOf("</" + type + ">")
			);
			return type === "template"
				? targetSource.replace(/`/g, "\\`")
				: targetSource;
		}

		function splitCode() {
			if (!/TEMPLATE_PLACEHOLDER/.test(code)) {
				alert("SFC miss TEMPLATE_PLACEHOLDER");
				console.error(code);
			}
			return getSource(code, "script").replace(
				/TEMPLATE_PLACEHOLDER/,
				`template: \`${getSource(code, "template")}\``
			);
		}

		return splitCode();
	},
	/**
	 * async 执行jsx module 文件
	 * @param {*} url
	 */
	async asyncExecFnString(url: string) {
		const data = await privateLodash.asyncLoadText(url);
		return privateLodash.parseContent(data);
	},
	/*lodash IDE 能识别*/
	doNothing: (...args: any[]) => {
		if (localStorage.isShowDevLog) {
			const e = new Error();
			console.log("🚀:", e?.stack?.split("\n")[2].replace("    at ", ""));
			console.log.apply(console, args);
		}
	},
	/* 睡眠 t:setTimeout during time*/
	sleep: (t: number) => new Promise(r => setTimeout(r, t)),
	isOn: (key: string) => onRE.test(key),
	isModelListener: (key: string) => {
		key = String(key);
		if (!key) {
			return false;
		}
		return key.startsWith("onUpdate:");
	},
	isListener: (key: any) => {
		key = String(key);
		if (!key) {
			return false;
		}
		return privateLodash.isOn(key) || privateLodash.isModelListener(key);
	},
	/*是否非空数组*/
	isArrayFill: arr => {
		if (Object.prototype.toString.call(arr) == "[object Array]") {
			if (arr.length > 0) {
				return true;
			}
		}
		return false;
	},
	/*对象至少有一个属性*/
	isObjectFill: (obj: any) =>
		privateLodash.isPlainObject(obj) && Object.keys(obj).length > 0,
	/***
	 * 返回数组的第一个value，
	 * 通过check,
	 * 为真则返回value,
	 * 否则返回false,
	 * 默认check为 vUtils.isInput
	 * @param arr
	 * @param fnCheck
	 * @return {firstValue|false}
	 */
	safeFirst: (arr, fnCheck) => {
		fnCheck = fnCheck || (value => privateLodash.isInput(value));
		const obj = privateLodash.first(arr);
		return fnCheck(obj) ? obj : false;
	},
	/***
	 *
	 * @param val
	 * @param isBeautiful
	 * @return {string}
	 */
	safeToString: (val, isBeautiful) => {
		if (typeof val === "object") {
			if (isBeautiful) {
				return JSON.stringify(val, null, 2);
			} else {
				return JSON.stringify(val);
			}
		} else {
			return String(val);
		}
	},

	safeParse: (val, defaultObj: {}) => {
		let obj = defaultObj;
		try {
			obj = JSON.parse(val);
			if (!val) {
				obj = defaultObj;
				throw new Error("json parse error");
			}
		} catch (error) {
			privateLodash.doNothing(error);
		}
		return obj;
	},

	safeSplit: function (target, sp) {
		return target?.split ? target.split(sp) : [];
	},
	/***
	 * dayjs对象或者""
	 * @param val
	 * @return {string|dayjs.Dayjs}
	 */
	safeDate: function (val) {
		if (!val) {
			return "";
		}
		let date = dayjs(val);
		if (date === privateLodash.WORDS.INVALID_DATE) {
			return "";
		} else {
			return date;
		}
	},
	/*  */

	/***
	 * false 0 都算已输入
	 * @param val {any}
	 * @returns {boolean}
	 */
	isInput: val => {
		if (val === undefined) {
			return false;
		}
		val = JSON.parse(JSON.stringify(val));
		if (val === 0) {
			return true;
		}
		if (val === false) {
			return true;
		}
		if (privateLodash.isArray(val)) {
			return val.length > 0;
		} else if (val) {
			return true;
		}
		return false;
	},
	/*jquery到底有没有选中目标DOM？*/
	is$Selected: $ele => $ele && $ele.length > 0,
	/**
	 * 获取对象的键和值
	 * 这个方法很灵性，有时候后面来的结构长这样 {id:value}，有且只有一个属性，
	 * 但凡写个Interface 规定数据长这样，通用性都更好
	 * [{
	 *      prop:'id',
	 *      value:'12345',
	 *      label:'唯一标识符'
	 * }]
	 * @param {*} obj
	 * @param {*} defaultValue
	 * @returns
	 */
	getObjectFirstKeyValue: (obj, defaultValue: "") => {
		if (!obj) return defaultValue;
		const keyArray = Object.keys(obj);
		if (!privateLodash.isArrayFill(keyArray)) return defaultValue;
		return privateLodash.isInput(keyArray[0]) ? obj[keyArray[0]] : defaultValue;
	},

	/**
	 * 异步加载js 在window中名为globalName的全局变量
	 * @param {string} url
	 * @param {string} globalName
	 * @returns 在window中名为globalName的全局变量
	 */
	asyncLoadJS: async (url, globalName) => {
		if (window[globalName]) {
			return window[globalName];
		}
		const $style = $("<style/>").attr("id", `${asyncLoadJS}${globalName}`);
		$style.appendTo($("body")).on("load", function () {
			return window[globalName];
		});
		$style.attr("src", url);
	},

	ensureValueDone: async fnGetValue => {
		return new Promise(async resolve => {
			let exeFnGetValue = async function () {
				const value = await fnGetValue();
				if (value) {
					exeFnGetValue = null;
					resolve(value);
				} else {
					setTimeout(exeFnGetValue, 1000 * exeFnGetValue.count++);
				}
			};
			exeFnGetValue.count = 1;
			exeFnGetValue();
		});
	},
	/* 生成合法的键名 */
	genProp: someString => {
		return `k${privateLodash.camelCase(someString)}`;
	},
	preload: (baseModule, deps) => {
		if (!deps || deps.length === 0) {
			return baseModule();
		}
		return Promise.all(
			deps.map(dep => {
				dep = `${base}${dep}`;
				if (dep in seen) return;
				seen[dep] = true;
				const isCss = dep.endsWith(".css");
				const cssSelector = isCss ? '[rel="stylesheet"]' : "";
				if (document.querySelector(`link[href="${dep}"] ${cssSelector}`)) {
					return;
				}
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) {
					link.as = "script";
					link.crossOrigin = "";
				}
				link.href = dep;
				document.head.appendChild(link);
				if (isCss) {
					return new Promise((res, rej) => {
						link.addEventListener("load", res);
						link.addEventListener("error", rej);
					});
				}
			})
		).then(() => baseModule());
	},
	/**
	 *
	 * @param {*} url
	 * @returns
	 */
	asyncLoadText: async function (url) {
		/* 在开发模式下App.vue 会设置这个对象 */
		if (!window.___VENTOSE_UI_IS_DEV_MODE) {
			const res = await idbGet(url);
			if (res) {
				return res;
			}
		}
		/* https://learn.jquery.com/ */
		/* https://api.jquery.com/jQuery.ajax/  */
		return new Promise((resolve, reject) =>
			$.ajax({
				type: "GET",
				async: true,
				url,
				dataType: "text",
				success(...args) {
					if (!window.___VENTOSE_UI_IS_DEV_MODE) {
						idbSet(url, args[0]);
					}
					resolve.apply(null, args);
				},
				error: reject
			})
		);
	},
	/**
	 *
	 * @param {*} cssname
	 * @returns
	 */
	loadCss: function (cssname) {
		const cssPath = `${cssname}`;
		let $link = $("<link/>", { rel: "stylesheet", type: "text/css" });
		$link.appendTo($("head"));
		$link[0].href = `${cssPath}?_t=${Date.now()}`;
		/* destroy 的时候移除已加载的模块css，酌情使用 */
		return () => {
			$link.remove();
			$link = null;
		};
	},

	dateFormat: function (date, format) {
		if (!format) {
			format = "YYYY-MM-DD";
		}
		if (format === 1) {
			format = "YYYY-MM-DD HH:mm:ss";
		}
		const label = dayjs(date).format(format);
		return label === "Invalid Date" ? "--" : label;
	},

	keepDecimals: function (val, fractionDigits: 2) {
		let num = Number((val * 100) / 1024 / 100).toFixed(fractionDigits);
		if (num === "NaN") {
			num = "-";
		}
		return num;
	},

	valueToLabel: function (value, options) {
		const target = privateLodash.find(options, {
			value
		});
		if (target) {
			return target.label;
		} else {
			return "--";
		}
	},
	timego: function (timestamp) {
		let minutes, hours, days, seconds, mouth, year;
		const timeNow = parseInt(new Date().getTime() / 1000);
		seconds = timeNow - timestamp;
		if (seconds > 86400 * 30 * 12) {
			year = parseInt(seconds / (86400 * 30 * 12));
		} else {
			year = 0;
		}
		if (seconds > 86400 * 30) {
			mouth = parseInt(seconds / (86400 * 30));
		} else {
			mouth = 0;
		}
		if (seconds > 86400) {
			days = parseInt(seconds / 86400);
		} else {
			days = 0;
		}
		if (seconds > 3600) {
			hours = parseInt(seconds / 3600);
		} else {
			hours = 0;
		}
		minutes = parseInt(seconds / 60);
		if (year > 0) {
			return year + "年前";
		} else if (mouth > 0 && year <= 0) {
			return mouth + "月前";
		} else if (days > 0 && mouth <= 0) {
			return days + "天前";
		} else if (days <= 0 && hours > 0) {
			return hours + "小时前";
		} else if (hours <= 0 && minutes > 0) {
			return minutes + "分钟前";
		} else if (minutes <= 0 && seconds > 0) {
			if (seconds < 30) {
				return "刚刚";
			} else {
				return seconds + "秒前";
			}
		} else {
			return "刚刚";
		}
	},
	htmlFilter: (html: string) => {
		if (!html) return;
		let reg = /<\/?.+?\/?>/g;
		return html.replace(reg, "") || "";
	},
	/**
	 * 对object set 或 get 属性值，保证不会undefined
	 * MutatingProps(state,"user.role.public",false);
	 * @param item
	 * @param prop
	 * @param val
	 * @returns
	 */
	MutatingProps: (item: any, prop: string, val = null) => {
		item = item || {};
		const propArray = prop.split(".");
		let key = "";
		let nextItem = item;

		const setVal = () => {
			while (((key as any) = propArray.shift())) {
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
			while (((key as any) = propArray.shift())) {
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
			privateLodash.isString(val) ||
			privateLodash.isBoolean(val) ||
			(privateLodash.isNumber(val) && !privateLodash.isNaN(val))
		) {
			setVal();
		} else {
			return getVal();
		}
		return item;
	}
};

export { privateLodash as vUtils };
