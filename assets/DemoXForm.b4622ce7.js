import{_,g as m,v,A as F,U as c,r as a,o as V,c as b,b as l,w as d,F as B,S as D,a as s,t as x}from"./index.b8b68933.js";import{D as w,F as A}from"./DemoXFormWithForm.c16157c6.js";const{$t:i}=D,C={components:{DemoXFormWithForm:w},methods:{valid(){}},data(){const u=this,t={...m({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueChange(o){console.log("\u{1F680}:","search configs",this,o)}}),...m({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[A.required()]}),...m({value:[],prop:"select",label:i("\u7C7B\u578B").label,itemType:"Select",options:[{label:i("\u7C7B\u578BA").label,value:"AAA"},{label:i("\u7C7B\u578BB").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})};return{configsValidBtn:{text:"\u6821\u9A8C",async onClick(){try{const o=await v(u.xForm);F(o)?c.message.success("\u6821\u9A8C\u6210\u529F"):c.message.error("\u6821\u9A8C\u5931\u8D25")}catch(o){c.notification.error((o==null?void 0:o.message)||"\u9519\u8BEF")}}},formData:{inputValue:"v-model"},xForm:t,tips1:`### \u53EF\u4EE5\u5355\u72EC\u4F7F\u7528v-model\u7ED1\u5B9A\u6570\u636E
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
`}}},I={class:"mr10"},y={class:"flex middle mt10"},T={class:"mr10"},k=s("div",{class:"mt10"},null,-1);function L(u,t,o,S,e,U){const g=a("xButton"),p=a("mkit"),n=a("xItem"),f=a("aCard"),h=a("DemoXFormWithForm");return V(),b(B,null,[l(f,null,{default:d(()=>[l(g,{configs:e.configsValidBtn},null,8,["configs"]),l(p,{md:e.tips1},null,8,["md"]),s("span",I,x(e.formData.inputValue),1),l(n,{configs:e.xForm.search,class:"flex1",modelValue:e.formData.inputValue,"onUpdate:modelValue":t[0]||(t[0]=r=>e.formData.inputValue=r)},null,8,["configs","modelValue"]),l(p,{md:e.tips2},null,8,["md"]),s("div",y,[s("span",T,x(e.xForm.select.value),1),l(n,{configs:e.xForm.select,class:"flex1"},null,8,["configs"])]),l(n,{configs:e.xForm.withLabelProperty,class:"flex1",modelValue:e.formData.inputValue,"onUpdate:modelValue":t[1]||(t[1]=r=>e.formData.inputValue=r)},null,8,["configs","modelValue"])]),_:1}),k,l(f,null,{default:d(()=>[l(h,{options:{payload:{row:{}}}})]),_:1})],64)}const P=_(C,[["render",L]]);export{P as default};
