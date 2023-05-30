export declare const DemoAndCode: import("vue").DefineComponent<Readonly<{
    title?: any;
    path?: any;
}>, unknown, {
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
}>;
