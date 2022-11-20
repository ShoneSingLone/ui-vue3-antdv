import{e as o,b as t,r as e}from"./index.b8b68933.js";async function s(){const n=this.text;this.text="loading...",await o.sleep(1e3),this.text=n}const l={mounted(){this.timer=setInterval(()=>{this.count++},1e3)},beforeUnmount(){clearInterval(this.timer)},data(){const n=this;return{timer:null,count:0,configs:{btn:{normal:{text:()=>n.$t("\u7F16\u8F91").label+n.count,disabled(){return n.count%3===0},async onClick(){await o.sleep(1e3)}},query:{preset:"query",onClick:s},refresh:{preset:"refresh",onClick:s},save:{preset:"save",onClick:s},upload:{preset:"upload",onClick:s},delete:{preset:"delete",onClick:s}}}}},render(){return t("div",null,[t(e("xButton"),{configs:this.configs.btn.normal},null),t(e("xButton"),{configs:this.configs.btn.query},null),t(e("xButton"),{configs:this.configs.btn.refresh},null),t(e("xButton"),{configs:this.configs.btn.save},null),t(e("xButton"),{configs:this.configs.btn.upload},null),t(e("xButton"),{configs:this.configs.btn.delete},null),t(e("mkit"),{md:`
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
`},null)])}};export{l as default};
