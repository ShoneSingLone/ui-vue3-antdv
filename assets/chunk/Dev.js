import { _ as _sfc_main$1, d as defXVirTableConfigs, x as xU, a as defItem, b as defCol, c as compileVNode, e as _export_sfc } from "./app.js";
import "../index.ac72f167.js";
const _sfc_main = Vue.defineComponent({
  components: {
    xMenuTree: _sfc_main$1
  },
  data(vm) {
    return {
      configs_xVirTable: defXVirTableConfigs({
        rowHeight: 32,
        dataSource: [],
        dataSourceFilter(dataSource) {
          return xU.map(dataSource, (rowRecord) => {
            rowRecord.configsName = defItem.item({
              value: rowRecord.name
            });
            return rowRecord;
          });
        },
        columns: {
          ...defCol({
            prop: "name",
            label: vm.$t("\u540D\u79F0").label,
            renderCell: ({
              record
            }) => {
              return compileVNode(`<xItem :configs="record.configsName"/>`, {
                record
              });
            }
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => {
              return compileVNode(`<a @click="del(record.id)">del</a>`, {
                record,
                del: vm.del
              });
            }
          })
        }
      })
    };
  },
  mounted() {
    xU.scopeCss(this, ({
      selector
    }) => {
      return `
			${selector} *{
				outline:1px solid red;
			}
			`;
    });
    this.genNewData();
  },
  methods: {
    setTableValue(id, prop, val) {
      const recordIndex = xU.findIndex(this.configs_xVirTable.dataSource, {
        id
      });
      if (~recordIndex) {
        const item = this.configs_xVirTable.dataSource.splice(recordIndex, 1);
        item[prop] = val;
        this.configs_xVirTable.dataSource.splice(recordIndex, 0, item);
      }
    },
    updateDateSource() {
      xU.each(this.configs_xVirTable.dataSource, (rowRecord) => {
        rowRecord.name = rowRecord.configsName.value;
      });
    },
    del(id) {
      const index = xU.findIndex(this.configs_xVirTable.dataSource, {
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
        id: xU.genId("id"),
        name: "name"
      });
    },
    genNewData: xU.debounce(function() {
      this.configs_xVirTable.dataSource = [...new Array(2)].map((i, ii) => {
        const item = {
          id: xU.genId("id"),
          name: "name" + ii
        };
        return item;
      });
    }, 10)
  }
});
const Dev_vue_vue_type_style_index_0_scoped_f3522d65_lang = "";
const _withScopeId = (n) => (Vue.pushScopeId("data-v-f3522d65"), n = n(), Vue.popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ Vue.createElementVNode("div", { style: { "width": "600px", "height": "600px", "border": "1px solid black" } }, null, -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_aButton = Vue.resolveComponent("aButton");
  return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createVNode(_component_aButton, { onClick: _ctx.add }, {
      default: Vue.withCtx(() => [
        Vue.createTextVNode("add")
      ]),
      _: 1
    }, 8, ["onClick"]),
    _hoisted_1
  ], 64);
}
const Dev = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f3522d65"]]);
export {
  Dev as default
};
