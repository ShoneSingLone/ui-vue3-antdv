import { computed, reactive, watch } from "vue";
import enUs from "ant-design-vue/es/locale/en_US";
import zhCn from "ant-design-vue/es/locale/zh_CN";
import _ from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en-au";
import { lStorage } from "./tools/storage";

/* 可以与外部通信，可以增改 */

let _State_UI = {
	language: lStorage["language"] || "zh-CN",
	onLanguageChange: false,
	LANGUAGE: {
		enUs,
		zhCn
	},
	i18nMessage: {},
	/* 放svg文件的文件夹路径*/
	assetsSvgPath: "",
	assetsPath: "",
	setAssetsBaseById(eleId) {
		const img = document.getElementById(eleId);
		if (img) {
			const src = String(img.src);
			const index = src.match(/assets(.*)/)?.index || 0;
			this.assetsSvgPath = src.substring(0, index) + "assets/svg";
			this.assetsPath = src.substring(0, index) + "assets";
		}
	},
	/*i18n  使用 {变量名} 赋值 */
	$t(prop, payload = {}, i18nMessage = false) {
		/* this指向 */
		const result = { label: prop, prop: prop };
		_.templateSettings.interpolate = /{([\s\S]+?)}/g;
		if (State_UI.i18nMessage) {
			const temp = i18nMessage ? i18nMessage[prop] : State_UI.i18nMessage[prop];
			if (temp) {
				result.label = _.template(temp)(payload);
				if (!result.label) {
					result.label = prop;
					console.error(`i18n:${prop} "NOT_FOUND"`);
				}
			}
		}
		return result;
	}
};

export const State_UI = reactive(_State_UI);

watch(
	() => State_UI.language,
	language => {
		lStorage["language"] = language;
		dayjs.locale(language === "zh-CN" ? "zh-cn" : "en");
		if (State_UI.onLanguageChange) {
			State_UI.onLanguageChange(language, State_UI);
		}
	},
	{
		immediate: true
	}
);

export const Cpt_UI_locale = computed(() => {
	const currentLanguage = _.camelCase(State_UI.language);
	const locale = State_UI.LANGUAGE[currentLanguage];
	return locale;
});
