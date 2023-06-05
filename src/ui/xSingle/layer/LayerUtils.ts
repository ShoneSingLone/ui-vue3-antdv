//@ts-nocheck

/* https://www.layuiweb.com/doc/modules/layer.html#closeBtn */
import $ from "jquery";
import { xU } from "../../ventoseUtils";
import { i_layerOptions } from "./i_layerOptions";

export const KEY = {
	right: 39,
	left: 37,
	esc: 27
};
/*
 *
 *
 * layerTipsId
 *
 * */
const $win = $(window);
const $html = $("html");
const $document = $(document);

/* 缓存常用字符 */
export const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
export const DATA_V_UI_MOVE = "data-directive-ui-move";

const TYPE_DIALOG = "dialog";
const TYPE_PAGE = "page";
const TYPE_IFRAME = "iframe";
const TYPE_LOADING = "loading";
const TYPE_TIPS = "tips";
/*  */
const LAYUI_LAYER = "layui-layer";
const LAYUI_LAYER_SHADE = "layui-layer-shade";
const LAYUI_LAYER_MOVE = "layui-layer-move";
const LAYUI_LAYER_CONTENT = "layui-layer-content";
const LAYUI_LAYER_CLOSE = "layui-layer-close";
const LAYUI_LAYER_IFRAME = "layui-layer-iframe";
const LAYUI_LAYER_TITLE = "layui-layer-title";
const DOMS_ANIM = [
	"layer-anim-00",
	"layer-anim-01",
	"layer-anim-02",
	"layer-anim-03",
	"layer-anim-04",
	"layer-anim-05",
	"layer-anim-06"
];

export const $MoveMask: JQuery = $(
	`<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`
);
setTimeout(() => {
	$html.append($MoveMask);
}, 0);

