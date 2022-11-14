<template>
	<xDataGrid :configs="configs_table" />
</template>

<script>
import { ITEM_OPTIONS } from "../../common/options";
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

const { $t } = State_UI;

export default {
	name: "DemoXDataGrid",
	data() {
		return {
			configs_table: defDataGridOption({
				async queryTableList(params) {},
				dataSource: [],
				columns: {
					...defCol({ prop: "name", label: $t("租户名称").label }),
					...defCol({
						prop: "status",
						label: $t("服务状态").label,
						renderCell({ record }) {
							return `${Utils.valueToLabel(
								record.status,
								ITEM_OPTIONS.status
							)}`;
						}
					}),
					...defCol({
						prop: "capacity",
						label: $t("已用容量总容量").label,
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
						prop: "upperVdcName",
						isShow: false,
						label: $t("上级VDC").label
					}),
					...defCol({
						prop: "startDate",
						label: $t("开始时间").label,
						renderCell({ record }) {
							return Utils.dateFormat(record.startDate);
						}
					}),
					...defCol({
						prop: "endDate",
						label: $t("到期时间").label,
						renderCell({ record }) {
							return Utils.dateFormat(record.endDate);
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
