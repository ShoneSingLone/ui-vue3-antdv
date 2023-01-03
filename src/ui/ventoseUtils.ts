import _, { LoDashStatic } from "lodash";
import dayjs from "dayjs";
import $ from "jquery";
import { iStorage } from "./tools/storage";

/* 组件属性是否是on开头，组件的事件监听*/
const onRE = /^on[^a-z]/;

const VueComponents: any = {};
/* @ts-ignore */
const isDevMode =
	/* @ts-ignore */
	localStorage.___VENTOSE_UI_IS_DEV_MODE === "VENTOSE_UI_IS_DEV_MODE";
const privateLodash = {
	..._,
	WORDS: {
		INVALID_DATE: "Invalid Date",
		format_ymd: "YYYY-MM-DD"
	},
	launchFullscreen(element: any) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullScreen();
		}
	},
	exitFullscreen() {
		/* @ts-ignore */
		document.exitFullscreen();
	},
	hashCode(str: string) {
		var hash = 0,
			i,
			chr;
		if (str.length === 0) {
			return "0";
		}
		for (i = 0; i < str.length; i++) {
			chr = str.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			/* Convert to 32bit integer */
			hash |= 0;
		}
		return String(hash);
	},
	/* 从jQuery对象中，获取leftTop的数值 */
	getLeftTopFromAbsolute($ele: JQuery) {
		const _top = $ele.css("top");
		const _left = $ele.css("left");
		const getNum = (x: string) => {
			const match = String(x).match(/^(.*)px$/);
			/* @ts-ignore */
			if (match && match[1]) {
				/* @ts-ignore */
				return Number(match[1]);
			} else {
				return 0;
			}
		};
		const top = getNum(_top);
		const left = getNum(_left);
		console.log(left, top);
		return { top, left };
	},
	getLeftTopFromTranslate($ele: JQuery) {
		const transform = $ele.css("transform");
		const match = String(transform).match(/^matrix\((.*)\)$/);
		if (!match) {
			return { top: 0, left: 0 };
		}
		/* @ts-ignore */
		if (match && match[1]) {
			/* @ts-ignore */
			const [a, b, c, d, e, f] = String(match[1])
				.split(",")
				.map(i => Number(privateLodash.trim(i)));

			return {
				left: a + c + e,
				top: b + d + f
			};
		}
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
	isArrayFill: (arr: any) => {
		if (Array.isArray(arr)) {
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
	 * 默认check为 xU.isInput
	 * @param arr
	 * @param fnCheck
	 * @return {firstValue|false}
	 */
	safeFirst: (arr: any[], fnCheck: Function) => {
		fnCheck = fnCheck || ((value: any) => privateLodash.isInput(value));
		const obj = privateLodash.first(arr);
		return fnCheck(obj) ? obj : false;
	},
	/***
	 *
	 * @param val
	 * @param isBeautiful
	 * @return {string}
	 */
	safeToString: (val: object, isBeautiful = false) => {
		try {
			if (isBeautiful) {
				return JSON.stringify(val, null, 2);
			} else {
				return JSON.stringify(val);
			}
		} catch (error) {
			return "";
		}
	},
	safeParse: (val: string, defaultObj: {}) => {
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

	safeSplit: (target: string, sp = "") => {
		return target?.split ? target.split(sp) : [];
	},
	/***
	 * dayjs对象或者""
	 * @param val
	 * @return {string|dayjs.Dayjs}
	 */
	safeDate: (val: dayjs.ConfigType) => {
		if (!val) {
			return "";
		}
		let date = dayjs(val);
		/* @ts-ignore */
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
	isInput: (val: any) => {
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
	is$Selected: ($ele: JQuery) => $ele && $ele.jquery && $ele.length > 0,
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
	getObjectFirstKeyValue: (obj: object, defaultValue: "") => {
		if (!obj) {
			return defaultValue;
		}
		const keyArray = Object.keys(obj);
		if (!privateLodash.isArrayFill(keyArray)) return defaultValue;
		const prop = keyArray[0];
		/* @ts-ignore */
		return privateLodash.isInput(prop) && obj[prop] ? obj[prop] : defaultValue;
	},
	/**
	 *
	 * @param {*} cssname
	 * @returns
	 */
	loadCss(cssname: string) {
		const cssPath = `${cssname}`;
		let $link = $("<link/>", { rel: "stylesheet", type: "text/css" });
		$link.appendTo($("head"));
		/* @ts-ignore */
		$link[0].href = `${cssPath}?_t=${Date.now()}`;
		/* destroy 的时候移除已加载的模块css，酌情使用 */
		return () => {
			$link.remove();
			/* @ts-ignore */
			$link = null;
		};
	},
	async asyncLoadStyle(cssURL: string, options?: object) {
		/* @ts-ignore */
		let { isReplace, id } = options || { isReplace: false, id: "" };
		/* 提供ID 用于替换同一个style 元素的内容 */
		id = id || _.camelCase(cssURL);
		let content;
		const $style = $(`#${id}`);
		if ($style.length == 0) {
			/* 如果不存在，加载内容 */
			$("body").append($("<style/>", { id }));
			content = await privateLodash.asyncLoadText(cssURL);
			$style.html(content);
		} else if (isReplace) {
			/* 如果存在，且明确表示要替换同一个 */
			content = await privateLodash.asyncLoadText(cssURL);
			$style.html(content);
		}
		/* 如果已存在，不处理 */
	},
	/**
	 *
	 * @param {*} url
	 * @returns
	 */
	asyncLoadText: async function (url: string) {
		/* 在开发模式下App.vue 会设置这个对象 */
		/* @ts-ignore */
		if (!isDevMode) {
			const res = await iStorage(url);
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
					/* @ts-ignore */
					if (!isDevMode) {
						iStorage(url, args[0]);
					}
					/* @ts-ignore */
					resolve.apply(null, args);
				},
				error: reject
			})
		);
	},
	/**
	 * 异步加载js 在window中名为globalName的全局变量
	 * @param {string} url
	 * @param {string} globalName
	 * @returns 在window中名为globalName的全局变量
	 */
	asyncLoadJS: async (url: string, globalName: string) => {
		/* UMD 会暴露出一个全局对象，正是此globalName */
		/* @ts-ignore */
		if (window[globalName]) {
			/* @ts-ignore */
			return window[globalName];
		}
		const $style = $("<style/>").attr("id", `asyncLoadJS_${globalName}`);
		$style.appendTo($("body")).on("load", function () {
			/* @ts-ignore */
			return window[globalName];
		});
		$style.attr("src", url);
	},
	asyncGlobalJS: async (globalName: string, url: string) => {
		/* @ts-ignore */
		if (window[globalName]) {
			/* @ts-ignore */
			return window[globalName];
		}
		if (!url) {
			alert("asyncGlobalJS miss url " + globalName);
			return {};
		}
		/* @ts-ignore */
		const jsString = await privateLodash.asyncLoadText(url);
		const fn = new Function(`with(window){${jsString}}`);
		fn();
		/* @ts-ignore */
		return window[globalName];
	},
	ensureValueDone: async (fnGetValue: Function) => {
		return new Promise(async resolve => {
			let exeFnGetValue = async function () {
				const value = await fnGetValue();
				if (value) {
					/* @ts-ignore */
					exeFnGetValue = null;
					resolve(value);
				} else {
					/* @ts-ignore */
					setTimeout(exeFnGetValue, 1000 * exeFnGetValue.count++);
				}
			};
			(exeFnGetValue as any).count = 1;
			exeFnGetValue();
		});
	},
	/* 生成合法的键名 */
	genProp: (someString: string) => {
		return `k${privateLodash.camelCase(someString)}`;
	},
	/**
	 *
	 * @param date type dayjs.ConfigType = string | number | Date | dayjs.Dayjs | null | undefined
	 * @param format 默认 "YYYY-MM-DD" 1："YYYY-MM-DD HH:mm:ss"
	 * @returns
	 */
	dateFormat: (date: dayjs.ConfigType, format = "YYYY-MM-DD") => {
		if (typeof date === "number") {
			date = dayjs.unix(date);
		}
		/* @ts-ignore */
		if (format === 1) {
			format = "YYYY-MM-DD HH:mm:ss";
		}
		const label = dayjs(date).format(format);
		return label === privateLodash.WORDS.INVALID_DATE ? "--" : label;
	},

	keepDecimals: function (val: number, fractionDigits: 2) {
		let num = Number((val * 100) / 1024 / 100).toFixed(fractionDigits);
		if (num === "NaN") {
			num = "-";
		}
		return num;
	},

	valueToLabel: function (value: string, options: any[]) {
		const target = privateLodash.find(options, {
			value
		});
		if (target) {
			return target.label;
		} else {
			return "--";
		}
	},
	timego: function (timestamp: any) {
		let minutes, hours, days, seconds, mouth, year;
		/* @ts-ignore */
		const timeNow = parseInt(new Date().getTime() / 1000);
		seconds = timeNow - timestamp;

		if (seconds > 86400 * 30 * 12) {
			/* @ts-ignore */
			year = parseInt(seconds / (86400 * 30 * 12));
		} else {
			year = 0;
		}

		if (seconds > 86400 * 30) {
			/* @ts-ignore */
			mouth = parseInt(seconds / (86400 * 30));
		} else {
			mouth = 0;
		}
		if (seconds > 86400) {
			/* @ts-ignore */
			days = parseInt(seconds / 86400);
		} else {
			days = 0;
		}
		if (seconds > 3600) {
			/* @ts-ignore */
			hours = parseInt(seconds / 3600);
		} else {
			hours = 0;
		}
		/* @ts-ignore */
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
	MutatingProps: (item: any, prop: string, val = null, isDelete = false) => {
		item = item || {};
		if (/^\./.test(prop)) {
			prop = String(prop).substring(1);
		}
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
					if (val === "never" && isDelete) {
						delete nextItem[key];
					} else {
						nextItem[key] = val;
					}
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

type t_all_lodash_and_mine = typeof privateLodash & LoDashStatic;

export const xU: t_all_lodash_and_mine = new Proxy(
	/* @ts-ignore */
	function (...args: any[]) {
		/* @ts-ignore */
		if (isDevMode) {
			try {
				throw new Error("");
			} catch (error: any) {
				args.unshift(String(error.stack).split("\n")[2], "\n");
				console.log.apply(console, args);
			}
		}
	},
	{
		get(fn, prop: any) {
			/* @ts-ignore */
			if (privateLodash[prop]) {
				/* @ts-ignore */
				return privateLodash[prop];
			}
			/* @ts-ignore */
			return fn[prop];
		},
		/* @ts-ignore */
		set(fn, prop, val) {
			/* @ts-ignore */
			privateLodash[prop] = val;
			return true;
		}
	}
);
