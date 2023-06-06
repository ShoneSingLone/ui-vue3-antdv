export type t_rowPayload = {
    rowIndex: number;
    rowData: object;
};
export declare const xVirTableBody: import("vue").DefineComponent<Readonly<{
    selected?: any;
    rowHeight?: any;
    columns?: any;
    columnOrder?: any;
    selectedConfigs?: any;
}>, {
    uniqBy: unknown;
    configs: unknown;
    rowCache: {};
    fnObserveDomResize: any;
    fnUnobserveDomResize: any;
}, {
    isLoading: boolean;
    perBlockHeight: number;
    perBlockRowCount: number;
    blockInViewCount: number;
    styleWrapperAll: {
        height: number;
        position: string;
    };
    virs1: any[];
    virs2: any[];
    virs3: any[];
}, {
    fnIsSelected(): (rowInfo: any) => any;
    fnIsDisabled(): (...args: any[]) => any;
    positionBlock(): number;
    styleWrapper1(): string;
    styleWrapper2(): string;
    styleWrapper3(): string;
    vDomBodyTr1(): any;
    vDomBodyTr2(): any;
    vDomBodyTr3(): any;
}, {
    clearCacheRow(): void;
    onClickRow(payload: t_rowPayload): void;
    genTr(rows: any): any;
    updateCell(): void;
    setVirs1(): void;
    setVirs2(): void;
    setVirs3(): void;
    fragment(start: number, end: number): any;
    genSelectedVDom(rowInfo: any): JSX.Element;
    emitSelectedChange(checked: any, id: any): void;
    setTop: any;
    updateTop(event: any): void;
    setHeight(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("scroll" | "selectedChange" | "update:scrollHeight")[], "scroll" | "selectedChange" | "update:scrollHeight", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    selected?: any;
    rowHeight?: any;
    columns?: any;
    columnOrder?: any;
    selectedConfigs?: any;
}>>> & {
    onScroll?: (...args: any[]) => any;
    onSelectedChange?: (...args: any[]) => any;
    "onUpdate:scrollHeight"?: (...args: any[]) => any;
}, {
    readonly selected?: any;
    readonly rowHeight?: any;
    readonly columns?: any;
    readonly columnOrder?: any;
    readonly selectedConfigs?: any;
}, {}>;
