import { _ as _sfc_main$1, a as _export_sfc } from "./app.js";
import "../../index.js";
const _sfc_main = Vue.defineComponent({
  components: {
    xMenuTree: _sfc_main$1
  },
  setup() {
    const {
      scopeCss
    } = VentoseUI.xU.useScopeCss();
    return {
      scopeCss
    };
  },
  mounted() {
    this.scopeCss(({
      selector
    }) => `${selector} *{ outline:1px solid red; }`);
    setTimeout(() => {
      this.scopeCss(({
        selector
      }) => `${selector} *{ outline:1px solid green; }`);
      setTimeout(() => {
        this.scopeCss(({
          selector
        }) => `${selector} *{ outline:1px solid blue; }`);
        setTimeout(() => {
          this.scopeCss(({
            selector
          }) => ``);
        }, 3e3);
      }, 3e3);
    }, 3e3);
    this.genNewData();
  },
  data(vm) {
    return {
      date: VentoseUI.defItem.item({
        value: VentoseUI.xU.dateFormat(dayjs().subtract(1, "day")),
        prop: "period",
        itemType: "DatePicker",
        style: {
          width: "140px"
        }
      }),
      configs_xVirTable: VentoseUI.defXVirTableConfigs({
        rowHeight: 32,
        dataSource: [],
        dataSourceFilter(dataSource) {
          return VentoseUI.xU.map(dataSource, (rowRecord) => {
            rowRecord.configsName = VentoseUI.defItem.item({
              value: rowRecord.name
            });
            return rowRecord;
          });
        },
        columns: {
          ...VentoseUI.defCol({
            prop: "name",
            label: vm.$t("\u540D\u79F0").label,
            renderCell: ({
              record
            }) => {
              return VentoseUI.compileVNode(`<xItem :configs="record.configsName"/>`, {
                record
              });
            }
          }),
          ...VentoseUI.defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => {
              return VentoseUI.compileVNode(`<a @click="del(record.id)">del</a>`, {
                record,
                del: vm.del
              });
            }
          })
        }
      })
    };
  },
  methods: {
    setTableValue(id, prop, val) {
      const recordIndex = VentoseUI.xU.findIndex(this.configs_xVirTable.dataSource, {
        id
      });
      if (~recordIndex) {
        const item = this.configs_xVirTable.dataSource.splice(recordIndex, 1);
        item[prop] = val;
        this.configs_xVirTable.dataSource.splice(recordIndex, 0, item);
      }
    },
    updateDateSource() {
      VentoseUI.xU.each(this.configs_xVirTable.dataSource, (rowRecord) => {
        rowRecord.name = rowRecord.configsName.value;
      });
    },
    del(id) {
      const index = VentoseUI.xU.findIndex(this.configs_xVirTable.dataSource, {
        id
      });
      if (~index) {
        this.updateDateSource();
        this.configs_xVirTable.dataSource.splice(index, 1);
      }
    },
    add() {
      this.updateDateSource();
      this.configs_xVirTable.dataSource.unshift({
        id: VentoseUI.xU.genId("id"),
        name: "name"
      });
    },
    genNewData: VentoseUI.xU.debounce(function() {
      this.configs_xVirTable.dataSource = [...new Array(2)].map((i, ii) => {
        const item = {
          id: VentoseUI.xU.genId("id"),
          name: "name" + ii
        };
        return item;
      });
    }, 10)
  }
});
const Dev_vue_vue_type_style_index_0_scoped_522c8fa9_lang = "";
const _withScopeId = (n) => (Vue.pushScopeId("data-v-522c8fa9"), n = n(), Vue.popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ Vue.createElementVNode("div", { style: { "width": "600px", "height": "600px", "border": "1px solid black" } }, null, -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_elButton = Vue.resolveComponent("elButton");
  const _component_xItem = Vue.resolveComponent("xItem");
  return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createVNode(_component_elButton, { onClick: _ctx.add }, {
      default: Vue.withCtx(() => [
        Vue.createTextVNode("add")
      ]),
      _: 1
    }, 8, ["onClick"]),
    _hoisted_1,
    Vue.createVNode(_component_xItem, { configs: _ctx.date }, null, 8, ["configs"])
  ], 64);
}
const Dev = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-522c8fa9"]]);
export {
  Dev as default
};
