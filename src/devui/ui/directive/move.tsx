import { xU } from "../ventoseUtils";
import $ from "jquery";
import { $MoveMask, DATA_V_UI_MOVE, READY } from "../xSingle/layer/LayerUtils";
import { payloadCollections } from "./directiveState";

/* 监听 触发popover的事件 hover click */
export function installMoveDirective(app: any) {
	app.directive("uiMove", {
		/* @ts-ignore */
		mounted(el: HTMLInputElement, binding) {
			if (binding.value) {
				if (binding.value.onMoving) {
					const $ele = $(el);
					const id = xU.genId("xResize");
					$ele.attr(DATA_V_UI_MOVE, id);

					$ele.on("mousedown", function (event) {
						$MoveMask.css("cursor", "move").show();
						const clickInfo: any = xU.getLeftTopFromAbsolute($ele);
						clickInfo.w = $ele.width();
						clickInfo.h = $ele.height();
						/* @ts-ignore */
						const { top, left } = xU.getLeftTopFromTranslate($ele);
						clickInfo.translateX = left;
						clickInfo.translateY = top;
						/* @ts-ignore */
						READY.onMoving = movingEvent => {
							binding.value.onMoving({
								$ele,
								clickInfo,
								clickEvent: event,
								movingEvent
							});
						};
					});
				}
			}
		},
		unmounted(el: HTMLInputElement) {
			const $ele = $(el);
			const id: any = $ele.attr(DATA_V_UI_MOVE);
			delete payloadCollections[id];
		}
	});
}
