import { _ } from "../loadCommonUtil";

export const pickValueFrom = configs => {
	return _.reduce(
		configs,
		(target, config, prop) => {
			try {
				target[prop] = JSON.parse(JSON.stringify(config.value));
			} catch (error) {
				console.error(error);
			}
			return target;
		},
		{}
	);
};
export const setValueTo = (configs, values) => {
	return _.map(
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
	_.each(initState, (value, prop) => {
		state[prop] = JSON.parse(JSON.stringify(value));
	});
	return state;
};
