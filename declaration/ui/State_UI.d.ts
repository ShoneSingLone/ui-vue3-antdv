import "dayjs/locale/zh-cn";
import "dayjs/locale/en-au";
export declare function $t(prop: string | number, payload?: {}, i18nMessage?: boolean): {
    label: string | number;
    prop: string | number;
};
declare let _State_UI: {
    xItemCollection: {};
    pagination: {
        page: string;
        size: string;
        total: string;
    };
    language: any;
    onLanguageChange: boolean;
    LANGUAGE: {
        enUs: import("ant-design-vue/es/locale-provider/index").Locale;
        zhCn: import("ant-design-vue/es/locale-provider/index").Locale;
    };
    i18nMessage: {};
    assetsSvgPath: string;
    assetsPath: string;
    bashPath: string;
    setAssetsBaseById(eleId: string): void;
    $t: typeof $t;
    isDev: boolean;
    dev(isDev: any): void;
};
type t_State_UI = typeof _State_UI;
export declare const State_UI: t_State_UI;
export declare const Cpt_UI_locale: import("vue").ComputedRef<any>;
export {};
