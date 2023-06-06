import "./index.less";
import "./ui.scss";
import "ant-design-vue/dist/antd.css";
import $ from "jquery";
import dayjs from "dayjs";
import { defXVirTableConfigs as defXVirTableConfigs } from "./xDataGrid/xVirTable/xVirTable";
import { xU } from "./ventoseUtils";
import { Cpt_UI_locale, State_UI, $t } from "./State_UI";
import { FormRules, RegexFn } from "./xForm/FormRules";
import { defCol, defColActions, defColActionsBtnlist, defDataGridOption, defPagination, getPaginationPageSize, setDataGridInfo, setPagination } from "./xDataGrid/common";
import { antColKey, defItem, defFormConfigs, vModel } from "./xForm/common";
import { UI } from "./UI";
import { AllWasWell, EVENT_TYPE, validateForm, validateItem, setCSSVariables, setDocumentTitle, lStorage, iStorage, pickValueFrom, resetValueOf, setValueTo, VNodeCollection, newReactiveState, compileVNode } from "./tools";
export declare const compositionAPI: {
    usefnObserveDomResize: any;
    useScopeStyle: any;
};
export declare const components: {
    xButton: any;
    xRender: (props: Record<string, any> & {}) => any;
    xItem: any;
    xForm: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xButtonCountDown: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xGap: any;
    xCharts: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xView: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xIcon: any;
    xDataGrid: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xDataGridToolbar: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xColFilter: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xPagination: any;
    xCellLabel: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xVirScroll: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    xVirTable: any;
    xLogObject: any;
    xInfoCard: any;
    xLinkCopy: any;
    xInfoDiffCard: any;
};
export { VNodeCollection as VNodeCollection };
export { newReactiveState as newReactiveState };
export { UI as UI };
export { dayjs as moment };
export { dayjs as dayjs };
export { xU as xU };
export { xU as _ };
export { $ as $ };
export { defPagination as defPagination };
export { defCol as defCol };
export { defColActions as defColActions };
export { defColActionsBtnlist as defColActionsBtnlist };
export { defDataGridOption as defDataGridOption };
export { defXVirTableConfigs as defXVirTableConfigs };
export { setDataGridInfo as setDataGridInfo };
export { State_UI as State_UI };
export { $t as $t };
export { Cpt_UI_locale as Cpt_UI_locale };
export { lStorage as lStorage };
export { iStorage as iStorage };
export { EVENT_TYPE as EVENT_TYPE };
export { setPagination as setPagination };
export { getPaginationPageSize as getPaginationPageSize };
export { validateItem as validateItem };
export { validateForm as validateForm };
export { AllWasWell as AllWasWell };
export { setDocumentTitle as setDocumentTitle };
export { setCSSVariables as setCSSVariables };
export { defItem as defItem };
export { defFormConfigs as defFormConfigs };
export { vModel as vModel };
export { antColKey as antColKey };
export { pickValueFrom as pickValueFrom };
export { resetValueOf as resetValueOf };
export { setValueTo as setValueTo };
export { RegexFn as RegexFn };
export { FormRules as FormRules };
export { compileVNode as compileVNode };
export declare const VentoseUIWithInstall: {
    install: (app: any, options: any) => void;
};