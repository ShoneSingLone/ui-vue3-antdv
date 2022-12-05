//@ts-nocheck
import $ from "jquery";
import { LayerUtils } from "./layer/LayerUtils";
import { _ } from "../loadCommonUtil";
import { createApp, defineComponent } from "vue";

type t_uiPopoverOptions = {
	content: string;
	onlyEllipsis?: Boolean;
};

const TIMEOUT_DELAY = 200;
/* 缓存 popover 的配置信息 */
const popverOptionsCollection: {
	[prop: string]: t_uiPopoverOptions;
} = {};
/**/
const popverIndexCollection: {
	[prop: string]: Number;
} = {};
const appAddPlugin: any = {};
const appDependState: any = {};
const timerCollection = {};
const visibleArea = {};

/* 监听 触发popover的事件 hover click */
export function installPopoverDirective(app: any, appSettings: any) {
	const appId = _.genId("appId");
	appAddPlugin[appId] = appSettings.appPlugins;
	appDependState[appId] = appSettings.dependState;

	app.directive("uiPopover", {
		mounted(el: HTMLInputElement, binding) {
			const followId = _.genId("xPopoverTarget");
			$(el).addClass("x-ui-popover").attr("id", followId);
			el.dataset["followId"] = followId;
			el.dataset["appId"] = appId;

			if (binding.value) {
				popverOptionsCollection[followId] = binding.value;
			}
		},
		unmounted(el: HTMLInputElement) {
			const followId: string = el.dataset["followId"];
			LayerUtils.close(popverIndexCollection[followId]);
			delete popverOptionsCollection[followId];
			delete popverIndexCollection[followId];
		}
	});
}

/* listener */
$(document).on("click.uiPopver", "[data-follow-id]", function (event) {
	const ele: HTMLInputElement = this;
	const followId = ele.dataset["followId"];
	const appId = ele.dataset["appId"];
	const popverOptions = popverOptionsCollection[followId];
	/* TODO: */
	// new Popover(ele, popverOptions);
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
		LayerUtils.close(popverIndexCollection[followId]);
		delete popverIndexCollection[followId];
	}, TIMEOUT_DELAY);
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
	/* onlyEllipsis,content */
	if (!options.content) {
		/* 是不是需要判断内容有省略号 */
		if (options.onlyEllipsis) {
			const $ele = $(this);
			const eleWidth = $ele.width();
			const text = $ele.text();
			const $div = $(
				`<span style="opacity: 0;height: 0;letter-spacing: normal;">${text}</span>`
			);
			$div.appendTo($("body"));
			const innerWidth = $div.width();
			$div.remove();
			if (innerWidth > eleWidth) {
				options.content = text;
			}
		}
		return;
	}
	let app;
	let tipsContent = options.content;
	let layerTipsOptions = {
		tips: [LayerUtils.UP, "#fff"],
		/*hover 不允许 同时多个 tips出现*/
		/*tipsMore: false,*/
		time: 1000 * 60 * 10
	};
	/* TODO:目前只考虑vue组件对象 */
	if (_.isPlainObject(options.content)) {
		const id = `${followId}_content`;
		/* 桩 */
		tipsContent = `<div id="${id}"></div>`;
		layerTipsOptions.success = function success(indexPanel, layerIndex) {
			app = createApp(options.content);
			app.use(appAddPlugin[appId], { dependState: appDependState[appId] });
			app.mount(`#${id}`);
			options.afterOpenDialoag && options.afterOpenDialoag(app);
		};
		layerTipsOptions.end = function end() {
			if (app) {
				app.unmount();
				app = null;
			}
		};
	}

	if (options.delay) {
		setTimeout(() => {
			/* 如果delay之后还存在，再展示 */
			if (visibleArea[followId]) {
				popverIndexCollection[followId] = LayerUtils.tips(
					tipsContent,
					`#${followId}`,
					layerTipsOptions
				);
			}
		}, options.delay);
	} else {
		/* 立即展示 */
		popverIndexCollection[followId] = LayerUtils.tips(
			tipsContent,
			`#${followId}`,
			layerTipsOptions
		);
	}
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