export const READY: {
	zIndex: number;
	/* layerInstanceForMoveOrResize */
	moveOrResizeInstance: any;
	moveOrResizeWH: any[];
	moveOrResizeType: "resize" | "move";
	pointMousedown: number[];
	basePath: string;
} = {
	zIndex: 0,
	/* 默认zIndex从2开始 */
	pointMousedown: [],
	/*  */
	basePath: (function () {
		var jsPath = document.currentScript
			? document.currentScript.src
			: (function () {
					var js = document.scripts,
						last = js.length - 1,
						src;
					for (var i = last; i > 0; i--) {
						if (js[i].readyState === "interactive") {
							src = js[i].src;
							break;
						}
					}
					return src || js[last].src;
			  })();
		const GLOBAL = {};
		return GLOBAL.layer_dir || jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	})(),
	config: {},
	end: {},
	minIndex: 0,
	minLeft: [],
	btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
	/* 五种原始层模式 */
	type: ["dialog", "page", "iframe", "loading", "tips"],
	/* 获取节点的style属性值 */
	getStyle: function (node, name) {
		var style = node.currentStyle
			? node.currentStyle
			: window.getComputedStyle(node, null);
		return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
			name
		);
	},
	/* for ie6 恢复select */
	reselect() {
		$.each($("select"), function (index, value) {
			var sthis = $(this);
			if (!sthis.parents("." + LAYUI_LAYER)[0]) {
				sthis.attr("layer") == 1 &&
					$("." + LAYUI_LAYER).length < 1 &&
					sthis.removeAttr("layer").show();
			}
			sthis = null;
		});
	},
	/* 记录宽高坐标，用于还原 */
	record($eleLayer) {
		const [windowHeight, windowWidth] = [$win.height(), $win.width()];

		const isLimit = $eleLayer.height() > windowHeight;
		const isLimitWidth = $eleLayer.width() > windowWidth;
		var area = [
			isLimitWidth ? windowWidth - 64 : $eleLayer.width(),
			isLimit ? windowHeight - 64 : $eleLayer.height(),
			isLimit ? 32 : $eleLayer.position().top,
			$eleLayer.position().left + parseFloat($eleLayer.css("margin-left"))
		];
		$eleLayer.find(".layui-layer-max").addClass("layui-layer-maxmin");
		$eleLayer.attr({
			area: area
		});
	},
	rescollbar(index) {
		if ($html.attr("layer-full") == index) {
			if ($html[0].style.removeProperty) {
				$html[0].style.removeProperty("overflow");
			} else {
				$html[0].style.removeAttribute("overflow");
			}
			$html.removeAttr("layer-full");
		}
	}
};
/* 默认内置方法。 */
const LayerUtils = {
	setZIndex(zIndex: number) {
		READY.page;
		READY.zIndex = zIndex;
	},
	/*  */
	MSG: 0,
	DIALOG: 1,
	IFRAME: 2,
	LOADING: 3,
	TIPS: 4,
	UP: 1,
	RIGHT: 2,
	BOTTOM: 3,
	LEFT: 4,
	v: "3.5.1",
	ie: ((): number => {
		/* ie版本 */
		var agent = navigator.userAgent.toLowerCase();
		if ("ActiveXObject" in window) {
			let version = agent.match(/msie\s(\d+)/);
			if (version) {
				return Number(version[1]);
			} else {
				return 11;
			}
		}
		return 0;
	})(),
	path: READY.basePath,
	config: function (options: i_layerOptions, fn) {
		options = options || {};
		LayerUtils.cache = READY.config = $.extend({}, READY.config, options);
		LayerUtils.path = READY.config.path || LayerUtils.path;
		typeof options.extend === "string" && (options.extend = [options.extend]);
		if (!options.extend) {
			return this;
		}
		return this;
	},
	open(options: i_layerOptions) {
		const layerInstance = new ClassLayer(options);
		const { _layerKey } = layerInstance;
		return _layerKey;
	},
	/* 各种快捷引用 */
	alert(content, options, yes) {
		var type = typeof options === "function";
		if (type) yes = options;
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					yes: yes
				},
				type ? {} : options
			)
		);
	},
	confirm(content, options, yes, cancel) {
		if (xU.isFunction(options)) {
			cancel = yes;
			yes = options;
		}
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					btn: READY.btn,
					yes: yes,
					btn2: cancel
				},
				type ? {} : options
			)
		);
	},
	msg(content, options: i_layerOptions, end = () => null) {
		/*最常用提示层*/
		var isOptionsIsFunction = xU.isFunction(options),
			rskin = READY.config.skin;
		var skin = (rskin ? rskin + " " + rskin + "-msg" : "") || "layui-layer-msg";
		var anim = DOMS_ANIM.length - 1;
		if (isOptionsIsFunction) end = options;
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					time: 3000,
					shade: false,
					skin: skin,
					title: false,
					closeBtn: false,
					btn: false,
					resize: false,
					end: end
				},
				isOptionsIsFunction && !READY.config.skin
					? {
							skin: skin + " layui-layer-hui",
							anim: anim
					  }
					: (function () {
							options = options || {};
							if (
								options.icon === -1 ||
								(options.icon === undefined && !READY.config.skin)
							) {
								options.skin = skin + " " + (options.skin || "layui-layer-hui");
							}
							return options;
					  })()
			)
		);
	},
	load(icon, options) {
		return LayerUtils.open(
			$.extend(
				{
					type: 3,
					icon: icon || 0,
					resize: false,
					shade: 0.01
				},
				options
			)
		);
	},
	tips(content, followSelector, options) {
		return LayerUtils.open(
			$.extend(
				{
					type: LayerUtils.TIPS,
					content: [content, followSelector],
					closeBtn: false,
					time: 3000,
					shade: false,
					resize: false,
					fixed: false,
					maxWidth: 260
				},
				options
			)
		);
	},
	close(layerKey: string) {
		if (!layerKey) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			try {
				/* 关闭layer核心方法 */
				var $eleLayer = $(`#${LAYUI_LAYER}${layerKey}`);
				var type = $eleLayer.attr("type");
				var closeAnim = "layer-anim-close";
				if ($eleLayer.length === 0) {
					return;
				}
				function removeLayerDomFromHtml() {
					if (
						type === "dialog" &&
						$eleLayer.attr("data-content-type") === "object"
					) {
						$eleLayer.children(`:not(.${LAYUI_LAYER_IFRAME})`).remove();
					} else {
						/* 低版本IE 回收 iframe */
						if (type === TYPE_IFRAME) {
							try {
								var iframe = $(`#${LAYUI_LAYER_CONTENT}${layerKey}`)[0];
								iframe.contentWindow.document.write("");
								iframe.contentWindow.close();
								$eleLayer.find(`.${LAYUI_LAYER_IFRAME}`)[0].removeChild(iframe);
							} catch (e) {}
						}
					}

					$eleLayer[0].innerHTML = "";
					$eleLayer.remove();

					try {
						READY.end[layerKey] && READY.end[layerKey]();
						delete READY.end[layerKey];
					} catch (e) {
						/* end就是beforeUnmount 的回调函数，如果有，就执行 */
					}
				}
				if ($eleLayer.data("isOutAnim")) {
					$eleLayer.addClass("layer-anim " + closeAnim);
				}

				$(`#layui-layer-moves, #${LAYUI_LAYER_SHADE}${layerKey}`).remove();
				LayerUtils.ie == 6 && READY.reselect();
				READY.rescollbar(layerKey);
				if ($eleLayer.attr("minLeft")) {
					READY.minIndex--;
					READY.minLeft.push($eleLayer.attr("minLeft"));
				}
				setTimeout(function () {
					removeLayerDomFromHtml();
					resolve(true);
				}, 200);
			} catch (error) {
				console.error(error);
				reject(false);
			}
		});
	},
	getChildFrame(selector, index) {
		/* 获取子iframe的DOM */
		index = index || $(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
		return $("#" + LAYUI_LAYER + index)
			.find("iframe")
			.contents()
			.find(selector);
	},
	getFrameIndex(name) {
		/* 得到当前iframe层的索引，子iframe时使用 */
		return $("#" + name)
			.parents(`.${LAYUI_LAYER_CONTENT}`)
			.attr("data-layer-key");
	},
	iframeAuto(index) {
		/* iframe层自适应宽高 */
		if (!index) return;
		var heg = LayerUtils.getChildFrame("html", index).outerHeight();
		var $eleLayer = $("#" + LAYUI_LAYER + index);
		var titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
		var btnHeight =
			$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
		$eleLayer.css({
			height: heg + titHeight + btnHeight
		});
		$eleLayer.find("iframe").css({
			height: heg
		});
	},
	iframeSrc(index, url) {
		/* 重置iframe url */
		$("#" + LAYUI_LAYER + index)
			.find("iframe")
			.attr("src", url);
	},
	style(index, options, limit) {
		/* 设定层的样式 */
		var $eleLayer = $("#" + LAYUI_LAYER + index);
		const $contentEle = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`);
		const type = $eleLayer.attr("type");
		const titHeight =
			$eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
		let contentHeight =
			$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
		const [windowHeight, windowWidth] = [$win.height(), $win.width()];
		var minLeft = $eleLayer.attr("minLeft");
		if (type === TYPE_LOADING || type === TYPE_TIPS) {
			return;
		}

		if (!limit) {
			if (parseFloat(options.width) <= 260) {
				options.width = 260;
			}

			if (parseFloat(options.height) - titHeight - contentHeight <= 64) {
				options.height = 64 + titHeight + contentHeight;
			}
		}

		if (options.height > windowHeight) {
			options.height = parseFloat(windowHeight);
		}
		$eleLayer.css(options);
		contentHeight = $contentEle.outerHeight();
		if (type === TYPE_IFRAME) {
			$eleLayer.find("iframe").addClass("flex1");
		} else {
			$contentEle.css({
				height:
					parseFloat(options.height) -
					titHeight -
					contentHeight -
					parseFloat($contentEle.css("padding-top")) -
					parseFloat($contentEle.css("padding-bottom"))
			});
		}
	},
	min(index, options) {
		/* 最小化 */
		options = options || {};
		var $eleLayer = $("#" + LAYUI_LAYER + index),
			shadeo = $("#" + LAYUI_LAYER_SHADE + index),
			titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0,
			left = $eleLayer.attr("minLeft") || 181 * READY.minIndex + "px",
			position = $eleLayer.css("position"),
			settings = {
				width: 180,
				height: titHeight,
				position: "fixed",
				overflow: "hidden"
			};
		/* 记录宽高坐标，用于还原 */
		READY.record($eleLayer);
		if (READY.minLeft[0]) {
			left = READY.minLeft[0];
			READY.minLeft.shift();
		}

		/* 是否堆叠在左下角 */
		if (options.minStack) {
			settings.left = left;
			settings.top = $win.height() - titHeight;
			/* 初次执行，最小化操作索引自增 */
			$eleLayer.attr("minLeft") || READY.minIndex++;
			$eleLayer.attr("minLeft", left);
		}

		$eleLayer.attr("position", position);
		LayerUtils.style(index, settings, true);
		$eleLayer.find(".layui-layer-min").hide();
		$eleLayer.attr("type") === "page" &&
			$eleLayer.find(LAYUI_LAYER_CONTENT).hide();
		READY.rescollbar(index);
		/* 隐藏遮罩 */
		shadeo.hide();
	},
	restore(index) {
		/* 还原 */
		var $eleLayer = $("#" + LAYUI_LAYER + index),
			shadeo = $("#" + LAYUI_LAYER_SHADE + index),
			area = $eleLayer.attr("area").split(","),
			type = $eleLayer.attr("type");
		/* 恢复原来尺寸 */
		LayerUtils.style(
			index,
			{
				width: parseFloat(area[0]),
				height: parseFloat(area[1]),
				top: parseFloat(area[2]),
				left: parseFloat(area[3]),
				position: $eleLayer.attr("position"),
				overflow: "visible"
			},
			true
		);
		$eleLayer.find(".layui-layer-max").removeClass("layui-layer-maxmin");
		$eleLayer.find(".layui-layer-min").show();
		$eleLayer.attr("type") === "page" &&
			$eleLayer.find(LAYUI_LAYER_CONTENT).show();
		READY.rescollbar(index);
		/* 恢复遮罩 */
		shadeo.show();
	},
	full(index) {
		/* 全屏 */
		var $eleLayer = $("#" + LAYUI_LAYER + index),
			timer;
		READY.record($eleLayer);
		if (!$html.attr("layer-full")) {
			$html.css("overflow", "hidden").attr("layer-full", index);
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			var isfix = $eleLayer.css("position") === "fixed";
			LayerUtils.style(
				index,
				{
					top: isfix ? 0 : $win.scrollTop(),
					left: isfix ? 0 : $win.scrollLeft(),
					width: $win.width(),
					height: $win.height()
				},
				true
			);
			$eleLayer.find(".layui-layer-min").hide();
		}, 100);
	},
	title(name, layerKey) {
		/* 改变title */
		$(`#${LAYUI_LAYER}${layerKey}`).find(`.${LAYUI_LAYER_TITLE}`).html(name);
	},
	async closeAll(type: string) {
		/* 关闭所有层 */
		const needClose: any = [];
		$(`.${LAYUI_LAYER}`).each(function () {
			const $ele = $(this);
			if (type) {
				if ($ele.attr("type") === type) {
					needClose.push($ele.attr("data-layer-key"));
				}
			} else {
				needClose.push($ele.attr("data-layer-key"));
			}
		});
		return await Promise.all(needClose.map(LayerUtils.close));
	},
	setLayerTop($current: JQuery) {
		const type = $current.attr("type");
		if ($current.hasClass("set-layer-top")) {
			return;
		} else {
			const selector = `.set-layer-top[type=${type}]`;
			/* FIX: 防止不同类型的层重排 */
			$(selector).removeClass("set-layer-top");
			$current.addClass("set-layer-top").appendTo($html);
		}
	}
};

