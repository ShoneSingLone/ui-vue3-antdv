<script lang="tsx">
//@ts-nocheck
import { _, UI, defItem, components, pickValueFrom } from "@ventose/ui";
import { Alert } from "ant-design-vue";
const { xItem } = components;

async function log() {
	const text = this.text;
	this.text = "loading...";
	await vUtils.sleep(1000);
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
	computed: {
		vDomDeleteConfirmAuth() {
			return (
				<div>
					<Alert message="警告：此操作非常危险!" type="warning" />
					<div style={{ marginTop: "16px" }}>
						<b>请输入权限口令确认此操作:</b>
						<xItem configs={this.formItems.authText} />
					</div>
				</div>
			);
		}
	},
	data() {
		const vm = this;
		return {
			timer: null,
			count: 0,
			formItems: {
				...defItem({
					value: "",
					prop: "authText",
					placeholder: "口令：authText",
					allowClear: true
				})
			},
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
							await vUtils.sleep(1000);
						}
					},
					query: { preset: "query", onClick: log },
					refresh: { preset: "refresh", onClick: log },
					save: { preset: "save", onClick: log },
					upload: { preset: "upload", onClick: log },
					delete: {
						preset: "delete",
						onClick() {
							UI.dialog.confirm({
								title: "确认删除 XXX 吗？",
								content: vm.vDomDeleteConfirmAuth,
								onOk() {
									return new Promise((resolve, reject) => {
										const { authText } = pickValueFrom(vm.formItems);
										if (authText !== "authText") {
											UI.message.error("口令有误");
											return reject();
										} else {
											UI.message.success("口令正确");
											return resolve();
										}
									});
								},
								iconType: "delete",
								onCancel() {}
							});
						}
					}
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
	await vUtils.sleep(1000);
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
					/* 异步函数会有loading效果 */
					async onClick() {
						await vUtils.sleep(1000);
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
