<template>
	<div
		class="markdown-wrapper"
		v-uiPopover="configsPopoverChangeTheme"
		title="右键点击可以修改<code/>元素高亮样式">
		<div class="markdown-wrapper_description mt10" v-html="html"></div>
	</div>
</template>
<script>
import { marked } from "../assets/libs/marked";
import { hljs } from "../assets/libs/highlight";
import { MkitTheme, setTheme } from "./MkitTheme";

/* 异步
// const modules = import.meta.glob("../assets/highlightstyles/*.css");
*/
/* 同步
// const modules = import.meta.globEager("../assets/highlightstyles/*.css");
*/

export default {
	props: ["md" /* md text content */],
	setup() {
		setTheme();
	},
	data() {
		return {
			originHTML: "",
			html: "",
			configsPopoverChangeTheme: {
				trigger: "rightClick",
				content: MkitTheme,
				openAtPoint: true
			}
		};
	},
	async mounted() {
		this.init();
	},
	watch: {
		md() {
			this.init();
		}
	},
	methods: {
		init() {
			this.originHTML = this.md || this.$slots.default()[0].children;
			const { Renderer } = marked;
			marked.options = { langClass: "hljs" };
			const renderer = new Renderer();
			this.html = marked(this.originHTML, {
				renderer,
				highlight: code => hljs.highlightAuto(code).value
			});
		}
	}
};
</script>

<style lang="scss">
.markdown-wrapper {
	position: relative;

	.markdown-theme {
		display: none;
		position: absolute;
		right: 100px;
		top: 0;
		z-index: 1;
	}

	&:hover {
		.markdown-theme {
			display: block;
		}
	}

	.markdown-wrapper_description {
		position: relative;

		code.hljs.language-js {
			border-radius: 6px;
		}
	}
}
</style>
