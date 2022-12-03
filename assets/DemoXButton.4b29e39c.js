import{h as t,A as a,e as c,i as f,j as i,U as s,r as n,k as m}from"./index.edf2bf67.js";import{p as g}from"./form.9c807dd0.js";const{xItem:h}=m;async function o(){const e=this.text;this.text="loading...",await i.sleep(1e3),this.text=e}const x={mounted(){this.timer=setInterval(()=>{this.count++},1e3)},beforeUnmount(){clearInterval(this.timer)},computed:{vDomDeleteConfirmAuth(){return t("div",null,[t(a,{message:"\u8B66\u544A\uFF1A\u6B64\u64CD\u4F5C\u975E\u5E38\u5371\u9669!",type:"warning"},null),t("div",{style:{marginTop:"16px"}},[t("b",null,[c("\u8BF7\u8F93\u5165\u6743\u9650\u53E3\u4EE4\u786E\u8BA4\u6B64\u64CD\u4F5C:")]),t(h,{configs:this.formItems.authText},null)])])}},data(){const e=this;return{timer:null,count:0,formItems:{...f({value:"",prop:"authText",placeholder:"\u53E3\u4EE4\uFF1AauthText",allowClear:!0})},configs:{btn:{normal:{text:()=>e.$t("\u7F16\u8F91").label+e.count,disabled(){return e.count%3===0},async onClick(){await i.sleep(1e3)}},query:{preset:"query",onClick:o},refresh:{preset:"refresh",onClick:o},save:{preset:"save",onClick:o},upload:{preset:"upload",onClick:o},delete:{preset:"delete",onClick(){s.dialog.confirm({title:"\u786E\u8BA4\u5220\u9664 XXX \u5417\uFF1F",content:e.vDomDeleteConfirmAuth,onOk(){return new Promise((l,r)=>{const{authText:u}=g(e.formItems);return u!=="authText"?(s.message.error("\u53E3\u4EE4\u6709\u8BEF"),r()):(s.message.success("\u53E3\u4EE4\u6B63\u786E"),l())})},iconType:"delete",onCancel(){}})}}}}}},render(){return t("div",null,[t(n("xButton"),{configs:this.configs.btn.normal},null),t(n("xButton"),{configs:this.configs.btn.query},null),t(n("xButton"),{configs:this.configs.btn.refresh},null),t(n("xButton"),{configs:this.configs.btn.save},null),t(n("xButton"),{configs:this.configs.btn.upload},null),t(n("xButton"),{configs:this.configs.btn.delete},null),t(n("mkit"),{md:`
\`\`\`js
<xButton configs={this.configs.btn.query} />
<xButton configs={this.configs.btn.refresh} />
<xButton configs={this.configs.btn.save} />
<xButton configs={this.configs.btn.upload} />
<xButton configs={this.configs.btn.delete} />


async function log() {
	const text = this.text;
	this.text = "loading...";
	await _.sleep(1000);
	this.text = text;
}

mounted() {
		this.timer = setInterval(() => {
			this.count++;
		}, 1000);
	},
beforeUnmount() {
	clearInterval(this.timer);
},
data() {
	const vm = this;
	return {
		timer: null,
		count: 0,
		configs: {
			btn: {
				normal: {
					text: () => {
						return vm.$t("\u7F16\u8F91").label + vm.count;
					},
					disabled() {
						return vm.count % 3 === 0;
					},
					/* \u5F02\u6B65\u51FD\u6570\u4F1A\u6709loading\u6548\u679C */
					async onClick() {
						await _.sleep(1000);
					}
				},
				query: { preset: "query", onClick: log },
				refresh: { preset: "refresh", onClick: log },
				save: { preset: "save", onClick: log },
				upload: { preset: "upload", onClick: log },
				delete: { preset: "delete", onClick: log }
			}
		}
	};
},

\`\`\`
`},null)])}};export{x as default};
