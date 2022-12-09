import{p as c,E as n,S as F,g as t,r as s,d as q,i,v as C,k as D,F as S,_ as R,l as b,m as X,U as v,o as L,c as P,e as w,j,h as m,f as U,t as p}from"./index.87d06142.js";import{p as I}from"./form.d462d738.js";const{$t:V}=F,u=!1,d=!0,E={email:()=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile:()=>/^1[34578]\d{9}$/},B=e=>(e.trigger=e.trigger||[n.update],e.msg=e.msg||"",e),f={SUCCESS:u,FAIL:d,required(e,o=[n.update]){return B({name:"required",msg:e||V("\u5FC5\u586B\u9879").label,async validator(l){return l?c.isArray(l)?l.length>0?u:d:u:c.isBoolean(l)||c.isNumber(l)&&!c.isNaN(l)?u:d},trigger:o})},demo(){return{name:"Demo",msg:"Demo",async validator(e){return await c.sleep(1e3),d},trigger:[n.update,n.input,n.change,n.blur]}},email(){return{name:"email",msg:()=>V("\u8BF7\u8F93\u5165email").label,async validator(e){return E.email().test(e)?u:d},trigger:[n.update,n.input,n.change,n.blur]}},custom({name:e,msg:o,validator:l,trigger:g}){return B({name:e,msg:o,validator:l,trigger:g})}},W={labelTips:e=>(o,l)=>{const{prop:g,label:a}=o;return t("div",{class:"ant-form-item-label"},[t("label",{for:g,class:l},[a,t(s("aPopover"),{trigger:"hover"},{content:()=>e,default:()=>t(s("xIcon"),{icon:"Insidetips",class:"pointer"},null)})])])}},{$t:A}=F,$=q({props:{options:{type:Object,default(){return{}}}},data(){const{row:e}=this.options.payload||{},{name:o,age:l}=e||{};return{tips1:'### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D\n```html\n<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">\n```\n```js\nconsole.log(window)\n//\n```',styleForm:{width:"120px","text-align":"right"},row:e||{},dataXItem:{...i({value:o||"\u65B0\u589E",label:A("name").label,prop:"name",rules:[f.required()]}),...i({value:l||0,label:A("age").label,prop:"age",rules:[f.required()]})}}},methods:{async verifyForm(){const e=await C(this.dataXItem);return D(e)},getParams(){return{...this.row,...this.data}}},render(){return t("div",{id:"DialogModifyIP"},[t(s("xForm"),{class:"flex vertical",labelStyle:this.styleForm},{default:()=>[t(s("aAlert"),{message:this.$t("\u63D0\u793A\u4FE1\u606F").label,type:"info"},null),c.map(this.dataXItem,e=>t(S,null,[t(s("xGap"),{t:"10"},null),t(s("xItem"),{configs:e},null)]))]}),t(s("mkit"),{md:`### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
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
\`\`\``},null)])}}),{xItem:G}=j,{$t:r}=F,O={components:{DemoXFormWithForm:$},methods:{valid(){}},setup(e){return{pickValueFrom:I}},computed:{valueFromConfigs(){return JSON.stringify(I(this.xForm))}},data(){const e=this,o={...i({value:[],prop:"slotsAddonBefore",itemType:"Select",options:[{label:r("\u7C7B\u578BA").label,value:"AAA"},{label:r("\u7C7B\u578BB").label,value:"BBB"}],style:{width:"80px"}}),...i({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueChange(l){console.log("\u{1F680}:","search configs",this,l)}}),...i({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[f.required()]}),...i({label:"slots",prop:"slots",value:"slots\u7684value",placeholder:"Input",allowClear:!0,once(){const l=b(G,{configs:e.xForm.slotsAddonBefore});this.slots=X({addonBefore:()=>l})},rules:[f.required()]}),...i({labelVNodeRender:W.labelTips(b("ul",null,[r("\u53EA\u80FD\u7531\u82F1\u6587\u5B57\u6BCD(\u533A\u5206\u5927\u5C0F\u5199)\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26@.\\_-\u7EC4\u6210").label,r('\u4E0D\u80FD\u4EE5"op_svc"\u3001"paas_op"\u6216\\\u5F00\u5934').label,r("\u4E0D\u80FD\u4EE5\\\u7ED3\u5C3E").label,r('\u4E0D\u80FD\u547D\u540D\u4E3A"admin"\u3001"power_user"\u6216"guest"').label,r("\u957F\u5EA6\u8303\u56F4\u662F4\u523032\u4F4D").label].map(l=>b("li",null,l)))),label:r("label\u4F7F\u7528Tips").label,prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[f.required()]}),...i({value:[],prop:"select",label:r("\u7C7B\u578B").label,itemType:"Select",options:[{label:r("\u7C7B\u578BA").label,value:"AAA"},{label:r("\u7C7B\u578BB").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})};return{configsValidBtn:{text:"\u6821\u9A8C",async onClick(){try{const l=await C(e.xForm);D(l)?v.message.success("\u6821\u9A8C\u6210\u529F"):v.message.error("\u6821\u9A8C\u5931\u8D25")}catch(l){v.notification.error((l==null?void 0:l.message)||"\u9519\u8BEF")}}},formData:{inputValue:"v-model"},xForm:o,tips1:`### \u53EF\u4EE5\u5355\u72EC\u4F7F\u7528v-model\u7ED1\u5B9A\u6570\u636E
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
`}}},J={class:"mr10"},M={class:"flex middle mt10"},Y={class:"mr10"},z={class:"mr10"},H={class:"flex middle mt10"},K={class:"mr10"},Q=m("div",{class:"mt10"},null,-1);function Z(e,o,l,g,a,T){const k=s("xButton"),_=s("mkit"),x=s("xItem"),y=s("aCard"),N=s("DemoXFormWithForm");return L(),P(S,null,[t(y,null,{default:w(()=>[U(p(T.valueFromConfigs)+" ",1),t(k,{configs:a.configsValidBtn},null,8,["configs"]),t(_,{md:a.tips1},null,8,["md"]),m("span",J,p(a.formData.inputValue),1),t(x,{configs:a.xForm.search,class:"flex1",modelValue:a.formData.inputValue,"onUpdate:modelValue":o[0]||(o[0]=h=>a.formData.inputValue=h)},null,8,["configs","modelValue"]),t(_,{md:a.tips2},null,8,["md"]),m("div",M,[m("span",Y,p(a.xForm.slots.value),1),t(x,{configs:a.xForm.slots,class:"flex1"},null,8,["configs"]),m("span",z,p(a.xForm.slotsAddonBefore.value),1)]),m("div",H,[m("span",K,p(a.xForm.select.value),1),t(x,{configs:a.xForm.select,class:"flex1"},null,8,["configs"])]),t(x,{configs:a.xForm.withLabelProperty,class:"flex1",modelValue:a.formData.inputValue,"onUpdate:modelValue":o[1]||(o[1]=h=>a.formData.inputValue=h)},null,8,["configs","modelValue"])]),_:1}),Q,t(y,null,{default:w(()=>[t(N,{options:{payload:{row:{}}}})]),_:1})],64)}const te=R(O,[["render",Z]]);export{te as default};
