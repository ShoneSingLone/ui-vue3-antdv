(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("vue"), require("@ventose/ui")) : typeof define === "function" && define.amd ? define(["vue", "@ventose/ui"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.VentoseUI = global.VentoseUI || {}, global.VentoseUI.components = global.VentoseUI.components || {}, global.VentoseUI.components.xMenuTree = factory(global.Vue, global.VentoseUI));
})(this, function(vue, ui) {
  "use strict";
  const getIcon = (icon) => {
    return vue.createVNode(vue.resolveComponent("xIcon"), {
      "icon": icon,
      "style": "width:16px;height:100%;",
      "class": "auto-size"
    }, null);
  };
  const _sfc_main = vue.defineComponent({
    name: "xMenuTree",
    props: ["tree", "authFn"],
    setup() {
      return {};
    },
    data(vm) {
      vm.setActiveMenuHighlight = ui.xU.debounce(function() {
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
        if (!ui.xU.isArrayFill(openKeys)) {
          return;
        }
        const latestOpenKey = ui.xU.last(openKeys) || "";
        const openKeyArray = ui.xU.safeSplit(latestOpenKey, "###").filter((i) => i);
        const _openKeys = [];
        for (let index = 0; index < openKeyArray.length; index++) {
          const element = openKeyArray[index];
          if (index === 0) {
            _openKeys[0] = `###${element}`;
          } else {
            _openKeys[index] = `${_openKeys[index - 1]}###${element}`;
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
          if (ui.xU.isArrayFill(currentMenuInfo.children)) {
            return vue.createVNode(vue.resolveComponent("aSubMenu"), {
              "key": currentId
            }, {
              icon: () => getIcon(currentMenuInfo.icon),
              title: () => currentMenuInfo.label,
              default: () => ui.xU.map(currentMenuInfo.children, (i) => MenuItemRender(i, currentId))
            });
          } else {
            vm.pathAndIdCollection[currentMenuInfo.path] = currentId;
            return vue.createVNode(vue.resolveComponent("elMenuItem"), {
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
                    return vue.createVNode("a", vue.mergeProps({
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
                return vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.resolveComponent("RouterLink"), {
                  "to": currentMenuInfo.path || "/404"
                }, {
                  default: () => [currentMenuInfo.label]
                })]);
              }
            });
          }
        };
        if (ui.xU.isArrayFill(treeArray)) {
          return ui.xU.map(treeArray, (i) => {
            return MenuItemRender(i, "");
          });
        } else {
          return null;
        }
      }
    },
    render() {
      return vue.createVNode(vue.resolveComponent("elMenu"), {
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
  return _sfc_main;
});
