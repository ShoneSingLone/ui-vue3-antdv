import { xU } from "../ventoseUtils";
import $ from "jquery"
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
                    $ele.attr(DATA_V_UI_MOVE, id)

                    $ele.on("mousedown", function (event) {
                        READY.onMoving = (movingEvent) => {
                            binding.value.onMoving({ $ele, clickEvent: event, movingEvent })
                        };
                        $MoveMask.css("cursor", "move").show();
                    })
                }
            }

        },
        unmounted(el: HTMLInputElement) {
            const $ele = $(el);
            const id = $ele.attr(DATA_V_UI_MOVE);
            delete payloadCollections[id]
        }
    });
}