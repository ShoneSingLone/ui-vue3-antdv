<template>
	<xButton
		:configs="configs.btn.modifyIP"
		v-uiPopover="configs_uiPopoverLongString" />
	<mkit :md="`## v-uiPopover`" />
	<mkit :md="md_noEllipsis" />
	<div v-uiPopover="{ onlyEllipsis: true }">
		<aTag>没有省略号，无tips</aTag>
	</div>
	<mkit :md="md_Ellipsis" />
	<div
		v-uiPopover="{ onlyEllipsis: true }"
		class="ellipsis mb10"
		style="width: 300px">
		<aTag>内容太长，</aTag
		>有ellipsis，asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
	</div>

	<xButton :configs="configs.btn.modifyIP" v-uiPopover="configs_uiPopover" />
	<xButton
		:configs="configs.btn.modifyIP"
		v-uiPopover="{ content: $t('这是一个浮动tips').label }" />
	<xButton
		:configs="configs.btn.modifyIP"
		v-uiPopover="{ content: $t('这是一个浮动tips').label }" />
	<mkit :md="md_vUiPopover" />
	<xGap t="10" />
	<xButton :configs="configs.btn.noBtn" />
	<xGap t="10" />
	<xButton :configs="configs.btn.customBtn" />
</template>

<script>
import { defineComponent, markRaw } from "vue";
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
import { DemoXFormWithForm } from "../../xForm/DemoXFormWithForm.tsx";

const { $t } = State_UI;

async function log() {
	const text = this.text;
	this.text = "loading...";
	await _.sleep(1000);
	this.text = text;
}

const PopoverContent = defineComponent(
	markRaw({
		template: `<aCard type="primary"> aCard </aCard>`
	})
);

export default {
	data() {
		return {
			md_noEllipsis: `\`\`\`js
	<div v-uiPopover="{ onlyEllipsis: true }">没有省略号，无tips</div>
\`\`\``,
			md_Ellipsis: `\`\`\`js
	<div
		v-uiPopover="{ onlyEllipsis: true }"
		class="ellipsis"
		style="width: 300px">
		内容太长，有ellipsis，asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
	</div>
\`\`\``,
			configs_uiPopoverLongString: {
				content: `js /* 一般按钮 hover会有一个tips*/ xButton :configs="configs.btn.modifyIP" v-uiPopover="{ content: $t('这是一个浮动tips').label }" `
			},
			configs_uiPopover: { content: PopoverContent },
			md_vUiPopover: `### 使用v-uiPopover
\`\`\`js
/* 一般按钮 hover会有一个tips*/
<xButton :configs="configs.btn.modifyIP" v-uiPopover="{ content: $t('这是一个浮动tips').label }" />
\`\`\`
`,
			configs: {
				btn: {
					modifyIP: {
						text: () => {
							return $t("一般").label;
						},
						async onClick() {
							UI.dialog.component({
								title: $t("DemoXFormWithForm").label,
								component: DemoXFormWithForm,
								maxmin: true,
								payload: {
									row: {
										name: "name"
									}
								},
								area: ["694px", "440px"],
								async onOk(instance) {
									const { close, payload } = instance;
									const { Methods } = payload;
									try {
										if (await Methods.verifyForm()) {
											const params = Methods.getParams();
											console.log(params);
											close();
										}
									} catch (e) {
										logError(e?.error?.msg);
									}
								}
							});
						}
					},
					noBtn: {
						text: () => {
							return $t("无按钮").label;
						},
						async onClick() {
							UI.dialog.component({
								title: $t("DemoXFormWithForm").label,
								component: defineComponent({
									template: `<p>演示使用bundless的形式，使用template，不使用jsx</p>`
								}),
								hideButtons: true,
								hideCancel: true,
								hideOk: true,
								maxmin: true,
								payload: {
									row: {
										name: "name"
									}
								},
								area: ["694px", "440px"],
								async onOk(instance) {
									const { close, payload } = instance;
									const { Methods } = payload;
									try {
										if (await Methods.verifyForm()) {
											const params = Methods.getParams();
											console.log(params);
											close();
										}
									} catch (e) {
										logError(e?.error?.msg);
									}
								}
							});
						}
					},
					customBtn: {
						text: () => {
							return $t("自定义按钮").label;
						},
						async onClick() {
							async function onClickOK() {
								const { close, payload } = instance;
								const { Methods } = payload;
								try {
									if (await Methods.verifyForm()) {
										const params = Methods.getParams();
										console.log(params);
										close();
									}
								} catch (e) {
									logError(e?.error?.msg);
								}
							}

							let count = 0;

							const dialogOptions = {
								title: $t("DemoXFormWithForm").label,
								component: defineComponent({
									props: ["propDialogOptions"],
									methods: {
										setBtnDefault() {
											console.log(
												"instance===dialogOptions.__dialogInstance",
												instance === dialogOptions.__dialogInstance
											);
											if (count++ % 2 === 0) {
												instance.options.renderButtons = () =>
													defineComponent({
														template: `
														<aButton @click="handleClick">${instance.cancelText}${count}</aButton>
														<xGap l="10" />
														<aButton @click="handleClick">count: ${count}</aButton>
													`,
														methods: {
															handleClick() {
																return instance.handleClickCancel();
															}
														}
													});
											} else {
												instance.options.renderButtons =
													instance.vDomDefaultButton;
											}
											/*options 本身不是响应式，需要在instance赋值再来触发*/
											instance.options = { ...instance.options };
										}
									},
									template: `
										<div class="padding20">
											<p>演示使用bundless的形式，使用template，不使用jsx</p>
											<div>
												<p>作为弹出的组件，有prop字段propDialogOptions，本身是传入dialog的参数options，经过实例化，添加了实例引用__dialogInstance，和DOM id __elId。当前DOM id {{propDialogOptions.__elId}}</p>
												<p> this.dialogOptions.__dialogInstance = this;</p>
												<p>this.dialogOptions.__elId = __elId; </p>
											</div>
											<div class="flex">
												<xGap f="1" />
												<aButton @click="setBtnDefault">改变按钮</aButton>
											</div>
										</div>`
								}),
								renderButtons: dialogInstance => {
									return dialogInstance.vDomDefaultButton;
								},
								maxmin: true,
								payload: {
									row: {
										name: "name"
									}
								},
								area: ["694px", "440px"]
							};

							const instance = await UI.dialog.component(dialogOptions);
						}
					}
				}
			}
		};
	}
};
</script>

<style></style>
