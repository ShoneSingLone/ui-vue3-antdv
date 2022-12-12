//@ts-nocheck

import { xU } from "../../ventoseUtils";
import $ from "jquery";
import { LayerUtils, KEY } from "../layer/LayerUtils";
import { createApp, defineComponent, reactive, h } from "vue";
import { State_UI } from "../../State_UI";

export type t_dialogOptions = {
	/* 传入的组件的实例 */
	_contentInstance?: object;
	/* dialog jQuery 实例 */
	_dialog$ele?: JQuery;
	/* 在component里面propDialogOptions作为参数传入*/
	title: string;
	component: object;
	area?: string[];
	/* layer 索引，用于layer close */
	_layerKey?: number;
	/*关闭方法*/
	closeDialog?: Function;
	/* hook: 完成组件首次加载 */
	onAfterOpenDialoag?: Function;
	onBeforeClose?: Function;
};

const xDialogFooter = defineComponent({
	props: ["configs"],
	computed: {
		onCancel() {
			return this.configs.onCancel
		},
		onOk() {
			return this.configs.onOk
		},
		vDomOk() {
			if (this.configs?.hideOk) {
				return null;
			}
			return <aButton type="primary" class="ml10" onClick={this.onOk} > {xU.isInput(this.configs.textOk) ? this.configs.textOk : State_UI.$t("确定").label} </aButton>
		},
		vDomCancel() {
			if (this.configs?.hideCancel) {
				return null;
			}
			return <aButton onClick={this.onCancel} > {xU.isInput(this.configs.textCancel) ? this.configs.textCancel : State_UI.$t("取消").label} </aButton>

		},
	},
	render() {
		return <div class="flex middle end ant-modal-footer">
			{this.vDomCancel}
			{this.vDomOk}
		</div >
	}
})

export const installUIDialogComponent = (UI, { appPlugins, dependState }, app) => {
	app.component("xDialogFooter", xDialogFooter)
	UI.dialog.component = async (dialogOptions: t_dialogOptions) =>
		new Promise((resolve, reject) => {
			const { component: BussinessComponent, title, area } = dialogOptions;
			const id = `xDialog_${Date.now()}`;
			let $container = $("<div/>", { id });
			const _dialogId = `#${id}`;
			/* FIXED: */
			if (dialogOptions.yes) {
				dialogOptions._yes = dialogOptions.yes;
				delete dialogOptions.yes;
			}

			dialogOptions.closeDialog = () => {
				let isCloseDialog = true;
				if (dialogOptions.onBeforeClose) {
					isCloseDialog = Boolean(dialogOptions.onBeforeClose({ dialogOptions, _layerKey: "", $eleLayer: '' }));
				}
				if (isCloseDialog) {
					LayerUtils.close(handleEcsPress._layerKey);
				}
			};

			/*dialog 的vue app*/
			let dialogVueApp = null;

			/* 处理按Esc键关闭弹窗 */
			let handleEcsPress = {
				_layerKey: "",
				handler(event) {
					const code = event.keyCode;
					event.preventDefault();
					if (code === KEY.esc) {
						dialogOptions.closeDialog()
					}
				},
				on(_layerKey) {
					handleEcsPress._layerKey = _layerKey;
					$(document).on(`keyup.${_dialogId}`, handleEcsPress.handler);
				},
				off() {
					$(document).off(`keyup.${_dialogId}`, handleEcsPress.handler);
					handleEcsPress = null;
				}
			};

			const layerOptions =
				xU.merge(
					dialogOptions,
					{
						/* 传入自定义样式 */
						contentClass: "flex1",
						type: LayerUtils.DIALOG,
						title: [title || ""],
						area: area || ["800px"],
						content: $container,
						offset: ["160px", null],
						/* 无按钮 */
						btn: [ /*'确定', '取消'*/],
						success($eleLayer, _layerKey) {
							handleEcsPress.on(_layerKey);
							/* dialog jQuery 实例 */
							dialogOptions._dialog$ele = $eleLayer;
							dialogOptions._layerKey = _layerKey;
							try {
								dialogVueApp = createApp(
									defineComponent({
										components: { BussinessComponent },
										created() {
											this.dialogOptions._contentInstance = this;
											resolve(this);
										},
										mounted() {
											if (this.dialogOptions.fullscreen) {
												LayerUtils.full(_layerKey);
											}
										},
										data() {
											return { dialogOptions };
										},
										render() {
											return (
												<div class="ventose-dialog-content" data-el-id={_dialogId}>
													<BussinessComponent propDialogOptions={this.dialogOptions} />
												</div>
											);
										}
									})
								);
								dialogVueApp.use(appPlugins, { dependState });
								dialogVueApp.mount(_dialogId);
							} catch (e) {
								console.error(e);
							}
							dialogOptions.onAfterOpenDialoag && dialogOptions.onAfterOpenDialoag(dialogVueApp);
						},
						cancel() {
							dialogOptions.closeDialog();
							return false;
						},
						end() {
							handleEcsPress.off();
							$container.remove();
							$container = null;
							if (dialogVueApp) {
								dialogVueApp.unmount();
								dialogVueApp = null;
							}
							dialogOptions.payload = null;
							dialogOptions._contentInstance = null;
							dialogOptions = null;
						}
					},
					xU.omit(dialogOptions, ["end", "cancel", "success", "content"])
				);

			LayerUtils.open(layerOptions);
		});
};