class ClassLayer {
	/* 在 constructor 和 init方法里面完成 init */
	_layerKey = 0;
	_IDLayer = LAYUI_LAYER;
	_IDShade = LAYUI_LAYER_SHADE;
	_IDContent = LAYUI_LAYER_CONTENT;
	zIndex = 0;
	typeName = "";
	ismax = false;
	isNeedTitle = false;
	isContentTypeObject = false;
	$eleLayer: any = null;
	$eleShade: any = null;
	config: i_layerOptions = {
		type: 0,
		title: "信息",
		content: "",
		skin: "",
		area: "auto",
		offset: "auto",
		icon: -1,
		btn: "确认",
		btnAlign: "r",
		closeBtn: "1",
		shade: "0.3",
		shadeClose: false,
		during: 0,
		id: "",
		anim: 0,
		isOutAnim: true,
		maxmin: false,
		fixed: true,
		resize: true,
		onResizing: false,
		scrollbar: true,
		maxWidth: 360,
		maxHeight: 0,
		zIndex: 1,
		move: ".layui-layer-title",
		moveOut: false,
		onMoveEnd: false,
		tips: 2,
		tipsMore: false,
		success: false,
		yes: false,
		onClickClose: false,
		end: false,
		full: false,
		minStack: true
	};

	constructor(custumSettings: i_layerOptions) {
		this.initConfig(custumSettings)
			.insertLayer()
			.addLayerListener()
			.handleAnimation();
	}

