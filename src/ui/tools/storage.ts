import { xU } from "../ventoseUtils";
import { get as idbGet, set as idbSet } from "idb-keyval";

export const lStorage = new Proxy(localStorage, {
	set(_localStorage, prop: string, value) {
		if (xU.isPlainObject(value)) {
			_localStorage[prop] = JSON.stringify(value);
		} else {
			_localStorage[prop] = value;
		}
		return true;
	},
	get(_localStorage, prop: string) {
		const objString = _localStorage[prop];
		try {
			return JSON.parse(objString);
		} catch (error) {
			if (objString === "undefined") {
				return false;
			}
			return objString || false;
		}
	}
});

lStorage.appConfigs = lStorage.appConfigs || {
	pagination: {
		page: "page",
		size: "size",
		total: "total"
	}
};

/**
 *
 * @param key
 * @param val 存在即set，不存在即get
 * @returns
 */
export const iStorage = async (key: string, val?: any) => {
	const keyPrefix = xU.camelCase(window.location.hostname);
	key = keyPrefix + key;
	if (xU.isInput(val)) {
		return await idbSet(key, val);
	} else {
		return await idbGet(key);
	}
};
