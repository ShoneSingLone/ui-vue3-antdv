/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isButton是否是Button样式
 * @param {any} slots}
 * @returns {any}
 */
export default ({ properties, slots, listeners }) => {
	/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
	return <ElCheckboxGroup {...properties} {...listeners} v-slots={slots} />;
};
