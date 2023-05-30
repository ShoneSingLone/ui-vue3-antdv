import { InputProps, TextAreaProps } from "ant-design-vue";
declare const itemRenders: {
    Input: import("vue").DefineComponent<Readonly<{
        properties?: any;
        slots?: any;
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
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>>>, {
        readonly properties?: any;
        readonly slots?: any;
        readonly listeners?: any;
        readonly propsWillDeleteFromConfigs?: any;
    }>;
    Checkbox: import("vue").DefineComponent<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>, any, any, {
        checked: {
            get(): any;
            set(val: any): void;
        };
    }, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>>>, {
        readonly properties?: any;
        readonly slots?: any;
        readonly listeners?: any;
        readonly propsWillDeleteFromConfigs?: any;
    }>;
    Select: import("vue").DefineComponent<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>, unknown, {
        _modelValue: string;
    }, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>>>, {
        readonly properties?: any;
        readonly slots?: any;
        readonly listeners?: any;
        readonly propsWillDeleteFromConfigs?: any;
    }>;
    Switch: import("vue").DefineComponent<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>, unknown, {
        _modelValue: string;
    }, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
        properties?: any;
        slots?: any;
        listeners?: any;
        propsWillDeleteFromConfigs?: any;
    }>>>, {
        readonly properties?: any;
        readonly slots?: any;
        readonly listeners?: any;
        readonly propsWillDeleteFromConfigs?: any;
    }>;
    DatePicker: ({ properties, slots, listeners }: any) => any;
    RangePicker: ({ properties, slots, listeners }: any) => any;
    RadioGroup: ({ properties, slots, listeners, propsWillDeleteFromConfigs }: any) => any;
    CheckboxGroup: ({ properties, slots, listeners }: any) => any;
};
export default itemRenders;
export declare type t_xItem = keyof typeof itemRenders;
export declare type t_itemConfigs = {
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
