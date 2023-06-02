//@ts-nocheck
import { defineComponent, h, reactive, markRaw, resolveComponent } from "vue";
import { State_UI, xU, UI, compileVNode, defCol, $, defItem } from "../ui";
import { DialogSourceCode } from "./DialogSourceCode";
import { defXVirTableConfigs } from "./../ui/xDataGrid/xVirTable/xVirTable";
import App from "../App.vue";

export const DemoAndCode = defineComponent({
	props: ["path", "title"],
	computed: {
		sfcURL() {
			return `${State_UI.assetsPath}${this.path}`;
		},
		styleContainer() {
			return {
				position: "relative",
				overflow: this.isFold ? "hidden" : "unset",
				height: this.isFold ? "48px" : "unset"
			};
		}
	},
	data() {
		return {
			isInitDone: false,
			isFold: true,
			isLoading: true,
			BussinessComponent: false,
			BussinessComponentSourceCode: ""
		};
	},
	methods: {
		toggleFold() {
			this.isFold = !this.isFold;
			if (!this.isInitDone) {
				this.getBussinessComponent();
			}
		},
		async rerun(scfObjSourceCode) {
			/* TODO: 弹窗修改加载的代码 */
			/* 重新运行 */
			const _BussinessComponent = await xU.getVueComponentBySourceCode(
				this.sfcURL,
				scfObjSourceCode,
				new Proxy(
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
						$,
						defItem,
						resolveComponent,
						App
					},
					{
						get(target, prop) {
							if (target.hasOwnProperty(prop)) {
								return target[prop];
							}
							if (xU[prop]) {
								return xU[prop];
							}
							return Vue[prop];
						}
					}
				)
			);

			this.BussinessComponent = markRaw(_BussinessComponent);
			this.isLoading = false;
		},
		async getBussinessComponent() {
			this.BussinessComponentSourceCode = await xU.asyncLoadText(this.sfcURL);
			const scfObjSourceCode = xU.VueLoader(this.BussinessComponentSourceCode);
			this.rerun(scfObjSourceCode);
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
		return (
			<div
				class="padding10"
				style={this.styleContainer}
				v-loading={this.isLoading}>
				<div
					class="pointer"
					onClick={this.toggleFold}
					style={`color: rgba(0, 0, 0, 0.85); font-weight: 600; font-size:18px;`}>
					{this.title || this.sfcURL}
					<xIcon icon={this.isFold ? "fold" : "unfold"} class="mb10 ml10" />
				</div>

				<xIcon
					icon="rerun"
					onClick={this.getBussinessComponent}
					class="mb10 pointer"
					style={{
						position: "absolute",
						top: "48px",
						right: "20px",
						width: "16px",
						height: "16px",
						zIndex: 1
					}}></xIcon>
				<xIcon
					icon="sourcecode"
					onClick={this.showSourceCodeDialog}
					class="mb10 pointer"
					style={{
						position: "absolute",
						top: "48px",
						right: 0,
						width: "16px",
						height: "16px",
						zIndex: 1
					}}></xIcon>
				{this.BussinessComponent ? h(this.BussinessComponent) : null}
			</div>
		);
	}
});