	get cptDomShade() {
		const { config, _IDShade } = this;
		if (!config.shade) {
			return "";
		}
		return `<div class="${LAYUI_LAYER_SHADE}" id="${_IDShade}" style="z-index:${
			this.zIndex - 1
		};"></div>`;
	}

	get cptDomTitle() {
		const { config, _IDLayer } = this;

		if (this.isContentTypeObject && !this.isNeedTitle) {
			return "";
		}

		var isTitleObject = typeof config.title === "object";
		if (!isTitleObject) {
			config.title = [String(config.title), ""];
		}
		const [title, styleString]: any = config.title || ["", ""];
		return `<div class="${LAYUI_LAYER_TITLE}" style="${styleString}" data-layer-id="${_IDLayer}"> ${title} </div >`;
	}

	get cptDomIcon() {
		if (this.config.type == LayerUtils.MSG && this.config.icon !== -1) {
			return `<i class="layui-layer-ico layui-layer-ico${this.config.icon}></i>`;
		}
		return "";
	}

	get cptDomContent() {
		if (this.config.type == LayerUtils.DIALOG && this.isContentTypeObject) {
			return "";
		}
		return this.config.content || "";
	}

	get cptDomSetDialogOperations() {
		const { config, ismax, _IDLayer } = this;
		return (
			'<span class="layui-layer-setwin">' +
			(function () {
				var closebtn = ismax
					? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>'
					: "";
				if (config.closeBtn) {
					closebtn +=
						`<a data-layer-id="${_IDLayer}" class="layui-layer-ico ${LAYUI_LAYER_CLOSE} ` +
						LAYUI_LAYER_CLOSE +
						(config.title
							? config.closeBtn
							: config.type == LayerUtils.TIPS
							? "1"
							: "2") +
						'" href="javascript:;"></a>';
				}
				return closebtn;
			})() +
			"</span>"
		);
	}

	get cptDomFooterBtns() {
		const { config } = this;
		if (config.btn) {
			if (typeof config.btn === "string") {
				/* OK 按钮 */
				config.btn = [config.btn, ""];
			}
			/* 没一个能用,则不显示 */
			if (xU.every(config.btn, i => !i)) {
				return "";
			}

			const domButtons = xU.reduce(
				config.btn,
				(domButtonString, label) => {
					if (label) {
						domButtonString += `<a class="${LAYUI_LAYER_CONTENT}">${label}</a>`;
					}
					return domButtonString;
				},
				""
			);
			return `<div class="${LAYUI_LAYER_CONTENT} layui-layer-btn-${
				config.btnAlign || ""
			}">${domButtons}</div>`;
		}
		return "";
	}

	get cptDomResizeBar() {
		return this.config.resize ? '<span class="layui-layer-resize"></span>' : "";
	}

	get cptDomContainer() {
		const {
			config,
			typeName,
			isContentTypeObject,
			zIndex,
			_layerKey,
			_IDLayer,
			_IDContent
		} = this;

		const fnValid = i => !!i;

		const layerWrapperClassname = [
			"flex vertical elevation-2",
			`layui-layer-${typeName}`,
			LAYUI_LAYER,
			config.skin,
			(() => {
				if (
					[LayerUtils.IFRAME, LayerUtils.MSG].includes(config.type) &&
					!config.shade
				) {
					return "layui-layer-border";
				}
				return "";
			})()
		]
			.filter(fnValid)
			.join(" ");

		const classContent = [
			LAYUI_LAYER_CONTENT,
			config.contentClass,
			config.type == LayerUtils.MSG && config.icon !== -1
				? "layui-layer-padding"
				: "",
			config.type == LayerUtils.LOADING
				? `layui-layer-loading${config.icon}`
				: ""
		]
			.filter(fnValid)
			.join(" ");

		const [width, height] = config.area || [];

		return `
<div id="${_IDLayer}" layer-wrapper="${_IDLayer}" type="${typeName}"
		class="${layerWrapperClassname}" 
		data-z-index="${zIndex}"
		data-layer-key="${_layerKey}"
		data-during-time="${config.during}"
		data-content-type="${isContentTypeObject ? "object" : "string"}"
		style="position:fixed;
			z-index:${zIndex};
			width:${width}; 
			height:${height};"
		>
			${this.cptDomTitle}
			<div class="${classContent}" id="${_IDContent}">
				${this.cptDomIcon}
				${this.cptDomContent}
			</div>
			${this.cptDomSetDialogOperations}
			${this.cptDomFooterBtns}
			${this.cptDomResizeBar}
</div>`;
	}

