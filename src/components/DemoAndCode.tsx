//@ts-nocheck
import { defineComponent, h, markRaw } from "vue";
import { State_UI, _, UI } from "../ui";
import { DialogSourceCode } from "./DialogSourceCode";
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
			BussinessComponent: false,
			BussinessComponentSourceCode: ""
		};
	},
	methods: {
		async getBussinessComponent() {
			this.BussinessComponentSourceCode = await _.asyncLoadText(this.sfcURL);
			const _BussinessComponent = await _.asyncImportSFC(this.sfcURL, {
				defineComponent,
				markRaw,
				State_UI,
				_,
				UI
			});
			this.BussinessComponent = markRaw(_BussinessComponent);
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
				<div class="padding10" style={{ position: "relative" }}>
					<xIcon
						icon="sourcecode"
						onClick={this.showSourceCodeDialog}
						class="mb10 pointer"
						style={{
							position: "absolute",
							right: 0,
							width: "32px",
							height: "32px",
							zIndex: 2
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
