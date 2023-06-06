import { InputProps, TextAreaProps } from "ant-design-vue";
declare const itemRenders: {
    Input: import("vue").DefineComponent<Readonly<{
        slots?: any;
        properties?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>, unknown, {
        oldComponent: string;
        ComponentInstance: string;
        _modelValue: string;
    }, {
        component({ properties }: {
            properties: any;
        }): any;
    }, {
        diffComponent(type: any): any;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
        slots?: any;
        properties?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>>>, {
        readonly slots?: any;
        readonly properties?: any;
        readonly listeners?: any;
        readonly propsWillDeleteFromConfigs?: any;
    }, {}>;
    Checkbox: any;
    Select: any;
    Switch: any;
    DatePicker: any;
    RangePicker: any;
    RadioGroup: any;
    CheckboxGroup: any;
};
export default itemRenders;
export type t_xItem = keyof typeof itemRenders;
export type t_itemConfigs = {
    style?: any;
    label?: string | Function | JSX.Element;
    isShow?: boolean | Function;
    rules?: any[];
    options?: any[];
    itemType?: t_xItem | Function;
    once?: Function;
    placeholder?: string;
    value: any;
    defaultValue?: any;
    max?: number;
    isReadonly?: boolean;
    isPassword?: boolean;
    isNumber?: boolean;
    isTextarea?: boolean;
    isSearch?: boolean;
    prop: string;
    onAfterValueEmit?: Function;
} | InputProps | TextAreaProps;