	initConfig(custumSettings: i_layerOptions) {
		const layerInstance = this;
		layerInstance.config = Object.assign(layerInstance.config, custumSettings);
		/* icon - 图标。信息框和加载层的私有参数; 类型：number，默认：-1（信息框）/0（加载层） */
		layerInstance.config.icon =
			custumSettings.type === LayerUtils.LOADING ? 0 : -1;
		/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
		layerInstance.config.maxWidth = ($win.width() as number) - 15 * 2;
		layerInstance.config.custumSettings = custumSettings;

		const { config } = layerInstance;
		/* 随layer 的增减变动 */
		layerInstance._layerKey = xU.genId("");
		layerInstance._IDLayer = `${LAYUI_LAYER}${layerInstance._layerKey}`;
		layerInstance._IDShade = `${LAYUI_LAYER_SHADE}${layerInstance._layerKey}`;
		layerInstance._IDContent = `${LAYUI_LAYER_CONTENT}${layerInstance._layerKey}`;

		/* shade 会-1 */
		layerInstance.zIndex =
			READY.zIndex + (layerInstance.config.zIndex as number);
		layerInstance.typeName = READY.type[config.type || 0];
		layerInstance.isNeedTitle = [LayerUtils.IFRAME, LayerUtils.DIALOG].includes(
			Number(config.type)
		);
		layerInstance.ismax = Boolean(config.maxmin && layerInstance.isNeedTitle);
		layerInstance.isContentTypeObject = typeof config.content === "object";

		layerInstance.config.onClickClose = async params => {
			/* 明确返回Boolean false 则为false */
			const isFalse = val => xU.isBoolean(val) && !val;
			if (custumSettings.onClickClose) {
				if (isFalse(await custumSettings.onClickClose(params))) {
					return false;
				}
			} else if (custumSettings.onBeforeClose) {
				if (isFalse(await custumSettings.onBeforeClose(params))) {
					return false;
				}
			}
			return true;
		};

		const { isContentTypeObject } = layerInstance;

		if (typeof config.area === "string") {
			config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
		}

		/* anim兼容旧版shift */
		if (config.shift) {
			config.anim = config.shift;
		}

		if (LayerUtils.ie == 6) {
			config.fixed = false;
		}

		const processContentStrategy = {
			[LayerUtils.MSG]() {
				config.btn = "btn" in config ? config.btn : READY.btn[0];
				LayerUtils.closeAll("dialog");
			},
			[LayerUtils.IFRAME]() {
				let scrolling = "auto";
				let src = config.content;
				if (isContentTypeObject) {
					/* @ts-ignore */
					scrolling = config.content[1] || "auto";
					/* @ts-ignore */
					src = config.content[0] || "";
				}

				config.btn = [];
				config.content = `
<iframe class="layui-layer-load flex flex1" 
		scrolling="${scrolling}" 
		src="${src}"
		allowtransparency="true"
		onload="this.className=''" 
		style="height:100%;" 
		frameborder="0">
</iframe>`;
			},
			[LayerUtils.LOADING]() {
				delete config.title;
				delete config.closeBtn;
				config.icon === -1 && config.icon === 0;
				LayerUtils.closeAll("loading");
			},
			[LayerUtils.TIPS]() {
				if (!isContentTypeObject) {
					config.content = [config.content, "body"];
				}
				config.follow = config.content[1];
				const arrow = '<i class="layui-layer-TipsG"></i>';
				config.content = `<div style="max-width:${
					config?.custumSettings?.maxWidth || "300px"
				};overflow:auto;">${config.content[0]}<div>${arrow}`;
				delete config.title;
				config.btn = [];
				config.tips =
					typeof config.tips === "object" ? config.tips : [config.tips, true];
				config.tipsMore || LayerUtils.closeAll("tips");
			}
		};

		const processContentFn = processContentStrategy[config.type as any];
		processContentFn && processContentFn();

		return layerInstance;
	}

	/* 调整位置并显示 */
	async setLayerPosition() {
		await xU.sleep(34);
		const layerInstance = this;
		const { config, _layerKey } = layerInstance;
		/* 首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸 */
		layerInstance.offset();
		if (config.type === LayerUtils.TIPS) {
			layerInstance.setTips();
		}
		layerInstance.$eleLayer.css("visibility", "visible");
		if (config.fullscreen) {
			setTimeout(() => {
				LayerUtils.full(_layerKey);
			}, 500);
		}

		/* 如果是固定定位 */
		if (config.fixed) {
			$win.on("resize", function () {
				layerInstance.offset();
				if (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) {
					layerInstance.setPosition();
				}
				if (config.type == LayerUtils.tips) {
					layerInstance.setTips();
				}
			});
		}

		if (typeof config.during === "number" && config.during > 0) {
			setTimeout(function () {
				LayerUtils.close(layerInstance._layerKey);
			}, config.during);
		}
		/* 最后至于最上层 */
		LayerUtils.setLayerTop(layerInstance.$eleLayer);

		return layerInstance;
	}

