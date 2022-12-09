import { xU } from "../ventoseUtils";

export const lStorage = new Proxy(localStorage, {
	set(_localStorage, prop, value) {
		if (xU.isPlainObject(value)) {
			_localStorage[prop] = JSON.stringify(value);
		} else {
			_localStorage[prop] = value;
		}
		return true;
	},
	get(_localStorage, prop) {
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
