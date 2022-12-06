//@ts-nocheck
import $ from "jquery";
import _ from "lodash";
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
const $body = $("body");

//缓存常用字符
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

const READY = {
	getPath: (function () {
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
	//五种原始层模式
	type: ["dialog", "page", "iframe", "loading", "tips"],
	//获取节点的style属性值
	getStyle: function (node, name) {
		var style = node.currentStyle
			? node.currentStyle
			: window.getComputedStyle(node, null);
		return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
			name
		);
	}
};

//默认内置方法。
const LayerUtils = {
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
	ie: (function () {
		//ie版本
		var agent = navigator.userAgent.toLowerCase();
		return !!window.ActiveXObject || "ActiveXObject" in window
			? (agent.match(/msie\s(\d+)/) || [])[1] || "11" //由于ie11并没有msie的标识
			: false;
	})(),
	index: 1,
	path: READY.getPath,
	config: function (options: i_layerOptions, fn) {
		options = options || {};
		LayerUtils.cache = READY.config = $.extend({}, READY.config, options);
		LayerUtils.path = READY.config.path || LayerUtils.path;
		typeof options.extend === "string" && (options.extend = [options.extend]);
		//如果设置了路径，则加载样式
		if (READY.config.path) LayerUtils.ready();
		if (!options.extend) return this;
		return this;
	},
	//主体CSS等待事件
	ready(callback) {
		return this;
	},
	open(options: i_layerOptions) {
		const res = new ClassInnerLayer(options);
		return res.index;
	},
	//各种快捷引用
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
		if (_.isFunction(options)) {
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
		var isOptionsIsFunction = _.isFunction(options),
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
	tips(content, follow, options: i_layerOptions) {
		return LayerUtils.open(
			$.extend(
				{
					type: LayerUtils.TIPS,
					content: [content, follow],
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
	}
};

/***
 * TODO: class 语法
 */
class ClassInnerLayer {
	index = 0;
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
		time: 0,
		id: "",
		anim: 0,
		isOutAnim: true,
		maxmin: false,
		fixed: true,
		resize: true,
		resizing: false,
		scrollbar: true,
		maxWidth: 360,
		maxHeight: 0,
		zIndex: 1,
		move: ".layui-layer-title",
		moveOut: false,
		moveEnd: false,
		tips: 2,
		tipsMore: false,
		success: false,
		yes: false,
		cancel: false,
		end: false,
		full: false,
		minStack: true
	};

	constructor(setting: i_layerOptions) {
		this.index = ++LayerUtils.index;
		this.config = $.extend(
			{},
			this.config,
			{
				/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
				maxWidth: ($win.width() as number) - 15 * 2,
				/* icon - 图标。信息框和加载层的私有参数; 类型：number，默认：-1（信息框）/0（加载层） */
				icon: [LayerUtils.LOADING].includes(setting.type) ? 0 : -1
			},
			READY.config,
			setting
		);
		this.creat();
	}

	creat() {
		//创建骨架
		const that = this;
		const { config, index, id } = this;
		const { content } = config;
		const times = index;

		const isContentIsObject = typeof content === "object";

		if (config.id && $("#" + config.id)[0]) return;

		if (typeof config.area === "string") {
			config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
		}

		//anim兼容旧版shift
		if (config.shift) {
			config.anim = config.shift;
		}

		switch (config.type) {
			case LayerUtils.MSG: {
				config.btn = "btn" in config ? config.btn : READY.btn[0];
				LayerUtils.closeAll("dialog");
				break;
			}
			case LayerUtils.IFRAME: {
				if (!isContentIsObject) {
					config.content = [config.content || "", "auto"];
				}

				config.content = `<iframe id="${LAYUI_LAYER_CONTENT}${times}" 
	scrolling="${config.content[1] || "auto"}" 
	allowtransparency="true"
	onload="this.className=''" 
	style="height:100%;" 
	class="layui-layer-load" 
	frameborder="0" 
src="${config.content[0]}">
</iframe>`;
				break;
			}
			case LayerUtils.LOADING: {
				delete config.title;
				delete config.closeBtn;
				if (config.icon === -1) {
					config.icon === 0;
				}
				LayerUtils.closeAll("loading");
				break;
			}
			case LayerUtils.TIPS: {
				if (!isContentIsObject) {
					config.content = [config.content, "body"];
				}
				config.follow = config.content[1];
				const arrow = '<i class="layui-layer-TipsG"></i>';
				config.content = `<div style="max-width:300px;overflow:auto;">${config.content[0]}<div>${arrow}`;
				delete config.title;
				config.tips =
					typeof config.tips === "object" ? config.tips : [config.tips, true];
				config.btn = [];
				config.tipsMore || LayerUtils.closeAll("tips");
				break;
			}
		}

		//建立容器
		this.vessel(isContentIsObject, function (html, titleHTML, moveElem) {
			$body.append(html[0]);
			const layeroId = LAYUI_LAYER + times;
			if (isContentIsObject) {
				if ([LayerUtils.IFRAME, LayerUtils.TIPS].includes(config.type)) {
					$body.append(html[1]);
				} else {
					if (!content.parents("." + LAYUI_LAYER)[0]) {
						content
							.data("display", content.css("display"))
							.show()
							.addClass("layui-layer-wrap")
							.wrap(html[1]);
						$(`#${layeroId}`).find(`.${LAYUI_LAYER_IFRAME}`).before(titleHTML);
					}
				}
			} else {
				$body.append(html[1]);
			}

			$("#" + LAYUI_LAYER_MOVE)[0] || $body.append((READY.moveElem = moveElem));
			that.$eleLayer = $(`#${layeroId}`);
			that.shadeo = $("#" + LAYUI_LAYER_SHADE + times);

			if (!config.scrollbar) {
				$html.css("overflow", "hidden").attr("layer-full", times);
			}
		}).auto(times);

		//遮罩
		that.shadeo.css({
			"background-color": config.shade[1] || "#000",
			opacity: config.shade[0] || config.shade
		});

		config.type == LayerUtils.IFRAME &&
			LayerUtils.ie == 6 &&
			that.$eleLayer.find("iframe").attr("src", content[0]);

		//坐标自适应浏览器窗口尺寸
		if (config.type == LayerUtils.TIPS) {
			/* 642 */
			this.tips();
		} else {
			this.offset();
			//首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸
			parseInt(
				READY.getStyle(document.getElementById(LAYUI_LAYER_MOVE), "z-index")
			) ||
				(function () {
					that.$eleLayer.css("visibility", "hidden");
					LayerUtils.ready(function () {
						that.offset();
						that.$eleLayer.css("visibility", "visible");
					});
				})();
		}

		//如果是固定定位
		if (config.fixed) {
			$win.on("resize", function () {
				that.offset();
				(/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) &&
					that.auto(times);
				config.type == 4 && that.tips();
			});
		}

		config.time <= 0 ||
			setTimeout(function () {
				LayerUtils.close(that.index);
			}, config.time);
		that.move().callback();

		//为兼容jQuery3.0的css动画影响元素尺寸计算
		if (DOMS_ANIM[config.anim]) {
			var animClass = "layer-anim " + DOMS_ANIM[config.anim];
			that.$eleLayer
				.addClass(animClass)
				.one(
					"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
					function () {
						$(this).removeClass(animClass);
					}
				);
		}
		//记录关闭动画
		if (config.isOutAnim) {
			that.$eleLayer.data("isOutAnim", true);
		}
	}

	vessel(isContentIsObject, callback) {
		//容器
		var that = this,
			times = that.index,
			config = that.config;
		var zIndex = config.zIndex + times,
			titype = typeof config.title === "object";
		var ismax = config.maxmin && (config.type === 1 || config.type === 2);
		var titleHTML = config.title
			? `
  <div class="layui-layer-title" style="${titype ? config.title[1] : ""}">
    ${titype ? config.title[0] : config.title}
  </div >`
			: "";

		config.zIndex = zIndex;

		const classContent = [
			LAYUI_LAYER_CONTENT,
			config.contentClass,
			config.type == 0 && config.icon !== -1 ? "layui-layer-padding" : "",
			config.type == 3 ? "layui-layer-loading" + config.icon : ""
		]
			.filter(i => !!i)
			.join(" ");

		callback(
			[
				//遮罩
				config.shade
					? `<div class="${LAYUI_LAYER_SHADE}" id="${LAYUI_LAYER_SHADE}${times}" times="${times}" style="z-index:${
							zIndex - 1
					  };"></div>`
					: "",
				//主体
				(() => {
					const layerInvvisibleClassName =
						config.type === LayerUtils.TIPS ? " invisible" : "";
					const layerTypeClassName = ` layui-layer-${READY.type[config.type]}`;
					const layerBoderClassName =
						[LayerUtils.IFRAME, LayerUtils.tips].includes(config.type) &&
						!config.shade
							? " layui-layer-border"
							: "";
					const layerSkinClassName = config.skin || "";
					const mainContent =
						`<div id="${LAYUI_LAYER}${times}"
					  class="flex vertical ${LAYUI_LAYER}${layerTypeClassName}${layerInvvisibleClassName}${layerBoderClassName}${layerSkinClassName}" 
					  type="${READY.type[config.type]}"
					  times="${times}"
					  showtime="${config.time}"
					  data-content-is="${isContentIsObject ? "object" : "string"}"
					  style="z-index:${zIndex};
						  width:${config.area[0]};
						  height:${config.area[1]};
						  position:${config.fixed ? "fixed;" : "absolute;"}">
					${isContentIsObject && config.type != 2 ? "" : titleHTML}
					<div id="${config.id || ""}" class="${classContent}">` +
						(config.type == 0 && config.icon !== -1
							? '<i class="layui-layer-ico layui-layer-ico' +
							  config.icon +
							  '"></i>'
							: "") +
						(config.type == 1 && isContentIsObject
							? ""
							: config.content || "") +
						"</div>" +
						'<span class="layui-layer-setwin">' +
						(function () {
							var closebtn = ismax
								? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>'
								: "";

							if (config.closeBtn) {
								closebtn +=
									`<a class="layui-layer-ico ${LAYUI_LAYER_CLOSE} ` +
									" " +
									LAYUI_LAYER_CLOSE +
									(config.title
										? config.closeBtn
										: config.type == LayerUtils.IFRAME
										? "1"
										: "2") +
									'" href="javascript:;"></a>';
							}
							return closebtn;
						})() +
						"</span>" +
						(config.btn
							? (function () {
									var button = "";
									typeof config.btn === "string" && (config.btn = [config.btn]);
									/* NOTICE:[]不渲染按钮区域 */
									if (config.btn.length === 0) return "";
									for (var i = 0, len = config.btn.length; i < len; i++) {
										button += `<a class="${LAYUI_LAYER_CONTENT}">${config.btn[i]}</a>`;
									}
									return `<div class="${LAYUI_LAYER_CONTENT} layui-layer-btn-${
										config.btnAlign || ""
									}">${button}</div>`;
							  })()
							: "") +
						(config.resize ? '<span class="layui-layer-resize"></span>' : "") +
						"</div>";
					return mainContent;
				})()
			],
			titleHTML,
			$(`<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`)
		);
		return that;
	}
	auto(index) {
		//自适应
		var that = this,
			config = that.config,
			$eleLayer = $("#" + LAYUI_LAYER + index);

		if (config.area[0] === "" && config.maxWidth > 0) {
			//为了修复IE7下一个让人难以理解的bug
			if (LayerUtils.ie && LayerUtils.ie < 8 && config.btn) {
				$eleLayer.width($eleLayer.innerWidth());
			}
			$eleLayer.outerWidth() > config.maxWidth &&
				$eleLayer.width(config.maxWidth);
		}

		var area = [$eleLayer.innerWidth(), $eleLayer.innerHeight()],
			titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0,
			btnHeight = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0,
			setHeight = function (elem) {
				elem = $eleLayer.find(elem);
				elem.height(
					area[1] -
						titHeight -
						btnHeight -
						2 * (parseFloat(elem.css("padding-top")) | 0)
				);
			};

		switch (config.type) {
			case LayerUtils.IFRAME: {
				setHeight("iframe");
				break;
			}
			default: {
				if (config.area[1] === "") {
					if (
						config.maxHeight > 0 &&
						$eleLayer.outerHeight() > config.maxHeight
					) {
						area[1] = config.maxHeight;
						setHeight(`.${LAYUI_LAYER_IFRAME}`);
					} else if (config.fixed && area[1] >= $win.height()) {
						area[1] = $win.height();
						setHeight(`.${LAYUI_LAYER_IFRAME}`);
					}
				} else {
					setHeight(`.${LAYUI_LAYER_IFRAME}`);
				}
				break;
			}
		}
		return that;
	}
	offset() {
		//计算坐标
		var that = this,
			config = that.config,
			$eleLayer = that.$eleLayer;
		var area = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
		var type = typeof config.offset === "object";
		that.offsetTop = ($win.height() - area[1]) / 2;
		that.offsetLeft = ($win.width() - area[0]) / 2;

		if (type) {
			that.offsetTop = config.offset[0];
			that.offsetLeft = config.offset[1] || that.offsetLeft;
		} else if (config.offset !== "auto") {
			if (config.offset === "t") {
				//上
				that.offsetTop = 0;
			} else if (config.offset === "r") {
				//右
				that.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "b") {
				//下
				that.offsetTop = $win.height() - area[1];
			} else if (config.offset === "l") {
				//左
				that.offsetLeft = 0;
			} else if (config.offset === "lt") {
				//左上角
				that.offsetTop = 0;
				that.offsetLeft = 0;
			} else if (config.offset === "lb") {
				//左下角
				that.offsetTop = $win.height() - area[1];
				that.offsetLeft = 0;
			} else if (config.offset === "rt") {
				//右上角
				that.offsetTop = 0;
				that.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "rb") {
				//右下角
				that.offsetTop = $win.height() - area[1];
				that.offsetLeft = $win.width() - area[0];
			} else {
				that.offsetTop = config.offset;
			}
		}

		if (!config.fixed) {
			that.offsetTop = /%$/.test(that.offsetTop)
				? ($win.height() * parseFloat(that.offsetTop)) / 100
				: parseFloat(that.offsetTop);
			that.offsetLeft = /%$/.test(that.offsetLeft)
				? ($win.width() * parseFloat(that.offsetLeft)) / 100
				: parseFloat(that.offsetLeft);
			that.offsetTop += $win.scrollTop();
			that.offsetLeft += $win.scrollLeft();
		}

		if ($eleLayer.attr("minLeft")) {
			that.offsetTop =
				$win.height() -
				($eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0);
			that.offsetLeft = $eleLayer.css("left");
		}
		$eleLayer.css({
			top: that.offsetTop,
			left: that.offsetLeft
		});
	}

	async tips() {
		//Tips=================470
		var that = this;
		var config = that.config;
		var $eleLayer = that.$eleLayer;
		await new Promise(r => {
			/* 延迟 经验时间 */
			setTimeout(r, 34);
		});
		var layArea = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
		var follow = $(config.follow);

		if (!follow[0]) {
			follow = $("body");
		}

		var goal = {
			width: follow.outerWidth(),
			height: follow.outerHeight(),
			top: follow.offset().top,
			left: follow.offset().left
		};

		var tipsG = $eleLayer.find(".layui-layer-TipsG");

		/* 1,2,3,4 */
		var guide = config.tips[0];
		if (!config.tips[1]) {
			tipsG.remove();
		}

		function makeLeftAuto() {
			/* 如果超出边界，位置需要偏移 */
			/* 起始位置+tips宽度 比 视口 宽 */
			if (goal.left + layArea[0] - $win.width() > 0) {
				/* 向左偏移为超出的宽度 */
				goal.tipLeft = goal.left + goal.width - layArea[0];
				tipsG.css({ right: 12, left: "auto" });
			} else {
				goal.tipLeft = goal.left;
			}
		}

		//辨别tips的方位
		goal.where = [
			function () {
				//上
				makeLeftAuto();
				goal.tipTop = goal.top - layArea[1] - 10;
				tipsG
					.removeClass("layui-layer-TipsB")
					.addClass("layui-layer-TipsT")
					.css("border-right-color", config.tips[1]);
			},
			function () {
				//右
				goal.tipLeft = goal.left + goal.width + 10;
				goal.tipTop = goal.top;
				tipsG
					.removeClass("layui-layer-TipsL")
					.addClass("layui-layer-TipsR")
					.css("border-bottom-color", config.tips[1]);
			},
			function () {
				//下
				makeLeftAuto();
				goal.tipTop = goal.top + goal.height + 10;
				tipsG
					.removeClass("layui-layer-TipsT")
					.addClass("layui-layer-TipsB")
					.css("border-right-color", config.tips[1]);
			},
			function () {
				//左
				goal.tipLeft = goal.left - layArea[0] - 10;
				goal.tipTop = goal.top;
				tipsG
					.removeClass("layui-layer-TipsR")
					.addClass("layui-layer-TipsL")
					.css("border-bottom-color", config.tips[1]);
			}
		];
		goal.where[guide - 1]();
		/* 8*2为小三角形占据的空间 */
		if (guide === 1) {
			goal.top - ($win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
		} else if (guide === 2) {
			$win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 ||
				goal.where[3]();
		} else if (guide === 3) {
			goal.top -
				$win.scrollTop() +
				goal.height +
				layArea[1] +
				8 * 2 -
				$win.height() >
				0 && goal.where[0]();
		} else if (guide === 4) {
			layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
		}
		/* jQuery data() 不是针对DOM 属性操作，attr针对*/
		/* $eleLayer[0].dataset["layerTipsId"] = config.follow.substring(1); */
		$eleLayer.attr("data-layer-tips-id", config.follow.substring(1));
		// debugger;
		$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).css({
			"background-color": config.tips[1],
			"padding-right": config.closeBtn ? "30px" : ""
		});

		const layeroPosition = {
			left: goal.tipLeft - (config.fixed ? $win.scrollLeft() : 0),
			top: goal.tipTop - (config.fixed ? $win.scrollTop() : 0)
		};

		$eleLayer.css(layeroPosition);
		$eleLayer.removeClass("invisible");
	}

	move() {
		//拖拽层
		var that = this,
			config = that.config,
			_DOC = $(document),
			$eleLayer = that.$eleLayer,
			moveElem = $eleLayer.find(config.move),
			resizeElem = $eleLayer.find(".layui-layer-resize"),
			dict = {};

		if (config.move) {
			moveElem.css("cursor", "move");
		}

		moveElem.on("mousedown", function (e) {
			e.preventDefault();
			if (config.move) {
				dict.moveStart = true;
				dict.offset = [
					e.clientX - parseFloat($eleLayer.css("left")),
					e.clientY - parseFloat($eleLayer.css("top"))
				];
				READY.moveElem.css("cursor", "move").show();
			}
		});

		resizeElem.on("mousedown", function (e) {
			e.preventDefault();
			dict.resizeStart = true;
			dict.offset = [e.clientX, e.clientY];
			dict.area = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
			READY.moveElem.css("cursor", "se-resize").show();
		});

		_DOC
			.on("mousemove", function (e) {
				//拖拽移动
				if (dict.moveStart) {
					var X = e.clientX - dict.offset[0],
						Y = e.clientY - dict.offset[1],
						fixed = $eleLayer.css("position") === "fixed";

					e.preventDefault();

					dict.stX = fixed ? 0 : $win.scrollLeft();
					dict.stY = fixed ? 0 : $win.scrollTop();

					//控制元素不被拖出窗口外
					if (!config.moveOut) {
						var setRig = $win.width() - $eleLayer.outerWidth() + dict.stX,
							setBot = $win.height() - $eleLayer.outerHeight() + dict.stY;
						X < dict.stX && (X = dict.stX);
						X > setRig && (X = setRig);
						Y < dict.stY && (Y = dict.stY);
						Y > setBot && (Y = setBot);
					}

					$eleLayer.css({
						left: X,
						top: Y
					});
				}

				//Resize
				if (config.resize && dict.resizeStart) {
					var X = e.clientX - dict.offset[0],
						Y = e.clientY - dict.offset[1];

					e.preventDefault();

					LayerUtils.style(that.index, {
						width: dict.area[0] + X,
						height: dict.area[1] + Y
					});
					dict.isResize = true;
					config.resizing && config.resizing($eleLayer);
				}
			})
			.on("mouseup", function (e) {
				if (dict.moveStart) {
					delete dict.moveStart;
					READY.moveElem.hide();
					config.moveEnd && config.moveEnd($eleLayer);
				}
				if (dict.resizeStart) {
					delete dict.resizeStart;
					READY.moveElem.hide();
				}
			});

		return that;
	}

	callback() {
		/* CALLBACK */
		var that = this,
			$eleLayer = that.$eleLayer,
			config = that.config;
		that.openLayer();
		if (config.success) {
			if (config.type == 2) {
				$eleLayer.find("iframe").on("load", function () {
					config.success.call(this, $eleLayer, that.index);
				});
			} else {
				config.success($eleLayer, that.index);
			}
		}
		LayerUtils.ie == 6 && that.IE6($eleLayer);

		//按钮
		$eleLayer
			.find(`.${LAYUI_LAYER_CONTENT}`)
			.children("a")
			.on("click", function () {
				var index = $(this).index();
				if (index === 0) {
					if (config.yes) {
						config.yes(that.index, $eleLayer);
					} else if (config["btn1"]) {
						config["btn1"](that.index, $eleLayer);
					} else {
						LayerUtils.close(that.index);
					}
				} else {
					var close =
						config["btn" + (index + 1)] &&
						config["btn" + (index + 1)](that.index, $eleLayer);
					close === false || LayerUtils.close(that.index);
				}
			});

		//取消
		function cancel() {
			if (config.cancel) {
				config.cancel(that.index, $eleLayer);
			} else {
				LayerUtils.close(that.index);
			}
		}

		//右上角关闭回调
		$eleLayer.find("." + LAYUI_LAYER_CLOSE).on("click", cancel);

		//点遮罩关闭
		if (config.shadeClose) {
			that.shadeo.on("click", function () {
				LayerUtils.close(that.index);
			});
		}

		//最小化
		$eleLayer.find(".layui-layer-min").on("click", function () {
			var min = config.min && config.min($eleLayer, that.index);
			min === false || LayerUtils.min(that.index, config);
		});

		//全屏/还原
		$eleLayer.find(".layui-layer-max").on("click", function () {
			if ($(this).hasClass("layui-layer-maxmin")) {
				LayerUtils.restore(that.index);
				config.restore && config.restore($eleLayer, that.index);
			} else {
				LayerUtils.full(that.index, config);
				setTimeout(function () {
					config.full && config.full($eleLayer, that.index);
				}, 100);
			}
		});

		config.end && (READY.end[that.index] = config.end);
	}

	IE6($eleLayer) {
		/* IE6 */
		//隐藏select
		$("select").each(function (index, value) {
			var sthis = $(this);
			if (!sthis.parents("." + LAYUI_LAYER)[0]) {
				sthis.css("display") === "none" ||
					sthis
						.attr({
							layer: "1"
						})
						.hide();
			}
			sthis = null;
		});
	}

	openLayer() {
		//需依赖原型的对外方法
		var that = this;

		//置顶当前窗口
		LayerUtils.zIndex = that.config.zIndex;
		LayerUtils.setTop = function ($eleLayer) {
			var setZindex = function () {
				LayerUtils.zIndex++;
				$eleLayer.css("z-index", LayerUtils.zIndex + 1);
			};
			LayerUtils.zIndex = parseInt($eleLayer[0].style.zIndex);
			$eleLayer.on("mousedown", setZindex);
			return LayerUtils.zIndex;
		};
	}
}

function ClassLayer(setings: i_layerOptions) {
	var that = this;
	that.index = ++LayerUtils.index;
	that.config.maxWidth = $win.width() - 15 * 2; //初始最大宽度：当前屏幕宽，左右留 15px 边距
	that.config = $.extend({}, that.config, READY.config, setings);
	that.creat();
}

//记录宽高坐标，用于还原
READY.record = function ($eleLayer) {
	var area = [
		$eleLayer.width(),
		$eleLayer.height(),
		$eleLayer.position().top,
		$eleLayer.position().left + parseFloat($eleLayer.css("margin-left"))
	];
	$eleLayer.find(".layui-layer-max").addClass("layui-layer-maxmin");
	$eleLayer.attr({
		area: area
	});
};

READY.rescollbar = function (index) {
	if ($html.attr("layer-full") == index) {
		if ($html[0].style.removeProperty) {
			$html[0].style.removeProperty("overflow");
		} else {
			$html[0].style.removeAttribute("overflow");
		}
		$html.removeAttr("layer-full");
	}
};

/** 内置成员 */

//获取子iframe的DOM
LayerUtils.getChildFrame = function (selector, index) {
	index = index || $(`.${LAYUI_LAYER_CONTENT}`).attr("times");
	return $("#" + LAYUI_LAYER + index)
		.find("iframe")
		.contents()
		.find(selector);
};

//得到当前iframe层的索引，子iframe时使用
LayerUtils.getFrameIndex = function (name) {
	return $("#" + name)
		.parents(`.${LAYUI_LAYER_CONTENT}`)
		.attr("times");
};

//iframe层自适应宽高
LayerUtils.iframeAuto = function (index) {
	if (!index) return;
	var heg = LayerUtils.getChildFrame("html", index).outerHeight();
	var $eleLayer = $("#" + LAYUI_LAYER + index);
	var titHeight = $eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
	var btnHeight = $eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
	$eleLayer.css({
		height: heg + titHeight + btnHeight
	});
	$eleLayer.find("iframe").css({
		height: heg
	});
};

//重置iframe url
LayerUtils.iframeSrc = function (index, url) {
	$("#" + LAYUI_LAYER + index)
		.find("iframe")
		.attr("src", url);
};

//设定层的样式
LayerUtils.style = function (index, options, limit) {
	var $$eleLayer = $("#" + LAYUI_LAYER + index),
		contElem = $$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`),
		type = $$eleLayer.attr("type"),
		titHeight = $$eleLayer.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0,
		btnHeight = $$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0,
		minLeft = $$eleLayer.attr("minLeft");

	if (type === READY.type[3] || type === READY.type[4]) {
		return;
	}

	if (!limit) {
		if (parseFloat(options.width) <= 260) {
			options.width = 260;
		}

		if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
			options.height = 64 + titHeight + btnHeight;
		}
	}

	$$eleLayer.css(options);
	btnHeight = $$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight();

	if (type === READY.type[2]) {
		$$eleLayer.find("iframe").css({
			height: parseFloat(options.height) - titHeight - btnHeight
		});
	} else {
		contElem.css({
			height:
				parseFloat(options.height) -
				titHeight -
				btnHeight -
				parseFloat(contElem.css("padding-top")) -
				parseFloat(contElem.css("padding-bottom"))
		});
	}
};

//最小化
LayerUtils.min = function (index, options) {
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

	//记录宽高坐标，用于还原
	READY.record($eleLayer);

	if (READY.minLeft[0]) {
		left = READY.minLeft[0];
		READY.minLeft.shift();
	}

	//是否堆叠在左下角
	if (options.minStack) {
		settings.left = left;
		settings.top = $win.height() - titHeight;
		$eleLayer.attr("minLeft") || READY.minIndex++; //初次执行，最小化操作索引自增
		$eleLayer.attr("minLeft", left);
	}

	$eleLayer.attr("position", position);
	LayerUtils.style(index, settings, true);

	$eleLayer.find(".layui-layer-min").hide();
	$eleLayer.attr("type") === "page" &&
		$eleLayer.find(LAYUI_LAYER_CONTENT).hide();
	READY.rescollbar(index);

	//隐藏遮罩
	shadeo.hide();
};

//还原
LayerUtils.restore = function (index) {
	var $eleLayer = $("#" + LAYUI_LAYER + index),
		shadeo = $("#" + LAYUI_LAYER_SHADE + index),
		area = $eleLayer.attr("area").split(","),
		type = $eleLayer.attr("type");

	//恢复原来尺寸
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

	//恢复遮罩
	shadeo.show();
};

//全屏
LayerUtils.full = function (index) {
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
};

//改变title
LayerUtils.title = function (name, index) {
	var title = $("#" + LAYUI_LAYER + (index || LayerUtils.index)).find(
		`.${LAYUI_LAYER_TITLE}`
	);
	title.html(name);
};

//关闭layer总方法
LayerUtils.close = function (index, callback) {
	const $eleLayer = $("#" + LAYUI_LAYER + index);
	const type = $eleLayer.attr("type");
	const closeAnim = "layer-anim-close";
	if (!$eleLayer[0]) {
		return;
	}
	const WRAP = "layui-layer-wrap";

	function remove() {
		const isEleContentIsObject = $eleLayer.data("contentIs") === "object";
		if (type === READY.type[1] && isEleContentIsObject) {
			$eleLayer.children(`:not(.${LAYUI_LAYER_IFRAME})`).remove();
			var wrap = $eleLayer.find("." + WRAP);
			for (var i = 0; i < 2; i++) {
				wrap.unwrap();
			}
			wrap.css("display", wrap.data("display")).removeClass(WRAP);
		} else {
			//低版本IE 回收 iframe
			if (type === READY.type[2]) {
				try {
					var iframe = $("#" + LAYUI_LAYER_CONTENT + index)[0];
					iframe.contentWindow.document.write("");
					iframe.contentWindow.close();
					$eleLayer.find(`.${LAYUI_LAYER_IFRAME}`)[0].removeChild(iframe);
				} catch (e) {}
			}
			$eleLayer[0].innerHTML = "";
			$eleLayer.remove();
		}
		typeof READY.end[index] === "function" && READY.end[index]();
		delete READY.end[index];
		typeof callback === "function" && callback();
	}

	if ($eleLayer.data("isOutAnim")) {
		$eleLayer.addClass("layer-anim " + closeAnim);
	}

	$("#layui-layer-moves, #" + LAYUI_LAYER_SHADE + index).remove();

	READY.rescollbar(index);
	if ($eleLayer.attr("minLeft")) {
		READY.minIndex--;
		READY.minLeft.push($eleLayer.attr("minLeft"));
	}

	if ((LayerUtils.ie && LayerUtils.ie < 10) || !$eleLayer.data("isOutAnim")) {
		remove();
	} else {
		setTimeout(function () {
			remove();
		}, 200);
	}
};

//关闭所有层
LayerUtils.closeAll = function (type, callback) {
	if (typeof type === "function") {
		callback = type;
		type = null;
	}
	var domsElem = $("." + LAYUI_LAYER);
	$.each(domsElem, function (_index) {
		var othis = $(this);
		var is = type ? othis.attr("type") === type : 1;
		is &&
			LayerUtils.close(
				othis.attr("times"),
				_index === domsElem.length - 1 ? callback : null
			);
		is = null;
	});
	if (domsElem.length === 0) typeof callback === "function" && callback();
};

/**

 拓展模块，layui 开始合并在一起

 */

var cache = LayerUtils.cache || {},
	skin = function (type) {
		return cache.skin ? " " + cache.skin + " " + cache.skin + "-" + type : "";
	};

//仿系统prompt
LayerUtils.prompt = function (options = {}, yes) {
	var style = "";
	if (typeof options === "function") {
		yes = options;
	}

	if (options.area) {
		var area = options.area;
		style = `style="width: ${area[0]}; height: ${area[1]};"`;
		delete options.area;
	}

	var prompt;
	var content =
		options.formType == 2
			? `<textarea class="layui-layer-input" ${style}></textarea>`
			: `<input type="${
					options.formType === 1 ? "password" : "text"
			  }" class="layui-layer-input">`;

	var success = options.success;
	delete options.success;

	return LayerUtils.open(
		$.extend(
			{
				type: 1,
				btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
				content: content,
				skin: "layui-layer-prompt" + skin("prompt"),
				maxWidth: $win.width(),
				success($eleLayer) {
					prompt = $eleLayer.find(".layui-layer-input");
					prompt.val(options.value || "").focus();
					typeof success === "function" && success($eleLayer);
				},
				resize: false,
				yes(index) {
					var value = prompt.val();
					if (value === "") {
						prompt.focus();
					} else if (value.length > (options.maxlength || 500)) {
						LayerUtils.tips(
							"&#x6700;&#x591A;&#x8F93;&#x5165;" +
								(options.maxlength || 500) +
								"&#x4E2A;&#x5B57;&#x6570;",
							prompt,
							{
								tips: 1
							}
						);
					} else {
						yes && yes(value, index, prompt);
					}
				}
			},
			options
		)
	);
};

//tab层
LayerUtils.tab = function (options) {
	options = options || {};

	var tab = options.tab || {},
		THIS = "layui-this",
		success = options.success;

	delete options.success;

	return LayerUtils.open(
		$.extend(
			{
				type: 1,
				skin: "layui-layer-tab" + skin("tab"),
				resize: false,
				title: (function () {
					var len = tab.length,
						ii = 1,
						str = "";
					if (len > 0) {
						str = '<span class="' + THIS + '">' + tab[0].title + "</span>";
						for (; ii < len; ii++) {
							str += "<span>" + tab[ii].title + "</span>";
						}
					}
					return str;
				})(),
				content:
					'<ul class="layui-layer-tabmain">' +
					(function () {
						var len = tab.length,
							ii = 1,
							str = "";
						if (len > 0) {
							str =
								'<li class="layui-layer-tabli ' +
								THIS +
								'">' +
								(tab[0].content || "no content") +
								"</li>";
							for (; ii < len; ii++) {
								str +=
									'<li class="layui-layer-tabli">' +
									(tab[ii].content || "no  content") +
									"</li>";
							}
						}
						return str;
					})() +
					"</ul>",
				success($eleLayer) {
					var btn = $eleLayer.find(".layui-layer-title").children();
					var main = $eleLayer.find(".layui-layer-tabmain").children();
					btn.on("mousedown", function (e) {
						e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
						var othis = $(this),
							index = othis.index();
						othis.addClass(THIS).siblings().removeClass(THIS);
						main.eq(index).show().siblings().hide();
						typeof options.change === "function" && options.change(index);
					});
					typeof success === "function" && success($eleLayer);
				}
			},
			options
		)
	);
};

//相册层
LayerUtils.photos = function (options, loop, key) {
	var dict = {};
	options = options || {};
	if (!options.photos) return;

	//若 photos 并非选择器或 jQuery 对象，则为普通 object
	var isObject = !(
			typeof options.photos === "string" || options.photos instanceof $
		),
		photos = isObject ? options.photos : {},
		data = photos.data || [],
		start = photos.start || 0;

	dict.imgIndex = (start | 0) + 1;
	options.img = options.img || "img";

	var success = options.success;
	delete options.success;

	//如果 options.photos 不是一个对象
	if (!isObject) {
		//页面直接获取
		var parent = $(options.photos),
			pushData = function () {
				data = [];
				parent.find(options.img).each(function (index) {
					var othis = $(this);
					othis.attr("layer-index", index);
					data.push({
						alt: othis.attr("alt"),
						pid: othis.attr("layer-pid"),
						src: othis.attr("layer-src") || othis.attr("src"),
						thumb: othis.attr("src")
					});
				});
			};

		pushData();

		if (data.length === 0) return;

		loop ||
			parent.on("click", options.img, function () {
				pushData();
				var othis = $(this),
					index = othis.attr("layer-index");
				LayerUtils.photos(
					$.extend(options, {
						photos: {
							start: index,
							data: data,
							tab: options.tab
						},
						full: options.full
					}),
					true
				);
			});

		//不直接弹出
		if (!loop) return;
	} else if (data.length === 0) {
		return LayerUtils.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
	}

	//上一张
	dict.imgprev = function (key) {
		dict.imgIndex--;
		if (dict.imgIndex < 1) {
			dict.imgIndex = data.length;
		}
		dict.tabimg(key);
	};

	//下一张
	dict.imgnext = function (key, errorMsg) {
		dict.imgIndex++;
		if (dict.imgIndex > data.length) {
			dict.imgIndex = 1;
			if (errorMsg) {
				return;
			}
		}
		dict.tabimg(key);
	};

	//方向键
	dict.keyup = function (event) {
		if (!dict.end) {
			var code = event.keyCode;
			event.preventDefault();
			/*  */
			if (code === KEY.left) {
				dict.imgprev(true);
			} else if (code === KEY.right) {
				dict.imgnext(true);
			} else if (code === KEY.esc) {
				LayerUtils.close(dict.index);
			}
		}
	};

	//切换
	dict.tabimg = function (key) {
		if (data.length <= 1) return;
		photos.start = dict.imgIndex - 1;
		LayerUtils.close(dict.index);
		setTimeout(function () {
			LayerUtils.photos(options, true, key);
		}, 200);
	};

	//一些动作
	dict.event = function () {
		/*
		dict.bigimg.hover(function(){
		  dict.imgsee.show();
		}, function(){
		  dict.imgsee.hide();
		});
		*/

		dict.bigimg.find(".layui-layer-imgprev").on("click", function (event) {
			event.preventDefault();
			dict.imgprev(true);
		});

		dict.bigimg.find(".layui-layer-imgnext").on("click", function (event) {
			event.preventDefault();
			dict.imgnext(true);
		});

		$(document).on("keyup", dict.keyup);
	};

	//图片预加载
	function loadImage(url, callback, error) {
		var img = new Image();
		img.src = url;
		if (img.complete) {
			return callback(img);
		}
		img.onload = function () {
			img.onload = null;
			callback(img);
		};
		img.onerror = function (e) {
			img.onerror = null;
			error(e);
		};
	}

	dict.loadi = LayerUtils.load(1, {
		shade: "shade" in options ? false : 0.9,
		scrollbar: false
	});

	loadImage(
		data[start].src,
		function (img) {
			LayerUtils.close(dict.loadi);

			//切换图片时不出现动画
			if (key) options.anim = -1;

			//弹出图片层
			dict.index = LayerUtils.open(
				$.extend(
					{
						type: 1,
						id: "layui-layer-photos",
						area: (function () {
							var imgarea = [img.width, img.height];
							var winarea = [$(window).width() - 100, $(window).height() - 100];

							//如果 实际图片的宽或者高比 屏幕大（那么进行缩放）
							if (
								!options.full &&
								(imgarea[0] > winarea[0] || imgarea[1] > winarea[1])
							) {
								var wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; //取宽度缩放比例、高度缩放比例
								if (wh[0] > wh[1]) {
									//取缩放比例最大的进行缩放
									imgarea[0] = imgarea[0] / wh[0];
									imgarea[1] = imgarea[1] / wh[0];
								} else if (wh[0] < wh[1]) {
									imgarea[0] = imgarea[0] / wh[1];
									imgarea[1] = imgarea[1] / wh[1];
								}
							}

							return [imgarea[0] + "px", imgarea[1] + "px"];
						})(),
						title: false,
						shade: 0.9,
						shadeClose: true,
						closeBtn: false,
						move: ".layui-layer-phimg img",
						moveType: 1,
						scrollbar: false,
						moveOut: true,
						anim: 5,
						isOutAnim: false,
						skin: "layui-layer-photos" + skin("photos"),
						content:
							'<div class="layui-layer-phimg">' +
							'<img src="' +
							data[start].src +
							'" alt="' +
							(data[start].alt || "") +
							'" layer-pid="' +
							data[start].pid +
							'">' +
							(function () {
								if (data.length > 1) {
									return (
										'<div class="layui-layer-imgsee">' +
										'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' +
										'<div class="layui-layer-imgbar" style="display:' +
										(key ? "block" : "") +
										'"><span class="layui-layer-imgtit"><a href="javascript:;">' +
										(data[start].alt || "") +
										"</a><em>" +
										dict.imgIndex +
										" / " +
										data.length +
										"</em></span></div>" +
										"</div>"
									);
								}
								return "";
							})() +
							"</div>",
						success($eleLayer, index) {
							dict.bigimg = $eleLayer.find(".layui-layer-phimg");
							dict.imgsee = $eleLayer.find(".layui-layer-imgbar");
							dict.event($eleLayer);
							options.tab && options.tab(data[start], $eleLayer);
							typeof success === "function" && success($eleLayer);
						},
						end() {
							dict.end = true;
							$(document).off("keyup", dict.keyup);
						}
					},
					options
				)
			);
		},
		function () {
			LayerUtils.close(dict.loadi);
			LayerUtils.msg(
				"&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",
				{
					time: 30000,
					btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
					yes() {
						data.length > 1 && dict.imgnext(true, true);
					}
				}
			);
		}
	);
};

//暴露模块
export { LayerUtils as LayerUtils };
