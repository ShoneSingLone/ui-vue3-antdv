<template>
	<div class="markdown-wrapper description">
		<select class="markdown-theme" v-model="theme">
			<option v-for="item in cssOptions" :key="item.value" :value="item.value">
				{{ item.label }}
			</option>
		</select>
		<div class="markdown-wrapper description" v-html="html"></div>
	</div>
</template>
<script>
import { _, $ } from "@ventose/ui";
import { marked } from "../assets/libs/marked";
import { hljs } from "../assets/libs/highlight";

const modules = import.meta.glob("../assets/highlightstyles/*.css");
// const modules = import.meta.globEager("../assets/highlightstyles/*.css");

const cssOptions = _.map(modules, (asyncFn, name) => {
	const arr = name.split("/");
	const label = _.last(arr);
	return {
		content: asyncFn,
		value: label,
		label
	};
});
debugger;
export default {
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
			handler(theme) {
				localStorage.markdownHightlightTheme = this.theme;
				const content = _.find(cssOptions, { value: theme })?.content || "";
				const id = `markdonw-hightlight-style`;
				const $style = $(`#${id}`);
				if ($style.length != 1) {
					$("body").append($("<style/>", { id }));
				}
				// $style.html(content);
			}
		}
	},
	async mounted() {
		this.originHTML = this.$slots.default()[0].children;
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

<style scoped>
.markdown-theme {
	position: absolute;
	right: 24px;
	top: 16px;
}
</style>
