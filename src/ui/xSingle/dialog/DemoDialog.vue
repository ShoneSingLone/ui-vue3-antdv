<template>
	<xButton :configs="configs.btn.modifyIP" />
	<xGap t="10" />
	<xButton :configs="configs.btn.noBtn" />
	<xGap t="10" />
	<xButton :configs="configs.btn.customBtn" />
</template>

<script>
import { defineComponent } from "vue";
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

export default {
	data() {
		return {
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
