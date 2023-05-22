import { defineComponent } from "vue";
import "./xInfoDiffCard.scss";

export const xInfoDiffCard = defineComponent({
	name: "xInfoDiffCard",
	props: ["old", "new", "title"],
	render() {
		return (
			<div>
				<div>{this.title}:</div>
				<div class="flex vertical">
					<div class="xInfoDiffCard-value xInfoDiffCard-delta xInfoDiffCard-left-value">
						<pre>{this.old}</pre>
					</div>
					<div class="xInfoDiffCard-value xInfoDiffCard-right-value">
						<pre>{this.new}</pre>
					</div>
				</div>
			</div>
		);
	}
});
