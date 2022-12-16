<script lang="jsx">
// @ts-nocheck
import { defineComponent, markRaw } from "vue";
import { xU } from "../ventoseUtils";
import { State_UI } from "../State_UI";
import InsideDeleteOutlined from "../../assets/svg/DeleteOutlined.svg";
import InsideExclamationCircleOutlined from "../../assets/svg/ExclamationCircleOutlined.svg";
import InsideLoadingOutlined from "../../assets/svg/LoadingOutlined.svg";
import InsideSaveOutlined from "../../assets/svg/SaveOutlined.svg";
import InsideSearchOutlined from "../../assets/svg/SearchOutlined.svg";
import InsideSyncOutlined from "../../assets/svg/SyncOutlined.svg";
import InsideUploadOutlined from "../../assets/svg/UploadOutlined.svg";
import Insidetips from "../../assets/svg/tips.svg";
import { iStorage } from "../tools/storage";

/* const icons = import.meta.glob("../../assets/svg/*.svg"); */
const insideIcons = {
	InsideDeleteOutlined,
	InsideExclamationCircleOutlined,
	InsideLoadingOutlined,
	InsideSaveOutlined,
	InsideSearchOutlined,
	InsideSyncOutlined,
	InsideUploadOutlined,
	Insidetips
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
				return `${State_UI.assetsSvgPath}/${this.icon}.svg`;
			},
			async setIcon() {
				if (!this.icon) return;

				try {
					let SvgIconAny = await (async () => {
						/* 已缓存为组件 */
						let _SvgIconAny = insideIcons[this.icon];
						if (_SvgIconAny) {
							return _SvgIconAny;
						}
						/* indexedDB 缓存成字符串 */
						_SvgIconAny = await iStorage(this.iconKey);
						if (_SvgIconAny) {
							return _SvgIconAny;
						}
						try {
							/* public asset remote 加载 svg 字符串 */
							_SvgIconAny = await xU.asyncLoadText(this.getIconPath());
						} catch (error) {}
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
</script>

<style lang="scss">
.xIcon {
	width: 16px;
	height: 16px;

	&.auto-size {
		width: unset;
		height: unset;
	}
}

div[id^="lazy-svg_"] {
	display: flex;
}

.next-loading {
	height: 100%;
	width: 100%;

	&.next-open {
		pointer-events: none;
	}
}

.next-loading .next-loading-component {
	opacity: 0.7;
	filter: blur(1px);
	filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=1, MakeShadow=false)";
	position: relative;
	pointer-events: none;
}

.next-loading-masker {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99;
	opacity: 0.2;
	background: #fff;
}

.next-loading-inline {
	display: inline-block;
}

.next-loading-tip {
	display: block;
	position: absolute;
	z-index: 4;
	text-align: center;
}
</style>
