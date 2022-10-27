/* import merge from "lodash/merge"; import each from "lodash/each"; import map from "lodash/map"; import reduce from "lodash/reduce"; import isArray from "lodash/isArray"; import isPlainObject from "lodash/isPlainObject"; import isFunction from "lodash/isFunction"; import isString from "lodash/isString"; import isBoolean from "lodash/isBoolean"; import some from "lodash/some"; import every from "lodash/every"; import debounce from "lodash/debounce"; import isNumber from "lodash/isNumber"; import filter from "lodash/filter"; import omit from "lodash/omit"; import last from "lodash/last"; import first from "lodash/first"; import cloneDeep from "lodash/cloneDeep"; import find from "lodash/find"; export const _ = {}; const lodashFunctions = { merge, each, map, reduce, isArray, isPlainObject, isFunction, isBoolean, isString, some, every, debounce, isNumber, filter, omit, last, first, cloneDeep, find }; each(lodashFunctions, (fn, prop) => (_[prop] = fn)); */
import mylodash from "lodash";
import dayjs from "dayjs";
import $ from "jquery";

mylodash.WORDS = {
  INVALID_DATE: "Invalid Date",
  format_ymd: "YYYY-MM-DD",
};

/*lodash IDE 能识别*/
mylodash.doNothing = (...args) => {
  if (localStorage.isShowDevLog) {
    const e = new Error();
    console.log("🚀:", e.stack.split("\n")[2].replace("    at ", ""));
    console.log.apply(console, args);
  }
};

/* 睡眠 t:setTimeout during time*/
mylodash.sleep = (t) => new Promise((r) => setTimeout(r, t));

/* 组件属性是否是on开头，组件的事件监听*/
const onRE = /^on[^a-z]/;
mylodash.isOn = (key) => onRE.test(key);
mylodash.isModelListener = (key) => {
  key = String(key);
  if (!key) {
    return false;
  }

  return key.startsWith("onUpdate:");
};
mylodash.isListener = (key) => {
  key = String(key);
  if (!key) {
    return false;
  }
  return mylodash.isOn(key) || mylodash.isModelListener(key);
};
/**/
/*是否非空数组*/
mylodash.isArrayFill = (arr) => mylodash.isArray(arr) && arr.length > 0;
/*对象至少有一个属性*/
mylodash.isObjectFill = (obj) =>
  mylodash.isPlainObject(obj) && Object.keys(obj).length > 0;

/***
 * 返回数组的第一个value，
 * 通过check,
 * 为真则返回value,
 * 否则返回false,
 * 默认check为 _.isInput
 * @param arr
 * @param fnCheck
 * @return {firstValue|false}
 */
mylodash.safeFirst = (arr, fnCheck) => {
  fnCheck = fnCheck || ((value) => mylodash.isInput(value));
  const obj = mylodash.first(arr);
  return fnCheck(obj) ? obj : false;
};
/***
 *
 * @param val
 * @param isBeautiful
 * @return {string}
 */
mylodash.safeToString = (val, isBeautiful) => {
  if (typeof val === "object") {
    if (isBeautiful) {
      return JSON.stringify(val, null, 2);
    } else {
      return JSON.stringify(val);
    }
  } else {
    return String(val);
  }
};

mylodash.safeParse = (val, defaultObj = {}) => {
  let obj = defaultObj;
  try {
    obj = JSON.parse(val);
    if (!val) {
      obj = defaultObj;
      throw new Error("json parse error");
    }
  } catch (error) {
    mylodash.doNothing(error);
  }
  return obj;
};

mylodash.safeSplit = function (target, sp) {
  return target?.split ? target.split(sp) : [];
};
/***
 * dayjs对象或者""
 * @param val
 * @return {string|dayjs.Dayjs}
 */
mylodash.safeDate = function (val) {
  if (!val) {
    return "";
  }
  let date = dayjs(val);
  if (date === mylodash.WORDS.INVALID_DATE) {
    return "";
  } else {
    return date;
  }
};
/*  */

/***
 * false 0 都算已输入
 * @param val {any}
 * @returns {boolean}
 */
mylodash.isInput = (val) => {
  if (val) return true;
  if (val === 0) return true;
  if (val === false) return true;
  return false;
};
/*jquery到底有没有选中目标DOM？*/
mylodash.is$Selected = ($ele) => $ele && $ele.length > 0;
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
mylodash.getObjectFirstKeyValue = (obj, defaultValue = "") => {
  if (!obj) return defaultValue;
  const keyArray = Object.keys(obj);
  if (!mylodash.isArrayFill(keyArray)) return defaultValue;
  return mylodash.isInput(keyArray[0]) ? obj[keyArray[0]] : defaultValue;
};

