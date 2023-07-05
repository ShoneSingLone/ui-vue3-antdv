//@ts-nocheck
import { computed, defineComponent, isProxy, toRaw } from "vue";
import renders from "./itemRenders";
import { checkXItem, EVENT_TYPE, TIPS_TYPE } from "../tools/validate";
import { xU } from "../ventoseUtils";
import { diff } from "jsondiffpatch";
import { State_UI } from "../State_UI";

const { MutatingProps } = xU;
const domClass = {
	tipsError: "x-form-item-explain x-form-item-explain-error"
};

const devHelper = {};

const WILL_DELETE = [
	"onValidateForm",
	"_$updateUI",
	"once",
	"itemTips",
	"rules",
	"labelVNodeRender",
	"slots",
	"validate",
	/* value 用updateValue处理，该值会触发render */
	"value"
];

const DID_NOT_SET_MODEL_VALUE_BY_V_MODEL = "DID_NOT_SET_MODEL_VALUE_BY_V_MODEL";

/* itemWrapperClass */
export const xItem = defineComponent({
	name: "XItem",
	props: {
		/* 绑定的值 */
		modelValue: {
			type: [Object, String, Number, Boolean],
			default() {
				return DID_NOT_SET_MODEL_VALUE_BY_V_MODEL;
			}
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
			Cpt_isShowXItem = computed(() => !!props.configs.isShow);
		} else {
			/* isShow 可能不存在 */
			Cpt_isShowXItem = computed(() => {
				if (xU.isUndefined(props.configs.isShow)) {
					props.configs.isShow = true;
				}
				return !!props.configs.isShow;
			});
		}

		/*disabled*/
		if (xU.isFunction(props.configs.disabled)) {
			Cpt_isDisabled = computed(props.configs.disabled);
		} else if (xU.isBoolean(props.configs.disabled)) {
			Cpt_isDisabled = computed(() => !!props.configs.disabled);
		}
		/*readonly 在configs中，各个render自行实现*/

		return {
			Cpt_isShowXItem,
			Cpt_isDisabled
		};
	},
	data(vm) {
		const { $props, $attrs } = vm;

		const triggerValidate = xU.debounce(function (eventType: string) {
			const { configs } = vm.$props;
			/*validate的定义 搜索 MutatingProps_configs_validate */
			if (configs.validate) {
				configs.validate({ eventType: eventType, value: vm.properties.value });
			}
		}, 500);

		const { listeners, propsWillDeleteFromConfigs } = (() => {
			const { configs } = $props;
			/* 后面的属性覆盖前面的属性 */
			/* propsWillDeleteFromConfigsSet jsx 避免 listener 与 properties 实践名称重复 */
			const propsSet = new Set();

			/* 需要一个事件分发，拦截所有事件，再根据配置信息   */
			const listeners = {
				/* 主要的触发方式 */
				"onUpdate:value": (val: any) => {
					/* 使用configs.value的形式，一般是configs与组件是一对一的关系,configs需要是reactive的  */
					if (xU.isObjSetAttr(configs)) {
						if (configs.value === val) {
							return;
						} else {
							configs.value = val;
						}
					}
					/* 双向绑定 */
					vm.$emit("update:modelValue", val);
					/* @ts-ignore */
					if (xU.isFunction(listeners.onAfterValueEmit)) {
						/* @ts-ignore */
						listeners.onAfterValueEmit(val);
					}
					/* TODO: rule检测*/
					triggerValidate(EVENT_TYPE.update);
				},
				onValidateForm: () => {
					triggerValidate(EVENT_TYPE.validateForm);
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

			function makeEventHandlerSupportMultiple(
				prop: unknown,
				xItemInnerEventHandler: unknown
			) {
				propsSet.add(prop);
				if (
					typeof listeners[prop] === "object" &&
					xU.isArray(listeners[prop].handlerArray)
				) {
					listeners[prop].handlerArray.push(xItemInnerEventHandler);
				} else {
					listeners[prop] = (...args: any) => {
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
			xU.each($attrs, (value, prop) => {
				/* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
				if (xU.isListener(prop)) {
					makeEventHandlerSupportMultiple(prop, value);
				}
			});
			return { listeners, propsWillDeleteFromConfigs: [...propsSet] };
		})();

		return {
			/* 因修改configs属性，触发的UI刷新 */
			rerenderCount: 0,
			/* validateInfo */
			isRequired: false,
			/* validateInfo */
			properties: null,
			itemSlots: {},
			listeners,
			propsWillDeleteFromConfigs
		};
	},
	computed: {
		isSetVModel() {
			return this.modelValue !== DID_NOT_SET_MODEL_VALUE_BY_V_MODEL;
		},
		CurrentXItem() {
			if (xU.isObject(this.configs.itemType)) {
				if (isProxy(this.configs.itemType)) {
					return toRaw(this.configs.itemType);
				}
				return this.configs.itemType;
			}
			/* String */
			return renders[this.configs.itemType] || renders.Input;
		},
		itemTypeName() {
			if (xU.isString(this.configs.itemType)) {
				return String(this.configs.itemType);
			}
			return "";
		},
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
				"x-item-wrapper flex middle",
				this.itemTips.type === TIPS_TYPE.error ? "x-form-item-has-error" : ""
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
			const classString = this.isRequired ? "x-form-item-required" : "";

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
				<div class="x-form-item-label">
					<label for={this.configs.prop} class={classString}>
						{label}
					</label>
				</div>
			);
		}
		/* VNode */
	},
	watch: {
		$attrs: {
			handler() {
				this.setProperties();
			}
		},
		"properties.value": {
			handler(value) {
				xU(value);
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
		rerenderCount: {
			handler() {
				this.setProperties();
			}
		},
		configs: {
			handler() {
				this.setProperties();
			}
		},
		"configs.options": {
			handler(value) {
				this.setProperties();
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

		/*[似乎] Vue3 用的是类方法不是实例方法， (用 debounce,未跟实例绑定，不同实例调用同一个方法只会执行最后一个)*/

		(() => {
			vm.forceUpdateUI = xU.debounce(() => vm.rerenderCount++, 64);
		})();

		(() => {
			vm.configs._$updateUI = newConfigs => {
				xU.each(newConfigs, (value, prop) => {
					vm.configs[prop] = value;
				});
				vm.forceUpdateUI();
			};
		})();

		(() => {
			vm.updateValue = xU.debounce(vm.updateValueSync, 94);
			// vm.updateValue = vm.updateValueSync;
			vm.updateValue();
		})();

		(() => {
			vm.setProperties = xU.debounce(function setProperties(this: any) {
				/* @ts-ignore */
				xU(vm._.uid);
				const __properties = {};
				const pickProps = (originConfigs: any) => {
					xU.each(originConfigs, (item, prop) => {
						/* 用于xForm 控件，以下配置信息跟UI库控件相关，用不上，遂删除 */
						if (WILL_DELETE.includes(prop)) {
							return;
						}
						if (["placeholder"].includes(prop) && xU.isFunction(item)) {
							__properties[prop] = item(this);
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
		devHelper[this._.uid] = 0;
		if (this.configs?.once) {
			this.configs.once.call(this.configs, this);
		}
		State_UI.xItemCollection[this.FormItemId] = this;
	},
	beforeUnmount() {
		delete devHelper[this._.uid];
		delete State_UI.xItemCollection[this.FormItemId];
	},
	methods: {
		async updateValueSync() {
			await xU.ensureValueDone(() => this.properties);
			const vm = this;
			/* modelValue configs.value configs.defaultValue */
			const value = (() => {
				/* v-model的优先级更高，如果有，就优先选modelValue */
				if (vm.isSetVModel) {
					return vm.modelValue;
				} else if (xU.isObjSetAttr(vm.configs)) {
					/* configs.value */
					return vm.configs.value;
				} else if (xU.isObjSetAttr(vm.configs, "defaultValue")) {
					/* 如果设置了就以默认值 */
					return vm.configs.defaultValue;
				} else {
					xU("either configs.value or modelValue");
					return "";
				}
			})();

			const diffRes = diff(vm.properties.value, value);
			if (diffRes) {
				xU("diff xItem value", diffRes);
				vm.properties.value = value;
				vm.listeners["onUpdate:value"](value);
			}
		},
		setTips(type = "", msg = "") {
			MutatingProps(this, "configs.itemTips", { type, msg });
		},
		setItemSlots() {
			this.itemSlots = this.configs.slots || {};
		},
		/* 如果有可用rules，为当前item配置校验函数 */
		setValidateInfo(rules: any) {
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

				const fnConfigsValidate = ({ eventType, value, resolve }) => {
					/* 短时间内，多个事件触发同一校验，使用队列，只执行一次 */
					const prop = `configs.validate.triggerEventsObj.${eventType}`;
					MutatingProps(this, prop, true);
					/*  */
					debounceCheckXItem({
						FormItemId: this.FormItemId,
						xItemConfigs: this.configs,
						value,
						/* 异步回调 */
						fnCheckedCallback,
						resolve
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
		if (!this.properties) {
			return null;
		}
		if (xU.isUndefined(this.Cpt_isShowXItem)) {
			debugger;
		}
		if (!this.Cpt_isShowXItem) {
			return null;
		}
		const {
			CurrentXItem,
			properties,
			Cpt_isDisabled,
			propsWillDeleteFromConfigs,
			itemTypeName,
			FormItemId
		} = this;

		xU(`xItem ${this._.uid} render ${++devHelper[this._.uid]} times`);

		return (
			<div id={FormItemId} class={this.itemWrapperClass}>
				{/* label */}
				{this.labelVNode}
				{/* 控件 */}
				<div class="x-form-item-control" data-type={itemTypeName}>
					<CurrentXItem
						id={`CurrentXItem_${FormItemId}`}
						data-current-item-label={properties.label}
						data-current-item-prop={properties.prop}
						data-current-item-type={itemTypeName}
						propsWillDeleteFromConfigs={propsWillDeleteFromConfigs}
						properties={{
							...properties,
							disabled: Cpt_isDisabled
						}}
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
