export declare const getValueNeedVarify: ({ value, xItemConfigs }: any) => any;
export declare const EVENT_TYPE: {
    validateForm: string;
    update: string;
    change: string;
    input: string;
    blur: string;
    focus: string;
};
export declare const TIPS_TYPE: {
    success: string;
    error: string;
};
export declare function validateItem(idSelector: any): Promise<void>;
/**
 * 单独调用校验表单的方法:可以附加valuesCollection，以valuesCollection提供的prop为基准进行校验
 * 需要提供 configsForm 包含各个xItem configs
 * 有value 有rules => configs有validate属性（判断有rules就动态添加validate方法）
 * @param {*} configsForm
 * @returns
 */
export declare function validateForm(configsForm: any, valuesCollection?: Object): Promise<any>;
/**
 * 没有错误信息则校验通过
 * @param {*} res
 * @returns
 */
export declare const AllWasWell: (res: any) => boolean;
export declare const checkXItem: ({ xItemConfigs, fnCheckedCallback, value, FormItemId, resolve }: any) => Promise<any>;
