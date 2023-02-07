import { xU } from "../ventoseUtils";

export const pickValueFrom = configs => {
	return xU.reduce(
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
	return xU.map(
		values,
		(value, prop) => {
			if (configs[prop]) {
				configs[prop].value = value;
				/* onChange */
				if (xU.isFunction(configs[prop].onChange)) {
					configs[prop].onChange(value);
				}
			}
		},
		{}
	);
};

/*重置reactive数据*/
export const resetValueOf = (state, initState) => {
	xU.each(initState, (value, prop) => {
		state[prop] = JSON.parse(JSON.stringify(value));
	});
	return state;
};
