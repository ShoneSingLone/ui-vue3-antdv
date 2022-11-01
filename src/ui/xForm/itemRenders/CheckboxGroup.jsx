import { CheckboxGroup } from "ant-design-vue/es/checkbox";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isButton是否是Button样式
 * @param {any} slots}
 * @returns {any}
 */
export default ({ property, slots, listeners }) => {
	return <CheckboxGroup {...property} {...listeners} v-slots={slots} />;
};
