/// <reference types="jquery" />
/// <reference types="jquery" />
import { i_layerOptions } from "./i_layerOptions";
export declare const KEY: {
    right: number;
    left: number;
    esc: number;
};
export declare const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
export declare const DATA_V_UI_MOVE = "data-directive-ui-move";
export declare const $MoveMask: JQuery;
export declare const READY: {
    zIndex: number;
    moveOrResizeInstance: any;
    moveOrResizeWH: any[];
    moveOrResizeType: "resize" | "move";
    pointMousedown: number[];
    basePath: string;
};
declare const LayerUtils: {
    setZIndex(zIndex: number): void;
    MSG: number;
    DIALOG: number;
    IFRAME: number;
    LOADING: number;
    TIPS: number;
    UP: number;
    RIGHT: number;
    BOTTOM: number;
    LEFT: number;
    v: string;
    ie: number;
    path: string;
    config: (options: i_layerOptions, fn: any) => any;
    open(options: i_layerOptions): number;
    alert(content: any, options: any, yes: any): number;
    confirm(content: any, options: any, yes: any, cancel: any): number;
    msg(content: any, options: i_layerOptions, end?: () => any): number;
    load(icon: any, options: any): number;
    tips(content: any, followSelector: any, options: any): number;
    close(layerKey: string): Promise<unknown>;
    getChildFrame(selector: any, index: any): JQuery<any>;
    getFrameIndex(name: any): string;
    iframeAuto(index: any): void;
    iframeSrc(index: any, url: any): void;
    style(index: any, options: any, limit: any): void;
    min(index: any, options: any): void;
    restore(index: any): void;
    full(index: any): void;
    title(name: any, layerKey: any): void;
    closeAll(type: string): Promise<any[]>;
    setLayerTop($current: JQuery): void;
};
export { LayerUtils as LayerUtils };
