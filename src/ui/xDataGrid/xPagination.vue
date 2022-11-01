<script lang="jsx">
import { defineComponent } from "vue";
import { _ } from "../loadCommonUtil";
import { Pagination } from "ant-design-vue";
import { setPagination } from "./common";
import { lStorage } from "../tools/storage";

const PAGE_SIZE_OPTIONS = ["10", "20", "30"];

export default defineComponent({
	name: "xPagination",
	components: {
		Pagination
	},
	props: {
		onPaginationChange: {
			type: Function,
			default: false
		},
		pagination: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		/* pagination 对象上page,size,total对应的prop字符，可在appConfigs中自定义 */
		const { page, size, total } = lStorage.appConfigs.pagination;
		return {
			pageSizeOptions: PAGE_SIZE_OPTIONS,
			page,
			size,
			total
		};
	},
	methods: {
		onShowSizeChange: _.debounce(function (page, size) {
			setPagination(this, { page, size });
			if (this.onPaginationChange) {
				this.onPaginationChange(this.pagination);
			}
		}, 30)
	}
});

const { page, size, total } = lStorage.appConfigs.pagination;
</script>

<template>
	<Pagination
		v-model:current="pagination[page]"
		:page-size-options="pageSizeOptions"
		:total="pagination[total]"
		:page-size="pagination[size]"
		show-size-changer
		:show-total="total => $t('总条数', { total: total }).label"
		@showSizeChange="onShowSizeChange"
		@change="onShowSizeChange">
		<template #buildOptionText="props">
			<span>{{ $t("条页", { size: props.value }).label }}</span>
		</template>
	</Pagination>
</template>
