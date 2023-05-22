<script lang="jsx">
import { defineComponent } from "vue";
import { setPagination } from "./common";
import xColFilter from "./xColFilter.vue";

export default defineComponent({
	name: "xDataGridToolbar",
	components: { xColFilter },
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		Cpt_btn_query() {
			return {
				preset: "query",
				onClick: async () => {
					if (this.configs?.queryTableList) {
						/* reset 当前页为1 */
						setPagination(this.configs, { page: 1 });
						await this.configs.queryTableList({ pagination: { page: 1 } });
					}
				}
			};
		},
		Cpt_btn_refresh() {
			return {
				preset: "refresh",
				onClick: async () => {
					if (this.configs.queryTableList) {
						await this.configs.queryTableList();
					}
				}
			};
		},
		Cpt_isShowQuery() {
			/*如果没有queryTableList fn 不显示 query 按钮*/
			if (!this.configs.queryTableList) {
				return false;
			}
			return !this.configs.isHideQuery;
		},
		Cpt_isShowRefresh() {
			if (!this.configs.queryTableList) {
				return false;
			}
			return !this.configs.isHideRefresh;
		},
		Cpt_isShowFilter() {
			if (this.configs.isGroupingColumns) {
				return false;
			}
			if (this.configs.isHideFilter) {
				return false;
			}
			return true;
		},
		Cpt_isSetConfigs() {
			/* configs 默认会设置pagination属性  */
			/*
			<!--
		Cpt_isSetConfigs:{{Cpt_isSetConfigs}}
		Cpt_isShowQuery:{{Cpt_isShowQuery}}
		Cpt_isShowRefresh:{{Cpt_isShowRefresh}}
		Cpt_isShowFilter:{{Cpt_isShowFilter}}
		--> */
			return this.configs;
		}
	}
});
</script>

<template>
	<div class="table-options">
		<div class="table-option-left flex flex1">
			<slot />
		</div>
		<div class="table-filter flex" v-if="Cpt_isSetConfigs">
			<xButton :configs="Cpt_btn_query" v-if="Cpt_isShowQuery" />
			<xGap l="4" />
			<xButton :configs="Cpt_btn_refresh" v-if="Cpt_isShowRefresh" />
			<xGap l="4" />
			<xColFilter :configs="configs" v-if="Cpt_isShowFilter" />
		</div>
	</div>
</template>
