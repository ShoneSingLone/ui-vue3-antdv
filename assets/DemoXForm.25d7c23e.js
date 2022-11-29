import{b as o,r as n,_ as B,e as m,k as u,m as A,v as w,j as C,U as d,o as I,c as y,l as v,F as D,g as T,S,a,d as k,t as i}from"./index.3e50bbdc.js";import{D as L,F as f}from"./DemoXFormWithForm.b884150f.js";import{p as b}from"./form.ae933786.js";const N={labelTips:r=>(t,l)=>{const{prop:x,label:e}=t;return o("div",{class:"ant-form-item-label"},[o("label",{for:x,class:l},[e,o(n("aPopover"),{trigger:"hover"},{content:()=>r,default:()=>o(n("xIcon"),{icon:"Insidetips",class:"pointer"},null)})])])}},{xItem:P}=T,{$t:s}=S,U={components:{DemoXFormWithForm:L},methods:{valid(){}},setup(r){return{pickValueFrom:b}},computed:{valueFromConfigs(){return JSON.stringify(b(this.xForm))}},data(){const r=this,t={...m({value:[],prop:"slotsAddonBefore",itemType:"Select",options:[{label:s("\u7C7B\u578BA").label,value:"AAA"},{label:s("\u7C7B\u578BB").label,value:"BBB"}],style:{width:"80px"}}),...m({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueChange(l){console.log("\u{1F680}:","search configs",this,l)}}),...m({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[f.required()]}),...m({label:"slots",prop:"slots",value:"slots\u7684value",placeholder:"Input",allowClear:!0,once(){const l=u(P,{configs:r.xForm.slotsAddonBefore});this.slots=A({addonBefore:()=>l})},rules:[f.required()]}),...m({labelVNodeRender:N.labelTips(u("ul",null,[s("\u53EA\u80FD\u7531\u82F1\u6587\u5B57\u6BCD(\u533A\u5206\u5927\u5C0F\u5199)\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26@.\\_-\u7EC4\u6210").label,s('\u4E0D\u80FD\u4EE5"op_svc"\u3001"paas_op"\u6216\\\u5F00\u5934').label,s("\u4E0D\u80FD\u4EE5\\\u7ED3\u5C3E").label,s('\u4E0D\u80FD\u547D\u540D\u4E3A"admin"\u3001"power_user"\u6216"guest"').label,s("\u957F\u5EA6\u8303\u56F4\u662F4\u523032\u4F4D").label].map(l=>u("li",null,l)))),label:s("label\u4F7F\u7528Tips").label,prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[f.required()]}),...m({value:[],prop:"select",label:s("\u7C7B\u578B").label,itemType:"Select",options:[{label:s("\u7C7B\u578BA").label,value:"AAA"},{label:s("\u7C7B\u578BB").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})};return{configsValidBtn:{text:"\u6821\u9A8C",async onClick(){try{const l=await w(r.xForm);C(l)?d.message.success("\u6821\u9A8C\u6210\u529F"):d.message.error("\u6821\u9A8C\u5931\u8D25")}catch(l){d.notification.error((l==null?void 0:l.message)||"\u9519\u8BEF")}}},formData:{inputValue:"v-model"},xForm:t,tips1:`### \u53EF\u4EE5\u5355\u72EC\u4F7F\u7528v-model\u7ED1\u5B9A\u6570\u636E
\`\`\`js
<xItem :configs="xForm.search" class="flex1" v-model="formData.inputValue" />
formData: {
	inputValue: "v-model"
},
...defItem({
	prop: "search",
	placeholder: "Input",
	allowClear: true,
	onAfterValueChange(val) {
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
`}}},W={class:"mr10"},R={class:"flex middle mt10"},X={class:"mr10"},j={class:"mr10"},q={class:"flex middle mt10"},E={class:"mr10"},J=a("div",{class:"mt10"},null,-1);function O(r,t,l,x,e,_){const F=n("xButton"),g=n("mkit"),c=n("xItem"),h=n("aCard"),V=n("DemoXFormWithForm");return I(),y(D,null,[o(h,null,{default:v(()=>[k(i(_.valueFromConfigs)+" ",1),o(F,{configs:e.configsValidBtn},null,8,["configs"]),o(g,{md:e.tips1},null,8,["md"]),a("span",W,i(e.formData.inputValue),1),o(c,{configs:e.xForm.search,class:"flex1",modelValue:e.formData.inputValue,"onUpdate:modelValue":t[0]||(t[0]=p=>e.formData.inputValue=p)},null,8,["configs","modelValue"]),o(g,{md:e.tips2},null,8,["md"]),a("div",R,[a("span",X,i(e.xForm.slots.value),1),o(c,{configs:e.xForm.slots,class:"flex1"},null,8,["configs"]),a("span",j,i(e.xForm.slotsAddonBefore.value),1)]),a("div",q,[a("span",E,i(e.xForm.select.value),1),o(c,{configs:e.xForm.select,class:"flex1"},null,8,["configs"])]),o(c,{configs:e.xForm.withLabelProperty,class:"flex1",modelValue:e.formData.inputValue,"onUpdate:modelValue":t[1]||(t[1]=p=>e.formData.inputValue=p)},null,8,["configs","modelValue"])]),_:1}),J,o(h,null,{default:v(()=>[o(V,{options:{payload:{row:{}}}})]),_:1})],64)}const K=B(U,[["render",O]]);export{K as default};
