import { a as _export_sfc } from "./app.js";
import "../../index.js";
const _sfc_main = {
  name: "DemoXIcon"
};
const _hoisted_1 = {
  class: "flex vertical",
  style: { "text-align": "left" }
};
const _hoisted_2 = { class: "flex middle" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = /* @__PURE__ */ Vue.createElementVNode("h2", null, " ventoseUI \u5185\u7F6Esvg,\u5728\u9884\u7F6E\u6309\u94AE\u91CC\u9762\u7528\u3002\u4EE5Inside\u4F5C\u4E3A\u524D\u7F00,\u4E00\u822C\u4E0D\u9700\u8981\u7528\u5230 ", -1);
const _hoisted_5 = { class: "flex" };
const _hoisted_6 = { class: "" };
const _hoisted_7 = /* @__PURE__ */ Vue.createElementVNode("h2", null, "\u4ECE/public/assets/svg\u52A0\u8F7D", -1);
const _hoisted_8 = { class: "flex vertical" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = Vue.resolveComponent("xIcon");
  return Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [
    Vue.createElementVNode("div", _hoisted_2, [
      Vue.createVNode(_component_xIcon, {
        icon: "unknown",
        class: "auto-size"
      }),
      Vue.createTextVNode(" \u672A\u52A0\u8F7D\u51FA\u6765\u9ED8\u8BA4\u56FE\u6807 ")
    ]),
    Vue.createElementVNode("div", _hoisted_3, [
      _hoisted_4,
      Vue.createElementVNode("div", _hoisted_5, [
        Vue.createVNode(_component_xIcon, {
          icon: "InsideDeleteOutlined",
          style: { "color": "gray" }
        }),
        Vue.createVNode(_component_xIcon, {
          icon: "InsideExclamationCircleOutlined",
          style: { "color": "red" }
        }),
        Vue.createVNode(_component_xIcon, { icon: "InsideLoadingOutlined" }),
        Vue.createVNode(_component_xIcon, { icon: "InsideSaveOutlined" }),
        Vue.createVNode(_component_xIcon, { icon: "InsideSearchOutlined" }),
        Vue.createVNode(_component_xIcon, { icon: "InsideSyncOutlined" }),
        Vue.createVNode(_component_xIcon, { icon: "InsideUploadOutlined" })
      ])
    ]),
    Vue.createElementVNode("div", _hoisted_6, [
      _hoisted_7,
      Vue.createElementVNode("div", _hoisted_8, [
        Vue.createElementVNode("span", null, [
          Vue.createVNode(_component_xIcon, {
            icon: "vite",
            style: { "color": "red", "width": "64px", "height": "64px" },
            class: "auto-size"
          }),
          Vue.createTextVNode(" vite ")
        ]),
        Vue.createElementVNode("span", null, [
          Vue.createVNode(_component_xIcon, {
            icon: "UserOutlined",
            style: { "color": "gray", "width": "64px", "height": "64px" }
          }),
          Vue.createTextVNode(" UserOutlined ")
        ])
      ])
    ])
  ]);
}
const DemoXIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DemoXIcon as default
};
