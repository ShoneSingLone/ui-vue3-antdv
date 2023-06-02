export declare const xVirTableTd: import("vue").DefineComponent<Readonly<{
    data?: any;
    column?: any;
}>, {
    configs: unknown;
}, {
    isFocus: boolean;
    count: number;
}, {
    record(): any;
    id(): string;
    prop(): any;
    cell(): any;
    renderEditor(): any;
    renderCell(): any;
}, {
    handleAllCell(e: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:data"[], "update:data", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    data?: any;
    column?: any;
}>>> & {
    "onUpdate:data"?: (...args: any[]) => any;
}, {
    readonly data?: any;
    readonly column?: any;
}, {}>;
