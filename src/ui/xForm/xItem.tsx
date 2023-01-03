//@ts-nocheck
import { computed, defineComponent } from "vue";
import renders from "./itemRenders";
import { checkXItem, EVENT_TYPE, TIPS_TYPE } from "../tools/validate";
import { xU } from "../ventoseUtils";

const { MutatingProps } = xU;

const domClass = {
	tipsError: "ant-form-item-explain ant-form-item-explain-error"
};

/* itemWrapperClass */

export const xItem = defineComponent({
	name: "XItem",
	props: {
		/* 绑定的值 */
		modelValue: {
			type: [Object, String, Number, Boolean],
			default: undefined
		},
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	emits: ["update:modelValue"],
	setup(props, { attrs, slots, emit, expose }) {
		let Cpt_isShowXItem: any = true;
		let Cpt_isDisabled: any = false;
		/*isShow*/
		if (xU.isFunction(props.configs.isShow)) {
			Cpt_isShowXItem = computed(props.configs.isShow);
		} else if (xU.isBoolean(props.configs.isShow)) {
			Cpt_isShowXItem = computed(() => props.configs.isShow);
		} else {
			props.configs.isShow = true;
			Cpt_isShowXItem = computed(() => props.configs.isShow);
		}

		/*disabled*/
		if (xU.isFunction(props.configs.disabled)) {
			Cpt_isDisabled = computed(props.configs.disabled);
		} else if (xU.isBoolean(props.configs.disabled)) {
			Cpt_isDisabled = computed(() => props.configs.disabled);
		}
		/*readonly 在configs中，各个render自行实现*/

		const { listeners, propsWillDeleteFromConfigs } = (() => {
			const { configs } = props;
			/* 后面的属性覆盖前面的属性 */
			/* propsWillDeleteFromConfigsSet jsx 避免 listener 与 properties 实践名称重复 */
			const propsSet = new Set();

			const triggerValidate = eventType => {
				/*validate的定义 搜索 MutatingProps_configs_validate */
				configs.validate && configs.validate(eventType);
			};

			/* 需要一个事件分发，拦截所有事件，再根据配置信息   */
			const listeners = {
				/* 主要的触发方式 */
				"onUpdate:value": (val, ...args) => {
					/* 使用configs.value的形式，一般是configs与组件是一对一的关系,configs需要是reactive的  */
					if (configs.value !== undefined) {
						if (configs.modelValue === val) {
							return;
						} else {
							configs.value = val;
						}
					}
					configs.modelValue = val;
					/* 双向绑定 */
					emit("update:modelValue", val);
					/* @ts-ignore */
					if (xU.isFunction(configs.onAfterValueEmit)) {
						/* @ts-ignore */
						configs.onAfterValueEmit(val);
					}
					/* TODO: rule检测*/
					triggerValidate(EVENT_TYPE.update);
				},
				onChange: () => {
					triggerValidate(EVENT_TYPE.change);
				},
				onInput: () => {
					triggerValidate(EVENT_TYPE.input);
				},
				onBlur: () => {
					triggerValidate(EVENT_TYPE.blur);
				},
				onFocus: () => {
					triggerValidate(EVENT_TYPE.focus);
				}
			};

			function makeEventHandlerSupportMultiple(prop, xItemInnerEventHandler) {
				propsSet.add(prop);
				if (
					typeof listeners[prop] === "object" &&
					xU.isArray(listeners[prop].handlerArray)
				) {
					listeners[prop].handlerArray.push(xItemInnerEventHandler);
				} else {
					listeners[prop] = (...args) => {
						xU.each(listeners[prop].handlerArray, listener => {
							listener?.apply(configs, args);
						});
					};
					listeners[prop].handlerArray = [xItemInnerEventHandler];
				}
			}

			/* listenners默认都是EventHandler */
			xU.each(listeners, (value, prop) =>
				makeEventHandlerSupportMultiple(prop, value)
			);
			xU.each(configs, (value, prop) => {
				/* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
				if (xU.isListener(prop)) {
					makeEventHandlerSupportMultiple(prop, value);
				}
			});
			xU.each(attrs, (value, prop) => {
				/* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
				if (xU.isListener(prop)) {
					makeEventHandlerSupportMultiple(prop, value);
				}
			});
			return { listeners, propsWillDeleteFromConfigs: [...propsSet] };
		})();

		return {
			Cpt_isShowXItem,
			Cpt_isDisabled,
			listeners,
			propsWillDeleteFromConfigs
		};
	},
	data() {
		return {
			/* validateInfo */
			isRequired: false,
			/* validateInfo */
			properties: {},
			itemSlots: {}
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
					msg: xU.isFunction(this.configs.itemTips.msg)
						? this.configs.itemTips.msg()
						: this.configs.itemTips.msg
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
				this.itemTips.type === TIPS_TYPE.error ? "ant-form-item-has-error" : ""
			].join(" ");
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
					itemTips: this.itemTips
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
					if (xU.isFunction(_label)) {
						return _label();
					}

					if (xU.isString(_label) || _label.__v_isVNode) {
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
		}
		/* VNode */
	},
	watch: {
		configs: {
			handler(configs, oldConfigs) {
				this.setProperties();
			}
		},
		$attrs: {
			handler() {
				this.setProperties();
			}
		},
		Cpt_isDisabled: {
			immediate: true,
			handler() {
				/* disabled */
				if (this.Cpt_isDisabled) {
					this.properties.disabled = true;
				} else {
					delete this.properties.disabled;
				}
			}
		},
		"configs.value": {
			handler() {
				this.updateValue();
			}
		},
		modelValue: {
			handler() {
				this.updateValue();
			}
		},
		/* 修改rules Array 要求全量替换 */
		"configs.rules": {
			immediate: true,
			handler(rules) {
				if (rules) {
					this.setValidateInfo(rules);
				}
			}
		},
		"configs.slots": {
			immediate: true,
			handler(slots) {
				if (slots) {
					this.setItemSlots();
				}
			}
		}
	},
	created() {
		const vm = this;
		vm.configs.FormItemId = vm.FormItemId;
		/*似乎Vue3 用的是类方法不是实例方法，类方法用 debounce 只会执行最后一个*/
		(() => {
			vm.updateValue = xU.debounce(function () {
				/* modelValue configs.value configs.defaultValue */
				const value = (() => {
					if (vm.modelValue !== undefined) {
						return vm.modelValue;
					}
					if (vm.configs.value == undefined) {
						if (vm.configs.defaultValue !== undefined) {
							return vm.configs.defaultValue;
						} else {
							xU("either configs.value or modelValue");
						}
					}
					return vm.configs.value;
				})();

				if (vm.properties.value !== value) {
					vm.properties.value = value;
					vm.listeners["onUpdate:value"](value);
				}
			}, 32);
			vm.updateValue();
		})();

		(() => {
			vm.setProperties = xU.debounce(function () {
				console.log("setProperties");
				const __properties = {};
				const pickProps = originConfigs => {
					xU.each(originConfigs, (item, prop) => {
						if (["placeholder"].includes(prop) && xU.isFunction(item)) {
							__properties[prop] = item(this);
							return;
						}
						/* 用于xForm 控件，以下配置信息跟UI库控件相关，用不上，遂删除 */
						if (
							["itemTips", "rules", "labelVNodeRender", "slots"].includes(prop)
						) {
							return;
						}
						__properties[prop] = item;
					});
				};
				xU.each([this.configs, this.$attrs], pickProps);
				this.properties = __properties;
				this.updateValue();
			}, 32);
			vm.setProperties();
		})();
	},
	mounted() {
		if (this.configs?.once) {
			this.configs.once.call(this.configs, this);
		}
	},
	methods: {
		setTips(type = "", msg = "") {
			MutatingProps(this, "configs.itemTips", { type, msg });
		},
		setItemSlots() {
			this.itemSlots = this.configs.slots || {};
		},
		/* 如果有可用rules，为当前item配置校验函数 */
		setValidateInfo(rules) {
			/* 修改rules Array 要求全量替换 */
			let isRequired = false;
			if (xU.isArrayFill(rules)) {
				/* 如果有必填项 */
				isRequired = xU.some(rules, { name: "required" });
				/* 检测完成之后的回调 */
				const fnCheckedCallback = ([prop, msg]) => {
					MutatingProps(this, "configs.checking", false);
					if (prop) {
						if (msg) {
							this.setTips(TIPS_TYPE.error, msg);
							/*校验未通过，如果有其他操作，可以提供一个onValidateFail的回调函数*/
							if (xU.isFunction(this.configs.onValidateFail)) {
								this.configs.onValidateFail(this.configs);
							}
						} else {
							this.setTips();
						}
					}
				};
				const debounceCheckXItem = xU.debounce(checkXItem, 300);

				const fnConfigsValidate = (eventType, value) => {
					/* 短时间内，多个事件触发同一校验，使用队列，只执行一次 */
					const prop = `configs.validate.triggerEventsObj.${eventType}`;
					MutatingProps(this, prop, true);
					/*  */
					debounceCheckXItem({
						FormItemId: this.FormItemId,
						xItemConfigs: this.configs,
						fnCheckedCallback,
						/* 异步回调 */
						value
					});
				};

				/* 如果有检验规则，添加可执行校验方法  MutatingProps_configs_validate */
				MutatingProps(this, "configs.validate", fnConfigsValidate);
				/* init */
				MutatingProps(this, "configs.validate.triggerEventsObj", {});
			} else {
				if (xU.isFunction(this.configs.validate)) {
					delete this.configs.validate;
				}
			}
			this.isRequired = isRequired;
		}
	},
	render() {
		if (!this.Cpt_isShowXItem || !this.properties) {
			return null;
		}
		const CurrentXItem = (() => {
			if (xU.isObject(this.configs.itemType)) {
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
					<CurrentXItem
						propsWillDeleteFromConfigs={this.propsWillDeleteFromConfigs}
						properties={this.properties}
						listeners={this.listeners}
						slots={this.itemSlots}
					/>
					{/* 提示信息 */}
					{this.tipsVNode}
				</div>
				{this.$slots.afterControll && this.$slots.afterControll()}
			</div>
		);
	}
});
