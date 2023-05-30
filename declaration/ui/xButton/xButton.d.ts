export declare type t_buttonOptions = {
    text?: any;
    onClick?: () => Promise<any>;
};
declare const _default: import("vue").DefineComponent<{
    payload: {
        type: ObjectConstructor;
        default(): {};
    };
    configs: {
        type: ObjectConstructor;
        default(): {};
    };
}, {
    Cpt_isShow: boolean;
}, {
    loading: boolean;
}, {
    isClickHandlerOnAttrs(): boolean;
    type(): any;
    title(): any;
    disabled(): any;
    text(): any;
}, {
    handleButtonClick(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    payload: {
        type: ObjectConstructor;
        default(): {};
    };
    configs: {
        type: ObjectConstructor;
        default(): {};
    };
}>>, {
    configs: Record<string, any>;
    payload: Record<string, any>;
}>;
export default _default;
