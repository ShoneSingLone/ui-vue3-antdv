import { a as _export_sfc } from "./app.js";
import "../../index.js";
const {
  $t
} = VentoseUI.State_UI;
const DemoXFormWithForm = Vue.defineComponent({
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    const {
      row
    } = this.options.payload || {};
    const {
      name,
      age
    } = row || {};
    return {
      tips1: `### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
\`\`\`html
<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">
\`\`\`
\`\`\`js
console.log(window)
//
\`\`\``,
      styleForm: {
        width: "120px",
        "text-align": "right"
      },
      row: row || {},
      dataXItem: {
        ...VentoseUI.defItem({
          value: name || "\u65B0\u589E",
          label: $t("name").label,
          prop: "name",
          rules: [VentoseUI.FormRules.required()]
        }),
        ...VentoseUI.defItem({
          value: age || 0,
          label: $t("age").label,
          prop: "age",
          rules: [VentoseUI.FormRules.required()]
        })
      }
    };
  },
  methods: {
    async verifyForm() {
      const validateResults = await VentoseUI.validateForm(this.dataXItem);
      return VentoseUI.AllWasWell(validateResults);
    },
    getParams() {
      return {
        ...this.row,
        ...this.data
      };
    }
  },
  render() {
    return Vue.createVNode("div", {
      "id": "DialogModifyIP"
    }, [Vue.createVNode(Vue.resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": this.styleForm
    }, {
      default: () => [Vue.createVNode(Vue.resolveComponent("aAlert"), {
        "message": this.$t("\u63D0\u793A\u4FE1\u606F").label,
        "type": "info"
      }, null), VentoseUI.xU.map(this.dataXItem, (item) => {
        return Vue.createVNode(Vue.Fragment, null, [Vue.createVNode(Vue.resolveComponent("xGap"), {
          "t": "10"
        }, null), Vue.createVNode(Vue.resolveComponent("xItem"), {
          "configs": item
        }, null)]);
      })]
    }), Vue.createVNode(Vue.resolveComponent("mkit"), {
      "md": `### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
\`\`\`js
<xForm class="flex vertical" labelStyle={this.styleForm}>
	<aAlert message={this.$t("\u63D0\u793A\u4FE1\u606F").label} type="info" />
    {xU.map(this.dataXItem, (item) => {
     return (<>
      <xGap t="10" />
      <xItem configs={item} />
     </>);
    })}
</xForm>

dataXItem: {
    ...defItem({
     value: name || "\u65B0\u589E",
     label: $t("name").label,
     prop: "name",
     rules: [FormRules.required()]
    }),
    ...defItem({
     value: age || 0,
     label: $t("age").label,
     prop: "age",
     rules: [FormRules.required()]
    })
   }

styleForm: {
	width: "120px",
	<!--todo:\u5177\u4F53\u5B9E\u73B0\u662Fjoin\u5B57\u7B26\u4E32\uFF0C\u6CA1\u6709\u505Acamel\u7684\u8F6C\u6362\uFF0C\u6240\u4EE5\u7528\u6807\u51C6css\u5C5E\u6027\u77ED\u6A2A\u7EBF-->
	"text-align": "right"
}
\`\`\``
    }, null)]);
  }
});
const { xItem } = VentoseUI.components;
const _sfc_main = {
  components: {
    DemoXFormWithForm
  },
  methods: {
    valid() {
    }
  },
  setup(props) {
    return {
      pickValueFrom: VentoseUI.pickValueFrom
    };
  },
  computed: {
    valueFromConfigs() {
      return JSON.stringify(VentoseUI.pickValueFrom(this.xForm));
    }
  },
  data() {
    const vm = this;
    const xForm = {
      ...VentoseUI.defItem({
        value: [],
        prop: "slotsAddonBefore",
        itemType: "Select",
        options: [
          {
            label: VentoseUI.$t("\u7C7B\u578BA").label,
            value: "AAA"
          },
          {
            label: VentoseUI.$t("\u7C7B\u578BB").label,
            value: "BBB"
          }
        ],
        style: { width: "80px" }
      }),
      ...VentoseUI.defItem({
        prop: "search",
        placeholder: "Input",
        allowClear: true,
        onAfterValueEmit(val) {
          console.log("\u{1F680}:", "search configs", this, val);
        }
      }),
      ...VentoseUI.defItem({
        label: "withLabelProperty",
        prop: "withLabelProperty",
        placeholder: "Input",
        allowClear: true,
        rules: [VentoseUI.FormRules.required()]
      }),
      ...VentoseUI.defItem({
        label: "slots",
        prop: "slots",
        value: "slots\u7684value",
        placeholder: "Input",
        allowClear: true,
        once() {
          const vDomSlotsSelector = Vue.h(xItem, {
            configs: vm.xForm.slotsAddonBefore
          });
          this.slots = Vue.markRaw({
            addonBefore: () => vDomSlotsSelector
          });
        },
        rules: [VentoseUI.FormRules.required()]
      }),
      ...VentoseUI.defItem({
        labelVNodeRender: VentoseUI.VNodeCollection.labelTips(
          Vue.h(
            "ul",
            null,
            [
              VentoseUI.$t(`\u53EA\u80FD\u7531\u82F1\u6587\u5B57\u6BCD(\u533A\u5206\u5927\u5C0F\u5199)\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26@.\\_-\u7EC4\u6210`).label,
              VentoseUI.$t(`\u4E0D\u80FD\u4EE5"op_svc"\u3001"paas_op"\u6216\\\u5F00\u5934`).label,
              VentoseUI.$t(`\u4E0D\u80FD\u4EE5\\\u7ED3\u5C3E`).label,
              VentoseUI.$t(`\u4E0D\u80FD\u547D\u540D\u4E3A"admin"\u3001"power_user"\u6216"guest"`).label,
              VentoseUI.$t(`\u957F\u5EA6\u8303\u56F4\u662F4\u523032\u4F4D`).label
            ].map((content) => Vue.h("li", null, content))
          )
        ),
        label: VentoseUI.$t("label\u4F7F\u7528Tips").label,
        prop: "withLabelProperty",
        placeholder: "Input",
        allowClear: true,
        rules: [VentoseUI.FormRules.required()]
      }),
      ...VentoseUI.defItem({
        value: [],
        prop: "select",
        label: VentoseUI.$t("\u7C7B\u578B").label,
        itemType: "Select",
        options: [
          {
            label: VentoseUI.$t("\u7C7B\u578BA").label,
            value: "AAA"
          },
          {
            label: VentoseUI.$t("\u7C7B\u578BB").label,
            value: "BBB"
          }
        ],
        mode: "multiple",
        maxTagCount: 1,
        maxTagTextLength: 10,
        style: { width: "200px" }
      })
    };
    return {
      configsValidBtn: {
        text: "\u6821\u9A8C",
        async onClick() {
          try {
            const validateResults = await VentoseUI.validateForm(vm.xForm);
            if (VentoseUI.AllWasWell(validateResults)) {
              VentoseUI.UI.message.success("\u6821\u9A8C\u6210\u529F");
            } else {
              VentoseUI.UI.message.error("\u6821\u9A8C\u5931\u8D25");
            }
          } catch (error) {
            VentoseUI.UI.notification.error((error == null ? void 0 : error.message) || "\u9519\u8BEF");
          }
        }
      },
      formData: {
        inputValue: "v-model"
      },
      xForm,
      tips1: `###
\`\`\`js
<xItem :configs="xForm.search" class="flex1" v-model="formData.inputValue" />
formData: {
	inputValue: "v-model"
},
...defItem({
	prop: "search",
	placeholder: "Input",
	allowClear: true,
	onAfterValueEmit(val) {
		console.log("\u{1F680}:", "search configs", this, val);
	}
}),
\`\`\`
`,
      tips2: `### \u53EA\u4F7F\u7528configs\u7ED1\u5B9A\u6570\u636E
>\u5FC5\u987B\u6709**value**\u5C5E\u6027
\`\`\`js
<xItem :configs="xForm.select" class="flex1" />
/* \u5FC5\u987B\u6709value\u5C5E\u6027 */
...defItem({
	value: [],
	prop: "select",
	label: $t("\u7C7B\u578B").label,
	itemType: "Select",
	options: [
		{
			label: $t("\u7C7B\u578BA").label,
			value: "AAA"
		},
		{
			label: $t("\u7C7B\u578BB").label,
			value: "BBB"
		}
	],
	mode: "multiple",
	maxTagCount: 1,
	maxTagTextLength: 10,
	style: { width: "200px" }
})
\`\`\`
`
    };
  }
};
const _hoisted_1 = { class: "mr10" };
const _hoisted_2 = { class: "flex middle mt10" };
const _hoisted_3 = { class: "mr10" };
const _hoisted_4 = { class: "mr10" };
const _hoisted_5 = { class: "flex middle mt10" };
const _hoisted_6 = { class: "mr10" };
const _hoisted_7 = /* @__PURE__ */ Vue.createElementVNode("div", { class: "mt10" }, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DemoAndCode = Vue.resolveComponent("DemoAndCode");
  const _component_xButton = Vue.resolveComponent("xButton");
  const _component_mkit = Vue.resolveComponent("mkit");
  const _component_xItem = Vue.resolveComponent("xItem");
  const _component_ElCard = Vue.resolveComponent("ElCard");
  const _component_DemoXFormWithForm = Vue.resolveComponent("DemoXFormWithForm");
  return Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, [
    Vue.createVNode(_component_DemoAndCode, {
      title: "\u57FA\u672C\u7528\u6CD5",
      path: "/boundless/demo/xForm/DialogDemoXItem.sfc"
    }),
    Vue.createVNode(_component_DemoAndCode, {
      title: "slot",
      path: "/boundless/demo/xForm/xItemSlot.sfc"
    }),
    Vue.createVNode(_component_DemoAndCode, {
      title: "DatePicker",
      path: "/boundless/demo/xForm/xItemDatePicker.sfc"
    }),
    Vue.createVNode(_component_ElCard, null, {
      default: Vue.withCtx(() => [
        Vue.createTextVNode(Vue.toDisplayString($options.valueFromConfigs) + " ", 1),
        Vue.createVNode(_component_xButton, { configs: $data.configsValidBtn }, null, 8, ["configs"]),
        Vue.createVNode(_component_mkit, { md: $data.tips1 }, null, 8, ["md"]),
        Vue.createElementVNode("span", _hoisted_1, Vue.toDisplayString($data.formData.inputValue), 1),
        Vue.createVNode(_component_xItem, {
          configs: $data.xForm.search,
          class: "flex1",
          modelValue: $data.formData.inputValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.inputValue = $event)
        }, null, 8, ["configs", "modelValue"]),
        Vue.createVNode(_component_mkit, { md: $data.tips2 }, null, 8, ["md"]),
        Vue.createElementVNode("div", _hoisted_2, [
          Vue.createElementVNode("span", _hoisted_3, Vue.toDisplayString($data.xForm.slots.value), 1),
          Vue.createVNode(_component_xItem, {
            configs: $data.xForm.slots,
            class: "flex1"
          }, null, 8, ["configs"]),
          Vue.createElementVNode("span", _hoisted_4, Vue.toDisplayString($data.xForm.slotsAddonBefore.value), 1)
        ]),
        Vue.createElementVNode("div", _hoisted_5, [
          Vue.createElementVNode("span", _hoisted_6, Vue.toDisplayString($data.xForm.select.value), 1),
          Vue.createVNode(_component_xItem, {
            configs: $data.xForm.select,
            class: "flex1"
          }, null, 8, ["configs"])
        ]),
        Vue.createVNode(_component_xItem, {
          configs: $data.xForm.withLabelProperty,
          class: "flex1",
          modelValue: $data.formData.inputValue,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.inputValue = $event)
        }, null, 8, ["configs", "modelValue"])
      ]),
      _: 1
    }),
    _hoisted_7,
    Vue.createVNode(_component_ElCard, null, {
      default: Vue.withCtx(() => [
        Vue.createVNode(_component_DemoXFormWithForm, { options: { payload: { row: {} } } })
      ]),
      _: 1
    })
  ], 64);
}
const DemoXForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  DemoXForm as default
};
