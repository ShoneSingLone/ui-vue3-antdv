//@ts-nocheck
import { defineComponent } from "vue";
import { ITEM_OPTIONS } from "../../common/options";
import { Utils } from "../common";
import { State_UI } from "../State_UI";
import { defCol } from "./common";
const { $t } = State_UI;

const genConfigsStatus = (value: any) => ({
	value,
	prop: "configs_status",
	itemType: "Select",
	options: [
		{
			label: $t("类型A").label,
			value: "AAA"
		},
		{
			label: $t("类型B").label,
			value: "BBB"
		}
	],
	mode: "multiple",
	maxTagCount: 1,
	maxTagTextLength: 10,
	style: { width: "200px" }
});

export const DemoXDataGridxVirTable = defineComponent({
	data(vm) {
		return {
			configs_xVirTable: {
				rowHeight: 32,
				dataSource: [...new Array(400000)].map((i, ii) => {
					return {
						name: "name" + ii,
						status: ii % 2 == 0 ? "ACTIVATION" : "DOWN",
						select: ["AAA"],
						category: "category" + ii,
						upperName:
							"category18category18category18category18category18category18category18category18category18category18category18category18category18category18category18category18" +
							ii,
						startDate: "startDate" + ii,
						endDate: "endDate" + ii
					};
				}),
				columns: {
					...defCol({
						prop: "name",
						label: vm.$t("名称").label
					}),
					...defCol({
						prop: "status",
						label: vm.$t("状态").label,
						renderCell({ record, cell }) {
							console.log(record.select);
							record.configsStatus =
								record.configsStatus || genConfigsStatus(record.select);
							return (
								<xItem
									configs={record.configsStatus}
									onUpdate:modelValue={val => (record.select = val)}
								/>
							);
						}
					}),
					...defCol({
						prop: "capacity",
						label: vm.$t("总容量").label,
						renderCell({ record }) {
							const { status } = record;
							/*开通中*/
							if (status === "ACTIVATION") {
								return "--";
							}
							return status;
						}
					}),
					...defCol({
						prop: "category",
						label: vm.$t("类别").label,
						width: "100px",
						renderCell({ record }) {
							if (record.tenant) {
								return vm.$t("租户").label;
							}
							if (record.level) {
								return vm.$t("上级", { level: record.level || "1" }).label;
							}
							return "--";
						}
					}),
					...defCol({
						prop: "upperName",
						isShow: false,
						label: vm.$t("上级名称").label,
						width: "160px",
						minWidth: "160px"
					}),
					...defCol({
						prop: "startDate",
						label: vm.$t("开始时间").label
					}),
					...defCol({
						prop: "endDate",
						label: vm.$t("到期时间").label
					})
				}
			}
		};
	},
	render() {
		return (
			<>
				<mkit md="### xVirTable" />
				<div style="width:100%;height:300px;">
					<xVirTable configs={this.configs_xVirTable} />
				</div>
			</>
		);
	}
});
