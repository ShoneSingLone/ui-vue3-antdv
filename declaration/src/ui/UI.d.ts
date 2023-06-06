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
    message: import("ant-design-vue/lib/message/index.js").MessageApi;
    notification: import("ant-design-vue/lib/notification/index.js").NotificationApi;
    layer: any;
};
