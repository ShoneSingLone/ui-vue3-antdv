import{e as s,E as a,S as p,f as b,g as o,v as F,A as h,b as r,r as n,F as y}from"./index.b8b68933.js";const{$t:u}=p,l=!1,i=!0,x={email:()=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,mobile:()=>/^1[34578]\d{9}$/},d=e=>(e.trigger=e.trigger||[a.update],e.msg=e.msg||"",e),g={SUCCESS:l,FAIL:i,required(e,m=[a.update]){return d({name:"required",msg:e||u("\u5FC5\u586B\u9879").label,async validator(t){return t?s.isArray(t)?t.length>0?l:i:l:s.isBoolean(t)||s.isNumber(t)&&!s.isNaN(t)?l:i},trigger:m})},demo(){return{name:"Demo",msg:"Demo",async validator(e){return await s.sleep(1e3),i},trigger:[a.update,a.input,a.change,a.blur]}},email(){return{name:"email",msg:()=>u("\u8BF7\u8F93\u5165email").label,async validator(e){return x.email().test(e)?l:i},trigger:[a.update,a.input,a.change,a.blur]}},custom({name:e,msg:m,validator:t,trigger:f}){return d({name:e,msg:m,validator:t,trigger:f})}},{$t:c}=p,I=b({props:{options:{type:Object,default(){return{}}}},data(){const{row:e}=this.options.payload||{},{name:m,age:t}=e||{};return{tips1:'### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D\n```html\n<xForm class=\\"flex vertical\\" :labelStyle="State.styleForm">\n```\n```js\nconsole.log(window)\n//\n```',styleForm:{width:"120px","text-align":"right"},row:e||{},dataXItem:{...o({value:m||"\u65B0\u589E",label:c("name").label,prop:"name",rules:[g.required()]}),...o({value:t||0,label:c("age").label,prop:"age",rules:[g.required()]})}}},methods:{async verifyForm(){const e=await F(this.dataXItem);return h(e)},getParams(){return{...this.row,...this.data}}},render(){return r("div",{id:"DialogModifyIP"},[r(n("xForm"),{class:"flex vertical",labelStyle:this.styleForm},{default:()=>[r(n("aAlert"),{message:this.$t("\u63D0\u793A\u4FE1\u606F").label,type:"info"},null),s.map(this.dataXItem,e=>r(y,null,[r(n("xGap"),{t:"10"},null),r(n("xItem"),{configs:e},null)]))]}),r(n("mkit"),{md:`### \u81EA\u5B9A\u4E49form \u5BBD\u5EA6\uFF0Clabel\u5BBD\u5EA6\uFF0C\u5C45\u4E2D
\`\`\`js
<xForm class="flex vertical" labelStyle={this.styleForm}>
	<aAlert message={this.$t("\u63D0\u793A\u4FE1\u606F").label} type="info" />
    {_.map(this.dataXItem, (item) => {
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
\`\`\``},null)])}});export{I as D,g as F};
