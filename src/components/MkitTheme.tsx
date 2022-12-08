import { defineComponent } from "vue";
import _ from "lodash";
import $ from "jquery";
import { MkitCsslist } from "./MkitCsslist";
import { State_UI } from "../ui";

export const MkitTheme = defineComponent({
	computed: {
		cssURL() {
			return `${State_UI.assetsPath}/highlightstyles/${this.theme}`;
		}
	},
	watch: {
		theme: {
			immediate: true,
			async handler(theme) {
				localStorage.markdownHightlightTheme = this.theme;
				const content = await _.asyncLoadText(this.cssURL);
				const id = `markdonw-hightlight-style`;
				const $style = $(`#${id}`);
				if ($style.length == 0) {
					$("body").append($("<style/>", { id }));
				}
				$style.html(content);
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
