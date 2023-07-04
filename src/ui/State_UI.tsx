import { computed, reactive, watch } from "vue";
import dayjs from "dayjs";
import { lStorage } from "./tools/storage";
import { xU } from "./ventoseUtils";

/*i18n  使用 {变量名} 赋值 */
export function $t(prop: string | number, payload = {}, i18nMessage = false) {
	/* this指向 */
	const result = { label: prop, prop: prop };
	xU.templateSettings.interpolate = /{([\s\S]+?)}/g;
	if (State_UI.i18nMessage) {
		//@ts-ignore
		const temp = i18nMessage ? i18nMessage[prop] : State_UI.i18nMessage[prop];
		if (temp) {
			result.label = xU.template(temp)(payload);
			if (!result.label) {
				result.label = prop;
				console.error(`i18n:${prop} "NOT_FOUND"`);
			}
		}
	}
	return result;
}

/* 可以与外部通信，可以增改 */

let _State_UI = {
	xItemCollection: {},
	pagination: {
		page: "page",
		size: "size",
		total: "total"
	},
	language: lStorage["language"] || "zh-CN",
	onLanguageChange: false,
	LANGUAGE: {},
	i18nMessage: {},
	/* 放svg文件的文件夹路径*/
	assetsSvgPath: "",
	assetsPath: "",
	basePath: "",
	setBasePath(basePath) {
		State_UI.assetsSvgPath = basePath + "assets/svg";
		State_UI.assetsPath = basePath + "assets";
		State_UI.basePath = basePath;
	},
	setAssetsBaseById(eleId: string) {
		const img = document.getElementById(eleId);
		if (img) {
			//@ts-ignore
			const src = String(img.src || img.href);
			const index = src.match(/assets(.*)/)?.index || 0;
			State_UI.assetsSvgPath = src.substring(0, index) + "assets/svg";
			State_UI.assetsPath = src.substring(0, index) + "assets";
			State_UI.basePath = src.substring(0, index);
		}
	},
	$t,
	isDev: localStorage.___VENTOSE_UI_IS_DEV_MODE === "VENTOSE_UI_IS_DEV_MODE",
	dev(isDev: any) {
		if (isDev) {
			localStorage.___VENTOSE_UI_IS_DEV_MODE = "VENTOSE_UI_IS_DEV_MODE";
		} else {
			localStorage.removeItem("___VENTOSE_UI_IS_DEV_MODE");
		}
	}
};

type t_State_UI = typeof _State_UI;

export const State_UI: t_State_UI = reactive(_State_UI);

watch(
	() => State_UI.language,
	language => {
		lStorage["language"] = language;
		if (State_UI.onLanguageChange) {
			//@ts-ignore
			State_UI.onLanguageChange(language, State_UI);
		}
	},
	{
		immediate: true
	}
);

export const Cpt_UI_locale = computed(() => {
	const currentLanguage = xU.camelCase(State_UI.language);
	//@ts-ignore
	const locale = State_UI.LANGUAGE[currentLanguage];
	return locale;
});
