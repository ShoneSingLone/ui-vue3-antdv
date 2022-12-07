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
const $document = $(document);
const $body = $("body");
/* 缓存常用字符 */

export const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
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

const READY: {
	zIndex: number;
	$moveMask: JQuery;
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
	/* 使用Object.defineProperty 劫持，不会实际用到，但是方便重构 */
	lastIndex: 0,
	/* 动态决定index，不能一直往上加，lastIndex是 indexRecordArray的最后一个元素*/
	layerIndexArray: [
		/* 至少是1，shade是index-1 */
	],
	removeIndexFromLayerIndexArray(layerIndex: number) {
		let currentIndex = _.findIndex(this.layerIndexArray, i => i === layerIndex);
		if (currentIndex > -1) {
			this.layerIndexArray.splice(currentIndex, 1);
		}
	},
	setZIndex(zIndex: number) {
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
		/* 如果设置了路径，则加载样式 */
		if (READY.config.path) LayerUtils.ready();
		if (!options.extend) return this;
		return this;
	},
	/* 主体CSS等待事件 */
	ready(callback) {
		return this;
	},
	open(options: i_layerOptions) {
		const { _layerIndex } = new ClassLayer(options);
		return _layerIndex;
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
	close(layerIndex: number) {
		if (layerIndex <= 0) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			try {
				/* 关闭layer核心方法 */
				var $eleLayer = $(`#${LAYUI_LAYER}${layerIndex}`);
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
						if (type === READY.type[2]) {
							try {
								var iframe = $(`#${LAYUI_LAYER_CONTENT}${layerIndex}`)[0];
								iframe.contentWindow.document.write("");
								iframe.contentWindow.close();
								$eleLayer.find(`.${LAYUI_LAYER_IFRAME}`)[0].removeChild(iframe);
							} catch (e) {}
						}
					}

					$eleLayer[0].innerHTML = "";
					$eleLayer.remove();

					try {
						READY.end[layerIndex] && READY.end[layerIndex]();
						delete READY.end[layerIndex];
					} catch (e) {
						/* end就是beforeUnmount 的回调函数，如果有，就执行 */
					}
				}
				if ($eleLayer.data("isOutAnim")) {
					$eleLayer.addClass("layer-anim " + closeAnim);
				}

				$(`#layui-layer-moves, #${LAYUI_LAYER_SHADE}${layerIndex}`).remove();
				LayerUtils.ie == 6 && READY.reselect();
				READY.rescollbar(layerIndex);
				if ($eleLayer.attr("minLeft")) {
					READY.minIndex--;
					READY.minLeft.push($eleLayer.attr("minLeft"));
				}
				setTimeout(function () {
					removeLayerDomFromHtml();
					LayerUtils.removeIndexFromLayerIndexArray(layerIndex);
					resolve(true);
				}, 200);
			} catch (error) {
				console.log(error);
				reject(false);
			}
		});
	},
	photos(options, loop, key) {
		/* 相册层 */
		var dict = {};
		options = options || {};
		if (!options.photos) return;
		/* 若 photos 并非选择器或 jQuery 对象，则为普通 object */
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
		/* 如果 options.photos 不是一个对象 */
		if (!isObject) {
			/* 页面直接获取 */
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
			/* 不直接弹出 */
			if (!loop) return;
		} else if (data.length === 0) {
			return LayerUtils.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
		}

		/* 上一张 */
		dict.imgprev = function (key) {
			dict.imgIndex--;
			if (dict.imgIndex < 1) {
				dict.imgIndex = data.length;
			}
			dict.tabimg(key);
		};
		/* 下一张 */
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
		/* 方向键 */
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
		/* 切换 */
		dict.tabimg = function (key) {
			if (data.length <= 1) return;
			photos.start = dict.imgIndex - 1;
			LayerUtils.close(dict.index);
			setTimeout(function () {
				LayerUtils.photos(options, true, key);
			}, 200);
		};
		/* 一些动作 */
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
			$document.on("keyup", dict.keyup);
		};
		/* 图片预加载 */
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
				/* 切换图片时不出现动画 */
				if (key) options.anim = -1;
				/* 弹出图片层 */
				dict.index = LayerUtils.open(
					$.extend(
						{
							type: 1,
							id: "layui-layer-photos",
							area: (function () {
								var imgarea = [img.width, img.height];
								var winarea = [
									$(window).width() - 100,
									$(window).height() - 100
								];
								/* 如果 实际图片的宽或者高比 屏幕大（那么进行缩放） */
								if (
									!options.full &&
									(imgarea[0] > winarea[0] || imgarea[1] > winarea[1])
								) {
									var wh = [
										imgarea[0] / winarea[0],
										imgarea[1] / winarea[1]
									]; /* 取宽度缩放比例、高度缩放比例 */
									if (wh[0] > wh[1]) {
										/* 取缩放比例最大的进行缩放 */
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
								$document.off("keyup", dict.keyup);
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
						during: 30000,
						btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
						yes() {
							data.length > 1 && dict.imgnext(true, true);
						}
					}
				);
			}
		);
	},
	tab(options) {
		/* tab层 */
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
	},
	prompt(options = {}, yes) {
		/* 仿系统prompt */
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
			Object.assign(
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
	},
	getChildFrame(selector, index) {
		/* 获取子iframe的DOM */
		index = index || $(`.${LAYUI_LAYER_CONTENT}`).attr("data-index");
		return $("#" + LAYUI_LAYER + index)
			.find("iframe")
			.contents()
			.find(selector);
	},
	getFrameIndex(name) {
		/* 得到当前iframe层的索引，子iframe时使用 */
		return $("#" + name)
			.parents(`.${LAYUI_LAYER_CONTENT}`)
			.attr("data-index");
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
	title(name, index) {
		/* 改变title */
		var $title = $("#" + LAYUI_LAYER + (index || LayerUtils.lastIndex)).find(
			`.${LAYUI_LAYER_TITLE}`
		);
		$title.html(name);
	},
	async closeAll(type: string) {
		/* 关闭所有层 */
		const needClose: any = [];
		$(`.${LAYUI_LAYER}`).each(function () {
			const $ele = $(this);
			if (type) {
				if ($ele.attr("type") === type) {
					needClose.push($ele.attr("data-index"));
				}
			} else {
				needClose.push($ele.attr("data-index"));
			}
		});
		return await Promise.all(needClose.map(LayerUtils.close));
	},
	setLayerTop($current: JQuery) {
		console.log("setLayerTop");
		if ($current.hasClass("set-layer-top")) {
			return;
		} else {
			$(".set-layer-top").removeClass("set-layer-top");
			$current.addClass("set-layer-top").appendTo($body);
		}
	}
};

Object.defineProperty(LayerUtils, "lastIndex", {
	get() {
		const lastIndex = _.last(LayerUtils.layerIndexArray);
		console.log("get", lastIndex);
		if (lastIndex) {
			return lastIndex;
		} else {
			(LayerUtils.layerIndexArray as number[]) = [1];
			return 1;
		}
	},
	set(newIndex) {
		const lastIndex = _.last(LayerUtils.layerIndexArray);
		console.log("set", lastIndex, LayerUtils.layerIndexArray);
		if (lastIndex) {
			(LayerUtils.layerIndexArray as number[]).push(newIndex as number);
		} else {
			return;
		}
	}
});

class ClassLayer {
	/* 在 constructor 和 init方法里面完成 init */
	_layerIndex = 0;
	_IDLayer = LAYUI_LAYER;
	_IDShade = LAYUI_LAYER_SHADE;
	_IDContent = LAYUI_LAYER_CONTENT;
	zIndex = 0;
	type = "";
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
		cancel: false,
		end: false,
		full: false,
		minStack: true
	};

	constructor(custumSettings: i_layerOptions) {
		this.initConfig(custumSettings)
			.insertContainerAfterInitConfig()
			.setPosition()
			.setLayerSize()
			.onMoveOrResize()
			.addOperationListener()
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
			if (_.every(config.btn, i => !i)) {
				return "";
			}

			const domButtons = _.reduce(
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
			type,
			isContentTypeObject,
			zIndex,
			_layerIndex,
			_IDLayer,
			_IDContent
		} = this;

		const typeClassname = ` layui-layer-${type}`;
		const boderClassname =
			(config.type == 0 || config.type == 2) && !config.shade
				? " layui-layer-border"
				: "";

		const skinClassname = config.skin || "";
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
			.filter(i => !!i)
			.join(" ");

		return `
<div id="${_IDLayer}" 
		layer-wrapper="${_IDLayer}"
		data-z-index="${zIndex}"
		type="${type}"
		class="flex vertical elevation-4 ${LAYUI_LAYER}${typeClassname}${boderClassname}${skinClassname}" 
		data-index="${_layerIndex}"
		data-during-time="${config.during}"
		data-content-type="${isContentTypeObject ? "object" : "string"}"
		style="z-index:${zIndex}; width:${config.area[0]}; height:${
			config.area[1]
		}; position:fixed;">
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

	get cptDomMoveMask() {
		return $(
			`<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`
		);
	}

	initConfig(custumSettings: i_layerOptions) {
		const layerInstance = this;
		layerInstance.config = Object.assign(layerInstance.config, custumSettings);
		/* icon - 图标。信息框和加载层的私有参数; 类型：number，默认：-1（信息框）/0（加载层） */
		layerInstance.config.icon =
			custumSettings.type === LayerUtils.LOADING ? 0 : -1;
		/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
		layerInstance.config.maxWidth = ($win.width() as number) - 15 * 2;

		const { config } = layerInstance;
		/* 随layer 的增减变动 */
		layerInstance._layerIndex = ++LayerUtils.lastIndex;
		layerInstance._IDLayer = `${LAYUI_LAYER}${layerInstance._layerIndex}`;
		layerInstance._IDShade = `${LAYUI_LAYER_SHADE}${layerInstance._layerIndex}`;
		layerInstance._IDContent = `${LAYUI_LAYER_CONTENT}${layerInstance._layerIndex}`;

		/* shade 会-1 */
		layerInstance.zIndex =
			READY.zIndex + (layerInstance.config.zIndex as number);
		layerInstance.type = READY.type[config.type || 0];
		layerInstance.isNeedTitle = [LayerUtils.IFRAME, LayerUtils.DIALOG].includes(
			Number(config.type)
		);
		layerInstance.ismax = Boolean(config.maxmin && layerInstance.isNeedTitle);
		layerInstance.isContentTypeObject = typeof config.content === "object";

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
				let src = "";
				if (isContentTypeObject) {
					/* @ts-ignore */
					scrolling = config.content[1] || "auto";
					/* @ts-ignore */
					src = config.content || "";
				}

				config.content = `
<iframe class="layui-layer-load" 
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
				config.content = `<div style="max-width:300px;overflow:auto;">${config.content[0]}<div>${arrow}`;
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

	setLayerSize() {
		const layerInstance = this;
		const { config } = layerInstance;

		/* 坐标自适应浏览器窗口尺寸 */
		if (config.type == LayerUtils.TIPS) {
			/* 642 */
			layerInstance.tips();
		} else {
			layerInstance.offset();
			/* 首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸 */
			parseInt(
				READY.getStyle(document.getElementById(LAYUI_LAYER_MOVE), "z-index")
			) ||
				(function () {
					layerInstance.$eleLayer.css("visibility", "hidden");
					LayerUtils.ready(function () {
						layerInstance.offset();
						layerInstance.$eleLayer.css("visibility", "visible");
					});
				})();
		}

		/* 如果是固定定位 */
		if (config.fixed) {
			$win.on("resize", function () {
				layerInstance.offset();
				if (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) {
					layerInstance.setPosition();
				}
				if (config.type == LayerUtils.tips) {
					layerInstance.tips();
				}
			});
		}

		if (typeof config.during === "number" && config.during > 0) {
			setTimeout(function () {
				LayerUtils.close(layerInstance._layerIndex);
			}, config.during);
		}

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

	insertContainerAfterInitConfig() {
		/* 容器 */
		const layerInstance = this;
		if (!READY.$moveMask) {
			READY.$moveMask = $(layerInstance.cptDomMoveMask);
			$body.append(READY.$moveMask);
		}
		const { config, isContentTypeObject, _layerIndex, _IDLayer, _IDShade } =
			layerInstance;
		$body.append(layerInstance.cptDomShade);
		if (isContentTypeObject) {
			if ([LayerUtils.IFRAME].includes(config.type || 0)) {
				$body.append(layerInstance.cptDomContainer);
			} else if ([LayerUtils.TIPS].includes(config.type || 0)) {
				const $follow = $(config.follow);
				const { top, left } = $follow.offset();
				const point = [parseFloat(left), parseFloat(top)];
				const $domContainer = $(layerInstance.cptDomContainer);
				/* $domContainer.css({ position: "fixed", top: `${top}px`, left: `${left}px` }); */
				$body.append($domContainer);
			} else {
				const $content = $(config.content);
				const _$layerWrapper = $content.parents(`.${LAYUI_LAYER}`);
				if (_$layerWrapper.length === 0) {
					const $container = $(layerInstance.cptDomContainer);
					$content.replaceWith($container);
					$container.find(`.${LAYUI_LAYER_CONTENT}`).append($content);
				}
			}
		} else {
			$body.append(layerInstance.cptDomContainer);
		}

		layerInstance.$eleLayer = $(`#${_IDLayer}`);
		layerInstance.$eleShade = $(`#${_IDShade}`);
		if (!config.scrollbar) {
			$html.css("overflow", "hidden").attr("layer-full", _layerIndex);
		}

		/* 最后一个 */
		LayerUtils.setLayerTop(layerInstance.$eleLayer);

		/* 遮罩 */
		layerInstance.$eleShade.css({
			"background-color": config.shade[1] || "#000",
			opacity: config.shade[0] || config.shade
		});

		/* IE6 bug */
		if (config.type == LayerUtils.IFRAME && LayerUtils.ie == 6) {
			layerInstance.$eleLayer.find("iframe").attr("src", content[0]);
		}

		return layerInstance;
	}

	setPosition() {
		/* 自适应 */
		var layerInstance = this;
		const { $eleLayer, config } = layerInstance;
		if (config.area[0] === "" && config.maxWidth > 0) {
			/* 为了修复IE7下一个让人难以理解的bug */
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

		return layerInstance;
	}

	offset() {
		/* 计算坐标 */
		var layerInstance = this,
			config = layerInstance.config,
			$eleLayer = layerInstance.$eleLayer;
		var area = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
		var type = typeof config.offset === "object";
		layerInstance.offsetTop = ($win.height() - area[1]) / 2;
		layerInstance.offsetLeft = ($win.width() - area[0]) / 2;
		if (type) {
			layerInstance.offsetTop = config.offset[0];
			layerInstance.offsetLeft = config.offset[1] || layerInstance.offsetLeft;
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

	async tips() {
		/* Tips=================470 */
		var layerInstance = this;
		var config = layerInstance.config;
		var $eleLayer = layerInstance.$eleLayer;
		await new Promise(r => {
			/* 延迟 经验时间 */
			setTimeout(r, 34);
		});
		var layArea = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
		var follow = $(config.follow);
		if (!follow[0]) {
			follow = $body;
		}

		var goal = {
			width: follow.outerWidth(),
			height: follow.outerHeight(),
			top: follow.offset().top,
			left: follow.offset().left
		};
		var tipsG = $eleLayer.find(".layui-layer-TipsG");
		/* 1,2,3,4 */
		const [guide, customColor]: any = config.tips || ["1", ""];
		if (!customColor) {
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

		/* 辨别tips的方位 */
		goal.where = [
			function () {
				/* 上 */
				makeLeftAuto();
				goal.tipTop = goal.top - layArea[1] - 10;
				tipsG
					.removeClass("layui-layer-TipsB")
					.addClass("layui-layer-TipsT")
					.css("border-right-color", customColor);
			},
			function () {
				/* 右 */
				goal.tipLeft = goal.left + goal.width + 10;
				goal.tipTop = goal.top;
				tipsG
					.removeClass("layui-layer-TipsL")
					.addClass("layui-layer-TipsR")
					.css("border-bottom-color", customColor);
			},
			function () {
				/* 下 */
				makeLeftAuto();
				goal.tipTop = goal.top + goal.height + 10;
				tipsG
					.removeClass("layui-layer-TipsT")
					.addClass("layui-layer-TipsB")
					.css("border-right-color", customColor);
			},
			function () {
				/* 左 */
				goal.tipLeft = goal.left - layArea[0] - 10;
				goal.tipTop = goal.top;
				tipsG
					.removeClass("layui-layer-TipsR")
					.addClass("layui-layer-TipsL")
					.css("border-bottom-color", customColor);
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
		$eleLayer.attr(DATA_TIPS_FOLLOW_ID, config.follow.substring(1));
		$eleLayer.find(`.${LAYUI_LAYER_CONTENT}`).css({
			"background-color": customColor,
			"padding-right": config.closeBtn ? "30px" : ""
		});
		$eleLayer.css({
			left: goal.tipLeft - $win.scrollLeft(),
			top: goal.tipTop - $win.scrollTop(),
			transform: "scale(0)"
		});

		setTimeout(() => {
			$eleLayer.css({
				transform: "scale(1)",
				visibility: "unset",
				"z-index": 1
			});
		}, 200);
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
				READY.$moveMask.css("cursor", "move").show();
			}
		});

		$eleResize.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleLayer);
			e.preventDefault();
			READY.moveOrResizeInstance = layerInstance;
			READY.moveOrResizeType = "resize";
			READY.pointMousedown = [e.clientX, e.clientY];
			READY.moveOrResizeWH = [$eleLayer.outerWidth(), $eleLayer.outerHeight()];
			READY.$moveMask.css("cursor", "se-resize").show();
		});

		return layerInstance;
	}

	addOperationListener() {
		const layerInstance = this;
		const { $eleLayer, config } = layerInstance;

		if (config.success) {
			if (config.type == LayerUtils.IFRAME) {
				$eleLayer.find("iframe").on("load", function () {
					config.success.call(this, $eleLayer, layerInstance._layerIndex);
				});
			} else {
				config.success($eleLayer, layerInstance._layerIndex);
			}
		}

		if (LayerUtils.ie == 6) {
			layerInstance.IE6($eleLayer);
		}
		/* 按钮 */
		$eleLayer
			.find(`.${LAYUI_LAYER_CONTENT}`)
			.children("a")
			.on("click", function () {
				var index = $(this).index();
				if (index === 0) {
					if (config.yes) {
						config.yes(layerInstance._layerIndex, $eleLayer);
					} else if (config["btn1"]) {
						config["btn1"](layerInstance._layerIndex, $eleLayer);
					} else {
						LayerUtils.close(layerInstance._layerIndex);
					}
				} else {
					var close =
						config["btn" + (index + 1)] &&
						config["btn" + (index + 1)](layerInstance._layerIndex, $eleLayer);
					close === false || LayerUtils.close(layerInstance._layerIndex);
				}
			});
		/* 右上角关闭回调 */
		$eleLayer
			.find(`.${LAYUI_LAYER_CLOSE}`)
			.on("click", async function handleClickCloseBtn() {
				/* 关闭 */
				var isClosed = false;
				if (config.cancel) {
					isClosed = config.cancel(layerInstance._layerIndex, $eleLayer);
				}
				if (!isClosed) {
					isClosed = await LayerUtils.close(layerInstance._layerIndex);
				}
				if (!isClosed) {
					await LayerUtils.close($(this).attr("data-layer-id"));
				}
			});
		/* 点遮罩关闭 */
		if (config.shadeClose) {
			layerInstance.$eleShade.on("click", function () {
				LayerUtils.close(layerInstance._layerIndex);
			});
		}
		/* 最小化 */
		$eleLayer.find(".layui-layer-min").on("click", function () {
			var min = config.min && config.min($eleLayer, layerInstance._layerIndex);
			min === false || LayerUtils.min(layerInstance._layerIndex, config);
		});
		/* 全屏/还原 */
		$eleLayer.find(".layui-layer-max").on("click", function () {
			if ($(this).hasClass("layui-layer-maxmin")) {
				LayerUtils.restore(layerInstance._layerIndex);
				config.restore && config.restore($eleLayer, layerInstance._layerIndex);
			} else {
				LayerUtils.full(layerInstance._layerIndex, config);
				setTimeout(function () {
					config.full && config.full($eleLayer, layerInstance._layerIndex);
				}, 100);
			}
		});
		config.end && (READY.end[layerInstance._layerIndex] = config.end);
		return layerInstance;
	}

	IE6($eleLayer) {
		/* IE6 */
		/* 隐藏select */
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
}

var cache = LayerUtils.cache || {};
var skin = function (type) {
	return cache.skin ? " " + cache.skin + " " + cache.skin + "-" + type : "";
};

/* 点击层zIndex在最上层 */
$document
	.on("click.setLayerTop", "[layer-wrapper]", event => {
		const { currentTarget } = event;
		const $currentTarget = $(currentTarget);
		LayerUtils.setLayerTop($currentTarget);
	})
	.on(
		"mousemove",
		".layui-layer-move",
		_.throttle(function (e) {
			console.log(e);
			/* 拖拽移动 */
			if (READY.moveOrResizeInstance instanceof ClassLayer) {
				const { $eleLayer, config } = READY.moveOrResizeInstance;
				if (READY.moveOrResizeType === "move") {
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
			}

			/* Resize */
		}, 100)
	)
	.on("mouseup", ".layui-layer-move", function (e) {
		if (READY.moveOrResizeInstance instanceof ClassLayer) {
			const { config } = READY.moveOrResizeInstance;
			if (config.onMoveEnd) {
				config.onMoveEnd(READY.moveOrResizeInstance);
			}
			READY.moveOrResizeInstance = false;
			READY.$moveMask.hide();
		}
	});

/* 暴露模块 */
export { LayerUtils as LayerUtils };
