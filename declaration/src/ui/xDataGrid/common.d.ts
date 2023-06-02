import { t_buttonOptions } from "../xButton/xButton";
import { ColumnProps } from "ant-design-vue/es/table";
export declare const STATIC_WORD: {
    OPERATION: string;
    NEXT_TICK_TIME: number;
};
export type t_col = {
    prop: string;
    label: any;
    width?: string;
    minWidth?: string;
    isShow?: boolean;
    children?: t_col[];
    renderHeader?: Function;
    renderCell?: Function;
};
export type t_dataGridOptions = {
    isLoading?: boolean;
    queryTableList: Function;
    antTableProperty?: object;
    isHideQuery?: boolean;
    isHideRefresh?: boolean;
    isHideFilter?: boolean;
    isHidePagination?: boolean;
    pagination?: {
        page: number;
        size: number;
        total: number;
    };
    onPaginationChange?: Function;
    optionsConfigs?: {
        data: object;
        dataXItem: object;
    };
    dataSource: any[];
    isGroupingColumns?: boolean;
    columns: {
        [p: string]: t_col;
    };
};
/**
 * 如果没有queryTableList 则不会显示 query 和 refresh 按钮
 *
 *
 * @export
 * @param {t_dataGridOptions} options
 * @returns
 */
export declare function defDataGridOption(options: t_dataGridOptions): t_dataGridOptions;
export declare function defPagination(num_page?: number, num_size?: number, num_total?: number): {
    [x: string]: number;
};
/***
 *  设置xPagination
 * @param StateTable:鸭子类型StateTable必须有pagination属性
 * @param pagination 属性是page size total 根据appConfigs的pagination_map给pagination赋值
 */
export declare function setPagination(StateTable: any, pagination: t_pagination): void;
export declare function getPaginationPageSize(StateTable: any): {
    [x: string]: any;
};
export declare function defCol(options: t_col): {
    [x: string]: {
        key: string;
        title: any;
        dataIndex: string;
        prop: string;
        label: any;
        width?: string;
        minWidth?: string;
        isShow?: boolean;
        children?: t_col[];
        renderHeader?: Function;
        renderCell?: Function;
    };
};
export declare function defColAnt(options: any | ColumnProps): any;
export declare function defColActions(options: {
    renderCell: (args: {
        column: object;
        index: number;
        record: any;
        text: any;
        value: any;
    }) => JSX.Element;
}): {
    [x: string]: {
        key: string;
        title: any;
        dataIndex: string;
        prop: string;
        label: any;
        width?: string;
        minWidth?: string;
        isShow?: boolean;
        children?: t_col[];
        renderHeader?: Function;
        renderCell?: Function;
    };
};
export declare function defColActionsBtnlist(options: {
    fold: number;
    btns: t_buttonOptions[];
}): JSX.Element;
export declare function filterColIsShow(isShow: any, prop: any): boolean;
type t_result = {
    total?: false | number;
    selected?: string[] | false;
    data: any[];
};
/***
 * 设置xDataGrid的列表数据和总数
 * @param StateBind
 * @param result:{
    total?: false | number;
    selected?: string[] | false;
    data: any[];
}
 */
export declare function setDataGridInfo(StateBind: any, result?: t_result): void;
type t_pagination = {
    page: number;
    size: number;
    total: number;
};
export {};