/**
 * 异步加载js 在window中名为globalName的全局变量
 * @param {string} url
 * @param {string} globalName
 * @returns 在window中名为globalName的全局变量
 */
mylodash.asyncLoadJS = async (url, globalName) => {
  if (window[globalName]) {
    return window[globalName];
  }
  const $style = $("<style/>").attr("id", `${asyncLoadJS}${globalName}`);
  $style.appendTo($("body")).on("load", function () {
    return window[globalName];
  });
  $style.attr("src", url);
};

mylodash.ensureValueDone = async (fnGetValue) => {
  return new Promise(async (resolve) => {
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
};

function genId(category) {
  if (genId.idCount > genId.ID_COUNT_MAX) {
    genId.idCount = 1;
    genId.DATE_NOW = Date.now();
  }
  return `${category}_${genId.DATE_NOW}_${genId.idCount++}`;
}

genId.idCount = 1;
genId.ID_COUNT_MAX = 40000;
genId.DATE_NOW = Date.now();
mylodash.genId = genId;

/* 生成合法的键名 */
mylodash.genProp = (someString) => {
  return `k${mylodash.camelCase(someString)}`;
};

mylodash.preload = (baseModule, deps) => {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(
    deps.map((dep) => {
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
};

/*
 * @parseContent：满足`return {}`形式的字符串
 */
const parseContent = (returnSentence) => {
  if (!returnSentence) return;
  return new Function(`${returnSentence} return module();`);
};

/**
 *
 * @param {*} url
 * @returns
 */
mylodash.asyncLoadText = function (url) {
  mylodash.asyncLoadText.cache = (() => {
    if (window.__envMode === "development") {
      return {};
    }
    return mylodash.asyncLoadText.cache || {};
  })();
  /* https://learn.jquery.com/ */
  /* https://api.jquery.com/jQuery.ajax/  */
  return new Promise((resolve, reject) =>
    $.ajax({
      type: "GET",
      async: true,
      url,
      dataType: "text",
      success: resolve,
      error: reject,
    })
  );
};

/**
 * async 执行jsx module 文件
 * @param {*} url
 */
async function asyncExecFnString(url) {
  let data = "";
  try {
    data = await mylodash.asyncLoadText(url);
  } catch (error) {}
  return parseContent(data);
}

mylodash.asyncExecFnString = asyncExecFnString;

const VueComponents = {};

async function asyncImportSFC(url) {
  if (VueComponents[url]) {
    return VueComponents[url];
  }
  const scfSourceCode = await mylodash.asyncLoadText(url);
  const scfObjSourceCode = VueLoader(scfSourceCode);
  let scfObjAsyncFn = (...args) => {
    console.log(args);
  };
  try {
    scfObjAsyncFn = new Function(
      "argVue",
      "argPayload",
      `\n
return (${scfObjSourceCode})(argVue,argPayload);
`
    );
  } catch (e) {
    console.error(e);
  }
  const scfObj = await scfObjAsyncFn(window.Vue, {
    url,
  });
  return scfObj;
}

mylodash.asyncImportSFC = asyncImportSFC;

/**
 * 用于Boundless 解析vue SFC文件
 * @param {*} code
 * @returns
 */
function VueLoader(code) {
  function getSource(source, type) {
    var regex = new RegExp("<" + type + "[^>]*>");
    var openingTag = source.match(regex);
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
}

/**
 *
 * @param {*} cssname
 * @returns
 */
mylodash.loadCss = function (cssname) {
  const cssPath = `${cssname}`;
  let $link = $("<link/>", { rel: "stylesheet", type: "text/css" });
  $link.appendTo($("head"));
  $link[0].href = `${cssPath}?_t=${Date.now()}`;
  /* destroy 的时候移除已加载的模块css，酌情使用 */
  return () => {
    $link.remove();
    $link = null;
  };
};

mylodash.dateFormat = function (date, format) {
  if (!format) {
    format = "YYYY-MM-DD";
  }
  if (format === 1) {
    format = "YYYY-MM-DD HH:mm:ss";
  }
  const label = dayjs(date).format(format);
  return label === "Invalid Date" ? "--" : label;
};

mylodash.keepDecimals = function (val, fractionDigits = 2) {
  let num = Number((val * 100) / 1024 / 100).toFixed(fractionDigits);
  if (num === "NaN") {
    num = "-";
  }
  return num;
};

mylodash.valueToLabel = function (value, options) {
  const target = mylodash.find(options, {
    value,
  });
  if (target) {
    return target.label;
  } else {
    return "--";
  }
};

mylodash.timego = function (timestamp) {
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
};
mylodash.htmlFilter = (html) => {
  if (!html) return;
  let reg = /<\/?.+?\/?>/g;
  return html.replace(reg, "") || "";
};
export { mylodash as _ };
