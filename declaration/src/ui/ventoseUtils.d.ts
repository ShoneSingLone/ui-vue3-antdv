/// <reference types="jquery" />
/// <reference types="jquery" />
import { LoDashStatic } from "lodash";
import dayjs from "dayjs";
export declare const isInput: (val: any) => boolean;
declare const privateLodash: {
    WORDS: {
        INVALID_DATE: string;
        format_ymd: string;
    };
    scopeCss(vm: any, genCssStringFn: any): void;
    launchFullscreen(element: any): void;
    exitFullscreen(): void;
    hashCode(str: string): string;
    getLeftTopFromAbsolute($ele: JQuery): {
        top: number;
        left: number;
    };
    getLeftTopFromTranslate($ele: JQuery): {
        top: number;
        left: number;
    };
    /**
     * 用于Boundless 解析vue SFC文件
     * @param {*} code
     * @returns
     */
    asyncImportSFC(url: string, __Vue: object): Promise<object>;
    getVueComponentBySourceCode(url: string, scfObjSourceCode: string, __Vue: object): Promise<object>;
    parseContent: (returnSentence: string) => any;
    payloadIdCount: number;
    payloadIdCountMax: number;
    payloadDateNow: number;
    genId: (category: string) => string;
    VueLoader: (code: string) => string;
    /**
     * async 执行jsx module 文件
     * @param {*} url
     */
    asyncExecFnString(url: string): Promise<any>;
    doNothing: (...args: any[]) => void;
    sleep: (t: number) => Promise<unknown>;
    isOn: (key: string) => boolean;
    isModelListener: (key: string) => boolean;
    isListener: (key: any) => boolean;
    isArrayFill: (arr: any) => boolean;
    isObjectFill: (obj: any) => boolean;
    /***
     * 返回数组的第一个value，
     * 通过check,
     * 为真则返回value,
     * 否则返回false,
     * 默认check为 xU.isInput
     * @param arr
     * @param fnCheck
     * @return {firstValue|false}
     */
    safeFirst: (arr: any[], fnCheck: Function) => any;
    /***
     *
     * @param val
     * @param isBeautiful
     * @return {string}
     */
    safeToString: (val: object, isBeautiful?: boolean) => string;
    safeParse: (val: string, defaultObj: {}) => {};
    safeSplit: (target: string, sp?: string) => string[];
    /***
     * dayjs对象或者""
     * @param val
     * @return {string|dayjs.Dayjs}
     */
    safeDate: (val: dayjs.ConfigType) => "" | dayjs.Dayjs;
    /***
     * false 0 都算已输入
     * @param val {any}
     * @returns {boolean}
     */
    isInput: (val: any) => boolean;
    is$Selected: ($ele: JQuery) => boolean;
    /**
     * 获取对象的键和值
     * 这个方法很灵性，有时候后面来的结构长这样 {id:value}，有且只有一个属性，
     * 但凡写个Interface 规定数据长这样，通用性都更好
     * [{
     *      prop:'id',
     *      value:'12345',
     *      label:'唯一标识符'
     * }]
     * @param {*} obj
     * @param {*} defaultValue
     * @returns
     */
    getObjectFirstKeyValue: (obj: object, defaultValue: "") => any;
    /**
     *
     * @param {*} cssname
     * @returns
     */
    loadCss(cssname: string): () => void;
    asyncLoadStyle(cssURL: string, options?: object): Promise<void>;
    /**
     *
     * @param {*} url
     * @returns
     */
    asyncLoadText: (url: string) => Promise<any>;
    /**
     * 异步加载js 在window中名为globalName的全局变量
     * @param {string} url
     * @param {string} globalName
     * @returns 在window中名为globalName的全局变量
     */
    asyncLoadJS: (url: string, globalName: string) => Promise<unknown>;
    asyncGlobalJS: (globalName: string, url: string) => Promise<any>;
    ensureValueDone: (fnGetValue: Function) => Promise<unknown>;
    genProp: (someString: string) => string;
    /**
     *
     * @param date type dayjs.ConfigType = string | number | Date | dayjs.Dayjs | null | undefined
     * @param format 默认 "YYYY-MM-DD" 1："YYYY-MM-DD HH:mm:ss"
     * @returns
     */
    dateFormat: (date: dayjs.ConfigType, format?: string | 1) => string;
    keepDecimals: (val: number, fractionDigits: 2) => string;
    valueToLabel: (value: string, options: any[]) => any;
    timego: (timestamp: any) => string;
    htmlFilter: (html: string) => string;
    /**
     * 对object set 或 get 属性值，保证不会undefined
     * MutatingProps(state,"user.role.public",false);
     * @param item
     * @param prop
     * @param val
     * @returns
     */
    MutatingProps: (item: any, prop: string, val?: any, isDelete?: boolean) => any;
};
type xUFunction = (...args: any[]) => void;
type t_all_lodash_and_mine = xUFunction & LoDashStatic & typeof privateLodash;
export declare const xU: t_all_lodash_and_mine;
export {};
