<script lang="jsx">
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";

export default defineComponent({
	name: "XButtonCountDown",
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		const vm = this;
		return {
			state: { captchaCount: 0 },
			btnConfigs: {
				disabled: false,
				size: "large",
				style: { minWidth: "112px" },
				class: "center",
				text: vm.configs.text.normal,
				async onClick() {
					if (xU.isFunction(vm.configs.onClick)) {
						await vm.configs.onClick({ countDown: vm.countDown });
					}
				}
			}
		};
	},
	watch: {
		"state.captchaCount"(captchaCount) {
			this.handleCaptchaCountChange(captchaCount);
		}
	},
	methods: {
		/* 只是修改倒计时计数 */
		countDown() {
			this.state.captchaCount++;
			/*未达到限制时间则继续增加，间隔一秒*/
			if (this.state.captchaCount <= this.configs.countMax) {
				setTimeout(this.countDown, 1000);
			} else {
				this.state.captchaCount = 0;
			}
		},
		handleCaptchaCountChange(captchaCount) {
			if (captchaCount === 0) {
				/*按钮显示*/
				this.btnConfigs.text = this.configs.text.normal;
				/*按钮可点击状态*/
				this.btnConfigs.disabled = false;
				return;
			}

			const setCounDownText = () => {
				return (this.btnConfigs.text = `${
					this.configs.countMax - captchaCount
				} s`);
			};

			if (captchaCount === 1) {
				setCounDownText();
				this.btnConfigs.disabled = true;
				return;
			}

			if (captchaCount && captchaCount <= this.configs.countMax) {
				setCounDownText();
				return;
			}
		}
	}
});
</script>

<template>
	<xButton :configs="btnConfigs" />
</template>
