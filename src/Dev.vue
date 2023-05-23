<script lang="tsx">
//@ts-nocheck

import { defineComponent } from "vue";
import xMenuTree from "../entry/lib/xMenuTree.vue";
import { xU, defItem, defCol, defXVirTableConfigs, compileVNode } from "./ui";

export default defineComponent({
	components: { xMenuTree },
	data(vm) {
		return {
			treeArray: [
				{
					id: "a",
					label: "a",
					icon: "vite",
					path: "/Dev/a"
				},
				{
					id: "b",
					label: "b",
					icon: "vite",
					children: [
						{
							id: "ba",
							label: "a",
							icon: "vite",
							path: "/Dev/b/a"
						},
						{
							id: "bb",
							label: "b",
							icon: "UserOutlined",
							path: "/Dev/b/b"
						},
						{
							id: "bc",
							label: "c",
							icon: "UserOutlined",
							children: [
								{
									id: "a",
									label: "a",
									icon: "vite",
									path: "/Dev/b/c/a"
								},
								{
									id: "b",
									label: "b",
									icon: "vite",
									path: "/Dev/b/c/b"
								}
							]
						}
					]
				}
			],
			configs_xVirTable: defXVirTableConfigs({
				rowHeight: 32,
				dataSource: [],
				/* 非必要，除非cell的渲染函数需要一些额外的configs信息 */
				dataSourceFilter(dataSource) {
					return xU.map(dataSource, rowRecord => {
						rowRecord.configsName = defItem.item({
							value: rowRecord.name
						});
						return rowRecord;
					});
				},
				columns: {
					...defCol({
						prop: "name",
						label: vm.$t("名称").label,
						renderCell: ({ record }) => {
							return compileVNode(`<xItem :configs="record.configsName"/>`, {
								record
							});
						}
					}),
					...defCol({
						label: vm.$t("操作").label,
						prop: "operations",
						width: "40px",
						renderHeader: () => null,
						renderCell: ({ record }) => {
							return compileVNode(`<a @click="del(record.id)">del</a>`, {
								record,
								del: vm.del
							});
						}
					})
				}
			})
		};
	},
	mounted() {
		this.genNewData();
	},
	methods: {
		setTableValue(id, prop, val) {
			const recordIndex = xU.findIndex(this.configs_xVirTable.dataSource, {
				id
			});
			if (~recordIndex) {
				const item = this.configs_xVirTable.dataSource.splice(recordIndex, 1);
				item[prop] = val;
				this.configs_xVirTable.dataSource.splice(recordIndex, 0, item);
			}
		},
		updateDateSource() {
			xU.each(this.configs_xVirTable.dataSource, rowRecord => {
				rowRecord.name = rowRecord.configsName.value;
			});
		},
		del(id) {
			const index = xU.findIndex(this.configs_xVirTable.dataSource, { id });
			if (~index) {
				this.updateDateSource();
				this.configs_xVirTable.dataSource.splice(index, 1);
			}
		},
		add() {
			this.updateDateSource();
			this.configs_xVirTable.dataSource.unshift({
				id: xU.genId("id"),
				name: "name"
			});
		},
		genNewData: xU.debounce(function () {
			this.configs_xVirTable.dataSource = [...new Array(2)].map((i, ii) => {
				const item = {
					id: xU.genId("id"),
					name: "name" + ii
				};
				return item;
			});
		}, 10)
	}
});
</script>

<template>
	<xMenuTree :tree="treeArray" />
	<!-- <aButton @click="add">add</aButton>

	<div class="flex horizon">
		<pre
			class="flex1 overflow-auto elevation-1 padding10"
			style="
				width: 100%;
				height: 300px;
			"> <code>{{ JSON.stringify(configs_xVirTable.dataSource, null, 2) }}</code> </pre>
		<div style="width: 100%; height: 300px" class="flex1">
			<xVirTable :configs="configs_xVirTable" />
		</div>
	</div> -->
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
