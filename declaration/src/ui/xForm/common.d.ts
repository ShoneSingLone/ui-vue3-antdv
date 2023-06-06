import { t_itemConfigs } from "./itemRenders";
export declare function defFormConfigs(configs: t_itemConfigs[]): Record<string, any>;
export declare function defItem(options: t_itemConfigs): {
    [x: number]: any;
};
export declare namespace defItem {
    var item: (options: t_itemConfigs) => any;
    var labelWithTips: ({ label, tips, icon }: {
        label: any;
        tips: any;
        icon: any;
    }) => JSX.Element;
}
/***
 * jsx中简化xItem的数据绑定
 * 要求configs中固定data dataXItem字段，默认对应value和XItem的配置项
 * @param configs
 * @param prop
 * @param options:可以修改默认值
 */
export declare function vModel(configs: any, prop: any, options?: {
    data: string;
    dataXItem: string;
}): {
    value: any;
    configs: any;
    "onUpdate:modelValue"(e: any): void;
};
/***
 * prop to {
        dataIndex: prop,
        prop: prop,
        key: prop
    }
 * @param prop
 */
export declare function antColKey(prop: any, makeRenderCell: any): {
    dataIndex: any;
    prop: any;
    key: any;
};
