//@ts-nocheck
import { defineComponent, h, reactive, markRaw } from "vue";
import { State_UI, xU, UI, compileVNode, defCol, $ } from "../ui";
import { DialogSourceCode } from "./DialogSourceCode";
import { defXVirTableConfigs } from "./../ui/xDataGrid/xVirTable/xVirTable";
const { $t } = State_UI;

export const DemoAndCode = defineComponent({
	props: ["path"],
	computed: {
		sfcURL() {
			return `${State_UI.assetsPath}${this.path}`;
		}
	},
	created() {
		this.getBussinessComponent();
	},
	data() {
		return {
			isLoading: true,
			BussinessComponent: false,
			BussinessComponentSourceCode: ""
		};
	},
	methods: {
		async reurn(scfObjSourceCode) {
			/* TODO: 弹窗修改加载的代码 */
			/* 重新运行 */
			const _BussinessComponent = await xU.getVueComponentBySourceCode(
				this.sfcURL,
				scfObjSourceCode,
				{
					reactive,
					defineComponent,
					markRaw,
					State_UI,
					xU,
					UI,
					compileVNode,
					defXVirTableConfigs,
					defCol,
					$
				}
			);

			this.BussinessComponent = markRaw(_BussinessComponent);
			this.isLoading = false;
		},
		async getBussinessComponent() {
			this.BussinessComponentSourceCode = await xU.asyncLoadText(
				this.sfcURL
			);
			const scfObjSourceCode = xU.VueLoader(
				this.BussinessComponentSourceCode
			);
			this.reurn(scfObjSourceCode);
		},
		showSourceCodeDialog() {
			UI.dialog.component({
				title: this.path,
				component: DialogSourceCode,
				maxmin: true,
				fullscreen: true,
				area: ["500px", "400px"],
				code: `\`\`\`js
${this.BussinessComponentSourceCode}
\`\`\``,
				hideButtons: true
			});
		}
	},
	render() {
		if (this.BussinessComponent) {
			return (
				<div
					class="padding10"
					style={{ position: "relative" }}
					v-loading={this.isLoading}>
					<xIcon
						icon="rerun"
						onClick={this.getBussinessComponent}
						class="mb10 pointer"
						style={{
							position: "absolute",
							right: "32px",
							width: "32px",
							height: "32px",
							zIndex: 1
						}}>
						rerun
					</xIcon>
					<xIcon
						icon="sourcecode"
						onClick={this.showSourceCodeDialog}
						class="mb10 pointer"
						style={{
							position: "absolute",
							right: 0,
							width: "32px",
							height: "32px",
							zIndex: 1
						}}>
						SourceCode
					</xIcon>
					{h(this.BussinessComponent)}
				</div>
			);
		}
		return null;
	}
});