	handleAnimation() {
		/* 为兼容jQuery3.0的css动画影响元素尺寸计算 */
		const layerInstance = this;
		const { config } = layerInstance;
		if (DOMS_ANIM[config.anim]) {
			var animClass = "layer-anim " + DOMS_ANIM[config.anim];
			layerInstance.$eleLayer
				.addClass(animClass)
				.one(
					"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
					function () {
						$(this).removeClass(animClass);
					}
				);
		}
		/* 记录关闭动画 */
		if (config.isOutAnim) {
			layerInstance.$eleLayer.data("isOutAnim", true);
		}
		return layerInstance;
	}

	insertLayer() {
		/* 容器 */
		const layerInstance = this;
		/* moving 的遮罩是单例 */
		const { config, _layerKey, _IDShade } = layerInstance;
		layerInstance.$eleLayer = $(layerInstance.cptDomContainer);
		/*  */
		if (
			xU.isObject(config.content) &&
			(xU.isString(config.content) || xU.isString(config.content.jquery))
		) {
			const $content = $(config.content);
			layerInstance.$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).append($content);
		}
		layerInstance.$eleLayer.css({
			visibility: "hidden",
			top: "100%",
			left: "100%"
		});
		$html.append(layerInstance.$eleLayer);

		/* 当前实例的遮罩 */
		if (layerInstance.cptDomShade) {
			$html.append(layerInstance.cptDomShade);
			layerInstance.$eleShade = $(`#${_IDShade}`);
			layerInstance.$eleShade.css({
				"background-color": config.shade[1] || "#000",
				opacity: config.shade[0] || config.shade
			});
		}

		if (!config.scrollbar) {
			$html.css("overflow", "hidden").attr("layer-full", _layerKey);
		}

