import { reactive, getCurrentInstance } from "vue";
import { xU } from "../ventoseUtils";

export const useScopeStyle = () => {
	const scopeStyle = reactive({});

	function styleObject2String(styleObject: {}) {
		return xU
			.map(
				xU.merge({ width: "120px", "text-align": "right" }, styleObject),
				(value, prop) => `${prop}: ${value}`
			)
			.join(";");
	}

	function updateStyle(
		vm: { $styleEle: JQuery<any>; ele: any },
		styleContent: string
	) {
		if (!vm.$styleEle) {
			vm.$styleEle = $(vm.ele);
		}
		vm.$styleEle.html(styleContent);
	}

	function setStyle(styleObject: any) {
		const instance = getCurrentInstance();
		xU.each(styleObject, (value, prop) => {
			//@ts-ignore
			scopeStyle[prop] = value;
		});
		const styleString = updateStyle(
			//@ts-ignore
			instance.ctx,
			styleObject2String(scopeStyle)
		);
	}

	return {
		setStyle
	};
};
