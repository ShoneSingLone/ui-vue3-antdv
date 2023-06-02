import { t_rowPayload } from "./xVirTableBody";
type t_selectedConfigs = {
    type: keyof typeof defXVirTableConfigs.type;
    prop: string;
    isDisabled?: Function;
    isSelect?: Function;
};
type t_defXVirTableConfigs = {
    queryTableList?: Function;
    selectedConfigs?: t_selectedConfigs;
    selected?: [];
    rowHeight: number;
    dataSource: any[];
    columns: object;
    onClickRow?: (payload: t_rowPayload) => void;
    getSelectedRow?: Function;
};
export declare function defXVirTableConfigs(options: t_defXVirTableConfigs): t_defXVirTableConfigs;
export declare namespace defXVirTableConfigs {
    var type: {
        many: string;
        one: string;
    };
}
/**
 * 展示列的顺序
 */
export declare const xVirTable: import("vue").DefineComponent<Readonly<{
    configs?: any;
    uniqBy?: any;
}>, void, {
    styleWidthXVirTable: number;
    styleWidthOperation: string;
    selectedAll: boolean;
}, {
    selectedIndeterminate(): boolean;
    selected(): any;
    selectedType(): any;
    selectedProp(): any;
    selectedBy(): any;
    customClass(): any;
    rowHeight(): any;
    xVirTableId(): string;
    columnOrder(): any;
    columnWidthStyleArray(): string[];
    vDomTheadSelect(): JSX.Element;
    vDomThead(): JSX.Element;
    styleContent(): string;
}, {
    resetColumnWidth(contentWrapperWidth: any): void;
    onBodyScroll(left: any): void;
    resetOperationWidth(): void;
    layout(): void;
    initStyle(): void;
    updateStyle(styleContent: string): void;
    handleSelectedChange(): void;
    handleSelectedChangeTh(e: any): void;
    handleSelectedChangeTd({ id }: {
        id: any;
    }): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    configs?: any;
    uniqBy?: any;
}>>>, {
    readonly configs?: any;
    readonly uniqBy?: any;
}, {}>;
export {};