		layerInstance.setLayerPosition();
		return layerInstance;
	}

	/**
	 * 计算坐标
	 *
	 * @returns
	 *
	 * @memberOf ClassLayer
	 */
	offset() {
		var layerInstance = this,
			config = layerInstance.config,
			$eleLayer = layerInstance.$eleLayer;
		var area = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
		var whetherOffsetIsObject = typeof config.offset === "object";
		layerInstance.offsetTop = ($win.height() - area[1]) / 2;
		layerInstance.offsetLeft = ($win.width() - area[0]) / 2;
		if (whetherOffsetIsObject) {
			const [top, left] = config.offset;
			layerInstance.offsetTop = top;
			layerInstance.offsetLeft = left || layerInstance.offsetLeft;
		} else if (config.offset !== "auto") {
			if (config.offset === "t") {
				/* 上 */
				layerInstance.offsetTop = 0;
			} else if (config.offset === "r") {
				/* 右 */
				layerInstance.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "b") {
				/* 下 */
				layerInstance.offsetTop = $win.height() - area[1];
			} else if (config.offset === "l") {
				/* 左 */
				layerInstance.offsetLeft = 0;
			} else if (config.offset === "lt") {
				/* 左上角 */
				layerInstance.offsetTop = 0;
				layerInstance.offsetLeft = 0;
			} else if (config.offset === "lb") {
				/* 左下角 */
				layerInstance.offsetTop = $win.height() - area[1];
				layerInstance.offsetLeft = 0;
			} else if (config.offset === "rt") {
				/* 右上角 */
				layerInstance.offsetTop = 0;
				layerInstance.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "rb") {
				/* 右下角 */
				layerInstance.offsetTop = $win.height() - area[1];
				layerInstance.offsetLeft = $win.width() - area[0];
			} else {
				layerInstance.offsetTop = config.offset;
			}
		}

		if (!config.fixed) {
			layerInstance.offsetTop = /%$/.test(layerInstance.offsetTop)
				? ($win.height() * parseFloat(layerInstance.offsetTop)) / 100
				: parseFloat(layerInstance.offsetTop);
			layerInstance.offsetLeft = /%$/.test(layerInstance.offsetLeft)
				? ($win.width() * parseFloat(layerInstance.offsetLeft)) / 100
				: parseFloat(layerInstance.offsetLeft);
			layerInstance.offsetTop += $win.scrollTop();
			layerInstance.offsetLeft += $win.scrollLeft();
		}

		if ($eleLayer.attr("minLeft")) {
			layerInstance.offsetTop =
				$win.height() -
				($eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0);
			layerInstance.offsetLeft = $eleLayer.css("left");
		}
		$eleLayer.css({
			top: layerInstance.offsetTop,
			left: layerInstance.offsetLeft
		});
		return layerInstance;
	}

	async setTips() {
		/* Tips=================470 */
		const layerInstance = this;
		const { config, $eleLayer } = layerInstance;
		const [tipsDomWidth, tipsdomHeight] = [
			$eleLayer.outerWidth(),
			$eleLayer.outerHeight()
		];

		let $eleFollow = $(config.follow);

		if ($eleFollow.length == 0) {
			$eleFollow = $html;
		}

		var followInfo = {
			width: $eleFollow.outerWidth(),
			height: $eleFollow.outerHeight(),
			top: $eleFollow.offset().top,
			left: $eleFollow.offset().left,
			tipTop: 0,
			tipLeft: 0
		};
		if (config.openAtPoint) {
			const { top, left } = config.openAtPoint;
			followInfo.top = top;
			followInfo.left = left;
		}

		var $tipsG = $eleLayer.find(".layui-layer-TipsG");
		/* 1,2,3,4 */
		const [direction, customColor]: any = config.tips || ["1", ""];
		function makeLeftAuto() {
			/* 如果超出边界，位置需要偏移 */
			/* 起始位置+tips宽度 比 视口 宽 */
			if (followInfo.left + tipsDomWidth - $win.width() > 0) {
				/* 向左偏移为超出的宽度 */
				followInfo.tipLeft = followInfo.left + followInfo.width - tipsDomWidth;
				$tipsG.css({ right: 12, left: "auto" });
			} else {
				followInfo.tipLeft = followInfo.left;
			}
		}

		/* 辨别tips的方位 */
		const direction_strategy = {
			[LayerUtils.UP]() {
				/* 上 */
				makeLeftAuto();
				followInfo.tipTop = followInfo.top - tipsdomHeight - 10;
				$tipsG
					.removeClass("layui-layer-TipsB")
					.addClass("layui-layer-TipsT")
					.css("border-right-color", customColor);
				followInfo.top - ($win.scrollTop() + tipsdomHeight + 8 * 2) < 0 &&
					direction_strategy[2]();
			},
			[LayerUtils.RIGHT]() {
				/* 右 */
				followInfo.tipLeft = followInfo.left + followInfo.width + 10;
				followInfo.tipTop = followInfo.top;
				$tipsG
					.removeClass("layui-layer-TipsL")
					.addClass("layui-layer-TipsR")
					.css("border-bottom-color", customColor);
				$win.width() -
					(followInfo.left + followInfo.width + tipsDomWidth + 8 * 2) >
					0 || direction_strategy[3]();
			},
			[LayerUtils.BOTTOM]() {
				/* 下 */
				makeLeftAuto();
				followInfo.tipTop = followInfo.top + followInfo.height + 10;
				$tipsG
					.removeClass("layui-layer-TipsT")
					.addClass("layui-layer-TipsB")
					.css("border-right-color", customColor);
				followInfo.top -
					$win.scrollTop() +
					followInfo.height +
					tipsdomHeight +
					8 * 2 -
					$win.height() >
					0 && direction_strategy[4]();
			},
			[LayerUtils.LEFT]() {
				/* 左 */
				followInfo.tipLeft = followInfo.left - tipsDomWidth - 10;
				followInfo.tipTop = followInfo.top;
				$tipsG
					.removeClass("layui-layer-TipsR")
					.addClass("layui-layer-TipsL")
					.css("border-bottom-color", customColor);
				tipsDomWidth + 8 * 2 - followInfo.left > 0 && direction_strategy[1]();
			}
		};

		direction_strategy[direction] && direction_strategy[direction]();

		/* 8*2为小三角形占据的空间 */
		$eleLayer.attr(DATA_TIPS_FOLLOW_ID, config.follow.substring(1));
		$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).css({
			"background-color": customColor,
			"padding-right": config.closeBtn ? "30px" : ""
		});

		$eleLayer.css({
			left: followInfo.tipLeft - $win.scrollLeft(),
			top: followInfo.tipTop - $win.scrollTop(),
			"transform-origin": [
				$tipsG.hasClass("layui-layer-TipsT") ? "top" : "bottem",
				$tipsG.hasClass("layui-layer-TipsL") ? "left" : "right"
			].join(" ")
		});

		if (!customColor) {
			$tipsG.remove();
		}
	}

	onMoveOrResize() {
		/* 拖拽层 */
		var layerInstance = this;
		const { config, $eleLayer } = layerInstance;
		const $eleMove = $eleLayer.find(config.move);
		const $eleResize = $eleLayer.find(".layui-layer-resize");

		/*  */
		$eleMove.css("cursor", "move");
		$eleMove.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleLayer);
			e.preventDefault();
			if (config.move) {
				// READY.$eleMoveOrResize = $(e.currentTarget).parent(`[layer-wrapper]`);
				READY.moveOrResizeInstance = layerInstance;
				READY.moveOrResizeType = "move";
				READY.pointMousedown = [
					e.clientX - parseFloat($eleLayer.css("left")),
					e.clientY - parseFloat($eleLayer.css("top"))
				];
				$MoveMask.css("cursor", "move").show();
			}
		});

		$eleResize.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleLayer);
			e.preventDefault();
			READY.moveOrResizeInstance = layerInstance;
			READY.moveOrResizeType = "resize";
			READY.pointMousedown = [e.clientX, e.clientY];
			READY.moveOrResizeWH = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
			$MoveMask.css("cursor", "se-resize").show();
		});

		return layerInstance;
	}

	/* move resize min max close */
	addLayerListener() {
		const layerInstance = this;
		const { $eleLayer, config } = layerInstance;

		if (config.success) {
			const args = [$eleLayer, layerInstance._layerKey, layerInstance];
			if (config.type == LayerUtils.IFRAME) {
				$eleLayer.find("iframe").on("load", function () {
					config.success.apply(config, args);
				});
			} else {
				config.success.apply(config, args);
			}
		}

		/* 按钮 */
		$eleLayer
			.find(`.${LAYUI_LAYER_CONTENT}`)
			.children("a")
			.on("click", function () {
				var index = $(this).index();
				if (index === 0) {
					if (config.yes) {
						config.yes(layerInstance._layerKey, $eleLayer);
					} else if (config["btn1"]) {
						config["btn1"](layerInstance._layerKey, $eleLayer);
					} else {
						LayerUtils.close(layerInstance._layerKey);
					}
				} else {
					var close =
						config["btn" + (index + 1)] &&
						config["btn" + (index + 1)](layerInstance._layerKey, $eleLayer);
					close === false || LayerUtils.close(layerInstance._layerKey);
				}
			});
		/* 右上角关闭回调 */
		$eleLayer
			.find(`.${LAYUI_LAYER_CLOSE}`)
			.on("click", async function handleClickCloseBtn() {
				/* 关闭 */
				let isClosed = false;
				const isNeedClose = await config.onClickClose({
					_layerKey: layerInstance._layerKey,
					$eleLayer,
					dialogOptions: ""
				});

				if (isNeedClose) {
					if (!isClosed) {
						isClosed = await LayerUtils.close(layerInstance._layerKey);
					}
					if (!isClosed) {
						await LayerUtils.close($(this).attr("data-layer-id"));
					}
				}
			});
		/* 点遮罩关闭 */
		if (config.shadeClose) {
			layerInstance.$eleShade.on("click", function () {
				LayerUtils.close(layerInstance._layerKey);
			});
		}
		/* 最小化 */
		$eleLayer.find(".layui-layer-min").on("click", function () {
			var min = config.min && config.min($eleLayer, layerInstance._layerKey);
			min === false || LayerUtils.min(layerInstance._layerKey, config);
		});
		/* 全屏/还原 */
		$eleLayer.find(".layui-layer-max").on("click", function () {
			if ($(this).hasClass("layui-layer-maxmin")) {
				LayerUtils.restore(layerInstance._layerKey);
				config.restore && config.restore($eleLayer, layerInstance._layerKey);
			} else {
				LayerUtils.full(layerInstance._layerKey, config);
				setTimeout(function () {
					config.full && config.full($eleLayer, layerInstance._layerKey);
				}, 100);
			}
		});

		if (config.end) {
			READY.end[layerInstance._layerKey] = config.end;
		}

		if (
			![LayerUtils.TIPS, LayerUtils.MSG, LayerUtils.LOADING].includes(
				config.type
			)
		) {
			layerInstance.onMoveOrResize();
		}
		return layerInstance;
	}
}

