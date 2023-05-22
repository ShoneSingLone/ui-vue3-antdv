//@ts-ignore
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";

export const xGap = defineComponent({
	name: "xGap",
	/* a:all,top left right bottom;class flex1,2,3,4 */
	props: ["t", "l", "r", "b", "a", "f"],
	computed: {
		gapClass: {
			set() {},
			get() {
				let basic = "x-gap";
				if (this.f) {
					basic += ` flex${this.f}`;
				}
				return basic;
			}
		},
		gapStyle: {
			set() {},
			get() {
				const POSITION_MAP = {
					t: "top",
					r: "right",
					b: "bottom",
					l: "left"
				};

				const gapStyle = {};

				if (this.a) {
					//@ts-ignore
					gapStyle.margin = `${this.a}px`;
				} else {
					xU.map(POSITION_MAP, (prop, key) => {
						//@ts-ignore
						const value = this[key];
						if (value) {
							//@ts-ignore
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
