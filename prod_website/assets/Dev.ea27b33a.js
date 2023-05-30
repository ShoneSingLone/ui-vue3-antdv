import { _ as _sfc_main$1, d as defXVirTableConfigs, x as xU, a as defItem, b as defCol, c as compileVNode, e as _export_sfc } from "./index.00781fbe.js";
import "@ventose/ui";
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
const Dev_vue_vue_type_style_index_0_scoped_969c009f_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const Dev = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-969c009f"]]);
export {
  Dev as default
};
