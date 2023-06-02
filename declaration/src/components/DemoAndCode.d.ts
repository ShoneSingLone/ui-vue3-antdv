export declare const DemoAndCode: import("vue").DefineComponent<Readonly<{
    title?: any;
    path?: any;
}>, {
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
        basePath: string;
        setBasePath(basePath: any): void;
        setAssetsBaseById(eleId: string): void;
        $t: typeof import("../ui").$t;
        isDev: boolean;
        dev(isDev: any): void;
    };
}, {
    isInitDone: boolean;
    isFold: boolean;
    isLoading: boolean;
    BussinessComponent: boolean;
    BussinessComponentSourceCode: string;
}, {
    sfcURL(): string;
    styleContainer(): {
        position: string;
        overflow: string;
        height: string;
    };
}, {
    toggleFold(): void;
    rerun(scfObjSourceCode: any): Promise<void>;
    getBussinessComponent(): Promise<void>;
    showSourceCodeDialog(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    title?: any;
    path?: any;
}>>>, {
    readonly title?: any;
    readonly path?: any;
}, {}>;
