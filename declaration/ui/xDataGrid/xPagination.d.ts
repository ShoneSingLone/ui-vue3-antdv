/// <reference types="lodash" />
export declare const xPagination: import("vue").DefineComponent<{
    onPaginationChange: {
        type: FunctionConstructor;
        default: boolean;
    };
    pagination: {
        type: ObjectConstructor;
        default(): {};
    };
}, {
    State_UI: {
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
        $t: typeof import("../State_UI").$t;
        isDev: boolean;
        dev(isDev: any): void;
    };
}, {
    pageSizeOptions: string[];
    page: string;
    size: string;
    total: string;
}, {
    i18nMessage(): any;
}, {
    onShowSizeChange: import("lodash").DebouncedFunc<(page: any, size: any) => void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    onPaginationChange: {
        type: FunctionConstructor;
        default: boolean;
    };
    pagination: {
        type: ObjectConstructor;
        default(): {};
    };
}>>, {
    pagination: Record<string, any>;
    onPaginationChange: Function;
}>;