var cache = LayerUtils.cache || {};
/* eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
/* 点击层zIndex在最上层 */
$document
	.on("click.setLayerTop", "[layer-wrapper]", event => {
		const { currentTarget } = event;
		const $currentTarget = $(currentTarget);
		LayerUtils.setLayerTop($currentTarget);
	})
	.on(
		"mousemove",
		`.${LAYUI_LAYER_MOVE}`,
		function (e) {
			const { moveOrResizeInstance, moveOrResizeType, onMoving } = READY;
			/* 拖拽移动 */
			if (moveOrResizeInstance instanceof ClassLayer) {
				const { $eleLayer, config } = moveOrResizeInstance;
				if (moveOrResizeType === "move") {
					e.preventDefault();
					let X = e.clientX - READY.pointMousedown[0];
					let Y = e.clientY - READY.pointMousedown[1];
					const fixed = $eleLayer.css("position") === "fixed";

					READY.stX = fixed ? 0 : $win.scrollLeft();
					READY.stY = fixed ? 0 : $win.scrollTop();
					/* 控制元素不被拖出窗口外 */
					if (!config.moveOut) {
						let setRig = $win.width() - $eleLayer.outerWidth() + READY.stX;
						let setBot = $win.height() - $eleLayer.outerHeight() + READY.stY;

						if (X < READY.stX) {
							X = READY.stX;
						}

						if (X > setRig) {
							X = setRig;
						}

						if (Y < READY.stY) {
							Y = READY.stY;
						}

						if (Y > setBot) {
							Y = setBot;
						}
					}

					$eleLayer.css({ left: X, top: Y });
				}

				if (config.resize) {
					if (READY.moveOrResizeType === "resize") {
						e.preventDefault();
						const X = e.clientX - READY.pointMousedown[0];
						const Y = e.clientY - READY.pointMousedown[1];

						$eleLayer.css({
							width: READY.moveOrResizeWH[0] + X,
							height: READY.moveOrResizeWH[1] + Y
						});

						config.onResizing && config.onResizing($eleLayer);
					}
				}
			} else if (typeof onMoving == "function") {
				event && onMoving(event);
			}

			/* Resize */
		}
		// xU.throttle(, 90)
	)
	.on("mouseup", function (e) {
		if (READY.moveOrResizeInstance instanceof ClassLayer) {
			const { config } = READY.moveOrResizeInstance;
			if (config.onMoveEnd) {
				config.onMoveEnd(READY.moveOrResizeInstance);
			}
			READY.moveOrResizeInstance = false;
		}
		$MoveMask.hide();
	});

/* 暴露模块 */
export { LayerUtils as LayerUtils };
