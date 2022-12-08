//@ts-nocheck

import { vUtils } from "../../ventoseUtils";
import $ from "jquery";
import { LayerUtils, KEY } from "../layer/LayerUtils";
import { createApp, defineComponent, reactive, h } from "vue";

export type t_dialogOptions = {
	__dialogInstance?: object;
	__elId?: string;
	/* 在component里面将需要的数据放在payload里面，onOK作为options里的参数传入，可以用于表单数据获取 */
	payload?: Object;
	title: string;
	component: object;
	/*关闭方法*/
	close?: Function;
	area?: string[];
	/* layer 索引，用于layer close */
	layerIndex?: number;
	/* hook: 完成组件首次加载 */
	afterOpenDialoag?: Function;
	onOk: Function;
	beforeCancel?: Function;
	hideButtons?: boolean;
	renderButtons?: Function;
};
export const installUIDialogComponent = (UI, { appPlugins, dependState }) => {
	UI.dialog.component = async (dialogOptions: t_dialogOptions) =>
		new Promise((resolve, reject) => {
			const { component: BussinessComponent, title, area } = dialogOptions;
			const id = `xDialog_${Date.now()}`;
			let $container = $("<div/>", {
				id
			});
			$container.appendTo($("body"));
			const __elId = `#${id}`;
			/* FIXED: */
			if (dialogOptions.yes) {
				dialogOptions._yes = dialogOptions.yes;
				delete dialogOptions.yes;
			}
			/*dialog 的vue app*/
			let dialogVueApp = null;

			/* 处理按Esc键关闭弹窗 */
			let handleEcsPress = {
				layerIndex: "",
				handler(event) {
					const code = event.keyCode;
					event.preventDefault();
					if (code === KEY.esc) {
						LayerUtils.close(handleEcsPress.layerIndex);
					}
				},
				on(layerIndex) {
					handleEcsPress.layerIndex = layerIndex;
					$(document).on(`keyup.${__elId}`, handleEcsPress.handler);
				},
				off() {
					$(document).off(`keyup.${__elId}`, handleEcsPress.handler);
					handleEcsPress = null;
				}
			};

			LayerUtils.open(
				vUtils.merge(
					{
						/* 传入自定义样式 */
						contentClass: "flex1",
						type: 1,
						title: [title || ""],
						area: area || ["800px"],
						content: $container,
						offset: ["160px", null],
						btn: [
							/*'确定', '取消'*/
						],
						success(indexPanel, layerIndex) {
							handleEcsPress.on(layerIndex);
							try {
								dialogVueApp = createApp(
									defineComponent({
										beforeMount() {
											resolve(this);
										},
										created() {
											this.dialogOptions.__dialogInstance = this;
											this.dialogOptions.__elId = __elId;
										},
										mounted() {
											if (this.dialogOptions.fullscreen) {
												this.fullDialog();
											}
										},
										data() {
											return { dialogOptions };
										},
										methods: {
											fullDialog() {
												LayerUtils.full(layerIndex);
											},
											async handleClickOk() {
												if (dialogOptions.onOk) {
													await dialogOptions.onOk(dialogOptions);
												} else {
													await this.handleClickCancel();
												}
											},
											async handleClickCancel() {
												let isClose = true;
												if (dialogOptions.beforeCancel) {
													isClose = await dialogOptions.beforeCancel();
												}
												if (isClose) {
													LayerUtils.close(layerIndex);
												} else {
													return false;
												}
											}
										},
										computed: {
											okText() {
												return (
													this.dialogOptions.okText || this.$t("确定").label
												);
											},
											cancelText() {
												return (
													this.dialogOptions.cancelText || this.$t("取消").label
												);
											},
											/* 主要内容 */
											renderContent() {
												return (
													<BussinessComponent
														propDialogOptions={dialogOptions}
														class="flex1"
														style="overflow:auto;"
													/>
												);
											},
											/* 下方按钮 */
											renderButtons() {
												if (this.dialogOptions.hideButtons) {
													return null;
												}
												if (vUtils.isFunction(this.dialogOptions.renderButtons)) {
													/* 提供 handleClickOk、handleClickCancel*/
													let vDomButtons = (() => {
														let _vDomButtons =
															this.dialogOptions.renderButtons(this);
														if (!_vDomButtons) {
															return null;
														} else if (_vDomButtons.template) {
															return h(_vDomButtons);
														} else {
															return _vDomButtons;
														}
													})();

													return vDomButtons;
												}
												return this.vDomDefaultButton;
											},
											vDomDefaultButton() {
												const [isShowCancel, isShowOk] = (() => {
													return [
														!this.dialogOptions.hideCancel || null,
														!this.dialogOptions.hideOk || null
													];
												})();
												return (
													<>
														{isShowCancel && (
															<xButton
																configs={{ onClick: this.handleClickCancel }}>
																{this.cancelText}
															</xButton>
														)}
														<xGap l="10" />
														{isShowOk && (
															<xButton
																configs={{
																	onClick: this.handleClickOk,
																	type: "primary"
																}}>
																{this.okText}
															</xButton>
														)}
													</>
												);
											}
										},
										render() {
											return (
												<div
													class="flex vertical h100 width100"
													data-el-id={__elId}>
													{this.renderContent}
													<div class="flex middle end ant-modal-footer">
														{this.renderButtons}
													</div>
												</div>
											);
										}
									})
								);
								dialogVueApp.use(appPlugins, { dependState });
								dialogVueApp.mount(__elId);
							} catch (e) {
								console.error(e);
							}
							dialogOptions.layerIndex = layerIndex;
							dialogOptions.close = () => {
								LayerUtils.close(layerIndex);
							};
							dialogOptions.afterOpenDialoag &&
								dialogOptions.afterOpenDialoag(dialogVueApp);
						},
						cancel() {
							/*点击右上角的关闭按钮*/
							if (dialogVueApp) {
								dialogVueApp._instance?.proxy?.handleClickCancel();
							}
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
							dialogOptions.__dialogInstance = null;
							dialogOptions = null;
						}
					},
					dialogOptions
				)
			);
		});
};
