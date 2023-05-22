import{x as u,E as n,S as D,c as t,r as s,d as q,e as m,v as C,A as S,F as T,_ as R,$ as r,k as h,l as E,U as v,o as P,i as U,w,n as j,j as i,a as L,t as d}from"./index.149d9425.js";const{$t:I}=D,p=!1,f=!0,W={email:()=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile:()=>/^1[34578]\d{9}$/},A=e=>(e.trigger=e.trigger||[n.update],e.msg=e.msg||"",e),g={SUCCESS:p,FAIL:f,required(e,a=[n.update]){return A({name:"required",msg:e||I("\u5FC5\u586B\u9879").label,async validator(l){return l?u.isArray(l)?l.length>0?p:f:p:u.isBoolean(l)||u.isNumber(l)&&!u.isNaN(l)?p:f},trigger:a})},demo(){return{name:"Demo",msg:"Demo",async validator(e){return await u.sleep(1e3),f},trigger:[n.update,n.input,n.change,n.blur]}},email(){return{name:"email",msg:()=>I("\u8BF7\u8F93\u5165email").label,async validator(e){return W.email().test(e)?p:f},trigger:[n.update,n.input,n.change,n.blur]}},custom({name:e,msg:a,validator:l,trigger:c}){return A({name:e,msg:a,validator:l,trigger:c})}},V=e=>u.reduce(e,(a,l,c)=>{try{a[c]=JSON.parse(JSON.stringify(l.value))}catch{}return a},{}),O={labelTips:e=>(a,l)=>{const{prop:c,label:o}=a;return t("div",{class:"ant-form-item-label"},[t("label",{for:c,class:l},[o,t(s("aPopover"),{trigger:"hover",placement:"top"},{content:()=>e,default:()=>t(s("xIcon"),{icon:"Insidetips",class:"pointer ml4"},null)})])])}},{$t:B}=D,$=q({props:{options:{type:Object,default(){return{}}}},data(){const{row:e}=this.options.payload||{},{name:a,age:l}=e||{};return{tips1:'### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D\n```html\n<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">\n```\n```js\nconsole.log(window)\n//\n```',styleForm:{width:"120px","text-align":"right"},row:e||{},dataXItem:{...m({value:a||"\u65B0\u589E",label:B("name").label,prop:"name",rules:[g.required()]}),...m({value:l||0,label:B("age").label,prop:"age",rules:[g.required()]})}}},methods:{async verifyForm(){const e=await C(this.dataXItem);return S(e)},getParams(){return{...this.row,...this.data}}},render(){return t("div",{id:"DialogModifyIP"},[t(s("xForm"),{class:"flex vertical",labelStyle:this.styleForm},{default:()=>[t(s("aAlert"),{message:this.$t("\u63D0\u793A\u4FE1\u606F").label,type:"info"},null),u.map(this.dataXItem,e=>t(T,null,[t(s("xGap"),{t:"10"},null),t(s("xItem"),{configs:e},null)]))]}),t(s("mkit"),{md:`### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
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
\`\`\``},null)])}}),{xItem:J}=j,G={components:{DemoXFormWithForm:$},methods:{valid(){}},setup(e){return{pickValueFrom:V}},computed:{valueFromConfigs(){return JSON.stringify(V(this.xForm))}},data(){const e=this,a={...m({value:[],prop:"slotsAddonBefore",itemType:"Select",options:[{label:r("\u7C7B\u578BA").label,value:"AAA"},{label:r("\u7C7B\u578BB").label,value:"BBB"}],style:{width:"80px"}}),...m({prop:"search",placeholder:"Input",allowClear:!0,onAfterValueEmit(l){console.log("\u{1F680}:","search configs",this,l)}}),...m({label:"withLabelProperty",prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[g.required()]}),...m({label:"slots",prop:"slots",value:"slots\u7684value",placeholder:"Input",allowClear:!0,once(){const l=h(J,{configs:e.xForm.slotsAddonBefore});this.slots=E({addonBefore:()=>l})},rules:[g.required()]}),...m({labelVNodeRender:O.labelTips(h("ul",null,[r("\u53EA\u80FD\u7531\u82F1\u6587\u5B57\u6BCD(\u533A\u5206\u5927\u5C0F\u5199)\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26@.\\_-\u7EC4\u6210").label,r('\u4E0D\u80FD\u4EE5"op_svc"\u3001"paas_op"\u6216\\\u5F00\u5934').label,r("\u4E0D\u80FD\u4EE5\\\u7ED3\u5C3E").label,r('\u4E0D\u80FD\u547D\u540D\u4E3A"admin"\u3001"power_user"\u6216"guest"').label,r("\u957F\u5EA6\u8303\u56F4\u662F4\u523032\u4F4D").label].map(l=>h("li",null,l)))),label:r("label\u4F7F\u7528Tips").label,prop:"withLabelProperty",placeholder:"Input",allowClear:!0,rules:[g.required()]}),...m({value:[],prop:"select",label:r("\u7C7B\u578B").label,itemType:"Select",options:[{label:r("\u7C7B\u578BA").label,value:"AAA"},{label:r("\u7C7B\u578BB").label,value:"BBB"}],mode:"multiple",maxTagCount:1,maxTagTextLength:10,style:{width:"200px"}})};return{configsValidBtn:{text:"\u6821\u9A8C",async onClick(){try{const l=await C(e.xForm);S(l)?v.message.success("\u6821\u9A8C\u6210\u529F"):v.message.error("\u6821\u9A8C\u5931\u8D25")}catch(l){v.notification.error((l==null?void 0:l.message)||"\u9519\u8BEF")}}},formData:{inputValue:"v-model"},xForm:a,tips1:`###
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
`}}},M={class:"mr10"},Y={class:"flex middle mt10"},z={class:"mr10"},H={class:"mr10"},K={class:"flex middle mt10"},Q={class:"mr10"},Z=i("div",{class:"mt10"},null,-1);function ee(e,a,l,c,o,N){const F=s("DemoAndCode"),k=s("xButton"),_=s("mkit"),x=s("xItem"),y=s("aCard"),X=s("DemoXFormWithForm");return P(),U(T,null,[t(F,{title:"xItem\u57FA\u672C\u7528\u6CD5",path:"/boundless/demo/xForm/DialogDemoXItem.sfc"}),t(F,{title:"xItem\u7279\u6B8Aslot",path:"/boundless/demo/xForm/xItemSlot.sfc"}),t(y,null,{default:w(()=>[L(d(N.valueFromConfigs)+" ",1),t(k,{configs:o.configsValidBtn},null,8,["configs"]),t(_,{md:o.tips1},null,8,["md"]),i("span",M,d(o.formData.inputValue),1),t(x,{configs:o.xForm.search,class:"flex1",modelValue:o.formData.inputValue,"onUpdate:modelValue":a[0]||(a[0]=b=>o.formData.inputValue=b)},null,8,["configs","modelValue"]),t(_,{md:o.tips2},null,8,["md"]),i("div",Y,[i("span",z,d(o.xForm.slots.value),1),t(x,{configs:o.xForm.slots,class:"flex1"},null,8,["configs"]),i("span",H,d(o.xForm.slotsAddonBefore.value),1)]),i("div",K,[i("span",Q,d(o.xForm.select.value),1),t(x,{configs:o.xForm.select,class:"flex1"},null,8,["configs"])]),t(x,{configs:o.xForm.withLabelProperty,class:"flex1",modelValue:o.formData.inputValue,"onUpdate:modelValue":a[1]||(a[1]=b=>o.formData.inputValue=b)},null,8,["configs","modelValue"])]),_:1}),Z,t(y,null,{default:w(()=>[t(X,{options:{payload:{row:{}}}})]),_:1})],64)}const te=R(G,[["render",ee]]);export{te as default};
