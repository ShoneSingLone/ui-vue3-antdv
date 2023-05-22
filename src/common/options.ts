export const ITEM_OPTIONS = {
	status: [
		{ label: "开通", value: "ACTIVATED" },
		{ label: "未开通", value: "NONACTIVATED" }
	],
	statusFn(action) {
		if (action === "all") {
			return [{ label: "所有状态", value: "" }].concat(this.status);
		}
		return this.status;
	},
	serviceType: [
		{ label: "镜像", value: 1 },
		{ label: "SAAS", value: 0 }
	],
	support: [
		{ label: "支持", value: 1 },
		{ label: "不支持", value: 0 }
	],
	/* 架构类型 */
	specType: [
		{ label: "aarch64", value: "aarch64" },
		{ label: "x86_64", value: "x86_64" }
	],
	vmStatus: [
		{ label: "运行中", value: "ACTIVE" },
		{ label: "--", value: "DELETE" }
	],
	instanceStatus: [
		{ label: "已激活", value: 7 },
		{ label: "删除成功", value: 4 }
	],
	op: [
		{ label: "跳转", value: 0 },
		{ label: "访问管理", value: 1 },
		{ label: "变更", value: 2 },
		{ label: "销毁", value: 3 },
		{ label: "agent下载", value: 4 }
	]
};
