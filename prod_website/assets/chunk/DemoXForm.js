import{a as e}from"./app.js";import"../index.9c379766.js";const{$t:t}=VentoseUI.State_UI,l=Vue.defineComponent({props:{options:{type:Object,default:()=>({})}},data(){const{row:e}=this.options.payload||{},{name:l,age:o}=e||{};return{tips1:'### 自定义form 宽度，label宽度，居中\n```html\n<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">\n```\n```js\nconsole.log(window)\n//\n```',styleForm:{width:"120px","text-align":"right"},row:e||{},dataXItem:{...VentoseUI.defItem({value:l||"新增",label:t("name").label,prop:"name",rules:[VentoseUI.FormRules.required()]}),...VentoseUI.defItem({value:o||0,label:t("age").label,prop:"age",rules:[VentoseUI.FormRules.required()]})}}},methods:{async verifyForm(){const e=await VentoseUI.validateForm(this.dataXItem);return VentoseUI.AllWasWell(e)},getParams(){return{...this.row,...this.data}}},render(){return Vue.createVNode("div",{id:"DialogModifyIP"},[Vue.createVNode(Vue.resolveComponent("xForm"),{class:"flex vertical",labelStyle:this.styleForm},{default:()=>[Vue.createVNode(Vue.resolveComponent("aAlert"),{message:this.$t("提示信息").label,type:"info"},null),VentoseUI.xU.map(this.dataXItem,(e=>Vue.createVNode(Vue.Fragment,null,[Vue.createVNode(Vue.resolveComponent("xGap"),{t:"10"},null),Vue.createVNode(Vue.resolveComponent("xItem"),{configs:e},null)])))]}),Vue.createVNode(Vue.resolveComponent("mkit"),{md:'### 自定义form 宽度，label宽度，居中\n```js\n<xForm class="flex vertical" labelStyle={this.styleForm}>\n\t<aAlert message={this.$t("提示信息").label} type="info" />\n    {xU.map(this.dataXItem, (item) => {\n     return (<>\n      <xGap t="10" />\n      <xItem configs={item} />\n     </>);\n    })}\n</xForm>\n\ndataXItem: {\n    ...defItem({\n     value: name || "新增",\n     label: $t("name").label,\n     prop: "name",\n     rules: [FormRules.required()]\n    }),\n    ...defItem({\n     value: age || 0,\n     label: $t("age").label,\n     prop: "age",\n     rules: [FormRules.required()]\n    })\n   }\n\nstyleForm: {\n\twidth: "120px",\n\t\x3c!--todo:具体实现是join字符串，没有做camel的转换，所以用标准css属性短横线--\x3e\n\t"text-align": "right"\n}\n```'},null)])}}),{xItem:o}=VentoseUI.components,n={components:{DemoXFormWithForm:l},methods:{valid(){}},setup:e=>({pickValueFrom:VentoseUI.pickValueFrom}),computed:{valueFromConfigs(){return JSON.stringify(VentoseUI.pickValueFrom(this.xForm))}},data(){const e=this;return{configsValidBtn:{text:"校验",async onClick(){try{const t=await VentoseUI.validateForm(e.xForm);VentoseUI.AllWasWell(t)?VentoseUI.UI.message.success("校验成功"):VentoseUI.UI.message.error("校验失败")}catch(t){VentoseUI.UI.notification.error((null==t?void 0:t.message)||"错误")}}},formData:{inputValue:"v-model"},xForm:{...VentoseUI.defItem({value:[],prop:"slotsAddonBefore",itemType:"Select",options:[{label:VentoseUI.$t("类型A").label,value:"AAA"},{label:VentoseUI.$t("类型B").label,value:"BBB"}],style:{width:"80px"}}),...VentoseUI.defItem({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueEmit(e){console.log("🚀:","search configs",this,e)}}),...VentoseUI.defItem({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[VentoseUI.FormRules.required()]}),...VentoseUI.defItem({label:"slots",prop:"slots",value:"slots的value",placeholder:"Input",allowClear:!0,once(){const t=Vue.h(o,{configs:e.xForm.slotsAddonBefore});this.slots=Vue.markRaw({addonBefore:()=>t})},rules:[VentoseUI.FormRules.required()]}),...VentoseUI.defItem({labelVNodeRender:VentoseUI.VNodeCollection.labelTips(Vue.h("ul",null,[VentoseUI.$t("只能由英文字母(区分大小写)、数字和特殊字符@.\\_-组成").label,VentoseUI.$t('不能以"op_svc"、"paas_op"或\\开头').label,VentoseUI.$t("不能以\\结尾").label,VentoseUI.$t('不能命名为"admin"、"power_user"或"guest"').label,VentoseUI.$t("长度范围是4到32位").label].map((e=>Vue.h("li",null,e))))),label:VentoseUI.$t("label使用Tips").label,prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[VentoseUI.FormRules.required()]}),...VentoseUI.defItem({value:[],prop:"select",label:VentoseUI.$t("类型").label,itemType:"Select",options:[{label:VentoseUI.$t("类型A").label,value:"AAA"},{label:VentoseUI.$t("类型B").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})},tips1:'###\n```js\n<xItem :configs="xForm.search" class="flex1" v-model="formData.inputValue" />\nformData: {\n\tinputValue: "v-model"\n},\n...defItem({\n\tprop: "search",\n\tplaceholder: "Input",\n\tallowClear: true,\n\tonAfterValueEmit(val) {\n\t\tconsole.log("🚀:", "search configs", this, val);\n\t}\n}),\n```\n',tips2:'### 只使用configs绑定数据\n>必须有**value**属性\n```js\n<xItem :configs="xForm.select" class="flex1" />\n/* 必须有value属性 */\n...defItem({\n\tvalue: [],\n\tprop: "select",\n\tlabel: $t("类型").label,\n\titemType: "Select",\n\toptions: [\n\t\t{\n\t\t\tlabel: $t("类型A").label,\n\t\t\tvalue: "AAA"\n\t\t},\n\t\t{\n\t\t\tlabel: $t("类型B").label,\n\t\t\tvalue: "BBB"\n\t\t}\n\t],\n\tmode: "multiple",\n\tmaxTagCount: 1,\n\tmaxTagTextLength: 10,\n\tstyle: { width: "200px" }\n})\n```\n'}}},a={class:"mr10"},s={class:"flex middle mt10"},r={class:"mr10"},m={class:"mr10"},u={class:"flex middle mt10"},i={class:"mr10"},V=Vue.createElementVNode("div",{class:"mt10"},null,-1);const d=e(n,[["render",function(e,t,l,o,n,d){const c=Vue.resolveComponent("DemoAndCode"),p=Vue.resolveComponent("xButton"),f=Vue.resolveComponent("mkit"),I=Vue.resolveComponent("xItem"),x=Vue.resolveComponent("aCard"),g=Vue.resolveComponent("DemoXFormWithForm");return Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[Vue.createVNode(c,{title:"xItem基本用法",path:"/boundless/demo/xForm/DialogDemoXItem.sfc"}),Vue.createVNode(c,{title:"xItem特殊slot",path:"/boundless/demo/xForm/xItemSlot.sfc"}),Vue.createVNode(c,{title:"DatePicker",path:"/boundless/demo/xForm/xItemDatePicker.sfc"}),Vue.createVNode(x,null,{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(d.valueFromConfigs)+" ",1),Vue.createVNode(p,{configs:n.configsValidBtn},null,8,["configs"]),Vue.createVNode(f,{md:n.tips1},null,8,["md"]),Vue.createElementVNode("span",a,Vue.toDisplayString(n.formData.inputValue),1),Vue.createVNode(I,{configs:n.xForm.search,class:"flex1",modelValue:n.formData.inputValue,"onUpdate:modelValue":t[0]||(t[0]=e=>n.formData.inputValue=e)},null,8,["configs","modelValue"]),Vue.createVNode(f,{md:n.tips2},null,8,["md"]),Vue.createElementVNode("div",s,[Vue.createElementVNode("span",r,Vue.toDisplayString(n.xForm.slots.value),1),Vue.createVNode(I,{configs:n.xForm.slots,class:"flex1"},null,8,["configs"]),Vue.createElementVNode("span",m,Vue.toDisplayString(n.xForm.slotsAddonBefore.value),1)]),Vue.createElementVNode("div",u,[Vue.createElementVNode("span",i,Vue.toDisplayString(n.xForm.select.value),1),Vue.createVNode(I,{configs:n.xForm.select,class:"flex1"},null,8,["configs"])]),Vue.createVNode(I,{configs:n.xForm.withLabelProperty,class:"flex1",modelValue:n.formData.inputValue,"onUpdate:modelValue":t[1]||(t[1]=e=>n.formData.inputValue=e)},null,8,["configs","modelValue"])])),_:1}),V,Vue.createVNode(x,null,{default:Vue.withCtx((()=>[Vue.createVNode(g,{options:{payload:{row:{}}}})])),_:1})],64)}]]);export{d as default};
