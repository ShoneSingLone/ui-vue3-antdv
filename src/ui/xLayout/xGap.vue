<script lang="jsx">
import { defineComponent, useAttrs, h, mergeProps, computed } from "vue";
import { xU } from "../ventoseUtils";

export default defineComponent({
	name: "xGap",
	/* a:all,top left right bottom;class flex1,2,3,4 */
	props: ["t", "l", "r", "b", "a", "f"],
	computed: {
		gapClass: {
			get() {
				let basic = "x-gap";
				if (this.f) {
					basic += ` flex${this.f}`;
				}
				return basic;
			}
		},
		gapStyle: {
			get() {
				const POSITION_MAP = {
					t: "top",
					r: "right",
					b: "bottom",
					l: "left"
				};

				const gapStyle = {};

				if (this.a) {
					gapStyle.margin = `${this.a}px`;
				} else {
					xU.map(POSITION_MAP, (prop, key) => {
						const value = this[key];
						if (value) {
							gapStyle[`margin-${prop}`] = `${value}px`;
						}
					});
				}

				return gapStyle;
			}
		}
	},
	render(h) {
		return <div style={this.gapStyle} class={this.gapClass} />;
	}
});
</script>
