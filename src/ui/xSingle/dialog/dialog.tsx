//@ts-nocheck

import { _ } from "../../loadCommonUtil";
import $ from "jquery";
import layer, { KEY } from "../../xSingle/layer/layer";
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
  UI.dialog.component = async (options: t_dialogOptions) =>
    new Promise((resolve, reject) => {
      const { component, title, area } = options;
      const id = `xDialog_${Date.now()}`;
      let $container = $("<div/>", {
        id,
      });
      $container.appendTo($("body"));
      const __elId = `#${id}`;
      /* FIXED: */
      if (options.yes) {
        options._yes = options.yes;
        delete options.yes;
      }
      let app = null;

      /* 处理按Esc键关闭弹窗 */
      let handleEcsPress = {
        layerIndex: "",
        handler(event) {
          const code = event.keyCode;
          event.preventDefault();
          if (code === KEY.esc) {
            layer.close(handleEcsPress.layerIndex);
          }
        },
        on(layerIndex) {
          handleEcsPress.layerIndex = layerIndex;
          $(document).on(`keyup.${__elId}`, handleEcsPress.handler);
        },
        off() {
          $(document).off(`keyup.${__elId}`, handleEcsPress.handler);
          handleEcsPress = null;
        },
      };

      layer.open(
        _.merge(
          {
            /* 传入自定义样式 */
            contentClass: "flex1",
            type: 1,
            title: [title || ""],
            area: area || ["800px", "520px"],
            content: $container,
            offset: ["160px", null],
            btn: [
              /*'确定', '取消'*/
            ],
            success(indexPanel, layerIndex) {
              handleEcsPress.on(layerIndex);
              try {
                app = createApp(
                  defineComponent({
                    mounted() {
                      if (options.fullscreen) {
                        layer.full(layerIndex);
                      }
                    },
                    data() {
                      options.__dialogInstance = this;
                      options.__elId = __elId;
                      return { options };
                    },
                    methods: {
                      async handleClickOk() {
                        if (options.onOk) {
                          await options.onOk(options);
                        } else {
                          await this.handleClickCancel();
                        }
                      },
                      async handleClickCancel() {
                        let isClose = true;
                        if (options.beforeCancel) {
                          isClose = await options.beforeCancel();
                        }
                        if (isClose) {
                          layer.close(layerIndex);
                          reject();
                        } else {
                          return false;
                        }
                      },
                    },
                    computed: {
                      okText() {
                        return this.options.okText || this.$t("确定").label;
                      },
                      cancelText() {
                        return this.options.cancelText || this.$t("取消").label;
                      },
                      /* 主要内容 */
                      renderContent() {
                        return (
                          <component
                            options={options}
                            class="flex1"
                            style="overflow:auto;"
                          />
                        );
                      },
                      /* 下方按钮 */
                      renderButtons() {
                        if (this.options.hideButtons) {
                          return null;
                        }

                        if (this.options.renderButtons) {
                          return (
                            <div class="flex middle end ant-modal-footer">
                              {this.options.renderButtons(
                                this /* 提供 handleClickOk、handleClickCancel*/
                              )}
                            </div>
                          );
                        }
                        const [isShowCancel, isShowOk] = (() => {
                          return [
                            !this.options.hideCancel || null,
                            !this.options.hideOk || null,
                          ];
                        })();

                        return (
                          <div class="flex middle end ant-modal-footer">
                            {isShowCancel && (
                              <xButton
                                configs={{ onClick: this.handleClickCancel }}
                              >
                                {this.cancelText}
                              </xButton>
                            )}
                            <xGap l="10" />
                            {isShowOk && (
                              <xButton
                                configs={{
                                  onClick: this.handleClickOk,
                                  type: "primary",
                                }}
                              >
                                {this.okText}
                              </xButton>
                            )}
                          </div>
                        );
                      },
                    },
                    render() {
                      return (
                        <div
                          class="flex vertical h100 width100"
                          data-el-id={__elId}
                        >
                          {this.renderContent}
                          {this.renderButtons}
                        </div>
                      );
                    },
                  })
                );
                app.use(appPlugins, { dependState });
                app.mount(__elId);
              } catch (e) {
                console.error(e);
              }
              options.layerIndex = layerIndex;
              options.close = () => {
                layer.close(layerIndex);
              };
              options.afterOpenDialoag && options.afterOpenDialoag(app);
            },
            cancel() {
              /*点击右上角的关闭按钮*/
              if (app) {
                app._instance?.proxy?.handleClickCancel();
              }
              return false;
            },
            end() {
              handleEcsPress.off();
              $container.remove();
              $container = null;
              if (app) {
                app.unmount();
                app = null;
              }
              options.payload = null;
              options.__dialogInstance = null;
              options = null;
              resolve(true);
            },
          },
          options
        )
      );
    });
};
