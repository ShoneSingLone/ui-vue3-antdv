import { clear } from "idb-keyval";
export declare const lStorage: Storage;
/**
 *
 * @param key
 * @param val 存在即set，不存在即get
 * @returns
 */
export declare const iStorage: {
    (key: string, val?: any): Promise<any>;
    clear: typeof clear;
};
