//@ts-nocheck
import { defineComponent, h, reactive, markRaw, resolveComponent } from "vue";
import { DialogSourceCode } from "./DialogSourceCode";
import {
	defXVirTableConfigs,
	State_UI,
	xU,
	UI,
	compileVNode,
	defCol,
	$,
	defItem
} from "@ventose/ui";
import App from "../App.vue";
import dayjs from "dayjs";

export const DemoAndCode = defineComponent({
	props: ["path", "title"],
	setup() {
		return { State_UI };
	},
	computed: {
		sfcURL() {
			return `${this.State_UI.assetsPath}${this.path}`;
		},
		styleContainer() {
			return {
				position: "relative",
				overflow: this.isFold ? "hidden" : "unset"
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
			this.getBussinessComponent();
		},
		async rerun(scfObjSourceCode) {
			try {
				if (!scfObjSourceCode) {
					this.BussinessComponent = "";
				} else {
					throw new Error("");
				}
			} catch (e) {
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
							App,
							dayjs
						},
						{
							get(target, prop) {
								if (target.hasOwnProperty(prop)) {
									return target[prop];
								}
								if (xU[prop]) {
									return xU[prop];
								}
								if (target.State_UI[prop]) {
									return target.State_UI[prop];
								}
							}
						}
					)
				);
				this.BussinessComponent = markRaw(_BussinessComponent);
			} finally {
				this.isLoading = false;
			}
		},
		async getBussinessComponent() {
			let scfObjSourceCode = "";
			if (!this.isFold) {
				this.BussinessComponentSourceCode = await xU.asyncLoadText(this.sfcURL);
				scfObjSourceCode = xU.VueLoader(this.BussinessComponentSourceCode);
			}
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
			<div style="min-height:100px;padding:20px">
				<ElCard
					class="padding10"
					style={this.styleContainer}
					v-xloading={this.isLoading}>
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
							right: "60px",
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
							right: "30px",
							width: "16px",
							height: "16px",
							zIndex: 1
						}}></xIcon>
					{this.BussinessComponent ? h(this.BussinessComponent) : null}
				</ElCard>
			</div>
		);
	}
});
