<template>
	<!-- 有高度属性 提供滑动条 -->
	<div ref="refWrapper" class="wrapper vir-item-component">
		<!-- 模拟所有数据的高度 -->
		<div :style="styleWrapperAll">
			<!-- item1 -->
			<div class="vir-item-wrapper item1" :style="styleWrapper1">
				<div v-for="vir in virs1" :key="vir.id" class="vir-item">
					<component :is="itemComponent" :item="vir" />
				</div>
			</div>
			<!-- item2 -->
			<div class="vir-item-wrapper item2" :style="styleWrapper2">
				<div v-for="vir in virs2" :key="vir.id" class="vir-item">
					<component :is="itemComponent" :item="vir" />
				</div>
			</div>
			<!-- item3 -->
			<div class="vir-item-wrapper item3" :style="styleWrapper3">
				<div v-for="vir in virs3" :key="vir.id" class="vir-item">
					<component :is="itemComponent" :item="vir" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { xU } from "../../ventoseUtils";
import { defineComponent } from "vue";
import $ from "jquery";

const itemHeight = 48;
const perCount = 10;
const oneBlockHeight = 580;

export default defineComponent({
	name: "XVirScroll",
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		},
		top: {
			type: Number,
			default: 0
		},
		height: {
			type: Number,
			default: 0
		},
		scrollHeight: {
			type: Number,
			default: 0
		}
	},
	emits: ["update:top", "update:height", "update:scrollHeight"],
	setup() {
		return {};
	},
	data() {
		return {
			itemComponent: this.$slots.item,
			blockCount: 0,
			isLoading: false,
			styleWrapperAll: {
				height: 0
			}
		};
	},
	computed: {
		allItems() {
			return this.configs.items || [];
		},
		positionBlock() {
			return this.blockCount % 3;
		},
		virs1() {
			const position = Number(this.styleWrapper1.match(/(\d)/g).join("")) / 580;
			const start = position * 10;
			const end = start + 10;
			return this.allItems.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		virs2() {
			const position = Number(this.styleWrapper2.match(/(\d)/g).join("")) / 580;
			const start = position * 10;
			const end = start + 10;
			return this.allItems.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		virs3() {
			const position = Number(this.styleWrapper3.match(/(\d)/g).join("")) / 580;
			const start = position * 10;
			const end = start + 10;
			return this.allItems.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		/* style */
		styleWrapper1() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${this.blockCount * 580}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${(this.blockCount + 2) * 580}px)`;
			}
			return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
		},
		styleWrapper2() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${this.blockCount * 580}px)`;
			}
			return `transform:translateY(${(this.blockCount - 1) * 580}px)`;
		},
		styleWrapper3() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${(this.blockCount + 2) * 580}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${(this.blockCount + 1) * 580}px)`;
			}
			return `transform:translateY(${this.blockCount * 580}px)`;
		}
	},
	watch: {
		top() {
			this.setTop();
		},
		"allItems.length": {
			immediate: true,
			handler() {
				this.updateTop();
				this.setHeight();
			}
		}
	},
	updated() {
		const height = this.$wrapperEle?.height();
		if (height !== this.height) {
			this.$emit("update:height", this.$wrapperEle?.height() || 0);
		}
	},
	mounted() {
		this.init();
	},
	beforeUnmount() {
		this.$wrapperEle.off("scroll");
	},
	methods: {
		setTop: xU.debounce(function () {
			if (this.$refs.refWrapper) {
				this.$refs.refWrapper.scrollTo({
					top: this.top,
					behavior: "smooth"
				});
			}
		}, 1000),
		init() {
			this.$wrapperEle = $(this.$refs.refWrapper);
			this.$wrapperEle.on("scroll", () => this.updateTop());
		},
		updateTop(event) {
			if (this.$refs.refWrapper) {
				const top = this.$refs.refWrapper.scrollTop;
				this.blockCount = Math.floor(top / oneBlockHeight);
				this.$emit("update:top", top);
			}
		},
		setHeight() {
			const height = this.allItems.length * itemHeight;
			this.styleWrapperAll.height = `${height}px`;
			this.$emit("update:scrollHeight", height);
		}
	}
});
</script>

<style lang="less">
.vir-item-component {
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	position: relative;

	.wrapper {
		height: 100%;
	}

	.vir-item-wrapper {
		position: absolute;
		width: 100%;

		.vir-item {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: 14px;
			margin: 10px 10px 0;
		}
	}
}
</style>
