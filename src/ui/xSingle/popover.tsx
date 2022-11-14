//@ts-nocheck
import $ from "jquery";
import layer from "./layer/layer";
import { _ } from "../loadCommonUtil";
import { createApp, defineComponent } from "vue";

const timeoutDelay = 400;
/* 缓存 popover 的配置信息 */
const popverOptionsCollection = {};
/**/
const popverIndexCollection = {};
const appAddPlugin = {};
const appDependState = {};
const timerCollection = {};
const visibleArea = {};

/* 监听 触发popover的事件 hover click */
export function installPopoverDirective(app, appSettings) {
	const appId = _.genId("appId");
	appAddPlugin[appId] = appSettings.appPlugins;
	appDependState[appId] = appSettings.dependState;
	app.directive("uiPopover", {
		mounted(el, binding) {
			const followId = _.genId("xPopoverTarget");
			$(el).addClass("x-ui-popover").attr("id", followId);
			el.dataset["followId"] = followId;
			el.dataset["appId"] = appId;

			if (binding.value) {
				popverOptionsCollection[followId] = binding.value;
			}
		},
		unmounted(el) {
			const followId = el.dataset["followId"];
			layer.close(popverIndexCollection[followId]);
			delete popverOptionsCollection[followId];
			delete popverIndexCollection[followId];
		}
	});
}

/* listener */
$(document).on("click.uiPopver", "[data-follow-id]", function (event) {
	const followId = this.dataset["followId"];
	const appId = this.dataset["appId"];
	const popverOptions = popverOptionsCollection[followId];
	new Popover(this, popverOptions);
	/*记录当前的popover 点击到其他位置即消除当前，只允许同时有一个框，添加的是click标识*/
});

function inVisibleArea(followId) {
	/*不关闭，取消定时器*/
	if (timerCollection[followId]) {
		clearTimeout(timerCollection[followId]);
		delete timerCollection[followId];
	}
	visibleArea[followId] = true;
}

function closeTips(followId) {
	delete visibleArea[followId];
	timerCollection[followId] = setTimeout(() => {
		layer.close(popverIndexCollection[followId]);
		delete popverIndexCollection[followId];
	}, timeoutDelay);
}

/* 鼠标hover处理 */
$(document).on("mouseenter.uiPopver", "[data-follow-id]", function (event) {
	console.log("hover.uiPopver,this", this.dataset);
	const followId = this.dataset.followId;
	const appId = this.dataset["appId"];

	inVisibleArea(followId);
	/*如果存在，不重复添加*/
	if (popverIndexCollection[followId]) {
		return;
	}
	const options = popverOptionsCollection[followId] || { content: "" };
	if (!options.content) {
		return;
	}
	let app;
	const tipsContent = _.isPlainObject(options.content)
		? `<div id="${followId}_content">.</div>`
		: options.content;
	const popoverIndex = layer.tips(tipsContent, `#${followId}`, {
		tips: [layer.UP, "#0FA6D8"],
		/*hover 不允许 同时多个 tips出现*/
		/*tipsMore: false,*/
		time: 1000 * 60 * 10,
		success(indexPanel, layerIndex) {
			try {
				app = createApp(options.content);
				app.use(appAddPlugin[appId], { dependState: appDependState[appId] });
				app.mount(`#${followId}_content`);
			} catch (e) {
				console.error(e);
			}
			options.afterOpenDialoag && options.afterOpenDialoag(app);
		},
		end() {
			if (app) {
				app.unmount();
				app = null;
			}
		}
	});
	popverIndexCollection[followId] = popoverIndex;
});

$(document).on("mouseleave.uiPopver", "[data-follow-id]", function (event) {
	/*如果鼠标又移动到TIPS范围内，则不close*/
	closeTips(this.dataset.followId);
});

/*鼠标滑动到弹出的tips上，不关闭tips*/
$(document).on(
	"mouseenter.uiPopverTips",
	"[data-layer-tips-id]",
	function (event) {
		inVisibleArea(this.dataset.layerTipsId);
	}
);

$(document).on(
	"mouseleave.uiPopverTips",
	"[data-layer-tips-id]",
	function (event) {
		/*如果鼠标又移动到TIPS范围内，则不close*/
		closeTips(this.dataset.layerTipsId);
	}
);
