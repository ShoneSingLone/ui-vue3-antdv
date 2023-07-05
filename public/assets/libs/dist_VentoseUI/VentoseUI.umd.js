var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("element-plus"), require("dayjs"), require("jquery"), require("vue"), require("lodash"), require("jsondiffpatch"), require("axios")) : typeof define === "function" && define.amd ? define(["exports", "element-plus", "dayjs", "jquery", "vue", "lodash", "jsondiffpatch", "axios"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.VentoseUI = {}, global.ElementPlus, global.dayjs, global.$, global.Vue, global._, global.jsondiffpatch, global.axios));
})(this, function(exports2, ElementPlus, dayjs, $$1, vue, _, jsondiffpatch, axios) {
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const ElementPlus__default = /* @__PURE__ */ _interopDefaultLegacy(ElementPlus);
  const dayjs__default = /* @__PURE__ */ _interopDefaultLegacy(dayjs);
  const $__default = /* @__PURE__ */ _interopDefaultLegacy($$1);
  const ___default = /* @__PURE__ */ _interopDefaultLegacy(_);
  const axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
  const index$1 = "";
  const ui = "";
  const index = "";
  function promisifyRequest(request) {
    return new Promise((resolve2, reject2) => {
      request.oncomplete = request.onsuccess = () => resolve2(request.result);
      request.onabort = request.onerror = () => reject2(request.error);
    });
  }
  function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  let defaultGetStoreFunc;
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function get(key, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }
  function clear(customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.clear();
      return promisifyRequest(store.transaction);
    });
  }
  const lStorage = new Proxy(localStorage, {
    set(_localStorage, prop, value) {
      if (___default.default.isPlainObject(value)) {
        _localStorage[prop] = JSON.stringify(value);
      } else {
        _localStorage[prop] = value;
      }
      return true;
    },
    get(_localStorage, prop) {
      const objString = _localStorage[prop];
      try {
        return JSON.parse(objString);
      } catch (error) {
        if (objString === "undefined") {
          return false;
        }
        return objString || false;
      }
    }
  });
  if (String(window.__APP_VERSION) !== String(lStorage.__APP_VERSION)) {
    clear();
    lStorage.__APP_VERSION = window.__APP_VERSION || Date.now();
  }
  const iStorage = async function(key, val) {
    const keyPrefix = window.location.hostname;
    key = ___default.default.camelCase(keyPrefix + key);
    let res;
    try {
      if (isInput(val)) {
        await set(key, String(val));
        res = true;
      } else {
        res = await get(key);
        if (!res) {
          xU("get", key, res);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      return res;
    }
  };
  iStorage.clear = clear;
  window.process = window.process || {};
  window.TEMPLATE_PLACEHOLDER = "";
  const onRE = /^on[^a-z]/;
  const VueComponents = {};
  const cache = {};
  const privateLodash = {
    WORDS: {
      INVALID_DATE: "Invalid Date",
      format_ymd: "YYYY-MM-DD"
    },
    useScopeCss() {
      const state = vue.reactive({ id: "", cssEleSelector: "", content: "" });
      function scopeCss(genCssStringFn) {
        const content = genCssStringFn({
          selector: `[data-style-id-${state.cssEleSelector}]`
        });
        $__default.default(state.id).html(content);
      }
      vue.onMounted(() => {
        const vm = vue.getCurrentInstance();
        state.cssEleSelector = `scope-css_${vm.uid}`;
        state.id = `#${state.cssEleSelector}`;
        let $cssEle = $__default.default(state.id);
        if ($cssEle.length === 0) {
          const domStyle = document.createElement("style");
          domStyle.id = state.cssEleSelector;
          const domWrapper = vm.ctx.$el.__vnode ? vm.ctx.$el : vm.ctx.$el.parentElement;
          $__default.default(domWrapper).attr(`data-style-id-${state.cssEleSelector}`, "").append(domStyle);
          $cssEle = $__default.default(`#${state.cssEleSelector}`);
        }
      });
      vue.onUnmounted(() => {
        const wrapperAttr = `data-style-id-${state.cssEleSelector}`;
        const selector = `[${wrapperAttr}]`;
        $__default.default(state.id).remove();
        $__default.default(selector).removeAttr(wrapperAttr);
      });
      return { scopeCss };
    },
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    },
    exitFullscreen() {
      document.exitFullscreen && document.exitFullscreen();
    },
    hashCode(str) {
      var hash = 0, i, chr;
      if (str.length === 0) {
        return "0";
      }
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return String(hash);
    },
    getLeftTopFromAbsolute($ele) {
      const _top = $ele.css("top");
      const _left = $ele.css("left");
      const getNum = (x) => {
        const match = String(x).match(/^(.*)px$/);
        if (match && match[1]) {
          return Number(match[1]);
        } else {
          return 0;
        }
      };
      const top = getNum(_top);
      const left = getNum(_left);
      return { top, left };
    },
    getLeftTopFromTranslate($ele) {
      const transform = $ele.css("transform");
      const match = String(transform).match(/^matrix\((.*)\)$/);
      if (!match) {
        return { top: 0, left: 0 };
      }
      if (match && match[1]) {
        const [a, b, c, d, e, f] = String(match[1]).split(",").map((i) => Number(___default.default.trim(i)));
        return {
          left: a + c + e,
          top: b + d + f
        };
      }
    },
    async asyncImportSFC(url, __Vue) {
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
    async getVueComponentBySourceCode(url, scfObjSourceCode, __Vue) {
      __Vue = __Vue || window.Vue || {};
      scfObjSourceCode = scfObjSourceCode.replace("export default", "");
      const scfObjAsyncFn = new Function(
        "argVue",
        `const THIS_FILE_URL = (\`${url}\`);try{const fn = ${scfObjSourceCode};return fn(argVue);}catch(e){console.error(e)}`
      );
      const scfObj = await scfObjAsyncFn(__Vue);
      return scfObj;
    },
    parseContent: (returnSentence) => {
      if (!returnSentence)
        return;
      try {
        const fn = new Function(`${returnSentence} return module();`);
        return fn();
      } catch (error) {
        xU(error);
      }
    },
    genId,
    VueLoader: (code) => {
      function getSource(source, type2) {
        var regex = new RegExp("<" + type2 + "[^>]*>");
        var openingTag = source.match(regex);
        if (!openingTag)
          return "";
        else
          openingTag = openingTag[0];
        var targetSource = source.slice(
          source.indexOf(openingTag) + openingTag.length,
          source.lastIndexOf("</" + type2 + ">")
        );
        return type2 === "template" ? targetSource.replace(/`/g, "\\`") : targetSource;
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
    async asyncExecFnString(url) {
      const data = await privateLodash.asyncLoadText(url);
      return privateLodash.parseContent(data);
    },
    doNothing: (...args) => {
      var _a;
      if (localStorage.isShowDevLog) {
        const e = new Error();
        console.log("\u{1F680}:", (_a = e == null ? void 0 : e.stack) == null ? void 0 : _a.split("\n")[2].replace("    at ", ""));
        console.log.apply(console, args);
      }
    },
    sleep,
    isOn: (key) => onRE.test(key),
    isModelListener: (key) => {
      key = String(key);
      if (!key) {
        return false;
      }
      return key.startsWith("onUpdate:");
    },
    isListener: (key) => {
      key = String(key);
      if (!key) {
        return false;
      }
      return privateLodash.isOn(key) || privateLodash.isModelListener(key);
    },
    isArrayFill: (arr) => {
      if (Array.isArray(arr)) {
        if (arr.length > 0) {
          return true;
        }
      }
      return false;
    },
    isObjectFill: (obj) => ___default.default.isPlainObject(obj) && Object.keys(obj).length > 0,
    safeFirst: (arr, fnCheck) => {
      fnCheck = fnCheck || ((value) => privateLodash.isInput(value));
      const obj = ___default.default.first(arr);
      return fnCheck(obj) ? obj : false;
    },
    safeToString: (val, isBeautiful = false) => {
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
    safeParse: (val, defaultObj) => {
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
    safeSplit: (target, sp = "") => {
      return (target == null ? void 0 : target.split) ? target.split(sp) : [];
    },
    safeDate: (val) => {
      if (!val) {
        return "";
      }
      let date = dayjs__default.default(val);
      if (date === privateLodash.WORDS.INVALID_DATE) {
        return "";
      } else {
        return date;
      }
    },
    isInput,
    is$Selected: ($ele) => $ele && $ele.jquery && $ele.length > 0,
    getObjectFirstKeyValue: (obj, defaultValue) => {
      if (!obj) {
        return defaultValue;
      }
      const keyArray = Object.keys(obj);
      if (!privateLodash.isArrayFill(keyArray))
        return defaultValue;
      const prop = keyArray[0];
      return privateLodash.isInput(prop) && obj[prop] ? obj[prop] : defaultValue;
    },
    loadCss(cssname) {
      const cssPath = `${cssname}`;
      let $link = $__default.default("<link/>", { rel: "stylesheet", type: "text/css" });
      $link.appendTo($__default.default("head"));
      $link[0].href = `${cssPath}?_t=${Date.now()}`;
      return () => {
        $link.remove();
        $link = null;
      };
    },
    async asyncLoadStyle(cssURL, options) {
      let { isReplace, id } = options || { isReplace: false, id: "" };
      id = id || ___default.default.camelCase(cssURL);
      let content;
      let $style = $__default.default(`#${id}`);
      if ($style.length == 0) {
        $style = $__default.default("<style/>", { id });
        $__default.default("body").append($style);
        content = await privateLodash.asyncLoadText(cssURL);
        $style.html(content);
      } else if (isReplace) {
        content = await privateLodash.asyncLoadText(cssURL);
        $style.html(content);
      }
    },
    asyncLoadText: async function(url, options = {}) {
      let isForceUpdate = options.isForceUpdate || false;
      if (!isForceUpdate && !State_UI.isDev) {
        const res = await iStorage(url);
        if (res) {
          return res;
        }
      }
      return new Promise(async (resolve2, reject2) => {
        try {
          const { data } = await axios__default.default.get(url, {
            headers: {
              "Content-Type": "text/plain"
            }
          });
          if (!State_UI.isDev) {
            await iStorage(url, data);
          }
          resolve2(data);
        } catch (error) {
          reject2(error);
        }
      });
    },
    asyncLoadJS: async (url, globalName) => {
      return new Promise((r) => {
        if (window[globalName]) {
          r(window[globalName]);
        }
        const $style = $__default.default("<script/>").attr("id", `asyncLoadJS_${globalName}`);
        $style.appendTo($__default.default("body")).on("load", function() {
          r(window[globalName]);
        });
        $style.attr("src", url);
      });
    },
    asyncGlobalJS: async (globalName, url) => {
      try {
        if (window[globalName]) {
          return window[globalName];
        }
        if (!url) {
          alert("asyncGlobalJS miss url " + globalName);
          return {};
        }
        if (cache[globalName]) {
          await privateLodash.ensureValueDone(() => window[globalName]);
          return window[globalName];
        }
        const jsString = await privateLodash.asyncLoadText(url);
        const fn = new Function(`with(window){${jsString}}`);
        fn();
        cache[globalName] = url;
        return window[globalName];
      } catch (error) {
        console.error(error);
      }
    },
    ensureValueDone: async (fnGetValue) => {
      return new Promise(async (resolve2) => {
        let exeFnGetValue = async function() {
          const value = await fnGetValue();
          if (value) {
            exeFnGetValue = null;
            resolve2(value);
          } else {
            setTimeout(exeFnGetValue, 100 * exeFnGetValue.count++);
          }
        };
        exeFnGetValue.count = 1;
        exeFnGetValue();
      });
    },
    genProp: (someString) => {
      return `k${___default.default.camelCase(someString)}`;
    },
    dateFormat: (date, format2 = "YYYY-MM-DD") => {
      if (typeof date === "number") {
        date = dayjs__default.default.unix(date);
      }
      if (format2 === 1) {
        format2 = "YYYY-MM-DD HH:mm:ss";
      }
      const label = dayjs__default.default(date).format(format2);
      const isInvalidDate = label == privateLodash.WORDS.INVALID_DATE;
      return isInvalidDate ? "--" : label;
    },
    isObjSetAttr: (obj, attrName = "value") => Object.keys(obj).includes(attrName),
    keepDecimals: function(val, fractionDigits) {
      let num = Number(val * 100 / 1024 / 100).toFixed(fractionDigits);
      if (num === "NaN") {
        num = "-";
      }
      return num;
    },
    valueToLabel: function(value, options) {
      const target = ___default.default.find(options, {
        value
      });
      if (target) {
        return target.label;
      } else {
        return "--";
      }
    },
    timego: function(timestamp) {
      let minutes, hours, days, seconds, mouth, year;
      const timeNow = parseInt(new Date().getTime() / 1e3);
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
        return year + "\u5E74\u524D";
      } else if (mouth > 0 && year <= 0) {
        return mouth + "\u6708\u524D";
      } else if (days > 0 && mouth <= 0) {
        return days + "\u5929\u524D";
      } else if (days <= 0 && hours > 0) {
        return hours + "\u5C0F\u65F6\u524D";
      } else if (hours <= 0 && minutes > 0) {
        return minutes + "\u5206\u949F\u524D";
      } else if (minutes <= 0 && seconds > 0) {
        if (seconds < 30) {
          return "\u521A\u521A";
        } else {
          return seconds + "\u79D2\u524D";
        }
      } else {
        return "\u521A\u521A";
      }
    },
    htmlFilter: (html) => {
      if (!html)
        return;
      let reg = /<\/?.+?\/?>/g;
      return html.replace(reg, "") || "";
    },
    MutatingProps: (item, prop, val = null, isDelete = false) => {
      item = item || {};
      if (/^\./.test(prop)) {
        prop = String(prop).substring(1);
      }
      const propArray = prop.split(".");
      let key = "";
      let nextItem = item;
      const setVal = () => {
        while (key = propArray.shift()) {
          if (propArray.length === 0) {
            if (val === "never" && isDelete) {
              delete nextItem[key];
            } else {
              nextItem[key] = val;
            }
            return;
          } else {
            const _nextItem = nextItem[key];
            if (!_nextItem) {
              nextItem[key] = {};
            }
            nextItem = nextItem[key];
          }
        }
      };
      const getVal = () => {
        while (key = propArray.shift()) {
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
      if (val || ___default.default.isString(val) || ___default.default.isBoolean(val) || ___default.default.isNumber(val) && !___default.default.isNaN(val)) {
        setVal();
      } else {
        return getVal();
      }
      return item;
    }
  };
  let payloadIdCount = 1;
  let payloadIdCountMax = 4e4;
  let payloadDateNow = Date.now();
  function genId(category) {
    if (payloadIdCount > payloadIdCountMax) {
      payloadIdCount = 1;
      payloadDateNow = Date.now();
    }
    return `${category}_${payloadDateNow}_${payloadIdCount++}`;
  }
  function sleep(t) {
    return new Promise((r) => setTimeout(r, t));
  }
  function isInput(val) {
    {
      if (val === void 0) {
        return false;
      }
      try {
        val = JSON.parse(JSON.stringify(val));
      } catch (error) {
        xU(val, "JSON.parse failed");
      }
      if (val === 0) {
        return true;
      }
      if (val === false) {
        return true;
      }
      if (___default.default.isArray(val)) {
        return val.length > 0;
      } else if (val) {
        return true;
      }
      return false;
    }
  }
  const xU = new Proxy(
    function(...args) {
      if (State_UI.isDev) {
        try {
          throw new Error("");
        } catch (error) {
          args.unshift(String(error.stack).split("\n")[2], "\n");
          console.log.apply(console, args);
        }
      }
    },
    {
      get(fn, prop) {
        if (privateLodash[prop]) {
          return privateLodash[prop];
        }
        if (___default.default[prop]) {
          return ___default.default[prop];
        }
        return fn[prop];
      },
      set(fn, prop, val) {
        privateLodash[prop] = val;
        return true;
      }
    }
  );
  const _hoisted_1$g = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$c = /* @__PURE__ */ vue.createElementVNode("path", { d: "M338.261 137.045h-9.13a9.16 9.16 0 0 0 9.13-9.159v9.16h347.45v-9.16c0 5.035 4.095 9.16 9.101 9.16h-9.102v82.26h82.262v-91.42a73.216 73.216 0 0 0-73.131-73.13H329.102a73.216 73.216 0 0 0-73.159 73.13v91.45h82.29v-82.29zm576 82.29h-804.55c-20.253 0-36.58 16.327-36.58 36.551v36.58c0 5.034 4.096 9.159 9.13 9.159h69.063l28.217 597.703a73.216 73.216 0 0 0 73.046 69.689h518.826a73.045 73.045 0 0 0 73.046-69.689l28.245-597.732h69.006a9.16 9.16 0 0 0 9.16-9.102v-36.636c0-20.196-16.356-36.551-36.58-36.551zm-151.665 667.42h-501.22l-27.648-585.159H790.3l-27.676 585.16z" }, null, -1);
  const _hoisted_3$b = [
    _hoisted_2$c
  ];
  function render$a(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$g, _hoisted_3$b);
  }
  const InsideDeleteOutlined = { name: "DeleteOutlined", render: render$a };
  const _hoisted_1$f = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$b = /* @__PURE__ */ vue.createElementVNode("path", { d: "M512 628c17.6 0 32-14.4 32-32V308c0-17.6-14.4-32-32-32s-32 14.4-32 32v288c0 17.6 14.4 32 32 32zm-44 76a44 44 0 1 0 88 0 44 44 0 1 0-88 0Zm44-640C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm271.5 719.5c-35.3 35.3-76.4 63-122.1 82.3-47.3 20-97.6 30.2-149.5 30.2s-102.2-10.1-149.5-30.2c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2 30.2-149.5c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3c47.3-20 97.6-30.2 149.5-30.2s102.2 10.1 149.5 30.2c45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5s-10.1 102.2-30.2 149.5c-19.3 45.8-47 86.8-82.3 122.1z" }, null, -1);
  const _hoisted_3$a = [
    _hoisted_2$b
  ];
  function render$9(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$f, _hoisted_3$a);
  }
  const InsideExclamationCircleOutlined = { name: "ExclamationCircleOutlined", render: render$9 };
  const _hoisted_1$e = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$a = /* @__PURE__ */ vue.createElementVNode("path", { d: "M448 128a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM257.1 180.5a61.3 61.3 0 1 0 122.6 0 61.3 61.3 0 1 0-122.6 0ZM121.8 318.4a58.7 58.7 0 1 0 117.4 0 58.7 58.7 0 1 0-117.4 0ZM72 512a56 56 0 1 0 112 0 56 56 0 1 0-112 0Zm55.2 193.6a53.3 53.3 0 1 0 106.6 0 53.3 53.3 0 1 0-106.6 0Zm140.5 137.9a50.7 50.7 0 1 0 101.4 0 50.7 50.7 0 1 0-101.4 0ZM464 896a48 48 0 1 0 96 0 48 48 0 1 0-96 0Zm196.3-52.5a45.3 45.3 0 1 0 90.6 0 45.3 45.3 0 1 0-90.6 0Zm140.5-137.9a42.7 42.7 0 1 0 85.4 0 42.7 42.7 0 1 0-85.4 0ZM856 512a40 40 0 1 0 80 0 40 40 0 1 0-80 0ZM837.9 377.7a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Zm-61.5-113.5a28.3 28.3 0 1 0 56.6 0 28.3 28.3 0 1 0-56.6 0ZM680 180a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" }, null, -1);
  const _hoisted_3$9 = /* @__PURE__ */ vue.createElementVNode("animateTransform", {
    additive: "sum",
    attributeName: "transform",
    attributeType: "XML",
    begin: "0s",
    dur: "4s",
    from: "0",
    repeatCount: "indefinite",
    to: "360",
    type: "rotate"
  }, null, -1);
  const _hoisted_4 = [
    _hoisted_2$a,
    _hoisted_3$9
  ];
  function render$8(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$e, _hoisted_4);
  }
  const InsideLoadingOutlined = { name: "LoadingOutlined", render: render$8 };
  const _hoisted_1$d = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$9 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M144 928a48 48 0 0 1-48-48V144a48 48 0 0 1 48-48h592v.448a48 48 0 0 1 27.328 13.6l150.624 150.624A48 48 0 0 1 928 294.624V880a48 48 0 0 1-48 48H144zm144-768H160v704h128V496a48 48 0 0 1 43.392-47.776L336 448h352a48 48 0 0 1 48 48v368h128V301.248l-128-128V272a48 48 0 0 1-48 48H336a48 48 0 0 1-48-48V160zm384 352H352v352h320V512zm0-352H352v96h320v-96z" }, null, -1);
  const _hoisted_3$8 = [
    _hoisted_2$9
  ];
  function render$7(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$d, _hoisted_3$8);
  }
  const InsideSaveOutlined = { name: "SaveOutlined", render: render$7 };
  const _hoisted_1$c = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$8 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M479.04 128c176.16 0 318.976 142.848 318.976 319.04a317.984 317.984 0 0 1-86.976 218.976l175.616 175.552c11.52 11.52 12.384 29.568 2.656 42.08l-2.656 3.008a31.872 31.872 0 0 1-45.088 0L662.784 707.904a317.504 317.504 0 0 1-183.776 58.24C302.816 766.144 160 623.296 160 447.04S302.816 128 479.04 128zm0 63.808a255.232 255.232 0 0 0-255.232 255.264 255.232 255.232 0 1 0 510.4 0 255.232 255.232 0 0 0-255.2-255.264z" }, null, -1);
  const _hoisted_3$7 = [
    _hoisted_2$8
  ];
  function render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$c, _hoisted_3$7);
  }
  const InsideSearchOutlined = { name: "SearchOutlined", render: render$6 };
  const _hoisted_1$b = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$7 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27c40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8c-.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4S687 811.7 646 829c-42.4 17.9-87.4 27-133.9 27s-91.5-9.1-133.9-27c-40.9-17.3-77.7-42.1-109.3-73.8-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47c5.3-4.1 3.5-12.5-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8.1-4.5-3.5-8.2-8-8.2z" }, null, -1);
  const _hoisted_3$6 = [
    _hoisted_2$7
  ];
  function render$5(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$b, _hoisted_3$6);
  }
  const InsideSyncOutlined = { name: "SyncOutlined", render: render$5 };
  const _hoisted_1$a = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$6 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M512 85.333A426.667 426.667 0 1 0 938.667 512 426.667 426.667 0 0 0 512 85.333zm0 768A341.333 341.333 0 1 1 853.333 512 341.333 341.333 0 0 1 512 853.333zm30.72-587.946A32.853 32.853 0 0 0 520.107 256h-16.214a32 32 0 0 0-22.613 9.387L347.733 399.36a21.333 21.333 0 0 0 0 30.293l29.867 30.294a21.333 21.333 0 0 0 30.293 0l61.44-61.867v348.587A21.333 21.333 0 0 0 490.667 768h42.666a21.333 21.333 0 0 0 21.334-21.333V398.08l61.44 61.44a20.907 20.907 0 0 0 29.866 0l30.294-30.293a21.333 21.333 0 0 0 0-30.294z" }, null, -1);
  const _hoisted_3$5 = [
    _hoisted_2$6
  ];
  function render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$a, _hoisted_3$5);
  }
  const InsideUploadOutlined = { name: "UploadOutlined", render: render$4 };
  const _hoisted_1$9 = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M512 128c212 0 384 172 384 384S724 896 512 896 128 724 128 512s172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64zm32 704h-64v-64h64v64zm11.2-203.2-5.6 4.8c-3.2 2.4-5.6 8-5.6 12.8v58.4h-64v-58.4c0-24.8 11.2-48 29.6-63.2l5.6-4.8c56-44.8 83.2-68 83.2-108 0-48-38.4-86.4-86.4-86.4-49.6 0-86.4 36.8-86.4 86.4h-64c0-84 66.4-150.4 150.4-150.4 83.2 0 150.4 67.2 150.4 150.4 0 72.8-49.6 112.8-107.2 158.4z" }, null, -1);
  const _hoisted_3$4 = [
    _hoisted_2$5
  ];
  function render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$9, _hoisted_3$4);
  }
  const Insidetips = { name: "tips", render: render$3 };
  const _hoisted_1$8 = {
    width: "64",
    height: "41",
    class: "x-empty-img-simple"
  };
  const _hoisted_2$4 = /* @__PURE__ */ vue.createStaticVNode('<g fill="none" fill-rule="evenodd" transform="translate(0 1)"><ellipse cx="32" cy="33" fill="#F5F5F5" class="x-empty-img-simple-ellipse" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#D9D9D9" class="x-empty-img-simple-g"><path d="M55 12.76 44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path fill="#FAFAFA" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" class="x-empty-img-simple-path"></path></g></g>', 1);
  const _hoisted_3$3 = [
    _hoisted_2$4
  ];
  function render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$8, _hoisted_3$3);
  }
  const InsideEmpty = { name: "empty", render: render$2 };
  const _hoisted_1$7 = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M629.392 415.033 465.775 251.416c-7.992-7.992-20.947-7.992-28.939 0-7.992 8.002-7.992 20.957 0 28.95l128.68 128.68H389.97V184.083c0-11.298-9.17-20.467-20.466-20.467H21.813c-11.307 0-20.465 9.17-20.465 20.467v818.082c0 11.307 9.158 20.466 20.466 20.466h593.108c11.308 0 20.466-9.159 20.466-20.466V429.512c0-5.433-2.159-10.632-5.996-14.48zm-34.936 566.666H42.28v-777.15h306.756v224.963c0 11.298 9.159 20.466 20.467 20.466h224.953v531.72zm429.523-715.803v572.652c0 11.308-9.16 20.466-20.467 20.466H695.651c-11.298 0-20.466-9.158-20.466-20.466 0-11.297 9.168-20.466 20.466-20.466h287.395v-531.72H758.093c-11.308 0-20.466-9.169-20.466-20.466V40.932H430.87v75.694c0 11.308-9.169 20.466-20.466 20.466-11.307 0-20.466-9.158-20.466-20.466v-96.16C389.938 9.17 399.097 0 410.404 0h347.689c11.297 0 20.466 9.169 20.466 20.466V245.43h175.548l-128.68-128.681c-7.993-7.992-7.993-20.947 0-28.95 7.991-7.991 20.946-7.991 28.939 0l163.616 163.627a20.455 20.455 0 0 1 5.997 14.47z" }, null, -1);
  const _hoisted_3$2 = [
    _hoisted_2$3
  ];
  function render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$7, _hoisted_3$2);
  }
  const InsideCopy = { name: "copy", render: render$1 };
  const _hoisted_1$6 = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon",
    style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
    viewBox: "0 0 1024 1024"
  };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "#5A626A",
    d: "M439.264 208a16 16 0 0 0-16 16v67.968a239.744 239.744 0 0 0-46.496 26.896l-58.912-34A16 16 0 0 0 296 290.72l-80 138.56a16 16 0 0 0 5.856 21.856l58.896 34a242.624 242.624 0 0 0 0 53.728l-58.88 34a16 16 0 0 0-6.72 20.176l.848 1.68 80 138.56a16 16 0 0 0 21.856 5.856l58.912-34a239.744 239.744 0 0 0 46.496 26.88V800a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-67.968a239.744 239.744 0 0 0 46.512-26.896l58.912 34a16 16 0 0 0 21.856-5.856l80-138.56a16 16 0 0 0-4.288-20.832l-1.568-1.024-58.896-34a242.624 242.624 0 0 0 0-53.728l58.88-34a16 16 0 0 0 6.72-20.176l-.848-1.68-80-138.56a16 16 0 0 0-21.856-5.856l-58.912 34a239.744 239.744 0 0 0-46.496-26.88V224a16 16 0 0 0-16-16h-160zm32 48h96v67.376l28.8 12.576a192.21 192.21 0 0 1 37.184 21.52l25.28 18.688 58.448-33.728 48 83.136-58.368 33.68 3.472 31.2a194.624 194.624 0 0 1 0 43.104l-3.472 31.2 58.368 33.68-48 83.136-58.432-33.728-25.296 18.688a192.21 192.21 0 0 1-37.184 21.52l-28.8 12.576V768h-96v-67.376l-28.784-12.576a192.21 192.21 0 0 1-37.184-21.52l-25.28-18.688-58.448 33.728-48-83.136 58.368-33.68-3.472-31.2a194.624 194.624 0 0 1 0-43.104l3.472-31.2-58.368-33.68 48-83.136L380 376.16l25.296-18.688a191.744 191.744 0 0 1 37.184-21.52l28.8-12.576V256zm47.28 144a112 112 0 1 0 0 224 112 112 0 0 0 0-224zm0 48a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
  }, null, -1);
  const _hoisted_3$1 = [
    _hoisted_2$2
  ];
  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$1);
  }
  const insideSettingOutlined = { name: "SettingOutlined", render };
  const xIcon$1 = "";
  const insideIcons = {
    InsideDeleteOutlined,
    InsideExclamationCircleOutlined,
    InsideLoadingOutlined,
    InsideSaveOutlined,
    InsideSearchOutlined,
    InsideSyncOutlined,
    InsideUploadOutlined,
    Insidetips,
    InsideEmpty,
    InsideCopy,
    insideSettingOutlined
  };
  const xIcon = vue.defineComponent(vue.markRaw({
    name: "xIcon",
    props: ["icon"],
    data() {
      const id = "lazy-svg_" + this._.uid;
      return {
        id,
        svgIcon: null
      };
    },
    computed: {
      baseAttrs() {
        return {
          id: this.id,
          role: "img",
          ariaLabel: this.icon,
          class: "xIcon anticon"
        };
      },
      iconKey() {
        const _iconKey = xU.camelCase(this.getIconPath()).replace(/\s/, "");
        return _iconKey;
      }
    },
    methods: {
      getIconPath() {
        if (!State_UI.assetsSvgPath) {
          debugger;
        }
        const iconPath = `${State_UI.assetsSvgPath}/${this.icon}.svg`;
        return iconPath;
      },
      async setIcon() {
        if (!this.icon)
          return;
        try {
          let SvgIconAny = await (async () => {
            let _SvgIconAny = insideIcons[this.icon];
            if (_SvgIconAny) {
              xU(this.icon);
              return _SvgIconAny;
            }
            if (!State_UI.isDev) {
              _SvgIconAny = await iStorage(this.iconKey);
              if (_SvgIconAny) {
                return _SvgIconAny;
              }
            }
            try {
              _SvgIconAny = await xU.asyncLoadText(this.getIconPath());
            } catch (error) {
              console.error(error);
            }
            return _SvgIconAny;
          })();
          if (xU.isString(SvgIconAny) && SvgIconAny.length > 0) {
            const SvgComponentByString = {
              name: this.icon,
              template: SvgIconAny
            };
            await iStorage(this.iconKey, SvgIconAny);
            insideIcons[this.icon] = SvgComponentByString;
            this.svgIcon = vue.createVNode(SvgComponentByString, this.baseAttrs, null);
          } else if ((SvgIconAny == null ? void 0 : SvgIconAny.render) || (SvgIconAny == null ? void 0 : SvgIconAny.template)) {
            this.svgIcon = vue.createVNode(SvgIconAny, this.baseAttrs, null);
          } else {
            console.error("component xIcon miss svg: " + this.icon);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    render() {
      if (this.svgIcon) {
        return this.svgIcon;
      }
      return vue.createVNode(InsideLoadingOutlined, this.baseAttrs, null);
    },
    watch: {
      icon: {
        immediate: true,
        handler() {
          this.setIcon();
        }
      }
    }
  }));
  function $t$1(prop, payload = {}, i18nMessage = false) {
    const result = {
      label: prop,
      prop
    };
    xU.templateSettings.interpolate = /{([\s\S]+?)}/g;
    if (State_UI.i18nMessage) {
      const temp = i18nMessage ? i18nMessage[prop] : State_UI.i18nMessage[prop];
      if (temp) {
        result.label = xU.template(temp)(payload);
        if (!result.label) {
          result.label = prop;
          console.error(`i18n:${prop} "NOT_FOUND"`);
        }
      }
    }
    return result;
  }
  let _State_UI = {
    xItemCollection: {},
    pagination: {
      page: "page",
      size: "size",
      total: "total"
    },
    language: lStorage["language"] || "zh-CN",
    onLanguageChange: false,
    LANGUAGE: {},
    i18nMessage: {},
    assetsSvgPath: "",
    assetsPath: "",
    basePath: "",
    setBasePath(basePath) {
      State_UI.assetsSvgPath = basePath + "assets/svg";
      State_UI.assetsPath = basePath + "assets";
      State_UI.basePath = basePath;
    },
    setAssetsBaseById(eleId) {
      var _a;
      const img = document.getElementById(eleId);
      if (img) {
        const src = String(img.src || img.href);
        const index2 = ((_a = src.match(/assets(.*)/)) == null ? void 0 : _a.index) || 0;
        State_UI.assetsSvgPath = src.substring(0, index2) + "assets/svg";
        State_UI.assetsPath = src.substring(0, index2) + "assets";
        State_UI.basePath = src.substring(0, index2);
      }
    },
    $t: $t$1,
    isDev: localStorage.___VENTOSE_UI_IS_DEV_MODE === "VENTOSE_UI_IS_DEV_MODE",
    dev(isDev) {
      if (isDev) {
        localStorage.___VENTOSE_UI_IS_DEV_MODE = "VENTOSE_UI_IS_DEV_MODE";
      } else {
        localStorage.removeItem("___VENTOSE_UI_IS_DEV_MODE");
      }
    }
  };
  const State_UI = vue.reactive(_State_UI);
  vue.watch(() => State_UI.language, (language) => {
    lStorage["language"] = language;
    if (State_UI.onLanguageChange) {
      State_UI.onLanguageChange(language, State_UI);
    }
  }, {
    immediate: true
  });
  const Cpt_UI_locale = vue.computed(() => {
    const currentLanguage = xU.camelCase(State_UI.language);
    const locale = State_UI.LANGUAGE[currentLanguage];
    return locale;
  });
  const BTN_PRESET_MAP = {
    query: () => ({
      icon: vue.createVNode(vue.resolveComponent("xIcon"), {
        "class": "x-button_icon-wrapper",
        "icon": "InsideSearchOutlined"
      }, null),
      text: $t$1("\u67E5\u8BE2").label
    }),
    refresh: () => ({
      icon: vue.createVNode(vue.resolveComponent("xIcon"), {
        "class": "x-button_icon-wrapper",
        "icon": "InsideSyncOutlined"
      }, null),
      text: $t$1("\u5237\u65B0").label
    }),
    cancel: () => ({
      text: $t$1("\u53D6\u6D88").label
    }),
    save: () => ({
      icon: vue.createVNode(vue.resolveComponent("xIcon"), {
        "class": "x-button_icon-wrapper",
        "icon": "InsideSaveOutlined"
      }, null),
      text: $t$1("\u4FDD\u5B58").label
    }),
    upload: () => ({
      icon: vue.createVNode(vue.resolveComponent("xIcon"), {
        "class": "x-button_icon-wrapper",
        "icon": "InsideUploadOutlined"
      }, null),
      text: $t$1("\u4E0A\u4F20").label
    }),
    delete: (configs) => {
      configs.type = "danger";
      configs.ghost = true;
      return {
        icon: vue.createVNode(vue.resolveComponent("xIcon"), {
          "class": "x-button_icon-wrapper",
          "icon": "InsideDeleteOutlined"
        }, null),
        text: $t$1("\u5220\u9664").label
      };
    }
  };
  const xButton = vue.defineComponent({
    name: "xButton",
    props: {
      payload: {
        type: Object,
        default() {
          return {};
        }
      },
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    beforeMount() {
      if (!this.configs) {
        debugger;
        return;
      }
      const presetFn = BTN_PRESET_MAP[this.configs.preset];
      if (presetFn) {
        const preset = presetFn(this.configs);
        this.configs.icon = preset.icon;
        this.configs.text = vue.createVNode("span", {
          "class": "ml4"
        }, [preset.text]);
      }
    },
    data() {
      return {
        loading: true
      };
    },
    setup(props) {
      let Cpt_isShow = true;
      if (props.configs.isShow !== void 0) {
        if (xU.isFunction(props.configs.isShow)) {
          Cpt_isShow = vue.computed(props.configs.isShow);
        }
        if (xU.isBoolean(props.configs.isShow)) {
          Cpt_isShow = props.configs.isShow;
        }
      }
      return {
        Cpt_isShow
      };
    },
    computed: {
      isClickHandlerOnAttrs() {
        var _a;
        return !!((_a = this.$attrs) == null ? void 0 : _a.onClick);
      },
      type() {
        if (["query", "save"].includes(this.configs.preset)) {
          return "primary";
        }
        return this.configs.type;
      },
      title() {
        if (xU.isString(this.disabled) && this.disabled.length > 0) {
          return this.disabled;
        }
        if (xU.isString(this.configs.title) && this.configs.title.length > 0) {
          return this.configs.title;
        }
        return false;
      },
      disabled() {
        if (xU.isBoolean(this.configs.disabled)) {
          return this.configs.disabled;
        }
        if (xU.isFunction(this.configs.disabled)) {
          return this.configs.disabled(this);
        }
        return false;
      },
      text() {
        if (xU.isFunction(this.configs.text)) {
          return this.configs.text(this) || "";
        }
        return this.configs.text || "";
      }
    },
    watch: {
      configs: {
        immediate: true,
        handler(configs) {
          this.loading = !!configs.loading;
        }
      }
    },
    created() {
    },
    methods: {
      async handleButtonClick() {
        var _a, _b;
        if (xU.isFunction((_a = this == null ? void 0 : this.configs) == null ? void 0 : _a.onClick)) {
          this.loading = true;
          try {
            await ((_b = this == null ? void 0 : this.configs) == null ? void 0 : _b.onClick.call(this.configs, this));
          } catch (e) {
            console.error(e);
          } finally {
            this.loading = false;
          }
        }
      }
    },
    render() {
      if (!this.Cpt_isShow) {
        return null;
      }
      const propsWillDeleteFromProperty = ["text", "loading", "disabled", "title", "onClick"];
      const _properties = xU.omit(this.configs, propsWillDeleteFromProperty);
      if (!this.isClickHandlerOnAttrs) {
        _properties.onClick = this.handleButtonClick;
      }
      if (this.title) {
        _properties.title = this.title;
      }
      return vue.createVNode(vue.resolveComponent("elButton"), vue.mergeProps({
        "class": "x-button antdv-button",
        "loading": this.loading,
        "disabled": !!this.disabled,
        "type": this.type
      }, _properties), {
        default: () => {
          const vDomDefautl = this.$slots.default && this.$slots.default();
          return vue.createVNode(vue.Fragment, null, [this.text, vDomDefautl]);
        }
      });
    }
  });
  const xGap = vue.defineComponent({
    name: "xGap",
    props: ["t", "l", "r", "b", "a", "f"],
    computed: {
      gapClass: {
        set() {
        },
        get() {
          let basic = "x-gap";
          if (this.f) {
            basic += ` flex${this.f}`;
          }
          return basic;
        }
      },
      gapStyle: {
        set() {
        },
        get() {
          const POSITION_MAP = {
            t: "top",
            r: "right",
            b: "bottom",
            l: "left"
          };
          const gapStyle = {};
          if (this.a) {
            gapStyle.margin = `${this.a}px`;
          } else {
            xU.map(POSITION_MAP, (prop, key) => {
              const value = this[key];
              if (value) {
                gapStyle[`margin-${prop}`] = `${value}px`;
              }
            });
          }
          return gapStyle;
        }
      }
    },
    render(h) {
      return vue.createVNode("div", {
        "style": this.gapStyle,
        "class": this.gapClass
      }, null);
    }
  });
  const xRender = vue.defineComponent(vue.markRaw({
    name: "xRender",
    props: {
      render: {
        type: Function,
        required: true
      }
    },
    render() {
      return vue.h(this.render, {
        vm: this,
        props: this.$props,
        attrs: this.$attrs
      });
    }
  }));
  const _sfc_main$8 = vue.defineComponent({
    name: "xForm",
    props: {
      col: {
        type: Number,
        default: 1
      },
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      formStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    emits: [],
    data() {
      return {};
    },
    computed: {
      xFormId() {
        return `xForm_${this._.uid}`;
      },
      formStyleText() {
        return xU.map(xU.merge({}, this.formStyle), (value, prop) => `${prop}: ${value}`).join(";");
      },
      labelStyleText() {
        return xU.map(xU.merge({
          width: "120px",
          "text-align": "right"
        }, this.labelStyle), (value, prop) => `${prop}: ${value}`).join(";");
      },
      styleContent() {
        return [`#${this.xFormId} { width:100%; padding:0 16px; display: grid;grid-template-columns: repeat(${this.col},1fr);}`, `#${this.xFormId} { ${this.formStyleText} }`, `#${this.xFormId} div.x-form-item-label { ${this.labelStyleText} }`].join("\n");
      }
    },
    mounted() {
      const $form = $__default.default(`#${this.xFormId}`);
      const $style = $__default.default("<style/>", {
        id: `style_${this.xFormId}`
      }).append(this.styleContent);
      $form.prepend($style);
    },
    watch: {
      styleContent() {
        this.updateStyle(this.styleContent);
      }
    },
    methods: {
      updateStyle(styleContent) {
        const $style = $__default.default(`#style_${this.xFormId}`);
        $style.html(styleContent);
      }
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$5 = ["id"];
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("form", { id: _ctx.xFormId }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$5);
  }
  const xForm = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7]]);
  const _sfc_main$7 = vue.defineComponent({
    name: "XButtonCountDown",
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      const vm = this;
      return {
        state: {
          captchaCount: 0
        },
        btnConfigs: {
          disabled: false,
          size: "large",
          style: {
            minWidth: "112px"
          },
          class: "center",
          text: vm.configs.text.normal,
          async onClick() {
            if (xU.isFunction(vm.configs.onClick)) {
              await vm.configs.onClick({
                countDown: vm.countDown
              });
            }
          }
        }
      };
    },
    watch: {
      "state.captchaCount"(captchaCount) {
        this.handleCaptchaCountChange(captchaCount);
      }
    },
    methods: {
      countDown() {
        this.state.captchaCount++;
        if (this.state.captchaCount <= this.configs.countMax) {
          setTimeout(this.countDown, 1e3);
        } else {
          this.state.captchaCount = 0;
        }
      },
      handleCaptchaCountChange(captchaCount) {
        if (captchaCount === 0) {
          this.btnConfigs.text = this.configs.text.normal;
          this.btnConfigs.disabled = false;
          return;
        }
        const setCounDownText = () => {
          return this.btnConfigs.text = `${this.configs.countMax - captchaCount} s`;
        };
        if (captchaCount === 1) {
          setCounDownText();
          this.btnConfigs.disabled = true;
          return;
        }
        if (captchaCount && captchaCount <= this.configs.countMax) {
          setCounDownText();
          return;
        }
      }
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_xButton = vue.resolveComponent("xButton");
    return vue.openBlock(), vue.createBlock(_component_xButton, { configs: _ctx.btnConfigs }, null, 8, ["configs"]);
  }
  const xButtonCountDown = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
  const line = {};
  const CONFIGS_MAP = {
    line
  };
  const _sfc_main$6 = vue.defineComponent({
    name: "xCharts",
    props: {
      payload: {
        required: false,
        type: [Object, String],
        default: ""
      },
      configs: {
        type: [String, Object],
        required: true
      },
      dataset: {
        type: [Array, Object],
        default() {
          return [];
        }
      }
    },
    data() {
      this.updateOptions = xU.debounce(async function() {
        var _a, _b;
        if (this.myChart) {
          this.myChart.dispose();
        }
        await xU.ensureValueDone(() => this.$el);
        const options = this.helper.initOptions(this.$props);
        this.options = this.helper.updateOptions(options, this.dataset);
        this.myChart = this.$echarts.init(this.$el);
        if ((_a = this == null ? void 0 : this.helper) == null ? void 0 : _a.afterInit) {
          (_b = this == null ? void 0 : this.helper) == null ? void 0 : _b.afterInit({
            instance: this.myChart
          });
        }
        this.myChart.showLoading();
        this.myChart.setOption(this.options);
        this.myChart.hideLoading();
      }, 300);
      return {
        myChart: false
      };
    },
    computed: {
      helper() {
        if (xU.isPlainObject(this.configs)) {
          return this.configs;
        }
        return CONFIGS_MAP[this.configs];
      }
    },
    watch: {
      dataset() {
        this.updateOptions();
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        this.observe();
        this.updateOptions();
      },
      observe() {
        this.resizeObserver = new ResizeObserver(() => {
          var _a;
          if (this.myChart) {
            this.updateOptions();
            if ((_a = this == null ? void 0 : this.helper) == null ? void 0 : _a.onResize) {
              this.helper.onResize({
                instance: this.myChart,
                chartVM: this
              });
            }
          }
        });
        this.resizeObserver.observe(this.$el);
      }
    }
  });
  const _hoisted_1$4 = ["id"];
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      id: _ctx.id,
      class: "x-charts flex flex1 center middle"
    }, null, 8, _hoisted_1$4);
  }
  const xCharts = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);
  const _sfc_main$5 = vue.defineComponent({
    name: "xView",
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    },
    computed: {
      id() {
        return `xView_${this._.uid}`;
      }
    }
  });
  const xView_vue_vue_type_style_index_0_lang = "";
  const _hoisted_1$3 = ["id"];
  const _hoisted_2$1 = { class: "xView-body flex vertical flex1" };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      id: _ctx.id,
      class: "flex flex1 vertical"
    }, [
      vue.createElementVNode("div", _hoisted_2$1, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ], 8, _hoisted_1$3)), [
      [vue.vShow, !!_ctx.isShow]
    ]);
  }
  const xView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);
  function _isSlot$1(s) {
    return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
  }
  const STATIC_WORD = {
    OPERATION: "OPERATION",
    NEXT_TICK_TIME: 64
  };
  function defDataGridOption(options) {
    options.pagination = options.pagination || defPagination();
    options.isLoading = Boolean(options.isLoading);
    if (options.queryTableList) {
      options._queryTableList_origin = options.queryTableList;
      options.queryTableList = async function(...args) {
        this.isLoading = true;
        await this._queryTableList_origin.apply(this, args);
        this.isLoading = false;
      };
    }
    options.onPaginationChange = options.onPaginationChange || async function(pagination) {
      await this.queryTableList({
        pagination
      });
    };
    return options;
  }
  function defPagination(num_page = 1, num_size = 10, num_total = 0) {
    const {
      page,
      size,
      total
    } = State_UI.pagination;
    return {
      [page]: num_page || 1,
      [size]: num_size || 10,
      [total]: num_total || 0
    };
  }
  function setPagination(StateTable, pagination) {
    const PAGINATION_MAP = State_UI.pagination;
    xU.each(pagination, (value, prop) => {
      let realProp = PAGINATION_MAP[prop];
      if (!realProp) {
        realProp = prop;
      }
      (StateTable == null ? void 0 : StateTable.pagination) && (StateTable.pagination[realProp] = value);
    });
  }
  function getPaginationPageSize(StateTable) {
    const PAGINATION_MAP = State_UI.pagination;
    const pagination = StateTable.pagination;
    const {
      page,
      size
    } = PAGINATION_MAP;
    return {
      [page]: pagination[page],
      [size]: pagination[size]
    };
  }
  function defCol(options) {
    return {
      [options.prop]: {
        ...options,
        key: options.prop,
        title: options.label,
        dataIndex: options.prop
      }
    };
  }
  function defColActions(options) {
    return defCol(xU.merge({
      label: State_UI.$t("\u64CD\u4F5C").label,
      prop: STATIC_WORD.OPERATION,
      fixed: "right",
      width: "100px"
    }, options));
  }
  function defColActionsBtnlist(options) {
    const {
      fold = 3,
      btns = []
    } = options;
    const [always, more] = (() => {
      if (btns.length > fold) {
        return [btns.slice(0, fold - 1), btns.slice(fold - 1)];
      } else {
        return [btns, []];
      }
    })();
    return vue.createVNode("div", {
      "class": "flex middle"
    }, [vue.createVNode(vue.resolveComponent("xGap"), {
      "l": "4"
    }, null), xU.map(always, (btn) => {
      const configs = xU.merge({
        type: "link",
        size: "small"
      }, btn);
      return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("xButton"), {
        "configs": configs
      }, null), vue.createVNode(vue.resolveComponent("xGap"), {
        "l": "4"
      }, null)]);
    }), (() => {
      if (more.length === 0) {
        return null;
      }
      return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("aDropdown"), null, {
        default: () => {
          return vue.createVNode(vue.resolveComponent("elButton"), {
            "type": "link"
          }, {
            default: () => [State_UI.$t("\u66F4\u591A").label]
          });
        },
        overlay: () => {
          let _slot;
          return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("elMenu"), null, _isSlot$1(_slot = xU.map(more, (btn) => {
            const configs = xU.merge({
              type: "link",
              size: "small"
            }, btn);
            return vue.createVNode(vue.resolveComponent("elMenuItem"), {
              "key": btn.text
            }, {
              default: () => [vue.createVNode(vue.resolveComponent("xButton"), {
                "configs": configs
              }, null)]
            });
          })) ? _slot : {
            default: () => [_slot]
          })]);
        }
      }), vue.createVNode(vue.resolveComponent("xGap"), {
        "l": "4"
      }, null)]);
    })()]);
  }
  function filterColIsShow(isShow, prop) {
    if (xU.isBoolean(isShow)) {
      return isShow;
    } else {
      return true;
    }
  }
  function setDataGridInfo(StateBind, result = {}) {
    const {
      data = [],
      total = false,
      selected = false
    } = result;
    StateBind.dataSource = data;
    if (selected) {
      StateBind.selected = selected;
    }
    if (total || total === 0) {
      setPagination(StateBind, {
        total
      });
    }
  }
  const PAGE_SIZE_OPTIONS = ["10", "20", "30"];
  const xPagination = vue.defineComponent({
    name: "xPagination",
    setup() {
      return {
        State_UI
      };
    },
    props: {
      onPaginationChange: {
        type: Function,
        default: false
      },
      pagination: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      const {
        page,
        size,
        total
      } = State_UI.pagination;
      return {
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        page,
        size,
        total
      };
    },
    methods: {
      onShowSizeChange: xU.debounce(function(page, size) {
        setPagination(this, {
          page,
          size
        });
        if (this.onPaginationChange) {
          this.onPaginationChange(this.pagination);
        }
      }, 30)
    },
    computed: {
      i18nMessage() {
        return {
          \u603B\u6761\u6570: "\u603B\u6761\u6570 {total}",
          \u6761\u9875: "{size}\u6761/\u9875",
          ...this.State_UI.i18nMessage
        };
      }
    },
    render() {
      const {
        page,
        size,
        total
      } = State_UI.pagination;
      xU(page, size, total);
      if (!this.pagination[total]) {
        return null;
      }
      return vue.createVNode(vue.resolveComponent("aPagination"), {
        "current": this.pagination[page],
        "onUpdate:current": ($event) => this.pagination[page] = $event,
        "pageSizeOptions": this.pageSizeOptions,
        "total": this.pagination[total],
        "pageSize": this.pagination[size],
        "show-size-changer": true,
        "showTotal": (total2) => this.$t("\u603B\u6761\u6570", {
          total: total2
        }, this.i18nMessage).label,
        "onShowSizeChange": this.onShowSizeChange,
        "onChange": this.onShowSizeChange
      }, {
        buildOptionText: (props) => {
          return vue.createVNode("span", null, [this.$t("\u6761\u9875", {
            size: props.value
          }, this.i18nMessage).label]);
        }
      });
    }
  });
  const _sfc_main$4 = vue.defineComponent({
    name: "XDataGrid",
    components: {
      xPagination
    },
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    setup() {
      return {
        Cpt_UI_locale
      };
    },
    data() {
      return {
        State: {
          id: xU.genId("xDataGrid")
        }
      };
    },
    computed: {
      Cpt_Columns() {
        if (this.configs.isGroupingColumns) {
          return this.configs.columns;
        }
        let columns = null;
        columns = xU.map(this.Cpt_ColumnsOrder, (prop) => xU.find(this.configs.columns, {
          prop
        }));
        columns = xU.filter(columns, (i) => filterColIsShow(i == null ? void 0 : i.isShow, i == null ? void 0 : i.prop));
        return columns;
      },
      Cpt_ColumnsOrder() {
        const order = (() => {
          if (this.configs.columns_order) {
            return this.configs.columns_order;
          } else {
            return xU.map(this.configs.columns, (i) => i.prop);
          }
        })();
        return xU.filter(order, (i) => !!i);
      },
      Cpt_AntTableProperty() {
        if (this.configs.antTableProperty) {
          return this.configs.antTableProperty;
        } else {
          return {};
        }
      },
      Cpt_VNodeTable() {
        if (this.configs.renderTable) {
          return this.configs.renderTable({
            vm: this
          });
        } else {
          const slots = {
            emptyText: () => vue.createVNode("div", {
              "class": "x-empty x-empty-normal"
            }, [vue.createVNode("div", {
              "class": "x-empty-image"
            }, [vue.createVNode(vue.resolveComponent("xIcon"), {
              "icon": "InsideEmpty",
              "style": "width:64px"
            }, null)]), vue.createVNode("p", {
              "class": "x-empty-description"
            }, [this.Cpt_UI_locale.Empty.description])]),
            bodyCell: (args) => {
              const {
                column
              } = args;
              if (column && column.renderCell) {
                const vNode = column.renderCell(args);
                if (xU.isNull(vNode) || xU.isUndefined(vNode)) {
                  return "";
                }
                return vNode;
              }
            }
          };
          const scroll = (() => {
            if (this.configs.scroll) {
              return this.configs.scroll;
            }
            return {
              x: 300
            };
          })();
          return vue.createVNode(ElementPlus.ElTable, vue.mergeProps({
            "loading": this.configs.isLoading,
            "dataSource": this.configs.dataSource,
            "columns": this.Cpt_Columns,
            "scroll": scroll,
            "pagination": false,
            "locale": this.Cpt_UI_locale.Table
          }, this.Cpt_AntTableProperty), slots);
        }
      },
      Cpt_VNodePagination() {
        if (this.configs.isHidePagination) {
          return null;
        }
        return vue.createVNode(xPagination, {
          "class": "table-pagination",
          "pagination": this.configs.pagination,
          "onPaginationChange": this.handlePaginationChange
        }, null);
      }
    },
    mounted() {
      if (this.configs.onMounted) {
        this.configs.onMounted({
          id: this.State.id
        });
      }
    },
    watch: {
      "configs.pagination": {
        deep: true,
        handler(pagination) {
          xU(JSON.stringify(pagination));
        }
      }
    },
    methods: {
      async handlePaginationChange(pagination) {
        var _a;
        if ((_a = this == null ? void 0 : this.configs) == null ? void 0 : _a.onPaginationChange) {
          this.configs.isLoading = true;
          await this.configs.onPaginationChange(pagination);
          this.configs.isLoading = false;
        }
      }
    },
    render() {
      return vue.createVNode("div", {
        "id": this.State.id
      }, [this.Cpt_VNodeTable, this.Cpt_VNodePagination]);
    }
  });
  const xDataGrid_vue_vue_type_style_index_0_lang = "";
  const _sfc_main$3 = vue.defineComponent({
    name: "xColFilter",
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      handleChecked(col) {
        const target = xU.find(this.configs.columns, {
          key: col.key
        });
        target.isShow = xU.isBoolean(target.isShow) ? !target.isShow : false;
      }
    },
    computed: {
      Cpt_ColumnsOrder() {
        const order = (() => {
          if (this.configs.columns_order) {
            return this.configs.columns_order;
          } else {
            return xU.map(this.configs.columns, (i) => i.prop);
          }
        })();
        return xU.filter(order, (i) => !!i);
      },
      Cpt_Columns() {
        return xU.map(this.Cpt_ColumnsOrder, (prop) => xU.find(this.configs.columns, {
          prop
        }));
      },
      checkedList() {
        return xU.filter(this.Cpt_ColumnsOrder, (prop) => {
          const {
            isShow
          } = this.configs.columns[prop];
          return filterColIsShow(isShow);
        });
      }
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ElCheckbox = vue.resolveComponent("ElCheckbox");
    const _component_xIcon = vue.resolveComponent("xIcon");
    const _component_elButton = vue.resolveComponent("elButton");
    const _component_ElPopover = vue.resolveComponent("ElPopover");
    return vue.openBlock(), vue.createBlock(_component_ElPopover, {
      placement: "leftTop",
      trigger: "click"
    }, {
      content: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.Cpt_Columns, (col) => {
          return vue.openBlock(), vue.createElementBlock("p", {
            key: col.key
          }, [
            vue.createVNode(_component_ElCheckbox, {
              checked: _ctx.checkedList.includes(col.key),
              onChange: ($event) => _ctx.handleChecked(col)
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(col.title), 1)
              ]),
              _: 2
            }, 1032, ["checked", "onChange"])
          ]);
        }), 128))
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_elButton, null, {
          icon: vue.withCtx(() => [
            vue.createVNode(_component_xIcon, {
              icon: "insideSettingOutlined",
              style: { "height": "100%", "width": "100%" }
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    });
  }
  const xColFilter = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
  const _sfc_main$2 = vue.defineComponent({
    name: "xDataGridToolbar",
    components: {
      xColFilter
    },
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      Cpt_btn_query() {
        return {
          preset: "query",
          onClick: async () => {
            var _a;
            if ((_a = this.configs) == null ? void 0 : _a.queryTableList) {
              setPagination(this.configs, {
                page: 1
              });
              await this.configs.queryTableList({
                pagination: {
                  page: 1
                }
              });
            }
          }
        };
      },
      Cpt_btn_refresh() {
        return {
          preset: "refresh",
          onClick: async () => {
            if (this.configs.queryTableList) {
              await this.configs.queryTableList();
            }
          }
        };
      },
      Cpt_isShowQuery() {
        if (!this.configs.queryTableList) {
          return false;
        }
        return !this.configs.isHideQuery;
      },
      Cpt_isShowRefresh() {
        if (!this.configs.queryTableList) {
          return false;
        }
        return !this.configs.isHideRefresh;
      },
      Cpt_isShowFilter() {
        if (this.configs.isGroupingColumns) {
          return false;
        }
        if (this.configs.isHideFilter) {
          return false;
        }
        return true;
      },
      Cpt_isSetConfigs() {
        return this.configs;
      }
    }
  });
  const _hoisted_1$2 = { class: "table-options" };
  const _hoisted_2 = { class: "table-option-left flex flex1" };
  const _hoisted_3 = {
    key: 0,
    class: "table-filter flex"
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_xButton = vue.resolveComponent("xButton");
    const _component_xGap = vue.resolveComponent("xGap");
    const _component_xColFilter = vue.resolveComponent("xColFilter");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
      vue.createElementVNode("div", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _ctx.Cpt_isSetConfigs ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
        _ctx.Cpt_isShowQuery ? (vue.openBlock(), vue.createBlock(_component_xButton, {
          key: 0,
          configs: _ctx.Cpt_btn_query
        }, null, 8, ["configs"])) : vue.createCommentVNode("", true),
        vue.createVNode(_component_xGap, { l: "4" }),
        _ctx.Cpt_isShowRefresh ? (vue.openBlock(), vue.createBlock(_component_xButton, {
          key: 1,
          configs: _ctx.Cpt_btn_refresh
        }, null, 8, ["configs"])) : vue.createCommentVNode("", true),
        vue.createVNode(_component_xGap, { l: "4" }),
        _ctx.Cpt_isShowFilter ? (vue.openBlock(), vue.createBlock(_component_xColFilter, {
          key: 2,
          configs: _ctx.configs
        }, null, 8, ["configs"])) : vue.createCommentVNode("", true)
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const xDataGridToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const _sfc_main$1 = vue.defineComponent({
    name: "xCellLabel",
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        loading: false,
        title: ""
      };
    },
    computed: {
      id() {
        return `xLabel_${this._.uid}`;
      }
    },
    watch: {
      configs: {
        immediate: true,
        handler(configs) {
          this.loading = !!configs.loading;
        }
      }
    },
    methods: {
      updateTitle(title) {
        if (this.title !== title) {
          this.title = title;
        }
      }
    },
    updated() {
      const $dom = $__default.default(`#${this.id}`);
      const domWidth = $dom.width();
      const $span = $__default.default(`#${this.id} > span`);
      const spanWidth = $span.width();
      if (domWidth < spanWidth) {
        const text = $dom.text();
        this.updateTitle(text);
      } else {
        this.updateTitle("");
      }
    }
  });
  const _hoisted_1$1 = ["title", "id"];
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "ellipsis",
      title: _ctx.title,
      id: _ctx.id
    }, [
      vue.createElementVNode("span", null, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ], 8, _hoisted_1$1);
  }
  const xCellLabel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const xVirScroll_vue_vue_type_style_index_0_lang = "";
  const itemHeight = 48;
  const oneBlockHeight = 580;
  const _sfc_main = vue.defineComponent({
    name: "XVirScroll",
    props: {
      configs: {
        type: Object,
        default() {
          return {};
        }
      },
      top: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      scrollHeight: {
        type: Number,
        default: 0
      }
    },
    emits: ["update:top", "update:height", "update:scrollHeight"],
    setup() {
      return {};
    },
    data() {
      return {
        itemComponent: this.$slots.item,
        blockCount: 0,
        isLoading: false,
        styleWrapperAll: {
          height: 0
        }
      };
    },
    computed: {
      allItems() {
        return this.configs.items || [];
      },
      positionBlock() {
        return this.blockCount % 3;
      },
      virs1() {
        const position = Number(this.styleWrapper1.match(/(\d)/g).join("")) / 580;
        const start = position * 10;
        const end = start + 10;
        return this.allItems.slice(start, end).map((i, index2) => ({
          ...i,
          index: start + 1 + index2
        }));
      },
      virs2() {
        const position = Number(this.styleWrapper2.match(/(\d)/g).join("")) / 580;
        const start = position * 10;
        const end = start + 10;
        return this.allItems.slice(start, end).map((i, index2) => ({
          ...i,
          index: start + 1 + index2
        }));
      },
      virs3() {
        const position = Number(this.styleWrapper3.match(/(\d)/g).join("")) / 580;
        const start = position * 10;
        const end = start + 10;
        return this.allItems.slice(start, end).map((i, index2) => ({
          ...i,
          index: start + 1 + index2
        }));
      },
      styleWrapper1() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${this.blockCount * 580}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${(this.blockCount + 2) * 580}px)`;
        }
        return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
      },
      styleWrapper2() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${this.blockCount * 580}px)`;
        }
        return `transform:translateY(${(this.blockCount - 1) * 580}px)`;
      },
      styleWrapper3() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${(this.blockCount + 2) * 580}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
        }
        return `transform:translateY(${this.blockCount * 580}px)`;
      }
    },
    watch: {
      top() {
        this.setTop();
      },
      "allItems.length": {
        immediate: true,
        handler() {
          this.updateTop();
          this.setHeight();
        }
      }
    },
    updated() {
      var _a, _b;
      const height = (_a = this.$wrapperEle) == null ? void 0 : _a.height();
      if (height !== this.height) {
        this.$emit("update:height", ((_b = this.$wrapperEle) == null ? void 0 : _b.height()) || 0);
      }
    },
    mounted() {
      this.init();
    },
    beforeUnmount() {
      this.$wrapperEle.off("scroll");
    },
    methods: {
      setTop: xU.debounce(function() {
        if (this.$refs.refWrapper) {
          this.$refs.refWrapper.scrollTo({
            top: this.top,
            behavior: "smooth"
          });
        }
      }, 1e3),
      init() {
        this.$wrapperEle = $__default.default(this.$refs.refWrapper);
        this.$wrapperEle.on("scroll", () => this.updateTop());
      },
      updateTop(event2) {
        if (this.$refs.refWrapper) {
          const top = this.$refs.refWrapper.scrollTop;
          this.blockCount = Math.floor(top / oneBlockHeight);
          this.$emit("update:top", top);
        }
      },
      setHeight() {
        const height = this.allItems.length * itemHeight;
        this.styleWrapperAll.height = `${height}px`;
        this.$emit("update:scrollHeight", height);
      }
    }
  });
  const _hoisted_1 = {
    ref: "refWrapper",
    class: "wrapper vir-item-component"
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createElementVNode("div", {
        style: vue.normalizeStyle(_ctx.styleWrapperAll)
      }, [
        vue.createElementVNode("div", {
          class: "vir-item-wrapper item1",
          style: vue.normalizeStyle(_ctx.styleWrapper1)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.virs1, (vir) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: vir.id,
              class: "vir-item"
            }, [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.itemComponent), { item: vir }, null, 8, ["item"]))
            ]);
          }), 128))
        ], 4),
        vue.createElementVNode("div", {
          class: "vir-item-wrapper item2",
          style: vue.normalizeStyle(_ctx.styleWrapper2)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.virs2, (vir) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: vir.id,
              class: "vir-item"
            }, [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.itemComponent), { item: vir }, null, 8, ["item"]))
            ]);
          }), 128))
        ], 4),
        vue.createElementVNode("div", {
          class: "vir-item-wrapper item3",
          style: vue.normalizeStyle(_ctx.styleWrapper3)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.virs3, (vir) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: vir.id,
              class: "vir-item"
            }, [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.itemComponent), { item: vir }, null, 8, ["item"]))
            ]);
          }), 128))
        ], 4)
      ], 4)
    ], 512);
  }
  const xVirScroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  const ReadonlyItem = vue.defineComponent({
    props: ["value"],
    render() {
      return vue.withDirectives(vue.createVNode("div", {
        "class": "x-input cursor-not-allowed xItem_readonly ellipsis"
      }, [this.value, vue.createVNode("span", {
        "style": "opacity:0"
      }, [vue.createTextVNode(".")])]), [[vue.resolveDirective("uiPopover"), {
        onlyEllipsis: true
      }]]);
    }
  });
  const Input = vue.defineComponent({
    props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
    mounted() {
      xU("xItem Input");
    },
    data(vm) {
      return {
        oldComponent: "",
        ComponentInstance: "",
        _modelValue: ""
      };
    },
    methods: {
      diffComponent(type2) {
        if (type2 === this.oldComponent) {
          return this.ComponentInstance;
        }
        this.oldComponent = type2;
        const ComponentInstance = vue.resolveComponent(type2);
        ComponentInstance.__v_skip = true;
        this.ComponentInstance = ComponentInstance;
      }
    },
    watch: {
      "properties.value"(value) {
        if (value !== void 0) {
          if (value !== this._modelValue) {
            this._modelValue = value;
          }
        }
      },
      _modelValue(modelValue) {
        this.listeners["onUpdate:value"](modelValue);
      }
    },
    computed: {
      component({
        properties
      }) {
        if (!this.ComponentInstance) {
          this.diffComponent("ElInput");
        }
        if (properties.isNumber) {
          this.diffComponent("ElInputNumber");
        }
        return this.ComponentInstance;
      }
    },
    render(vm) {
      const {
        properties,
        slots,
        listeners,
        propsWillDeleteFromConfigs,
        component
      } = vm;
      if (properties.isReadonly) {
        return vue.createVNode(ReadonlyItem, {
          "value": properties.value
        }, null);
      }
      if (properties.isTextarea) {
        properties.type = "textarea";
        properties.autosize = properties.autoSize || {
          minRows: 4,
          maxRows: 6
        };
      }
      return vue.createVNode(component, vue.mergeProps({
        "modelValue": this._modelValue,
        "onUpdate:modelValue": ($event) => this._modelValue = $event
      }, xU.omit(properties, ["value", "isTextarea", ...propsWillDeleteFromConfigs]), xU.omit(listeners, ["onUpdate:value"])), slots);
    }
  });
  const DatePicker = ({
    properties,
    slots,
    listeners
  }) => {
    function checkOneValue(value2) {
      if (!value2) {
        value2 = "";
        return;
      }
      try {
        value2 = dayjs__default.default(value2);
        if (typeof value2 === "object" && value2.$d == "Invalid Date") {
          value2 = "";
          return;
        }
        xU(value2, properties.value);
        if (value2 === "Invalid Date") {
          xU("properties.value", properties.value);
          value2 = "";
          return;
        }
      } catch (error) {
      } finally {
        return value2;
      }
    }
    const value = checkOneValue(properties.value);
    return vue.createVNode(ElementPlus.ElDatePicker, vue.mergeProps(properties, listeners, {
      "value": value
    }), slots);
  };
  const RangePicker = ({
    properties,
    slots,
    listeners
  }) => {
    const RangePicker2 = vue.resolveComponent("aRangePicker");
    console.log("properties", properties.value);
    return vue.createVNode(RangePicker2, vue.mergeProps(properties, listeners, {
      "locale": Cpt_UI_locale.value.DatePicker
    }), slots);
  };
  const Checkbox = vue.defineComponent({
    props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
    computed: {
      checked: {
        get() {
          var _a;
          return ((_a = this.properties) == null ? void 0 : _a.value) || false;
        },
        set(val) {
          this.listeners["onUpdate:value"](val);
        }
      }
    },
    render(vm) {
      const _properties = xU.omit(this.properties, [...this.propsWillDeleteFromConfigs]);
      return vue.createVNode(vue.resolveComponent("ElCheckbox"), vue.mergeProps({
        "modelValue": this.checked,
        "onUpdate:modelValue": ($event) => this.checked = $event
      }, this.listeners, _properties), this.slots);
    }
  });
  const Select = vue.defineComponent({
    props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
    mounted() {
      xU("xItem Select");
    },
    data(vm) {
      return {
        _modelValue: ""
      };
    },
    methods: {},
    watch: {
      "properties.value"(value) {
        if (value !== void 0) {
          if (value !== this._modelValue) {
            this._modelValue = value;
          }
        }
      },
      _modelValue(modelValue) {
        this.listeners["onUpdate:value"](modelValue);
      }
    },
    computed: {},
    render(vm) {
      const {
        properties,
        listeners,
        propsWillDeleteFromConfigs
      } = vm;
      if (properties.isReadonly) {
        return vue.createVNode(ReadonlyItem, {
          "value": properties.value
        }, null);
      }
      const _property = xU.omit(properties, [...propsWillDeleteFromConfigs, "options", "renderOptions"]);
      xU(_property);
      const renderOptions = () => {
        if (properties.renderOptions) {
          return properties.renderOptions();
        } else {
          return xU.map(properties.options, (option) => {
            return vue.createVNode(vue.resolveComponent("ElOption"), {
              "value": option.value,
              "label": option.label
            }, null);
          });
        }
      };
      return vue.createVNode(vue.resolveComponent("ElSelect"), vue.mergeProps({
        "modelValue": this._modelValue,
        "onUpdate:modelValue": ($event) => this._modelValue = $event
      }, _property, listeners), {
        default: renderOptions
      });
    }
  });
  const RadioGroup = ({
    properties,
    slots,
    listeners,
    propsWillDeleteFromConfigs
  }) => {
    const Radio = vue.resolveComponent("ElRadio");
    const RadioGroup2 = vue.resolveComponent("ElRadioGroup");
    const RadioButton = vue.resolveComponent("ElRadioButton");
    const PROPERTY_OPTIONS = properties.options;
    const componentPropertyOmitOptions = xU.omit(properties, ["options"]);
    const renderOptions = () => {
      if (properties.isButton) {
        return xU.map(PROPERTY_OPTIONS, (option) => {
          return vue.createVNode(RadioButton, {
            "value": option.value
          }, {
            default: () => [option.label]
          });
        });
      }
      return xU.map(PROPERTY_OPTIONS, (option) => {
        return vue.createVNode(Radio, {
          "value": option.value
        }, {
          default: () => [option.label]
        });
      });
    };
    return vue.createVNode(RadioGroup2, vue.mergeProps(componentPropertyOmitOptions, listeners), {
      default: renderOptions
    });
  };
  const CheckboxGroup = ({
    properties,
    slots,
    listeners
  }) => {
    return vue.createVNode(vue.resolveComponent("ElCheckboxGroup"), vue.mergeProps(properties, listeners), slots);
  };
  const xSwitch = vue.defineComponent({
    props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
    mounted() {
      xU("xItem ComponentSample");
    },
    data(vm) {
      return {
        _modelValue: ""
      };
    },
    methods: {},
    watch: {
      "properties.value"(value) {
        if (value !== void 0) {
          if (value !== this._modelValue) {
            this._modelValue = value;
          }
        }
      },
      _modelValue(modelValue) {
        this.listeners["onUpdate:value"](modelValue);
      }
    },
    computed: {},
    render(vm) {
      const {
        properties,
        listeners,
        propsWillDeleteFromConfigs
      } = vm;
      return vue.createVNode("div", {
        "class": "x-item_switch"
      }, [vue.createVNode(vue.resolveComponent("ElSwitch"), vue.mergeProps({
        "modelValue": this._modelValue,
        "onUpdate:modelValue": ($event) => this._modelValue = $event
      }, xU.omit(listeners, ["onUpdate:value"]), xU.omit(properties, ["value", ...propsWillDeleteFromConfigs])), null)]);
    }
  });
  const itemRenders = {
    Input,
    Checkbox,
    Select,
    Switch: xSwitch,
    DatePicker,
    RangePicker,
    RadioGroup,
    CheckboxGroup
  };
  const getValueNeedVarify = ({
    value,
    xItemConfigs
  }) => {
    if (value !== void 0) {
      return value;
    } else if (xItemConfigs.value !== void 0) {
      return xItemConfigs.value;
    } else {
      console.error(new Error("miss value"));
      return xItemConfigs.defaultValue;
    }
  };
  const EVENT_TYPE = {
    validateForm: "validateForm",
    update: "update",
    change: "change",
    input: "input",
    blur: "blur",
    focus: "focus"
  };
  const TIPS_TYPE = {
    success: "success",
    error: "error"
  };
  async function validateItem(idSelector) {
    const allItems = $__default.default(`${idSelector} [id^=xItem_]`);
    xU.map(allItems, (domEle, index2, $ele) => {
      console.log(State_UI.xItemCollection[domEle.id]);
    });
  }
  async function validateForm(configsForm, valuesCollection) {
    let propsArray = Object.keys(configsForm);
    if (valuesCollection) {
      propsArray = Object.keys(valuesCollection);
    }
    return Promise.all(xU.map(propsArray, (prop) => {
      const configs = configsForm[prop];
      const valueNeedVarify = getValueNeedVarify({
        value: valuesCollection && valuesCollection[prop] || configs.value,
        xItemConfigs: configs
      });
      return new Promise((resolve2) => {
        try {
          (() => {
            const isFalse = !configs.isShow;
            if (isFalse) {
              return resolve2("");
            }
            const isResFalse = xU.isFunction(configs.isShow) && !configs.isShow();
            if (isResFalse) {
              return resolve2("");
            }
          })();
          if (configs.validate) {
            configs.validate({
              eventType: EVENT_TYPE.validateForm,
              value: valueNeedVarify,
              resolve: resolve2
            });
          } else {
            resolve2("");
          }
        } catch (error) {
          console.error(error);
        }
      });
    })).then((results) => {
      results = results.filter((res) => res && res[0] && res[1]);
      return results;
    }).catch((error) => {
      return error;
    });
  }
  const AllWasWell = (res) => {
    return xU.isArray(res) && res.length === 0;
  };
  const checkXItem = async ({
    xItemConfigs,
    fnCheckedCallback,
    value,
    FormItemId,
    resolve: resolve2
  }) => {
    const valueNeedVarify = getValueNeedVarify({
      value,
      xItemConfigs
    });
    xItemConfigs.checking = true;
    fnCheckedCallback = fnCheckedCallback || xU.doNothing;
    FormItemId = FormItemId || xItemConfigs.FormItemId;
    let result;
    try {
      const {
        rules,
        prop
      } = xItemConfigs;
      result = await (async () => {
        let dontCheck = 0;
        for (const element of rules) {
          const rule = element;
          const trigger = rule.trigger || [];
          let isFail = await (async () => {
            let trigBy;
            const isNeedVerify = (() => {
              if (xItemConfigs.validate.triggerEventsObj[EVENT_TYPE.validateForm]) {
                trigBy = "validateForm";
                return true;
              }
              const isInTrigger = (eventName) => xItemConfigs.validate.triggerEventsObj[eventName];
              if (xU.some(trigger, isInTrigger)) {
                trigBy = `triggerEvent ${trigger.toString()}`;
                return true;
              }
              if (trigger.includes(EVENT_TYPE.update)) {
                const updateTrigger = [EVENT_TYPE.change, EVENT_TYPE.input, EVENT_TYPE.blur];
                if (xU.some(updateTrigger, isInTrigger)) {
                  trigBy = "update";
                  return true;
                }
              }
              return false;
            })();
            trigBy && xU.doNothing(`%cValidate trigger off by [${trigBy}]`, "color:yellow;background:green;");
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
          if (isFail) {
            return [prop, rule.msg, FormItemId];
          }
        }
        if (dontCheck === rules.length) {
          return [false, false];
        } else {
          return [prop, false];
        }
      })();
      fnCheckedCallback(result);
    } catch (error) {
      console.error(error);
    } finally {
      if (xU.isFunction(resolve2)) {
        resolve2(result);
      }
      xItemConfigs.validate.triggerEventsObj = {};
      return result;
    }
  };
  const {
    MutatingProps: MutatingProps$1
  } = xU;
  const domClass = {
    tipsError: "x-form-item-explain x-form-item-explain-error"
  };
  const devHelper = {};
  const WILL_DELETE = [
    "onValidateForm",
    "_$updateUI",
    "once",
    "itemTips",
    "rules",
    "labelVNodeRender",
    "slots",
    "validate",
    "value"
  ];
  const DID_NOT_SET_MODEL_VALUE_BY_V_MODEL = "DID_NOT_SET_MODEL_VALUE_BY_V_MODEL";
  const xItem = vue.defineComponent({
    name: "XItem",
    props: {
      modelValue: {
        type: [Object, String, Number, Boolean],
        default() {
          return DID_NOT_SET_MODEL_VALUE_BY_V_MODEL;
        }
      },
      configs: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    emits: ["update:modelValue"],
    setup(props, {
      attrs,
      slots,
      emit,
      expose
    }) {
      let Cpt_isShowXItem = true;
      let Cpt_isDisabled = false;
      if (xU.isFunction(props.configs.isShow)) {
        Cpt_isShowXItem = vue.computed(props.configs.isShow);
      } else if (xU.isBoolean(props.configs.isShow)) {
        Cpt_isShowXItem = vue.computed(() => !!props.configs.isShow);
      } else {
        Cpt_isShowXItem = vue.computed(() => {
          if (xU.isUndefined(props.configs.isShow)) {
            props.configs.isShow = true;
          }
          return !!props.configs.isShow;
        });
      }
      if (xU.isFunction(props.configs.disabled)) {
        Cpt_isDisabled = vue.computed(props.configs.disabled);
      } else if (xU.isBoolean(props.configs.disabled)) {
        Cpt_isDisabled = vue.computed(() => !!props.configs.disabled);
      }
      return {
        Cpt_isShowXItem,
        Cpt_isDisabled
      };
    },
    data(vm) {
      const {
        $props,
        $attrs
      } = vm;
      const triggerValidate = xU.debounce(function(eventType) {
        const {
          configs
        } = vm.$props;
        if (configs.validate) {
          configs.validate({
            eventType,
            value: vm.properties.value
          });
        }
      }, 500);
      const {
        listeners,
        propsWillDeleteFromConfigs
      } = (() => {
        const {
          configs
        } = $props;
        const propsSet = /* @__PURE__ */ new Set();
        const listeners2 = {
          "onUpdate:value": (val) => {
            if (xU.isObjSetAttr(configs)) {
              if (configs.value === val) {
                return;
              } else {
                configs.value = val;
              }
            }
            vm.$emit("update:modelValue", val);
            if (xU.isFunction(listeners2.onAfterValueEmit)) {
              listeners2.onAfterValueEmit(val);
            }
            triggerValidate(EVENT_TYPE.update);
          },
          onValidateForm: () => {
            triggerValidate(EVENT_TYPE.validateForm);
          },
          onChange: () => {
            triggerValidate(EVENT_TYPE.change);
          },
          onInput: () => {
            triggerValidate(EVENT_TYPE.input);
          },
          onBlur: () => {
            triggerValidate(EVENT_TYPE.blur);
          },
          onFocus: () => {
            triggerValidate(EVENT_TYPE.focus);
          }
        };
        function makeEventHandlerSupportMultiple(prop, xItemInnerEventHandler) {
          propsSet.add(prop);
          if (typeof listeners2[prop] === "object" && xU.isArray(listeners2[prop].handlerArray)) {
            listeners2[prop].handlerArray.push(xItemInnerEventHandler);
          } else {
            listeners2[prop] = (...args) => {
              xU.each(listeners2[prop].handlerArray, (listener) => {
                listener == null ? void 0 : listener.apply(configs, args);
              });
            };
            listeners2[prop].handlerArray = [xItemInnerEventHandler];
          }
        }
        xU.each(listeners2, (value, prop) => makeEventHandlerSupportMultiple(prop, value));
        xU.each(configs, (value, prop) => {
          if (xU.isListener(prop)) {
            makeEventHandlerSupportMultiple(prop, value);
          }
        });
        xU.each($attrs, (value, prop) => {
          if (xU.isListener(prop)) {
            makeEventHandlerSupportMultiple(prop, value);
          }
        });
        return {
          listeners: listeners2,
          propsWillDeleteFromConfigs: [...propsSet]
        };
      })();
      return {
        rerenderCount: 0,
        isRequired: false,
        properties: null,
        itemSlots: {},
        listeners,
        propsWillDeleteFromConfigs
      };
    },
    computed: {
      isSetVModel() {
        return this.modelValue !== DID_NOT_SET_MODEL_VALUE_BY_V_MODEL;
      },
      CurrentXItem() {
        if (xU.isObject(this.configs.itemType)) {
          if (vue.isProxy(this.configs.itemType)) {
            return vue.toRaw(this.configs.itemType);
          }
          return this.configs.itemType;
        }
        return itemRenders[this.configs.itemType] || itemRenders.Input;
      },
      itemTypeName() {
        if (xU.isString(this.configs.itemType)) {
          return String(this.configs.itemType);
        }
        return "";
      },
      isChecking() {
        return Boolean(this.configs.checking);
      },
      FormItemId() {
        return `xItem_${this._.uid}`;
      },
      itemTips() {
        var _a, _b;
        const _itemTips = {
          type: "",
          msg: ""
        };
        if ((_b = (_a = this.configs) == null ? void 0 : _a.itemTips) == null ? void 0 : _b.type) {
          return {
            type: this.configs.itemTips.type,
            msg: xU.isFunction(this.configs.itemTips.msg) ? this.configs.itemTips.msg() : this.configs.itemTips.msg
          };
        } else {
          this.configs.itemTips = _itemTips;
          return _itemTips;
        }
      },
      itemWrapperClass() {
        return [
          this.configs.itemWrapperClass,
          "x-item-wrapper flex middle",
          this.itemTips.type === TIPS_TYPE.error ? "x-form-item-has-error" : ""
        ].join(" ");
      },
      tipsVNode() {
        if (this.isChecking) {
          return vue.createVNode("div", null, [vue.createVNode("div", {
            "data-type": "checking"
          }, [vue.createTextVNode("checking...")])]);
        }
        if (this.configs.tipsVNodeRender) {
          return this.configs.tipsVNodeRender({
            xItem: this,
            configs: this.configs,
            itemTips: this.itemTips
          });
        }
        if (this.itemTips.msg) {
          if (this.itemTips.type === TIPS_TYPE.error) {
            return vue.createVNode("div", {
              "class": domClass.tipsError
            }, [vue.createVNode("div", {
              "data-type": "error"
            }, [this.itemTips.msg])]);
          }
        }
        return null;
      },
      labelVNode() {
        const classString = this.isRequired ? "x-form-item-required" : "";
        if (this.configs.labelVNodeRender) {
          return this.configs.labelVNodeRender(this.configs, classString);
        }
        let label = (() => {
          const _label = this.configs.label;
          if (_label) {
            if (xU.isFunction(_label)) {
              return _label();
            }
            if (xU.isString(_label) || _label.__v_isVNode) {
              return _label;
            }
          }
          return false;
        })();
        if (label === false) {
          return null;
        }
        return vue.createVNode("div", {
          "class": "x-form-item-label"
        }, [vue.createVNode("label", {
          "for": this.configs.prop,
          "class": classString
        }, [label])]);
      }
    },
    watch: {
      $attrs: {
        handler() {
          this.setProperties();
        }
      },
      "properties.value": {
        handler(value) {
          xU(value);
        }
      },
      "configs.value": {
        handler() {
          this.updateValue();
        }
      },
      modelValue: {
        handler() {
          this.updateValue();
        }
      },
      rerenderCount: {
        handler() {
          this.setProperties();
        }
      },
      configs: {
        handler() {
          this.setProperties();
        }
      },
      "configs.options": {
        handler(value) {
          this.setProperties();
        }
      },
      "configs.rules": {
        immediate: true,
        handler(rules) {
          if (rules) {
            this.setValidateInfo(rules);
          }
        }
      },
      "configs.slots": {
        immediate: true,
        handler(slots) {
          if (slots) {
            this.setItemSlots();
          }
        }
      }
    },
    created() {
      const vm = this;
      vm.configs.FormItemId = vm.FormItemId;
      (() => {
        vm.forceUpdateUI = xU.debounce(() => vm.rerenderCount++, 64);
      })();
      (() => {
        vm.configs._$updateUI = (newConfigs) => {
          xU.each(newConfigs, (value, prop) => {
            vm.configs[prop] = value;
          });
          vm.forceUpdateUI();
        };
      })();
      (() => {
        vm.updateValue = xU.debounce(vm.updateValueSync, 94);
        vm.updateValue();
      })();
      (() => {
        vm.setProperties = xU.debounce(function setProperties() {
          xU(vm._.uid);
          const __properties = {};
          const pickProps = (originConfigs) => {
            xU.each(originConfigs, (item, prop) => {
              if (WILL_DELETE.includes(prop)) {
                return;
              }
              if (["placeholder"].includes(prop) && xU.isFunction(item)) {
                __properties[prop] = item(this);
                return;
              }
              __properties[prop] = item;
            });
          };
          xU.each([this.configs, this.$attrs], pickProps);
          this.properties = __properties;
          this.updateValue();
        }, 32);
        vm.setProperties();
      })();
    },
    mounted() {
      var _a;
      devHelper[this._.uid] = 0;
      if ((_a = this.configs) == null ? void 0 : _a.once) {
        this.configs.once.call(this.configs, this);
      }
      State_UI.xItemCollection[this.FormItemId] = this;
    },
    beforeUnmount() {
      delete devHelper[this._.uid];
      delete State_UI.xItemCollection[this.FormItemId];
    },
    methods: {
      async updateValueSync() {
        await xU.ensureValueDone(() => this.properties);
        const vm = this;
        const value = (() => {
          if (vm.isSetVModel) {
            return vm.modelValue;
          } else if (xU.isObjSetAttr(vm.configs)) {
            return vm.configs.value;
          } else if (xU.isObjSetAttr(vm.configs, "defaultValue")) {
            return vm.configs.defaultValue;
          } else {
            xU("either configs.value or modelValue");
            return "";
          }
        })();
        const diffRes = jsondiffpatch.diff(vm.properties.value, value);
        if (diffRes) {
          xU("diff xItem value", diffRes);
          vm.properties.value = value;
          vm.listeners["onUpdate:value"](value);
        }
      },
      setTips(type2 = "", msg = "") {
        MutatingProps$1(this, "configs.itemTips", {
          type: type2,
          msg
        });
      },
      setItemSlots() {
        this.itemSlots = this.configs.slots || {};
      },
      setValidateInfo(rules) {
        let isRequired = false;
        if (xU.isArrayFill(rules)) {
          isRequired = xU.some(rules, {
            name: "required"
          });
          const fnCheckedCallback = ([prop, msg]) => {
            MutatingProps$1(this, "configs.checking", false);
            if (prop) {
              if (msg) {
                this.setTips(TIPS_TYPE.error, msg);
                if (xU.isFunction(this.configs.onValidateFail)) {
                  this.configs.onValidateFail(this.configs);
                }
              } else {
                this.setTips();
              }
            }
          };
          const debounceCheckXItem = xU.debounce(checkXItem, 300);
          const fnConfigsValidate = ({
            eventType,
            value,
            resolve: resolve2
          }) => {
            const prop = `configs.validate.triggerEventsObj.${eventType}`;
            MutatingProps$1(this, prop, true);
            debounceCheckXItem({
              FormItemId: this.FormItemId,
              xItemConfigs: this.configs,
              value,
              fnCheckedCallback,
              resolve: resolve2
            });
          };
          MutatingProps$1(this, "configs.validate", fnConfigsValidate);
          MutatingProps$1(this, "configs.validate.triggerEventsObj", {});
        } else {
          if (xU.isFunction(this.configs.validate)) {
            delete this.configs.validate;
          }
        }
        this.isRequired = isRequired;
      }
    },
    render() {
      if (!this.properties) {
        return null;
      }
      if (xU.isUndefined(this.Cpt_isShowXItem)) {
        debugger;
      }
      if (!this.Cpt_isShowXItem) {
        return null;
      }
      const {
        CurrentXItem,
        properties,
        Cpt_isDisabled,
        propsWillDeleteFromConfigs,
        itemTypeName,
        FormItemId
      } = this;
      xU(`xItem ${this._.uid} render ${++devHelper[this._.uid]} times`);
      return vue.createVNode("div", {
        "id": FormItemId,
        "class": this.itemWrapperClass
      }, [this.labelVNode, vue.createVNode("div", {
        "class": "x-form-item-control",
        "data-type": itemTypeName
      }, [vue.createVNode(CurrentXItem, {
        "id": `CurrentXItem_${FormItemId}`,
        "data-current-item-label": properties.label,
        "data-current-item-prop": properties.prop,
        "data-current-item-type": itemTypeName,
        "propsWillDeleteFromConfigs": propsWillDeleteFromConfigs,
        "properties": {
          ...properties,
          disabled: Cpt_isDisabled
        },
        "listeners": this.listeners,
        "slots": this.itemSlots
      }, null), this.tipsVNode]), this.$slots.afterControll && this.$slots.afterControll()]);
    }
  });
  const xVirTableTh = vue.defineComponent({
    props: ["column", "index"],
    computed: {
      prop() {
        var _a;
        return (_a = this.column) == null ? void 0 : _a.prop;
      },
      label() {
        var _a;
        return (_a = this.column) == null ? void 0 : _a.label;
      },
      renderHeader() {
        var _a;
        return ((_a = this.column) == null ? void 0 : _a.renderHeader) || false;
      },
      vDomCellContent() {
        if (this.renderHeader) {
          return this.renderHeader({
            label: this.label,
            prop: this.prop,
            index: this.index
          });
        }
        return this.label;
      }
    },
    render() {
      return vue.createVNode("div", {
        "role": "th",
        "class": "xVirTable-cell",
        "data-prop": this.prop,
        "data-index": this.index
      }, [this.vDomCellContent]);
    }
  });
  const usefnObserveDomResize = () => {
    function fnObserveDomResize($el, callback) {
      this.resizeObserver = new ResizeObserver(callback);
      this.resizeObserver.observe($el);
    }
    function fnUnobserveDomResize($el) {
      this.resizeObserver.unobserve($el);
    }
    return {
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  };
  $__default.default(window).on("click.virTableTdId", function(e) {
    const virTableTdId = (() => {
      let $ele = $__default.default(e.target);
      let _virTableTdId = $ele.attr("id");
      if (/^virTableTdId_/.test(_virTableTdId)) {
        return _virTableTdId;
      } else {
        $ele = $ele.parents("[id^=virTableTdId_]");
        _virTableTdId = $ele.attr("id");
        return _virTableTdId;
      }
    })();
    $__default.default(window).trigger({
      type: "onAllCell",
      virTableTdId
    });
  });
  const xVirTableTd = vue.defineComponent({
    props: ["column", "data"],
    emits: ["update:data"],
    setup() {
      return {
        configs: vue.inject("configs")
      };
    },
    computed: {
      record() {
        const vm = this;
        return new Proxy(vm.data, {
          get(obj, prop) {
            return vm.data[prop];
          },
          set(obj, prop, val) {
            vm.data[prop] = val;
            vm.configs.dataSource[vm.data.__virRowIndex][prop] = val;
            return true;
          }
        });
      },
      id() {
        return `virTableTdId_${this._.uid}`;
      },
      prop() {
        var _a;
        return (_a = this.column) == null ? void 0 : _a.prop;
      },
      cell() {
        return this.data[this.prop];
      },
      renderEditor() {
        var _a, _b;
        if ((_a = this.column) == null ? void 0 : _a.renderEditor) {
          return (_b = this.column) == null ? void 0 : _b.renderEditor;
        }
        return false;
      },
      renderCell() {
        var _a, _b;
        if ((_a = this.column) == null ? void 0 : _a.renderCell) {
          return (_b = this.column) == null ? void 0 : _b.renderCell;
        }
        return false;
      }
    },
    data(vm) {
      return {
        isFocus: false,
        count: 0
      };
    },
    methods: {
      handleAllCell(e) {
        if (e.virTableTdId === this.id) {
          if (!this.isFocus) {
            this.isFocus = true;
            setTimeout(() => {
              $__default.default(this.$refs.cell).find("input").trigger("focus");
            }, 64);
          }
        } else {
          if (this.isFocus) {
            this.isFocus = false;
          }
        }
      }
    },
    mounted() {
      $__default.default(window).on("onAllCell", this.handleAllCell);
      if (this.renderEditor) {
        $__default.default(this.$refs.cell).addClass("cursor-editor");
      }
    },
    beforeUnmount() {
      $__default.default(window).off("onAllCell", this.handleAllCell);
    },
    render() {
      return vue.createVNode("div", {
        "id": this.id,
        "ref": "cell",
        "role": "td",
        "class": "xVirTable-cell",
        "data-count": this.count,
        "data-prop": this.prop,
        "data-row-index": this.data.__virRowIndex
      }, [(() => {
        if (this.renderEditor && this.renderCell) {
          if (this.isFocus) {
            return this.renderEditor({
              configs: this.configs,
              record: this.record,
              cell: this.cell,
              index: this.data.__virRowIndex
            });
          } else {
            return this.renderCell({
              configs: this.configs,
              record: this.record,
              cell: this.cell,
              index: this.data.__virRowIndex
            });
          }
        }
        if (!this.renderEditor && this.renderCell) {
          return this.renderCell({
            configs: this.configs,
            record: this.record,
            cell: this.cell,
            index: this.data.__virRowIndex
          });
        }
        if (this.renderEditor && !this.renderCell) {
          if (this.isFocus) {
            return this.renderEditor({
              configs: this.configs,
              record: this.record,
              cell: this.cell,
              index: this.data.__virRowIndex
            });
          } else {
            return this.cell;
          }
        }
        return this.cell;
      })()]);
    }
  });
  const xVirTableBody = vue.defineComponent({
    props: ["columnOrder", "columns", "rowHeight", "selectedConfigs", "selected"],
    emits: ["selectedChange", "update:scrollHeight", "scroll"],
    inject: ["xVirTable"],
    components: {
      xVirTableTd
    },
    setup() {
      const {
        fnObserveDomResize,
        fnUnobserveDomResize
      } = usefnObserveDomResize();
      return {
        uniqBy: vue.inject("uniqBy"),
        configs: vue.inject("configs"),
        rowCache: {},
        fnObserveDomResize,
        fnUnobserveDomResize
      };
    },
    data(vm) {
      this.debounceSetPerBlockHeight = xU.debounce(function(viewportHeight) {
        this.viewportHeight = viewportHeight;
        this.perBlockRowCount = Math.ceil(viewportHeight / this.rowHeight);
        this.perBlockHeight = this.perBlockRowCount * this.rowHeight;
        this.setHeight();
      }, 64);
      return {
        isLoading: false,
        perBlockHeight: 1,
        perBlockRowCount: 0,
        blockInViewCount: 0,
        styleWrapperAll: {
          height: 0,
          position: "relative"
        },
        virs1: [],
        virs2: [],
        virs3: []
      };
    },
    mounted() {
      this.fnObserveDomResize(this.$refs.wrapper, () => {
        this.xVirTable.layoutDebounce();
        this.debounceSetPerBlockHeight(this.$refs.wrapper.offsetHeight);
      });
      this.$watch(() => {
        return `${this.configs.dataSource.length}_${this.perBlockHeight}_${this.perBlockRowCount}_${this.styleWrapper1}_${this.styleWrapper2}_${this.styleWrapper3}`;
      }, () => {
        this.updateCell();
      });
    },
    beforeUnmount() {
      this.fnUnobserveDomResize(this.$refs.wrapper);
    },
    computed: {
      fnIsSelected() {
        const {
          isSelect,
          prop
        } = this.selectedConfigs || {};
        if (xU.isFunction(isSelect)) {
          return (rowInfo) => {
            return isSelect.call(this, {
              ...rowInfo,
              selected: this.selected
            });
          };
        } else {
          return ({
            rowData
          }) => {
            const id = rowData[prop];
            return this.selected.includes(id);
          };
        }
      },
      fnIsDisabled() {
        const {
          isDisabled
        } = this.selectedConfigs || {};
        if (xU.isFunction(isDisabled)) {
          return (...args) => {
            return isDisabled.apply(this, args);
          };
        } else {
          return () => {
            return false;
          };
        }
      },
      positionBlock() {
        return this.blockInViewCount % 3;
      },
      styleWrapper1() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${this.blockInViewCount * this.perBlockHeight}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${(this.blockInViewCount + 2) * this.perBlockHeight}px)`;
        }
        return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight}px)`;
      },
      styleWrapper2() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${this.blockInViewCount * this.perBlockHeight}px)`;
        }
        return `transform:translateY(${(this.blockInViewCount - 1) * this.perBlockHeight}px)`;
      },
      styleWrapper3() {
        if (this.positionBlock === 0) {
          return `transform:translateY(${(this.blockInViewCount + 2) * this.perBlockHeight}px)`;
        }
        if (this.positionBlock === 1) {
          return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight}px)`;
        }
        return `transform:translateY(${this.blockInViewCount * this.perBlockHeight}px)`;
      },
      vDomBodyTr1() {
        return this.genTr(this.virs1);
      },
      vDomBodyTr2() {
        return this.genTr(this.virs2);
      },
      vDomBodyTr3() {
        return this.genTr(this.virs3);
      }
    },
    methods: {
      clearCacheRow() {
        const props = xU.filter(this.rowCache, (value, prop) => /^blockId/.test(prop));
        xU.each(props, (prop) => delete this.rowCache[prop]);
      },
      onClickRow(payload) {
        var _a;
        if ((_a = this == null ? void 0 : this.configs) == null ? void 0 : _a.onClickRow) {
          this.configs.onClickRow(payload);
        }
      },
      genTr(rows) {
        const vDomBlock = (() => {
          if (!this.uniqBy) {
            return xU.map(rows, (data, rowIndex) => {
              const {
                __virRowIndex
              } = data;
              const payload = {
                rowIndex: __virRowIndex,
                rowData: data
              };
              return vue.createVNode("div", {
                "role": "tr",
                "class": "xVirTable-row flex horizon",
                "data-row-key": __virRowIndex,
                "onClick": () => this.onClickRow(payload)
              }, [this.genSelectedVDom(payload), xU.map(this.columnOrder, (prop, index2) => {
                return vue.createVNode(xVirTableTd, {
                  "column": this.columns[prop],
                  "data-index": index2,
                  "data": data,
                  "onUpdate:data": ($event) => data = $event
                }, null);
              })]);
            });
          } else {
            const blockId = xU.reduce(rows, (id, row) => {
              id += row[this.uniqBy];
              return id;
            }, "blockId");
            if (!this.rowCache[blockId]) {
              this.rowCache[blockId] = xU.map(rows, (data, rowIndex) => {
                if (!this.rowCache[data[this.uniqBy]]) {
                  const {
                    __virRowIndex
                  } = data;
                  this.rowCache[data[this.uniqBy]] = vue.createVNode("div", {
                    "role": "tr",
                    "class": "xVirTable-row flex horizon",
                    "data-row-key": __virRowIndex
                  }, [this.genSelectedVDom({
                    rowIndex: __virRowIndex,
                    rowData: data
                  }), xU.map(this.columnOrder, (prop, index2) => {
                    return vue.createVNode(xVirTableTd, {
                      "column": this.columns[prop],
                      "data-col-index": index2,
                      "data": data,
                      "onUpdate:data": ($event) => data = $event
                    }, null);
                  })]);
                }
                return this.rowCache[data._id];
              });
            }
            return this.rowCache[blockId];
          }
        })();
        return vDomBlock;
      },
      updateCell() {
        xU("updateCell");
        this.setVirs1();
        this.setVirs2();
        this.setVirs3();
      },
      setVirs1() {
        const position = Number(this.styleWrapper1.match(/(\d)/g).join("")) / this.perBlockHeight;
        const start = position * this.perBlockRowCount;
        const end = start + this.perBlockRowCount;
        this.virs1 = this.fragment(start, end);
      },
      setVirs2() {
        const position = Number(this.styleWrapper2.match(/(\d)/g).join("")) / this.perBlockHeight;
        const start = position * this.perBlockRowCount;
        const end = start + this.perBlockRowCount;
        this.virs2 = this.fragment(start, end);
      },
      setVirs3() {
        const position = Number(this.styleWrapper3.match(/(\d)/g).join("")) / this.perBlockHeight;
        const start = position * this.perBlockRowCount;
        const end = start + this.perBlockRowCount;
        this.virs3 = this.fragment(start, end);
      },
      fragment(start, end) {
        const targetRecords = this.configs.dataSource.slice(start, end).map((i, index2) => {
          i.__virRowIndex = start + index2;
          return i;
        });
        return targetRecords;
      },
      genSelectedVDom(rowInfo) {
        if (!this.selectedConfigs) {
          return null;
        }
        const isSelected = this.fnIsSelected(rowInfo);
        let isDisabled = this.fnIsDisabled(rowInfo);
        const handleChange = (e) => {
          const {
            prop
          } = this.selectedConfigs;
          this.emitSelectedChange(e.target.checked, rowInfo.rowData[prop]);
        };
        let vDomChecked;
        if (xU.isString(isDisabled)) {
          isDisabled = true;
          const uiPopoverConfigs = {
            content: isDisabled
          };
          vDomChecked = vue.withDirectives(vue.createVNode(vue.resolveComponent("ElCheckbox"), {
            "checked": isSelected,
            "onChange": handleChange,
            "disabled": true
          }, null), [[vue.resolveDirective("uiPopover"), uiPopoverConfigs]]);
        } else {
          vDomChecked = vue.createVNode(vue.resolveComponent("ElCheckbox"), {
            "checked": isSelected,
            "onChange": handleChange,
            "disabled": isDisabled
          }, null);
        }
        return vue.createVNode("div", {
          "role": "td",
          "data-prop": "xVirSelected",
          "class": "flex middle center xVirTable-cell xVirSelected_inner_element xVirSelected_inner_element_check"
        }, [vDomChecked]);
      },
      emitSelectedChange(checked, id) {
        this.$emit("selectedChange", {
          checked,
          id
        });
      },
      setTop: xU.debounce(function() {
        if (this.$refs.refWrapper) {
          this.$refs.refWrapper.scrollTo({
            top: this.top,
            behavior: "smooth"
          });
        }
      }, 1e3),
      updateTop(event2) {
        if (event2) {
          const top = event2.target.scrollTop;
          const left = event2.target.scrollLeft;
          this.$emit("scroll", left);
          this.blockInViewCount = Math.floor(top / this.perBlockHeight);
        }
      },
      setHeight() {
        const height = this.configs.dataSource.length * this.rowHeight;
        if (!height) {
          delete this.styleWrapperAll.width;
        } else if (this.viewportHeight && height < this.viewportHeight) {
          this.styleWrapperAll.width = `calc(100% - 6px)`;
        } else {
          delete this.styleWrapperAll.width;
        }
        this.styleWrapperAll.height = `${height}px`;
        if (this.$refs.wrapper) {
          this.$nextTick(() => {
            if (this.$refs.wrapper.scrollTop > 1) {
              this.$refs.wrapper.scrollTop--;
            } else {
              this.$refs.wrapper.scrollTop++;
            }
          });
        }
      }
    },
    watch: {
      rowHeight: {
        immediate: true,
        async handler() {
          await xU.ensureValueDone(() => {
            var _a, _b;
            return (_b = (_a = this.$refs) == null ? void 0 : _a.wrapper) == null ? void 0 : _b.offsetHeight;
          });
          this.debounceSetPerBlockHeight(this.$refs.wrapper.offsetHeight);
        }
      },
      top() {
        this.setTop();
      },
      "configs.dataSource": {
        immediate: true,
        async handler() {
          await xU.ensureValueDone(() => this.perBlockHeight);
          this.updateCell();
          this.clearCacheRow();
          this.updateTop(false);
          this.setHeight();
        }
      }
    },
    render() {
      const vDomTableBody = vue.createVNode("div", {
        "role": "body",
        "class": "xVirTable-body-wrapper flex1 width100",
        "ref": "wrapper",
        "onScroll": this.updateTop
      }, [vue.createVNode("div", {
        "style": this.styleWrapperAll
      }, [vue.createVNode("div", {
        "class": "xVirTable-body-item item1",
        "style": this.styleWrapper1
      }, [this.vDomBodyTr1]), vue.createVNode("div", {
        "class": "xVirTable-body-item item2",
        "style": this.styleWrapper2
      }, [this.vDomBodyTr2]), vue.createVNode("div", {
        "class": "xVirTable-body-item item3",
        "style": this.styleWrapper3
      }, [this.vDomBodyTr3])])]);
      return vDomTableBody;
    }
  });
  const {
    MutatingProps
  } = xU;
  const mmWidth = (_width) => `width:${_width}; min-width:${_width}; max-width:${_width};`;
  function defXVirTableConfigs(options) {
    const required = ["rowHeight", "columns"];
    if (xU.some(required, (prop) => {
      if (!options[prop]) {
        alert("defXVirTableConfigs miss required " + prop);
        return true;
      }
      return false;
    })) {
      throw new Error("defXVirTableConfigs miss required");
    }
    if (options.selectedConfigs) {
      options.selected = options.selected || [];
      options.getSelectedRow = vue.markRaw(function() {
        return xU.filter(options.dataSource, (i) => {
          const idValue = i[options.selectedConfigs.prop];
          return xU.isArrayFill(options == null ? void 0 : options.selected) && options.selected.includes(idValue);
        });
      });
    }
    return options;
  }
  defXVirTableConfigs.type = {
    many: "many",
    one: "one"
  };
  const xVirTable = vue.defineComponent({
    props: ["configs", "uniqBy"],
    components: {
      xVirTableTh,
      xVirTableBody
    },
    setup(props) {
      vue.provide("uniqBy", props.uniqBy);
      vue.provide("configs", props.configs);
    },
    mounted() {
      this.initStyle();
      this.layoutDebounce();
    },
    provide() {
      const vm = this;
      return {
        xVirTable: vm
      };
    },
    data() {
      this.resetOperationWidthDebounce = xU.debounce(this.resetOperationWidth, STATIC_WORD.NEXT_TICK_TIME);
      this.layoutDebounce = xU.debounce(this.layout, STATIC_WORD.NEXT_TICK_TIME);
      this.resetColumnWidthDebounce = xU.debounce(this.resetColumnWidth, STATIC_WORD.NEXT_TICK_TIME);
      return {
        styleWidthXVirTable: 0,
        styleWidthOperation: "120px",
        selectedAll: false
      };
    },
    computed: {
      selectedIndeterminate() {
        var _a, _b;
        const dataLength = ((_b = (_a = this.configs) == null ? void 0 : _a.dataSource) == null ? void 0 : _b.length) || 0;
        const selectedLength = this.selected.length;
        if (dataLength == 0 || selectedLength == 0 || dataLength == selectedLength) {
          return false;
        }
        return true;
      },
      selected() {
        var _a;
        return ((_a = this.configs) == null ? void 0 : _a.selected) || [];
      },
      selectedType() {
        var _a, _b, _c;
        if (!((_a = this.configs) == null ? void 0 : _a.selectedConfigs)) {
          return false;
        }
        return ((_c = (_b = this.configs) == null ? void 0 : _b.selectedConfigs) == null ? void 0 : _c.type) || defXVirTableConfigs.type.many;
      },
      selectedProp() {
        var _a, _b, _c, _d;
        if (!this.selectedType) {
          return false;
        }
        if (!((_b = (_a = this.configs) == null ? void 0 : _a.selectedConfigs) == null ? void 0 : _b.prop)) {
          alert("vVirTable miss this.selected id prop");
        }
        return (_d = (_c = this.configs) == null ? void 0 : _c.selectedConfigs) == null ? void 0 : _d.prop;
      },
      selectedBy() {
        var _a, _b, _c, _d;
        if (!this.selectedType) {
          return false;
        }
        if (xU.isFunction((_b = (_a = this.configs) == null ? void 0 : _a.selectedConfigs) == null ? void 0 : _b.fn)) {
          return (_d = (_c = this.configs) == null ? void 0 : _c.selectedConfigs) == null ? void 0 : _d.fn;
        } else {
          return false;
        }
      },
      customClass() {
        var _a, _b;
        if (xU.isFunction((_a = this.configs) == null ? void 0 : _a.customClass)) {
          return (_b = this.configs) == null ? void 0 : _b.customClass(this.xVirTableId);
        } else {
          return "";
        }
      },
      rowHeight() {
        var _a;
        return ((_a = this.configs) == null ? void 0 : _a.rowHeight) || 32;
      },
      xVirTableId() {
        return `xVirTableId_${this._.uid}`;
      },
      columnOrder() {
        var _a, _b, _c;
        if ((_a = this.configs) == null ? void 0 : _a.columnOrder) {
          return (_b = this.configs) == null ? void 0 : _b.columnOrder;
        }
        return Object.keys(((_c = this.configs) == null ? void 0 : _c.columns) || {});
      },
      columnWidthStyleArray() {
        const _columnWidthStyleArray = xU.reduce(
          this.columnOrder,
          (styleEachColumn, prop) => {
            if (prop === STATIC_WORD.OPERATION) {
              return styleEachColumn;
            } else {
              const configsColumn = this.configs.columns[prop] || {};
              const {
                width,
                __calcWidth
              } = configsColumn;
              const _width = __calcWidth || width;
              if (_width) {
                styleEachColumn.push(`#${this.xVirTableId} div[role=tr] >div[role=th][data-prop=${prop}],#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${prop}]{ ${mmWidth(_width)} }`);
              }
              return styleEachColumn;
            }
          },
          [`#${this.xVirTableId} div[role=tr] >div[role=th][data-prop=${STATIC_WORD.OPERATION}]{  ${mmWidth(this.styleWidthOperation)} }`, `#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${STATIC_WORD.OPERATION}]{  ${mmWidth(this.styleWidthOperation)} }`]
        );
        return _columnWidthStyleArray;
      },
      vDomTheadSelect() {
        if (!this.selectedType) {
          return null;
        }
        let vDomTheadSelect = vue.createVNode(vue.resolveComponent("ElCheckbox"), {
          "checked": this.selectedAll,
          "indeterminate": this.selectedIndeterminate,
          "onChange": this.handleSelectedChangeTh
        }, null);
        if (this.selectedType == "one") {
          vDomTheadSelect = null;
        }
        return vue.createVNode("div", {
          "role": "th",
          "class": "flex middle center xVirTable-cell xVirSelected_inner_element xVirSelected_inner_element_check",
          "data-prop": "xVirSelected"
        }, [vDomTheadSelect]);
      },
      vDomThead() {
        return vue.createVNode("div", {
          "role": "thead",
          "class": "xVirTable-thead"
        }, [vue.createVNode("div", {
          "role": "tr",
          "class": "flex horizon"
        }, [this.vDomTheadSelect, xU.map(this.columnOrder, (prop, index2) => {
          var _a;
          const column = (_a = this.configs) == null ? void 0 : _a.columns[prop];
          return vue.createVNode(xVirTableTh, {
            "column": column,
            "index": index2,
            "key": prop
          }, null);
        })])]);
      },
      styleContent() {
        const allStyleArray = [
          `#${this.xVirTableId} div[role=table]{overflow:hidden;}`,
          `#${this.xVirTableId} div[role=tr] >div{flex:1; }`,
          `#${this.xVirTableId} div[role=tr] >div[role=th]{ width:200px;min-width:200px;max-width:200px;text-align:center;white-space: nowrap; }`,
          `#${this.xVirTableId} div[role=tr] >div[role=th][data-prop=xVirSelected],#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=xVirSelected]{ width:32px;max-width:32px;min-width:32px;overflow:hidden;text-align:center; }`,
          `#${this.xVirTableId} div[role=tr] >div[role=td]{ width:200px;min-width:200px;max-width:200px;overflow:hidden;height:${this.rowHeight}px;display: flex; justify-content: start; align-items: center;}`
        ].concat(this.columnWidthStyleArray, this.customClass);
        if (this.styleWidthXVirTable) {
          allStyleArray.unshift(`#${this.xVirTableId} div[role=table] div[role=thead] {width:${this.styleWidthXVirTable}; }`);
          if (this.configs.dataSource.length === 0) {
            allStyleArray.unshift(`#${this.xVirTableId} .xVirTable-body-wrapper.flex1.width100 >div {width:${this.styleWidthXVirTable}; }`);
          }
        }
        return allStyleArray.join("\n");
      }
    },
    watch: {
      "configs.selected"(selected) {
        if ((selected == null ? void 0 : selected.length) === 0) {
          this.selectedAll = false;
        }
      },
      "configs.dataSource": {
        handler() {
          this.resetOperationWidthDebounce();
        }
      },
      styleContent() {
        this.updateStyle(this.styleContent);
      }
    },
    methods: {
      resetColumnWidth(contentWrapperWidth) {
        const selectorTable = `#${this.xVirTableId}`;
        const $tableWrapper = $__default.default(selectorTable);
        const tableWrapperWidth = $tableWrapper.outerWidth();
        const superfluous = tableWrapperWidth - contentWrapperWidth - 6;
        const isGrow = superfluous > 1;
        const isShrink = superfluous < -2;
        console.log("superfluous", superfluous, "isGrow", isGrow, "isShrink", isShrink);
        const selectorThead = `${selectorTable} >div[role=table] >div[role=thead] >div[role=tr] >div[role=th]`;
        const $tHead = $__default.default(selectorThead);
        const mayCalculateWidth = xU.filter(this.configs.columns, (i) => {
          if (i.prop === STATIC_WORD.OPERATION) {
            return false;
          }
          if (i.width) {
            return false;
          }
          return true;
        });
        if (isGrow) {
          const width = Math.floor(superfluous / mayCalculateWidth.length) - 0.5;
          xU.each($tHead, (dom) => {
            const prop = dom.dataset.prop;
            const inMayCalculateWidth = xU.some(mayCalculateWidth, (i) => i.prop === prop);
            if (inMayCalculateWidth) {
              const columnWidth = dom.offsetWidth + width;
              this.configs.columns[prop].__calcWidth = `${columnWidth}px`;
            }
          });
        }
        if (isShrink) {
          if (mayCalculateWidth.length > 0) {
            let originContentWrapperWidth = 10;
            xU.each($tHead, (dom) => {
              const prop = dom.dataset.prop;
              const inMayCalculateWidth = xU.some(mayCalculateWidth, (i) => i.prop === prop);
              if (inMayCalculateWidth) {
                originContentWrapperWidth += 200;
              } else {
                originContentWrapperWidth += dom.offsetWidth;
              }
            });
            if (originContentWrapperWidth < tableWrapperWidth) {
              const width = Math.floor((tableWrapperWidth - originContentWrapperWidth) / mayCalculateWidth.length) - 0.5;
              xU.each(mayCalculateWidth, (configs) => {
                const columnWidth = 200 + width;
                configs.__calcWidth = `${columnWidth}px`;
              });
            }
          }
        }
      },
      onBodyScroll(left) {
        this.$refs.thead.scrollLeft = left;
      },
      resetOperationWidth() {
        if (this.configs.dataSource.length === 0) {
          return;
        }
        try {
          const $wrapper = $__default.default(`#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${STATIC_WORD.OPERATION}]`);
          const $child = $wrapper.find(">div");
          const wrapperWidth = $wrapper.outerWidth();
          const childWidth = $child.outerWidth();
          if (!wrapperWidth && !childWidth) {
            throw new Error("uninit");
          }
          if (wrapperWidth < childWidth) {
            this.styleWidthOperation = `${childWidth}px`;
          }
          this.layoutDebounce();
        } catch (error) {
          this.resetOperationWidthDebounce();
        }
      },
      layout() {
        const selectorHead = `#${this.xVirTableId} >div[role=table] >div[role=thead] >div[role=tr] >div[role=th]`;
        const selectorBody = `#${this.xVirTableId} .xVirTable-body-item`;
        const bodyWidth = xU.map($__default.default(selectorBody), (dom) => dom.offsetWidth);
        bodyWidth.push(xU.reduce($__default.default(selectorHead), (_width, dom) => {
          _width += dom.offsetWidth;
          return _width;
        }, 0));
        const width = xU.max(bodyWidth);
        if (width) {
          this.styleWidthXVirTable = `${width}px`;
          this.resetColumnWidthDebounce(width);
        }
      },
      initStyle() {
        const $form = $__default.default(`#${this.xVirTableId}`);
        const $style = $__default.default("<style/>", {
          id: `style_${this.xVirTableId}`
        }).append(this.styleContent);
        $form.prepend($style);
      },
      updateStyle(styleContent) {
        const $style = $__default.default(`#style_${this.xVirTableId}`);
        $style.html(styleContent);
      },
      handleSelectedChange() {
      },
      handleSelectedChangeTh(e) {
        const {
          checked
        } = e.target;
        if (checked) {
          this.selectedAll = true;
          this.configs.selected = xU.map(this.configs.dataSource, (i) => MutatingProps(i, this.selectedProp));
        } else {
          this.configs.selected = [];
        }
      },
      handleSelectedChangeTd({
        id
      }) {
        var _a;
        const isOnlyOne = this.selectedType === "one";
        const index2 = xU.findIndex((_a = this.configs) == null ? void 0 : _a.selected, (i) => i === id);
        if (index2 > -1) {
          if (isOnlyOne) {
            this.configs.selected = [];
          } else {
            this.configs.selected.splice(index2, 1);
          }
        } else {
          if (isOnlyOne) {
            this.configs.selected = [id];
          } else {
            this.configs.selected.push(id);
          }
        }
      }
    },
    render() {
      var _a, _b, _c;
      const vDomTable = vue.createVNode("div", {
        "id": this.xVirTableId,
        "class": "xVirTable-wrapper flex vertical"
      }, [vue.createVNode("div", {
        "ref": "thead",
        "role": "table",
        "class": "xVirTable-header-wrapper",
        "style": "padding-right: 6px;width:100%"
      }, [this.vDomThead]), vue.createVNode(xVirTableBody, {
        "onScroll": this.onBodyScroll,
        "columnOrder": this.columnOrder,
        "columns": (_a = this.configs) == null ? void 0 : _a.columns,
        "rowHeight": this.rowHeight,
        "onSelectedChange": this.handleSelectedChangeTd,
        "selectedConfigs": (_b = this.configs) == null ? void 0 : _b.selectedConfigs,
        "selected": (_c = this.configs) == null ? void 0 : _c.selected
      }, null)]);
      return vDomTable;
    }
  });
  const {
    $t
  } = State_UI;
  const SUCCESS = false;
  const FAIL = true;
  const RegexFn = {
    email: () => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    mobile: () => /^1[34578]\d{9}$/
  };
  const makeFormRules = (options) => {
    options.trigger = options.trigger || [EVENT_TYPE.update];
    options.msg = options.msg || "";
    return options;
  };
  const FormRules = {
    SUCCESS,
    FAIL,
    required(msg, trigger = [EVENT_TYPE.update]) {
      return makeFormRules({
        name: "required",
        msg: msg || $t("\u5FC5\u586B\u9879").label,
        async validator(value) {
          if (value) {
            if (xU.isArray(value)) {
              if (value.length > 0) {
                return SUCCESS;
              } else {
                return FAIL;
              }
            }
            return SUCCESS;
          }
          if (xU.isBoolean(value))
            return SUCCESS;
          if (xU.isNumber(value) && !xU.isNaN(value))
            return SUCCESS;
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
          await xU.sleep(1e3);
          return FAIL;
        },
        trigger: [EVENT_TYPE.update, EVENT_TYPE.input, EVENT_TYPE.change, EVENT_TYPE.blur]
      };
    },
    email() {
      return {
        name: "email",
        msg: () => $t("\u8BF7\u8F93\u5165email").label,
        async validator(value) {
          if (RegexFn.email().test(value)) {
            return SUCCESS;
          }
          return FAIL;
        },
        trigger: [EVENT_TYPE.update, EVENT_TYPE.input, EVENT_TYPE.change, EVENT_TYPE.blur]
      };
    },
    custom({
      name,
      msg,
      validator,
      trigger
    }) {
      return makeFormRules({
        name,
        msg,
        validator,
        trigger
      });
    }
  };
  const KEY = {
    right: 39,
    left: 37,
    esc: 27
  };
  const $win = $__default.default(window);
  const $html = $__default.default("html");
  const $document = $__default.default(document);
  const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
  const DATA_V_UI_MOVE = "data-directive-ui-move";
  const TYPE_IFRAME = "iframe";
  const TYPE_LOADING = "loading";
  const TYPE_TIPS = "tips";
  const LAYUI_LAYER = "layui-layer";
  const LAYUI_LAYER_SHADE = "layui-layer-shade";
  const LAYUI_LAYER_MOVE = "layui-layer-move";
  const LAYUI_LAYER_CONTENT = "layui-layer-content";
  const LAYUI_LAYER_CLOSE = "layui-layer-close";
  const LAYUI_LAYER_IFRAME = "layui-layer-iframe";
  const LAYUI_LAYER_TITLE = "layui-layer-title";
  const DOMS_ANIM = [
    "layer-anim-00",
    "layer-anim-01",
    "layer-anim-02",
    "layer-anim-03",
    "layer-anim-04",
    "layer-anim-05",
    "layer-anim-06"
  ];
  const $MoveMask = $__default.default(
    `<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`
  );
  setTimeout(() => {
    $html.append($MoveMask);
  }, 0);
  const READY = {
    zIndex: 0,
    pointMousedown: [],
    basePath: function() {
      var jsPath = document.currentScript ? document.currentScript.src : function() {
        var js = document.scripts, last = js.length - 1, src;
        for (var i = last; i > 0; i--) {
          if (js[i].readyState === "interactive") {
            src = js[i].src;
            break;
          }
        }
        return src || js[last].src;
      }();
      const GLOBAL = {};
      return GLOBAL.layer_dir || jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }(),
    config: {},
    end: {},
    minIndex: 0,
    minLeft: [],
    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
    type: ["dialog", "page", "iframe", "loading", "tips"],
    getStyle: function(node, name) {
      var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
        name
      );
    },
    reselect() {
      $__default.default.each($__default.default("select"), function(index2, value) {
        var sthis = $__default.default(this);
        if (!sthis.parents("." + LAYUI_LAYER)[0]) {
          sthis.attr("layer") == 1 && $__default.default("." + LAYUI_LAYER).length < 1 && sthis.removeAttr("layer").show();
        }
        sthis = null;
      });
    },
    record($eleLayer) {
      const [windowHeight, windowWidth] = [$win.height(), $win.width()];
      const isLimit = $eleLayer.height() > windowHeight;
      const isLimitWidth = $eleLayer.width() > windowWidth;
      var area = [
        isLimitWidth ? windowWidth - 64 : $eleLayer.width(),
        isLimit ? windowHeight - 64 : $eleLayer.height(),
        isLimit ? 32 : $eleLayer.position().top,
        $eleLayer.position().left + parseFloat($eleLayer.css("margin-left"))
      ];
      $eleLayer.find(".layui-layer-max").addClass("layui-layer-maxmin");
      $eleLayer.attr({
        area
      });
    },
    rescollbar(index2) {
      if ($html.attr("layer-full") == index2) {
        if ($html[0].style.removeProperty) {
          $html[0].style.removeProperty("overflow");
        } else {
          $html[0].style.removeAttribute("overflow");
        }
        $html.removeAttr("layer-full");
      }
    }
  };
  const LayerUtils = {
    setZIndex(zIndex) {
      READY.zIndex = zIndex;
    },
    MSG: 0,
    DIALOG: 1,
    IFRAME: 2,
    LOADING: 3,
    TIPS: 4,
    UP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4,
    v: "3.5.1",
    ie: (() => {
      var agent = navigator.userAgent.toLowerCase();
      if ("ActiveXObject" in window) {
        let version = agent.match(/msie\s(\d+)/);
        if (version) {
          return Number(version[1]);
        } else {
          return 11;
        }
      }
      return 0;
    })(),
    path: READY.basePath,
    config: function(options, fn) {
      options = options || {};
      LayerUtils.cache = READY.config = $__default.default.extend({}, READY.config, options);
      LayerUtils.path = READY.config.path || LayerUtils.path;
      typeof options.extend === "string" && (options.extend = [options.extend]);
      if (!options.extend) {
        return this;
      }
      return this;
    },
    open(options) {
      const layerInstance = new ClassLayer(options);
      const { _layerKey } = layerInstance;
      return _layerKey;
    },
    alert(content, options, yes) {
      var type2 = typeof options === "function";
      if (type2)
        yes = options;
      return LayerUtils.open(
        $__default.default.extend(
          {
            content,
            yes
          },
          type2 ? {} : options
        )
      );
    },
    confirm(content, options, yes, cancel) {
      if (xU.isFunction(options)) {
        cancel = yes;
        yes = options;
      }
      return LayerUtils.open(
        $__default.default.extend(
          {
            content,
            btn: READY.btn,
            yes,
            btn2: cancel
          },
          type ? {} : options
        )
      );
    },
    msg(content, options, end = () => null) {
      var isOptionsIsFunction = xU.isFunction(options), rskin = READY.config.skin;
      var skin = (rskin ? rskin + " " + rskin + "-msg" : "") || "layui-layer-msg";
      var anim = DOMS_ANIM.length - 1;
      if (isOptionsIsFunction)
        end = options;
      return LayerUtils.open(
        $__default.default.extend(
          {
            content,
            time: 3e3,
            shade: false,
            skin,
            title: false,
            closeBtn: false,
            btn: false,
            resize: false,
            end
          },
          isOptionsIsFunction && !READY.config.skin ? {
            skin: skin + " layui-layer-hui",
            anim
          } : function() {
            options = options || {};
            if (options.icon === -1 || options.icon === void 0 && !READY.config.skin) {
              options.skin = skin + " " + (options.skin || "layui-layer-hui");
            }
            return options;
          }()
        )
      );
    },
    load(icon, options) {
      return LayerUtils.open(
        $__default.default.extend(
          {
            type: 3,
            icon: icon || 0,
            resize: false,
            shade: 0.01
          },
          options
        )
      );
    },
    tips(content, followSelector, options) {
      return LayerUtils.open(
        $__default.default.extend(
          {
            type: LayerUtils.TIPS,
            content: [content, followSelector],
            closeBtn: false,
            time: 3e3,
            shade: false,
            resize: false,
            fixed: false,
            maxWidth: 260
          },
          options
        )
      );
    },
    close(layerKey) {
      if (!layerKey) {
        return Promise.reject();
      }
      return new Promise((resolve2, reject2) => {
        try {
          let removeLayerDomFromHtml = function() {
            if (type2 === "dialog" && $eleLayer.attr("data-content-type") === "object") {
              $eleLayer.children(`:not(.${LAYUI_LAYER_IFRAME})`).remove();
            } else {
              if (type2 === TYPE_IFRAME) {
                try {
                  var iframe = $__default.default(`#${LAYUI_LAYER_CONTENT}${layerKey}`)[0];
                  iframe.contentWindow.document.write("");
                  iframe.contentWindow.close();
                  $eleLayer.find(`.${LAYUI_LAYER_IFRAME}`)[0].removeChild(iframe);
                } catch (e) {
                }
              }
            }
            $eleLayer[0].innerHTML = "";
            $eleLayer.remove();
            try {
              READY.end[layerKey] && READY.end[layerKey]();
              delete READY.end[layerKey];
            } catch (e) {
            }
          };
          var $eleLayer = $__default.default(`#${LAYUI_LAYER}${layerKey}`);
          var type2 = $eleLayer.attr("type");
          var closeAnim = "layer-anim-close";
          if ($eleLayer.length === 0) {
            return;
          }
          if ($eleLayer.data("isOutAnim")) {
            $eleLayer.addClass("layer-anim " + closeAnim);
          }
          $__default.default(`#layui-layer-moves, #${LAYUI_LAYER_SHADE}${layerKey}`).remove();
          LayerUtils.ie == 6 && READY.reselect();
          READY.rescollbar(layerKey);
          if ($eleLayer.attr("minLeft")) {
            READY.minIndex--;
            READY.minLeft.push($eleLayer.attr("minLeft"));
          }
          setTimeout(function() {
            removeLayerDomFromHtml();
            resolve2(true);
          }, 200);
        } catch (error) {
          console.error(error);
          reject2(false);
        }
      });
    },
    getChildFrame(selector, index2) {
      index2 = index2 || $__default.default(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
      return $__default.default("#" + LAYUI_LAYER + index2).find("iframe").contents().find(selector);
    },
    getFrameIndex(name) {
      return $__default.default("#" + name).parents(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
    },
    iframeAuto(index2) {
      if (!index2)
        return;
      var heg = LayerUtils.getChildFrame("html", index2).outerHeight();
      var $eleLayer = $__default.default("#" + LAYUI_LAYER + index2);
      var titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
      var btnHeight = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
      $eleLayer.css({
        height: heg + titHeight + btnHeight
      });
      $eleLayer.find("iframe").css({
        height: heg
      });
    },
    iframeSrc(index2, url) {
      $__default.default("#" + LAYUI_LAYER + index2).find("iframe").attr("src", url);
    },
    style(index2, options, limit) {
      var $eleLayer = $__default.default("#" + LAYUI_LAYER + index2);
      const $contentEle = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`);
      const type2 = $eleLayer.attr("type");
      const titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
      let contentHeight = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
      const [windowHeight, windowWidth] = [$win.height(), $win.width()];
      $eleLayer.attr("minLeft");
      if (type2 === TYPE_LOADING || type2 === TYPE_TIPS) {
        return;
      }
      if (!limit) {
        if (parseFloat(options.width) <= 260) {
          options.width = 260;
        }
        if (parseFloat(options.height) - titHeight - contentHeight <= 64) {
          options.height = 64 + titHeight + contentHeight;
        }
      }
      if (options.height > windowHeight) {
        options.height = parseFloat(windowHeight);
      }
      $eleLayer.css(options);
      contentHeight = $contentEle.outerHeight();
      if (type2 === TYPE_IFRAME) {
        $eleLayer.find("iframe").addClass("flex1");
      } else {
        $contentEle.css({
          height: parseFloat(options.height) - titHeight - contentHeight - parseFloat($contentEle.css("padding-top")) - parseFloat($contentEle.css("padding-bottom"))
        });
      }
    },
    min(index2, options) {
      options = options || {};
      var $eleLayer = $__default.default("#" + LAYUI_LAYER + index2), shadeo = $__default.default("#" + LAYUI_LAYER_SHADE + index2), titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0, left = $eleLayer.attr("minLeft") || 181 * READY.minIndex + "px", position = $eleLayer.css("position"), settings = {
        width: 180,
        height: titHeight,
        position: "fixed",
        overflow: "hidden"
      };
      READY.record($eleLayer);
      if (READY.minLeft[0]) {
        left = READY.minLeft[0];
        READY.minLeft.shift();
      }
      if (options.minStack) {
        settings.left = left;
        settings.top = $win.height() - titHeight;
        $eleLayer.attr("minLeft") || READY.minIndex++;
        $eleLayer.attr("minLeft", left);
      }
      $eleLayer.attr("position", position);
      LayerUtils.style(index2, settings, true);
      $eleLayer.find(".layui-layer-min").hide();
      $eleLayer.attr("type") === "page" && $eleLayer.find(LAYUI_LAYER_CONTENT).hide();
      READY.rescollbar(index2);
      shadeo.hide();
    },
    restore(index2) {
      var $eleLayer = $__default.default("#" + LAYUI_LAYER + index2), shadeo = $__default.default("#" + LAYUI_LAYER_SHADE + index2), area = $eleLayer.attr("area").split(",");
      $eleLayer.attr("type");
      LayerUtils.style(
        index2,
        {
          width: parseFloat(area[0]),
          height: parseFloat(area[1]),
          top: parseFloat(area[2]),
          left: parseFloat(area[3]),
          position: $eleLayer.attr("position"),
          overflow: "visible"
        },
        true
      );
      $eleLayer.find(".layui-layer-max").removeClass("layui-layer-maxmin");
      $eleLayer.find(".layui-layer-min").show();
      $eleLayer.attr("type") === "page" && $eleLayer.find(LAYUI_LAYER_CONTENT).show();
      READY.rescollbar(index2);
      shadeo.show();
    },
    full(index2) {
      var $eleLayer = $__default.default("#" + LAYUI_LAYER + index2), timer;
      READY.record($eleLayer);
      if (!$html.attr("layer-full")) {
        $html.css("overflow", "hidden").attr("layer-full", index2);
      }
      clearTimeout(timer);
      timer = setTimeout(function() {
        var isfix = $eleLayer.css("position") === "fixed";
        LayerUtils.style(
          index2,
          {
            top: isfix ? 0 : $win.scrollTop(),
            left: isfix ? 0 : $win.scrollLeft(),
            width: $win.width(),
            height: $win.height()
          },
          true
        );
        $eleLayer.find(".layui-layer-min").hide();
      }, 100);
    },
    title(name, layerKey) {
      $__default.default(`#${LAYUI_LAYER}${layerKey}`).find(`.${LAYUI_LAYER_TITLE}`).html(name);
    },
    async closeAll(type2) {
      const needClose = [];
      $__default.default(`.${LAYUI_LAYER}`).each(function() {
        const $ele = $__default.default(this);
        if (type2) {
          if ($ele.attr("type") === type2) {
            needClose.push($ele.attr("data-layer-key"));
          }
        } else {
          needClose.push($ele.attr("data-layer-key"));
        }
      });
      return await Promise.all(needClose.map(LayerUtils.close));
    },
    setLayerTop($current) {
      const type2 = $current.attr("type");
      if ($current.hasClass("set-layer-top")) {
        return;
      } else {
        const selector = `.set-layer-top[type=${type2}]`;
        $__default.default(selector).removeClass("set-layer-top");
        $current.addClass("set-layer-top").appendTo($html);
      }
    }
  };
  class ClassLayer {
    constructor(custumSettings) {
      __publicField(this, "_layerKey", 0);
      __publicField(this, "_IDLayer", LAYUI_LAYER);
      __publicField(this, "_IDShade", LAYUI_LAYER_SHADE);
      __publicField(this, "_IDContent", LAYUI_LAYER_CONTENT);
      __publicField(this, "zIndex", 0);
      __publicField(this, "typeName", "");
      __publicField(this, "ismax", false);
      __publicField(this, "isNeedTitle", false);
      __publicField(this, "isContentTypeObject", false);
      __publicField(this, "$eleLayer", null);
      __publicField(this, "$eleShade", null);
      __publicField(this, "config", {
        type: 0,
        title: "\u4FE1\u606F",
        content: "",
        skin: "",
        area: "auto",
        offset: "auto",
        icon: -1,
        btn: "\u786E\u8BA4",
        btnAlign: "r",
        closeBtn: "1",
        shade: "0.3",
        shadeClose: false,
        during: 0,
        id: "",
        anim: 0,
        isOutAnim: true,
        maxmin: false,
        fixed: true,
        resize: true,
        onResizing: false,
        scrollbar: true,
        maxWidth: 360,
        maxHeight: 0,
        zIndex: 1,
        move: ".layui-layer-title",
        moveOut: false,
        onMoveEnd: false,
        tips: 2,
        tipsMore: false,
        success: false,
        yes: false,
        onClickClose: false,
        end: false,
        full: false,
        minStack: true
      });
      this.initConfig(custumSettings).insertLayer().addLayerListener().handleAnimation();
    }
    get cptDomShade() {
      const { config, _IDShade } = this;
      if (!config.shade) {
        return "";
      }
      return `<div class="${LAYUI_LAYER_SHADE}" id="${_IDShade}" style="z-index:${this.zIndex - 1};"></div>`;
    }
    get cptDomTitle() {
      const { config, _IDLayer } = this;
      if (this.isContentTypeObject && !this.isNeedTitle) {
        return "";
      }
      var isTitleObject = typeof config.title === "object";
      if (!isTitleObject) {
        config.title = [String(config.title), ""];
      }
      const [title, styleString] = config.title || ["", ""];
      return `<div class="${LAYUI_LAYER_TITLE}" style="${styleString}" data-layer-id="${_IDLayer}"> ${title} </div >`;
    }
    get cptDomIcon() {
      if (this.config.type == LayerUtils.MSG && this.config.icon !== -1) {
        return `<i class="layui-layer-ico layui-layer-ico${this.config.icon}></i>`;
      }
      return "";
    }
    get cptDomContent() {
      if (this.config.type == LayerUtils.DIALOG && this.isContentTypeObject) {
        return "";
      }
      return this.config.content || "";
    }
    get cptDomSetDialogOperations() {
      const { config, ismax, _IDLayer } = this;
      return '<span class="layui-layer-setwin">' + function() {
        var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
        if (config.closeBtn) {
          closebtn += `<a data-layer-id="${_IDLayer}" class="layui-layer-ico ${LAYUI_LAYER_CLOSE} ` + LAYUI_LAYER_CLOSE + (config.title ? config.closeBtn : config.type == LayerUtils.TIPS ? "1" : "2") + '" href="javascript:;"></a>';
        }
        return closebtn;
      }() + "</span>";
    }
    get cptDomFooterBtns() {
      const { config } = this;
      if (config.btn) {
        if (typeof config.btn === "string") {
          config.btn = [config.btn, ""];
        }
        if (xU.every(config.btn, (i) => !i)) {
          return "";
        }
        const domButtons = xU.reduce(
          config.btn,
          (domButtonString, label) => {
            if (label) {
              domButtonString += `<a class="${LAYUI_LAYER_CONTENT}">${label}</a>`;
            }
            return domButtonString;
          },
          ""
        );
        return `<div class="${LAYUI_LAYER_CONTENT} layui-layer-btn-${config.btnAlign || ""}">${domButtons}</div>`;
      }
      return "";
    }
    get cptDomResizeBar() {
      return this.config.resize ? '<span class="layui-layer-resize"></span>' : "";
    }
    get cptDomContainer() {
      const {
        config,
        typeName,
        isContentTypeObject,
        zIndex,
        _layerKey,
        _IDLayer,
        _IDContent
      } = this;
      const fnValid = (i) => !!i;
      const layerWrapperClassname = [
        "flex vertical elevation-2",
        `layui-layer-${typeName}`,
        LAYUI_LAYER,
        config.skin,
        (() => {
          if ([LayerUtils.IFRAME, LayerUtils.MSG].includes(config.type) && !config.shade) {
            return "layui-layer-border";
          }
          return "";
        })()
      ].filter(fnValid).join(" ");
      const classContent = [
        LAYUI_LAYER_CONTENT,
        config.contentClass,
        config.type == LayerUtils.MSG && config.icon !== -1 ? "layui-layer-padding" : "",
        config.type == LayerUtils.LOADING ? `layui-layer-loading${config.icon}` : ""
      ].filter(fnValid).join(" ");
      const [width, height] = config.area || [];
      return `
<div id="${_IDLayer}" layer-wrapper="${_IDLayer}" type="${typeName}"
		class="${layerWrapperClassname}" 
		data-z-index="${zIndex}"
		data-layer-key="${_layerKey}"
		data-during-time="${config.during}"
		data-content-type="${isContentTypeObject ? "object" : "string"}"
		style="position:fixed;
			z-index:${zIndex};
			width:${width}; 
			height:${height};"
		>
			${this.cptDomTitle}
			<div class="${classContent}" id="${_IDContent}">
				${this.cptDomIcon}
				${this.cptDomContent}
			</div>
			${this.cptDomSetDialogOperations}
			${this.cptDomFooterBtns}
			${this.cptDomResizeBar}
</div>`;
    }
    initConfig(custumSettings) {
      const layerInstance = this;
      layerInstance.config = Object.assign(layerInstance.config, custumSettings);
      layerInstance.config.icon = custumSettings.type === LayerUtils.LOADING ? 0 : -1;
      layerInstance.config.maxWidth = $win.width() - 15 * 2;
      layerInstance.config.custumSettings = custumSettings;
      const { config } = layerInstance;
      layerInstance._layerKey = xU.genId("");
      layerInstance._IDLayer = `${LAYUI_LAYER}${layerInstance._layerKey}`;
      layerInstance._IDShade = `${LAYUI_LAYER_SHADE}${layerInstance._layerKey}`;
      layerInstance._IDContent = `${LAYUI_LAYER_CONTENT}${layerInstance._layerKey}`;
      layerInstance.zIndex = READY.zIndex + layerInstance.config.zIndex;
      layerInstance.typeName = READY.type[config.type || 0];
      layerInstance.isNeedTitle = [LayerUtils.IFRAME, LayerUtils.DIALOG].includes(
        Number(config.type)
      );
      layerInstance.ismax = Boolean(config.maxmin && layerInstance.isNeedTitle);
      layerInstance.isContentTypeObject = typeof config.content === "object";
      layerInstance.config.onClickClose = async (params) => {
        const isFalse = (val) => xU.isBoolean(val) && !val;
        if (custumSettings.onClickClose) {
          if (isFalse(await custumSettings.onClickClose(params))) {
            return false;
          }
        } else if (custumSettings.onBeforeClose) {
          if (isFalse(await custumSettings.onBeforeClose(params))) {
            return false;
          }
        }
        return true;
      };
      const { isContentTypeObject } = layerInstance;
      if (typeof config.area === "string") {
        config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
      }
      if (config.shift) {
        config.anim = config.shift;
      }
      if (LayerUtils.ie == 6) {
        config.fixed = false;
      }
      const processContentStrategy = {
        [LayerUtils.MSG]() {
          config.btn = "btn" in config ? config.btn : READY.btn[0];
          LayerUtils.closeAll("dialog");
        },
        [LayerUtils.IFRAME]() {
          let scrolling = "auto";
          let src = config.content;
          if (isContentTypeObject) {
            scrolling = config.content[1] || "auto";
            src = config.content[0] || "";
          }
          config.btn = [];
          config.content = `
<iframe class="layui-layer-load flex flex1" 
		scrolling="${scrolling}" 
		src="${src}"
		allowtransparency="true"
		onload="this.className=''" 
		style="height:100%;" 
		frameborder="0">
</iframe>`;
        },
        [LayerUtils.LOADING]() {
          delete config.title;
          delete config.closeBtn;
          config.icon === -1 && config.icon === 0;
          LayerUtils.closeAll("loading");
        },
        [LayerUtils.TIPS]() {
          var _a;
          if (!isContentTypeObject) {
            config.content = [config.content, "body"];
          }
          config.follow = config.content[1];
          const arrow = '<i class="layui-layer-TipsG"></i>';
          config.content = `<div style="max-width:${((_a = config == null ? void 0 : config.custumSettings) == null ? void 0 : _a.maxWidth) || "300px"};overflow:auto;">${config.content[0]}<div>${arrow}`;
          delete config.title;
          config.btn = [];
          config.tips = typeof config.tips === "object" ? config.tips : [config.tips, true];
          config.tipsMore || LayerUtils.closeAll("tips");
        }
      };
      const processContentFn = processContentStrategy[config.type];
      processContentFn && processContentFn();
      return layerInstance;
    }
    async setLayerPosition() {
      await xU.sleep(34);
      const layerInstance = this;
      const { config, _layerKey } = layerInstance;
      layerInstance.offset();
      if (config.type === LayerUtils.TIPS) {
        layerInstance.setTips();
      }
      layerInstance.$eleLayer.css("visibility", "visible");
      if (config.fullscreen) {
        setTimeout(() => {
          LayerUtils.full(_layerKey);
        }, 500);
      }
      if (config.fixed) {
        $win.on("resize", function() {
          layerInstance.offset();
          if (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) {
            layerInstance.setPosition();
          }
          if (config.type == LayerUtils.tips) {
            layerInstance.setTips();
          }
        });
      }
      if (typeof config.during === "number" && config.during > 0) {
        setTimeout(function() {
          LayerUtils.close(layerInstance._layerKey);
        }, config.during);
      }
      LayerUtils.setLayerTop(layerInstance.$eleLayer);
      return layerInstance;
    }
    handleAnimation() {
      const layerInstance = this;
      const { config } = layerInstance;
      if (DOMS_ANIM[config.anim]) {
        var animClass = "layer-anim " + DOMS_ANIM[config.anim];
        layerInstance.$eleLayer.addClass(animClass).one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function() {
            $__default.default(this).removeClass(animClass);
          }
        );
      }
      if (config.isOutAnim) {
        layerInstance.$eleLayer.data("isOutAnim", true);
      }
      return layerInstance;
    }
    insertLayer() {
      const layerInstance = this;
      const { config, _layerKey, _IDShade } = layerInstance;
      layerInstance.$eleLayer = $__default.default(layerInstance.cptDomContainer);
      if (xU.isObject(config.content) && (xU.isString(config.content) || xU.isString(config.content.jquery))) {
        const $content = $__default.default(config.content);
        layerInstance.$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).append($content);
      }
      layerInstance.$eleLayer.css({
        visibility: "hidden",
        top: "100%",
        left: "100%"
      });
      $html.append(layerInstance.$eleLayer);
      if (layerInstance.cptDomShade) {
        $html.append(layerInstance.cptDomShade);
        layerInstance.$eleShade = $__default.default(`#${_IDShade}`);
        layerInstance.$eleShade.css({
          "background-color": config.shade[1] || "#000",
          opacity: config.shade[0] || config.shade
        });
      }
      if (!config.scrollbar) {
        $html.css("overflow", "hidden").attr("layer-full", _layerKey);
      }
      layerInstance.setLayerPosition();
      return layerInstance;
    }
    offset() {
      var layerInstance = this, config = layerInstance.config, $eleLayer = layerInstance.$eleLayer;
      var area = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
      var whetherOffsetIsObject = typeof config.offset === "object";
      layerInstance.offsetTop = ($win.height() - area[1]) / 2;
      layerInstance.offsetLeft = ($win.width() - area[0]) / 2;
      if (whetherOffsetIsObject) {
        const [top, left] = config.offset;
        layerInstance.offsetTop = top;
        layerInstance.offsetLeft = left || layerInstance.offsetLeft;
      } else if (config.offset !== "auto") {
        if (config.offset === "t") {
          layerInstance.offsetTop = 0;
        } else if (config.offset === "r") {
          layerInstance.offsetLeft = $win.width() - area[0];
        } else if (config.offset === "b") {
          layerInstance.offsetTop = $win.height() - area[1];
        } else if (config.offset === "l") {
          layerInstance.offsetLeft = 0;
        } else if (config.offset === "lt") {
          layerInstance.offsetTop = 0;
          layerInstance.offsetLeft = 0;
        } else if (config.offset === "lb") {
          layerInstance.offsetTop = $win.height() - area[1];
          layerInstance.offsetLeft = 0;
        } else if (config.offset === "rt") {
          layerInstance.offsetTop = 0;
          layerInstance.offsetLeft = $win.width() - area[0];
        } else if (config.offset === "rb") {
          layerInstance.offsetTop = $win.height() - area[1];
          layerInstance.offsetLeft = $win.width() - area[0];
        } else {
          layerInstance.offsetTop = config.offset;
        }
      }
      if (!config.fixed) {
        layerInstance.offsetTop = /%$/.test(layerInstance.offsetTop) ? $win.height() * parseFloat(layerInstance.offsetTop) / 100 : parseFloat(layerInstance.offsetTop);
        layerInstance.offsetLeft = /%$/.test(layerInstance.offsetLeft) ? $win.width() * parseFloat(layerInstance.offsetLeft) / 100 : parseFloat(layerInstance.offsetLeft);
        layerInstance.offsetTop += $win.scrollTop();
        layerInstance.offsetLeft += $win.scrollLeft();
      }
      if ($eleLayer.attr("minLeft")) {
        layerInstance.offsetTop = $win.height() - ($eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0);
        layerInstance.offsetLeft = $eleLayer.css("left");
      }
      $eleLayer.css({
        top: layerInstance.offsetTop,
        left: layerInstance.offsetLeft
      });
      return layerInstance;
    }
    async setTips() {
      const layerInstance = this;
      const { config, $eleLayer } = layerInstance;
      const [tipsDomWidth, tipsdomHeight] = [
        $eleLayer.outerWidth(),
        $eleLayer.outerHeight()
      ];
      let $eleFollow = $__default.default(config.follow);
      if ($eleFollow.length == 0) {
        $eleFollow = $html;
      }
      var followInfo = {
        width: $eleFollow.outerWidth(),
        height: $eleFollow.outerHeight(),
        top: $eleFollow.offset().top,
        left: $eleFollow.offset().left,
        tipTop: 0,
        tipLeft: 0
      };
      if (config.openAtPoint) {
        const { top, left } = config.openAtPoint;
        followInfo.top = top;
        followInfo.left = left;
      }
      var $tipsG = $eleLayer.find(".layui-layer-TipsG");
      const [direction, customColor] = config.tips || ["1", ""];
      function makeLeftAuto() {
        if (followInfo.left + tipsDomWidth - $win.width() > 0) {
          followInfo.tipLeft = followInfo.left + followInfo.width - tipsDomWidth;
          $tipsG.css({ right: 12, left: "auto" });
        } else {
          followInfo.tipLeft = followInfo.left;
        }
      }
      const direction_strategy = {
        [LayerUtils.UP]() {
          makeLeftAuto();
          followInfo.tipTop = followInfo.top - tipsdomHeight - 10;
          $tipsG.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", customColor);
          followInfo.top - ($win.scrollTop() + tipsdomHeight + 8 * 2) < 0 && direction_strategy[2]();
        },
        [LayerUtils.RIGHT]() {
          followInfo.tipLeft = followInfo.left + followInfo.width + 10;
          followInfo.tipTop = followInfo.top;
          $tipsG.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", customColor);
          $win.width() - (followInfo.left + followInfo.width + tipsDomWidth + 8 * 2) > 0 || direction_strategy[3]();
        },
        [LayerUtils.BOTTOM]() {
          makeLeftAuto();
          followInfo.tipTop = followInfo.top + followInfo.height + 10;
          $tipsG.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", customColor);
          followInfo.top - $win.scrollTop() + followInfo.height + tipsdomHeight + 8 * 2 - $win.height() > 0 && direction_strategy[4]();
        },
        [LayerUtils.LEFT]() {
          followInfo.tipLeft = followInfo.left - tipsDomWidth - 10;
          followInfo.tipTop = followInfo.top;
          $tipsG.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", customColor);
          tipsDomWidth + 8 * 2 - followInfo.left > 0 && direction_strategy[1]();
        }
      };
      direction_strategy[direction] && direction_strategy[direction]();
      $eleLayer.attr(DATA_TIPS_FOLLOW_ID, config.follow.substring(1));
      $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).css({
        "background-color": customColor,
        "padding-right": config.closeBtn ? "30px" : ""
      });
      $eleLayer.css({
        left: followInfo.tipLeft - $win.scrollLeft(),
        top: followInfo.tipTop - $win.scrollTop(),
        "transform-origin": [
          $tipsG.hasClass("layui-layer-TipsT") ? "top" : "bottem",
          $tipsG.hasClass("layui-layer-TipsL") ? "left" : "right"
        ].join(" ")
      });
      if (!customColor) {
        $tipsG.remove();
      }
    }
    onMoveOrResize() {
      var layerInstance = this;
      const { config, $eleLayer } = layerInstance;
      const $eleMove = $eleLayer.find(config.move);
      const $eleResize = $eleLayer.find(".layui-layer-resize");
      $eleMove.css("cursor", "move");
      $eleMove.on("mousedown", function(e) {
        LayerUtils.setLayerTop($eleLayer);
        e.preventDefault();
        if (config.move) {
          READY.moveOrResizeInstance = layerInstance;
          READY.moveOrResizeType = "move";
          READY.pointMousedown = [
            e.clientX - parseFloat($eleLayer.css("left")),
            e.clientY - parseFloat($eleLayer.css("top"))
          ];
          $MoveMask.css("cursor", "move").show();
        }
      });
      $eleResize.on("mousedown", function(e) {
        LayerUtils.setLayerTop($eleLayer);
        e.preventDefault();
        READY.moveOrResizeInstance = layerInstance;
        READY.moveOrResizeType = "resize";
        READY.pointMousedown = [e.clientX, e.clientY];
        READY.moveOrResizeWH = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
        $MoveMask.css("cursor", "se-resize").show();
      });
      return layerInstance;
    }
    addLayerListener() {
      const layerInstance = this;
      const { $eleLayer, config } = layerInstance;
      if (config.success) {
        const args = [$eleLayer, layerInstance._layerKey, layerInstance];
        if (config.type == LayerUtils.IFRAME) {
          $eleLayer.find("iframe").on("load", function() {
            config.success.apply(config, args);
          });
        } else {
          config.success.apply(config, args);
        }
      }
      $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).children("a").on("click", function() {
        var index2 = $__default.default(this).index();
        if (index2 === 0) {
          if (config.yes) {
            config.yes(layerInstance._layerKey, $eleLayer);
          } else if (config["btn1"]) {
            config["btn1"](layerInstance._layerKey, $eleLayer);
          } else {
            LayerUtils.close(layerInstance._layerKey);
          }
        } else {
          var close = config["btn" + (index2 + 1)] && config["btn" + (index2 + 1)](layerInstance._layerKey, $eleLayer);
          close === false || LayerUtils.close(layerInstance._layerKey);
        }
      });
      $eleLayer.find(`.${LAYUI_LAYER_CLOSE}`).on("click", async function handleClickCloseBtn() {
        let isClosed = false;
        const isNeedClose = await config.onClickClose({
          _layerKey: layerInstance._layerKey,
          $eleLayer,
          dialogOptions: ""
        });
        if (isNeedClose) {
          if (!isClosed) {
            isClosed = await LayerUtils.close(layerInstance._layerKey);
          }
          if (!isClosed) {
            await LayerUtils.close($__default.default(this).attr("data-layer-id"));
          }
        }
      });
      if (config.shadeClose) {
        layerInstance.$eleShade.on("click", function() {
          LayerUtils.close(layerInstance._layerKey);
        });
      }
      $eleLayer.find(".layui-layer-min").on("click", function() {
        var min = config.min && config.min($eleLayer, layerInstance._layerKey);
        min === false || LayerUtils.min(layerInstance._layerKey, config);
      });
      $eleLayer.find(".layui-layer-max").on("click", function() {
        if ($__default.default(this).hasClass("layui-layer-maxmin")) {
          LayerUtils.restore(layerInstance._layerKey);
          config.restore && config.restore($eleLayer, layerInstance._layerKey);
        } else {
          LayerUtils.full(layerInstance._layerKey, config);
          setTimeout(function() {
            config.full && config.full($eleLayer, layerInstance._layerKey);
          }, 100);
        }
      });
      if (config.end) {
        READY.end[layerInstance._layerKey] = config.end;
      }
      if (![LayerUtils.TIPS, LayerUtils.MSG, LayerUtils.LOADING].includes(
        config.type
      )) {
        layerInstance.onMoveOrResize();
      }
      return layerInstance;
    }
  }
  LayerUtils.cache || {};
  $document.on("click.setLayerTop", "[layer-wrapper]", (event2) => {
    const { currentTarget } = event2;
    const $currentTarget = $__default.default(currentTarget);
    LayerUtils.setLayerTop($currentTarget);
  }).on(
    "mousemove",
    `.${LAYUI_LAYER_MOVE}`,
    function(e) {
      const { moveOrResizeInstance, moveOrResizeType, onMoving } = READY;
      if (moveOrResizeInstance instanceof ClassLayer) {
        const { $eleLayer, config } = moveOrResizeInstance;
        if (moveOrResizeType === "move") {
          e.preventDefault();
          let X = e.clientX - READY.pointMousedown[0];
          let Y = e.clientY - READY.pointMousedown[1];
          const fixed = $eleLayer.css("position") === "fixed";
          READY.stX = fixed ? 0 : $win.scrollLeft();
          READY.stY = fixed ? 0 : $win.scrollTop();
          if (!config.moveOut) {
            let setRig = $win.width() - $eleLayer.outerWidth() + READY.stX;
            let setBot = $win.height() - $eleLayer.outerHeight() + READY.stY;
            if (X < READY.stX) {
              X = READY.stX;
            }
            if (X > setRig) {
              X = setRig;
            }
            if (Y < READY.stY) {
              Y = READY.stY;
            }
            if (Y > setBot) {
              Y = setBot;
            }
          }
          $eleLayer.css({ left: X, top: Y });
        }
        if (config.resize) {
          if (READY.moveOrResizeType === "resize") {
            e.preventDefault();
            const X = e.clientX - READY.pointMousedown[0];
            const Y = e.clientY - READY.pointMousedown[1];
            $eleLayer.css({
              width: READY.moveOrResizeWH[0] + X,
              height: READY.moveOrResizeWH[1] + Y
            });
            config.onResizing && config.onResizing($eleLayer);
          }
        }
      } else if (typeof onMoving == "function") {
        event && onMoving(event);
      }
    }
  ).on("mouseup", function(e) {
    if (READY.moveOrResizeInstance instanceof ClassLayer) {
      const { config } = READY.moveOrResizeInstance;
      if (config.onMoveEnd) {
        config.onMoveEnd(READY.moveOrResizeInstance);
      }
      READY.moveOrResizeInstance = false;
    }
    $MoveMask.hide();
  });
  const EcsPressHandler = xU.debounce(async function(event2, dialogOptions) {
    const $antModal = $__default.default(".x-modal-root");
    if ($antModal.length > 0) {
      return;
    }
    if (event2.keyCode === KEY.esc) {
      await dialogOptions.closeDialog();
    }
  }, 100);
  const xDialogFooter = vue.defineComponent({
    props: ["configs"],
    computed: {
      onCancel() {
        return this.configs.onCancel;
      },
      onOk() {
        return this.configs.onOk;
      },
      vDomOk() {
        var _a;
        if ((_a = this.configs) == null ? void 0 : _a.hideOk) {
          return null;
        }
        const configs = {
          text: xU.isInput(this.configs.textOk) ? this.configs.textOk : State_UI.$t("\u786E\u5B9A").label,
          disabled: xU.isInput(this.configs.disabledOk) ? this.configs.disabledOk : false,
          onClick: this.onOk || xU.doNothing
        };
        return vue.createVNode(vue.resolveComponent("xButton"), {
          "type": "primary",
          "class": "ml10",
          "configs": configs
        }, null);
      },
      vDomCancel() {
        var _a;
        if ((_a = this.configs) == null ? void 0 : _a.hideCancel) {
          return null;
        }
        const configs = {
          text: xU.isInput(this.configs.textCancel) ? this.configs.textCancel : State_UI.$t("\u53D6\u6D88").label,
          disabled: xU.isInput(this.configs.disabledCancel) ? this.configs.disabledCancel : false,
          onClick: this.onCancel || xU.doNothing
        };
        return vue.createVNode(vue.resolveComponent("xButton"), {
          "class": "ml10",
          "configs": configs
        }, null);
      },
      vDomContent() {
        if (this.$slots.default) {
          try {
            const vDom = this.$slots.default();
            vDom[0].children.pop();
            return vDom;
          } catch (error) {
            return this.$slots.default();
          }
        } else {
          return vue.createVNode(vue.Fragment, null, [this.vDomCancel, this.vDomOk]);
        }
      }
    },
    render() {
      return vue.createVNode("div", {
        "class": "flex middle end padding20"
      }, [this.vDomContent]);
    }
  });
  const installUIDialogComponent = (UI2, {
    appPlugins,
    dependState
  }, app) => {
    app.component("xDialogFooter", xDialogFooter);
    UI2.dialog.component = async (dialogOptions) => new Promise((resolve2) => {
      const {
        component: BussinessComponent,
        title,
        area
      } = dialogOptions;
      const id = xU.genId("xDialog");
      let $container = $__default.default("<div/>", {
        id
      });
      const _dialogId = `#${id}`;
      if (dialogOptions.yes) {
        dialogOptions._yes = dialogOptions.yes;
        delete dialogOptions.yes;
      }
      dialogOptions.closeDialog = async () => {
        let isCloseDialog = true;
        if (dialogOptions.onBeforeClose) {
          const res = await dialogOptions.onBeforeClose({
            dialogOptions,
            _layerKey: "",
            $eleLayer: ""
          });
          if (xU.isBoolean(res) && !res) {
            isCloseDialog = false;
          }
        }
        if (isCloseDialog) {
          LayerUtils.close(handleEcsPress._layerKey);
        }
      };
      let dialogVueApp = null;
      let handleEcsPress = {
        _layerKey: "",
        handler: (event2) => EcsPressHandler(event2, dialogOptions),
        on(_layerKey) {
          handleEcsPress._layerKey = _layerKey;
          if (!dialogOptions.isEcsCloseDialog) {
            return;
          }
          $__default.default(document).on(`keyup.${_dialogId}`, handleEcsPress.handler);
        },
        off() {
          $__default.default(document).off(`keyup.${_dialogId}`, handleEcsPress.handler);
          handleEcsPress = null;
        }
      };
      const layerOptions = xU.merge(dialogOptions, {
        contentClass: "flex1",
        offset: ["160px", null],
        btn: []
      }, dialogOptions, {
        type: LayerUtils.DIALOG,
        title: [title || ""],
        area: area || [],
        content: $container,
        offset: ["160px", null],
        btn: [],
        success($eleLayer, _layerKey, layerInstance) {
          handleEcsPress.on(_layerKey);
          dialogOptions._layerInstance = layerInstance;
          dialogOptions._dialog$ele = $eleLayer;
          dialogOptions._layerKey = _layerKey;
          try {
            dialogVueApp = vue.createApp(vue.defineComponent({
              components: {
                BussinessComponent
              },
              created() {
                this.dialogOptions._contentInstance = this;
                if (this.dialogOptions.keepTop) {
                  setTimeout(() => {
                    $__default.default(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
                  }, 6);
                }
                resolve2(this.dialogOptions);
              },
              data() {
                return {
                  dialogOptions
                };
              },
              render() {
                return vue.createVNode("div", {
                  "class": "ventose-dialog-content",
                  "data-el-id": _dialogId
                }, [vue.createVNode(BussinessComponent, {
                  "propDialogOptions": this.dialogOptions
                }, null)]);
              }
            }));
            dialogVueApp.use(appPlugins, {
              dependState
            });
            dialogVueApp.mount(_dialogId);
          } catch (e) {
            console.error(e);
          }
          dialogOptions.onAfterOpenDialoag && dialogOptions.onAfterOpenDialoag(dialogVueApp);
        },
        cancel() {
          dialogOptions.closeDialog();
          return false;
        },
        end() {
          handleEcsPress.off();
          $container.remove();
          $container = null;
          if (dialogVueApp) {
            dialogVueApp.unmount();
            dialogVueApp = null;
          }
          dialogOptions.payload = null;
          dialogOptions._contentInstance = null;
          dialogOptions = null;
        }
      }, xU.omit(dialogOptions, ["end", "cancel", "success", "content"]));
      LayerUtils.open(layerOptions);
    });
  };
  const appAddPlugin = {};
  const appDependState = {};
  const timer4CloseTips = {};
  const visibleArea = {};
  const DATA_APP_ID = "data-app-id";
  const DATA_FOLLOW_ID = "data-follow-id";
  const TIMEOUT_DELAY = 200;
  const tipsOptionsCollection = {};
  const tipsKeys = {};
  function fnShowTips({
    $ele,
    followId,
    appId,
    event: event2
  }) {
    const options = tipsOptionsCollection[followId] || {
      content: ""
    };
    if (!options.content) {
      if (options.onlyEllipsis) {
        const eleWidth = $ele.width() || 0;
        const text = $ele.text();
        const $div = $__default.default(`<span style="position:fixed;top:0;left:0;opacity: 0;height: 0;letter-spacing: normal;">${text}</span>`);
        $div.appendTo($__default.default("body"));
        const innerWidth = $div.width() || 0;
        $div.remove();
        if (innerWidth > eleWidth) {
          options.content = text;
        }
      } else {
        return;
      }
    }
    let tipsContent = options.content;
    if (!tipsContent) {
      return;
    }
    let app;
    const placement = (() => {
      const placement_strategy = {
        top: 1,
        right: 2,
        bottom: 3,
        left: 4
      };
      return placement_strategy[options.placement || "top"];
    })();
    let layerTipsOptions = {
      tips: [placement, "#fff"],
      during: 1e3 * 60 * 10
    };
    const isOpenAtPoint = $ele.attr("data-open-at-point");
    if (isOpenAtPoint) {
      layerTipsOptions.openAtPoint = {
        left: $ele.clientX,
        top: $ele.clientY
      };
    }
    if (xU.isPlainObject(options.content)) {
      const id = `${followId}_content`;
      tipsContent = `<div id="${id}"></div>`;
      layerTipsOptions.success = function success(indexPanel, layerIndex) {
        app = vue.createApp(options.content);
        app.use(appAddPlugin[appId], {
          dependState: appDependState[appId]
        });
        app.mount(`#${id}`);
        options.afterOpenDialoag && options.afterOpenDialoag(app);
      };
      layerTipsOptions.end = function end() {
        if (app) {
          app.unmount();
          app = null;
        }
      };
    }
    if (options.maxWidth) {
      layerTipsOptions.maxWidth = maxWidth;
    }
    setTimeout(() => {
      if (visibleArea[followId]) {
        tipsKeys[followId] = LayerUtils.tips(tipsContent, `#${followId}`, layerTipsOptions);
      }
    }, options.delay || 32);
  }
  function installPopoverDirective(app, appSettings) {
    const appId = xU.genId("appId");
    appAddPlugin[appId] = appSettings.appPlugins;
    appDependState[appId] = appSettings.dependState;
    app.directive("uiPopover", {
      mounted(el, binding) {
        init();
        updateMounted(el, binding);
        function init() {
          const followId = xU.genId("xPopoverTarget");
          const $ele = $__default.default(el);
          $ele.addClass("x-ui-popover").attr("id", followId).attr(DATA_APP_ID, appId).attr(DATA_FOLLOW_ID, followId);
        }
      },
      beforeUpdate(el, binding) {
        updateMounted(el, binding);
      },
      unmounted(el) {
        const followId = $__default.default(el).attr(DATA_FOLLOW_ID);
        if (typeof tipsKeys[followId] == "string" && tipsKeys[followId]) {
          LayerUtils.close(tipsKeys[followId]);
        }
        delete tipsOptionsCollection[followId];
        delete visibleArea[followId];
      }
    });
    function updateMounted(el, binding) {
      var _a, _b, _c, _d;
      const $ele = $__default.default(el);
      const followId = $ele.attr(DATA_FOLLOW_ID);
      if (binding.value) {
        tipsOptionsCollection[followId] = binding.value;
        if ((_a = binding.value) == null ? void 0 : _a.trigger) {
          $ele.attr("data-trigger", (_b = binding.value) == null ? void 0 : _b.trigger);
          const classStrategy = {
            rightClick: "pointer-right-click"
          };
          const className = classStrategy[(_c = binding.value) == null ? void 0 : _c.trigger] || "pointer";
          if (!$ele.hasClass(className)) {
            $ele.addClass();
          }
        }
        if ((_d = binding.value) == null ? void 0 : _d.openAtPoint) {
          $ele.attr("data-open-at-point", true);
        }
      }
    }
  }
  function inVisibleArea(followId) {
    if (timer4CloseTips[followId]) {
      clearTimeout(timer4CloseTips[followId]);
      delete timer4CloseTips[followId];
    }
    visibleArea[followId] = true;
  }
  function closeTips(followId, options = {}) {
    delete visibleArea[followId];
    timer4CloseTips[followId] = setTimeout(() => {
      const layerIndex = tipsKeys[followId];
      if (layerIndex) {
        LayerUtils.close(layerIndex).then(() => {
          delete tipsKeys[followId];
          delete timer4CloseTips[followId];
        });
      }
    }, TIMEOUT_DELAY);
  }
  function handleClick(event2) {
    event2.preventDefault();
    const $ele = $__default.default(this);
    const followId = $ele.attr(DATA_FOLLOW_ID);
    const appId = $ele.attr(DATA_APP_ID);
    visibleArea[followId] = true;
    if (tipsKeys[followId]) {
      closeTips(followId);
    } else {
      fnShowTips({
        $ele,
        followId,
        appId,
        event: event2
      });
    }
  }
  $__default.default(document).on("click.uiPopver", `[${DATA_FOLLOW_ID}][data-trigger=click]`, handleClick);
  $__default.default(document).on("contextmenu.uiPopver", `[${DATA_FOLLOW_ID}][data-trigger=rightClick]`, handleClick);
  $__default.default(document).on("mouseenter.uiPopver", `[${DATA_FOLLOW_ID}]`, function(event2) {
    const $ele = $__default.default(this);
    const followId = $ele.attr(DATA_FOLLOW_ID);
    if (visibleArea[followId]) {
      return;
    } else {
      const appId = $ele.attr(DATA_APP_ID);
      inVisibleArea(followId);
      if (tipsKeys[followId]) {
        return;
      }
      if ($ele.attr("data-trigger") === "click") {
        return;
      }
      if ($ele.attr("data-trigger") === "rightClick") {
        return;
      }
      fnShowTips({
        $ele,
        followId,
        appId,
        event: event2
      });
    }
  });
  $__default.default(document).on("mouseleave.uiPopver", `[${DATA_FOLLOW_ID}]`, function(event2) {
    const followId = $__default.default(this).attr(DATA_FOLLOW_ID);
    closeTips(followId);
  });
  $__default.default(document).on("mouseenter.uiPopverTips", `[${DATA_TIPS_FOLLOW_ID}]`, function(event2) {
    const followId = $__default.default(this).attr(DATA_TIPS_FOLLOW_ID);
    inVisibleArea(followId);
  });
  $__default.default(document).on("mouseleave.uiPopverTips", `[${DATA_TIPS_FOLLOW_ID}]`, function(event2) {
    const followId = $__default.default(this).attr(DATA_TIPS_FOLLOW_ID);
    closeTips(followId);
  });
  function installLoading(app, options = {}) {
    app.directive("xloading", {
      updated(el, binding) {
        if (binding.value) {
          $__default.default(el).addClass("x-loading");
        } else {
          $__default.default(el).removeClass("x-loading");
        }
      }
    });
  }
  function installMoveDirective(app) {
    app.directive("uiMove", {
      mounted(el, binding) {
        if (binding.value) {
          if (binding.value.onMoving) {
            const $ele = $__default.default(el);
            const id = xU.genId("xResize");
            $ele.attr(DATA_V_UI_MOVE, id);
            $ele.on("mousedown", function(event2) {
              $MoveMask.css("cursor", "move").show();
              const clickInfo = xU.getLeftTopFromAbsolute($ele);
              clickInfo.w = $ele.width();
              clickInfo.h = $ele.height();
              const {
                top,
                left
              } = xU.getLeftTopFromTranslate($ele);
              clickInfo.translateX = left;
              clickInfo.translateY = top;
              READY.onMoving = (movingEvent) => {
                binding.value.onMoving({
                  $ele,
                  clickInfo,
                  clickEvent: event2,
                  movingEvent
                });
              };
            });
          }
        }
      },
      unmounted(el) {
        const $ele = $__default.default(el);
        $ele.attr(DATA_V_UI_MOVE);
      }
    });
  }
  const installDirective = (app, options) => {
    installPopoverDirective(app, options);
    [installLoading, installMoveDirective].forEach((install) => install(app));
  };
  function _isSlot(s) {
    return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
  }
  let xItemNoPropCount = 0;
  function defFormConfigs(configs) {
    const targetConfigs = {};
    configs.forEach((configs2) => {
      configs2 = defItem.item(configs2);
      targetConfigs[configs2.prop] = configs2;
    });
    return targetConfigs;
  }
  function defItem(options) {
    const configs = defItem.item(options);
    return {
      [configs.prop]: configs
    };
  }
  defItem.item = (options) => {
    options.itemType = options.itemType || "Input";
    if (xU.isObject(options.itemType)) {
      options.itemType.__v_isReactive = false;
    }
    const _options = xU.merge({
      prop: `xItem${xItemNoPropCount++}`,
      itemTips: {
        type: "",
        msg: ""
      }
    }, options);
    _options._$updateUI = (newConfigs) => {
      xU.each(newConfigs, (value, prop) => {
        _options[prop] = value;
      });
    };
    return _options;
  };
  defItem.labelWithTips = ({
    label,
    tips,
    icon
  }) => {
    return vue.createVNode("span", {
      "class": "flex middle"
    }, [label, vue.createVNode(vue.resolveComponent("aTooltip"), {
      "title": tips
    }, _isSlot(icon) ? icon : {
      default: () => [icon]
    })]);
  };
  function vModel(configs, prop, options = {
    data: "data",
    dataXItem: "dataXItem"
  }) {
    const {
      data = "data",
      dataXItem = "dataXItem"
    } = options;
    return {
      value: configs[data][prop],
      configs: configs[dataXItem][prop],
      "onUpdate:modelValue"(e) {
        configs[data][prop] = e;
      }
    };
  }
  function antColKey(prop, makeRenderCell) {
    const target = {
      dataIndex: prop,
      prop,
      key: prop
    };
    if (makeRenderCell) {
      target.renderCell = makeRenderCell(prop);
    }
    return target;
  }
  const useModel = (type2) => {
    return ({
      title = "",
      content = ""
    }) => {
      return new Promise((resolve2, reject2) => {
        title = ((isDefault) => {
          if (isDefault) {
            const title_map = {
              success: State_UI.$t("\u6210\u529F").label,
              info: State_UI.$t("\u63D0\u793A").label,
              error: State_UI.$t("\u9519\u8BEF").label,
              warning: State_UI.$t("\u8B66\u544A").label
            };
            return title_map[type2];
          } else {
            return title;
          }
        })(!title);
        debugger;
        ElementPlus.ElMessageBox[type2](content, title, {
          icon: vue.createVNode("link", {
            "rel": "icon",
            "type": "image/svg+xml",
            "href": "/ExclamationCircleOutlined.svg"
          }, null),
          confirmButtonText: State_UI.$t("\u786E\u5B9A").label,
          cancelButtonText: State_UI.$t("\u53D6\u6D88").label,
          class: "test"
        }).then(resolve2).catch(reject2);
      });
    };
  };
  LayerUtils.loading = function(indexDelete) {
    this.loading.count = this.loading.count || 1;
    this.loading.deep = this.loading.deep || /* @__PURE__ */ new Set();
    $__default.default("body").trigger("click");
    if (indexDelete >= 0) {
      if (this.loading.deep.has(indexDelete)) {
        this.loading.deep.delete(indexDelete);
        if (this.loading.deep.size === 0) {
          LayerUtils.close(this.loading.index);
        }
      } else {
        console.error("loading", indexDelete);
      }
    } else {
      let indexAdd = this.loading.count++;
      if (this.loading.deep.size === 0) {
        this.loading.index = LayerUtils.load(1);
      }
      this.loading.deep.add(indexAdd);
      return indexAdd;
    }
  };
  const UI = {
    confirm({
      title,
      content,
      okText,
      cancelText
    }) {
      ElementPlus.ElMessageBox.confirm(content, title, {
        confirmButtonText: okText || State_UI.$t("\u786E\u5B9A").label,
        cancelButtonText: cancelText || State_UI.$t("\u53D6\u6D88").label
      }).then(resolve).catch(reject);
    },
    dialog: {
      component: async (options) => null,
      success: useModel("success"),
      info: useModel("info"),
      error: useModel("error"),
      warning: useModel("warning"),
      confirm: ({
        title,
        content,
        okText,
        cancelText
      }) => {
        return new Promise(async (resolve2, reject2) => {
          ElementPlus.ElMessageBox.confirm(content, title, {
            confirmButtonText: okText || State_UI.$t("\u786E\u5B9A").label,
            cancelButtonText: cancelText || State_UI.$t("\u53D6\u6D88").label
          }).then(resolve2).catch(reject2);
        });
      },
      delete({
        title,
        content
      } = {}) {
        title = title || State_UI.$t("\u5220\u9664").label;
        content = content || State_UI.$t("\u5220\u9664\u786E\u8BA4\u63D0\u793A").label;
        return new Promise((resolve2, reject2) => {
          ElementPlus.ElMessageBox.confirm({
            title,
            icon: vue.createVNode(vue.resolveComponent("ExclamationCircleOutlined"), {
              "style": "color:red"
            }, null),
            content,
            okType: "danger",
            okText: State_UI.$t("\u786E\u5B9A").label,
            cancelText: State_UI.$t("\u53D6\u6D88").label,
            onOk() {
              resolve2("ok");
            },
            onCancel() {
              reject2();
            }
          });
        });
      }
    },
    message: ElementPlus.ElMessage,
    notification: new Proxy(ElementPlus.ElNotification, {
      get(target, p, receiver) {
        const m = target[p];
        return new Proxy(m, {
          apply(target2, thisArg, argArray) {
            if (typeof argArray[0] === "string") {
              argArray[0] = xU.merge({
                message: argArray[0]
              }, argArray[1] || {});
            }
            return target2.apply(thisArg, argArray);
          }
        });
      }
    }),
    layer: LayerUtils
  };
  const get$head = () => {
    let $head = $__default.default("html head");
    if (!xU.is$Selected($head)) {
      $head = $__default.default("<head/>");
      $head.prependTo($__default.default("html"));
    }
    return $head;
  };
  const get$title = () => {
    let $head = get$head();
    let $title = $head.find("title");
    if (!xU.is$Selected($title)) {
      $title = $__default.default("<title/>");
      $title.prependTo($head);
    }
    return $title;
  };
  const get$cssVariables = () => {
    let $head = get$head();
    let $cssVariables = $head.find("#cssVariables");
    if (!xU.is$Selected($cssVariables)) {
      $cssVariables = $__default.default("<style/>", {
        id: "cssVariables"
      });
      $cssVariables.appendTo($head);
    }
    return $cssVariables;
  };
  const setDocumentTitle = (title) => {
    get$title().text(title);
  };
  const setCSSVariables = (colors) => {
    let $cssVariables = get$cssVariables();
    const cssContent = xU.map(colors, (value, prop) => `--${prop}:${value}`).join(";");
    $cssVariables.text(`:root{${cssContent}}`);
  };
  const pickValueFrom = (configs) => {
    return xU.reduce(configs, (target, config, prop) => {
      try {
        target[prop] = JSON.parse(JSON.stringify(config.value));
      } catch (error) {
      }
      return target;
    }, {});
  };
  const setValueTo = (configs, values) => {
    xU.each(values, (target, value, prop) => {
      if (value === void 0) {
        return;
      }
      if (configs[prop]) {
        configs[prop].value = value;
        if (xU.isFunction(configs[prop].onChange)) {
          configs[prop].onChange(value);
        }
      }
    });
  };
  const resetValueOf = (state, initState) => {
    xU.each(initState, (value, prop) => {
      state[prop] = JSON.parse(JSON.stringify(value));
    });
    return state;
  };
  const VNodeCollection = {
    labelTips: (popContent) => (configs, className) => {
      const {
        prop,
        label
      } = configs;
      return vue.createVNode("div", {
        "class": "x-form-item-label"
      }, [vue.createVNode("label", {
        "for": prop,
        "class": className
      }, [label, vue.createVNode(vue.resolveComponent("aPopover"), {
        "trigger": "hover",
        "placement": "top"
      }, {
        content: () => popContent,
        default: () => vue.createVNode(vue.resolveComponent("xIcon"), {
          "icon": "Insidetips",
          "class": "pointer ml4"
        }, null)
      })])]);
    }
  };
  function newReactiveState(stateAndMethods) {
    const __defaultValues = {};
    function isFunctionInState({
      value,
      prop
    }) {
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
    ___default.default.each(stateAndMethods, (value, prop) => {
      if (isFunctionInState({
        value,
        prop
      })) {
        stateAndMethods[prop] = vue.markRaw(value);
        return;
      }
      try {
        __defaultValues[prop] = ___default.default.cloneDeep(value);
      } catch (error) {
        console.error(error);
      }
    });
    const innerVariablesAndMethods = {
      __defaultValues: vue.markRaw(__defaultValues),
      _$resetSelf: vue.markRaw(function() {
        ___default.default.each(stateAndMethods.__defaultValues, (value, prop) => {
          stateAndMethods[prop] = value;
        });
      }),
      _$null: vue.markRaw(function() {
        ___default.default.each(stateAndMethods, (value, prop) => {
          if (isFunctionInState({
            value,
            prop
          })) {
            return;
          }
          if (!Object.keys(innerVariablesAndMethods).includes(prop)) {
            delete stateAndMethods[prop];
          }
        });
      })
    };
    ___default.default.each(innerVariablesAndMethods, (value, prop) => stateAndMethods[prop] = value);
    return vue.reactive(stateAndMethods);
  }
  const DELAY = 60 * 5;
  const CACHE_V_NODE = {};
  const WILL_DELETE_PROPS = {
    idCounts: {},
    add(prop) {
      const count = this.idCounts[prop] || 0;
      this.idCounts[prop] = count + 1;
    },
    remove(prop) {
      const count = this.idCounts[prop] || 0;
      const val = count - 1;
      this.idCounts[prop] = val < 0 ? 0 : val;
    }
  };
  const deleteUnmountedInstance = (prop) => {
    WILL_DELETE_PROPS.add(prop);
    delayDeleteUnmountedInstance();
  };
  const delayDeleteUnmountedInstance = xU.debounce(function() {
    xU.each(WILL_DELETE_PROPS.idCounts, (count, prop) => {
      if (count > 0) {
        delete CACHE_V_NODE[prop];
        delete WILL_DELETE_PROPS.idCounts[prop];
      }
      if (!Object.keys(CACHE_V_NODE).includes(prop)) {
        delete WILL_DELETE_PROPS.idCounts[prop];
      }
    });
  }, 1e3 * DELAY);
  function compileVNode(template, setupReturn, prop) {
    if (xU.isPlainObject(prop) && prop.vNode) {
      return prop.vNode;
    }
    const no_cache = !prop;
    if (xU.isString(no_cache) && CACHE_V_NODE[prop]) {
      WILL_DELETE_PROPS.remove(prop);
      delayDeleteUnmountedInstance();
      return CACHE_V_NODE[prop];
    }
    const vNode = vue.h(vue.defineComponent({
      template,
      mounted() {
        if (no_cache) {
          return;
        }
        WILL_DELETE_PROPS.remove(prop);
        CACHE_V_NODE[prop] = this._.vnode;
      },
      unmounted() {
        if (no_cache) {
          return;
        }
        deleteUnmountedInstance(prop);
      },
      setup() {
        if (xU.isFunction(setupReturn)) {
          return setupReturn();
        } else {
          return setupReturn;
        }
      }
    }));
    if (xU.isPlainObject(prop)) {
      prop.vNode = vNode;
    } else {
      return vNode;
    }
  }
  const xLogObject = vue.defineComponent({
    name: "xLogObject",
    props: ["obj"],
    computed: {
      objString: {
        get() {
          if (xU.isObject(this.obj)) {
            return JSON.stringify(this.obj, null, 2);
          } else {
            return "";
          }
        }
      }
    },
    render() {
      if (!State_UI.isDev || this.$attrs.hide) {
        return null;
      } else {
        return vue.createVNode("pre", {
          "style": "width:500px;height:400px;"
        }, [vue.createVNode("code", null, [vue.createTextVNode(" "), this.objString, vue.createTextVNode(" ")])]);
      }
    }
  });
  const useScopeStyle = () => {
    const scopeStyle = vue.reactive({});
    function styleObject2String(styleObject) {
      return xU.map(xU.merge({
        width: "120px",
        "text-align": "right"
      }, styleObject), (value, prop) => `${prop}: ${value}`).join(";");
    }
    function updateStyle(vm, styleContent) {
      if (!vm.$styleEle) {
        vm.$styleEle = $(vm.ele);
      }
      vm.$styleEle.html(styleContent);
    }
    function setStyle(styleObject) {
      const instance = vue.getCurrentInstance();
      xU.each(styleObject, (value, prop) => {
        scopeStyle[prop] = value;
      });
      updateStyle(
        instance.ctx,
        styleObject2String(scopeStyle)
      );
    }
    return {
      setStyle
    };
  };
  const xInfoCard$1 = "";
  const InfoCardCol = vue.defineComponent({
    props: ["col"],
    computed: {
      isHide() {
        return this.col.isHide || false;
      },
      styleLabel() {
        return {};
      },
      vDomLabel() {
        return this.col.label;
      },
      vDomContent() {
        return this.col.value;
      }
    },
    render() {
      if (this.isHide) {
        return null;
      }
      return vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
        "class": "x-descriptions-item-label",
        "style": this.styleLabel
      }, [this.vDomLabel]), vue.createVNode("div", {
        "class": "x-descriptions-item-content flex1"
      }, [this.vDomContent])]);
    }
  });
  const InfoCardRow = vue.defineComponent({
    props: ["row"],
    computed: {
      colArray() {
        var _a;
        return ((_a = this == null ? void 0 : this.row) == null ? void 0 : _a.colArray) || false;
      },
      vDomCol() {
        if (this.row) {
          return xU.map(this.colArray, (col) => {
            return vue.createVNode(InfoCardCol, {
              "col": col
            }, null);
          });
        }
        return null;
      },
      styleRow() {
        var _a;
        if ((_a = this == null ? void 0 : this.row) == null ? void 0 : _a.style) {
          return this.row.style;
        }
        return "";
      }
    },
    render() {
      return vue.createVNode("div", {
        "class": "InfoCardRow x-descriptions-row flex middle",
        "style": this.styleRow
      }, [this.vDomCol]);
    }
  });
  const xInfoCard = vue.defineComponent({
    props: ["info", "title"],
    methods: {
      updateLableStyle(styleObject) {
        const styleString = xU.map(xU.merge({
          "min-width": "120px",
          "text-align": "right"
        }, styleObject), (value, prop) => `${prop}: ${value}`).join(";");
        const styleContent = `#${this.id} .x-descriptions-item-label {${styleString}}`;
        if (!this.$styleEle) {
          const $form = $__default.default(`#${this.id}`);
          const $style = $__default.default("<style/>", {
            id: `style_${this.id}`
          });
          $form.prepend($style);
          this.$styleEle = $style;
        }
        this.$styleEle.html(styleContent);
      }
    },
    mounted() {
      this.$watch("info.colLabelWidth", (width) => {
        if (width) {
          xU("width", width);
          this.updateLableStyle({
            width
          });
        }
      }, {
        immediate: true,
        deep: true
      });
    },
    computed: {
      id() {
        return `InfoCard_${this._.uid}`;
      },
      colLabelWidth() {
        var _a;
        return ((_a = this == null ? void 0 : this.info) == null ? void 0 : _a.colLabelWidth) || "120px";
      },
      rowArray() {
        var _a;
        return ((_a = this == null ? void 0 : this.info) == null ? void 0 : _a.rowArray) || false;
      },
      vDomTitle() {
        if (!this.title) {
          return null;
        }
        return vue.createVNode("div", {
          "class": "x-descriptions-header"
        }, [vue.createVNode("div", {
          "class": "x-descriptions-title"
        }, [this.title])]);
      },
      vDomDescriptions() {
        if (this.rowArray) {
          return vue.createVNode("div", {
            "class": "x-descriptions-view"
          }, [xU.map(this.rowArray, (row) => {
            return vue.createVNode(InfoCardRow, {
              "row": row
            }, null);
          })]);
        }
        if (this.$slots.default) {
          return this.$slots.default();
        }
        return null;
      }
    },
    render() {
      return vue.createVNode("div", {
        "class": "x-descriptions x-descriptions-middle x-descriptions-bordered x-infomation-card",
        "id": this.id
      }, [this.vDomTitle, this.vDomDescriptions]);
    }
  });
  var toggleSelection = function() {
    var selection = document.getSelection();
    if (!selection.rangeCount) {
      return function() {
      };
    }
    var active = document.activeElement;
    var ranges = [];
    for (var i = 0; i < selection.rangeCount; i++) {
      ranges.push(selection.getRangeAt(i));
    }
    switch (active.tagName.toUpperCase()) {
      case "INPUT":
      case "TEXTAREA":
        active.blur();
        break;
      default:
        active = null;
        break;
    }
    selection.removeAllRanges();
    return function() {
      selection.type === "Caret" && selection.removeAllRanges();
      if (!selection.rangeCount) {
        ranges.forEach(function(range) {
          selection.addRange(range);
        });
      }
      active && active.focus();
    };
  };
  var deselectCurrent = toggleSelection;
  var clipboardToIE11Formatting = {
    "text/plain": "Text",
    "text/html": "Url",
    "default": "Text"
  };
  var defaultMessage = "Copy to clipboard: #{key}, Enter";
  function format(message) {
    var copyKey = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
    return message.replace(/#{\s*key\s*}/g, copyKey);
  }
  function copy(text, options) {
    var debug, message, reselectPrevious, range, selection, mark, success = false;
    if (!options) {
      options = {};
    }
    debug = options.debug || false;
    try {
      reselectPrevious = deselectCurrent();
      range = document.createRange();
      selection = document.getSelection();
      mark = document.createElement("span");
      mark.textContent = text;
      mark.ariaHidden = "true";
      mark.style.all = "unset";
      mark.style.position = "fixed";
      mark.style.top = 0;
      mark.style.clip = "rect(0, 0, 0, 0)";
      mark.style.whiteSpace = "pre";
      mark.style.webkitUserSelect = "text";
      mark.style.MozUserSelect = "text";
      mark.style.msUserSelect = "text";
      mark.style.userSelect = "text";
      mark.addEventListener("copy", function(e) {
        e.stopPropagation();
        if (options.format) {
          e.preventDefault();
          if (typeof e.clipboardData === "undefined") {
            debug && console.warn("unable to use e.clipboardData");
            debug && console.warn("trying IE specific stuff");
            window.clipboardData.clearData();
            var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
            window.clipboardData.setData(format2, text);
          } else {
            e.clipboardData.clearData();
            e.clipboardData.setData(options.format, text);
          }
        }
        if (options.onCopy) {
          e.preventDefault();
          options.onCopy(e.clipboardData);
        }
      });
      document.body.appendChild(mark);
      range.selectNodeContents(mark);
      selection.addRange(range);
      var successful = document.execCommand("copy");
      if (!successful) {
        throw new Error("copy command was unsuccessful");
      }
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using execCommand: ", err);
      debug && console.warn("trying IE specific stuff");
      try {
        window.clipboardData.setData(options.format || "text", text);
        options.onCopy && options.onCopy(window.clipboardData);
        success = true;
      } catch (err2) {
        debug && console.error("unable to copy using clipboardData: ", err2);
        debug && console.error("falling back to prompt");
        message = format("message" in options ? options.message : defaultMessage);
        window.prompt(message, text);
      }
    } finally {
      if (selection) {
        if (typeof selection.removeRange == "function") {
          selection.removeRange(range);
        } else {
          selection.removeAllRanges();
        }
      }
      if (mark) {
        document.body.removeChild(mark);
      }
      reselectPrevious();
    }
    return success;
  }
  var copyToClipboard = copy;
  const xLinkCopy = vue.defineComponent({
    name: "xLinkCopy",
    props: ["to"],
    data() {
      return {};
    },
    setup(props) {
    },
    computed: {
      xDomText() {
        var _a;
        if ((_a = this.$slots) == null ? void 0 : _a.default) {
          return this.$slots.default();
        }
        return "";
      }
    },
    watch: {},
    created() {
    },
    methods: {
      handleClickText(...args) {
        if (this.to) {
          this.to.apply(this, args);
        }
      },
      copyText() {
        if (copyToClipboard($__default.default(this.$refs.contents).text())) {
          UI.message.success(this.$t("\u5DF2\u7ECF\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F").label);
        } else {
          UI.message.error(this.$t("\u590D\u5236\u5230\u526A\u5207\u677F\u5931\u8D25").label);
        }
      }
    },
    render({
      xDomText,
      handleClickText,
      copyText
    }) {
      return vue.createVNode("div", {
        "class": "xLinkCopy x-btn x-btn-link flex"
      }, [vue.withDirectives(vue.createVNode("div", {
        "class": "flex1 ellipsis mr4",
        "onClick": handleClickText,
        "ref": "contents"
      }, [xDomText]), [[vue.resolveDirective("uiPopover"), {
        onlyEllipsis: true
      }]]), vue.createVNode(vue.resolveComponent("xIcon"), {
        "icon": "InsideCopy",
        "class": "xLinkCopy_icon",
        "onClick": copyText
      }, null)]);
    }
  });
  const xInfoDiffCard$1 = "";
  const xInfoDiffCard = vue.defineComponent({
    name: "xInfoDiffCard",
    props: ["old", "new", "title"],
    render() {
      return vue.createVNode("div", null, [vue.createVNode("div", null, [this.title, vue.createTextVNode(":")]), vue.createVNode("div", {
        "class": "flex vertical"
      }, [vue.createVNode("div", {
        "class": "xInfoDiffCard-value xInfoDiffCard-delta xInfoDiffCard-left-value"
      }, [vue.createVNode("pre", null, [this.old])]), vue.createVNode("div", {
        "class": "xInfoDiffCard-value xInfoDiffCard-right-value"
      }, [vue.createVNode("pre", null, [this.new])])])]);
    }
  });
  if (State_UI.isDev) {
    window.dayjs = dayjs__default.default;
    window.moment = dayjs__default.default;
    window.jquery = $__default.default;
    window._ = xU;
  }
  const compositionAPI = {
    usefnObserveDomResize,
    useScopeStyle
  };
  const componentMyUI = {
    xIcon,
    xButton,
    xGap,
    xRender,
    xItem,
    xForm,
    xButtonCountDown,
    xCharts,
    xView,
    xDataGrid: _sfc_main$4,
    xDataGridToolbar,
    xColFilter,
    xPagination,
    xCellLabel,
    xVirScroll,
    xVirTable,
    xLogObject,
    xInfoCard,
    xLinkCopy,
    xInfoDiffCard
  };
  const components = {
    ...componentMyUI
  };
  const VentoseUIWithInstall = {
    install: (app, options) => {
      app.config.globalProperties.$t = $t$1;
      installDirective(app, options);
      installUIDialogComponent(UI, options, app);
      xU.each(components, (component, name) => {
        if (component.name) {
          name = component.name;
        } else {
          xU.doNothing(name, `miss name`);
        }
        app.component(component.name || name, component);
      });
      app.use(ElementPlus__default.default);
    }
  };
  Object.defineProperty(exports2, "dayjs", {
    enumerable: true,
    get: () => dayjs__default.default
  });
  Object.defineProperty(exports2, "moment", {
    enumerable: true,
    get: () => dayjs__default.default
  });
  Object.defineProperty(exports2, "$", {
    enumerable: true,
    get: () => $__default.default
  });
  exports2.$t = $t$1;
  exports2.AllWasWell = AllWasWell;
  exports2.Cpt_UI_locale = Cpt_UI_locale;
  exports2.EVENT_TYPE = EVENT_TYPE;
  exports2.FormRules = FormRules;
  exports2.RegexFn = RegexFn;
  exports2.State_UI = State_UI;
  exports2.UI = UI;
  exports2.VNodeCollection = VNodeCollection;
  exports2.VentoseUIWithInstall = VentoseUIWithInstall;
  exports2._ = xU;
  exports2.antColKey = antColKey;
  exports2.compileVNode = compileVNode;
  exports2.components = components;
  exports2.compositionAPI = compositionAPI;
  exports2.defCol = defCol;
  exports2.defColActions = defColActions;
  exports2.defColActionsBtnlist = defColActionsBtnlist;
  exports2.defDataGridOption = defDataGridOption;
  exports2.defFormConfigs = defFormConfigs;
  exports2.defItem = defItem;
  exports2.defPagination = defPagination;
  exports2.defXVirTableConfigs = defXVirTableConfigs;
  exports2.getPaginationPageSize = getPaginationPageSize;
  exports2.iStorage = iStorage;
  exports2.lStorage = lStorage;
  exports2.newReactiveState = newReactiveState;
  exports2.pickValueFrom = pickValueFrom;
  exports2.resetValueOf = resetValueOf;
  exports2.setCSSVariables = setCSSVariables;
  exports2.setDataGridInfo = setDataGridInfo;
  exports2.setDocumentTitle = setDocumentTitle;
  exports2.setPagination = setPagination;
  exports2.setValueTo = setValueTo;
  exports2.vModel = vModel;
  exports2.validateForm = validateForm;
  exports2.validateItem = validateItem;
  exports2.xU = xU;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
