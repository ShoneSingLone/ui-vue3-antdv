<template>
	<div class="markdown-wrapper" @click.right="showHighlightSelector">
		<select class="markdown-theme" v-model="theme">
			<option v-for="item in cssOptions" :key="item.value" :value="item.value">
				{{ item.label }}
			</option>
		</select>
		<div class="markdown-wrapper_description mt10" v-html="html"></div>
	</div>
</template>
<script>
import { _, $ } from "@ventose/ui";
import { marked } from "../assets/libs/marked";
import { hljs } from "../assets/libs/highlight";
import { UI } from "../ui";

/* 异步 */
const modules = import.meta.glob("../assets/highlightstyles/*.css");
/* 同步 */
// const modules = import.meta.globEager("../assets/highlightstyles/*.css");

const cssOptions = _.map(modules, (asyncFn, name) => {
	const arr = name.split("/");
	const label = _.last(arr);
	return {
		asyncFn,
		value: label,
		label
	};
});
export default {
	props: ["md" /* md text content */],
	data() {
		return {
			cssOptions,
			theme: localStorage.markdownHightlightTheme || "monokai-sublime.css",
			originHTML: "",
			html: ""
		};
	},
	watch: {
		theme: {
			immediate: true,
			async handler(theme) {
				localStorage.markdownHightlightTheme = this.theme;
				const asyncFn = _.find(cssOptions, { value: theme })?.asyncFn;
				if (!asyncFn) return;
				const { default: content } = await asyncFn();
				const id = `markdonw-hightlight-style`;
				const $style = $(`#${id}`);
				if ($style.length != 1) {
					$("body").append($("<style/>", { id }));
				}
				$style.html(content);
			}
		}
	},
	methods: {
		showHighlightSelector(e) {
			e.stopPropagation();
			e.preventDefault();
			UI.layer.tips(tipsContent, `#${followId}`, layerTipsOptions);
		}
	},
	async mounted() {
		this.originHTML = this.md || this.$slots.default()[0].children;
		const { Renderer } = marked;
		marked.options = { langClass: "hljs" };
		const renderer = new Renderer();
		this.html = marked(this.originHTML, {
			renderer,
			highlight: code => hljs.highlightAuto(code).value
		});
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
