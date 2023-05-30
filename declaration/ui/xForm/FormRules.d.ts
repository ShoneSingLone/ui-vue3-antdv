export namespace RegexFn {
    function email(): RegExp;
    function mobile(): RegExp;
}
export namespace FormRules {
    export { SUCCESS };
    export { FAIL };
    export function required(msg: any, trigger?: string[]): any;
    export function required(msg: any, trigger?: string[]): any;
    export function demo(): {
        name: string;
        msg: string;
        validator(value: any): Promise<boolean>;
        trigger: string[];
    };
    export function demo(): {
        name: string;
        msg: string;
        validator(value: any): Promise<boolean>;
        trigger: string[];
    };
    export function email(): {
        name: string;
        msg: () => string | number;
        validator(value: any): Promise<boolean>;
        trigger: string[];
    };
    export function email(): {
        name: string;
        msg: () => string | number;
        validator(value: any): Promise<boolean>;
        trigger: string[];
    };
    export function custom({ name, msg, validator, trigger }: {
        name: any;
        msg: any;
        validator: any;
        trigger: any;
    }): any;
    export function custom({ name, msg, validator, trigger }: {
        name: any;
        msg: any;
        validator: any;
        trigger: any;
    }): any;
}
declare const SUCCESS: false;
declare const FAIL: true;
export {};
