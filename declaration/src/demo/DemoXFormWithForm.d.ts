export declare const DemoXFormWithForm: import("vue").DefineComponent<{
    options: {
        type: ObjectConstructor;
        default(): {};
    };
}, unknown, {
    tips1: string;
    styleForm: {
        width: string;
        "text-align": string;
    };
    row: any;
    dataXItem: {
        [x: string]: {
            prop: string;
            itemTips: {
                type: string;
                msg: string;
            };
        } & import("../ui/xForm/itemRenders/index").t_itemConfigs;
    };
}, {}, {
    verifyForm(): Promise<boolean>;
    getParams(): any;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: ObjectConstructor;
        default(): {};
    };
}>>, {
    options: Record<string, any>;
}, {}>;
