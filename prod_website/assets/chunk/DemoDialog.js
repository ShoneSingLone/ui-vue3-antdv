import { a as _export_sfc } from "./app.js";
import "../../index.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DemoAndCode = Vue.resolveComponent("DemoAndCode");
  return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createVNode(_component_DemoAndCode, {
      title: "v-uiPopover\u7684\u4F7F\u7528",
      path: "/boundless/demo/uiPopover/DemoUiPopoverNormal.sfc"
    }),
    Vue.createVNode(_component_DemoAndCode, {
      title: "UI.dialog.component \u5F39\u7A97",
      path: "/boundless/demo/uiPopover/DemouiDialogComponent.sfc"
    })
  ], 64);
}
const DemoDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DemoDialog as default
};
