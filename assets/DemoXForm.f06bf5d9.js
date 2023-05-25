import{x as n,E as r,S as y,a as s,v as N,A as _,e as A,$ as a,U as V,f as D}from"./index.8e4b0906.js";const{$t:h}=y,m=!1,i=!0,B={email:()=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile:()=>/^1[34578]\d{9}$/},b=e=>(e.trigger=e.trigger||[r.update],e.msg=e.msg||"",e),c={SUCCESS:m,FAIL:i,required(e,o=[r.update]){return b({name:"required",msg:e||h("\u5FC5\u586B\u9879").label,async validator(t){return t?n.isArray(t)?t.length>0?m:i:m:n.isBoolean(t)||n.isNumber(t)&&!n.isNaN(t)?m:i},trigger:o})},demo(){return{name:"Demo",msg:"Demo",async validator(e){return await n.sleep(1e3),i},trigger:[r.update,r.input,r.change,r.blur]}},email(){return{name:"email",msg:()=>h("\u8BF7\u8F93\u5165email").label,async validator(e){return B.email().test(e)?m:i},trigger:[r.update,r.input,r.change,r.blur]}},custom({name:e,msg:o,validator:t,trigger:u}){return b({name:e,msg:o,validator:t,trigger:u})}},v=e=>n.reduce(e,(o,t,u)=>{try{o[u]=JSON.parse(JSON.stringify(t.value))}catch{}return o},{}),S={labelTips:e=>(o,t)=>{const{prop:u,label:l}=o;return Vue.createVNode("div",{class:"ant-form-item-label"},[Vue.createVNode("label",{for:u,class:t},[l,Vue.createVNode(Vue.resolveComponent("aPopover"),{trigger:"hover",placement:"top"},{content:()=>e,default:()=>Vue.createVNode(Vue.resolveComponent("xIcon"),{icon:"Insidetips",class:"pointer ml4"},null)})])])}},{$t:F}=y,E=Vue.defineComponent({props:{options:{type:Object,default(){return{}}}},data(){const{row:e}=this.options.payload||{},{name:o,age:t}=e||{};return{tips1:'### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D\n```html\n<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">\n```\n```js\nconsole.log(window)\n//\n```',styleForm:{width:"120px","text-align":"right"},row:e||{},dataXItem:{...s({value:o||"\u65B0\u589E",label:F("name").label,prop:"name",rules:[c.required()]}),...s({value:t||0,label:F("age").label,prop:"age",rules:[c.required()]})}}},methods:{async verifyForm(){const e=await N(this.dataXItem);return _(e)},getParams(){return{...this.row,...this.data}}},render(){return Vue.createVNode("div",{id:"DialogModifyIP"},[Vue.createVNode(Vue.resolveComponent("xForm"),{class:"flex vertical",labelStyle:this.styleForm},{default:()=>[Vue.createVNode(Vue.resolveComponent("aAlert"),{message:this.$t("\u63D0\u793A\u4FE1\u606F").label,type:"info"},null),n.map(this.dataXItem,e=>Vue.createVNode(Vue.Fragment,null,[Vue.createVNode(Vue.resolveComponent("xGap"),{t:"10"},null),Vue.createVNode(Vue.resolveComponent("xItem"),{configs:e},null)]))]}),Vue.createVNode(Vue.resolveComponent("mkit"),{md:`### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
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
\`\`\``},null)])}}),{xItem:T}=D,X={components:{DemoXFormWithForm:E},methods:{valid(){}},setup(e){return{pickValueFrom:v}},computed:{valueFromConfigs(){return JSON.stringify(v(this.xForm))}},data(){const e=this,o={...s({value:[],prop:"slotsAddonBefore",itemType:"Select",options:[{label:a("\u7C7B\u578BA").label,value:"AAA"},{label:a("\u7C7B\u578BB").label,value:"BBB"}],style:{width:"80px"}}),...s({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueEmit(t){console.log("\u{1F680}:","search configs",this,t)}}),...s({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[c.required()]}),...s({label:"slots",prop:"slots",value:"slots\u7684value",placeholder:"Input",allowClear:!0,once(){const t=Vue.h(T,{configs:e.xForm.slotsAddonBefore});this.slots=Vue.markRaw({addonBefore:()=>t})},rules:[c.required()]}),...s({labelVNodeRender:S.labelTips(Vue.h("ul",null,[a("\u53EA\u80FD\u7531\u82F1\u6587\u5B57\u6BCD(\u533A\u5206\u5927\u5C0F\u5199)\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26@.\\_-\u7EC4\u6210").label,a('\u4E0D\u80FD\u4EE5"op_svc"\u3001"paas_op"\u6216\\\u5F00\u5934').label,a("\u4E0D\u80FD\u4EE5\\\u7ED3\u5C3E").label,a('\u4E0D\u80FD\u547D\u540D\u4E3A"admin"\u3001"power_user"\u6216"guest"').label,a("\u957F\u5EA6\u8303\u56F4\u662F4\u523032\u4F4D").label].map(t=>Vue.h("li",null,t)))),label:a("label\u4F7F\u7528Tips").label,prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[c.required()]}),...s({value:[],prop:"select",label:a("\u7C7B\u578B").label,itemType:"Select",options:[{label:a("\u7C7B\u578BA").label,value:"AAA"},{label:a("\u7C7B\u578BB").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})};return{configsValidBtn:{text:"\u6821\u9A8C",async onClick(){try{const t=await N(e.xForm);_(t)?V.message.success("\u6821\u9A8C\u6210\u529F"):V.message.error("\u6821\u9A8C\u5931\u8D25")}catch(t){V.notification.error((t==null?void 0:t.message)||"\u9519\u8BEF")}}},formData:{inputValue:"v-model"},xForm:o,tips1:`###
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
`,tips2:`### \u53EA\u4F7F\u7528configs\u7ED1\u5B9A\u6570\u636E
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
`}}},k={class:"mr10"},q={class:"flex middle mt10"},R={class:"mr10"},P={class:"mr10"},U={class:"flex middle mt10"},L={class:"mr10"},j=Vue.createElementVNode("div",{class:"mt10"},null,-1);function W(e,o,t,u,l,w){const f=Vue.resolveComponent("DemoAndCode"),C=Vue.resolveComponent("xButton"),g=Vue.resolveComponent("mkit"),p=Vue.resolveComponent("xItem"),x=Vue.resolveComponent("aCard"),I=Vue.resolveComponent("DemoXFormWithForm");return Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[Vue.createVNode(f,{title:"xItem\u57FA\u672C\u7528\u6CD5",path:"/boundless/demo/xForm/DialogDemoXItem.sfc"}),Vue.createVNode(f,{title:"xItem\u7279\u6B8Aslot",path:"/boundless/demo/xForm/xItemSlot.sfc"}),Vue.createVNode(x,null,{default:Vue.withCtx(()=>[Vue.createTextVNode(Vue.toDisplayString(w.valueFromConfigs)+" ",1),Vue.createVNode(C,{configs:l.configsValidBtn},null,8,["configs"]),Vue.createVNode(g,{md:l.tips1},null,8,["md"]),Vue.createElementVNode("span",k,Vue.toDisplayString(l.formData.inputValue),1),Vue.createVNode(p,{configs:l.xForm.search,class:"flex1",modelValue:l.formData.inputValue,"onUpdate:modelValue":o[0]||(o[0]=d=>l.formData.inputValue=d)},null,8,["configs","modelValue"]),Vue.createVNode(g,{md:l.tips2},null,8,["md"]),Vue.createElementVNode("div",q,[Vue.createElementVNode("span",R,Vue.toDisplayString(l.xForm.slots.value),1),Vue.createVNode(p,{configs:l.xForm.slots,class:"flex1"},null,8,["configs"]),Vue.createElementVNode("span",P,Vue.toDisplayString(l.xForm.slotsAddonBefore.value),1)]),Vue.createElementVNode("div",U,[Vue.createElementVNode("span",L,Vue.toDisplayString(l.xForm.select.value),1),Vue.createVNode(p,{configs:l.xForm.select,class:"flex1"},null,8,["configs"])]),Vue.createVNode(p,{configs:l.xForm.withLabelProperty,class:"flex1",modelValue:l.formData.inputValue,"onUpdate:modelValue":o[1]||(o[1]=d=>l.formData.inputValue=d)},null,8,["configs","modelValue"])]),_:1}),j,Vue.createVNode(x,null,{default:Vue.withCtx(()=>[Vue.createVNode(I,{options:{payload:{row:{}}}})]),_:1})],64)}const $=A(X,[["render",W]]);export{$ as default};
