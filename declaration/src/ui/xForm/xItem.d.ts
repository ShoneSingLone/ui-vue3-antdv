export declare const xItem: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
        default: any;
    };
    configs: {
        type: ObjectConstructor;
        default(): {};
    };
}, {
    Cpt_isShowXItem: any;
    Cpt_isDisabled: any;
}, {
    rerenderCount: number;
    isRequired: boolean;
    properties: any;
    itemSlots: {};
    listeners: {
        "onUpdate:value": (val: any) => void;
        onValidateForm: () => void;
        onChange: () => void;
        onInput: () => void;
        onBlur: () => void;
        onFocus: () => void;
    };
    propsWillDeleteFromConfigs: unknown[];
}, {
    CurrentXItem(): any;
    itemTypeName(): string;
    isChecking(): boolean;
    FormItemId(): string;
    itemTips(): {
        type: any;
        msg: any;
    };
    itemWrapperClass(): string;
    tipsVNode(): any;
    labelVNode(): any;
}, {
    updateValueSync(): Promise<void>;
    setTips(type?: string, msg?: string): void;
    setItemSlots(): void;
    setValidateInfo(rules: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
        default: any;
    };
    configs: {
        type: ObjectConstructor;
        default(): {};
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    configs: Record<string, any>;
    modelValue: string | number | boolean | Record<string, any>;
}, {}>;
