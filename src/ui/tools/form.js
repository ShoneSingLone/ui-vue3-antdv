import { _ } from "../loadCommonUtil";

export const pickValueFrom = (configs) => {
  return _.reduce(
    configs,
    (target, config, prop) => {
      target[prop] = JSON.parse(JSON.stringify(config.value));
      return target;
    },
    {}
  );
};

/*重置reactive数据*/
export const resetState_Value = (state, initState) => {
  _.each(initState, (value, prop) => {
    state[prop] = JSON.parse(JSON.stringify(value));
  });
  return state;
};
