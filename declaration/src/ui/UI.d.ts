/// <reference types="jquery" />
import { t_dialogOptions } from "./xSingle/dialog/dialog";
import { ModalFuncProps } from "ant-design-vue";
export declare const UI: {
    confirm(options: any): void;
    dialog: {
        component: (options: t_dialogOptions) => Promise<any>;
        success: ({ title, content }: {
            title?: string;
            content?: string;
        }) => Promise<unknown>;
        info: ({ title, content }: {
            title?: string;
            content?: string;
        }) => Promise<unknown>;
        error: ({ title, content }: {
            title?: string;
            content?: string;
        }) => Promise<unknown>;
        warning: ({ title, content }: {
            title?: string;
            content?: string;
        }) => Promise<unknown>;
        confirm: (options: ModalFuncProps) => Promise<unknown>;
        delete({ title, content }?: {
            title: any;
            content: any;
        }): Promise<unknown>;
    };
    message: import("ant-design-vue/lib/message/index").MessageApi;
    notification: import("ant-design-vue/lib/notification/index").NotificationApi;
    layer: {
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
        config: (options: import("./xSingle/layer/i_layerOptions").i_layerOptions, fn: any) => any;
        open(options: import("./xSingle/layer/i_layerOptions").i_layerOptions): number;
        alert(content: any, options: any, yes: any): number;
        confirm(content: any, options: any, yes: any, cancel: any): number;
        msg(content: any, options: import("./xSingle/layer/i_layerOptions").i_layerOptions, end?: () => any): number;
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
        setLayerTop($current: JQuery<HTMLElement>): void;
    };
};
