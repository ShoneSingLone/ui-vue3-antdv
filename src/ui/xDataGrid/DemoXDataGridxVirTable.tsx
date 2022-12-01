//@ts-nocheck
import { defineComponent } from "vue";
import { ITEM_OPTIONS } from "../../common/options";
import { Utils } from "../common";
import { State_UI } from "../State_UI";
import { defCol } from "./common";
import { defineXVirTableConfigs } from "./xVirTable/xVirTable";
import { _ } from "../loadCommonUtil";
const { $t } = State_UI;

const OPTIONS = [
	{
		label: $t("ACTIVATION").label,
		value: "ACTIVATION"
	},
	{
		label: $t("DOWN").label,
		value: "DOWN"
	}
];
const genConfigsStatus = (value: any) => ({
	value,
	prop: "configs_status",
	itemType: "Select",
	options: OPTIONS,
	mode: "multiple",
	maxTagCount: 1,
	maxTagTextLength: 10,
	style: { width: "200px" }
});

export const DemoXDataGridxVirTable = defineComponent({
	watch: {
		total: {
			immediate: true,
			handler: _.debounce(function (total) {
				this.configs_xVirTable.dataSource = [...new Array(total)].map(
					(i, ii) => {
						let upperName = ii + " 正常显示";
						if (ii % 5 === 0) {
							upperName = ii + " v-uiPopover={{ onlyEllipsis: true }}。 有省略号才显示tips。 category18category18category18category18category18category18category18category18category18category18category18category18category18category18category18category18" + ii;
						}

						return {
							upperName,
							id: ii,
							name: "name" + ii,
							status: ii % 2 == 0 ? "ACTIVATION" : "DOWN",
							select: ["ACTIVATION"],
							category: "category" + ii,
							startDate: Date.now(),
							endDate: Date.now()
						};
					}
				);
			}, 1000)
		}
	},
	data(vm) {
		return {
			total: 9999,
			filter: {
				status: []
			},
			configs_xVirTable: defineXVirTableConfigs({
				rowHeight: 32,
				selected: [],
				selectedConfigs: {
					type: defineXVirTableConfigs.type.one,
					prop: "id",
					disabled({ rowData, rowIndex }) {
						if (rowIndex % 10 == 0) {
							return "test";
						} else {
							return false;
						}
					}
				},
				selectedBy: "id",
				dataSource: [],
				columns: {
					...defCol({
						prop: "name",
						label: vm.$t("名称").label
					}),
					...defCol({
						prop: "status",
						label: vm.$t("状态").label,
						renderHeader({ label, index }) {
							return (
								<aSelect
									value={vm.filter.status}
									onChange={val => (vm.filter.status = val)}
									mode="multiple"
									style="width: 100%"
									placeholder="类型"
									max-tag-count={1}
									options={OPTIONS}
								/>
							);
						},
						renderCell({ record, cell }) {
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
						label: vm.$t("提示").label,
						width: "200px",
						renderCell({ record }) {
							return <div className="ellipsis" v-uiPopover={{ onlyEllipsis: true }}>{record.upperName}</div>;
						}
					}),
					...defCol({
						prop: "startDate",
						label: vm.$t("开始时间").label,
						renderCell({ record }) {
							return Utils.dateFormat(record.startDate, 1)
						}
					}),
					...defCol({
						prop: "endDate",
						label: vm.$t("到期时间").label
					})
				}
			})
		};
	},
	render() {
		return (
			<>
				<mkit md="### xVirTable" />
				<div class="mt10 mb10">
					<div class="flex middle">
						<a-radio-group
							v-model:value={this.configs_xVirTable.selectedConfigs.type}>
							<a-radio-button value="many">多选</a-radio-button>
							<a-radio-button value="one">单选</a-radio-button>
						</a-radio-group>
						<span class="ml10 flex1" style={{ overflow: "auto" }}>
							已选择：
							{JSON.stringify(this.configs_xVirTable.selected)}
						</span>
					</div>
					<div>
						<div class="flex mt10 middle">
							<span>总记录数：</span>
							<aInputNumber
								id="inputNumber"
								v-model:value={this.total}
								min={0}
							/>
						</div>
						10000 以内，性能问题不大
						<div>
							增加行高，可以减少viewport内的行数，起到减少计算总量的作用
						</div>
						<div class="flex middle mt10">
							<span>行高：</span>
							<aInputNumber
								id="inputNumber"
								v-model:value={this.configs_xVirTable.rowHeight}
								min={32}
								max={100}
							/>
						</div>
					</div>
				</div>
				<div style="width:100%;height:300px;">
					<xVirTable configs={this.configs_xVirTable} />
				</div>
			</>
		);
	}
});
