//@ts-nocheck

import { xU } from "../ventoseUtils";
import { reactive } from "vue";
import { t_itemConfigs } from "./itemRenders/index";

let xItemNoPropCount = 0;

/*make item configs */
export function defItem(options: t_itemConfigs) {
	const configs = defItem.item(options);
	return {
		[configs.prop]: configs
	};
}

defItem.item = (options: t_itemConfigs) => {
	if (!options.prop) {
		options.prop = `xItem${xItemNoPropCount++}`;
		/* console.warn(`no xItem prop replace by ${options.prop}`); */
	}

	const configs = reactive(
		xU.merge(
			{
				/* 提示信息，可以用于提示或者定位 */
				itemTips: {},
				/*item 的类型 case by case 跟ui库关联*/
				itemType: options.itemType || "Input"
				/*默认绑定的是value*/
			},
			{ ...options }
		)
	);
	return configs;
};

defItem.labelWithTips = ({ label, tips, icon }) => {
	return (
		<span class="flex middle">
			{label}
			<aTooltip title={tips}>{icon}</aTooltip>
		</span>
	);
};

/***
 * jsx中简化xItem的数据绑定
 * 要求configs中固定data dataXItem字段，默认对应value和XItem的配置项
 * @param configs
 * @param prop
 * @param options:可以修改默认值
 */
export function vModel(
	configs,
	prop,
	options = {
		data: "data",
		dataXItem: "dataXItem"
	}
) {
	const { data = "data", dataXItem = "dataXItem" } = options;
	return {
		value: configs[data][prop],
		configs: configs[dataXItem][prop],
		"onUpdate:modelValue"(e) {
			configs[data][prop] = e;
		}
	};
}

/***
 * prop to {
		dataIndex: prop,
		prop: prop,
		key: prop
	}
 * @param prop
 */
export function antColKey(prop, makeRenderCell) {
	const target = {
		dataIndex: prop,
		prop: prop,
		key: prop
	};

	if (makeRenderCell) {
		target.renderCell = makeRenderCell(prop);
	}
	return target;
}
