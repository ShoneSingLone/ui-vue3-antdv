import Radio, { RadioGroup, RadioButton } from "ant-design-vue/es/radio";
import _ from "lodash";
/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isButton是否是Button样式
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
  const _property = _.omit(property, ["options"]);
  const renderOptions = () => {
    if (property.isButton) {
      return _.map(property.options, (option) => {
        return <RadioButton value={option.value}>{option.label}</RadioButton>;
      });
    }
    return _.map(property.options, (option) => {
      return <Radio value={option.value}>{option.label}</Radio>;
    });
  };

  return (
    <RadioGroup
      {...property}
      {...listeners}
      v-slots={{ default: renderOptions }}
    />
  );
};
