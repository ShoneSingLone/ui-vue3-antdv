<template>
	<xButton :configs="configs.btn.query" />
	<xButton :configs="configs.btn.refresh" />
	<xButton :configs="configs.btn.save" />
	<xButton :configs="configs.btn.upload" />
	<xButton :configs="configs.btn.delete" />
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
							return $t("编辑").label;
						},
						async onClick() {}
					},
					query: { preset: "query", onClick: log },
					refresh: { preset: "refresh", onClick: log },
					save: { preset: "save", onClick: log },
					upload: { preset: "upload", onClick: log },
					delete: { preset: "delete", onClick: log }
				}
			}
		};
	}
};
</script>

<style></style>
