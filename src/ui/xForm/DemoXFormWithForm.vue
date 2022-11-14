<script setup lang="jsx">
import {
	AllWasWell,
	defItem,
	validateForm,
	State_UI,
	FormRules
} from "@ventose/ui";
import { reactive } from "vue";
const { $t } = State_UI;

const props = defineProps({
	options: {
		type: Object,
		default() {
			return {};
		}
	}
});
const { name, age } = props.options.payload.row;

const State = reactive({
	row: props.options.payload.row || {},
	dataXItem: {
		...defItem({
			value: name || "新增",
			label: $t("name").label,
			prop: "name",
			rules: [FormRules.required()]
		}),
		...defItem({
			value: age || 0,
			label: $t("age").label,
			prop: "age",
			rules: [FormRules.required()]
		})
	}
});

const Methods = {
	init() {},
	async verifyForm() {
		const validateResults = await validateForm(State.dataXItem);
		return AllWasWell(validateResults);
	},
	getParams() {
		return { ...State.row, ...State.data };
	}
};

/**/
props.options.payload = { State, Methods };
</script>

<template>
	<div id="DialogModifyIP">
		<xForm class="flex vertical" :labelStyle="styleForm">
			<Alert :message="$t('backup_config_note').label" type="info" />
			<template v-for="(item, prop) in State.dataXItem" :key="prop">
				<xGap t="10" />
				<xItem :configs="State.dataXItem[prop]" />
			</template>
		</xForm>
	</div>
</template>

<style lang="less" scoped>
#DialogModifyIP {
	padding: 32px;
}
</style>
