//@ts-nocheck
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import { State_UI } from "../State_UI";

export const xLogObject = defineComponent({
	name: "xLogObject",
	/* a:all,top left right bottom;class flex1,2,3,4 */
	props: ["obj"],
	computed: {
		objString: {
			get() {
				if (xU.isObject(this.obj)) {
					return JSON.stringify(this.obj, null, 2);
				} else {
					return "";
				}
			}
		}
	},
	render() {
		/* 只在开发模式有需要的情况下使用 */
		if (!State_UI.isDev || this.$attrs.hide) {
			return null;
		} else {
			return (
				<pre style="width:500px;height:400px;">
					<code> {this.objString} </code>
				</pre>
			);
		}
	}
});
