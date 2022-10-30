<script lang="jsx">
import { defineComponent, useAttrs, h, mergeProps, computed } from "vue";
import renders from "./itemRenders";
import { MutatingProps } from "../common";
import { checkXItem, EVENT_TYPE, TIPS_TYPE } from "../tools/validate";
import { _ } from "../loadCommonUtil";
import $ from "jquery";

const domClass = {
  tipsError: "ant-form-item-explain ant-form-item-explain-error",
};

/* itemWrapperClass */

export default defineComponent({
  name: "XItem",
  props: {
    /* 绑定的值 */
    modelValue: {
      type: [Object, String, Number, Boolean],
    },
    configs: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    let Cpt_isShowXItem = true;
    let Cpt_isDisabled = false;
    /*isShow*/
    if (_.isFunction(props.configs.isShow)) {
      Cpt_isShowXItem = computed(props.configs.isShow);
    } else if (_.isBoolean(props.configs.isShow)) {
      Cpt_isShowXItem = props.configs.isShow;
    }

    /*disabled*/
    if (_.isFunction(props.configs.disabled)) {
      Cpt_isDisabled = computed(props.configs.disabled);
    } else if (_.isBoolean(props.configs.disabled)) {
      Cpt_isDisabled = props.configs.disabled;
    }
    /*readonly*/

    return {
      Cpt_isShowXItem,
      Cpt_isDisabled,
    };
  },
  data() {
    const vm = this;
    const configs = vm.configs;

    const handleConfigsValidate = (eventType) => {
      configs.validate && configs.validate(eventType);
    };

    /* 需要一个事件分发，拦截所有事件，再根据配置信息   */
    const listeners = {
      "onUpdate:value": (val, ...args) => {
        configs.value = val;
        this.$emit("update:modelValue", val);
        if (_.isFunction(listeners.onAfterValueChange)) {
          listeners.onAfterValueChange.call(configs, val);
        }
        /* TODO: rule检测*/
        handleConfigsValidate(EVENT_TYPE.update);
      },
      onChange: () => {
        handleConfigsValidate(EVENT_TYPE.change);
      },
      onInput: () => {
        handleConfigsValidate(EVENT_TYPE.input);
      },
      onBlur: () => {
        handleConfigsValidate(EVENT_TYPE.blur);
      },
      onFocus: () => {
        handleConfigsValidate(EVENT_TYPE.focus);
      },
    };

    function initListenerHandler(prop, value) {
      listeners[prop] = function (...args) {
        /* console.log("🚀", prop, listeners[prop].queue, args); */
        _.each(listeners[prop].queue, (listener) => {
          listener?.apply(vm.configs, args);
        });
      };
      listeners[prop].queue = [value];
    }

    /* 后面的属性覆盖前面的属性 */
    function addListenerFromConfigs(currentConfigs) {
      const propsWillDeleteFromConfigs = [];
      _.each(currentConfigs, (value, prop) => {
        /* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
        if (_.isListener(prop)) {
          propsWillDeleteFromConfigs.push(prop);
          if (listeners[prop]) {
            listeners[prop].queue.push(value);
            return;
          } else {
            initListenerHandler(prop, value);
            return;
          }
        }
      });

      _.each(propsWillDeleteFromConfigs, (prop) => {
        delete currentConfigs[prop];
      });
      return listeners;
    }
    _.each(listeners, (value, prop) => initListenerHandler(prop, value));
    addListenerFromConfigs(vm.configs);
    return {
      listeners,
      /* validateInfo */
      isRequired: false,
      /* validateInfo */
    };
  },

  computed: {
    isChecking() {
      return Boolean(this.configs.checking);
    },
    /* 组件唯一标识 */
    FormItemId() {
      return `xItem_${this._.uid}`;
    },
    /* 提示信息的类型及提示信息 */
    itemTips() {
      const _itemTips = { type: "", msg: "" };
      if (this.configs?.itemTips?.type) {
        return {
          type: this.configs.itemTips.type,
          msg: _.isFunction(this.configs.itemTips.msg)
            ? this.configs.itemTips.msg()
            : this.configs.itemTips.msg,
        };
      } else {
        this.configs.itemTips = _itemTips;
        return _itemTips;
      }
    },
    itemWrapperClass() {
      return [
        this.configs.itemWrapperClass,
        /*flex 一般与从简在同一行*/
        "ant-form-item ant-form-item-with-help x-item flex",
        this.itemTips.type === TIPS_TYPE.error ? "ant-form-item-has-error" : "",
      ].join(" ");
    },

    componentSettings() {
      const vm = this;
      const configs = vm.configs;
      configs.value =
        configs.value !== undefined ? configs.value : vm.modelValue;
      const property = {};
      let slots = {};

      const pickAttrs = (properties) => {
        _.each(properties, (value, prop) => {
          if ("slots" === prop) {
            slots = value;
            return;
          }

          if (["placeholder"].includes(prop) && _.isFunction(value)) {
            property[prop] = value(vm);
            return;
          }

          /* 用于xForm 控件，以下配置信息跟UI库控件相关，用不上，遂删除 */
          if (["itemTips", "rules"].includes(prop)) {
            return;
          }

          property[prop] = value;
          return;
        });
      };

      pickAttrs(this.configs);
      pickAttrs(this.$attrs);

      if (this.Cpt_isDisabled) {
        property.disabled = true;
      } else {
        delete property.disabled;
      }
      return { property, slots, listeners: this.listeners };
    },
    /* VNode */
    tipsVNode() {
      if (this.isChecking) {
        return (
          <div>
            <div data-type="checking">checking...</div>
          </div>
        );
      }

      if (this.configs.tipsVNodeRender) {
        return this.configs.tipsVNodeRender({
          xItem: this,
          configs: this.configs,
          itemTips: this.itemTips,
        });
      }

      if (this.itemTips.msg) {
        if (this.itemTips.type === TIPS_TYPE.error) {
          return (
            <div class={domClass.tipsError}>
              <div data-type="error">{this.itemTips.msg}</div>
            </div>
          );
        }
      }
      return null;
    },
    /* 表单label 如果有提供String类型，就显示 */
    labelVNode() {
      const classString = this.isRequired ? "ant-form-item-required" : "";

      if (this.configs.labelVNodeRender) {
        return this.configs.labelVNodeRender(this.configs, classString);
      }

      let label = (() => {
        const _label = this.configs.label;
        if (_label) {
          if (_.isFunction(_label)) {
            return _label();
          }

          if (_.isString(_label) || _label.__v_isVNode) {
            return _label;
          }
        }
        return false;
      })();

      if (label === false) {
        return null;
      }
      return (
        <div class="ant-form-item-label">
          <label for={this.configs.prop} class={classString}>
            {label}
          </label>
        </div>
      );
    },
    /* VNode */
  },
  watch: {
    /* 修改rules Array 要求全量替换 */
    "configs.rules": {
      immediate: true,
      deep: true,
      handler(rules) {
        this.setValidateInfo(rules);
      },
    },
  },
  mounted() {
    if (this.configs.once) {
      this.configs.once();
    }
  },
  created() {
    /* domID */
    MutatingProps(this, "configs.FormItemId", this.FormItemId);

    /* $(`[formitemid="${this.FormItemId}"]`).on("blur", (e) => {
      this.componentSettings.listener();
    }); */
  },
  /* beforeUnmount() {
    $(`[formitemid="${this.FormItemId}"]`).off("blur");
  }, */
  methods: {
    setTips(type = "", msg = "") {
      MutatingProps(this, "configs.itemTips", { type, msg });
    },
    /* 如果有可用rules，为当前item配置校验函数 */
    setValidateInfo(rules) {
      /* 修改rules Array 要求全量替换 */
      let isRequired = false;
      if (_.isArrayFill(rules)) {
        /* 如果有必填项 */
        isRequired = _.some(rules, { name: "required" });
        /* 检测完成之后的回调 */
        const handleAfterCheck = ([prop, msg]) => {
          MutatingProps(this, "configs.checking", false);
          if (prop) {
            if (msg) {
              this.setTips(TIPS_TYPE.error, msg);
              /*校验未通过，如果有其他操作，可以提供一个onValidateFail的回调函数*/
              if (_.isFunction(this.configs.onValidateFail)) {
                this.configs.onValidateFail(this.configs);
              }
            } else {
              this.setTips();
            }
          }
        };
        const debounceCheckXItem = _.debounce(checkXItem, 300);
        /* 如果有检验规则，添加可执行校验方法 */
        MutatingProps(this, "configs.validate", (eventType) => {
          /* 短时间内，多个事件触发统一校验，使用队列，任一一个触发 */
          const prop = `configs.validate.triggerEventsObj.${eventType}`;
          MutatingProps(this, prop, true);
          /*  */
          debounceCheckXItem(this.configs, handleAfterCheck /* 异步回调 */);
        });
        /* init */
        MutatingProps(this, "configs.validate.triggerEventsObj", {});
      } else {
        if (_.isFunction(this.configs.validate)) {
          delete this.configs.validate;
        }
      }
      this.isRequired = isRequired;
    },
  },
  render(h) {
    if (!this.Cpt_isShowXItem) {
      return null;
    }
    const CurrentXItem = (() => {
      if (_.isFunction(this.configs.itemType)) {
        return this.configs.itemType;
      }
      return renders[this.configs.itemType] || renders.Input;
    })();

    return (
      <div id={this.FormItemId} class={this.itemWrapperClass}>
        {/* label */}
        {this.labelVNode}
        {/* 控件 */}
        <div class="ant-form-item-control">
          <CurrentXItem {...this.componentSettings} />
          {/* 提示信息 */}
          {this.tipsVNode}
        </div>
      </div>
    );
  },
});
</script>
