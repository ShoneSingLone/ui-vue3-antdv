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
    State_UI: any;
}, {
    pageSizeOptions: string[];
    page: any;
    size: any;
    total: any;
}, {
    i18nMessage(): any;
}, {
    onShowSizeChange: any;
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
}, {}>;
