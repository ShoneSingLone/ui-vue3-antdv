//@ts-nocheck

import { defineComponent, useAttrs, h, mergeProps, computed } from "vue";
import { vUtils } from "../ventoseUtils";
import { State_UI } from "../State_UI";
import { Button } from "ant-design-vue";

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
	components: {
		Button
	},
	beforeMount() {
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
	data() {
		return {
			loading: true
		};
	},
	computed: {
		type() {
			if (this.configs.preset === "query") {
				return "primary";
			}
			return this.configs.type;
		},
		title() {
			if (vUtils.isString(this.disabled) && this.disabled.length > 0) {
				return this.disabled;
			}
			if (vUtils.isString(this.configs.title) && this.configs.title.length > 0) {
				return this.configs.title;
			}
			return false;
		},
		disabled() {
			if (vUtils.isBoolean(this.configs.disabled)) {
				return this.configs.disabled;
			}
			if (vUtils.isFunction(this.configs.disabled)) {
				return this.configs.disabled(this);
			}
			return false;
		},
		text() {
			/* slot优先 */
			if (vUtils.isFunction(this.$slots?.default)) {
				return this.$slots.default(this);
			}
			/* text作为render */
			if (vUtils.isFunction(this.configs.text)) {
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
			if (vUtils.isFunction(this?.configs?.onClick)) {
				this.loading = true;
				try {
					await this.configs.onClick.call(this.configs, this);
				} catch (e) {
					console.error(e);
				} finally {
					this.loading = false;
				}
			}
		}
	},
	render(h) {
		const configs = vUtils.omit(this.configs, ["text", "onClick", "disabled"]);
		if (this.title) {
			configs.title = this.title;
		}
		return (
			<Button
				class="x-button"
				onClick={this.onClick}
				loading={this.loading}
				disabled={!!this.disabled}
				type={this.type}
				{...configs}>
				{this.text}
			</Button>
		);
	}
});
