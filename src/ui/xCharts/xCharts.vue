<script lang="tsx">
import { line } from "./configs/line";
import { xU } from "../ventoseUtils";
import { defineComponent } from "vue";

const CONFIGS_MAP = { line };

export default defineComponent({
	name: "xCharts",
	props: {
		/*任一附带信息*/
		payload: {
			required: false,
			type: [Object, String],
			default: ""
		},
		/**
		 * 一个js文件名，里面有显示echart需要的配置信息和接口数据的处理方法
		 * 或者一个对象CONFIGS_MAP
		 */
		configs: {
			type: [String, Object],
			required: true
		},
		dataset: {
			type: [Array, Object],
			/* 接口返回的数据，通过对应的handler来处理数据 */
			default() {
				return [];
			}
		}
	},
	data() {
		this.updateOptions = xU.debounce(async function () {
			if (this.myChart) {
				this.myChart.dispose();
			}
			await xU.ensureValueDone(() => this.$el);
			const options = this.helper.initOptions(this.$props);
			this.options = this.helper.updateOptions(options, this.dataset);
			this.myChart = this.$echarts.init(this.$el);
			if (this?.helper?.afterInit) {
				this?.helper?.afterInit({ instance: this.myChart });
			}
			this.myChart.showLoading();
			this.myChart.setOption(this.options);
			this.myChart.hideLoading();
		}, 300);
		return { myChart: false };
	},
	computed: {
		helper() {
			if (xU.isPlainObject(this.configs)) {
				return this.configs;
			}
			return CONFIGS_MAP[this.configs];
		}
	},
	watch: {
		dataset() {
			this.updateOptions();
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			this.observe();
			this.updateOptions();
		},
		observe() {
			//如果有变化了 那么就调用echart的resize方法改变大小
			this.resizeObserver = new ResizeObserver(() => {
				if (this.myChart) {
					this.updateOptions();
					if (this?.helper?.onResize) {
						this.helper.onResize({
							instance: this.myChart,
							chartVM: this
						});
					}
				}
			});
			this.resizeObserver.observe(this.$el);
		}
	}
});
</script>

<template>
	<div :id="id" class="x-charts flex flex1 center middle" />
</template>
