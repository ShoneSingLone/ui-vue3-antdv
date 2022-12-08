<template>
	<DemoAndCode path="/boundless/demo/table/DemoXDataGridxVirTable.sfc" />
	<mkit md="### xDataGrid" />
	<xDataGrid :configs="configs_table" />
	<mkit md="### xPagination" />
	<xPagination
		class="table-pagination"
		:pagination="configs_table.pagination"
		:onPaginationChange="handlePaginationChange" />
</template>

<script>
import { ITEM_OPTIONS } from "../../common/options";
import {
	defCol,
	defColActions,
	vUtils,
	UI,
	defColActionsBtnlist,
	defDataGridOption,
	defItem,
	vModel,
	setDataGridInfo,
	State_UI,
	getPaginationPageSize
} from "@ventose/ui";

const { $t } = State_UI;

export default {
	name: "DemoXDataGrid",
	methods: {
		handlePaginationChange(pagination) {
			console.log("🚀:", "pagination", JSON.stringify(pagination, null, 2));
		}
	},
	data() {
		return {
			configs_table: defDataGridOption({
				async queryTableList(params) {},
				dataSource: [],
				columns: {
					...defCol({ prop: "name", label: $t("名称").label }),
					...defCol({
						prop: "status",
						label: $t("状态").label,
						renderCell({ record }) {
							return `${vUtils.valueToLabel(
								record.status,
								ITEM_OPTIONS.status
							)}`;
						}
					}),
					...defCol({
						prop: "capacity",
						label: $t("总容量").label,
						renderCell({ record }) {
							const { totalCapacity, usedCapacity, status } = record;
							/*开通中*/
							if (status === "ACTIVATION") {
								return "--";
							}
							return `${usedCapacity || "--"} / ${totalCapacity || "--"} GB`;
						}
					}),
					...defCol({
						prop: "category",
						label: $t("类别").label,
						renderCell({ record }) {
							if (record.tenant) {
								return $t("租户").label;
							}
							if (record.level) {
								return $t("级VDC", { level: record.level || "1" }).label;
							}
							return "--";
						}
					}),
					...defCol({
						prop: "upperName",
						isShow: false,
						label: $t("上级名称").label
					}),
					...defCol({
						prop: "startDate",
						label: $t("开始时间").label,
						renderCell({ record }) {
							return vUtils.dateFormat(record.startDate);
						}
					}),
					...defCol({
						prop: "endDate",
						label: $t("到期时间").label,
						renderCell({ record }) {
							return vUtils.dateFormat(record.endDate);
						}
					})
				}
			})
		};
	}
};
</script>

<style></style>
>
