//@ts-ignore
import { keys, clear, get as idbGet, set as idbSet } from "idb-keyval";
import { isInput, xU } from "../ventoseUtils";
/*循环依赖问题，直接使用lodash*/
import _ from "lodash";
/* keys().then((keys) => console.log(keys)); */

export const lStorage = new Proxy(localStorage, {
	set(_localStorage, prop: string, value) {
		if (_.isPlainObject(value)) {
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
//@ts-ignore
if (String(window.__APP_VERSION) !== String(lStorage.__APP_VERSION)) {
	clear();
	//@ts-ignore
	lStorage.__APP_VERSION = window.__APP_VERSION || Date.now();
	/* keys().then((keys) => console.log(keys)); */
}

/**
 *
 * @param key
 * @param val 存在即set，不存在即get
 * @returns
 */
export const iStorage = async function (key: string, val?: any) {
	const keyPrefix = window.location.hostname;
	key = _.camelCase(keyPrefix + key);
	let res;
	try {
		if (isInput(val)) {
			await idbSet(key, String(val));
			res = true;
			/* console.log("set", key, res) */
		} else {
			res = await idbGet(key);
			if (!res) {
				xU("get", key, res);
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		return res;
	}
};

iStorage.clear = clear;
