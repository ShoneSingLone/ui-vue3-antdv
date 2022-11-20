<template>
	<aCard>
		<xButton :configs="configsValidBtn" />
		<mkit :md="tips1" />
		<span class="mr10">{{ formData.inputValue }}</span>
		<xItem
			:configs="xForm.search"
			class="flex1"
			v-model="formData.inputValue" />
		<mkit :md="tips2" />

		<div class="flex middle mt10">
			<span class="mr10">{{ xForm.select.value }}</span>
			<xItem :configs="xForm.select" class="flex1" />
		</div>
		<xItem
			:configs="xForm.withLabelProperty"
			class="flex1"
			v-model="formData.inputValue" />
	</aCard>
	<div class="mt10"></div>
	<aCard>
		<DemoXFormWithForm :options="{ payload: { row: {} } }" />
	</aCard>
</template>

<script>
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
	Utils,
	validateForm,
	AllWasWell,
	pickValueFrom,
	FormRules
} from "@ventose/ui";
import { DemoXFormWithForm } from "./DemoXFormWithForm.tsx";

const { $t } = State_UI;

export default {
	components: {
		DemoXFormWithForm
	},
	methods: {
		valid() {}
	},
	data() {
		const vm = this;
		const xForm = {
			...defItem({
				prop: "search",
				placeholder: "Input",
				allowClear: true,
				onAfterValueChange(val) {
					console.log("🚀:", "search configs", this, val);
				}
			}),
			...defItem({
				label: "withLabelProperty",
				prop: "withLabelProperty",
				placeholder: "Input",
				allowClear: true,
				rules: [FormRules.required()]
			}),
			...defItem({
				value: [],
				prop: "select",
				label: $t("类型").label,
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
			})
		};
		return {
			configsValidBtn: {
				text: "校验",
				async onClick() {
					try {
						const validateResults = await validateForm(vm.xForm);
						if (AllWasWell(validateResults)) {
							UI.message.success("校验成功");
						} else {
							UI.message.error("校验失败");
						}
					} catch (error) {
						UI.notification.error(error?.message || "错误");
					}
				}
			},
			formData: {
				inputValue: "v-model"
			},
			xForm,
			tips1: `### 可以单独使用v-model绑定数据
\`\`\`js
<xItem :configs="xForm.search" class="flex1" v-model="formData.inputValue" />
formData: {
	inputValue: "v-model"
},
...defItem({
	prop: "search",
	placeholder: "Input",
	allowClear: true,
	onAfterValueChange(val) {
		console.log("🚀:", "search configs", this, val);
	}
}),
\`\`\`
`,
			tips2: `### 只使用configs绑定数据
>必须有**value**属性		
\`\`\`js
<xItem :configs="xForm.select" class="flex1" />
/* 必须有value属性 */
...defItem({
	value: [],
	prop: "select",
	label: $t("类型").label,
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
})
\`\`\`
`
		};
	}
};
</script>

<style></style>
