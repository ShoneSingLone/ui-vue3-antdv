// @ts-nocheck
import { defineComponent, markRaw } from "vue";
import { xU } from "../ventoseUtils";
import InsideDeleteOutlined from "../../assets/svg/DeleteOutlined.svg";
import InsideExclamationCircleOutlined from "../../assets/svg/ExclamationCircleOutlined.svg";
import InsideLoadingOutlined from "../../assets/svg/LoadingOutlined.svg";
import InsideSaveOutlined from "../../assets/svg/SaveOutlined.svg";
import InsideSearchOutlined from "../../assets/svg/SearchOutlined.svg";
import InsideSyncOutlined from "../../assets/svg/SyncOutlined.svg";
import InsideUploadOutlined from "../../assets/svg/UploadOutlined.svg";
import Insidetips from "../../assets/svg/tips.svg";
import InsideEmpty from "../../assets/svg/empty.svg";
import InsideCopy from "../../assets/svg/copy.svg";
import insideSettingOutlined from "../../assets/svg/SettingOutlined.svg";
import { iStorage } from "../tools/storage";
import "./xIcon.less";
import { State_UI } from "..";

/* const icons = import.meta.glob("../../assets/svg/*.svg"); */
const insideIcons = {
	InsideDeleteOutlined,
	InsideExclamationCircleOutlined,
	InsideLoadingOutlined,
	InsideSaveOutlined,
	InsideSearchOutlined,
	InsideSyncOutlined,
	InsideUploadOutlined,
	Insidetips,
	InsideEmpty,
	InsideCopy,
	insideSettingOutlined
};

export default defineComponent(
	markRaw({
		name: "xIcon",
		props: ["icon"],
		data() {
			const id = "lazy-svg_" + this._.uid;
			return { id, svgIcon: null };
		},
		computed: {
			baseAttrs() {
				return {
					id: this.id,
					role: "img",
					ariaLabel: this.icon,
					class: "xIcon anticon"
				};
			},
			iconKey() {
				const _iconKey = xU.camelCase(this.getIconPath()).replace(/\s/, "");
				return _iconKey;
			}
		},
		methods: {
			getIconPath() {
				if (!State_UI.assetsSvgPath) {
					debugger;
				}
				const iconPath = `${State_UI.assetsSvgPath}/${this.icon}.svg`;
				return iconPath;
			},
			async setIcon() {
				if (!this.icon) return;
				try {
					let SvgIconAny = await (async () => {
						/* 已缓存为组件 */
						let _SvgIconAny = insideIcons[this.icon];
						if (_SvgIconAny) {
							xU(this.icon);
							return _SvgIconAny;
						}
						if (!State_UI.isDev) {
							/* indexedDB 缓存成字符串 */
							_SvgIconAny = await iStorage(this.iconKey);
							if (_SvgIconAny) {
								return _SvgIconAny;
							}
						}
						try {
							/* public asset remote 加载 svg 字符串 */
							_SvgIconAny = await xU.asyncLoadText(this.getIconPath());
						} catch (error) {
							console.error(error);
						}
						return _SvgIconAny;
					})();

					if (xU.isString(SvgIconAny) && SvgIconAny.length > 0) {
						const SvgComponentByString = {
							name: this.icon,
							template: SvgIconAny
						};
						/* indexedDB 缓存 字符串*/
						await iStorage(this.iconKey, SvgIconAny);
						/* 内存 缓存 */
						insideIcons[this.icon] = SvgComponentByString;
						this.svgIcon = <SvgComponentByString {...this.baseAttrs} />;
					} else if (SvgIconAny?.render || SvgIconAny?.template) {
						/* SvgIconAny是loader处理过的 */
						this.svgIcon = <SvgIconAny {...this.baseAttrs} />;
					} else {
						console.error("component xIcon miss svg: " + this.icon);
					}
				} catch (error) {
					console.error(error);
				}
			}
		},
		render() {
			if (this.svgIcon) {
				return this.svgIcon;
			}
			return <InsideLoadingOutlined {...this.baseAttrs} />;
		},
		watch: {
			icon: {
				immediate: true,
				handler() {
					this.setIcon();
				}
			}
		}
	})
);
