import { a as _export_sfc } from "./app.js";
import "../../index.js";
const ITEM_OPTIONS = {
  status: [
    { label: "\u5F00\u901A", value: "ACTIVATED" },
    { label: "\u672A\u5F00\u901A", value: "NONACTIVATED" }
  ],
  statusFn(action) {
    if (action === "all") {
      return [{ label: "\u6240\u6709\u72B6\u6001", value: "" }].concat(this.status);
    }
    return this.status;
  },
  serviceType: [
    { label: "\u955C\u50CF", value: 1 },
    { label: "SAAS", value: 0 }
  ],
  support: [
    { label: "\u652F\u6301", value: 1 },
    { label: "\u4E0D\u652F\u6301", value: 0 }
  ],
  specType: [
    { label: "aarch64", value: "aarch64" },
    { label: "x86_64", value: "x86_64" }
  ],
  vmStatus: [
    { label: "\u8FD0\u884C\u4E2D", value: "ACTIVE" },
    { label: "--", value: "DELETE" }
  ],
  instanceStatus: [
    { label: "\u5DF2\u6FC0\u6D3B", value: 7 },
    { label: "\u5220\u9664\u6210\u529F", value: 4 }
  ],
  op: [
    { label: "\u8DF3\u8F6C", value: 0 },
    { label: "\u8BBF\u95EE\u7BA1\u7406", value: 1 },
    { label: "\u53D8\u66F4", value: 2 },
    { label: "\u9500\u6BC1", value: 3 },
    { label: "agent\u4E0B\u8F7D", value: 4 }
  ]
};
const _sfc_main = {
  name: "DemoXDataGrid",
  methods: {
    handlePaginationChange(pagination) {
      VentoseUI.xU("\u{1F680}:", "pagination", JSON.stringify(pagination, null, 2));
    }
  },
  data() {
    return {
      configs_table: VentoseUI.defDataGridOption({
        async queryTableList(params) {
        },
        dataSource: [],
        columns: {
          ...VentoseUI.defCol({
            prop: "name",
            label: VentoseUI.$t("\u540D\u79F0").label
          }),
          ...VentoseUI.defCol({
            prop: "status",
            label: VentoseUI.$t("\u72B6\u6001").label,
            renderCell({
              record
            }) {
              return `${VentoseUI.xU.valueToLabel(record.status, ITEM_OPTIONS.status)}`;
            }
          }),
          ...VentoseUI.defCol({
            prop: "capacity",
            label: VentoseUI.$t("\u603B\u5BB9\u91CF").label,
            renderCell({
              record
            }) {
              const {
                totalCapacity,
                usedCapacity,
                status
              } = record;
              if (status === "ACTIVATION") {
                return "--";
              }
              return `${usedCapacity || "--"} / ${totalCapacity || "--"} GB`;
            }
          }),
          ...VentoseUI.defCol({
            prop: "category",
            label: VentoseUI.$t("\u7C7B\u522B").label,
            renderCell({
              record
            }) {
              if (record.tenant) {
                return VentoseUI.$t("\u79DF\u6237").label;
              }
              if (record.level) {
                return VentoseUI.$t("\u7EA7VDC", {
                  level: record.level || "1"
                }).label;
              }
              return "--";
            }
          }),
          ...VentoseUI.defCol({
            prop: "upperName",
            isShow: false,
            label: VentoseUI.$t("\u4E0A\u7EA7\u540D\u79F0").label
          }),
          ...VentoseUI.defCol({
            prop: "startDate",
            label: VentoseUI.$t("\u5F00\u59CB\u65F6\u95F4").label,
            renderCell({
              record
            }) {
              return VentoseUI.xU.dateFormat(record.startDate);
            }
          }),
          ...VentoseUI.defCol({
            prop: "endDate",
            label: VentoseUI.$t("\u5230\u671F\u65F6\u95F4").label,
            renderCell({
              record
            }) {
              return VentoseUI.xU.dateFormat(record.endDate);
            }
          })
        }
      })
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DemoAndCode = Vue.resolveComponent("DemoAndCode");
  const _component_mkit = Vue.resolveComponent("mkit");
  const _component_xDataGrid = Vue.resolveComponent("xDataGrid");
  const _component_xPagination = Vue.resolveComponent("xPagination");
  return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createVNode(_component_DemoAndCode, {
      title: "xVirTable\uFF1A\u865A\u62DF\u5217\u8868\u7528\u4E8E\u65E0\u5206\u9875\u7684\u5927\u91CF\u6570\u636E\u5C55\u793A",
      path: "/boundless/demo/table/DemoXDataGridxVirTable.sfc"
    }),
    Vue.createVNode(_component_DemoAndCode, {
      title: "xVirTable\u52A8\u6001\u6DFB\u52A0\u884C\u8BB0\u5F55",
      path: "/boundless/demo/table/DemoXDataGridxVirTableDynamicAdd.sfc"
    }),
    Vue.createVNode(_component_mkit, { md: "### xDataGrid" }),
    Vue.createVNode(_component_xDataGrid, { configs: $data.configs_table }, null, 8, ["configs"]),
    Vue.createVNode(_component_mkit, { md: "### xPagination" }),
    Vue.createVNode(_component_xPagination, {
      class: "table-pagination",
      pagination: $data.configs_table.pagination,
      onPaginationChange: $options.handlePaginationChange
    }, null, 8, ["pagination", "onPaginationChange"])
  ], 64);
}
const DemoXDataGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DemoXDataGrid as default
};
