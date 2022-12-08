import { vUtils } from "../ventoseUtils";

export const pickValueFrom = configs => {
	return vUtils.reduce(
		configs,
		(target, config, prop) => {
			try {
				target[prop] = JSON.parse(JSON.stringify(config.value));
			} catch (error) {}
			return target;
		},
		{}
	);
};
export const setValueTo = (configs, values) => {
	return vUtils.map(
		values,
		(value, prop) => {
			if (configs[prop]) {
				configs[prop].value = value;
			}
		},
		{}
	);
};

/*重置reactive数据*/
export const resetValueOf = (state, initState) => {
	vUtils.each(initState, (value, prop) => {
		state[prop] = JSON.parse(JSON.stringify(value));
	});
	return state;
};
