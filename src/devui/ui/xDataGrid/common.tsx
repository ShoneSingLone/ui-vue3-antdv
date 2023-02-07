//@ts-nocheck
import { t_buttonOptions } from "../xButton/xButton";
import { xU } from "../ventoseUtils";
import { ColumnProps } from "ant-design-vue/es/table";
import { lStorage } from "../tools/storage.js";
import { State_UI } from "../State_UI";

/*ui 内部使用*/
export const static_word = {
	operation: "operation"
};
export type t_col = {
	prop: string;
	label: string;
	children?: t_col[];
};

export type t_dataGridOptions = {
	isLoading: boolean;
	/*查询、刷新、onPaginationChange=》isLoading可以内置*/
	queryTableList: Function;
	/*ant的table属性*/
	antTableProperty: object;
	/*查询按钮*/
	isHideQuery: boolean;
	/*刷新按钮*/
	isHideRefresh: boolean;
	/*是否隐藏列过滤器*/
	isHideFilter: boolean;
	/*是否隐藏分页*/
	isHidePagination: boolean;
	pagination: {
		page: number;
		size: number;
		total: number;
	};
	/*分页page size 改变之后的回调，参数是pagination*/
	onPaginationChange: Function;
	/*里面查询区域的配置信息，可以在renderOptions作为参数传入*/
	optionsConfigs: {
		/*xItem value 集合*/
		data: object;
		/*xItem form 配置项*/
		dataXItem: object;
	};
	/*@deprecated*/
	/* renderOptions: (options: t_dataGridOptions) => JSX.Element; */
	dataSource: any[];
	/*如果是分组，filter无效
	 * columns作为数组，与antdv官方文档参数保持一致
	 * */
	isGroupingColumns: boolean;
	/*列信息*/
	columns: { [p: string]: t_col };
};

/* 默认 pagination onPaginationChange isLoading */

/*  */
export function defDataGridOption(options: t_dataGridOptions) {
	/* @ts-ignore */
	options.pagination = options.pagination || defPagination();
	options.isLoading = Boolean(options.isLoading);
	/* 如果没有queryTableList 则不会显示 query 和 refresh 按钮 */
	if (options.queryTableList) {
		/* @ts-ignore */
		options._queryTableList_origin = options.queryTableList;
		options.queryTableList = async function (...args) {
			/* this必须指向响应式数据 */
			this.isLoading = true;
			await this._queryTableList_origin.apply(this, args);
			this.isLoading = false;
		};
	}
	options.onPaginationChange =
		options.onPaginationChange ||
		async function (pagination) {
			/* this必须指向响应式数据 */
			await this.queryTableList({ pagination });
		};
	return options;
}

export function defPagination(num_page = 1, num_size = 10, num_total = 0) {
	/*APP可以自定义prop*/
	const { page, size, total } = lStorage.appConfigs.pagination;
	return {
		[page]: num_page || 1,
		[size]: num_size || 10,
		[total]: num_total || 0
	};
}

/***
 *  设置xPagination
 * @param StateTable:鸭子类型StateTable必须有pagination属性
 * @param pagination 属性是page size total 根据appConfigs的pagination_map给pagination赋值
 */
export function setPagination(StateTable, pagination: t_pagination) {
	const PAGINATION_MAP = lStorage.appConfigs.pagination;
	xU.each(pagination, (value, prop) => {
		StateTable.pagination[PAGINATION_MAP[prop]] = value;
	});
}

export function getPaginationPageSize(StateTable) {
	const PAGINATION_MAP = lStorage.appConfigs.pagination;
	const pagination: t_pagination = StateTable.pagination;
	const { page, size } = PAGINATION_MAP;
	return {
		[page]: pagination[page],
		[size]: pagination[size]
	};
}

export function defCol(options: t_col) {
	return {
		[options.prop]: {
			...options,
			key: options.prop,
			title: options.label,
			dataIndex: options.prop
		}
	};
}

/*antd 的配置项*/
export function defColAnt(options: ColumnProps) {
	return {
		...options,
		prop: options.key,
		dataIndex: options.key
	};
}

export function defColActions(options: {
	renderCell: (args: {
		column: object;
		index: number;
		record: any;
		text: any;
		value: any;
	}) => JSX.Element;
}) {
	return {
		[static_word.operation]: xU.merge(
			{
				title: State_UI.$t("操作").label,
				key: static_word.operation,
				prop: static_word.operation,
				fixed: "right",
				minWidth: 100
			},
			options
		)
	};
}

export function defColActionsBtnlist(options: {
	fold: number;
	btns: t_buttonOptions[];
}) {
	const { fold = 3, btns = [] } = options;
	const [always, more] = (() => {
		if (btns.length > fold) {
			return [btns.slice(0, fold - 1), btns.slice(fold - 1)];
		} else {
			return [btns, []];
		}
	})();
	return (
		<div class="flex middle">
			<xGap l="4" />
			{xU.map(always, btn => {
				const configs = xU.merge({ type: "link", size: "small" }, btn);
				return (
					<>
						<xButton configs={configs} />
						<xGap l="4" />
					</>
				);
			})}
			{(() => {
				if (more.length === 0) {
					return null;
				}
				return (
					<>
						<aDropdown
							v-slots={{
								default: () => {
									return (
										<aButton type="link">{State_UI.$t("更多").label}</aButton>
									);
								},
								overlay: () => {
									return (
										<>
											<aMenu>
												{xU.map(more, btn => {
													const configs = xU.merge(
														{ type: "link", size: "small" },
														btn
													);
													return (
														<aMenuItem key={btn.text}>
															<xButton configs={configs} />
														</aMenuItem>
													);
												})}
											</aMenu>
										</>
									);
								}
							}}
						/>
						<xGap l="4" />
					</>
				);
			})()}
		</div>
	);
}

export function filterColIsShow(isShow, prop) {
	if (xU.isBoolean(isShow)) {
		return isShow;
	} else {
		return true;
	}
}

type t_result = {
	total?: false | number;
	data: any[];
};

/***
 * 设置xDataGrid的列表数据和总数
 * @param StateBind
 * @param data
 * @param total
 */
export function setDataGridInfo(StateBind, result: t_result = { data: [] }) {
	const { data = [], total = false } = result;
	StateBind.dataSource = data;
	if (total || total === 0) {
		setPagination(StateBind, { total });
	}
}

type t_pagination = {
	page: number;
	size: number;
	total: number;
};
