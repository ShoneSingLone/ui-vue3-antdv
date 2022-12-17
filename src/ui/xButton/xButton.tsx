//@ts-nocheck

import { defineComponent, useAttrs, h, mergeProps, computed } from "vue";
import { xU } from "../ventoseUtils";
import { State_UI } from "../State_UI";

/*$t 可能会变，所以每次render用新的数据*/
const BTN_PRESET_MAP = {
	query: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSearchOutlined" />,
		text: State_UI.$t("查询").label
	}),
	refresh: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSyncOutlined" />,
		text: State_UI.$t("刷新").label
	}),
	cancel: () => ({
		text: State_UI.$t("取消").label
	}),
	save: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSaveOutlined" />,
		text: State_UI.$t("保存").label
	}),
	upload: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideUploadOutlined" />,
		text: State_UI.$t("上传").label
	}),
	delete: configs => {
		configs.type = "danger";
		configs.ghost = true;
		return {
			icon: <xIcon class="x-button_icon-wrapper" icon="InsideDeleteOutlined" />,
			text: State_UI.$t("删除").label
		};
	}
};

export type t_buttonOptions = {
	text?: string;
	onClick?: () => Promise<any>;
};

export default defineComponent({
	name: "xButton",
	props: {
		payload: {
			type: Object,
			default() {
				return {};
			}
		},
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	beforeMount() {
		if (!this.configs) {
			debugger;
			return;
		}
		/* 预置 */
		const presetFn = BTN_PRESET_MAP[this.configs.preset];
		if (presetFn) {
			const preset = presetFn(this.configs);
			this.configs.text = (
				<>
					{preset.icon}
					<span class="ml4">{preset.text}</span>
				</>
			);
		}
	},
	data() {
		return {
			loading: true
		};
	},
	computed: {
		type() {
			if (["query", "save"].includes(this.configs.preset)) {
				return "primary";
			}
			return this.configs.type;
		},
		title() {
			if (xU.isString(this.disabled) && this.disabled.length > 0) {
				return this.disabled;
			}
			if (xU.isString(this.configs.title) && this.configs.title.length > 0) {
				return this.configs.title;
			}
			return false;
		},
		disabled() {
			if (xU.isBoolean(this.configs.disabled)) {
				return this.configs.disabled;
			}
			if (xU.isFunction(this.configs.disabled)) {
				return this.configs.disabled(this);
			}
			return false;
		},
		text() {
			/* text作为render */
			if (xU.isFunction(this.configs.text)) {
				return this.configs.text(this) || "";
			}
			/* text 作为 string */
			return this.configs.text || "";
		}
	},
	watch: {
		configs: {
			immediate: true,
			handler(configs) {
				this.loading = !!configs.loading;
			}
		}
	},
	created() {},
	methods: {
		async onClick() {
			if (xU.isFunction(this.$attrs?.onClick)) {
				return false;
			}
			if (xU.isFunction(this?.configs?.onClick)) {
				this.loading = true;
				try {
					await this?.configs?.onClick.call(this.configs, this);
				} catch (e) {
					console.error(e);
				} finally {
					this.loading = false;
				}
			}
		}
	},
	render(h) {
		const configs = xU.omit(this.configs, ["text", "onClick", "disabled"]);
		if (this.title) {
			configs.title = this.title;
		}
		return (
			<aButton
				class="x-button antdv-button"
				onClick={this.onClick}
				loading={this.loading}
				disabled={!!this.disabled}
				type={this.type}
				{...configs}>
				{{
					default: () => {
						const vDomDefautl = this.$slots.default && this.$slots.default();
						return (
							<>
								{this.text}
								{vDomDefautl}
							</>
						);
					}
				}}
			</aButton>
		);
	}
});
