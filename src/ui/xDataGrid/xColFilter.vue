<script lang="jsx">
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import { filterColIsShow } from "./common";

export default defineComponent({
	name: "xColFilter",
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {
		handleChecked(col) {
			const target = xU.find(this.configs.columns, { key: col.key });
			target.isShow = xU.isBoolean(target.isShow) ? !target.isShow : false;
		}
	},
	computed: {
		/*列顺序*/
		Cpt_ColumnsOrder() {
			const order = (() => {
				if (this.configs.columns_order) {
					return this.configs.columns_order;
				} else {
					return xU.map(this.configs.columns, i => i.prop);
				}
			})();
			return xU.filter(order, i => !!i);
		},

		/*列*/
		Cpt_Columns() {
			return xU.map(this.Cpt_ColumnsOrder, prop =>
				xU.find(this.configs.columns, { prop })
			);
		},

		checkedList() {
			return xU.filter(this.Cpt_ColumnsOrder, prop => {
				const { isShow } = this.configs.columns[prop];
				return filterColIsShow(isShow, prop);
			});
		}
	}
});
</script>

<template>
	<ElPopover placement="leftTop" trigger="click">
		<template #content>
			<p v-for="col in Cpt_Columns" :key="col.key">
				<ElCheckbox
					:checked="checkedList.includes(col.key)"
					@change="handleChecked(col)"
					>{{ col.title }}</ElCheckbox
				>
			</p>
		</template>
		<elButton>
			<template #icon>
				<xIcon icon="insideSettingOutlined" style="height: 100%; width: 100%" />
			</template>
		</elButton>
	</ElPopover>
</template>
