//@ts-nocheck
import { defineComponent } from "vue";
import _ from "lodash";
import $ from "jquery";
import { MkitCsslist } from "./MkitCsslist";
import { State_UI } from "../ui";

export const setTheme = async (theme) => {
	theme = theme || localStorage.markdownHightlightTheme || "monokai-sublime.css";
	const cssURL = `${State_UI.assetsPath}/highlightstyles/${theme}`;
	localStorage.markdownHightlightTheme = theme;
	const content = await _.asyncLoadText(cssURL);
	const id = `markdonw-hightlight-style`;
	const $style = $(`#${id}`);
	if ($style.length == 0) {
		$("body").append($("<style/>", { id }));
	}
	$style.html(content);
}

export const MkitTheme = defineComponent({
	setup() {
		return { setTheme }
	},
	computed: {
		cssURL() {
			return;
		}
	},
	watch: {
		theme: {
			immediate: true,
			async handler(theme) {
				this.setTheme(theme)
			}
		}
	},
	data() {
		return {
			theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
		};
	},
	render() {
		return (
			<select class="markdown-theme" v-model={this.theme}>
				{_.map(MkitCsslist, i => {
					return (
						<option key={i.value} value={i.value}>
							{i.label}
						</option>
					);
				})}
			</select>
		);
	}
});
