var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { _ as __vitePreload } from "../index.ac72f167.js";
const AppStyle = "";
const routes = [
  { path: "/Dev", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/b", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/c/a", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  { path: "/Dev/b/c/b", component: () => __vitePreload(() => import("./Dev.js"), true ? ["./Dev.js", "..\\index.ac72f167.js", "..\\css\\Dev.css"] : void 0, import.meta.url) },
  {
    category: "inset",
    path: "/xDirective",
    component: () => __vitePreload(() => import("./DemoDirective.js"), true ? [] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xIcon",
    component: () => __vitePreload(() => import("./DemoXIcon.js"), true ? ["./DemoXIcon.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xButton",
    component: () => __vitePreload(() => import("./DemoXButton.js"), true ? ["./DemoXButton.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xDialog",
    component: () => __vitePreload(() => import("./DemoDialog.js"), true ? ["./DemoDialog.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xForm",
    component: () => __vitePreload(() => import("./DemoXForm.js"), true ? ["./DemoXForm.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  },
  {
    category: "inset",
    path: "/xDataGrid",
    component: () => __vitePreload(() => import("./DemoXDataGrid.js"), true ? ["./DemoXDataGrid.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  },
  {
    category: "plugin",
    path: "/xMenuTree",
    component: () => __vitePreload(() => import("./DemoxMenuTree.js"), true ? ["./DemoxMenuTree.js", "..\\index.ac72f167.js"] : void 0, import.meta.url)
  }
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});
const index = "";
const ui = "";
const antd$1 = "";
Vue.defineComponent(Vue.markRaw({
  name: "xRender",
  props: {
    render: {
      type: Function,
      required: true
    }
  },
  render() {
    return Vue.h(this.render, {
      vm: this,
      props: this.$props,
      attrs: this.$attrs
    });
  }
}));
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
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
    if (_.isPlainObject(value)) {
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
const iStorage = async function (key, val) {
  const keyPrefix = window.location.hostname;
  key = _.camelCase(keyPrefix + key);
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
const onRE = /^on[^a-z]/;
const VueComponents = {};
const isInput = (val) => {
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
  if (_.isArray(val)) {
    return val.length > 0;
  } else if (val) {
    return true;
  }
  return false;
};
const privateLodash = {
  WORDS: {
    INVALID_DATE: "Invalid Date",
    format_ymd: "YYYY-MM-DD"
  },
  scopeCss(vm, genCssStringFn) {
    const cssEleSelector = `scope-css_${vm._.uid}`;
    let $cssEle = $(`#${cssEleSelector}`);
    if ($cssEle.length === 0) {
      const domStyle = document.createElement("style");
      domStyle.id = cssEleSelector;
      const domWrapper = vm.$el.__vnode ? vm.$el : vm.$el.parentElement;
      domWrapper.dataset.styleId = cssEleSelector;
      domWrapper.appendChild(domStyle);
      $cssEle = $(`#${cssEleSelector}`);
    }
    $cssEle.html(
      genCssStringFn({ vm, selector: `[data-style-id=${cssEleSelector}]` })
    );
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
      const [a, b, c, d, e, f] = String(match[1]).split(",").map((i) => Number(_.trim(i)));
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
  payloadIdCount: 1,
  payloadIdCountMax: 4e4,
  payloadDateNow: Date.now(),
  genId: (category) => {
    const { payloadIdCount, payloadIdCountMax, payloadDateNow } = privateLodash;
    if (payloadIdCount > payloadIdCountMax) {
      privateLodash.payloadIdCount = 1;
      privateLodash.payloadDateNow = Date.now();
    }
    return `${category}_${payloadDateNow}_${privateLodash.payloadIdCount++}`;
  },
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
  sleep: (t) => new Promise((r) => setTimeout(r, t)),
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
  isObjectFill: (obj) => _.isPlainObject(obj) && Object.keys(obj).length > 0,
  safeFirst: (arr, fnCheck) => {
    fnCheck = fnCheck || ((value) => privateLodash.isInput(value));
    const obj = _.first(arr);
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
    let date = dayjs(val);
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
    let $link = $("<link/>", { rel: "stylesheet", type: "text/css" });
    $link.appendTo($("head"));
    $link[0].href = `${cssPath}?_t=${Date.now()}`;
    return () => {
      $link.remove();
      $link = null;
    };
  },
  async asyncLoadStyle(cssURL, options) {
    let { isReplace, id } = options || { isReplace: false, id: "" };
    id = id || _.camelCase(cssURL);
    let content;
    let $style = $(`#${id}`);
    if ($style.length == 0) {
      $style = $("<style/>", { id });
      $("body").append($style);
      content = await privateLodash.asyncLoadText(cssURL);
      $style.html(content);
    } else if (isReplace) {
      content = await privateLodash.asyncLoadText(cssURL);
      $style.html(content);
    }
  },
  asyncLoadText: async function (url) {
    if (!State_UI.isDev) {
      const res = await iStorage(url);
      if (res) {
        return res;
      }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            "Content-Type": "text/plain"
          }
        });
        if (!State_UI.isDev) {
          await iStorage(url, data);
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  asyncLoadJS: async (url, globalName) => {
    return new Promise((r) => {
      if (window[globalName]) {
        r(window[globalName]);
      }
      const $style = $("<script/>").attr("id", `asyncLoadJS_${globalName}`);
      $style.appendTo($("body")).on("load", function () {
        r(window[globalName]);
      });
      $style.attr("src", url);
    });
  },
  asyncGlobalJS: async (globalName, url) => {
    if (window[globalName]) {
      return window[globalName];
    }
    if (!url) {
      alert("asyncGlobalJS miss url " + globalName);
      return {};
    }
    const jsString = await privateLodash.asyncLoadText(url);
    const fn = new Function(`with(window){${jsString}}`);
    fn();
    return window[globalName];
  },
  ensureValueDone: async (fnGetValue) => {
    return new Promise(async (resolve) => {
      let exeFnGetValue = async function () {
        const value = await fnGetValue();
        if (value) {
          exeFnGetValue = null;
          resolve(value);
        } else {
          setTimeout(exeFnGetValue, 100 * exeFnGetValue.count++);
        }
      };
      exeFnGetValue.count = 1;
      exeFnGetValue();
    });
  },
  genProp: (someString) => {
    return `k${_.camelCase(someString)}`;
  },
  dateFormat: (date, format2 = "YYYY-MM-DD") => {
    if (typeof date === "number") {
      date = dayjs.unix(date);
    }
    if (format2 === 1) {
      format2 = "YYYY-MM-DD HH:mm:ss";
    }
    const label = dayjs(date).format(format2);
    const isInvalidDate = label == privateLodash.WORDS.INVALID_DATE;
    return isInvalidDate ? "--" : label;
  },
  keepDecimals: function (val, fractionDigits) {
    let num = Number(val * 100 / 1024 / 100).toFixed(fractionDigits);
    if (num === "NaN") {
      num = "-";
    }
    return num;
  },
  valueToLabel: function (value, options) {
    const target = _.find(options, {
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
        if (!key) {
          debugger;
        }
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
    if (val || _.isString(val) || _.isBoolean(val) || _.isNumber(val) && !_.isNaN(val)) {
      setVal();
    } else {
      return getVal();
    }
    return item;
  }
};
const xU = new Proxy(
  function (...args) {
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
      if (_[prop]) {
        return _[prop];
      }
      return fn[prop];
    },
    set(fn, prop, val) {
      privateLodash[prop] = val;
      return true;
    }
  }
);
Vue.defineComponent({
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
      return [`#${this.xFormId} { width:100%; padding:0 16px; display: grid;grid-template-columns: repeat(${this.col},1fr);}`, `#${this.xFormId} { ${this.formStyleText} }`, `#${this.xFormId} div.ant-form-item-label { ${this.labelStyleText} }`].join("\n");
    }
  },
  mounted() {
    const $form = $(`#${this.xFormId}`);
    const $style = $("<style/>", {
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
      const $style = $(`#style_${this.xFormId}`);
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
const Pagination$1 = {
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj2) {
    return typeof obj2;
  } : function (obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var locale$5 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const CalendarLocale$1 = locale$5;
var locale$4 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const TimePicker$1 = locale$4;
var locale$3 = {
  lang: _objectSpread2({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, CalendarLocale$1),
  timePickerLocale: _objectSpread2({}, TimePicker$1)
};
const DatePicker$2 = locale$3;
var typeTemplate$1 = "${label} is not a valid ${type}";
var localeValues$1 = {
  locale: "en",
  Pagination: Pagination$1,
  DatePicker: DatePicker$2,
  TimePicker: TimePicker$1,
  Calendar: DatePicker$2,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate$1,
        method: typeTemplate$1,
        array: typeTemplate$1,
        object: typeTemplate$1,
        number: typeTemplate$1,
        date: typeTemplate$1,
        boolean: typeTemplate$1,
        integer: typeTemplate$1,
        float: typeTemplate$1,
        regexp: typeTemplate$1,
        email: typeTemplate$1,
        url: typeTemplate$1,
        hex: typeTemplate$1
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};
const defaultLocale = localeValues$1;
const Pagination = {
  items_per_page: "\u6761/\u9875",
  jump_to: "\u8DF3\u81F3",
  jump_to_confirm: "\u786E\u5B9A",
  page: "\u9875",
  prev_page: "\u4E0A\u4E00\u9875",
  next_page: "\u4E0B\u4E00\u9875",
  prev_5: "\u5411\u524D 5 \u9875",
  next_5: "\u5411\u540E 5 \u9875",
  prev_3: "\u5411\u524D 3 \u9875",
  next_3: "\u5411\u540E 3 \u9875"
};
var locale$2 = {
  locale: "zh_CN",
  today: "\u4ECA\u5929",
  now: "\u6B64\u523B",
  backToToday: "\u8FD4\u56DE\u4ECA\u5929",
  ok: "\u786E\u5B9A",
  timeSelect: "\u9009\u62E9\u65F6\u95F4",
  dateSelect: "\u9009\u62E9\u65E5\u671F",
  weekSelect: "\u9009\u62E9\u5468",
  clear: "\u6E05\u9664",
  month: "\u6708",
  year: "\u5E74",
  previousMonth: "\u4E0A\u4E2A\u6708 (\u7FFB\u9875\u4E0A\u952E)",
  nextMonth: "\u4E0B\u4E2A\u6708 (\u7FFB\u9875\u4E0B\u952E)",
  monthSelect: "\u9009\u62E9\u6708\u4EFD",
  yearSelect: "\u9009\u62E9\u5E74\u4EFD",
  decadeSelect: "\u9009\u62E9\u5E74\u4EE3",
  yearFormat: "YYYY\u5E74",
  dayFormat: "D\u65E5",
  dateFormat: "YYYY\u5E74M\u6708D\u65E5",
  dateTimeFormat: "YYYY\u5E74M\u6708D\u65E5 HH\u65F6mm\u5206ss\u79D2",
  previousYear: "\u4E0A\u4E00\u5E74 (Control\u952E\u52A0\u5DE6\u65B9\u5411\u952E)",
  nextYear: "\u4E0B\u4E00\u5E74 (Control\u952E\u52A0\u53F3\u65B9\u5411\u952E)",
  previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
  nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
  previousCentury: "\u4E0A\u4E00\u4E16\u7EAA",
  nextCentury: "\u4E0B\u4E00\u4E16\u7EAA"
};
const CalendarLocale = locale$2;
var locale$1 = {
  placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
  rangePlaceholder: ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"]
};
const TimePicker = locale$1;
var locale = {
  lang: _objectSpread2({
    placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
    yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
    quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
    monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
    weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
    rangePlaceholder: ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
    rangeYearPlaceholder: ["\u5F00\u59CB\u5E74\u4EFD", "\u7ED3\u675F\u5E74\u4EFD"],
    rangeMonthPlaceholder: ["\u5F00\u59CB\u6708\u4EFD", "\u7ED3\u675F\u6708\u4EFD"],
    rangeQuarterPlaceholder: ["\u5F00\u59CB\u5B63\u5EA6", "\u7ED3\u675F\u5B63\u5EA6"],
    rangeWeekPlaceholder: ["\u5F00\u59CB\u5468", "\u7ED3\u675F\u5468"]
  }, CalendarLocale),
  timePickerLocale: _objectSpread2({}, TimePicker)
};
locale.lang.ok = "\u786E\u5B9A";
const DatePicker$1 = locale;
var typeTemplate = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}";
var localeValues = {
  locale: "zh-cn",
  Pagination,
  DatePicker: DatePicker$1,
  TimePicker,
  Calendar: DatePicker$1,
  global: {
    placeholder: "\u8BF7\u9009\u62E9"
  },
  Table: {
    filterTitle: "\u7B5B\u9009",
    filterConfirm: "\u786E\u5B9A",
    filterReset: "\u91CD\u7F6E",
    filterEmptyText: "\u65E0\u7B5B\u9009\u9879",
    filterCheckall: "\u5168\u9009",
    filterSearchPlaceholder: "\u5728\u7B5B\u9009\u9879\u4E2D\u641C\u7D22",
    selectAll: "\u5168\u9009\u5F53\u9875",
    selectInvert: "\u53CD\u9009\u5F53\u9875",
    selectNone: "\u6E05\u7A7A\u6240\u6709",
    selectionAll: "\u5168\u9009\u6240\u6709",
    sortTitle: "\u6392\u5E8F",
    expand: "\u5C55\u5F00\u884C",
    collapse: "\u5173\u95ED\u884C",
    triggerDesc: "\u70B9\u51FB\u964D\u5E8F",
    triggerAsc: "\u70B9\u51FB\u5347\u5E8F",
    cancelSort: "\u53D6\u6D88\u6392\u5E8F"
  },
  Modal: {
    okText: "\u786E\u5B9A",
    cancelText: "\u53D6\u6D88",
    justOkText: "\u77E5\u9053\u4E86"
  },
  Popconfirm: {
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A"
  },
  Transfer: {
    searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
    itemUnit: "\u9879",
    itemsUnit: "\u9879",
    remove: "\u5220\u9664",
    selectCurrent: "\u5168\u9009\u5F53\u9875",
    removeCurrent: "\u5220\u9664\u5F53\u9875",
    selectAll: "\u5168\u9009\u6240\u6709",
    removeAll: "\u5220\u9664\u5168\u90E8",
    selectInvert: "\u53CD\u9009\u5F53\u9875"
  },
  Upload: {
    uploading: "\u6587\u4EF6\u4E0A\u4F20\u4E2D",
    removeFile: "\u5220\u9664\u6587\u4EF6",
    uploadError: "\u4E0A\u4F20\u9519\u8BEF",
    previewFile: "\u9884\u89C8\u6587\u4EF6",
    downloadFile: "\u4E0B\u8F7D\u6587\u4EF6"
  },
  Empty: {
    description: "\u6682\u65E0\u6570\u636E"
  },
  Icon: {
    icon: "\u56FE\u6807"
  },
  Text: {
    edit: "\u7F16\u8F91",
    copy: "\u590D\u5236",
    copied: "\u590D\u5236\u6210\u529F",
    expand: "\u5C55\u5F00"
  },
  PageHeader: {
    back: "\u8FD4\u56DE"
  },
  Form: {
    optional: "\uFF08\u53EF\u9009\uFF09",
    defaultValidateMessages: {
      default: "\u5B57\u6BB5\u9A8C\u8BC1\u9519\u8BEF${label}",
      required: "\u8BF7\u8F93\u5165${label}",
      enum: "${label}\u5FC5\u987B\u662F\u5176\u4E2D\u4E00\u4E2A[${enum}]",
      whitespace: "${label}\u4E0D\u80FD\u4E3A\u7A7A\u5B57\u7B26",
      date: {
        format: "${label}\u65E5\u671F\u683C\u5F0F\u65E0\u6548",
        parse: "${label}\u4E0D\u80FD\u8F6C\u6362\u4E3A\u65E5\u671F",
        invalid: "${label}\u662F\u4E00\u4E2A\u65E0\u6548\u65E5\u671F"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label}\u987B\u4E3A${len}\u4E2A\u5B57\u7B26",
        min: "${label}\u6700\u5C11${min}\u4E2A\u5B57\u7B26",
        max: "${label}\u6700\u591A${max}\u4E2A\u5B57\u7B26",
        range: "${label}\u987B\u5728${min}-${max}\u5B57\u7B26\u4E4B\u95F4"
      },
      number: {
        len: "${label}\u5FC5\u987B\u7B49\u4E8E${len}",
        min: "${label}\u6700\u5C0F\u503C\u4E3A${min}",
        max: "${label}\u6700\u5927\u503C\u4E3A${max}",
        range: "${label}\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      array: {
        len: "\u987B\u4E3A${len}\u4E2A${label}",
        min: "\u6700\u5C11${min}\u4E2A${label}",
        max: "\u6700\u591A${max}\u4E2A${label}",
        range: "${label}\u6570\u91CF\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "${label}\u4E0E\u6A21\u5F0F\u4E0D\u5339\u914D${pattern}"
      }
    }
  },
  Image: {
    preview: "\u9884\u89C8"
  }
};
const zhCn$1 = localeValues;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var zhCn = { exports: {} };
const _global_dayjs = dayjs;
(function (module2, exports2) {
  !function (e, _2) {
    module2.exports = _2(_global_dayjs);
  }(commonjsGlobal, function (e) {
    function _2(e2) {
      return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
    }
    var t = _2(e), d = {
      name: "zh-cn", weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), ordinal: function (e2, _3) {
        return "W" === _3 ? e2 + "\u5468" : e2 + "\u65E5";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, meridiem: function (e2, _3) {
        var t2 = 100 * e2 + _3;
        return t2 < 600 ? "\u51CC\u6668" : t2 < 900 ? "\u65E9\u4E0A" : t2 < 1100 ? "\u4E0A\u5348" : t2 < 1300 ? "\u4E2D\u5348" : t2 < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
      }
    };
    return t.default.locale(d, null, true), d;
  });
})(zhCn);
var enAu = { exports: {} };
(function (module2, exports2) {
  !function (e, a) {
    module2.exports = a(_global_dayjs);
  }(commonjsGlobal, function (e) {
    function a(e2) {
      return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
    }
    var t = a(e), _2 = {
      name: "en-au", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function (e2) {
        return e2;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }
    };
    return t.default.locale(_2, null, true), _2;
  });
})(enAu);
function $t(prop, payload = {}, i18nMessage = false) {
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
  LANGUAGE: {
    enUs: defaultLocale,
    zhCn: zhCn$1
  },
  i18nMessage: {},
  assetsSvgPath: "",
  assetsPath: "",
  basePath: "",
  setBasePath(basePath) {
    console.log("basePath", basePath);
    debugger;
    State_UI.assetsSvgPath = basePath + "assets/svg";
    window.State_UI = State_UI;
    State_UI.assetsPath = basePath + "assets";
    State_UI.basePath = basePath;
  },
  setAssetsBaseById(eleId) {
    var _a;
    const img = document.getElementById(eleId);
    if (img) {
      const src = String(img.src || img.href);
      debugger;
      const index2 = ((_a = src.match(/assets(.*)/)) == null ? void 0 : _a.index) || 0;
      State_UI.assetsSvgPath = src.substring(0, index2) + "assets/svg";
      State_UI.assetsPath = src.substring(0, index2) + "assets";
      State_UI.basePath = src.substring(0, index2);
    }
  },
  $t,
  isDev: localStorage.___VENTOSE_UI_IS_DEV_MODE === "VENTOSE_UI_IS_DEV_MODE",
  dev(isDev) {
    if (isDev) {
      localStorage.___VENTOSE_UI_IS_DEV_MODE = "VENTOSE_UI_IS_DEV_MODE";
    } else {
      localStorage.removeItem("___VENTOSE_UI_IS_DEV_MODE");
    }
  }
};
const State_UI = Vue.reactive(_State_UI);
Vue.watch(() => State_UI.language, (language) => {
  lStorage["language"] = language;
  dayjs.locale(language === "zh-CN" ? "zh-cn" : "en");
  if (State_UI.onLanguageChange) {
    State_UI.onLanguageChange(language, State_UI);
  }
}, {
  immediate: true
});
const Cpt_UI_locale = Vue.computed(() => {
  const currentLanguage = xU.camelCase(State_UI.language);
  const locale2 = State_UI.LANGUAGE[currentLanguage];
  return locale2;
});
const BTN_PRESET_MAP = {
  query: () => ({
    icon: Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "class": "x-button_icon-wrapper",
      "icon": "InsideSearchOutlined"
    }, null),
    text: $t("\u67E5\u8BE2").label
  }),
  refresh: () => ({
    icon: Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "class": "x-button_icon-wrapper",
      "icon": "InsideSyncOutlined"
    }, null),
    text: $t("\u5237\u65B0").label
  }),
  cancel: () => ({
    text: $t("\u53D6\u6D88").label
  }),
  save: () => ({
    icon: Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "class": "x-button_icon-wrapper",
      "icon": "InsideSaveOutlined"
    }, null),
    text: $t("\u4FDD\u5B58").label
  }),
  upload: () => ({
    icon: Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "class": "x-button_icon-wrapper",
      "icon": "InsideUploadOutlined"
    }, null),
    text: $t("\u4E0A\u4F20").label
  }),
  delete: (configs) => {
    configs.type = "danger";
    configs.ghost = true;
    return {
      icon: Vue.createVNode(Vue.resolveComponent("xIcon"), {
        "class": "x-button_icon-wrapper",
        "icon": "InsideDeleteOutlined"
      }, null),
      text: $t("\u5220\u9664").label
    };
  }
};
Vue.defineComponent({
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
      this.configs.text = Vue.createVNode(Vue.Fragment, null, [preset.icon, Vue.createVNode("span", {
        "class": "ml4"
      }, [preset.text])]);
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
        Cpt_isShow = Vue.computed(props.configs.isShow);
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
    return Vue.createVNode(Vue.resolveComponent("aButton"), Vue.mergeProps({
      "class": "x-button antdv-button",
      "loading": this.loading,
      "disabled": !!this.disabled,
      "type": this.type
    }, _properties), {
      default: () => {
        const vDomDefautl = this.$slots.default && this.$slots.default();
        return Vue.createVNode(Vue.Fragment, null, [this.text, vDomDefautl]);
      }
    });
  }
});
Vue.defineComponent({
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
const line = {};
const CONFIGS_MAP = {
  line
};
Vue.defineComponent({
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
    const id = xU.genId("xChart");
    this.updateOptions = xU.debounce(function () {
      if (this.myChart) {
        this.myChart.dispose();
      }
      const options = this.helper.initOptions(this.$props);
      this.options = this.helper.updateOptions(options, this.dataset);
      const dom = document.querySelector(`#${this.id}`);
      this.myChart = this.$echarts.init(dom);
      this.myChart.showLoading();
      this.myChart.setOption(this.options);
      this.myChart.hideLoading();
    }, 300);
    return {
      id
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
      await xU.ensureValueDone(() => this.myChart);
      this.updateOptions();
      this.observe();
    },
    observe() {
      this.resizeObserver = new ResizeObserver(() => {
        var _a;
        if (this.myChart) {
          ((_a = this.myChart) == null ? void 0 : _a.resize) && this.myChart.resize();
        }
      });
      this.resizeObserver.observe(this.$el);
    }
  }
});
Vue.defineComponent({
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
const _hoisted_1$c = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$c = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M338.261 137.045h-9.13a9.16 9.16 0 0 0 9.13-9.159v9.16h347.45v-9.16c0 5.035 4.095 9.16 9.101 9.16h-9.102v82.26h82.262v-91.42a73.216 73.216 0 0 0-73.131-73.13H329.102a73.216 73.216 0 0 0-73.159 73.13v91.45h82.29v-82.29zm576 82.29h-804.55c-20.253 0-36.58 16.327-36.58 36.551v36.58c0 5.034 4.096 9.159 9.13 9.159h69.063l28.217 597.703a73.216 73.216 0 0 0 73.046 69.689h518.826a73.045 73.045 0 0 0 73.046-69.689l28.245-597.732h69.006a9.16 9.16 0 0 0 9.16-9.102v-36.636c0-20.196-16.356-36.551-36.58-36.551zm-151.665 667.42h-501.22l-27.648-585.159H790.3l-27.676 585.16z" }, null, -1);
const _hoisted_3$b = [
  _hoisted_2$c
];
function render$a(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$c, _hoisted_3$b);
}
const InsideDeleteOutlined = { name: "DeleteOutlined", render: render$a };
const _hoisted_1$b = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$b = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M512 628c17.6 0 32-14.4 32-32V308c0-17.6-14.4-32-32-32s-32 14.4-32 32v288c0 17.6 14.4 32 32 32zm-44 76a44 44 0 1 0 88 0 44 44 0 1 0-88 0Zm44-640C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm271.5 719.5c-35.3 35.3-76.4 63-122.1 82.3-47.3 20-97.6 30.2-149.5 30.2s-102.2-10.1-149.5-30.2c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2 30.2-149.5c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3c47.3-20 97.6-30.2 149.5-30.2s102.2 10.1 149.5 30.2c45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5s-10.1 102.2-30.2 149.5c-19.3 45.8-47 86.8-82.3 122.1z" }, null, -1);
const _hoisted_3$a = [
  _hoisted_2$b
];
function render$9(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$b, _hoisted_3$a);
}
const InsideExclamationCircleOutlined = { name: "ExclamationCircleOutlined", render: render$9 };
const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$a = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M448 128a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM257.1 180.5a61.3 61.3 0 1 0 122.6 0 61.3 61.3 0 1 0-122.6 0ZM121.8 318.4a58.7 58.7 0 1 0 117.4 0 58.7 58.7 0 1 0-117.4 0ZM72 512a56 56 0 1 0 112 0 56 56 0 1 0-112 0Zm55.2 193.6a53.3 53.3 0 1 0 106.6 0 53.3 53.3 0 1 0-106.6 0Zm140.5 137.9a50.7 50.7 0 1 0 101.4 0 50.7 50.7 0 1 0-101.4 0ZM464 896a48 48 0 1 0 96 0 48 48 0 1 0-96 0Zm196.3-52.5a45.3 45.3 0 1 0 90.6 0 45.3 45.3 0 1 0-90.6 0Zm140.5-137.9a42.7 42.7 0 1 0 85.4 0 42.7 42.7 0 1 0-85.4 0ZM856 512a40 40 0 1 0 80 0 40 40 0 1 0-80 0ZM837.9 377.7a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Zm-61.5-113.5a28.3 28.3 0 1 0 56.6 0 28.3 28.3 0 1 0-56.6 0ZM680 180a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z" }, null, -1);
const _hoisted_3$9 = /* @__PURE__ */ Vue.createElementVNode("animateTransform", {
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
const _hoisted_4$1 = [
  _hoisted_2$a,
  _hoisted_3$9
];
function render$8(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$a, _hoisted_4$1);
}
const InsideLoadingOutlined = { name: "LoadingOutlined", render: render$8 };
const _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$9 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M144 928a48 48 0 0 1-48-48V144a48 48 0 0 1 48-48h592v.448a48 48 0 0 1 27.328 13.6l150.624 150.624A48 48 0 0 1 928 294.624V880a48 48 0 0 1-48 48H144zm144-768H160v704h128V496a48 48 0 0 1 43.392-47.776L336 448h352a48 48 0 0 1 48 48v368h128V301.248l-128-128V272a48 48 0 0 1-48 48H336a48 48 0 0 1-48-48V160zm384 352H352v352h320V512zm0-352H352v96h320v-96z" }, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$9
];
function render$7(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$9, _hoisted_3$8);
}
const InsideSaveOutlined = { name: "SaveOutlined", render: render$7 };
const _hoisted_1$8 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$8 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M479.04 128c176.16 0 318.976 142.848 318.976 319.04a317.984 317.984 0 0 1-86.976 218.976l175.616 175.552c11.52 11.52 12.384 29.568 2.656 42.08l-2.656 3.008a31.872 31.872 0 0 1-45.088 0L662.784 707.904a317.504 317.504 0 0 1-183.776 58.24C302.816 766.144 160 623.296 160 447.04S302.816 128 479.04 128zm0 63.808a255.232 255.232 0 0 0-255.232 255.264 255.232 255.232 0 1 0 510.4 0 255.232 255.232 0 0 0-255.2-255.264z" }, null, -1);
const _hoisted_3$7 = [
  _hoisted_2$8
];
function render$6(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$8, _hoisted_3$7);
}
const InsideSearchOutlined = { name: "SearchOutlined", render: render$6 };
const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$7 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27c40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8c-.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4S687 811.7 646 829c-42.4 17.9-87.4 27-133.9 27s-91.5-9.1-133.9-27c-40.9-17.3-77.7-42.1-109.3-73.8-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47c5.3-4.1 3.5-12.5-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8.1-4.5-3.5-8.2-8-8.2z" }, null, -1);
const _hoisted_3$6 = [
  _hoisted_2$7
];
function render$5(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$7, _hoisted_3$6);
}
const InsideSyncOutlined = { name: "SyncOutlined", render: render$5 };
const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$6 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M512 85.333A426.667 426.667 0 1 0 938.667 512 426.667 426.667 0 0 0 512 85.333zm0 768A341.333 341.333 0 1 1 853.333 512 341.333 341.333 0 0 1 512 853.333zm30.72-587.946A32.853 32.853 0 0 0 520.107 256h-16.214a32 32 0 0 0-22.613 9.387L347.733 399.36a21.333 21.333 0 0 0 0 30.293l29.867 30.294a21.333 21.333 0 0 0 30.293 0l61.44-61.867v348.587A21.333 21.333 0 0 0 490.667 768h42.666a21.333 21.333 0 0 0 21.334-21.333V398.08l61.44 61.44a20.907 20.907 0 0 0 29.866 0l30.294-30.293a21.333 21.333 0 0 0 0-30.294z" }, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$6
];
function render$4(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$5);
}
const InsideUploadOutlined = { name: "UploadOutlined", render: render$4 };
const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$5 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M512 128c212 0 384 172 384 384S724 896 512 896 128 724 128 512s172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64zm32 704h-64v-64h64v64zm11.2-203.2-5.6 4.8c-3.2 2.4-5.6 8-5.6 12.8v58.4h-64v-58.4c0-24.8 11.2-48 29.6-63.2l5.6-4.8c56-44.8 83.2-68 83.2-108 0-48-38.4-86.4-86.4-86.4-49.6 0-86.4 36.8-86.4 86.4h-64c0-84 66.4-150.4 150.4-150.4 83.2 0 150.4 67.2 150.4 150.4 0 72.8-49.6 112.8-107.2 158.4z" }, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$5
];
function render$3(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$5, _hoisted_3$4);
}
const Insidetips = { name: "tips", render: render$3 };
const _hoisted_1$4 = {
  width: "64",
  height: "41",
  class: "ant-empty-img-simple"
};
const _hoisted_2$4 = /* @__PURE__ */ Vue.createStaticVNode('<g fill="none" fill-rule="evenodd" transform="translate(0 1)"><ellipse cx="32" cy="33" fill="#F5F5F5" class="ant-empty-img-simple-ellipse" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#D9D9D9" class="ant-empty-img-simple-g"><path d="M55 12.76 44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path fill="#FAFAFA" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" class="ant-empty-img-simple-path"></path></g></g>', 1);
const _hoisted_3$3 = [
  _hoisted_2$4
];
function render$2(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$4, _hoisted_3$3);
}
const InsideEmpty = { name: "empty", render: render$2 };
const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$3 = /* @__PURE__ */ Vue.createElementVNode("path", { d: "M629.392 415.033 465.775 251.416c-7.992-7.992-20.947-7.992-28.939 0-7.992 8.002-7.992 20.957 0 28.95l128.68 128.68H389.97V184.083c0-11.298-9.17-20.467-20.466-20.467H21.813c-11.307 0-20.465 9.17-20.465 20.467v818.082c0 11.307 9.158 20.466 20.466 20.466h593.108c11.308 0 20.466-9.159 20.466-20.466V429.512c0-5.433-2.159-10.632-5.996-14.48zm-34.936 566.666H42.28v-777.15h306.756v224.963c0 11.298 9.159 20.466 20.467 20.466h224.953v531.72zm429.523-715.803v572.652c0 11.308-9.16 20.466-20.467 20.466H695.651c-11.298 0-20.466-9.158-20.466-20.466 0-11.297 9.168-20.466 20.466-20.466h287.395v-531.72H758.093c-11.308 0-20.466-9.169-20.466-20.466V40.932H430.87v75.694c0 11.308-9.169 20.466-20.466 20.466-11.307 0-20.466-9.158-20.466-20.466v-96.16C389.938 9.17 399.097 0 410.404 0h347.689c11.297 0 20.466 9.169 20.466 20.466V245.43h175.548l-128.68-128.681c-7.993-7.992-7.993-20.947 0-28.95 7.991-7.991 20.946-7.991 28.939 0l163.616 163.627a20.455 20.455 0 0 1 5.997 14.47z" }, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render$1(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
}
const InsideCopy = { name: "copy", render: render$1 };
const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon",
  style: { "width": "1em", "height": "1em", "vertical-align": "middle", "fill": "currentColor", "overflow": "hidden" },
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$2 = /* @__PURE__ */ Vue.createElementVNode("path", {
  fill: "#5A626A",
  d: "M439.264 208a16 16 0 0 0-16 16v67.968a239.744 239.744 0 0 0-46.496 26.896l-58.912-34A16 16 0 0 0 296 290.72l-80 138.56a16 16 0 0 0 5.856 21.856l58.896 34a242.624 242.624 0 0 0 0 53.728l-58.88 34a16 16 0 0 0-6.72 20.176l.848 1.68 80 138.56a16 16 0 0 0 21.856 5.856l58.912-34a239.744 239.744 0 0 0 46.496 26.88V800a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-67.968a239.744 239.744 0 0 0 46.512-26.896l58.912 34a16 16 0 0 0 21.856-5.856l80-138.56a16 16 0 0 0-4.288-20.832l-1.568-1.024-58.896-34a242.624 242.624 0 0 0 0-53.728l58.88-34a16 16 0 0 0 6.72-20.176l-.848-1.68-80-138.56a16 16 0 0 0-21.856-5.856l-58.912 34a239.744 239.744 0 0 0-46.496-26.88V224a16 16 0 0 0-16-16h-160zm32 48h96v67.376l28.8 12.576a192.21 192.21 0 0 1 37.184 21.52l25.28 18.688 58.448-33.728 48 83.136-58.368 33.68 3.472 31.2a194.624 194.624 0 0 1 0 43.104l-3.472 31.2 58.368 33.68-48 83.136-58.432-33.728-25.296 18.688a192.21 192.21 0 0 1-37.184 21.52l-28.8 12.576V768h-96v-67.376l-28.784-12.576a192.21 192.21 0 0 1-37.184-21.52l-25.28-18.688-58.448 33.728-48-83.136 58.368-33.68-3.472-31.2a194.624 194.624 0 0 1 0-43.104l3.472-31.2-58.368-33.68 48-83.136L380 376.16l25.296-18.688a191.744 191.744 0 0 1 37.184-21.52l28.8-12.576V256zm47.28 144a112 112 0 1 0 0 224 112 112 0 0 0 0-224zm0 48a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$2
];
function render(_ctx, _cache) {
  return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$1);
}
const insideSettingOutlined = { name: "SettingOutlined", render };
const xIcon = "";
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
Vue.defineComponent(Vue.markRaw({
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
          this.svgIcon = Vue.createVNode(SvgComponentByString, this.baseAttrs, null);
        } else if ((SvgIconAny == null ? void 0 : SvgIconAny.render) || (SvgIconAny == null ? void 0 : SvgIconAny.template)) {
          this.svgIcon = Vue.createVNode(SvgIconAny, this.baseAttrs, null);
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
    return Vue.createVNode(InsideLoadingOutlined, this.baseAttrs, null);
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
const STATIC_WORD = {
  OPERATION: "OPERATION",
  NEXT_TICK_TIME: 64
};
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
function filterColIsShow(isShow, prop) {
  if (xU.isBoolean(isShow)) {
    return isShow;
  } else {
    return true;
  }
}
const PAGE_SIZE_OPTIONS = ["10", "20", "30"];
const xPagination = Vue.defineComponent({
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
    onShowSizeChange: xU.debounce(function (page, size) {
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
    return Vue.createVNode(Vue.resolveComponent("aPagination"), {
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
        return Vue.createVNode("span", null, [this.$t("\u6761\u9875", {
          size: props.value
        }, this.i18nMessage).label]);
      }
    });
  }
});
Vue.defineComponent({
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
          emptyText: () => Vue.createVNode("div", {
            "class": "ant-empty ant-empty-normal"
          }, [Vue.createVNode("div", {
            "class": "ant-empty-image"
          }, [Vue.createVNode(Vue.resolveComponent("xIcon"), {
            "icon": "InsideEmpty",
            "style": "width:64px"
          }, null)]), Vue.createVNode("p", {
            "class": "ant-empty-description"
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
        return Vue.createVNode(antd.Table, Vue.mergeProps({
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
      return Vue.createVNode(xPagination, {
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
    return Vue.createVNode("div", {
      "id": this.State.id
    }, [this.Cpt_VNodeTable, this.Cpt_VNodePagination]);
  }
});
const xDataGrid_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = Vue.defineComponent({
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
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_aCheckbox = Vue.resolveComponent("aCheckbox");
  const _component_xIcon = Vue.resolveComponent("xIcon");
  const _component_aButton = Vue.resolveComponent("aButton");
  const _component_aPopover = Vue.resolveComponent("aPopover");
  return Vue.openBlock(), Vue.createBlock(_component_aPopover, {
    placement: "leftTop",
    trigger: "click"
  }, {
    content: Vue.withCtx(() => [
      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.Cpt_Columns, (col) => {
        return Vue.openBlock(), Vue.createElementBlock("p", {
          key: col.key
        }, [
          Vue.createVNode(_component_aCheckbox, {
            checked: _ctx.checkedList.includes(col.key),
            onChange: ($event) => _ctx.handleChecked(col)
          }, {
            default: Vue.withCtx(() => [
              Vue.createTextVNode(Vue.toDisplayString(col.title), 1)
            ]),
            _: 2
          }, 1032, ["checked", "onChange"])
        ]);
      }), 128))
    ]),
    default: Vue.withCtx(() => [
      Vue.createVNode(_component_aButton, null, {
        icon: Vue.withCtx(() => [
          Vue.createVNode(_component_xIcon, {
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
const xColFilter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2]]);
Vue.defineComponent({
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
Vue.defineComponent({
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
    const $dom = $(`#${this.id}`);
    const domWidth = $dom.width();
    const $span = $(`#${this.id} > span`);
    const spanWidth = $span.width();
    if (domWidth < spanWidth) {
      const text = $dom.text();
      this.updateTitle(text);
    } else {
      this.updateTitle("");
    }
  }
});
const xVirScroll_vue_vue_type_style_index_0_lang = "";
const itemHeight = 48;
const oneBlockHeight = 580;
Vue.defineComponent({
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
    setTop: xU.debounce(function () {
      if (this.$refs.refWrapper) {
        this.$refs.refWrapper.scrollTo({
          top: this.top,
          behavior: "smooth"
        });
      }
    }, 1e3),
    init() {
      this.$wrapperEle = $(this.$refs.refWrapper);
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
const ReadonlyItem = Vue.defineComponent({
  props: ["value"],
  render() {
    return Vue.withDirectives(Vue.createVNode("div", {
      "class": "ant-input cursor-not-allowed xItem_readonly ellipsis"
    }, [this.value, Vue.createVNode("span", {
      "style": "opacity:0"
    }, [Vue.createTextVNode(".")])]), [[Vue.resolveDirective("uiPopover"), {
      onlyEllipsis: true
    }]]);
  }
});
const Input = Vue.defineComponent({
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
      const ComponentInstance = Vue.resolveComponent(type2);
      ComponentInstance.__v_skip = true;
      this.ComponentInstance = ComponentInstance;
      if (type2 === "aTextarea") {
        this.properties.autoSize = this.properties.autoSize || {
          minRows: 4,
          maxRows: 6
        };
      }
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
        this.diffComponent("aInput");
      }
      if (properties.isPassword) {
        this.diffComponent("aInputPassword");
      } else if (properties.isNumber) {
        this.diffComponent("aInputNumber");
      } else if (properties.isTextarea) {
        this.diffComponent("aTextarea");
      } else if (properties.isSearch) {
        this.diffComponent("aInputSearch");
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
      return Vue.createVNode(ReadonlyItem, {
        "value": properties.value
      }, null);
    }
    return Vue.createVNode(component, Vue.mergeProps({
      "value": this._modelValue,
      "onUpdate:value": ($event) => this._modelValue = $event
    }, xU.omit(properties, ["value", ...propsWillDeleteFromConfigs]), xU.omit(listeners, ["onUpdate:value"])), slots);
  }
});
const DatePicker = ({
  properties,
  slots,
  listeners
}) => {
  function checkOneValue(value) {
    value = dayjs(value);
    xU.doNothing(value, properties.value);
    if (value === "Invalid Date") {
      xU.doNothing("properties.value", properties.value);
      value = "";
    }
    return value;
  }
  if (properties.isRange) {
    let value;
    if (xU.isArray(properties.value)) {
      value = [checkOneValue(properties.value[0]), checkOneValue(properties.value[1])];
    } else {
      value = [];
    }
    return Vue.createVNode(antd.RangePicker, Vue.mergeProps(properties, listeners, {
      "value": value,
      "locale": Cpt_UI_locale.value.DatePicker
    }), slots);
  }
  return Vue.createVNode(antd.DatePicker, Vue.mergeProps(properties, listeners, {
    "value": checkOneValue(properties.value),
    "locale": Cpt_UI_locale.value.DatePicker
  }), slots);
};
const RangePicker = ({
  properties,
  slots,
  listeners
}) => {
  const RangePicker2 = Vue.resolveComponent("aRangePicker");
  console.log("properties", properties.value);
  return Vue.createVNode(RangePicker2, Vue.mergeProps(properties, listeners, {
    "locale": Cpt_UI_locale.value.DatePicker
  }), slots);
};
const Checkbox = Vue.defineComponent({
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
    return Vue.createVNode(Vue.resolveComponent("aCheckbox"), Vue.mergeProps({
      "checked": this.checked,
      "onUpdate:checked": ($event) => this.checked = $event
    }, this.listeners, _properties), this.slots);
  }
});
const Select = Vue.defineComponent({
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
      return Vue.createVNode(ReadonlyItem, {
        "value": properties.value
      }, null);
    }
    const _property = xU.omit(properties, [...propsWillDeleteFromConfigs, "options", "renderOptions"]);
    const renderOptions = () => {
      if (properties.renderOptions) {
        return properties.renderOptions();
      } else {
        return xU.map(properties.options, (option) => {
          return Vue.createVNode(Vue.resolveComponent("aSelectOption"), {
            "value": option.value
          }, {
            default: () => [option.label]
          });
        });
      }
    };
    return Vue.createVNode(Vue.resolveComponent("aSelect"), Vue.mergeProps(listeners, _property), {
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
  const Radio = Vue.resolveComponent("aRadio");
  const RadioGroup2 = Vue.resolveComponent("aRadioGroup");
  const RadioButton = Vue.resolveComponent("aRadioButton");
  const PROPERTY_OPTIONS = properties.options;
  const componentPropertyOmitOptions = xU.omit(properties, ["options"]);
  const renderOptions = () => {
    if (properties.isButton) {
      return xU.map(PROPERTY_OPTIONS, (option) => {
        return Vue.createVNode(RadioButton, {
          "value": option.value
        }, {
          default: () => [option.label]
        });
      });
    }
    return xU.map(PROPERTY_OPTIONS, (option) => {
      return Vue.createVNode(Radio, {
        "value": option.value
      }, {
        default: () => [option.label]
      });
    });
  };
  return Vue.createVNode(RadioGroup2, Vue.mergeProps(componentPropertyOmitOptions, listeners), {
    default: renderOptions
  });
};
const CheckboxGroup = ({
  properties,
  slots,
  listeners
}) => {
  return Vue.createVNode(Vue.resolveComponent("aCheckboxGroup"), Vue.mergeProps(properties, listeners), slots);
};
const xSwitch = Vue.defineComponent({
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
    return Vue.createVNode("div", {
      "class": "x-item_switch"
    }, [Vue.createVNode(Vue.resolveComponent("aSwitch"), Vue.mergeProps(xU.omit(listeners, ["onUpdate:value"]), xU.omit(properties, ["value", ...propsWillDeleteFromConfigs]), {
      "checked": properties.value,
      "onClick": () => {
        listeners["onUpdate:value"](!properties.value);
      }
    }), null)]);
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
const checkXItem = async ({
  xItemConfigs,
  fnCheckedCallback,
  value,
  FormItemId,
  resolve
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
    if (xU.isFunction(resolve)) {
      resolve(result);
    }
    xItemConfigs.validate.triggerEventsObj = {};
    return result;
  }
};
const {
  MutatingProps: MutatingProps$1
} = xU;
const domClass = {
  tipsError: "ant-form-item-explain ant-form-item-explain-error"
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
Vue.defineComponent({
  name: "XItem",
  props: {
    modelValue: {
      type: [Object, String, Number, Boolean],
      default: void 0
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
      Cpt_isShowXItem = Vue.computed(props.configs.isShow);
    } else if (xU.isBoolean(props.configs.isShow)) {
      Cpt_isShowXItem = Vue.computed(() => !!props.configs.isShow);
    } else {
      Cpt_isShowXItem = Vue.computed(() => {
        if (xU.isUndefined(props.configs.isShow)) {
          props.configs.isShow = true;
        }
        return !!props.configs.isShow;
      });
    }
    if (xU.isFunction(props.configs.disabled)) {
      Cpt_isDisabled = Vue.computed(props.configs.disabled);
    } else if (xU.isBoolean(props.configs.disabled)) {
      Cpt_isDisabled = Vue.computed(() => !!props.configs.disabled);
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
    const triggerValidate = xU.debounce(function (eventType) {
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
          if (configs.value !== void 0) {
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
    CurrentXItem() {
      if (xU.isObject(this.configs.itemType)) {
        if (Vue.isProxy(this.configs.itemType)) {
          return Vue.toRaw(this.configs.itemType);
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
        "ant-form-item ant-form-item-with-help x-item flex",
        this.itemTips.type === TIPS_TYPE.error ? "ant-form-item-has-error" : ""
      ].join(" ");
    },
    tipsVNode() {
      if (this.isChecking) {
        return Vue.createVNode("div", null, [Vue.createVNode("div", {
          "data-type": "checking"
        }, [Vue.createTextVNode("checking...")])]);
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
          return Vue.createVNode("div", {
            "class": domClass.tipsError
          }, [Vue.createVNode("div", {
            "data-type": "error"
          }, [this.itemTips.msg])]);
        }
      }
      return null;
    },
    labelVNode() {
      const classString = this.isRequired ? "ant-form-item-required" : "";
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
      return Vue.createVNode("div", {
        "class": "ant-form-item-label"
      }, [Vue.createVNode("label", {
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
        if (vm.modelValue !== void 0) {
          return vm.modelValue;
        }
        if (vm.configs.value == void 0) {
          if (vm.configs.defaultValue !== void 0) {
            return vm.configs.defaultValue;
          } else {
            xU("either configs.value or modelValue");
          }
        }
        return vm.configs.value;
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
          resolve
        }) => {
          const prop = `configs.validate.triggerEventsObj.${eventType}`;
          MutatingProps$1(this, prop, true);
          debounceCheckXItem({
            FormItemId: this.FormItemId,
            xItemConfigs: this.configs,
            value,
            fnCheckedCallback,
            resolve
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
    return Vue.createVNode("div", {
      "id": FormItemId,
      "class": this.itemWrapperClass
    }, [this.labelVNode, Vue.createVNode("div", {
      "class": "ant-form-item-control",
      "data-type": itemTypeName
    }, [Vue.createVNode(CurrentXItem, {
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
Vue.defineComponent({
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
    return Vue.createVNode("div", {
      "style": this.gapStyle,
      "class": this.gapClass
    }, null);
  }
});
const xVirTableTh = Vue.defineComponent({
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
    return Vue.createVNode("div", {
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
$(window).on("click.virTableTdId", function (e) {
  const virTableTdId = (() => {
    let $ele = $(e.target);
    let _virTableTdId = $ele.attr("id");
    if (/^virTableTdId_/.test(_virTableTdId)) {
      return _virTableTdId;
    } else {
      $ele = $ele.parents("[id^=virTableTdId_]");
      _virTableTdId = $ele.attr("id");
      return _virTableTdId;
    }
  })();
  $(window).trigger({
    type: "onAllCell",
    virTableTdId
  });
});
const xVirTableTd = Vue.defineComponent({
  props: ["column", "data"],
  emits: ["update:data"],
  setup() {
    return {
      configs: Vue.inject("configs")
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
            $(this.$refs.cell).find("input").trigger("focus");
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
    $(window).on("onAllCell", this.handleAllCell);
    if (this.renderEditor) {
      $(this.$refs.cell).addClass("cursor-editor");
    }
  },
  beforeUnmount() {
    $(window).off("onAllCell", this.handleAllCell);
  },
  render() {
    return Vue.createVNode("div", {
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
const xVirTableBody = Vue.defineComponent({
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
      uniqBy: Vue.inject("uniqBy"),
      configs: Vue.inject("configs"),
      rowCache: {},
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  data(vm) {
    this.debounceSetPerBlockHeight = xU.debounce(function (viewportHeight) {
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
            return Vue.createVNode("div", {
              "role": "tr",
              "class": "xVirTable-row flex horizon",
              "data-row-key": __virRowIndex,
              "onClick": () => this.onClickRow(payload)
            }, [this.genSelectedVDom(payload), xU.map(this.columnOrder, (prop, index2) => {
              return Vue.createVNode(xVirTableTd, {
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
                this.rowCache[data[this.uniqBy]] = Vue.createVNode("div", {
                  "role": "tr",
                  "class": "xVirTable-row flex horizon",
                  "data-row-key": __virRowIndex
                }, [this.genSelectedVDom({
                  rowIndex: __virRowIndex,
                  rowData: data
                }), xU.map(this.columnOrder, (prop, index2) => {
                  return Vue.createVNode(xVirTableTd, {
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
        vDomChecked = Vue.withDirectives(Vue.createVNode(Vue.resolveComponent("aCheckbox"), {
          "checked": isSelected,
          "onChange": handleChange,
          "disabled": true
        }, null), [[Vue.resolveDirective("uiPopover"), uiPopoverConfigs]]);
      } else {
        vDomChecked = Vue.createVNode(Vue.resolveComponent("aCheckbox"), {
          "checked": isSelected,
          "onChange": handleChange,
          "disabled": isDisabled
        }, null);
      }
      return Vue.createVNode("div", {
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
    setTop: xU.debounce(function () {
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
    const vDomTableBody = Vue.createVNode("div", {
      "role": "body",
      "class": "xVirTable-body-wrapper flex1 width100",
      "ref": "wrapper",
      "onScroll": this.updateTop
    }, [Vue.createVNode("div", {
      "style": this.styleWrapperAll
    }, [Vue.createVNode("div", {
      "class": "xVirTable-body-item item1",
      "style": this.styleWrapper1
    }, [this.vDomBodyTr1]), Vue.createVNode("div", {
      "class": "xVirTable-body-item item2",
      "style": this.styleWrapper2
    }, [this.vDomBodyTr2]), Vue.createVNode("div", {
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
    options.getSelectedRow = Vue.markRaw(function () {
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
Vue.defineComponent({
  props: ["configs", "uniqBy"],
  components: {
    xVirTableTh,
    xVirTableBody
  },
  setup(props) {
    Vue.provide("uniqBy", props.uniqBy);
    Vue.provide("configs", props.configs);
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
      let vDomTheadSelect = Vue.createVNode(Vue.resolveComponent("aCheckbox"), {
        "checked": this.selectedAll,
        "indeterminate": this.selectedIndeterminate,
        "onChange": this.handleSelectedChangeTh
      }, null);
      if (this.selectedType == "one") {
        vDomTheadSelect = null;
      }
      return Vue.createVNode("div", {
        "role": "th",
        "class": "flex middle center xVirTable-cell xVirSelected_inner_element xVirSelected_inner_element_check",
        "data-prop": "xVirSelected"
      }, [vDomTheadSelect]);
    },
    vDomThead() {
      return Vue.createVNode("div", {
        "role": "thead",
        "class": "xVirTable-thead"
      }, [Vue.createVNode("div", {
        "role": "tr",
        "class": "flex horizon"
      }, [this.vDomTheadSelect, xU.map(this.columnOrder, (prop, index2) => {
        var _a;
        const column = (_a = this.configs) == null ? void 0 : _a.columns[prop];
        return Vue.createVNode(xVirTableTh, {
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
      const $tableWrapper = $(selectorTable);
      const tableWrapperWidth = $tableWrapper.outerWidth();
      const superfluous = tableWrapperWidth - contentWrapperWidth - 6;
      const isGrow = superfluous > 1;
      const isShrink = superfluous < -2;
      console.log("superfluous", superfluous, "isGrow", isGrow, "isShrink", isShrink);
      const selectorThead = `${selectorTable} >div[role=table] >div[role=thead] >div[role=tr] >div[role=th]`;
      const $tHead = $(selectorThead);
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
        const $wrapper = $(`#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${STATIC_WORD.OPERATION}]`);
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
      const bodyWidth = xU.map($(selectorBody), (dom) => dom.offsetWidth);
      bodyWidth.push(xU.reduce($(selectorHead), (_width, dom) => {
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
      const $form = $(`#${this.xVirTableId}`);
      const $style = $("<style/>", {
        id: `style_${this.xVirTableId}`
      }).append(this.styleContent);
      $form.prepend($style);
    },
    updateStyle(styleContent) {
      const $style = $(`#style_${this.xVirTableId}`);
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
    const vDomTable = Vue.createVNode("div", {
      "id": this.xVirTableId,
      "class": "xVirTable-wrapper flex vertical"
    }, [Vue.createVNode("div", {
      "ref": "thead",
      "role": "table",
      "class": "xVirTable-header-wrapper",
      "style": "padding-right: 6px;width:100%"
    }, [this.vDomThead]), Vue.createVNode(xVirTableBody, {
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
const KEY = {
  right: 39,
  left: 37,
  esc: 27
};
const $win = $(window);
const $html = $("html");
const $document = $(document);
const $body = $("body");
const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
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
const $MoveMask = $(
  `<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`
);
setTimeout(() => {
  $body.append($MoveMask);
}, 0);
const READY = {
  zIndex: 0,
  pointMousedown: [],
  basePath: function () {
    var jsPath = document.currentScript ? document.currentScript.src : function () {
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
  getStyle: function (node, name) {
    var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
    return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
      name
    );
  },
  reselect() {
    $.each($("select"), function (index2, value) {
      var sthis = $(this);
      if (!sthis.parents("." + LAYUI_LAYER)[0]) {
        sthis.attr("layer") == 1 && $("." + LAYUI_LAYER).length < 1 && sthis.removeAttr("layer").show();
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
  config: function (options, fn) {
    options = options || {};
    LayerUtils.cache = READY.config = $.extend({}, READY.config, options);
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
      $.extend(
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
      $.extend(
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
      $.extend(
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
        } : function () {
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
      $.extend(
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
      $.extend(
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
    return new Promise((resolve, reject) => {
      try {
        let removeLayerDomFromHtml = function () {
          if (type2 === "dialog" && $eleLayer.attr("data-content-type") === "object") {
            $eleLayer.children(`:not(.${LAYUI_LAYER_IFRAME})`).remove();
          } else {
            if (type2 === TYPE_IFRAME) {
              try {
                var iframe = $(`#${LAYUI_LAYER_CONTENT}${layerKey}`)[0];
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
        var $eleLayer = $(`#${LAYUI_LAYER}${layerKey}`);
        var type2 = $eleLayer.attr("type");
        var closeAnim = "layer-anim-close";
        if ($eleLayer.length === 0) {
          return;
        }
        if ($eleLayer.data("isOutAnim")) {
          $eleLayer.addClass("layer-anim " + closeAnim);
        }
        $(`#layui-layer-moves, #${LAYUI_LAYER_SHADE}${layerKey}`).remove();
        LayerUtils.ie == 6 && READY.reselect();
        READY.rescollbar(layerKey);
        if ($eleLayer.attr("minLeft")) {
          READY.minIndex--;
          READY.minLeft.push($eleLayer.attr("minLeft"));
        }
        setTimeout(function () {
          removeLayerDomFromHtml();
          resolve(true);
        }, 200);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  },
  getChildFrame(selector, index2) {
    index2 = index2 || $(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
    return $("#" + LAYUI_LAYER + index2).find("iframe").contents().find(selector);
  },
  getFrameIndex(name) {
    return $("#" + name).parents(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
  },
  iframeAuto(index2) {
    if (!index2)
      return;
    var heg = LayerUtils.getChildFrame("html", index2).outerHeight();
    var $eleLayer = $("#" + LAYUI_LAYER + index2);
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
    $("#" + LAYUI_LAYER + index2).find("iframe").attr("src", url);
  },
  style(index2, options, limit) {
    var $eleLayer = $("#" + LAYUI_LAYER + index2);
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
    var $eleLayer = $("#" + LAYUI_LAYER + index2), shadeo = $("#" + LAYUI_LAYER_SHADE + index2), titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0, left = $eleLayer.attr("minLeft") || 181 * READY.minIndex + "px", position = $eleLayer.css("position"), settings = {
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
    var $eleLayer = $("#" + LAYUI_LAYER + index2), shadeo = $("#" + LAYUI_LAYER_SHADE + index2), area = $eleLayer.attr("area").split(",");
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
    var $eleLayer = $("#" + LAYUI_LAYER + index2), timer;
    READY.record($eleLayer);
    if (!$html.attr("layer-full")) {
      $html.css("overflow", "hidden").attr("layer-full", index2);
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
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
    $(`#${LAYUI_LAYER}${layerKey}`).find(`.${LAYUI_LAYER_TITLE}`).html(name);
  },
  async closeAll(type2) {
    const needClose = [];
    $(`.${LAYUI_LAYER}`).each(function () {
      const $ele = $(this);
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
      $(selector).removeClass("set-layer-top");
      $current.addClass("set-layer-top").appendTo($body);
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
    return '<span class="layui-layer-setwin">' + function () {
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
      $win.on("resize", function () {
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
      setTimeout(function () {
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
        function () {
          $(this).removeClass(animClass);
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
    layerInstance.$eleLayer = $(layerInstance.cptDomContainer);
    if (xU.isObject(config.content) && (xU.isString(config.content) || xU.isString(config.content.jquery))) {
      const $content = $(config.content);
      layerInstance.$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).append($content);
    }
    layerInstance.$eleLayer.css({
      visibility: "hidden",
      top: "100%",
      left: "100%"
    });
    $body.append(layerInstance.$eleLayer);
    if (layerInstance.cptDomShade) {
      $body.append(layerInstance.cptDomShade);
      layerInstance.$eleShade = $(`#${_IDShade}`);
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
    let $eleFollow = $(config.follow);
    if ($eleFollow.length == 0) {
      $eleFollow = $body;
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
    $eleMove.on("mousedown", function (e) {
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
    $eleResize.on("mousedown", function (e) {
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
        $eleLayer.find("iframe").on("load", function () {
          config.success.apply(config, args);
        });
      } else {
        config.success.apply(config, args);
      }
    }
    $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).children("a").on("click", function () {
      var index2 = $(this).index();
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
          await LayerUtils.close($(this).attr("data-layer-id"));
        }
      }
    });
    if (config.shadeClose) {
      layerInstance.$eleShade.on("click", function () {
        LayerUtils.close(layerInstance._layerKey);
      });
    }
    $eleLayer.find(".layui-layer-min").on("click", function () {
      var min = config.min && config.min($eleLayer, layerInstance._layerKey);
      min === false || LayerUtils.min(layerInstance._layerKey, config);
    });
    $eleLayer.find(".layui-layer-max").on("click", function () {
      if ($(this).hasClass("layui-layer-maxmin")) {
        LayerUtils.restore(layerInstance._layerKey);
        config.restore && config.restore($eleLayer, layerInstance._layerKey);
      } else {
        LayerUtils.full(layerInstance._layerKey, config);
        setTimeout(function () {
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
  const $currentTarget = $(currentTarget);
  LayerUtils.setLayerTop($currentTarget);
}).on(
  "mousemove",
  `.${LAYUI_LAYER_MOVE}`,
  function (e) {
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
).on("mouseup", function (e) {
  if (READY.moveOrResizeInstance instanceof ClassLayer) {
    const { config } = READY.moveOrResizeInstance;
    if (config.onMoveEnd) {
      config.onMoveEnd(READY.moveOrResizeInstance);
    }
    READY.moveOrResizeInstance = false;
  }
  $MoveMask.hide();
});
xU.debounce(async function (event2, dialogOptions) {
  const $antModal = $(".ant-modal-root");
  if ($antModal.length > 0) {
    return;
  }
  if (event2.keyCode === KEY.esc) {
    await dialogOptions.closeDialog();
  }
}, 100);
Vue.defineComponent({
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
      return Vue.createVNode(Vue.resolveComponent("xButton"), {
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
      return Vue.createVNode(Vue.resolveComponent("xButton"), {
        "class": "ml10",
        "configs": configs
      }, null);
    },
    vDomContent() {
      if (this.$slots.default) {
        return this.$slots.default();
      } else {
        return Vue.createVNode(Vue.Fragment, null, [this.vDomCancel, this.vDomOk]);
      }
    }
  },
  render() {
    return Vue.createVNode("div", {
      "class": "flex middle end ant-modal-footer"
    }, [this.vDomContent]);
  }
});
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
      const $div = $(`<span style="position:fixed;top:0;left:0;opacity: 0;height: 0;letter-spacing: normal;">${text}</span>`);
      $div.appendTo($("body"));
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
  let app2;
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
      app2 = Vue.createApp(options.content);
      app2.use(appAddPlugin[appId], {
        dependState: appDependState[appId]
      });
      app2.mount(`#${id}`);
      options.afterOpenDialoag && options.afterOpenDialoag(app2);
    };
    layerTipsOptions.end = function end() {
      if (app2) {
        app2.unmount();
        app2 = null;
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
  const $ele = $(this);
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
$(document).on("click.uiPopver", `[${DATA_FOLLOW_ID}][data-trigger=click]`, handleClick);
$(document).on("contextmenu.uiPopver", `[${DATA_FOLLOW_ID}][data-trigger=rightClick]`, handleClick);
$(document).on("mouseenter.uiPopver", `[${DATA_FOLLOW_ID}]`, function (event2) {
  const $ele = $(this);
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
$(document).on("mouseleave.uiPopver", `[${DATA_FOLLOW_ID}]`, function (event2) {
  const followId = $(this).attr(DATA_FOLLOW_ID);
  closeTips(followId);
});
$(document).on("mouseenter.uiPopverTips", `[${DATA_TIPS_FOLLOW_ID}]`, function (event2) {
  const followId = $(this).attr(DATA_TIPS_FOLLOW_ID);
  inVisibleArea(followId);
});
$(document).on("mouseleave.uiPopverTips", `[${DATA_TIPS_FOLLOW_ID}]`, function (event2) {
  const followId = $(this).attr(DATA_TIPS_FOLLOW_ID);
  closeTips(followId);
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !Vue.isVNode(s);
}
let xItemNoPropCount = 0;
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
  return Vue.createVNode("span", {
    "class": "flex middle"
  }, [label, Vue.createVNode(Vue.resolveComponent("aTooltip"), {
    "title": tips
  }, _isSlot(icon) ? icon : {
    default: () => [icon]
  })]);
};
const useModel = (type2) => {
  return ({
    title = "",
    content = ""
  }) => {
    return new Promise((resolve, reject) => {
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
      antd.Modal[type2]({
        title,
        icon: Vue.createVNode("link", {
          "rel": "icon",
          "type": "image/svg+xml",
          "href": "/ExclamationCircleOutlined.svg"
        }, null),
        content,
        onOk() {
          resolve("ok");
        },
        onCancel() {
          reject();
        },
        okText: State_UI.$t("\u786E\u5B9A").label,
        class: "test"
      });
    });
  };
};
LayerUtils.loading = function (indexDelete) {
  this.loading.count = this.loading.count || 1;
  this.loading.deep = this.loading.deep || /* @__PURE__ */ new Set();
  $("body").trigger("click");
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
  confirm(options) {
    options.okText = options.okText || State_UI.$t("\u786E\u5B9A").label;
    options.cancelText = options.cancelText || State_UI.$t("\u53D6\u6D88").label;
    antd.Modal.confirm(options);
  },
  dialog: {
    component: async (options) => null,
    success: useModel("success"),
    info: useModel("info"),
    error: useModel("error"),
    warning: useModel("warning"),
    confirm: (options) => {
      return new Promise(async (resolve, reject) => {
        options.okText = options.okText || State_UI.$t("\u786E\u5B9A").label;
        options.cancelText = options.cancelText || State_UI.$t("\u53D6\u6D88").label;
        if (options.onOk) {
          const onOk = options.onOk;
          options.onOk = () => {
            return onOk(resolve, reject);
          };
        } else {
          options.onOk = () => resolve("ok");
        }
        if (options.onCancel) {
          const onCancel = options.onCancel;
          options.onCancel = () => {
            onCancel(resolve, reject);
          };
        } else {
          options.onCancel = () => reject();
        }
        antd.Modal.confirm(options);
      });
    },
    delete({
      title,
      content
    } = {}) {
      title = title || State_UI.$t("\u5220\u9664").label;
      content = content || State_UI.$t("\u5220\u9664\u786E\u8BA4\u63D0\u793A").label;
      return new Promise((resolve, reject) => {
        antd.Modal.confirm({
          title,
          icon: Vue.createVNode(Vue.resolveComponent("ExclamationCircleOutlined"), {
            "style": "color:red"
          }, null),
          content,
          okType: "danger",
          okText: State_UI.$t("\u786E\u5B9A").label,
          cancelText: State_UI.$t("\u53D6\u6D88").label,
          onOk() {
            resolve("ok");
          },
          onCancel() {
            reject();
          }
        });
      });
    }
  },
  message: antd.message,
  notification: new Proxy(antd.notification, {
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
const delayDeleteUnmountedInstance = xU.debounce(function () {
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
  const vNode = Vue.h(Vue.defineComponent({
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
Vue.defineComponent({
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
      return Vue.createVNode("pre", {
        "style": "width:500px;height:400px;"
      }, [Vue.createVNode("code", null, [Vue.createTextVNode(" "), this.objString, Vue.createTextVNode(" ")])]);
    }
  }
});
const xInfoCard = "";
const InfoCardCol = Vue.defineComponent({
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
    return Vue.createVNode(Vue.Fragment, null, [Vue.createVNode("div", {
      "class": "ant-descriptions-item-label",
      "style": this.styleLabel
    }, [this.vDomLabel]), Vue.createVNode("div", {
      "class": "ant-descriptions-item-content flex1"
    }, [this.vDomContent])]);
  }
});
const InfoCardRow = Vue.defineComponent({
  props: ["row"],
  computed: {
    colArray() {
      var _a;
      return ((_a = this == null ? void 0 : this.row) == null ? void 0 : _a.colArray) || false;
    },
    vDomCol() {
      if (this.row) {
        return xU.map(this.colArray, (col) => {
          return Vue.createVNode(InfoCardCol, {
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
    return Vue.createVNode("div", {
      "class": "InfoCardRow ant-descriptions-row flex middle",
      "style": this.styleRow
    }, [this.vDomCol]);
  }
});
Vue.defineComponent({
  props: ["info", "title"],
  methods: {
    updateLableStyle(styleObject) {
      const styleString = xU.map(xU.merge({
        "min-width": "120px",
        "text-align": "right"
      }, styleObject), (value, prop) => `${prop}: ${value}`).join(";");
      const styleContent = `#${this.id} .ant-descriptions-item-label {${styleString}}`;
      if (!this.$styleEle) {
        const $form = $(`#${this.id}`);
        const $style = $("<style/>", {
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
      return Vue.createVNode("div", {
        "class": "ant-descriptions-header"
      }, [Vue.createVNode("div", {
        "class": "ant-descriptions-title"
      }, [this.title])]);
    },
    vDomDescriptions() {
      if (this.rowArray) {
        return Vue.createVNode("div", {
          "class": "ant-descriptions-view"
        }, [xU.map(this.rowArray, (row) => {
          return Vue.createVNode(InfoCardRow, {
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
    return Vue.createVNode("div", {
      "class": "ant-descriptions ant-descriptions-middle ant-descriptions-bordered x-infomation-card",
      "id": this.id
    }, [this.vDomTitle, this.vDomDescriptions]);
  }
});
var toggleSelection = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {
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
  return function () {
    selection.type === "Caret" && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
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
    mark.addEventListener("copy", function (e) {
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
Vue.defineComponent({
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
      if (copyToClipboard($(this.$refs.contents).text())) {
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
    return Vue.createVNode("div", {
      "class": "xLinkCopy ant-btn ant-btn-link flex"
    }, [Vue.withDirectives(Vue.createVNode("div", {
      "class": "flex1 ellipsis mr4",
      "onClick": handleClickText,
      "ref": "contents"
    }, [xDomText]), [[Vue.resolveDirective("uiPopover"), {
      onlyEllipsis: true
    }]]), Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "icon": "InsideCopy",
      "class": "xLinkCopy_icon",
      "onClick": copyText
    }, null)]);
  }
});
const xInfoDiffCard = "";
Vue.defineComponent({
  name: "xInfoDiffCard",
  props: ["old", "new", "title"],
  render() {
    return Vue.createVNode("div", null, [Vue.createVNode("div", null, [this.title, Vue.createTextVNode(":")]), Vue.createVNode("div", {
      "class": "flex vertical"
    }, [Vue.createVNode("div", {
      "class": "xInfoDiffCard-value xInfoDiffCard-delta xInfoDiffCard-left-value"
    }, [Vue.createVNode("pre", null, [this.old])]), Vue.createVNode("div", {
      "class": "xInfoDiffCard-value xInfoDiffCard-right-value"
    }, [Vue.createVNode("pre", null, [this.new])])])]);
  }
});
window.dayjs = dayjs;
window.moment = dayjs;
window.jquery = $;
dayjs;
const _global_$ = $;
const _sfc_main$3 = Vue.defineComponent({
  data() {
    return {
      routes,
      selectedKeys1: Vue.ref(["1"]),
      selectedKeys2: Vue.ref(["1"]),
      collapsed: Vue.ref(false),
      openKeys: Vue.ref(["sub1"]),
      menus: [{ to: "xIcon" }, { to: "xButton" }, { to: "xDataGrid" }]
    };
  },
  methods: {
    openStatsDialog() {
      UI.layer.open({
        type: UI.layer.IFRAME,
        maxmin: true,
        fullscreen: true,
        content: ["./assets/html/stats.html", ""]
      });
    }
  }
});
const AppLayout_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$1 = /* @__PURE__ */ Vue.createElementVNode("div", { class: "logo" }, null, -1);
const _hoisted_2$1 = { class: "flex middle" };
const _hoisted_3 = /* @__PURE__ */ Vue.createElementVNode("span", { class: "ml4" }, "\u5355\u7EC4\u4EF6", -1);
const _hoisted_4 = { class: "flex middle" };
const _hoisted_5 = /* @__PURE__ */ Vue.createElementVNode("span", { class: "ml4" }, "\u5355\u7EC4\u4EF6", -1);
const _hoisted_6 = { class: "flex middle" };
const _hoisted_7 = /* @__PURE__ */ Vue.createElementVNode("span", { class: "ml4" }, "\u9700\u8981\u5355\u72EC\u5F15\u7528", -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_menu_item = Vue.resolveComponent("a-menu-item");
  const _component_a_menu = Vue.resolveComponent("a-menu");
  const _component_a_layout_header = Vue.resolveComponent("a-layout-header");
  const _component_xIcon = Vue.resolveComponent("xIcon");
  const _component_RouterLink = Vue.resolveComponent("RouterLink");
  const _component_a_sub_menu = Vue.resolveComponent("a-sub-menu");
  const _component_a_layout_sider = Vue.resolveComponent("a-layout-sider");
  const _component_a_breadcrumb_item = Vue.resolveComponent("a-breadcrumb-item");
  const _component_a_breadcrumb = Vue.resolveComponent("a-breadcrumb");
  const _component_RouterView = Vue.resolveComponent("RouterView");
  const _component_a_layout_content = Vue.resolveComponent("a-layout-content");
  const _component_a_layout = Vue.resolveComponent("a-layout");
  return Vue.openBlock(), Vue.createBlock(_component_a_layout, null, {
    default: Vue.withCtx(() => [
      Vue.createVNode(_component_a_layout_header, { class: "header" }, {
        default: Vue.withCtx(() => [
          _hoisted_1$1,
          Vue.createVNode(_component_a_menu, {
            selectedKeys: _ctx.selectedKeys1,
            "onUpdate:selectedKeys": _cache[1] || (_cache[1] = ($event) => _ctx.selectedKeys1 = $event),
            theme: "dark",
            mode: "horizontal",
            style: { lineHeight: "64px" }
          }, {
            default: Vue.withCtx(() => [
              Vue.createVNode(_component_a_menu_item, { key: "1" }, {
                default: Vue.withCtx(() => [
                  Vue.createElementVNode("div", {
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.openStatsDialog && _ctx.openStatsDialog(...args))
                  }, "latest build\u306Elib\u5206\u6790\u62A5\u544A")
                ]),
                _: 1
              }),
              Vue.createVNode(_component_a_menu_item, { key: "2" }, {
                default: Vue.withCtx(() => [
                  Vue.createTextVNode("nav 2")
                ]),
                _: 1
              }),
              Vue.createVNode(_component_a_menu_item, { key: "3" }, {
                default: Vue.withCtx(() => [
                  Vue.createTextVNode("nav 3")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["selectedKeys"])
        ]),
        _: 1
      }),
      Vue.createVNode(_component_a_layout, null, {
        default: Vue.withCtx(() => [
          Vue.createVNode(_component_a_layout_sider, {
            width: "200",
            style: { "background": "#fff" }
          }, {
            default: Vue.withCtx(() => [
              Vue.createVNode(_component_a_menu, {
                selectedKeys: _ctx.selectedKeys2,
                "onUpdate:selectedKeys": _cache[2] || (_cache[2] = ($event) => _ctx.selectedKeys2 = $event),
                openKeys: _ctx.openKeys,
                "onUpdate:openKeys": _cache[3] || (_cache[3] = ($event) => _ctx.openKeys = $event),
                mode: "inline",
                style: { height: "100%", borderRight: 0 }
              }, {
                default: Vue.withCtx(() => [
                  Vue.createVNode(_component_a_sub_menu, { key: "sub1" }, {
                    title: Vue.withCtx(() => [
                      Vue.createElementVNode("span", _hoisted_2$1, [
                        Vue.createVNode(_component_xIcon, { icon: "UserOutlined" }),
                        _hoisted_3
                      ])
                    ]),
                    default: Vue.withCtx(() => [
                      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.routes.filter((i) => i.category == "inset"), (menu) => {
                        return Vue.openBlock(), Vue.createBlock(_component_a_menu_item, {
                          key: menu.path
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(_component_RouterLink, {
                              to: menu.path
                            }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(menu.path), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_a_sub_menu, { key: "sub1" }, {
                    title: Vue.withCtx(() => [
                      Vue.createElementVNode("span", _hoisted_4, [
                        Vue.createVNode(_component_xIcon, { icon: "UserOutlined" }),
                        _hoisted_5
                      ])
                    ]),
                    default: Vue.withCtx(() => [
                      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.routes.filter((i) => i.category == "inset"), (menu) => {
                        return Vue.openBlock(), Vue.createBlock(_component_a_menu_item, {
                          key: menu.path
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(_component_RouterLink, {
                              to: menu.path
                            }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(menu.path), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_a_sub_menu, { key: "sub2" }, {
                    title: Vue.withCtx(() => [
                      Vue.createElementVNode("span", _hoisted_6, [
                        Vue.createVNode(_component_xIcon, { icon: "UserOutlined" }),
                        _hoisted_7
                      ])
                    ]),
                    default: Vue.withCtx(() => [
                      (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(_ctx.routes.filter((i) => i.category == "plugin"), (menu) => {
                        return Vue.openBlock(), Vue.createBlock(_component_a_menu_item, {
                          key: menu.path
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(_component_RouterLink, {
                              to: menu.path
                            }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(menu.path), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["selectedKeys", "openKeys"])
            ]),
            _: 1
          }),
          Vue.createVNode(_component_a_layout, { style: { "padding": "0 24px 24px" } }, {
            default: Vue.withCtx(() => [
              Vue.createVNode(_component_a_breadcrumb, { style: { "margin": "16px 0" } }, {
                default: Vue.withCtx(() => [
                  Vue.createVNode(_component_a_breadcrumb_item, null, {
                    default: Vue.withCtx(() => [
                      Vue.createTextVNode("Home")
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_a_breadcrumb_item, null, {
                    default: Vue.withCtx(() => [
                      Vue.createTextVNode("List")
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_a_breadcrumb_item, null, {
                    default: Vue.withCtx(() => [
                      Vue.createTextVNode("App")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              Vue.createVNode(_component_a_layout_content, {
                style: {
                  background: "#fff",
                  padding: "24px",
                  margin: 0,
                  minHeight: "280px"
                }
              }, {
                default: Vue.withCtx(() => [
                  Vue.createVNode(_component_RouterView)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);
const _sfc_main$2 = /* @__PURE__ */ Vue.defineComponent({
  __name: "App",
  setup(__props) {
    $("#app").removeClass("x-loading");
    return (_ctx, _cache) => {
      return Vue.openBlock(), Vue.createBlock(AppLayout);
    };
  }
});
const App_vue_vue_type_style_index_0_scoped_ac147fcf_lang = "";
const App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ac147fcf"]]);
const marked = function (root) {
  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noop,
    table: noop,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}\.)/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
  block.list = edit(block.list).replace(/bull/g, block.bullet).replace(
    "hr",
    "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
  ).replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
  block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace(
    "attribute",
    / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
  ).getRegex();
  block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
  block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
  block.normal = merge({}, block);
  block.gfm = merge({}, block.normal, {
    nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
    table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
  });
  block.pedantic = merge({}, block.normal, {
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", block._comment).replace(
      /tag/g,
      "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
    ).getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    fences: noop,
    paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  });
  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options || marked2.defaults;
    this.rules = block.normal;
    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      this.rules = block.gfm;
    }
  }
  Lexer.rules = block;
  Lexer.lex = function (src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };
  Lexer.prototype.lex = function (src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
    return this.token(src, true);
  };
  Lexer.prototype.token = function (src, top) {
    src = src.replace(/^ +$/gm, "");
    var next, loose, cap, bull, b, item, listStart, listItems, t, space, i, tag, l, isordered, istask, ischecked;
    while (src) {
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: "space"
          });
        }
      }
      if (cap = this.rules.code.exec(src)) {
        var lastToken = this.tokens[this.tokens.length - 1];
        src = src.substring(cap[0].length);
        if (lastToken && lastToken.type === "paragraph") {
          lastToken.text += "\n" + cap[0].trimRight();
        } else {
          cap = cap[0].replace(/^ {4}/gm, "");
          this.tokens.push({
            type: "code",
            codeBlockStyle: "indented",
            text: !this.options.pedantic ? rtrim(cap, "\n") : cap
          });
        }
        continue;
      }
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "code",
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: cap[3] || ""
        });
        continue;
      }
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }
      if (cap = this.rules.nptable.exec(src)) {
        item = {
          type: "table",
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(item.cells[i], item.header.length);
          }
          this.tokens.push(item);
          continue;
        }
      }
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "hr"
        });
        continue;
      }
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "blockquote_start"
        });
        cap = cap[0].replace(/^ *> ?/gm, "");
        this.token(cap, top);
        this.tokens.push({
          type: "blockquote_end"
        });
        continue;
      }
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        isordered = bull.length > 1;
        listStart = {
          type: "list_start",
          ordered: isordered,
          start: isordered ? +bull : "",
          loose: false
        };
        this.tokens.push(listStart);
        cap = cap[0].match(this.rules.item);
        listItems = [];
        next = false;
        l = cap.length;
        i = 0;
        for (; i < l; i++) {
          item = cap[i];
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, "");
          if (~item.indexOf("\n ")) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
          }
          if (i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
              src = cap.slice(i + 1).join("\n") + src;
              i = l - 1;
            }
          }
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === "\n";
            if (!loose)
              loose = next;
          }
          if (loose) {
            listStart.loose = true;
          }
          istask = /^\[[ xX]\] /.test(item);
          ischecked = void 0;
          if (istask) {
            ischecked = item[1] !== " ";
            item = item.replace(/^\[[ xX]\] +/, "");
          }
          t = {
            type: "list_item_start",
            task: istask,
            checked: ischecked,
            loose
          };
          listItems.push(t);
          this.tokens.push(t);
          this.token(item, false);
          this.tokens.push({
            type: "list_item_end"
          });
        }
        if (listStart.loose) {
          l = listItems.length;
          i = 0;
          for (; i < l; i++) {
            listItems[i].loose = true;
          }
        }
        this.tokens.push({
          type: "list_end"
        });
        continue;
      }
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ? "paragraph" : "html",
          pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
        });
        continue;
      }
      if (top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[3])
          cap[3] = cap[3].substring(1, cap[3].length - 1);
        tag = cap[1].toLowerCase().replace(/\s+/g, " ");
        if (!this.tokens.links[tag]) {
          this.tokens.links[tag] = {
            href: cap[2],
            title: cap[3]
          };
        }
        continue;
      }
      if (cap = this.rules.table.exec(src)) {
        item = {
          type: "table",
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          src = src.substring(cap[0].length);
          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = splitCells(
              item.cells[i].replace(/^ *\| *| *\| *$/g, ""),
              item.header.length
            );
          }
          this.tokens.push(item);
          continue;
        }
      }
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1]
        });
        continue;
      }
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "paragraph",
          text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
        });
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "text",
          text: cap[0]
        });
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return this.tokens;
  };
  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noop,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
    em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noop,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
  };
  inline._punctuation = `!"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~`;
  inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit(inline.tag).replace("comment", block._comment).replace("attribute", inline._attribute).getRegex();
  inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
  inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
  inline.normal = merge({}, inline);
  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
  });
  inline.gfm = merge({}, inline.normal, {
    escape: edit(inline.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
  inline.breaks = merge({}, inline.gfm, {
    br: edit(inline.br).replace("{2,}", "*").getRegex(),
    text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  });
  function InlineLexer(links, options) {
    this.options = options || marked2.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;
    if (!this.links) {
      throw new Error("Tokens array requires a `links` property.");
    }
    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
  }
  InlineLexer.rules = inline;
  InlineLexer.output = function (src, links, options) {
    var inline2 = new InlineLexer(links, options);
    return inline2.output(src);
  };
  InlineLexer.prototype.output = function (src) {
    var out = "", link, text, href, title, cap, prevCapZero;
    while (src) {
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape(cap[1]);
        continue;
      }
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = true;
        } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.inRawBlock = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
        continue;
      }
      if (cap = this.rules.link.exec(src)) {
        var lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          var linkLen = 4 + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];
        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = "";
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
        out += this.outputLink(cap, {
          href: InlineLexer.escapes(href),
          title: InlineLexer.escapes(title)
        });
        this.inLink = false;
        continue;
      }
      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, " ");
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(
          this.output(cap[4] || cap[3] || cap[2] || cap[1])
        );
        continue;
      }
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(
          this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1])
        );
        continue;
      }
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2].trim(), true));
        continue;
      }
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === "@") {
          text = escape(this.mangle(cap[1]));
          href = "mailto:" + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        if (cap[2] === "@") {
          text = escape(cap[0]);
          href = "mailto:" + text;
        } else {
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape(cap[0]);
          if (cap[1] === "www.") {
            href = "http://" + text;
          } else {
            href = text;
          }
        }
        src = src.substring(cap[0].length);
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        if (this.inRawBlock) {
          out += this.renderer.text(
            this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
          );
        } else {
          out += this.renderer.text(escape(this.smartypants(cap[0])));
        }
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return out;
  };
  InlineLexer.escapes = function (text) {
    return text ? text.replace(InlineLexer.rules._escapes, "$1") : text;
  };
  InlineLexer.prototype.outputLink = function (cap, link) {
    var href = link.href, title = link.title ? escape(link.title) : null;
    return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
  };
  InlineLexer.prototype.smartypants = function (text) {
    if (!this.options.smartypants)
      return text;
    return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
  };
  InlineLexer.prototype.mangle = function (text) {
    if (!this.options.mangle)
      return text;
    var out = "", l = text.length, i = 0, ch;
    for (; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = "x" + ch.toString(16);
      }
      out += "&#" + ch + ";";
    }
    return out;
  };
  function Renderer(options) {
    this.options = options || marked2.defaults;
  }
  Renderer.prototype.code = function (code, infostring, escaped) {
    var lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>";
    }
    return '<pre><code class="' + marked2.options.langClass + " " + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  };
  Renderer.prototype.blockquote = function (quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  };
  Renderer.prototype.html = function (html) {
    return html;
  };
  Renderer.prototype.heading = function (text, level, raw, slugger) {
    if (this.options.headerIds) {
      return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
    }
    return "<h" + level + ">" + text + "</h" + level + ">\n";
  };
  Renderer.prototype.hr = function () {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  };
  Renderer.prototype.list = function (body, ordered, start) {
    var type2 = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type2 + startatt + ">\n" + body + "</" + type2 + ">\n";
  };
  Renderer.prototype.listitem = function (text) {
    return "<li>" + text + "</li>\n";
  };
  Renderer.prototype.checkbox = function (checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  };
  Renderer.prototype.paragraph = function (text) {
    return "<p>" + text + "</p>\n";
  };
  Renderer.prototype.table = function (header, body) {
    if (body)
      body = "<tbody>" + body + "</tbody>";
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  };
  Renderer.prototype.tablerow = function (content) {
    return "<tr>\n" + content + "</tr>\n";
  };
  Renderer.prototype.tablecell = function (content, flags) {
    var type2 = flags.header ? "th" : "td";
    var tag = flags.align ? "<" + type2 + ' align="' + flags.align + '">' : "<" + type2 + ">";
    return tag + content + "</" + type2 + ">\n";
  };
  Renderer.prototype.strong = function (text) {
    return "<strong>" + text + "</strong>";
  };
  Renderer.prototype.em = function (text) {
    return "<em>" + text + "</em>";
  };
  Renderer.prototype.codespan = function (text) {
    return "<code>" + text + "</code>";
  };
  Renderer.prototype.br = function () {
    return this.options.xhtml ? "<br/>" : "<br>";
  };
  Renderer.prototype.del = function (text) {
    return "<del>" + text + "</del>";
  };
  Renderer.prototype.link = function (href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    var regEx = new RegExp("^@@/static", "g");
    if (regEx.test(href)) {
      href = href.substring(3);
    } else {
      href = escape(href);
    }
    var out = `<a class='link' href="` + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += " target='_blank'>" + text + "</a>";
    return out;
  };
  Renderer.prototype.image = function (href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  };
  Renderer.prototype.text = function (text) {
    return text;
  };
  function TextRenderer() {
  }
  TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function (text) {
    return text;
  };
  TextRenderer.prototype.link = TextRenderer.prototype.image = function (href, title, text) {
    return "" + text;
  };
  TextRenderer.prototype.br = function () {
    return "";
  };
  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked2.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.slugger = new Slugger();
  }
  Parser.parse = function (src, options) {
    var parser = new Parser(options);
    return parser.parse(src);
  };
  Parser.prototype.parse = function (src) {
    this.inline = new InlineLexer(src.links, this.options);
    this.inlineText = new InlineLexer(
      src.links,
      merge({}, this.options, {
        renderer: new TextRenderer()
      })
    );
    this.tokens = src.reverse();
    var out = "";
    while (this.next()) {
      out += this.tok();
    }
    return out;
  };
  Parser.prototype.next = function () {
    this.token = this.tokens.pop();
    return this.token;
  };
  Parser.prototype.peek = function () {
    return this.tokens[this.tokens.length - 1] || 0;
  };
  Parser.prototype.parseText = function () {
    var body = this.token.text;
    while (this.peek().type === "text") {
      body += "\n" + this.next().text;
    }
    return this.inline.output(body);
  };
  Parser.prototype.tok = function () {
    switch (this.token.type) {
      case "space": {
        return "";
      }
      case "hr": {
        return this.renderer.hr();
      }
      case "heading": {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          unescape(this.inlineText.output(this.token.text)),
          this.slugger
        );
      }
      case "code": {
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped
        );
      }
      case "table": {
        var header = "", body = "", i, row, cell, j;
        cell = "";
        for (i = 0; i < this.token.header.length; i++) {
          cell += this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            {
              header: true,
              align: this.token.align[i]
            }
          );
        }
        header += this.renderer.tablerow(cell);
        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];
          cell = "";
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(this.inline.output(row[j]), {
              header: false,
              align: this.token.align[j]
            });
          }
          body += this.renderer.tablerow(cell);
        }
        return this.renderer.table(header, body);
      }
      case "blockquote_start": {
        body = "";
        while (this.next().type !== "blockquote_end") {
          body += this.tok();
        }
        return this.renderer.blockquote(body);
      }
      case "list_start": {
        body = "";
        var ordered = this.token.ordered, start = this.token.start;
        while (this.next().type !== "list_end") {
          body += this.tok();
        }
        return this.renderer.list(body, ordered, start);
      }
      case "list_item_start": {
        body = "";
        var loose = this.token.loose;
        var checked = this.token.checked;
        var task = this.token.task;
        if (this.token.task) {
          if (loose) {
            if (this.peek().type === "text") {
              var nextToken = this.peek();
              nextToken.text = this.renderer.checkbox(checked) + " " + nextToken.text;
            } else {
              this.tokens.push({
                type: "text",
                text: this.renderer.checkbox(checked)
              });
            }
          } else {
            body += this.renderer.checkbox(checked);
          }
        }
        while (this.next().type !== "list_item_end") {
          body += !loose && this.token.type === "text" ? this.parseText() : this.tok();
        }
        return this.renderer.listitem(body, task, checked);
      }
      case "html": {
        return this.renderer.html(this.token.text);
      }
      case "paragraph": {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case "text": {
        return this.renderer.paragraph(this.parseText());
      }
      default: {
        var errMsg = 'Token with "' + this.token.type + '" type was not found.';
        if (this.options.silent) {
          console.log(errMsg);
        } else {
          throw new Error(errMsg);
        }
      }
    }
  };
  function Slugger() {
    this.seen = {};
  }
  Slugger.prototype.slug = function (value) {
    var slug = value.toLowerCase().trim().replace(
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
      ""
    ).replace(/\s/g, "-");
    if (this.seen.hasOwnProperty(slug)) {
      var originalSlug = slug;
      do {
        this.seen[originalSlug]++;
        slug = originalSlug + "-" + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }
    this.seen[slug] = 0;
    return slug;
  };
  function escape(html, encode) {
    if (encode) {
      if (escape.escapeTest.test(html)) {
        return html.replace(escape.escapeReplace, function (ch) {
          return escape.replacements[ch];
        });
      }
    } else {
      if (escape.escapeTestNoEncode.test(html)) {
        return html.replace(escape.escapeReplaceNoEncode, function (ch) {
          return escape.replacements[ch];
        });
      }
    }
    return html;
  }
  escape.escapeTest = /[&<>"']/;
  escape.escapeReplace = /[&<>"']/g;
  escape.replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  function unescape(html) {
    return html.replace(
      /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
      function (_2, n) {
        n = n.toLowerCase();
        if (n === "colon")
          return ":";
        if (n.charAt(0) === "#") {
          return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return "";
      }
    );
  }
  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || "";
    return {
      replace: function (name, val) {
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, "$1");
        regex = regex.replace(name, val);
        return this;
      },
      getRegex: function () {
        return new RegExp(regex, opt);
      }
    };
  }
  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase();
      } catch (e) {
        return null;
      }
      if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
        return null;
      }
    }
    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return href;
  }
  function resolveUrl(base, href) {
    if (!baseUrls[" " + base]) {
      if (/^[^:]+:\/*[^/]*$/.test(base)) {
        baseUrls[" " + base] = base + "/";
      } else {
        baseUrls[" " + base] = rtrim(base, "/", true);
      }
    }
    base = baseUrls[" " + base];
    var relativeBase = base.indexOf(":") === -1;
    if (href.slice(0, 2) === "//") {
      if (relativeBase) {
        return href;
      }
      return base.replace(/^([^:]+:)[\s\S]*$/, "$1") + href;
    } else if (href.charAt(0) === "/") {
      if (relativeBase) {
        return href;
      }
      return base.replace(/^([^:]+:\/*[^/]*)[\s\S]*$/, "$1") + href;
    } else {
      return base + href;
    }
  }
  var baseUrls = {};
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function noop() {
  }
  noop.exec = noop;
  function merge(obj) {
    var i = 1, target, key;
    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
    return obj;
  }
  function splitCells(tableRow, count) {
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false, curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(/ \|/), i = 0;
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    if (str.length === 0) {
      return "";
    }
    var suffLen = 0;
    while (suffLen < str.length) {
      var currChar = str.charAt(str.length - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.substr(0, str.length - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    var level = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn(
        "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
      );
    }
  }
  function marked2(src, opt, callback) {
    if (typeof src === "undefined" || src === null) {
      throw new Error("marked(): input parameter is undefined or null");
    }
    if (typeof src !== "string") {
      throw new Error(
        "marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"
      );
    }
    if (callback || typeof opt === "function") {
      if (!callback) {
        callback = opt;
        opt = null;
      }
      opt = merge({}, marked2.defaults, opt || {});
      checkSanitizeDeprecation(opt);
      var highlight = opt.highlight, tokens, pending, i = 0;
      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }
      pending = tokens.length;
      var done = function (err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }
        var out;
        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!pending)
        return done();
      for (; i < tokens.length; i++) {
        (function (token) {
          if (token.type !== "code") {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function (err, code) {
            if (err)
              return done(err);
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }
      return;
    }
    try {
      if (opt)
        opt = merge({}, marked2.defaults, opt);
      checkSanitizeDeprecation(opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if ((opt || marked2.defaults).silent) {
        return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      }
      throw e;
    }
  }
  marked2.options = marked2.setOptions = function (opt) {
    merge(marked2.defaults, opt);
    return marked2;
  };
  marked2.getDefaults = function () {
    return {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: "",
      highlight: null,
      langPrefix: "language-",
      mangle: true,
      pedantic: false,
      renderer: new Renderer(),
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      xhtml: false
    };
  };
  marked2.defaults = marked2.getDefaults();
  marked2.Parser = Parser;
  marked2.parser = Parser.parse;
  marked2.Renderer = Renderer;
  marked2.TextRenderer = TextRenderer;
  marked2.Lexer = Lexer;
  marked2.lexer = Lexer.lex;
  marked2.InlineLexer = InlineLexer;
  marked2.inlineLexer = InlineLexer.output;
  marked2.Slugger = Slugger;
  marked2.parse = marked2;
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = marked2;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return marked2;
    });
  } else {
    root.marked = marked2;
  }
  return marked2;
}(typeof window !== "undefined" ? window : global);
var hljs = function () {
  function e(t2) {
    return t2 instanceof Map ? t2.clear = t2.delete = t2.set = () => {
      throw Error("map is read-only");
    } : t2 instanceof Set && (t2.add = t2.clear = t2.delete = () => {
      throw Error("set is read-only");
    }), Object.freeze(t2), Object.getOwnPropertyNames(t2).forEach((n2) => {
      var s2 = t2[n2];
      "object" != typeof s2 || Object.isFrozen(s2) || e(s2);
    }), t2;
  }
  var t = e, n = e;
  t.default = n;
  class s {
    constructor(e2) {
      void 0 === e2.data && (e2.data = {}), this.data = e2.data;
    }
    ignoreMatch() {
      this.ignore = true;
    }
  }
  function r(e2) {
    return e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function a(e2, ...t2) {
    const n2 = /* @__PURE__ */ Object.create(null);
    for (const t3 in e2)
      n2[t3] = e2[t3];
    return t2.forEach((e3) => {
      for (const t3 in e3)
        n2[t3] = e3[t3];
    }), n2;
  }
  function i(e2) {
    return e2.nodeName.toLowerCase();
  }
  var o = Object.freeze({
    __proto__: null,
    escapeHTML: r,
    inherit: a,
    nodeStream: (e2) => {
      const t2 = [];
      return function e3(n2, s2) {
        for (let r2 = n2.firstChild; r2; r2 = r2.nextSibling)
          3 === r2.nodeType ? s2 += r2.nodeValue.length : 1 === r2.nodeType && (t2.push({
            event: "start",
            offset: s2,
            node: r2
          }), s2 = e3(r2, s2), i(r2).match(/br|hr|img|input/) || t2.push({
            event: "stop",
            offset: s2,
            node: r2
          }));
        return s2;
      }(e2, 0), t2;
    },
    mergeStreams: (e2, t2, n2) => {
      let s2 = 0, a2 = "";
      const o2 = [];
      function l2() {
        return e2.length && t2.length ? e2[0].offset !== t2[0].offset ? e2[0].offset < t2[0].offset ? e2 : t2 : "start" === t2[0].event ? e2 : t2 : e2.length ? e2 : t2;
      }
      function c2(e3) {
        a2 += "<" + i(e3) + [].map.call(e3.attributes, (e4) => " " + e4.nodeName + '="' + r(e4.value) + '"').join("") + ">";
      }
      function u2(e3) {
        a2 += "</" + i(e3) + ">";
      }
      function g2(e3) {
        ("start" === e3.event ? c2 : u2)(e3.node);
      }
      for (; e2.length || t2.length;) {
        let t3 = l2();
        if (a2 += r(n2.substring(s2, t3[0].offset)), s2 = t3[0].offset, t3 === e2) {
          o2.reverse().forEach(u2);
          do {
            g2(t3.splice(0, 1)[0]), t3 = l2();
          } while (t3 === e2 && t3.length && t3[0].offset === s2);
          o2.reverse().forEach(c2);
        } else
          "start" === t3[0].event ? o2.push(t3[0].node) : o2.pop(), g2(t3.splice(0, 1)[0]);
      }
      return a2 + r(n2.substr(s2));
    }
  });
  const l = (e2) => !!e2.kind;
  class c {
    constructor(e2, t2) {
      this.buffer = "", this.classPrefix = t2.classPrefix, e2.walk(this);
    }
    addText(e2) {
      this.buffer += r(e2);
    }
    openNode(e2) {
      if (!l(e2))
        return;
      let t2 = e2.kind;
      e2.sublanguage || (t2 = `${this.classPrefix}${t2}`), this.span(t2);
    }
    closeNode(e2) {
      l(e2) && (this.buffer += "</span>");
    }
    value() {
      return this.buffer;
    }
    span(e2) {
      this.buffer += `<span class="${e2}">`;
    }
  }
  class u {
    constructor() {
      this.rootNode = {
        children: []
      }, this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(e2) {
      this.top.children.push(e2);
    }
    openNode(e2) {
      const t2 = { kind: e2, children: [] };
      this.add(t2), this.stack.push(t2);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode();)
        ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(e2) {
      return this.constructor._walk(e2, this.rootNode);
    }
    static _walk(e2, t2) {
      return "string" == typeof t2 ? e2.addText(t2) : t2.children && (e2.openNode(t2), t2.children.forEach((t3) => this._walk(e2, t3)), e2.closeNode(t2)), e2;
    }
    static _collapse(e2) {
      "string" != typeof e2 && e2.children && (e2.children.every((e3) => "string" == typeof e3) ? e2.children = [e2.children.join("")] : e2.children.forEach((e3) => {
        u._collapse(e3);
      }));
    }
  }
  class g extends u {
    constructor(e2) {
      super(), this.options = e2;
    }
    addKeyword(e2, t2) {
      "" !== e2 && (this.openNode(t2), this.addText(e2), this.closeNode());
    }
    addText(e2) {
      "" !== e2 && this.add(e2);
    }
    addSublanguage(e2, t2) {
      const n2 = e2.root;
      n2.kind = t2, n2.sublanguage = true, this.add(n2);
    }
    toHTML() {
      return new c(this, this.options).value();
    }
    finalize() {
      return true;
    }
  }
  function d(e2) {
    return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
  }
  const h = "[a-zA-Z]\\w*", f = "[a-zA-Z_]\\w*", p = "\\b\\d+(\\.\\d+)?", m = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", b = "\\b(0b[01]+)", x = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, E = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [x]
  }, v = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [x]
  }, _2 = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, w = (e2, t2, n2 = {}) => {
    const s2 = a({ className: "comment", begin: e2, end: t2, contains: [] }, n2);
    return s2.contains.push(_2), s2.contains.push({
      className: "doctag",
      begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
      relevance: 0
    }), s2;
  }, N = w("//", "$"), y = w("/\\*", "\\*/"), R = w("#", "$");
  var k = Object.freeze({
    __proto__: null,
    IDENT_RE: h,
    UNDERSCORE_IDENT_RE: f,
    NUMBER_RE: p,
    C_NUMBER_RE: m,
    BINARY_NUMBER_RE: b,
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e2 = {}) => {
      const t2 = /^#![ ]*\//;
      return e2.binary && (e2.begin = ((...e3) => e3.map((e4) => d(e4)).join(""))(
        t2,
        /.*\b/,
        e2.binary,
        /\b.*/
      )), a(
        {
          className: "meta",
          begin: t2,
          end: /$/,
          relevance: 0,
          "on:begin": (e3, t3) => {
            0 !== e3.index && t3.ignoreMatch();
          }
        },
        e2
      );
    },
    BACKSLASH_ESCAPE: x,
    APOS_STRING_MODE: E,
    QUOTE_STRING_MODE: v,
    PHRASAL_WORDS_MODE: _2,
    COMMENT: w,
    C_LINE_COMMENT_MODE: N,
    C_BLOCK_COMMENT_MODE: y,
    HASH_COMMENT_MODE: R,
    NUMBER_MODE: { className: "number", begin: p, relevance: 0 },
    C_NUMBER_MODE: { className: "number", begin: m, relevance: 0 },
    BINARY_NUMBER_MODE: { className: "number", begin: b, relevance: 0 },
    CSS_NUMBER_MODE: {
      className: "number",
      begin: p + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    REGEXP_MODE: {
      begin: /(?=\/[^/\n]*\/)/,
      contains: [
        {
          className: "regexp",
          begin: /\//,
          end: /\/[gimuy]*/,
          illegal: /\n/,
          contains: [x, { begin: /\[/, end: /\]/, relevance: 0, contains: [x] }]
        }
      ]
    },
    TITLE_MODE: { className: "title", begin: h, relevance: 0 },
    UNDERSCORE_TITLE_MODE: { className: "title", begin: f, relevance: 0 },
    METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*",
      relevance: 0
    },
    END_SAME_AS_BEGIN: (e2) => Object.assign(e2, {
      "on:begin": (e3, t2) => {
        t2.data._beginMatch = e3[1];
      },
      "on:end": (e3, t2) => {
        t2.data._beginMatch !== e3[1] && t2.ignoreMatch();
      }
    })
  });
  const M = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    "list",
    "value"
  ];
  function O(e2) {
    function t2(t3, n3) {
      return RegExp(
        d(t3),
        "m" + (e2.case_insensitive ? "i" : "") + (n3 ? "g" : "")
      );
    }
    class n2 {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      addRule(e3, t3) {
        t3.position = this.position++, this.matchIndexes[this.matchAt] = t3, this.regexes.push([t3, e3]), this.matchAt += ((e4) => RegExp(e4.toString() + "|").exec("").length - 1)(e3) + 1;
      }
      compile() {
        0 === this.regexes.length && (this.exec = () => null);
        const e3 = this.regexes.map((e4) => e4[1]);
        this.matcherRe = t2(
          ((e4, t3 = "|") => {
            const n3 = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
            let s3 = 0, r3 = "";
            for (let a2 = 0; a2 < e4.length; a2++) {
              s3 += 1;
              const i2 = s3;
              let o2 = d(e4[a2]);
              for (a2 > 0 && (r3 += t3), r3 += "("; o2.length > 0;) {
                const e5 = n3.exec(o2);
                if (null == e5) {
                  r3 += o2;
                  break;
                }
                r3 += o2.substring(0, e5.index), o2 = o2.substring(e5.index + e5[0].length), "\\" === e5[0][0] && e5[1] ? r3 += "\\" + (Number(e5[1]) + i2) : (r3 += e5[0], "(" === e5[0] && s3++);
              }
              r3 += ")";
            }
            return r3;
          })(e3),
          true
        ), this.lastIndex = 0;
      }
      exec(e3) {
        this.matcherRe.lastIndex = this.lastIndex;
        const t3 = this.matcherRe.exec(e3);
        if (!t3)
          return null;
        const n3 = t3.findIndex((e4, t4) => t4 > 0 && void 0 !== e4), s3 = this.matchIndexes[n3];
        return t3.splice(0, n3), Object.assign(t3, s3);
      }
    }
    class s2 {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      getMatcher(e3) {
        if (this.multiRegexes[e3])
          return this.multiRegexes[e3];
        const t3 = new n2();
        return this.rules.slice(e3).forEach(([e4, n3]) => t3.addRule(e4, n3)), t3.compile(), this.multiRegexes[e3] = t3, t3;
      }
      resumingScanAtSamePosition() {
        return 0 !== this.regexIndex;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      addRule(e3, t3) {
        this.rules.push([e3, t3]), "begin" === t3.type && this.count++;
      }
      exec(e3) {
        const t3 = this.getMatcher(this.regexIndex);
        t3.lastIndex = this.lastIndex;
        let n3 = t3.exec(e3);
        if (this.resumingScanAtSamePosition())
          if (n3 && n3.index === this.lastIndex)
            ;
          else {
            const t4 = this.getMatcher(0);
            t4.lastIndex = this.lastIndex + 1, n3 = t4.exec(e3);
          }
        return n3 && (this.regexIndex += n3.position + 1, this.regexIndex === this.count && this.considerAll()), n3;
      }
    }
    function r2(e3, t3) {
      "." === e3.input[e3.index - 1] && t3.ignoreMatch();
    }
    if (e2.contains && e2.contains.includes("self"))
      throw Error(
        "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
      );
    return e2.classNameAliases = a(e2.classNameAliases || {}), function n3(i2, o2) {
      const l2 = i2;
      if (i2.compiled)
        return l2;
      i2.compiled = true, i2.__beforeBegin = null, i2.keywords = i2.keywords || i2.beginKeywords;
      let c2 = null;
      if ("object" == typeof i2.keywords && (c2 = i2.keywords.$pattern, delete i2.keywords.$pattern), i2.keywords && (i2.keywords = ((e3, t3) => {
        const n4 = {};
        return "string" == typeof e3 ? s3("keyword", e3) : Object.keys(e3).forEach((t4) => {
          s3(t4, e3[t4]);
        }), n4;
        function s3(e4, s4) {
          t3 && (s4 = s4.toLowerCase()), s4.split(" ").forEach((t4) => {
            const s5 = t4.split("|");
            n4[s5[0]] = [e4, A(s5[0], s5[1])];
          });
        }
      })(i2.keywords, e2.case_insensitive)), i2.lexemes && c2)
        throw Error(
          "ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) "
        );
      return l2.keywordPatternRe = t2(i2.lexemes || c2 || /\w+/, true), o2 && (i2.beginKeywords && (i2.begin = "\\b(" + i2.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", i2.__beforeBegin = r2), i2.begin || (i2.begin = /\B|\b/), l2.beginRe = t2(i2.begin), i2.endSameAsBegin && (i2.end = i2.begin), i2.end || i2.endsWithParent || (i2.end = /\B|\b/), i2.end && (l2.endRe = t2(i2.end)), l2.terminator_end = d(i2.end) || "", i2.endsWithParent && o2.terminator_end && (l2.terminator_end += (i2.end ? "|" : "") + o2.terminator_end)), i2.illegal && (l2.illegalRe = t2(i2.illegal)), void 0 === i2.relevance && (i2.relevance = 1), i2.contains || (i2.contains = []), i2.contains = [].concat(
        ...i2.contains.map(
          (e3) => ((e4) => (e4.variants && !e4.cached_variants && (e4.cached_variants = e4.variants.map(
            (t3) => a(
              e4,
              {
                variants: null
              },
              t3
            )
          )), e4.cached_variants ? e4.cached_variants : L(e4) ? a(e4, {
            starts: e4.starts ? a(e4.starts) : null
          }) : Object.isFrozen(e4) ? a(e4) : e4))("self" === e3 ? i2 : e3)
        )
      ), i2.contains.forEach((e3) => {
        n3(e3, l2);
      }), i2.starts && n3(i2.starts, o2), l2.matcher = ((e3) => {
        const t3 = new s2();
        return e3.contains.forEach(
          (e4) => t3.addRule(e4.begin, { rule: e4, type: "begin" })
        ), e3.terminator_end && t3.addRule(e3.terminator_end, { type: "end" }), e3.illegal && t3.addRule(e3.illegal, { type: "illegal" }), t3;
      })(l2), l2;
    }(e2);
  }
  function L(e2) {
    return !!e2 && (e2.endsWithParent || L(e2.starts));
  }
  function A(e2, t2) {
    return t2 ? Number(t2) : ((e3) => M.includes(e3.toLowerCase()))(e2) ? 0 : 1;
  }
  function j(e2) {
    const t2 = {
      props: ["language", "code", "autodetect"],
      data: () => ({ detectedLanguage: "", unknownLanguage: false }),
      computed: {
        className() {
          return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage;
        },
        highlighted() {
          if (!this.autoDetect && !e2.getLanguage(this.language))
            return console.warn(
              `The language "${this.language}" you specified could not be found.`
            ), this.unknownLanguage = true, r(this.code);
          let t3;
          return this.autoDetect ? (t3 = e2.highlightAuto(this.code), this.detectedLanguage = t3.language) : (t3 = e2.highlight(
            this.language,
            this.code,
            this.ignoreIllegals
          ), this.detectedLanguage = this.language), t3.value;
        },
        autoDetect() {
          return !(this.language && (e3 = this.autodetect, !e3 && "" !== e3));
          var e3;
        },
        ignoreIllegals: () => true
      },
      render(e3) {
        return e3("pre", {}, [
          e3("code", {
            class: this.className,
            domProps: { innerHTML: this.highlighted }
          })
        ]);
      }
    };
    return {
      Component: t2,
      VuePlugin: {
        install(e3) {
          e3.component("highlightjs", t2);
        }
      }
    };
  }
  const I = r, S = a, { nodeStream: T, mergeStreams: B } = o, P = Symbol("nomatch");
  return ((e2) => {
    const n2 = [], r2 = /* @__PURE__ */ Object.create(null), a2 = /* @__PURE__ */ Object.create(null), i2 = [];
    let o2 = true;
    const l2 = /(^(<[^>]+>|\t|)+|\n)/gm, c2 = "Could not find the language '{}', did you forget to load/include a language module?", u2 = {
      disableAutodetect: true,
      name: "Plain text",
      contains: []
    };
    let d2 = {
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: false,
      languages: null,
      __emitter: g
    };
    function h2(e3) {
      return d2.noHighlightRe.test(e3);
    }
    function f2(e3, t2, n3, s2) {
      const r3 = { code: t2, language: e3 };
      N2("before:highlight", r3);
      const a3 = r3.result ? r3.result : p2(r3.language, r3.code, n3, s2);
      return a3.code = r3.code, N2("after:highlight", a3), a3;
    }
    function p2(e3, t2, n3, a3) {
      const i3 = t2;
      function l3(e4, t3) {
        const n4 = _3.case_insensitive ? t3[0].toLowerCase() : t3[0];
        return Object.prototype.hasOwnProperty.call(e4.keywords, n4) && e4.keywords[n4];
      }
      function u3() {
        null != y2.subLanguage ? (() => {
          if ("" === M2)
            return;
          let e4 = null;
          if ("string" == typeof y2.subLanguage) {
            if (!r2[y2.subLanguage])
              return void k2.addText(M2);
            e4 = p2(y2.subLanguage, M2, true, R2[y2.subLanguage]), R2[y2.subLanguage] = e4.top;
          } else
            e4 = m2(M2, y2.subLanguage.length ? y2.subLanguage : null);
          y2.relevance > 0 && (L2 += e4.relevance), k2.addSublanguage(e4.emitter, e4.language);
        })() : (() => {
          if (!y2.keywords)
            return void k2.addText(M2);
          let e4 = 0;
          y2.keywordPatternRe.lastIndex = 0;
          let t3 = y2.keywordPatternRe.exec(M2), n4 = "";
          for (; t3;) {
            n4 += M2.substring(e4, t3.index);
            const s2 = l3(y2, t3);
            if (s2) {
              const [e5, r3] = s2;
              k2.addText(n4), n4 = "", L2 += r3;
              const a4 = _3.classNameAliases[e5] || e5;
              k2.addKeyword(t3[0], a4);
            } else
              n4 += t3[0];
            e4 = y2.keywordPatternRe.lastIndex, t3 = y2.keywordPatternRe.exec(M2);
          }
          n4 += M2.substr(e4), k2.addText(n4);
        })(), M2 = "";
      }
      function g2(e4) {
        return e4.className && k2.openNode(_3.classNameAliases[e4.className] || e4.className), y2 = Object.create(e4, { parent: { value: y2 } }), y2;
      }
      function h3(e4, t3, n4) {
        let r3 = ((e5, t4) => {
          const n5 = e5 && e5.exec(t4);
          return n5 && 0 === n5.index;
        })(e4.endRe, n4);
        if (r3) {
          if (e4["on:end"]) {
            const n5 = new s(e4);
            e4["on:end"](t3, n5), n5.ignore && (r3 = false);
          }
          if (r3) {
            for (; e4.endsParent && e4.parent;)
              e4 = e4.parent;
            return e4;
          }
        }
        if (e4.endsWithParent)
          return h3(e4.parent, t3, n4);
      }
      function f3(e4) {
        return 0 === y2.matcher.regexIndex ? (M2 += e4[0], 1) : (S2 = true, 0);
      }
      function b3(e4) {
        const t3 = e4[0], n4 = i3.substr(e4.index), s2 = h3(y2, e4, n4);
        if (!s2)
          return P;
        const r3 = y2;
        r3.skip ? M2 += t3 : (r3.returnEnd || r3.excludeEnd || (M2 += t3), u3(), r3.excludeEnd && (M2 = t3));
        do {
          y2.className && k2.closeNode(), y2.skip || y2.subLanguage || (L2 += y2.relevance), y2 = y2.parent;
        } while (y2 !== s2.parent);
        return s2.starts && (s2.endSameAsBegin && (s2.starts.endRe = s2.endRe), g2(s2.starts)), r3.returnEnd ? 0 : t3.length;
      }
      let x3 = {};
      function E3(t3, r3) {
        const a4 = r3 && r3[0];
        if (M2 += t3, null == a4)
          return u3(), 0;
        if ("begin" === x3.type && "end" === r3.type && x3.index === r3.index && "" === a4) {
          if (M2 += i3.slice(r3.index, r3.index + 1), !o2) {
            const t4 = Error("0 width match regex");
            throw t4.languageName = e3, t4.badRule = x3.rule, t4;
          }
          return 1;
        }
        if (x3 = r3, "begin" === r3.type)
          return function (e4) {
            const t4 = e4[0], n4 = e4.rule, r4 = new s(n4), a5 = [n4.__beforeBegin, n4["on:begin"]];
            for (const n5 of a5)
              if (n5 && (n5(e4, r4), r4.ignore))
                return f3(t4);
            return n4 && n4.endSameAsBegin && (n4.endRe = RegExp(
              t4.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "m"
            )), n4.skip ? M2 += t4 : (n4.excludeBegin && (M2 += t4), u3(), n4.returnBegin || n4.excludeBegin || (M2 = t4)), g2(n4), n4.returnBegin ? 0 : t4.length;
          }(r3);
        if ("illegal" === r3.type && !n3) {
          const e4 = Error(
            'Illegal lexeme "' + a4 + '" for mode "' + (y2.className || "<unnamed>") + '"'
          );
          throw e4.mode = y2, e4;
        }
        if ("end" === r3.type) {
          const e4 = b3(r3);
          if (e4 !== P)
            return e4;
        }
        if ("illegal" === r3.type && "" === a4)
          return 1;
        if (j2 > 1e5 && j2 > 3 * r3.index)
          throw Error(
            "potential infinite loop, way more iterations than matches"
          );
        return M2 += a4, a4.length;
      }
      const _3 = v2(e3);
      if (!_3)
        throw console.error(c2.replace("{}", e3)), Error('Unknown language: "' + e3 + '"');
      const w3 = O(_3);
      let N3 = "", y2 = a3 || w3;
      const R2 = {}, k2 = new d2.__emitter(d2);
      (() => {
        const e4 = [];
        for (let t3 = y2; t3 !== _3; t3 = t3.parent)
          t3.className && e4.unshift(t3.className);
        e4.forEach((e5) => k2.openNode(e5));
      })();
      let M2 = "", L2 = 0, A2 = 0, j2 = 0, S2 = false;
      try {
        for (y2.matcher.considerAll(); ;) {
          j2++, S2 ? S2 = false : y2.matcher.considerAll(), y2.matcher.lastIndex = A2;
          const e4 = y2.matcher.exec(i3);
          if (!e4)
            break;
          const t3 = E3(i3.substring(A2, e4.index), e4);
          A2 = e4.index + t3;
        }
        return E3(i3.substr(A2)), k2.closeAllNodes(), k2.finalize(), N3 = k2.toHTML(), {
          relevance: L2,
          value: N3,
          language: e3,
          illegal: false,
          emitter: k2,
          top: y2
        };
      } catch (t3) {
        if (t3.message && t3.message.includes("Illegal"))
          return {
            illegal: true,
            illegalBy: {
              msg: t3.message,
              context: i3.slice(A2 - 100, A2 + 100),
              mode: t3.mode
            },
            sofar: N3,
            relevance: 0,
            value: I(i3),
            emitter: k2
          };
        if (o2)
          return {
            illegal: false,
            relevance: 0,
            value: I(i3),
            emitter: k2,
            language: e3,
            top: y2,
            errorRaised: t3
          };
        throw t3;
      }
    }
    function m2(e3, t2) {
      t2 = t2 || d2.languages || Object.keys(r2);
      const n3 = ((e4) => {
        const t3 = {
          relevance: 0,
          emitter: new d2.__emitter(d2),
          value: I(e4),
          illegal: false,
          top: u2
        };
        return t3.emitter.addText(e4), t3;
      })(e3), s2 = t2.filter(v2).filter(w2).map((t3) => p2(t3, e3, false));
      s2.unshift(n3);
      const a3 = s2.sort((e4, t3) => {
        if (e4.relevance !== t3.relevance)
          return t3.relevance - e4.relevance;
        if (e4.language && t3.language) {
          if (v2(e4.language).supersetOf === t3.language)
            return 1;
          if (v2(t3.language).supersetOf === e4.language)
            return -1;
        }
        return 0;
      }), [i3, o3] = a3, l3 = i3;
      return l3.second_best = o3, l3;
    }
    function b2(e3) {
      return d2.tabReplace || d2.useBR ? e3.replace(
        l2,
        (e4) => "\n" === e4 ? d2.useBR ? "<br>" : e4 : d2.tabReplace ? e4.replace(/\t/g, d2.tabReplace) : e4
      ) : e3;
    }
    function x2(e3) {
      let t2 = null;
      const n3 = ((e4) => {
        let t3 = e4.className + " ";
        t3 += e4.parentNode ? e4.parentNode.className : "";
        const n4 = d2.languageDetectRe.exec(t3);
        if (n4) {
          const t4 = v2(n4[1]);
          return t4 || (console.warn(c2.replace("{}", n4[1])), console.warn(
            "Falling back to no-highlight mode for this block.",
            e4
          )), t4 ? n4[1] : "no-highlight";
        }
        return t3.split(/\s+/).find((e5) => h2(e5) || v2(e5));
      })(e3);
      if (h2(n3))
        return;
      N2("before:highlightBlock", { block: e3, language: n3 }), d2.useBR ? (t2 = document.createElement("div"), t2.innerHTML = e3.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n")) : t2 = e3;
      const s2 = t2.textContent, r3 = n3 ? f2(n3, s2, true) : m2(s2), i3 = T(t2);
      if (i3.length) {
        const e4 = document.createElement("div");
        e4.innerHTML = r3.value, r3.value = B(i3, T(e4), s2);
      }
      r3.value = b2(r3.value), N2("after:highlightBlock", { block: e3, result: r3 }), e3.innerHTML = r3.value, e3.className = ((e4, t3, n4) => {
        const s3 = t3 ? a2[t3] : n4, r4 = [e4.trim()];
        return e4.match(/\bhljs\b/) || r4.push("hljs"), e4.includes(s3) || r4.push(s3), r4.join(" ").trim();
      })(e3.className, n3, r3.language), e3.result = {
        language: r3.language,
        re: r3.relevance,
        relavance: r3.relevance
      }, r3.second_best && (e3.second_best = {
        language: r3.second_best.language,
        re: r3.second_best.relevance,
        relavance: r3.second_best.relevance
      });
    }
    const E2 = () => {
      if (E2.called)
        return;
      E2.called = true;
      const e3 = document.querySelectorAll("pre code");
      n2.forEach.call(e3, x2);
    };
    function v2(e3) {
      return e3 = (e3 || "").toLowerCase(), r2[e3] || r2[a2[e3]];
    }
    function _22(e3, { languageName: t2 }) {
      "string" == typeof e3 && (e3 = [e3]), e3.forEach((e4) => {
        a2[e4] = t2;
      });
    }
    function w2(e3) {
      const t2 = v2(e3);
      return t2 && !t2.disableAutodetect;
    }
    function N2(e3, t2) {
      const n3 = e3;
      i2.forEach((e4) => {
        e4[n3] && e4[n3](t2);
      });
    }
    Object.assign(e2, {
      highlight: f2,
      highlightAuto: m2,
      fixMarkup: (e3) => (console.warn(
        "fixMarkup is deprecated and will be removed entirely in v11.0"
      ), console.warn(
        "Please see https://github.com/highlightjs/highlight.js/issues/2534"
      ), b2(e3)),
      highlightBlock: x2,
      configure: (e3) => {
        e3.useBR && (console.warn(
          "'useBR' option is deprecated and will be removed entirely in v11.0"
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/issues/2559"
        )), d2 = S(d2, e3);
      },
      initHighlighting: E2,
      initHighlightingOnLoad: () => {
        window.addEventListener("DOMContentLoaded", E2, false);
      },
      registerLanguage: (t2, n3) => {
        let s2 = null;
        try {
          s2 = n3(e2);
        } catch (e3) {
          if (console.error(
            "Language definition for '{}' could not be registered.".replace(
              "{}",
              t2
            )
          ), !o2)
            throw e3;
          console.error(e3), s2 = u2;
        }
        s2.name || (s2.name = t2), r2[t2] = s2, s2.rawDefinition = n3.bind(null, e2), s2.aliases && _22(s2.aliases, { languageName: t2 });
      },
      listLanguages: () => Object.keys(r2),
      getLanguage: v2,
      registerAliases: _22,
      requireLanguage: (e3) => {
        console.warn(
          "requireLanguage is deprecated and will be removed entirely in the future."
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/pull/2844"
        );
        const t2 = v2(e3);
        if (t2)
          return t2;
        throw Error(
          "The '{}' language is required, but not loaded.".replace("{}", e3)
        );
      },
      autoDetection: w2,
      inherit: S,
      addPlugin: (e3) => {
        i2.push(e3);
      },
      vuePlugin: j(e2).VuePlugin
    }), e2.debugMode = () => {
      o2 = false;
    }, e2.safeMode = () => {
      o2 = true;
    }, e2.versionString = "10.4.0";
    for (const e3 in k)
      "object" == typeof k[e3] && t(k[e3]);
    return Object.assign(e2, k), e2;
  })({});
}();
"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);
hljs.registerLanguage(
  "java",
  (() => {
    return (e) => {
      var n = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do", a = {
        className: "meta",
        begin: "@[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",
        contains: [{ begin: /\(/, end: /\)/, contains: ["self"] }]
      }, s = "\\.([0-9](_*[0-9])*)", i = "[0-9a-fA-F](_*[0-9a-fA-F])*", r = {
        className: "number",
        variants: [
          {
            begin: `(\\b([0-9](_*[0-9])*)((${s})|\\.)?|(${s}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: `\\b([0-9](_*[0-9])*)((${s})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
          {
            begin: `(${s})[fFdD]?\\b`
          },
          { begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" },
          {
            begin: `\\b0[xX]((${i})\\.?|(${i})?\\.(${i}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
          { begin: `\\b0[xX](${i})[lL]?\\b` },
          {
            begin: "\\b0(_*[0-7])*[lL]?\\b"
          },
          { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
        ],
        relevance: 0
      };
      return {
        name: "Java",
        aliases: ["jsp"],
        keywords: n,
        illegal: /<\/|#/,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              { begin: /\w+@/, relevance: 0 },
              { className: "doctag", begin: "@[A-Za-z]+" }
            ]
          }),
          {
            begin: /import java\.[a-z]+\./,
            keywords: "import",
            relevance: 2
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          {
            className: "class",
            beginKeywords: "class interface enum",
            end: /[{;=]/,
            excludeEnd: true,
            keywords: "class interface enum",
            illegal: /[:"\[\]]/,
            contains: [
              {
                beginKeywords: "extends implements"
              },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "new throw return else",
            relevance: 0
          },
          {
            className: "class",
            begin: "record\\s+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            excludeEnd: true,
            end: /[{;=]/,
            keywords: n,
            contains: [
              { beginKeywords: "record" },
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "function",
            begin: "([\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(<[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(\\s*,\\s*[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*)*>)?\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            end: /[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [
                  a,
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  r,
                  e.C_BLOCK_COMMENT_MODE
                ]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          r,
          a
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "http",
  (() => {
    return (e) => {
      var n = "HTTP/[0-9\\.]+";
      return {
        name: "HTTP",
        aliases: ["https"],
        illegal: "\\S",
        contains: [
          {
            begin: "^" + n,
            end: "$",
            contains: [{ className: "number", begin: "\\b\\d{3}\\b" }]
          },
          {
            begin: "^[A-Z]+ (.*?) " + n + "$",
            returnBegin: true,
            end: "$",
            contains: [
              {
                className: "string",
                begin: " ",
                end: " ",
                excludeBegin: true,
                excludeEnd: true
              },
              {
                begin: n
              },
              { className: "keyword", begin: "[A-Z]+" }
            ]
          },
          {
            className: "attribute",
            begin: "^\\w",
            end: ": ",
            excludeEnd: true,
            illegal: "\\n|\\s|=",
            starts: { end: "$", relevance: 0 }
          },
          { begin: "\\n\\n", starts: { subLanguage: [], endsWithParent: true } }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "nginx",
  (() => {
    return (e) => {
      const n = {
        className: "variable",
        variants: [
          { begin: /\$\d+/ },
          { begin: /\$\{/, end: /\}/ },
          {
            begin: /[$@]/ + e.UNDERSCORE_IDENT_RE
          }
        ]
      }, a = {
        endsWithParent: true,
        keywords: {
          $pattern: "[a-z/_]+",
          literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        relevance: 0,
        illegal: "=>",
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: /"/, end: /"/ },
              { begin: /'/, end: /'/ }
            ]
          },
          {
            begin: "([a-z]+):/",
            end: "\\s",
            endsWithParent: true,
            excludeEnd: true,
            contains: [n]
          },
          {
            className: "regexp",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: "\\s\\^", end: "\\s|\\{|;", returnEnd: true },
              { begin: "~\\*?\\s+", end: "\\s|\\{|;", returnEnd: true },
              {
                begin: "\\*(\\.[a-z\\-]+)+"
              },
              { begin: "([a-z\\-]+\\.)+\\*" }
            ]
          },
          {
            className: "number",
            begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
          },
          {
            className: "number",
            begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
            relevance: 0
          },
          n
        ]
      };
      return {
        name: "Nginx config",
        aliases: ["nginxconf"],
        contains: [
          e.HASH_COMMENT_MODE,
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s+\\{",
            returnBegin: true,
            end: /\{/,
            contains: [
              {
                className: "section",
                begin: e.UNDERSCORE_IDENT_RE
              }
            ],
            relevance: 0
          },
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s",
            end: ";|\\{",
            returnBegin: true,
            contains: [
              {
                className: "attribute",
                begin: e.UNDERSCORE_IDENT_RE,
                starts: a
              }
            ],
            relevance: 0
          }
        ],
        illegal: "[^\\s\\}]"
      };
    };
  })()
);
hljs.registerLanguage(
  "coffeescript",
  (() => {
    const e = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], n = ["true", "false", "null", "undefined", "NaN", "Infinity"], a = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    return (r) => {
      const t = {
        keyword: e.concat([
          "then",
          "unless",
          "until",
          "loop",
          "by",
          "when",
          "and",
          "or",
          "is",
          "isnt",
          "not"
        ]).filter(
          (i = ["var", "const", "let", "function", "static"], (e2) => !i.includes(e2))
        ).join(" "),
        literal: n.concat(["yes", "no", "on", "off"]).join(" "),
        built_in: a.concat(["npm", "print"]).join(" ")
      };
      var i;
      const s = "[A-Za-z$_][0-9A-Za-z$_]*", o = { className: "subst", begin: /#\{/, end: /\}/, keywords: t }, c = [
        r.BINARY_NUMBER_MODE,
        r.inherit(r.C_NUMBER_MODE, {
          starts: {
            end: "(\\s*/)?",
            relevance: 0
          }
        }),
        {
          className: "string",
          variants: [
            { begin: /'''/, end: /'''/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /'/, end: /'/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /"""/, end: /"""/, contains: [r.BACKSLASH_ESCAPE, o] },
            { begin: /"/, end: /"/, contains: [r.BACKSLASH_ESCAPE, o] }
          ]
        },
        {
          className: "regexp",
          variants: [
            { begin: "///", end: "///", contains: [o, r.HASH_COMMENT_MODE] },
            { begin: "//[gim]{0,3}(?=\\W)", relevance: 0 },
            { begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/ }
          ]
        },
        { begin: "@" + s },
        {
          subLanguage: "javascript",
          excludeBegin: true,
          excludeEnd: true,
          variants: [
            {
              begin: "```",
              end: "```"
            },
            { begin: "`", end: "`" }
          ]
        }
      ];
      o.contains = c;
      const l = r.inherit(r.TITLE_MODE, { begin: s }), d = "(\\(.*\\))?\\s*\\B[-=]>", g = {
        className: "params",
        begin: "\\([^\\(]",
        returnBegin: true,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            keywords: t,
            contains: ["self"].concat(c)
          }
        ]
      };
      return {
        name: "CoffeeScript",
        aliases: ["coffee", "cson", "iced"],
        keywords: t,
        illegal: /\/\*/,
        contains: c.concat([
          r.COMMENT("###", "###"),
          r.HASH_COMMENT_MODE,
          {
            className: "function",
            begin: "^\\s*" + s + "\\s*=\\s*" + d,
            end: "[-=]>",
            returnBegin: true,
            contains: [l, g]
          },
          {
            begin: /[:\(,=]\s*/,
            relevance: 0,
            contains: [
              {
                className: "function",
                begin: d,
                end: "[-=]>",
                returnBegin: true,
                contains: [g]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class",
            end: "$",
            illegal: /[:="\[\]]/,
            contains: [
              {
                beginKeywords: "extends",
                endsWithParent: true,
                illegal: /[:="\[\]]/,
                contains: [l]
              },
              l
            ]
          },
          {
            begin: s + ":",
            end: ":",
            returnBegin: true,
            returnEnd: true,
            relevance: 0
          }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "cpp",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _2 = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _2, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.disableAutodetect = false, t.name = "C++", t.aliases = ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], t;
    };
  })()
);
hljs.registerLanguage(
  "objectivec",
  (() => {
    return (e) => {
      const n = /[a-zA-Z@][a-zA-Z0-9_]*/, _2 = {
        $pattern: n,
        keyword: "@interface @class @protocol @implementation"
      };
      return {
        name: "Objective-C",
        aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
        keywords: {
          $pattern: n,
          keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
          literal: "false true FALSE TRUE nil YES NO NULL",
          built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        illegal: "</",
        contains: [
          {
            className: "built_in",
            begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.C_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          {
            className: "string",
            variants: [
              {
                begin: '@"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
              }
            ]
          },
          {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            contains: [
              { begin: /\\\n/, relevance: 0 },
              e.inherit(e.QUOTE_STRING_MODE, {
                className: "meta-string"
              }),
              {
                className: "meta-string",
                begin: /<.*?>/,
                end: /$/,
                illegal: "\\n"
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "class",
            begin: "(" + _2.keyword.split(" ").join("|") + ")\\b",
            end: /(\{|$)/,
            excludeEnd: true,
            keywords: _2,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            begin: "\\." + e.UNDERSCORE_IDENT_RE,
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "less",
  (() => {
    return (e) => {
      var n = "([\\w-]+|@\\{[\\w-]+\\})", a = [], s = [], t = (e2) => ({ className: "string", begin: "~?" + e2 + ".*?" + e2 }), r = (e2, n2, a2) => ({ className: e2, begin: n2, relevance: a2 }), i = {
        begin: "\\(",
        end: "\\)",
        contains: s,
        relevance: 0
      };
      s.push(
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        t("'"),
        t('"'),
        e.CSS_NUMBER_MODE,
        {
          begin: "(url|data-uri)\\(",
          starts: { className: "string", end: "[\\)\\n]", excludeEnd: true }
        },
        r("number", "#[0-9A-Fa-f]+\\b"),
        i,
        r("variable", "@@?[\\w-]+", 10),
        r("variable", "@\\{[\\w-]+\\}"),
        r("built_in", "~?`[^`]*?`"),
        {
          className: "attribute",
          begin: "[\\w-]+\\s*:",
          end: ":",
          returnBegin: true,
          excludeEnd: true
        },
        { className: "meta", begin: "!important" }
      );
      var c = s.concat({ begin: /\{/, end: /\}/, contains: a }), l = {
        beginKeywords: "when",
        endsWithParent: true,
        contains: [
          {
            beginKeywords: "and not"
          }
        ].concat(s)
      }, g = {
        begin: n + "\\s*:",
        returnBegin: true,
        end: "[;}]",
        relevance: 0,
        contains: [
          {
            className: "attribute",
            begin: n,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              illegal: "[<=$]",
              relevance: 0,
              contains: s
            }
          }
        ]
      }, d = {
        className: "keyword",
        begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: { end: "[;{}]", returnEnd: true, contains: s, relevance: 0 }
      }, o = {
        className: "variable",
        variants: [
          { begin: "@[\\w-]+\\s*:", relevance: 15 },
          {
            begin: "@[\\w-]+"
          }
        ],
        starts: { end: "[;}]", returnEnd: true, contains: c }
      }, b = {
        variants: [
          {
            begin: "[\\.#:&\\[>]",
            end: "[;{}]"
          },
          { begin: n, end: /\{/ }
        ],
        returnBegin: true,
        returnEnd: true,
        illegal: `[<='$"]`,
        relevance: 0,
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          l,
          r("keyword", "all\\b"),
          r("variable", "@\\{[\\w-]+\\}"),
          r("selector-tag", n + "%?", 0),
          r("selector-id", "#" + n),
          r("selector-class", "\\." + n, 0),
          r("selector-tag", "&", 0),
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]"
          },
          {
            className: "selector-pseudo",
            begin: /:(:)?[a-zA-Z0-9_\-+()"'.]+/
          },
          { begin: "\\(", end: "\\)", contains: c },
          {
            begin: "!important"
          }
        ]
      };
      return a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o, g, b), {
        name: "Less",
        case_insensitive: true,
        illegal: `[=>'/<($"]`,
        contains: a
      };
    };
  })()
);
hljs.registerLanguage(
  "typescript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function t(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (r) => {
      const c = {
        $pattern: e,
        keyword: n.concat([
          "type",
          "namespace",
          "typedef",
          "interface",
          "public",
          "private",
          "protected",
          "implements",
          "declare",
          "abstract",
          "readonly"
        ]).join(" "),
        literal: a.join(" "),
        built_in: s.concat([
          "any",
          "void",
          "number",
          "boolean",
          "string",
          "object",
          "never",
          "enum"
        ]).join(" ")
      }, o = { className: "meta", begin: "@[A-Za-z$_][0-9A-Za-z$_]*" }, l = (e2, n2, a2) => {
        const s2 = e2.contains.findIndex((e3) => e3.label === n2);
        if (-1 === s2)
          throw Error("can not find mode to replace");
        e2.contains.splice(s2, 1, a2);
      }, b = ((r2) => {
        const c2 = e, o2 = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
          isTrulyOpeningTag: (e2, n2) => {
            const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
            "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
              const a3 = "</" + e3[0].slice(1);
              return -1 !== e3.input.indexOf(a3, n3);
            })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
          }
        }, l2 = {
          $pattern: e,
          keyword: n.join(" "),
          literal: a.join(" "),
          built_in: s.join(" ")
        }, b2 = "\\.([0-9](_?[0-9])*)", d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", g = {
          className: "number",
          variants: [
            {
              begin: `(\\b(${d})((${b2})|\\.)?|(${b2}))[eE][+-]?([0-9](_?[0-9])*)\\b`
            },
            {
              begin: `\\b(${d})\\b((${b2})\\b|\\.)?|(${b2})\\b`
            },
            {
              begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
            },
            {
              begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            },
            {
              begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            },
            { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
            {
              begin: "\\b0[0-7]+n?\\b"
            }
          ],
          relevance: 0
        }, u = {
          className: "subst",
          begin: "\\$\\{",
          end: "\\}",
          keywords: l2,
          contains: []
        }, E = {
          begin: "html`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "xml"
          }
        }, m = {
          begin: "css`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "css"
          }
        }, _2 = {
          className: "string",
          begin: "`",
          end: "`",
          contains: [r2.BACKSLASH_ESCAPE, u]
        }, y = {
          className: "comment",
          variants: [
            r2.COMMENT("/\\*\\*", "\\*/", {
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+",
                  contains: [
                    {
                      className: "type",
                      begin: "\\{",
                      end: "\\}",
                      relevance: 0
                    },
                    {
                      className: "variable",
                      begin: c2 + "(?=\\s*(-)|$)",
                      endsParent: true,
                      relevance: 0
                    },
                    {
                      begin: /(?=[^\n])\s/,
                      relevance: 0
                    }
                  ]
                }
              ]
            }),
            r2.C_BLOCK_COMMENT_MODE,
            r2.C_LINE_COMMENT_MODE
          ]
        }, p = [
          r2.APOS_STRING_MODE,
          r2.QUOTE_STRING_MODE,
          E,
          m,
          _2,
          g,
          r2.REGEXP_MODE
        ];
        u.contains = p.concat({
          begin: /\{/,
          end: /\}/,
          keywords: l2,
          contains: ["self"].concat(p)
        });
        const N = [].concat(y, u.contains), f = N.concat([
          {
            begin: /\(/,
            end: /\)/,
            keywords: l2,
            contains: ["self"].concat(N)
          }
        ]), A = {
          className: "params",
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          keywords: l2,
          contains: f
        };
        return {
          name: "Javascript",
          aliases: ["js", "jsx", "mjs", "cjs"],
          keywords: l2,
          exports: { PARAMS_CONTAINS: f },
          illegal: /#(?![$_A-z])/,
          contains: [
            r2.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
            {
              label: "use_strict",
              className: "meta",
              relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            },
            r2.APOS_STRING_MODE,
            r2.QUOTE_STRING_MODE,
            E,
            m,
            _2,
            y,
            g,
            {
              begin: i(
                /[{,\n]\s*/,
                t(
                  i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c2 + "\\s*:")
                )
              ),
              relevance: 0,
              contains: [
                { className: "attr", begin: c2 + t("\\s*:"), relevance: 0 }
              ]
            },
            {
              begin: "(" + r2.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case",
              contains: [
                y,
                r2.REGEXP_MODE,
                {
                  className: "function",
                  begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + r2.UNDERSCORE_IDENT_RE + ")\\s*=>",
                  returnBegin: true,
                  end: "\\s*=>",
                  contains: [
                    {
                      className: "params",
                      variants: [
                        {
                          begin: r2.UNDERSCORE_IDENT_RE,
                          relevance: 0
                        },
                        { className: null, begin: /\(\s*\)/, skip: true },
                        {
                          begin: /\(/,
                          end: /\)/,
                          excludeBegin: true,
                          excludeEnd: true,
                          keywords: l2,
                          contains: f
                        }
                      ]
                    }
                  ]
                },
                { begin: /,/, relevance: 0 },
                { className: "", begin: /\s/, end: /\s*/, skip: true },
                {
                  variants: [
                    { begin: "<>", end: "</>" },
                    {
                      begin: o2.begin,
                      "on:begin": o2.isTrulyOpeningTag,
                      end: o2.end
                    }
                  ],
                  subLanguage: "xml",
                  contains: [
                    {
                      begin: o2.begin,
                      end: o2.end,
                      skip: true,
                      contains: ["self"]
                    }
                  ]
                }
              ],
              relevance: 0
            },
            {
              className: "function",
              beginKeywords: "function",
              end: /[{;]/,
              excludeEnd: true,
              keywords: l2,
              contains: ["self", r2.inherit(r2.TITLE_MODE, { begin: c2 }), A],
              illegal: /%/
            },
            {
              beginKeywords: "while if switch catch for"
            },
            {
              className: "function",
              begin: r2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
              returnBegin: true,
              contains: [A, r2.inherit(r2.TITLE_MODE, { begin: c2 })]
            },
            {
              variants: [
                {
                  begin: "\\." + c2
                },
                { begin: "\\$" + c2 }
              ],
              relevance: 0
            },
            {
              className: "class",
              beginKeywords: "class",
              end: /[{;=]/,
              excludeEnd: true,
              illegal: /[:"[\]]/,
              contains: [
                {
                  beginKeywords: "extends"
                },
                r2.UNDERSCORE_TITLE_MODE
              ]
            },
            {
              begin: /\b(?=constructor)/,
              end: /[{;]/,
              excludeEnd: true,
              contains: [r2.inherit(r2.TITLE_MODE, { begin: c2 }), "self", A]
            },
            {
              begin: "(get|set)\\s+(?=" + c2 + "\\()",
              end: /\{/,
              keywords: "get set",
              contains: [
                r2.inherit(r2.TITLE_MODE, { begin: c2 }),
                { begin: /\(\)/ },
                A
              ]
            },
            { begin: /\$[(.]/ }
          ]
        };
      })(r);
      return Object.assign(b.keywords, c), b.exports.PARAMS_CONTAINS.push(o), b.contains = b.contains.concat([
        o,
        {
          beginKeywords: "namespace",
          end: /\{/,
          excludeEnd: true
        },
        {
          beginKeywords: "interface",
          end: /\{/,
          excludeEnd: true,
          keywords: "interface extends"
        }
      ]), l(b, "shebang", r.SHEBANG()), l(b, "use_strict", {
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
      }), b.contains.find((e2) => "function" === e2.className).relevance = 0, Object.assign(b, {
        name: "TypeScript",
        aliases: ["ts"]
      }), b;
    };
  })()
);
hljs.registerLanguage(
  "ruby",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var a, i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", s = {
        keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
        built_in: "proc lambda",
        literal: "true false nil"
      }, r = { className: "doctag", begin: "@[A-Za-z]+" }, b = { begin: "#<", end: ">" }, t = [
        n.COMMENT("#", "$", { contains: [r] }),
        n.COMMENT("^=begin", "^=end", { contains: [r], relevance: 10 }),
        n.COMMENT("^__END__", "\\n$")
      ], c = { className: "subst", begin: /#\{/, end: /\}/, keywords: s }, d = {
        className: "string",
        contains: [n.BACKSLASH_ESCAPE, c],
        variants: [
          {
            begin: /'/,
            end: /'/
          },
          { begin: /"/, end: /"/ },
          { begin: /`/, end: /`/ },
          { begin: /%[qQwWx]?\(/, end: /\)/ },
          { begin: /%[qQwWx]?\[/, end: /\]/ },
          { begin: /%[qQwWx]?\{/, end: /\}/ },
          {
            begin: /%[qQwWx]?</,
            end: />/
          },
          { begin: /%[qQwWx]?\//, end: /\// },
          { begin: /%[qQwWx]?%/, end: /%/ },
          { begin: /%[qQwWx]?-/, end: /-/ },
          { begin: /%[qQwWx]?\|/, end: /\|/ },
          {
            begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
          },
          {
            begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
            returnBegin: true,
            contains: [
              {
                begin: /<<[-~]?'?/
              },
              n.END_SAME_AS_BEGIN({
                begin: /(\w+)/,
                end: /(\w+)/,
                contains: [n.BACKSLASH_ESCAPE, c]
              })
            ]
          }
        ]
      }, g = "[0-9](_?[0-9])*", l = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`
          },
          {
            begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
          },
          { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
          { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
          },
          {
            begin: "\\b0(_?[0-7])+r?i?\\b"
          }
        ]
      }, o = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        endsParent: true,
        keywords: s
      }, _2 = [
        d,
        {
          className: "class",
          beginKeywords: "class module",
          end: "$|;",
          illegal: /=/,
          contains: [
            n.inherit(n.TITLE_MODE, {
              begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
            }),
            {
              begin: "<\\s*",
              contains: [
                {
                  begin: "(" + n.IDENT_RE + "::)?" + n.IDENT_RE
                }
              ]
            }
          ].concat(t)
        },
        {
          className: "function",
          begin: e(/def\s*/, (a = i + "\\s*(\\(|;|$)", e("(?=", a, ")"))),
          keywords: "def",
          end: "$|;",
          contains: [n.inherit(n.TITLE_MODE, { begin: i }), o].concat(t)
        },
        { begin: n.IDENT_RE + "::" },
        {
          className: "symbol",
          begin: n.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
          relevance: 0
        },
        {
          className: "symbol",
          begin: ":(?!\\s)",
          contains: [d, { begin: i }],
          relevance: 0
        },
        l,
        {
          className: "variable",
          begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
        },
        {
          className: "params",
          begin: /\|/,
          end: /\|/,
          relevance: 0,
          keywords: s
        },
        {
          begin: "(" + n.RE_STARTERS_RE + "|unless)\\s*",
          keywords: "unless",
          contains: [
            {
              className: "regexp",
              contains: [n.BACKSLASH_ESCAPE, c],
              illegal: /\n/,
              variants: [
                {
                  begin: "/",
                  end: "/[a-z]*"
                },
                { begin: /%r\{/, end: /\}[a-z]*/ },
                { begin: "%r\\(", end: "\\)[a-z]*" },
                { begin: "%r!", end: "![a-z]*" },
                { begin: "%r\\[", end: "\\][a-z]*" }
              ]
            }
          ].concat(b, t),
          relevance: 0
        }
      ].concat(b, t);
      c.contains = _2, o.contains = _2;
      var E = [
        {
          begin: /^\s*=>/,
          starts: { end: "$", contains: _2 }
        },
        {
          className: "meta",
          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)(?=[ ])",
          starts: { end: "$", contains: _2 }
        }
      ];
      return t.unshift(b), {
        name: "Ruby",
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        keywords: s,
        illegal: /\/\*/,
        contains: [n.SHEBANG({ binary: "ruby" })].concat(E).concat(t).concat(_2)
      };
    };
  })()
);
hljs.registerLanguage(
  "json",
  (() => {
    return (n) => {
      const e = {
        literal: "true false null"
      }, i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE], a = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE], l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: a,
        keywords: e
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [n.BACKSLASH_ESCAPE],
            illegal: "\\n"
          },
          n.inherit(l, { begin: /:/ })
        ].concat(i),
        illegal: "\\S"
      }, s = {
        begin: "\\[",
        end: "\\]",
        contains: [n.inherit(l)],
        illegal: "\\S"
      };
      return a.push(t, s), i.forEach((n2) => {
        a.push(n2);
      }), { name: "JSON", contains: a, keywords: e, illegal: "\\S" };
    };
  })()
);
hljs.registerLanguage(
  "c",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _2 = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _2, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.name = "C", t.aliases = ["c", "h"], t;
    };
  })()
);
hljs.registerLanguage(
  "makefile",
  (() => {
    return (e) => {
      const i = {
        className: "variable",
        variants: [
          {
            begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
            contains: [e.BACKSLASH_ESCAPE]
          },
          { begin: /\$[@%<?\^\+\*]/ }
        ]
      }, a = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, i]
      }, n = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        },
        contains: [i]
      }, s = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, r = {
        className: "section",
        begin: /^[^\s]+:/,
        end: /$/,
        contains: [i]
      };
      return {
        name: "Makefile",
        aliases: ["mk", "mak"],
        keywords: {
          $pattern: /[\w-]+/,
          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
        },
        contains: [
          e.HASH_COMMENT_MODE,
          i,
          a,
          n,
          s,
          {
            className: "meta",
            begin: /^\.PHONY:/,
            end: /$/,
            keywords: { $pattern: /[\.\w]+/, "meta-keyword": ".PHONY" }
          },
          r
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "xml",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(e2) {
      return a("(?=", e2, ")");
    }
    function a(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    function s(...n2) {
      return "(" + n2.map((n3) => e(n3)).join("|") + ")";
    }
    return (e2) => {
      const t = a(/[A-Z_]/, a("(", /[A-Z0-9_.-]+:/, ")?"), /[A-Z0-9_.-]*/), i = {
        className: "symbol",
        begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"
      }, c = {
        begin: "\\s",
        contains: [
          {
            className: "meta-keyword",
            begin: "#?[a-z_][a-z1-9_-]+",
            illegal: "\\n"
          }
        ]
      }, r = e2.inherit(c, { begin: "\\(", end: "\\)" }), l = e2.inherit(e2.APOS_STRING_MODE, {
        className: "meta-string"
      }), g = e2.inherit(e2.QUOTE_STRING_MODE, {
        className: "meta-string"
      }), m = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
          { className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0 },
          {
            begin: /=\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: true,
                variants: [
                  {
                    begin: /"/,
                    end: /"/,
                    contains: [i]
                  },
                  { begin: /'/, end: /'/, contains: [i] },
                  {
                    begin: /[^\s"'=<>`]+/
                  }
                ]
              }
            ]
          }
        ]
      };
      return {
        name: "HTML, XML",
        aliases: [
          "html",
          "xhtml",
          "rss",
          "atom",
          "xjb",
          "xsd",
          "xsl",
          "plist",
          "wsf",
          "svg"
        ],
        case_insensitive: true,
        contains: [
          {
            className: "meta",
            begin: "<![a-z]",
            end: ">",
            relevance: 10,
            contains: [
              c,
              g,
              l,
              r,
              {
                begin: "\\[",
                end: "\\]",
                contains: [
                  {
                    className: "meta",
                    begin: "<![a-z]",
                    end: ">",
                    contains: [c, r, g, l]
                  }
                ]
              }
            ]
          },
          e2.COMMENT("<!--", "-->", { relevance: 10 }),
          { begin: "<!\\[CDATA\\[", end: "\\]\\]>", relevance: 10 },
          i,
          { className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10 },
          {
            className: "tag",
            begin: "<style(?=\\s|>)",
            end: ">",
            keywords: {
              name: "style"
            },
            contains: [m],
            starts: {
              end: "</style>",
              returnEnd: true,
              subLanguage: ["css", "xml"]
            }
          },
          {
            className: "tag",
            begin: "<script(?=\\s|>)",
            end: ">",
            keywords: { name: "script" },
            contains: [m],
            starts: {
              end: /<\/script>/,
              returnEnd: true,
              subLanguage: ["javascript", "handlebars", "xml"]
            }
          },
          { className: "tag", begin: /<>|<\/>/ },
          {
            className: "tag",
            begin: a(/</, n(a(t, s(/\/>/, />/, /\s/)))),
            end: /\/?>/,
            contains: [
              {
                className: "name",
                begin: t,
                relevance: 0,
                starts: m
              }
            ]
          },
          {
            className: "tag",
            begin: a(/<\//, n(a(t, />/))),
            contains: [
              { className: "name", begin: t, relevance: 0 },
              {
                begin: />/,
                relevance: 0
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "bash",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (s = e3) ? "string" == typeof s ? s : s.source : null;
        var s;
      }).join("");
    }
    return (s) => {
      const n = {}, t = {
        begin: /\$\{/,
        end: /\}/,
        contains: [
          "self",
          {
            begin: /:-/,
            contains: [n]
          }
        ]
      };
      Object.assign(n, {
        className: "variable",
        variants: [
          {
            begin: e(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
          },
          t
        ]
      });
      const a = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [s.BACKSLASH_ESCAPE]
      }, i = {
        begin: /<<-?\s*(?=\w+)/,
        starts: {
          contains: [
            s.END_SAME_AS_BEGIN({
              begin: /(\w+)/,
              end: /(\w+)/,
              className: "string"
            })
          ]
        }
      }, c = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [s.BACKSLASH_ESCAPE, n, a]
      };
      a.contains.push(c);
      const o = {
        begin: /\$\(\(/,
        end: /\)\)/,
        contains: [
          { begin: /\d+#[0-9a-f]+/, className: "number" },
          s.NUMBER_MODE,
          n
        ]
      }, r = s.SHEBANG({
        binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
        relevance: 10
      }), l = {
        className: "function",
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [s.inherit(s.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
        relevance: 0
      };
      return {
        name: "Bash",
        aliases: ["sh", "zsh"],
        keywords: {
          $pattern: /\b[a-z._-]+\b/,
          keyword: "if then else elif fi for while in do done case esac function",
          literal: "true false",
          built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
        },
        contains: [
          r,
          s.SHEBANG(),
          l,
          o,
          s.HASH_COMMENT_MODE,
          i,
          c,
          { className: "", begin: /\\"/ },
          { className: "string", begin: /'/, end: /'/ },
          n
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "swift",
  (() => {
    return (e) => {
      var i = {
        $pattern: /[\w#]+/,
        keyword: "#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set some static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
      }, n = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), t = {
        className: "subst",
        begin: /\\\(/,
        end: "\\)",
        keywords: i,
        contains: []
      }, a = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          { begin: /"""/, end: /"""/ },
          { begin: /"/, end: /"/ }
        ]
      }, r = "([0-9a-fA-F]_*)+", s = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
          },
          {
            begin: `\\b0x(${r})(\\.(${r}))?([pP][+-]?(([0-9]_*)+))?\\b`
          },
          {
            begin: /\b0o([0-7]_*)+\b/
          },
          { begin: /\b0b([01]_*)+\b/ }
        ]
      };
      return t.contains = [s], {
        name: "Swift",
        keywords: i,
        contains: [
          a,
          e.C_LINE_COMMENT_MODE,
          n,
          { className: "type", begin: "\\b[A-Z][\\w\xC0-\u02B8']*[!?]" },
          {
            className: "type",
            begin: "\\b[A-Z][\\w\xC0-\u02B8']*",
            relevance: 0
          },
          s,
          {
            className: "function",
            beginKeywords: "func",
            end: /\{/,
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/
              }),
              { begin: /</, end: />/ },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: i,
                contains: [
                  "self",
                  s,
                  a,
                  e.C_BLOCK_COMMENT_MODE,
                  { begin: ":" }
                ],
                illegal: /["']/
              }
            ],
            illegal: /\[|%/
          },
          {
            className: "class",
            beginKeywords: "struct protocol class extension enum",
            keywords: i,
            end: "\\{",
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
              })
            ]
          },
          {
            className: "meta",
            begin: "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper|@main)\\b"
          },
          {
            beginKeywords: "import",
            end: /$/,
            contains: [e.C_LINE_COMMENT_MODE, n],
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python",
  (() => {
    return (e) => {
      const n = {
        keyword: "and as assert async await break class continue def del elif else except finally for  from global if import in is lambda nonlocal|10 not or pass raise return try while with yield",
        built_in: "__import__ abs all any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip",
        literal: "__debug__ Ellipsis False None NotImplemented True"
      }, a = {
        className: "meta",
        begin: /^(>>>|\.\.\.) /
      }, s = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: n,
        illegal: /#/
      }, i = { begin: /\{\{/, relevance: 0 }, r = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          { begin: /([uU]|[rR])'/, end: /'/, relevance: 10 },
          { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 },
          {
            begin: /([bB]|[bB][rR]|[rR][bB])'/,
            end: /'/
          },
          { begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'/,
            end: /'/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE
        ]
      }, t = "[0-9](_?[0-9])*", l = `(\\b(${t}))?\\.(${t})|\\b(${t})\\.`, b = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `(\\b(${t})|(${l}))[eE][+-]?(${t})[jJ]?\\b`
          },
          { begin: `(${l})[jJ]?` },
          {
            begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
          },
          {
            begin: "\\b0[bB](_?[01])+[lL]?\\b"
          },
          { begin: "\\b0[oO](_?[0-7])+[lL]?\\b" },
          {
            begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
          },
          { begin: `\\b(${t})[jJ]\\b` }
        ]
      }, o = {
        className: "params",
        variants: [
          { begin: /\(\s*\)/, skip: true, className: null },
          {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: n,
            contains: ["self", a, b, r, e.HASH_COMMENT_MODE]
          }
        ]
      };
      return s.contains = [r, b, a], {
        name: "Python",
        aliases: ["py", "gyp", "ipython"],
        keywords: n,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
          a,
          b,
          { begin: /\bself\b/ },
          { beginKeywords: "if", relevance: 0 },
          r,
          e.HASH_COMMENT_MODE,
          {
            variants: [
              { className: "function", beginKeywords: "def" },
              { className: "class", beginKeywords: "class" }
            ],
            end: /:/,
            illegal: /[${=;\n,]/,
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              o,
              { begin: /->/, endsWithParent: true, keywords: "None" }
            ]
          },
          {
            className: "meta",
            begin: /^[\t ]*@/,
            end: /(?=#)|$/,
            contains: [b, o, r]
          },
          { begin: /\b(print|exec)\(/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "kotlin",
  (() => {
    return (e) => {
      const n = {
        keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
        built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null"
      }, a = { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@" }, s = {
        className: "subst",
        begin: /\$\{/,
        end: /\}/,
        contains: [e.C_NUMBER_MODE]
      }, i = {
        className: "variable",
        begin: "\\$" + e.UNDERSCORE_IDENT_RE
      }, t = {
        className: "string",
        variants: [
          { begin: '"""', end: '"""(?=[^"])', contains: [i, s] },
          {
            begin: "'",
            end: "'",
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE]
          },
          {
            begin: '"',
            end: '"',
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          }
        ]
      };
      s.contains.push(t);
      const l = {
        className: "meta",
        begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
      }, r = {
        className: "meta",
        begin: "@" + e.UNDERSCORE_IDENT_RE,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            contains: [e.inherit(t, { className: "meta-string" })]
          }
        ]
      }, c = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }), o = {
        variants: [
          {
            className: "type",
            begin: e.UNDERSCORE_IDENT_RE
          },
          { begin: /\(/, end: /\)/, contains: [] }
        ]
      }, d = o;
      return d.variants[1].contains = [o], o.variants[1].contains = [d], {
        name: "Kotlin",
        aliases: ["kt"],
        keywords: n,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.C_LINE_COMMENT_MODE,
          c,
          {
            className: "keyword",
            begin: /\b(break|continue|return|this)\b/,
            starts: { contains: [{ className: "symbol", begin: /@\w+/ }] }
          },
          a,
          l,
          r,
          {
            className: "function",
            beginKeywords: "fun",
            end: "[(]|$",
            returnBegin: true,
            excludeEnd: true,
            keywords: n,
            illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            relevance: 5,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "type",
                begin: /</,
                end: />/,
                keywords: "reified",
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: n,
                relevance: 0,
                contains: [
                  {
                    begin: /:/,
                    end: /[=,\/]/,
                    endsWithParent: true,
                    contains: [o, e.C_LINE_COMMENT_MODE, c],
                    relevance: 0
                  },
                  e.C_LINE_COMMENT_MODE,
                  c,
                  l,
                  r,
                  t,
                  e.C_NUMBER_MODE
                ]
              },
              c
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface trait",
            end: /[:\{(]|$/,
            excludeEnd: true,
            illegal: "extends implements",
            contains: [
              {
                beginKeywords: "public protected internal private constructor"
              },
              e.UNDERSCORE_TITLE_MODE,
              {
                className: "type",
                begin: /</,
                end: />/,
                excludeBegin: true,
                excludeEnd: true,
                relevance: 0
              },
              {
                className: "type",
                begin: /[,:]\s*/,
                end: /[<\(,]|$/,
                excludeBegin: true,
                returnEnd: true
              },
              l,
              r
            ]
          },
          t,
          {
            className: "meta",
            begin: "^#!/usr/bin/env",
            end: "$",
            illegal: "\n"
          },
          {
            className: "number",
            begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "scss",
  (() => {
    return (e) => {
      var t = "@[a-z-]+", i = {
        className: "variable",
        begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
      }, r = {
        className: "number",
        begin: "#[0-9A-Fa-f]+"
      };
      return e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
        name: "SCSS",
        case_insensitive: true,
        illegal: "[=/|']",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "selector-id",
            begin: "#[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-class",
            begin: "\\.[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]",
            illegal: "$"
          },
          {
            className: "selector-tag",
            begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            relevance: 0
          },
          {
            className: "selector-pseudo",
            begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
          },
          {
            className: "selector-pseudo",
            begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
          },
          i,
          {
            className: "attribute",
            begin: "\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            illegal: "[^\\s]"
          },
          {
            begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
          },
          {
            begin: ":",
            end: ";",
            contains: [
              i,
              r,
              e.CSS_NUMBER_MODE,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              {
                className: "meta",
                begin: "!important"
              }
            ]
          },
          {
            begin: "@(page|font-face)",
            lexemes: t,
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            returnBegin: true,
            keywords: "and or not only",
            contains: [
              { begin: t, className: "keyword" },
              i,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              r,
              e.CSS_NUMBER_MODE
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "yaml",
  (() => {
    return (e) => {
      var n = "true false yes no null", a = "[\\w#;/?:@&=+$,.~*'()[\\]]+", s = {
        className: "string",
        relevance: 0,
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /\S+/ }
        ],
        contains: [
          e.BACKSLASH_ESCAPE,
          {
            className: "template-variable",
            variants: [
              { begin: /\{\{/, end: /\}\}/ },
              { begin: /%\{/, end: /\}/ }
            ]
          }
        ]
      }, i = e.inherit(s, {
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /[^\s,{}[\]]+/ }
        ]
      }), l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: [],
        keywords: n,
        relevance: 0
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, g = {
        begin: "\\[",
        end: "\\]",
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, b = [
        {
          className: "attr",
          variants: [
            { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
            {
              begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
            },
            { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" }
          ]
        },
        { className: "meta", begin: "^---\\s*$", relevance: 10 },
        {
          className: "string",
          begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^\\n]+\\n(\\2[^\\n]+\\n?)*"
        },
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0
        },
        { className: "type", begin: "!\\w+!" + a },
        { className: "type", begin: "!<" + a + ">" },
        { className: "type", begin: "!" + a },
        { className: "type", begin: "!!" + a },
        { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "meta", begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "bullet", begin: "-(?=[ ]|$)", relevance: 0 },
        e.HASH_COMMENT_MODE,
        { beginKeywords: n, keywords: { literal: n } },
        {
          className: "number",
          begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
        },
        { className: "number", begin: e.C_NUMBER_RE + "\\b", relevance: 0 },
        t,
        g,
        s
      ], r = [...b];
      return r.pop(), r.push(i), l.contains = r, {
        name: "YAML",
        case_insensitive: true,
        aliases: ["yml", "YAML"],
        contains: b
      };
    };
  })()
);
hljs.registerLanguage(
  "markdown",
  (() => {
    function n(...n2) {
      return n2.map((n3) => {
        return (e = n3) ? "string" == typeof e ? e : e.source : null;
        var e;
      }).join("");
    }
    return (e) => {
      const a = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0
      }, i = {
        variants: [
          { begin: /\[.+?\]\[.*?\]/, relevance: 0 },
          {
            begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
            relevance: 2
          },
          {
            begin: n(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
            relevance: 2
          },
          { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 },
          {
            begin: /\[.+?\]\(.*?\)/,
            relevance: 0
          }
        ],
        returnBegin: true,
        contains: [
          {
            className: "string",
            relevance: 0,
            begin: "\\[",
            end: "\\]",
            excludeBegin: true,
            returnEnd: true
          },
          {
            className: "link",
            relevance: 0,
            begin: "\\]\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "symbol",
            relevance: 0,
            begin: "\\]\\[",
            end: "\\]",
            excludeBegin: true,
            excludeEnd: true
          }
        ]
      }, s = {
        className: "strong",
        contains: [],
        variants: [
          { begin: /_{2}/, end: /_{2}/ },
          { begin: /\*{2}/, end: /\*{2}/ }
        ]
      }, c = {
        className: "emphasis",
        contains: [],
        variants: [
          { begin: /\*(?!\*)/, end: /\*/ },
          {
            begin: /_(?!_)/,
            end: /_/,
            relevance: 0
          }
        ]
      };
      s.contains.push(c), c.contains.push(s);
      let t = [a, i];
      return s.contains = s.contains.concat(t), c.contains = c.contains.concat(t), t = t.concat(s, c), {
        name: "Markdown",
        aliases: ["md", "mkdown", "mkd"],
        contains: [
          {
            className: "section",
            variants: [
              { begin: "^#{1,6}", end: "$", contains: t },
              {
                begin: "(?=^.+?\\n[=-]{2,}$)",
                contains: [
                  { begin: "^[=-]*$" },
                  { begin: "^", end: "\\n", contains: t }
                ]
              }
            ]
          },
          a,
          {
            className: "bullet",
            begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
            end: "\\s+",
            excludeEnd: true
          },
          s,
          c,
          { className: "quote", begin: "^>\\s+", contains: t, end: "$" },
          {
            className: "code",
            variants: [
              { begin: "(`{3,})(.|\\n)*?\\1`*[ ]*" },
              {
                begin: "(~{3,})(.|\\n)*?\\1~*[ ]*"
              },
              { begin: "```", end: "```+[ ]*$" },
              { begin: "~~~", end: "~~~+[ ]*$" },
              { begin: "`.+?`" },
              {
                begin: "(?=^( {4}|\\t))",
                contains: [
                  {
                    begin: "^( {4}|\\t)",
                    end: "(\\n)$"
                  }
                ],
                relevance: 0
              }
            ]
          },
          { begin: "^[-\\*]{3,}", end: "$" },
          i,
          {
            begin: /^\[[^\n]+\]:/,
            returnBegin: true,
            contains: [
              {
                className: "symbol",
                begin: /\[/,
                end: /\]/,
                excludeBegin: true,
                excludeEnd: true
              },
              { className: "link", begin: /:\s*/, end: /$/, excludeBegin: true }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "lua",
  (() => {
    return (e) => {
      const t = "\\[=*\\[", a = "\\]=*\\]", n = { begin: t, end: a, contains: ["self"] }, o = [
        e.COMMENT("--(?!\\[=*\\[)", "$"),
        e.COMMENT("--\\[=*\\[", a, { contains: [n], relevance: 10 })
      ];
      return {
        name: "Lua",
        keywords: {
          $pattern: e.UNDERSCORE_IDENT_RE,
          literal: "true false nil",
          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        },
        contains: o.concat([
          {
            className: "function",
            beginKeywords: "function",
            end: "\\)",
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
              }),
              {
                className: "params",
                begin: "\\(",
                endsWithParent: true,
                contains: o
              }
            ].concat(o)
          },
          e.C_NUMBER_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          { className: "string", begin: t, end: a, contains: [n], relevance: 5 }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "go",
  (() => {
    return (e) => {
      const n = {
        keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
        literal: "true false iota nil",
        built_in: "append cap close complex copy imag len make new panic print println real recover delete"
      };
      return {
        name: "Go",
        aliases: ["golang"],
        keywords: n,
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "string",
            variants: [
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              { begin: "`", end: "`" }
            ]
          },
          {
            className: "number",
            variants: [
              { begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
              e.C_NUMBER_MODE
            ]
          },
          { begin: /:=/ },
          {
            className: "function",
            beginKeywords: "func",
            end: "\\s*(\\{|$)",
            excludeEnd: true,
            contains: [
              e.TITLE_MODE,
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                illegal: /["']/
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "properties",
  (() => {
    return (e) => {
      var n = "[ \\t\\f]*", a = n + "[:=]" + n, t = "(" + a + "|[ \\t\\f]+)", r = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+", s = "([^\\\\:= \\t\\f\\n]|\\\\.)+", i = {
        end: t,
        relevance: 0,
        starts: {
          className: "string",
          end: /$/,
          relevance: 0,
          contains: [
            {
              begin: "\\\\\\n"
            }
          ]
        }
      };
      return {
        name: ".properties",
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          e.COMMENT("^\\s*[!#]", "$"),
          {
            returnBegin: true,
            variants: [
              { begin: r + a, relevance: 1 },
              { begin: r + "[ \\t\\f]+", relevance: 0 }
            ],
            contains: [
              { className: "attr", begin: r, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          {
            begin: s + t,
            returnBegin: true,
            relevance: 0,
            contains: [
              { className: "meta", begin: s, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          { className: "attr", relevance: 0, begin: s + n + "$" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "diff",
  (() => {
    return (e) => ({
      name: "Diff",
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          variants: [
            {
              begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
            },
            { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
            {
              begin: /^--- +\d+,\d+ +----$/
            }
          ]
        },
        {
          className: "comment",
          variants: [
            { begin: /Index: /, end: /$/ },
            { begin: /^index/, end: /$/ },
            { begin: /={3,}/, end: /$/ },
            { begin: /^-{3}/, end: /$/ },
            { begin: /^\*{3} /, end: /$/ },
            { begin: /^\+{3}/, end: /$/ },
            { begin: /^\*{15}$/ },
            {
              begin: /^diff --git/,
              end: /$/
            }
          ]
        },
        { className: "addition", begin: /^\+/, end: /$/ },
        {
          className: "deletion",
          begin: /^-/,
          end: /$/
        },
        { className: "addition", begin: /^!/, end: /$/ }
      ]
    });
  })()
);
hljs.registerLanguage(
  "javascript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function r(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (t) => {
      const c = e, o = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        isTrulyOpeningTag: (e2, n2) => {
          const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
          "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
            const a3 = "</" + e3[0].slice(1);
            return -1 !== e3.input.indexOf(a3, n3);
          })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
        }
      }, l = {
        $pattern: e,
        keyword: n.join(" "),
        literal: a.join(" "),
        built_in: s.join(" ")
      }, b = "\\.([0-9](_?[0-9])*)", g = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
        className: "number",
        variants: [
          {
            begin: `(\\b(${g})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
          },
          {
            begin: `\\b(${g})\\b((${b})\\b|\\.)?|(${b})\\b`
          },
          {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          },
          {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          },
          { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
          {
            begin: "\\b0[0-7]+n?\\b"
          }
        ],
        relevance: 0
      }, E = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: l,
        contains: []
      }, u = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "xml"
        }
      }, _2 = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "css"
        }
      }, m = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [t.BACKSLASH_ESCAPE, E]
      }, N = {
        className: "comment",
        variants: [
          t.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+",
                contains: [
                  {
                    className: "type",
                    begin: "\\{",
                    end: "\\}",
                    relevance: 0
                  },
                  {
                    className: "variable",
                    begin: c + "(?=\\s*(-)|$)",
                    endsParent: true,
                    relevance: 0
                  },
                  {
                    begin: /(?=[^\n])\s/,
                    relevance: 0
                  }
                ]
              }
            ]
          }),
          t.C_BLOCK_COMMENT_MODE,
          t.C_LINE_COMMENT_MODE
        ]
      }, y = [
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE,
        u,
        _2,
        m,
        d,
        t.REGEXP_MODE
      ];
      E.contains = y.concat({
        begin: /\{/,
        end: /\}/,
        keywords: l,
        contains: ["self"].concat(y)
      });
      const f = [].concat(N, E.contains), A = f.concat([
        { begin: /\(/, end: /\)/, keywords: l, contains: ["self"].concat(f) }
      ]), p = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: l,
        contains: A
      };
      return {
        name: "Javascript",
        aliases: ["js", "jsx", "mjs", "cjs"],
        keywords: l,
        exports: { PARAMS_CONTAINS: A },
        illegal: /#(?![$_A-z])/,
        contains: [
          t.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
          {
            label: "use_strict",
            className: "meta",
            relevance: 10,
            begin: /^\s*['"]use (strict|asm)['"]/
          },
          t.APOS_STRING_MODE,
          t.QUOTE_STRING_MODE,
          u,
          _2,
          m,
          N,
          d,
          {
            begin: i(
              /[{,\n]\s*/,
              r(i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))
            ),
            relevance: 0,
            contains: [
              { className: "attr", begin: c + r("\\s*:"), relevance: 0 }
            ]
          },
          {
            begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
            keywords: "return throw case",
            contains: [
              N,
              t.REGEXP_MODE,
              {
                className: "function",
                begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>",
                returnBegin: true,
                end: "\\s*=>",
                contains: [
                  {
                    className: "params",
                    variants: [
                      {
                        begin: t.UNDERSCORE_IDENT_RE,
                        relevance: 0
                      },
                      { className: null, begin: /\(\s*\)/, skip: true },
                      {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: l,
                        contains: A
                      }
                    ]
                  }
                ]
              },
              { begin: /,/, relevance: 0 },
              { className: "", begin: /\s/, end: /\s*/, skip: true },
              {
                variants: [
                  { begin: "<>", end: "</>" },
                  {
                    begin: o.begin,
                    "on:begin": o.isTrulyOpeningTag,
                    end: o.end
                  }
                ],
                subLanguage: "xml",
                contains: [
                  { begin: o.begin, end: o.end, skip: true, contains: ["self"] }
                ]
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "function",
            end: /[{;]/,
            excludeEnd: true,
            keywords: l,
            contains: ["self", t.inherit(t.TITLE_MODE, { begin: c }), p],
            illegal: /%/
          },
          {
            beginKeywords: "while if switch catch for"
          },
          {
            className: "function",
            begin: t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
            returnBegin: true,
            contains: [p, t.inherit(t.TITLE_MODE, { begin: c })]
          },
          {
            variants: [
              {
                begin: "\\." + c
              },
              { begin: "\\$" + c }
            ],
            relevance: 0
          },
          {
            className: "class",
            beginKeywords: "class",
            end: /[{;=]/,
            excludeEnd: true,
            illegal: /[:"[\]]/,
            contains: [
              {
                beginKeywords: "extends"
              },
              t.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            begin: /\b(?=constructor)/,
            end: /[{;]/,
            excludeEnd: true,
            contains: [t.inherit(t.TITLE_MODE, { begin: c }), "self", p]
          },
          {
            begin: "(get|set)\\s+(?=" + c + "\\()",
            end: /\{/,
            keywords: "get set",
            contains: [
              t.inherit(t.TITLE_MODE, { begin: c }),
              { begin: /\(\)/ },
              p
            ]
          },
          { begin: /\$[(.]/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "perl",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var t = {
        $pattern: /[\w.]+/,
        keyword: "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmget sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
      }, s = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: t }, r = { begin: /->\{/, end: /\}/ }, i = {
        variants: [
          { begin: /\$\d/ },
          {
            begin: e(
              /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
              "(?![A-Za-z])(?![@$%])"
            )
          },
          { begin: /[$%@][^\s\w{]/, relevance: 0 }
        ]
      }, a = [n.BACKSLASH_ESCAPE, s, i], o = [
        i,
        n.HASH_COMMENT_MODE,
        n.COMMENT(/^=\w/, /=cut/, {
          endsWithParent: true
        }),
        r,
        {
          className: "string",
          contains: a,
          variants: [
            {
              begin: "q[qwxr]?\\s*\\(",
              end: "\\)",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
            {
              begin: "q[qwxr]?\\s*\\|",
              end: "\\|",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
            { begin: "qw\\s+q", end: "q", relevance: 5 },
            { begin: "'", end: "'", contains: [n.BACKSLASH_ESCAPE] },
            { begin: '"', end: '"' },
            { begin: "`", end: "`", contains: [n.BACKSLASH_ESCAPE] },
            { begin: /\{\w+\}/, contains: [], relevance: 0 },
            {
              begin: "-?\\w+\\s*=>",
              contains: [],
              relevance: 0
            }
          ]
        },
        {
          className: "number",
          begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0
        },
        {
          begin: "(\\/\\/|" + n.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
          keywords: "split return print reverse grep",
          relevance: 0,
          contains: [
            n.HASH_COMMENT_MODE,
            {
              className: "regexp",
              begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
              relevance: 10
            },
            {
              className: "regexp",
              begin: "(m|qr)?/",
              end: "/[a-z]*",
              contains: [n.BACKSLASH_ESCAPE],
              relevance: 0
            }
          ]
        },
        {
          className: "function",
          beginKeywords: "sub",
          end: "(\\s*\\(.*?\\))?[;{]",
          excludeEnd: true,
          relevance: 5,
          contains: [n.TITLE_MODE]
        },
        {
          begin: "-\\w\\b",
          relevance: 0
        },
        {
          begin: "^__DATA__$",
          end: "^__END__$",
          subLanguage: "mojolicious",
          contains: [{ begin: "^@@.*", end: "$", className: "comment" }]
        }
      ];
      return s.contains = o, r.contains = o, { name: "Perl", aliases: ["pl", "pm"], keywords: t, contains: o };
    };
  })()
);
hljs.registerLanguage(
  "plaintext",
  (() => {
    return (t) => ({
      name: "Plain text",
      aliases: ["text", "txt"],
      disableAutodetect: true
    });
  })()
);
hljs.registerLanguage(
  "ini",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    return (s) => {
      const a = {
        className: "number",
        relevance: 0,
        variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: s.NUMBER_RE }]
      }, i = s.COMMENT();
      i.variants = [
        { begin: /;/, end: /$/ },
        { begin: /#/, end: /$/ }
      ];
      const t = {
        className: "variable",
        variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
      }, r = { className: "literal", begin: /\bon|off|true|false|yes|no\b/ }, l = {
        className: "string",
        contains: [s.BACKSLASH_ESCAPE],
        variants: [
          { begin: "'''", end: "'''", relevance: 10 },
          { begin: '"""', end: '"""', relevance: 10 },
          { begin: '"', end: '"' },
          { begin: "'", end: "'" }
        ]
      }, c = {
        begin: /\[/,
        end: /\]/,
        contains: [i, r, t, l, a, "self"],
        relevance: 0
      }, g = "(" + [/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/].map((n2) => e(n2)).join("|") + ")";
      return {
        name: "TOML, also INI",
        aliases: ["toml"],
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          i,
          { className: "section", begin: /\[+/, end: /\]+/ },
          {
            begin: n(
              g,
              "(\\s*\\.\\s*",
              g,
              ")*",
              n("(?=", /\s*=\s*[^#\s]/, ")")
            ),
            className: "attr",
            starts: { end: /$/, contains: [i, c, r, t, l, a] }
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "sql",
  (() => {
    return (e) => {
      var t = e.COMMENT("--", "$");
      return {
        name: "SQL",
        case_insensitive: true,
        illegal: /[<>{}*]/,
        contains: [
          {
            beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
            end: /;/,
            endsWithParent: true,
            keywords: {
              $pattern: /[\w\.]+/,
              keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
              literal: "true false null unknown",
              built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void"
            },
            contains: [
              {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{ begin: "''" }]
              },
              {
                className: "string",
                begin: '"',
                end: '"',
                contains: [{ begin: '""' }]
              },
              {
                className: "string",
                begin: "`",
                end: "`"
              },
              e.C_NUMBER_MODE,
              e.C_BLOCK_COMMENT_MODE,
              t,
              e.HASH_COMMENT_MODE
            ]
          },
          e.C_BLOCK_COMMENT_MODE,
          t,
          e.HASH_COMMENT_MODE
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python-repl",
  (() => {
    return (s) => ({
      aliases: ["pycon"],
      contains: [
        {
          className: "meta",
          starts: { end: / |$/, starts: { end: "$", subLanguage: "python" } },
          variants: [
            { begin: /^>>>(?=[ ]|$)/ },
            {
              begin: /^\.\.\.(?=[ ]|$)/
            }
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "csharp",
  (() => {
    return (e) => {
      var n = {
        keyword: [
          "abstract",
          "as",
          "base",
          "break",
          "case",
          "class",
          "const",
          "continue",
          "do",
          "else",
          "event",
          "explicit",
          "extern",
          "finally",
          "fixed",
          "for",
          "foreach",
          "goto",
          "if",
          "implicit",
          "in",
          "interface",
          "internal",
          "is",
          "lock",
          "namespace",
          "new",
          "operator",
          "out",
          "override",
          "params",
          "private",
          "protected",
          "public",
          "readonly",
          "record",
          "ref",
          "return",
          "sealed",
          "sizeof",
          "stackalloc",
          "static",
          "struct",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "unchecked",
          "unsafe",
          "using",
          "virtual",
          "void",
          "volatile",
          "while"
        ].concat([
          "add",
          "alias",
          "and",
          "ascending",
          "async",
          "await",
          "by",
          "descending",
          "equals",
          "from",
          "get",
          "global",
          "group",
          "init",
          "into",
          "join",
          "let",
          "nameof",
          "not",
          "notnull",
          "on",
          "or",
          "orderby",
          "partial",
          "remove",
          "select",
          "set",
          "unmanaged",
          "value|0",
          "var",
          "when",
          "where",
          "with",
          "yield"
        ]).join(" "),
        built_in: "bool byte char decimal delegate double dynamic enum float int long nint nuint object sbyte short string ulong unit ushort",
        literal: "default false null true"
      }, a = e.inherit(e.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }), i = {
        className: "number",
        variants: [
          {
            begin: "\\b(0b[01']+)"
          },
          {
            begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
          },
          {
            begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
          }
        ],
        relevance: 0
      }, s = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{ begin: '""' }]
      }, t = e.inherit(s, { illegal: /\n/ }), r = { className: "subst", begin: /\{/, end: /\}/, keywords: n }, l = e.inherit(r, { illegal: /\n/ }), c = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [
          { begin: /\{\{/ },
          { begin: /\}\}/ },
          e.BACKSLASH_ESCAPE,
          l
        ]
      }, o = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [
          {
            begin: /\{\{/
          },
          { begin: /\}\}/ },
          { begin: '""' },
          r
        ]
      }, d = e.inherit(o, {
        illegal: /\n/,
        contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, l]
      });
      r.contains = [
        o,
        c,
        s,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.C_BLOCK_COMMENT_MODE
      ], l.contains = [
        d,
        c,
        t,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.inherit(e.C_BLOCK_COMMENT_MODE, {
          illegal: /\n/
        })
      ];
      var g = { variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, E = {
        begin: "<",
        end: ">",
        contains: [{ beginKeywords: "in out" }, a]
      }, _2 = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", b = {
        begin: "@" + e.IDENT_RE,
        relevance: 0
      };
      return {
        name: "C#",
        aliases: ["cs", "c#"],
        keywords: n,
        illegal: /::/,
        contains: [
          e.COMMENT("///", "$", {
            returnBegin: true,
            contains: [
              {
                className: "doctag",
                variants: [
                  { begin: "///", relevance: 0 },
                  {
                    begin: "<!--|-->"
                  },
                  { begin: "</?", end: ">" }
                ]
              }
            ]
          }),
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "meta",
            begin: "#",
            end: "$",
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
          },
          g,
          i,
          {
            beginKeywords: "class interface",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:,]/,
            contains: [
              { beginKeywords: "where class" },
              a,
              E,
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            beginKeywords: "record",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            className: "meta",
            begin: "^\\s*\\[",
            excludeBegin: true,
            end: "\\]",
            excludeEnd: true,
            contains: [
              {
                className: "meta-string",
                begin: /"/,
                end: /"/
              }
            ]
          },
          {
            beginKeywords: "new return throw await else",
            relevance: 0
          },
          {
            className: "function",
            begin: "(" + _2 + "\\s+)+" + e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
            returnBegin: true,
            end: /\s*[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
                relevance: 0
              },
              {
                begin: e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
                returnBegin: true,
                contains: [e.TITLE_MODE, E],
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: n,
                relevance: 0,
                contains: [g, i, e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          b
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php",
  (() => {
    return (e) => {
      const r = {
        className: "variable",
        begin: "\\$+[a-zA-Z_\x7F-\xFF][a-zA-Z0-9_\x7F-\xFF]*(?![A-Za-z0-9])(?![$])"
      }, t = {
        className: "meta",
        variants: [
          { begin: /<\?php/, relevance: 10 },
          { begin: /<\?[=]?/ },
          {
            begin: /\?>/
          }
        ]
      }, a = {
        className: "subst",
        variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }]
      }, n = e.inherit(e.APOS_STRING_MODE, { illegal: null }), i = e.inherit(e.QUOTE_STRING_MODE, {
        illegal: null,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), o = e.END_SAME_AS_BEGIN({
        begin: /<<<[ \t]*(\w+)\n/,
        end: /[ \t]*(\w+)\b/,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), l = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          e.inherit(n, { begin: "b'", end: "'" }),
          e.inherit(i, { begin: 'b"', end: '"' }),
          i,
          n,
          o
        ]
      }, c = {
        variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE]
      }, s = {
        keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 new object or private protected public real return string switch throw trait try unset use var void while xor yield",
        literal: "false null true",
        built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
      };
      return {
        aliases: ["php", "php3", "php4", "php5", "php6", "php7", "php8"],
        case_insensitive: true,
        keywords: s,
        contains: [
          e.HASH_COMMENT_MODE,
          e.COMMENT("//", "$", { contains: [t] }),
          e.COMMENT("/\\*", "\\*/", {
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.COMMENT("__halt_compiler.+?;", false, {
            endsWithParent: true,
            keywords: "__halt_compiler"
          }),
          t,
          { className: "keyword", begin: /\$this\b/ },
          r,
          {
            begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
          },
          {
            className: "function",
            relevance: 0,
            beginKeywords: "fn function",
            end: /[;{]/,
            excludeEnd: true,
            illegal: "[$%\\[]",
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              { begin: "=>" },
              {
                className: "params",
                begin: "\\(",
                end: "\\)",
                excludeBegin: true,
                excludeEnd: true,
                keywords: s,
                contains: ["self", r, e.C_BLOCK_COMMENT_MODE, l, c]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface",
            relevance: 0,
            end: /\{/,
            excludeEnd: true,
            illegal: /[:($"]/,
            contains: [
              { beginKeywords: "extends implements" },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: ";",
            illegal: /[.']/,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            beginKeywords: "use",
            relevance: 0,
            end: ";",
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          l,
          c
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php-template",
  (() => {
    return (n) => ({
      name: "PHP template",
      subLanguage: "xml",
      contains: [
        {
          begin: /<\?(php|=)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            { begin: "/\\*", end: "\\*/", skip: true },
            { begin: 'b"', end: '"', skip: true },
            { begin: "b'", end: "'", skip: true },
            n.inherit(n.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            }),
            n.inherit(n.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            })
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "rust",
  (() => {
    return (e) => {
      const n = "([ui](8|16|32|64|128|size)|f(32|64))?", t = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
      return {
        name: "Rust",
        aliases: ["rs"],
        keywords: {
          $pattern: e.IDENT_RE + "!?",
          keyword: "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
          literal: "true false Some None Ok Err",
          built_in: t
        },
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
          e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
          {
            className: "string",
            variants: [
              { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
              {
                begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
              }
            ]
          },
          { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ },
          {
            className: "number",
            variants: [
              {
                begin: "\\b0b([01_]+)" + n
              },
              { begin: "\\b0o([0-7_]+)" + n },
              {
                begin: "\\b0x([A-Fa-f0-9_]+)" + n
              },
              {
                begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "fn",
            end: "(\\(|<)",
            excludeEnd: true,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "meta",
            begin: "#!?\\[",
            end: "\\]",
            contains: [{ className: "meta-string", begin: /"/, end: /"/ }]
          },
          {
            className: "class",
            beginKeywords: "type",
            end: ";",
            contains: [
              e.inherit(e.UNDERSCORE_TITLE_MODE, {
                endsParent: true
              })
            ],
            illegal: "\\S"
          },
          {
            className: "class",
            beginKeywords: "trait enum struct union",
            end: /\{/,
            contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: true })],
            illegal: "[\\w\\d]"
          },
          { begin: e.IDENT_RE + "::", keywords: { built_in: t } },
          { begin: "->" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "shell",
  (() => {
    return (s) => ({
      name: "Shell Session",
      aliases: ["console"],
      contains: [
        {
          className: "meta",
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
          starts: { end: /[^\\](?=\s*$)/, subLanguage: "bash" }
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "apache",
  (() => {
    return (e) => {
      const n = {
        className: "number",
        begin: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?"
      };
      return {
        name: "Apache config",
        aliases: ["apacheconf"],
        case_insensitive: true,
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "section",
            begin: "</?",
            end: ">",
            contains: [
              n,
              { className: "number", begin: ":\\d{1,5}" },
              e.inherit(e.QUOTE_STRING_MODE, { relevance: 0 })
            ]
          },
          {
            className: "attribute",
            begin: /\w+/,
            relevance: 0,
            keywords: {
              nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
              end: /$/,
              relevance: 0,
              keywords: { literal: "on off all deny allow" },
              contains: [
                { className: "meta", begin: "\\s\\[", end: "\\]$" },
                {
                  className: "variable",
                  begin: "[\\$%]\\{",
                  end: "\\}",
                  contains: [
                    "self",
                    { className: "number", begin: "[\\$%]\\d+" }
                  ]
                },
                n,
                { className: "number", begin: "\\d+" },
                e.QUOTE_STRING_MODE
              ]
            }
          }
        ],
        illegal: /\S/
      };
    };
  })()
);
hljs.registerLanguage(
  "css",
  (() => {
    return (e) => {
      var n = "[a-zA-Z-][a-zA-Z0-9_-]*", a = {
        begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/,
        returnBegin: true,
        end: ";",
        endsWithParent: true,
        contains: [
          {
            className: "attribute",
            begin: /\S/,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              excludeEnd: true,
              contains: [
                {
                  begin: /[\w-]+\(/,
                  returnBegin: true,
                  contains: [
                    { className: "built_in", begin: /[\w-]+/ },
                    {
                      begin: /\(/,
                      end: /\)/,
                      contains: [
                        e.APOS_STRING_MODE,
                        e.QUOTE_STRING_MODE,
                        e.CSS_NUMBER_MODE
                      ]
                    }
                  ]
                },
                e.CSS_NUMBER_MODE,
                e.QUOTE_STRING_MODE,
                e.APOS_STRING_MODE,
                e.C_BLOCK_COMMENT_MODE,
                {
                  className: "number",
                  begin: "#[0-9A-Fa-f]+"
                },
                { className: "meta", begin: "!important" }
              ]
            }
          }
        ]
      };
      return {
        name: "CSS",
        case_insensitive: true,
        illegal: /[=|'\$]/,
        contains: [
          e.C_BLOCK_COMMENT_MODE,
          { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
          { className: "selector-class", begin: "\\." + n },
          {
            className: "selector-attr",
            begin: /\[/,
            end: /\]/,
            illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          },
          { className: "selector-pseudo", begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/ },
          {
            begin: "@(page|font-face)",
            lexemes: "@[a-z-]+",
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            illegal: /:/,
            returnBegin: true,
            contains: [
              { className: "keyword", begin: /@-?\w[\w]*(-\w+)*/ },
              {
                begin: /\s/,
                endsWithParent: true,
                excludeEnd: true,
                relevance: 0,
                keywords: "and or not only",
                contains: [
                  { begin: /[a-z-]+:/, className: "attribute" },
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  e.CSS_NUMBER_MODE
                ]
              }
            ]
          },
          { className: "selector-tag", begin: n, relevance: 0 },
          {
            begin: /\{/,
            end: /\}/,
            illegal: /\S/,
            contains: [e.C_BLOCK_COMMENT_MODE, { begin: /;/ }, a]
          }
        ]
      };
    };
  })()
);
const MkitCsslist = [
  {
    value: "a11y-dark.css",
    label: "a11y-dark.css"
  },
  {
    value: "a11y-light.css",
    label: "a11y-light.css"
  },
  {
    value: "agate.css",
    label: "agate.css"
  },
  {
    value: "an-old-hope.css",
    label: "an-old-hope.css"
  },
  {
    value: "androidstudio.css",
    label: "androidstudio.css"
  },
  {
    value: "arduino-light.css",
    label: "arduino-light.css"
  },
  {
    value: "arta.css",
    label: "arta.css"
  },
  {
    value: "ascetic.css",
    label: "ascetic.css"
  },
  {
    value: "atelier-cave-dark.css",
    label: "atelier-cave-dark.css"
  },
  {
    value: "atelier-cave-light.css",
    label: "atelier-cave-light.css"
  },
  {
    value: "atelier-dune-dark.css",
    label: "atelier-dune-dark.css"
  },
  {
    value: "atelier-dune-light.css",
    label: "atelier-dune-light.css"
  },
  {
    value: "atelier-estuary-dark.css",
    label: "atelier-estuary-dark.css"
  },
  {
    value: "atelier-estuary-light.css",
    label: "atelier-estuary-light.css"
  },
  {
    value: "atelier-forest-dark.css",
    label: "atelier-forest-dark.css"
  },
  {
    value: "atelier-forest-light.css",
    label: "atelier-forest-light.css"
  },
  {
    value: "atelier-heath-dark.css",
    label: "atelier-heath-dark.css"
  },
  {
    value: "atelier-heath-light.css",
    label: "atelier-heath-light.css"
  },
  {
    value: "atelier-lakeside-dark.css",
    label: "atelier-lakeside-dark.css"
  },
  {
    value: "atelier-lakeside-light.css",
    label: "atelier-lakeside-light.css"
  },
  {
    value: "atelier-plateau-dark.css",
    label: "atelier-plateau-dark.css"
  },
  {
    value: "atelier-plateau-light.css",
    label: "atelier-plateau-light.css"
  },
  {
    value: "atelier-savanna-dark.css",
    label: "atelier-savanna-dark.css"
  },
  {
    value: "atelier-savanna-light.css",
    label: "atelier-savanna-light.css"
  },
  {
    value: "atelier-seaside-dark.css",
    label: "atelier-seaside-dark.css"
  },
  {
    value: "atelier-seaside-light.css",
    label: "atelier-seaside-light.css"
  },
  {
    value: "atelier-sulphurpool-dark.css",
    label: "atelier-sulphurpool-dark.css"
  },
  {
    value: "atelier-sulphurpool-light.css",
    label: "atelier-sulphurpool-light.css"
  },
  {
    value: "atom-one-dark-reasonable.css",
    label: "atom-one-dark-reasonable.css"
  },
  {
    value: "atom-one-dark.css",
    label: "atom-one-dark.css"
  },
  {
    value: "atom-one-light.css",
    label: "atom-one-light.css"
  },
  {
    value: "brown-paper.css",
    label: "brown-paper.css"
  },
  {
    value: "codepen-embed.css",
    label: "codepen-embed.css"
  },
  {
    value: "color-brewer.css",
    label: "color-brewer.css"
  },
  {
    value: "darcula.css",
    label: "darcula.css"
  },
  {
    value: "dark.css",
    label: "dark.css"
  },
  {
    value: "default.css",
    label: "default.css"
  },
  {
    value: "docco.css",
    label: "docco.css"
  },
  {
    value: "dracula.css",
    label: "dracula.css"
  },
  {
    value: "far.css",
    label: "far.css"
  },
  {
    value: "foundation.css",
    label: "foundation.css"
  },
  {
    value: "github-gist.css",
    label: "github-gist.css"
  },
  {
    value: "github.css",
    label: "github.css"
  },
  {
    value: "gml.css",
    label: "gml.css"
  },
  {
    value: "googlecode.css",
    label: "googlecode.css"
  },
  {
    value: "gradient-dark.css",
    label: "gradient-dark.css"
  },
  {
    value: "gradient-light.css",
    label: "gradient-light.css"
  },
  {
    value: "grayscale.css",
    label: "grayscale.css"
  },
  {
    value: "gruvbox-dark.css",
    label: "gruvbox-dark.css"
  },
  {
    value: "gruvbox-light.css",
    label: "gruvbox-light.css"
  },
  {
    value: "hopscotch.css",
    label: "hopscotch.css"
  },
  {
    value: "hybrid.css",
    label: "hybrid.css"
  },
  {
    value: "idea.css",
    label: "idea.css"
  },
  {
    value: "ir-black.css",
    label: "ir-black.css"
  },
  {
    value: "isbl-editor-dark.css",
    label: "isbl-editor-dark.css"
  },
  {
    value: "isbl-editor-light.css",
    label: "isbl-editor-light.css"
  },
  {
    value: "kimbie.dark.css",
    label: "kimbie.dark.css"
  },
  {
    value: "kimbie.light.css",
    label: "kimbie.light.css"
  },
  {
    value: "lightfair.css",
    label: "lightfair.css"
  },
  {
    value: "lioshi.css",
    label: "lioshi.css"
  },
  {
    value: "magula.css",
    label: "magula.css"
  },
  {
    value: "mono-blue.css",
    label: "mono-blue.css"
  },
  {
    value: "monokai-sublime.css",
    label: "monokai-sublime.css"
  },
  {
    value: "monokai.css",
    label: "monokai.css"
  },
  {
    value: "night-owl.css",
    label: "night-owl.css"
  },
  {
    value: "nnfx-dark.css",
    label: "nnfx-dark.css"
  },
  {
    value: "nnfx.css",
    label: "nnfx.css"
  },
  {
    value: "nord.css",
    label: "nord.css"
  },
  {
    value: "obsidian.css",
    label: "obsidian.css"
  },
  {
    value: "ocean.css",
    label: "ocean.css"
  },
  {
    value: "paraiso-dark.css",
    label: "paraiso-dark.css"
  },
  {
    value: "paraiso-light.css",
    label: "paraiso-light.css"
  },
  {
    value: "pojoaque.css",
    label: "pojoaque.css"
  },
  {
    value: "purebasic.css",
    label: "purebasic.css"
  },
  {
    value: "qtcreator_dark.css",
    label: "qtcreator_dark.css"
  },
  {
    value: "qtcreator_light.css",
    label: "qtcreator_light.css"
  },
  {
    value: "railscasts.css",
    label: "railscasts.css"
  },
  {
    value: "rainbow.css",
    label: "rainbow.css"
  },
  {
    value: "routeros.css",
    label: "routeros.css"
  },
  {
    value: "school-book.css",
    label: "school-book.css"
  },
  {
    value: "shades-of-purple.css",
    label: "shades-of-purple.css"
  },
  {
    value: "solarized-dark.css",
    label: "solarized-dark.css"
  },
  {
    value: "solarized-light.css",
    label: "solarized-light.css"
  },
  {
    value: "srcery.css",
    label: "srcery.css"
  },
  {
    value: "stackoverflow-dark.css",
    label: "stackoverflow-dark.css"
  },
  {
    value: "stackoverflow-light.css",
    label: "stackoverflow-light.css"
  },
  {
    value: "sunburst.css",
    label: "sunburst.css"
  },
  {
    value: "tomorrow-night-blue.css",
    label: "tomorrow-night-blue.css"
  },
  {
    value: "tomorrow-night-bright.css",
    label: "tomorrow-night-bright.css"
  },
  {
    value: "tomorrow-night-eighties.css",
    label: "tomorrow-night-eighties.css"
  },
  {
    value: "tomorrow-night.css",
    label: "tomorrow-night.css"
  },
  {
    value: "tomorrow.css",
    label: "tomorrow.css"
  },
  {
    value: "vs.css",
    label: "vs.css"
  },
  {
    value: "vs2015.css",
    label: "vs2015.css"
  },
  {
    value: "xcode.css",
    label: "xcode.css"
  },
  {
    value: "xt256.css",
    label: "xt256.css"
  },
  {
    value: "zenburn.css",
    label: "zenburn.css"
  }
];
const setTheme = async (theme) => {
  theme = theme || localStorage.markdownHightlightTheme || "monokai-sublime.css";
  const cssURL = `${State_UI.assetsPath}/highlightstyles/${theme}`;
  localStorage.markdownHightlightTheme = theme;
  const content = await xU.asyncLoadText(cssURL);
  const id = `markdonw-hightlight-style`;
  const $style = $(`#${id}`);
  if ($style.length == 0) {
    $("body").append($("<style/>", {
      id
    }));
  }
  $style.html(content);
};
const MkitTheme = Vue.defineComponent({
  setup() {
    return {
      setTheme
    };
  },
  computed: {
    cssURL() {
      return;
    }
  },
  watch: {
    theme: {
      immediate: true,
      async handler(theme) {
        this.setTheme(theme);
      }
    }
  },
  data() {
    return {
      theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
    };
  },
  render() {
    return Vue.withDirectives(Vue.createVNode("select", {
      "class": "markdown-theme",
      "onUpdate:modelValue": ($event) => this.theme = $event
    }, [xU.map(MkitCsslist, (i) => {
      return Vue.createVNode("option", {
        "key": i.value,
        "value": i.value
      }, [i.label]);
    })]), [[Vue.vModelSelect, this.theme]]);
  }
});
const MarkdownIt_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  props: ["md"],
  setup() {
    setTheme();
  },
  data() {
    return {
      originHTML: "",
      html: "",
      configsPopoverChangeTheme: {
        trigger: "rightClick",
        content: MkitTheme,
        openAtPoint: true
      }
    };
  },
  async mounted() {
    this.init();
  },
  watch: {
    md() {
      this.init();
    }
  },
  methods: {
    init() {
      this.originHTML = this.md || this.$slots.default()[0].children;
      const { Renderer } = marked;
      marked.options = { langClass: "hljs" };
      const renderer = new Renderer();
      this.html = marked(this.originHTML, {
        renderer,
        highlight: (code) => hljs.highlightAuto(code).value
      });
    }
  }
};
const _hoisted_1 = {
  class: "markdown-wrapper",
  title: "\u53F3\u952E\u70B9\u51FB\u53EF\u4EE5\u4FEE\u6539<code/>\u5143\u7D20\u9AD8\u4EAE\u6837\u5F0F"
};
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_uiPopover = Vue.resolveDirective("uiPopover");
  return Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [
    Vue.createElementVNode("div", {
      class: "markdown-wrapper_description mt10",
      innerHTML: $data.html
    }, null, 8, _hoisted_2)
  ])), [
    [_directive_uiPopover, $data.configsPopoverChangeTheme]
  ]);
}
const Mkit = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const DialogSourceCode = Vue.defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  render() {
    return Vue.createVNode("div", {
      "class": "padding20"
    }, [Vue.createVNode(Vue.resolveComponent("mkit"), {
      "md": this.propDialogOptions.code
    }, null)]);
  }
});
const DemoAndCode = Vue.defineComponent({
  props: ["path", "title"],
  setup() {
    return {
      State_UI
    };
  },
  computed: {
    sfcURL() {
      return `${this.State_UI.assetsPath}${this.path}`;
    },
    styleContainer() {
      return {
        position: "relative",
        overflow: this.isFold ? "hidden" : "unset",
        height: this.isFold ? "48px" : "unset"
      };
    }
  },
  data() {
    return {
      isInitDone: false,
      isFold: true,
      isLoading: true,
      BussinessComponent: false,
      BussinessComponentSourceCode: ""
    };
  },
  methods: {
    toggleFold() {
      this.isFold = !this.isFold;
      if (!this.isInitDone) {
        this.getBussinessComponent();
      }
    },
    async rerun(scfObjSourceCode) {
      const _BussinessComponent = await xU.getVueComponentBySourceCode(this.sfcURL, scfObjSourceCode, new Proxy({
        reactive: Vue.reactive,
        defineComponent: Vue.defineComponent,
        markRaw: Vue.markRaw,
        State_UI,
        xU,
        UI,
        compileVNode,
        defXVirTableConfigs,
        defCol,
        $: _global_$,
        defItem,
        resolveComponent: Vue.resolveComponent,
        App
      }, {
        get(target, prop) {
          if (target.hasOwnProperty(prop)) {
            return target[prop];
          }
          if (xU[prop]) {
            return xU[prop];
          }
          return Vue[prop];
        }
      }));
      this.BussinessComponent = Vue.markRaw(_BussinessComponent);
      this.isLoading = false;
    },
    async getBussinessComponent() {
      this.BussinessComponentSourceCode = await xU.asyncLoadText(this.sfcURL);
      const scfObjSourceCode = xU.VueLoader(this.BussinessComponentSourceCode);
      this.rerun(scfObjSourceCode);
    },
    showSourceCodeDialog() {
      UI.dialog.component({
        title: this.path,
        component: DialogSourceCode,
        maxmin: true,
        fullscreen: true,
        area: ["500px", "400px"],
        code: `\`\`\`js
${this.BussinessComponentSourceCode}
\`\`\``,
        hideButtons: true
      });
    }
  },
  render() {
    return Vue.withDirectives(Vue.createVNode("div", {
      "class": "padding10",
      "style": this.styleContainer
    }, [Vue.createVNode("div", {
      "class": "pointer",
      "onClick": this.toggleFold,
      "style": `color: rgba(0, 0, 0, 0.85); font-weight: 600; font-size:18px;`
    }, [this.title || this.sfcURL, Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "icon": this.isFold ? "fold" : "unfold",
      "class": "mb10 ml10"
    }, null)]), Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "icon": "rerun",
      "onClick": this.getBussinessComponent,
      "class": "mb10 pointer",
      "style": {
        position: "absolute",
        top: "48px",
        right: "20px",
        width: "16px",
        height: "16px",
        zIndex: 1
      }
    }, null), Vue.createVNode(Vue.resolveComponent("xIcon"), {
      "icon": "sourcecode",
      "onClick": this.showSourceCodeDialog,
      "class": "mb10 pointer",
      "style": {
        position: "absolute",
        top: "48px",
        right: 0,
        width: "16px",
        height: "16px",
        zIndex: 1
      }
    }, null), this.BussinessComponent ? Vue.h(this.BussinessComponent) : null]), [[Vue.resolveDirective("loading"), this.isLoading]]);
  }
});
const getIcon = (icon) => {
  return Vue.createVNode(Vue.resolveComponent("xIcon"), {
    "icon": icon,
    "style": "width:16px;height:100%;",
    "class": "auto-size"
  }, null);
};
const _sfc_main = Vue.defineComponent({
  name: "xMenuTree",
  props: ["tree", "authFn"],
  setup() {
    return {};
  },
  data(vm) {
    vm.setActiveMenuHighlight = VentoseUI.xU.debounce(function () {
      const openKey = vm.pathAndIdCollection[vm.currentPath];
      if (!openKey) {
        return;
      }
      vm.onOpenChange([openKey]);
      vm.arr_selectedMenuId = [openKey];
    }, 300);
    return {
      openKeys: [],
      pathAndIdCollection: {},
      arr_selectedMenuId: []
    };
  },
  watch: {
    currentPath: {
      immediate: true,
      handler() {
        if (this.setActiveMenuHighlight) {
          this.setActiveMenuHighlight();
        }
      }
    }
  },
  methods: {
    onOpenChange(openKeys) {
      if (!VentoseUI.xU.isArrayFill(openKeys)) {
        return;
      }
      const latestOpenKey = VentoseUI.xU.last(openKeys) || "";
      const openKeyArray = VentoseUI.xU.safeSplit(latestOpenKey, "###").filter((i) => i);
      const _openKeys = [];
      for (let index2 = 0; index2 < openKeyArray.length; index2++) {
        const element = openKeyArray[index2];
        if (index2 === 0) {
          _openKeys[0] = `###${element}`;
        } else {
          _openKeys[index2] = `${_openKeys[index2 - 1]}###${element}`;
        }
      }
      this.openKeys = _openKeys;
    }
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    subTree() {
      const vm = this;
      const treeArray = this.tree || [];
      const MenuItemRender = (currentMenuInfo, parentId) => {
        const currentId = `${parentId}###${currentMenuInfo.id}`;
        if (this.authFn) {
          if (!this.authFn(currentMenuInfo)) {
            return null;
          }
        }
        if (VentoseUI.xU.isArrayFill(currentMenuInfo.children)) {
          return Vue.createVNode(Vue.resolveComponent("aSubMenu"), {
            "key": currentId
          }, {
            icon: () => getIcon(currentMenuInfo.icon),
            title: () => currentMenuInfo.label,
            default: () => VentoseUI.xU.map(currentMenuInfo.children, (i) => MenuItemRender(i, currentId))
          });
        } else {
          vm.pathAndIdCollection[currentMenuInfo.path] = currentId;
          return Vue.createVNode(Vue.resolveComponent("aMenuItem"), {
            "key": currentId,
            "class": "flex middle"
          }, {
            icon: () => getIcon(currentMenuInfo.icon),
            title: () => currentMenuInfo.label,
            default: () => {
              if (currentMenuInfo.payload) {
                if (currentMenuInfo.payload.openType && currentMenuInfo.payload.openType === "NEW_TAB") {
                  const isDisabled = {};
                  if (!currentMenuInfo.path) {
                    isDisabled.disabled = true;
                  }
                  return Vue.createVNode("a", Vue.mergeProps({
                    "title": currentMenuInfo.label
                  }, isDisabled, {
                    "href": currentMenuInfo.path,
                    "target": "_blank",
                    "onClick": (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (!currentMenuInfo.path) {
                        return;
                      }
                      currentMenuInfo.path && window.open(currentMenuInfo.path, "_blank");
                    }
                  }), [currentMenuInfo.label]);
                }
              }
              return Vue.createVNode(Vue.Fragment, null, [Vue.createVNode(Vue.resolveComponent("RouterLink"), {
                "to": currentMenuInfo.path || "/404"
              }, {
                default: () => [currentMenuInfo.label]
              })]);
            }
          });
        }
      };
      if (VentoseUI.xU.isArrayFill(treeArray)) {
        return VentoseUI.xU.map(treeArray, (i) => {
          return MenuItemRender(i, "");
        });
      } else {
        return null;
      }
    }
  },
  render() {
    return Vue.createVNode(Vue.resolveComponent("aMenu"), {
      "openKeys": this.openKeys,
      "onOpenChange": this.onOpenChange,
      "selectedKeys": this.arr_selectedMenuId,
      "onUpdate:selectedKeys": ($event) => this.arr_selectedMenuId = $event,
      "mode": "inline"
    }, {
      default: () => [this.subTree]
    });
  }
});
const appPlugins = {
  install: (app2, options) => {
    app2.use(VentoseUI.VentoseUIWithInstall, {
      appPlugins,
      dependState: options.dependState
    });
    app2.use({
      install: (app3, {
        watch
      } = {}) => {
        var _a;
        app3.component(_sfc_main.name, _sfc_main);
        app3.component("Mkit", Mkit);
        app3.component("DemoAndCode", DemoAndCode);
        app3.config.globalProperties.$t = VentoseUI.State_UI.$t;
        const link = document.getElementById("svg_assets_img");
        console.log(link);
        debugger;
        if (link) {
          const src = String(link.href);
          const index2 = ((_a = src.match(/assets(.*)/)) == null ? void 0 : _a.index) || 0;
          VentoseUI.State_UI.setBasePath(src.substring(0, index2));
        }
        VentoseUI.$("html").attr("lang", VentoseUI.State_UI.language);
        watch && watch();
      }
    });
    app2.use(router);
    return app2;
  }
};
const State_App = Vue.reactive({});
document.title = "vue3+antdv+components";
Vue.createApp(App).use(appPlugins, {
  dependState: State_App
}).mount("#app");
const app = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main as _,
  defItem as a,
  defCol as b,
  compileVNode as c,
  defXVirTableConfigs as d,
  _export_sfc as e,
  app as f,
  xU as x
};
