<script lang="tsx">
import {
	defCol,
	defColActions,
	_,
	UI,
	defColActionsBtnlist,
	defDataGridOption,
	defItem,
	vModel,
	setDataGridInfo,
	State_UI,
	getPaginationPageSize,
	Utils
} from "@ventose/ui";

async function log() {
	const text = this.text;
	this.text = "loading...";
	await _.sleep(1000);
	this.text = text;
}

export default {
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
							return vm.$t("编辑").label + vm.count;
						},
						disabled() {
							return vm.count % 3 === 0;
						},
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
	render() {
		return (
			<div>
				<xButton configs={this.configs.btn.normal} />
				<xButton configs={this.configs.btn.query} />
				<xButton configs={this.configs.btn.refresh} />
				<xButton configs={this.configs.btn.save} />
				<xButton configs={this.configs.btn.upload} />
				<xButton configs={this.configs.btn.delete} />
				<mkit
					md={`
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
						return vm.$t("编辑").label + vm.count;
					},
					disabled() {
						return vm.count % 3 === 0;
					},
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
`}
				/>
			</div>
		);
	}
};
</script>

<style></style>
