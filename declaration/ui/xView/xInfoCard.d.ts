import "./xInfoCard.less";
export declare const InfoCardCol: import("vue").DefineComponent<Readonly<{
    col?: any;
}>, unknown, unknown, {
    isHide(): any;
    styleLabel(): {};
    vDomLabel(): any;
    vDomContent(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    col?: any;
}>>>, {
    readonly col?: any;
}>;
export declare const InfoCardRow: import("vue").DefineComponent<Readonly<{
    row?: any;
}>, unknown, unknown, {
    colArray(): any;
    vDomCol(): JSX.Element[];
    styleRow(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    row?: any;
}>>>, {
    readonly row?: any;
}>;
export declare const xInfoCard: import("vue").DefineComponent<Readonly<{
    title?: any;
    info?: any;
}>, unknown, unknown, {
    id(): string;
    colLabelWidth(): any;
    rowArray(): any;
    vDomTitle(): JSX.Element;
    vDomDescriptions(): any;
}, {
    updateLableStyle(styleObject: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    title?: any;
    info?: any;
}>>>, {
    readonly title?: any;
    readonly info?: any;
}>;
