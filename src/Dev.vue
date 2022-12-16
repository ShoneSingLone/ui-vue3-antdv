<script lang="ts">
//@ts-nocheck

import { defineComponent, markRaw } from "vue";
import { xU, defItem, defCol, defXVirTableConfigs, compileVNode } from "./ui";

export default defineComponent({
	setup() {},
	data(vm) {
		return {
			configsItem: {
				...defItem({
					prop: "name",
					onAfterValueEmit: (val, { xItemVm }) => {
						vm.setTableValue(xItemVm.$attrs.recordId, "name", val);
					}
				})
			},
			configs_xVirTable: defXVirTableConfigs({
				rowHeight: 32,
				dataSource: [],
				columns: {
					...defCol({
						prop: "name",
						label: vm.$t("名称").label,
						renderCell: ({ record }) => {
							return compileVNode(
								`<xItem :configs="configsItem" :recordId="record.id" v-model="record.name"/>`,
								{ configsItem: vm.configsItem.name, record }
							);
						}
					}),
					...defCol({
						label: vm.$t("操作").label,
						prop: "operations",
						width: "40px",
						renderHeader: () => null,
						renderCell: ({ record }) => {
							return compileVNode(`<a @click="del(record.id)">del</a>`, {
								del: vm.del,
								record
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
		setTableValue(key, prop, val) {
			const recordIndex = xU.findIndex(this.configs_table.dataSource, { key });
			if (~recordIndex) {
				this.configs_table.dataSource[recordIndex][prop] = val;
			}
		},
		del(id) {
			const index = xU.findIndex(this.configs_xVirTable.dataSource, { id });
			if (~index) {
				this.configs_xVirTable.dataSource.splice(index, 1);
			}
		},
		add() {
			this.configs_xVirTable.dataSource.unshift({
				id: xU.genId("id"),
				name: "name"
			});
		},
		genNewData: xU.debounce(function () {
			this.configs_xVirTable.dataSource = [...new Array(2)].map((i, ii) => {
				return { id: xU.genId("id"), name: "name" + ii };
			});
		}, 10)
	}
});
</script>

<template>
	<aButton @click="add">add</aButton>
	<div class="flex horizon">
		<pre class="flex1">
			<code>{{JSON.stringify(configs_xVirTable.dataSource,null,2)}}</code>
		</pre>
		<div style="width: 100%; height: 300px" class="flex1">
			<xVirTable :configs="configs_xVirTable" />
		</div>
	</div>
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
