const DemoDirective = Vue.defineComponent({
  render() {
    return Vue.createVNode(Vue.Fragment, null, [Vue.createVNode(Vue.resolveComponent("DemoAndCode"), {
      "title": "\u4F7F\u7528v-uiMove\u5B8C\u6210\u79FB\u52A8\u76D1\u542C",
      "path": "/boundless/demo/directive/uiMove.sfc"
    }, null)]);
  }
});
export {
  DemoDirective as default
};
