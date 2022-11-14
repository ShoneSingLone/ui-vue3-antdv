<template>
	<xButton :configs="configs.btn.modifyIP" />
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
							return $t("xDialog").label;
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
					}
				}
			}
		};
	}
};
</script>

<style></style>
