/// <reference types="jquery" />
/// <reference types="jquery" />
export declare type t_dialogOptions = {
    keepTop?: boolean;
    payload?: any;
    isEcsCloseDialog?: boolean;
    _contentInstance?: object;
    _dialog$ele?: JQuery;
    title?: any;
    component: object;
    area?: string[];
    _layerKey?: number;
    closeDialog?: Function;
    onAfterOpenDialoag?: Function;
    onBeforeClose?: Function;
};
export declare const installUIDialogComponent: (UI: any, { appPlugins, dependState }: {
    appPlugins: any;
    dependState: any;
}, app: any) => void;
