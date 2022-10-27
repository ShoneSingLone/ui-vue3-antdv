import { Checkbox, Switch } from "ant-design-vue";
import { EVENT_TYPE } from "../../tools/validate";
import { h } from "vue";
import { _ } from "../../loadCommonUtil";

/*
export default ({property, slots, listeners}) => {

    return <Switch {...property} {...listeners} v-slots={slots}/>;
};
*/

export default ({ property, slots, listeners }) => {
  const _property = _.merge({}, property, {
    checked: property.value,
    onClick() {
      listeners["onUpdate:value"](!_property.value);
    },
  });
  /*用span包裹：宽度自适应*/
  return <span>{h(Switch, _.omit(_property, ["value"]))}</span>;
};
