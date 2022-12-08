//@ts-nocheck
import $ from "jquery";
import { LayerUtils, DATA_TIPS_FOLLOW_ID } from "./layer/LayerUtils";
import { i_layerOptions } from "./layer/i_layerOptions";
import { vUtils } from "../ventoseUtils";
import { createApp } from "vue";
type t_trigger = "click" | "rightClick";
type t_uiPopoverOptions = {
	content: string;
	onlyEllipsis?: Boolean;
};

const TIMEOUT_DELAY = 200;
/* 缓存 popover 的配置信息 */
const tipsOptionsCollection: {
	[prop: string]: t_uiPopoverOptions;
} = {};
/**/
const tipsKeys: {
	[prop: string]: Number;
} = {};
const appAddPlugin: any = {};
const appDependState: any = {};
const timer4CloseTips: any = {};
const visibleArea: any = {};

const DATA_APP_ID = "data-app-id";
const DATA_FOLLOW_ID = "data-follow-id";

function fnShowTips({ $ele, followId, appId, event }: any) {
	const options = tipsOptionsCollection[followId] || { content: "" };
	/* onlyEllipsis,content */
	if (!options.content) {
		/* 是不是需要判断内容有省略号 */
		if (options.onlyEllipsis) {
			const eleWidth = $ele.width() || 0;
			const text = $ele.text();
			const $div = $(
				`<span style="position:fixed;top:0;left:0;opacity: 0;height: 0;letter-spacing: normal;">${text}</span>`
			);
			$div.appendTo($("body"));
			const innerWidth = $div.width() || 0;
			$div.remove();
			if (innerWidth > eleWidth) {
				options.content = text;
			}
		} else {
			return;
		}
	}
	let tipsContent = options.content;
	if (!tipsContent) {
		/* 如果仍然没有内容，那就不弹窗 */
		return;
	}
	let app: any;

	const placement = (() => {
		const placement_strategy = {
			top: 1,
			right: 2,
			bottom: 3,
			left: 4
		};
		return placement_strategy[options.placement || "top"];
	})();
	let layerTipsOptions: i_layerOptions = {
		tips: [placement, "#fff"],
		/*hover 不允许 同时多个 tips出现*/
		/*tipsMore: false,*/
		during: 1000 * 60 * 10
	};

	const isOpenAtPoint = $ele.attr("data-open-at-point");
	if (isOpenAtPoint) {
		layerTipsOptions.openAtPoint = {
			left: $ele.clientX,
			top: $ele.clientY
		};
	}

	/* TODO:目前只考虑vue组件对象 */
	if (vUtils.isPlainObject(options.content)) {
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

	setTimeout(() => {
		if (visibleArea[followId]) {
			tipsKeys[followId] = LayerUtils.tips(
				tipsContent,
				`#${followId}`,
				layerTipsOptions
			);
		}
		/* 如果delay之后还存在，再展示 */
	}, options.delay || 32);
}

/* 监听 触发popover的事件 hover click */
export function installPopoverDirective(app: any, appSettings: any) {
	const appId = vUtils.genId("appId");
	appAddPlugin[appId] = appSettings.appPlugins;
	appDependState[appId] = appSettings.dependState;

	app.directive("uiPopover", {
		mounted(el: HTMLInputElement, binding) {
			const followId = vUtils.genId("xPopoverTarget");
			const $ele = $(el);
			$ele
				.addClass("x-ui-popover")
				.attr("id", followId)
				.attr(DATA_APP_ID, appId)
				.attr(DATA_FOLLOW_ID, followId);
			if (binding.value) {
				tipsOptionsCollection[followId] = binding.value;
				if (binding.value?.trigger) {
					$ele.attr("data-trigger", binding.value?.trigger);
					const classStrategy = {
						rightClick: "pointer-right-click"
					};
					$ele.addClass(classStrategy[binding.value?.trigger] || "pointer");
				}
				/* 弹窗在click的点 */
				if (binding.value?.openAtPoint) {
					$ele.attr("data-open-at-point", true);
				}
			}
		},
		unmounted(el: HTMLInputElement) {
			const followId: any = $(el).attr(DATA_FOLLOW_ID);
			LayerUtils.close(tipsKeys[followId] as number);
			delete tipsOptionsCollection[followId];
			delete visibleArea[followId];
		}
	});
}

function inVisibleArea(followId: string) {
	/*不关闭，取消定时器*/
	if (timer4CloseTips[followId]) {
		clearTimeout(timer4CloseTips[followId]);
		delete timer4CloseTips[followId];
	}
	visibleArea[followId] = true;
}

function closeTips(followId: string, options = {}) {
	delete visibleArea[followId];
	timer4CloseTips[followId] = setTimeout(() => {
		const layerIndex = tipsKeys[followId];
		if (layerIndex) {
			LayerUtils.close(layerIndex).then(() => {
				delete tipsKeys[followId];
				delete timer4CloseTips[followId];
			});
		}
	}, TIMEOUT_DELAY);
}

/* listener */

function handleClick(event) {
	event.preventDefault();
	const $ele: any = $(this);
	const followId = $ele.attr(DATA_FOLLOW_ID);
	const appId = $ele.attr(DATA_APP_ID);
	visibleArea[followId] = true;
	if (tipsKeys[followId]) {
		closeTips(followId);
	} else {
		fnShowTips({ $ele, followId, appId, event });
	}
}

/* 鼠标click处理 */
/* 左键单击 */
$(document).on(
	"click.uiPopver",
	`[${DATA_FOLLOW_ID}][data-trigger=click]`,
	handleClick
);
/* 右键单击 */
$(document).on(
	"contextmenu.uiPopver",
	`[${DATA_FOLLOW_ID}][data-trigger=rightClick]`,
	handleClick
);

/* 鼠标hover处理 */
$(document).on("mouseenter.uiPopver", `[${DATA_FOLLOW_ID}]`, function (event) {
	const $ele: any = $(this);
	const followId = $ele.attr(DATA_FOLLOW_ID);
	if (visibleArea[followId]) {
		return;
	} else {
		const appId = $ele.attr(DATA_APP_ID);
		inVisibleArea(followId);
		/*如果存在，不重复添加*/
		if (tipsKeys[followId]) {
			return;
		}

		if (($ele.attr("data-trigger") as t_trigger) === "click") {
			return;
		}
		if (($ele.attr("data-trigger") as t_trigger) === "rightClick") {
			return;
		}

		fnShowTips({ $ele, followId, appId, event });
	}
});

$(document).on("mouseleave.uiPopver", `[${DATA_FOLLOW_ID}]`, function (event) {
	const followId = $(this).attr(DATA_FOLLOW_ID);
	/*如果鼠标又移动到TIPS范围内，则不close*/
	closeTips(followId);
});

/*
 * 鼠标滑动到弹出的tips上，
 * 不关闭附着的tips
 */
$(document).on(
	"mouseenter.uiPopverTips",
	`[${DATA_TIPS_FOLLOW_ID}]`,
	function (event) {
		const followId = $(this).attr(DATA_TIPS_FOLLOW_ID);
		inVisibleArea(followId);
	}
);

$(document).on(
	"mouseleave.uiPopverTips",
	`[${DATA_TIPS_FOLLOW_ID}]`,
	function (event) {
		const followId = $(this).attr(DATA_TIPS_FOLLOW_ID);
		/*如果鼠标又移动到TIPS范围内，则不close*/
		closeTips(followId as string);
	}
);
