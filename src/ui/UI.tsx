//@ts-nocheck
import { t_dialogOptions } from "./xSingle/dialog/dialog";
import { State_UI } from "./State_UI";
import { LayerUtils } from "./xSingle/layer/LayerUtils";
import {
	ElMessage,
	ElMessageBox,
	ModalFuncProps,
	ElNotification
} from "element-plus";
import $ from "jquery";
import { xU } from "./ventoseUtils";

/* 静态方法，与APP实例无关，引用有直接可用 */

const useModel = type => {
	return ({ title = "", content = "" }) => {
		return new Promise((resolve, reject) => {
			title = (isDefault => {
				if (isDefault) {
					const title_map = {
						success: State_UI.$t("成功").label,
						info: State_UI.$t("提示").label,
						error: State_UI.$t("错误").label,
						warning: State_UI.$t("警告").label
					};
					return title_map[type];
				} else {
					return title;
				}
			})(!title);
			debugger;
			ElMessageBox[type](content, title, {
				icon: (
					<link
						rel="icon"
						type="image/svg+xml"
						href="/ExclamationCircleOutlined.svg"
					/>
				),
				confirmButtonText: State_UI.$t("确定").label,
				cancelButtonText: State_UI.$t("取消").label,
				class: "test"
			})
				.then(resolve)
				.catch(reject);
		});
	};
};

LayerUtils.loading = function (indexDelete) {
	this.loading.count = this.loading.count || 1;
	this.loading.deep = this.loading.deep || new Set();
	$("body").trigger("click");
	if (indexDelete >= 0) {
		if (this.loading.deep.has(indexDelete)) {
			/* 如果size不是一，则不需要消失 */
			this.loading.deep.delete(indexDelete);
			if (this.loading.deep.size === 0) {
				LayerUtils.close(this.loading.index);
			}
		} else {
			console.error("loading", indexDelete);
		}
	} else {
		/* 全局单例，如果有一个，如果loading，不需要new loading */
		let indexAdd = this.loading.count++;
		if (this.loading.deep.size === 0) {
			this.loading.index = LayerUtils.load(1);
		}
		this.loading.deep.add(indexAdd);
		return indexAdd;
	}
};

export const UI = {
	confirm({ title, content, okText, cancelText }) {
		ElMessageBox.confirm(content, title, {
			confirmButtonText: okText || State_UI.$t("确定").label,
			cancelButtonText: cancelText || State_UI.$t("取消").label
		})
			.then(resolve)
			.catch(reject);
	},
	dialog: {
		/* installUIDialogComponent Vue3 依赖外部plugin，没有全局的 */
		component: async (options: t_dialogOptions) => null,
		success: useModel("success"),
		info: useModel("info"),
		error: useModel("error"),
		warning: useModel("warning"),
		confirm: ({ title, content, okText, cancelText }) => {
			return new Promise(async (resolve, reject) => {
				ElMessageBox.confirm(content, title, {
					confirmButtonText: okText || State_UI.$t("确定").label,
					cancelButtonText: cancelText || State_UI.$t("取消").label
				})
					.then(resolve)
					.catch(reject);
			});
		},
		delete({ title, content } = {}) {
			title = title || State_UI.$t("删除").label;
			content = content || State_UI.$t("删除确认提示").label;
			return new Promise((resolve, reject) => {
				ElMessageBox.confirm({
					title,
					icon: <ExclamationCircleOutlined style={"color:red"} />,
					content,
					okType: "danger",
					okText: State_UI.$t("确定").label,
					cancelText: State_UI.$t("取消").label,
					onOk() {
						resolve("ok");
					},
					onCancel() {
						reject();
					}
				});
			});
		}
	},
	message: ElMessage,
	notification: new Proxy(ElNotification, {
		get(target, p, receiver) {
			const m = target[p];
			return new Proxy(m, {
				apply(target, thisArg, argArray) {
					if (typeof argArray[0] === "string") {
						argArray[0] = xU.merge({ message: argArray[0] }, argArray[1] || {});
					}
					return target.apply(thisArg, argArray);
				}
			});
		}
	}),
	layer: LayerUtils
};
