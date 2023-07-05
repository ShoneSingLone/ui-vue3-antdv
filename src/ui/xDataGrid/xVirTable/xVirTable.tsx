//@ts-nocheck
import { defineComponent, markRaw, provide } from "vue";
import { xU } from "../../ventoseUtils";
import $ from "jquery";
import { xVirTableTh } from "./xVirTableTh";
import { xVirTableBody, t_rowPayload } from "./xVirTableBody";
import { STATIC_WORD } from "../common";
const { MutatingProps } = xU;

type t_selectedConfigs = {
	type: keyof typeof defXVirTableConfigs.type;
	/* 数据ID */
	prop: string;
	isDisabled?: Function;
	isSelect?: Function;
};
type t_defXVirTableConfigs = {
	queryTableList?: Function;
	selectedConfigs?: t_selectedConfigs;
	selected?: [];
	rowHeight: number;
	dataSource: any[];
	columns: object;
	onClickRow?: (payload: t_rowPayload) => void;
	getSelectedRow?: Function;
};

const mmWidth = _width =>
	`width:${_width}; min-width:${_width}; max-width:${_width};`;
const widthNumber = widthPx => {
	let widthNumber = 0;
	try {
		const [_, width] = String(widthPx).match(/(.*)px/i);
		widthNumber = Number(width);
	} catch (error) {}
	return widthNumber;
};

export function defXVirTableConfigs(options: t_defXVirTableConfigs) {
	const required = ["rowHeight", "columns"];
	if (
		xU.some(required, prop => {
			if (!options[prop]) {
				alert("defXVirTableConfigs miss required " + prop);
				return true;
			}
			return false;
		})
	) {
		throw new Error("defXVirTableConfigs miss required");
	}

	if (options.selectedConfigs) {
		/* 如果有selectedConfigs  one是单选*/
		options.selected = options.selected || [];
		options.getSelectedRow = markRaw(function () {
			return xU.filter(options.dataSource, i => {
				const idValue = i[options.selectedConfigs.prop];
				return (
					xU.isArrayFill(options?.selected) &&
					options.selected.includes(idValue)
				);
			});
		});
	}
	return options;
}

defXVirTableConfigs.type = {
	many: "many",
	one: "one"
};

/**
 * 展示列的顺序
 */
export const xVirTable = defineComponent({
	props: ["configs", "uniqBy"],
	components: {
		xVirTableTh,
		xVirTableBody
	},
	setup(props) {
		provide("uniqBy", props.uniqBy);
		provide("configs", props.configs);
	},
	mounted() {
		this.initStyle();
		this.layoutDebounce();
	},
	provide() {
		const vm = this;
		return {
			xVirTable: vm
		};
	},
	data() {
		this.resetOperationWidthDebounce = xU.debounce(
			this.resetOperationWidth,
			STATIC_WORD.NEXT_TICK_TIME
		);
		this.layoutDebounce = xU.debounce(this.layout, STATIC_WORD.NEXT_TICK_TIME);
		this.resetColumnWidthDebounce = xU.debounce(
			this.resetColumnWidth,
			STATIC_WORD.NEXT_TICK_TIME
		);

		return {
			styleWidthXVirTable: 0,
			styleWidthOperation: "120px",
			selectedAll: false
		};
	},
	computed: {
		selectedIndeterminate() {
			const dataLength = this.configs?.dataSource?.length || 0;
			const selectedLength = this.selected.length;

			if (
				dataLength == 0 ||
				selectedLength == 0 ||
				dataLength == selectedLength
			) {
				return false;
			}
			return true;
		},
		selected() {
			return this.configs?.selected || [];
		},
		selectedType() {
			/* 如果没有selectedConfigs则不显示多选列 */
			if (!this.configs?.selectedConfigs) {
				return false;
			}
			/* 如果有selectedConfigs，默认是many */
			return (
				this.configs?.selectedConfigs?.type || defXVirTableConfigs.type.many
			);
		},
		selectedProp() {
			if (!this.selectedType) {
				return false;
			}
			if (!this.configs?.selectedConfigs?.prop) {
				alert("vVirTable miss this.selected id prop");
			}
			return this.configs?.selectedConfigs?.prop;
		},
		selectedBy() {
			if (!this.selectedType) {
				return false;
			}
			if (xU.isFunction(this.configs?.selectedConfigs?.fn)) {
				return this.configs?.selectedConfigs?.fn;
			} else {
				return false;
			}
		},
		customClass() {
			if (xU.isFunction(this.configs?.customClass)) {
				return this.configs?.customClass(this.xVirTableId);
			} else {
				return "";
			}
		},
		rowHeight() {
			return this.configs?.rowHeight || 32;
		},
		/* 组件唯一标识 */
		xVirTableId(): string {
			return `xVirTableId_${this._.uid}`;
		},
		/* 展示列的顺序 */
		columnOrder() {
			if (this.configs?.columnOrder) {
				return this.configs?.columnOrder;
			}
			return Object.keys(this.configs?.columns || {});
		},
		columnWidthStyleArray() {
			const _columnWidthStyleArray = xU.reduce(
				this.columnOrder,
				(styleEachColumn, prop: any) => {
					if (prop === STATIC_WORD.OPERATION) {
						return styleEachColumn;
					} else {
						const configsColumn = this.configs.columns[prop] || {};
						const { width, __calcWidth } = configsColumn;
						const _width = __calcWidth || width;
						/* 列各自的宽度 */
						if (_width) {
							styleEachColumn.push(
								`#${
									this.xVirTableId
								} div[role=tr] >div[role=th][data-prop=${prop}],#${
									this.xVirTableId
								} div[role=tr] >div[role=td][data-prop=${prop}]{ ${mmWidth(
									_width
								)} }`
							);
						}
						return styleEachColumn;
					}
				},
				/* 操作列的宽度 */
				[
					`#${this.xVirTableId} div[role=tr] >div[role=th][data-prop=${
						STATIC_WORD.OPERATION
					}]{  ${mmWidth(this.styleWidthOperation)} }`,
					`#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${
						STATIC_WORD.OPERATION
					}]{  ${mmWidth(this.styleWidthOperation)} }`
				]
			);
			return _columnWidthStyleArray;
		},
		vDomTheadSelect() {
			/* 没有this.selectedConfigs配置项连 空位都不要 */
			if (!this.selectedType) {
				return null;
			}
			let vDomTheadSelect = (
				<ElCheckbox
					checked={this.selectedAll}
					indeterminate={this.selectedIndeterminate}
					onChange={this.handleSelectedChangeTh}
				/>
			);
			/* 单选的时候不显示 */
			if (this.selectedType == "one") {
				vDomTheadSelect = null;
			}
			return (
				<div
					role="th"
					class="flex middle center xVirTable-cell xVirSelected_inner_element xVirSelected_inner_element_check"
					data-prop="xVirSelected">
					{vDomTheadSelect}
				</div>
			);
		},
		vDomThead() {
			return (
				<div role="thead" class="xVirTable-thead">
					<div role="tr" class="flex horizon">
						{this.vDomTheadSelect}
						{xU.map(this.columnOrder, (prop: string, index: number) => {
							const column = this.configs?.columns[prop];
							return <xVirTableTh column={column} index={index} key={prop} />;
						})}
					</div>
				</div>
			);
		},

		styleContent() {
			const allStyleArray = [
				/* 默认样式 */
				// `#${this.xVirTableId} *{ outline:1px solid red; }`,
				/* 与body同步scrollLeft */
				`#${this.xVirTableId} div[role=table]{overflow:hidden;}`,
				`#${this.xVirTableId} div[role=tr] >div{flex:1; }`,
				/* header */
				`#${this.xVirTableId} div[role=tr] >div[role=th]{ width:200px;min-width:200px;max-width:200px;text-align:center;white-space: nowrap; }`,
				/* CheckBox */
				`#${this.xVirTableId} div[role=tr] >div[role=th][data-prop=xVirSelected],#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=xVirSelected]{ width:32px;max-width:32px;min-width:32px;overflow:hidden;text-align:center; }`,
				/*  */
				`#${this.xVirTableId} div[role=tr] >div[role=td]{ width:200px;min-width:200px;max-width:200px;overflow:hidden;height:${this.rowHeight}px;display: flex; justify-content: start; align-items: center;}`
			].concat(this.columnWidthStyleArray, this.customClass);

			/* sync head 和 body 的宽度 */
			if (this.styleWidthXVirTable) {
				allStyleArray.unshift(
					`#${this.xVirTableId} div[role=table] div[role=thead] {width:${this.styleWidthXVirTable}; }`
				);
				if (this.configs.dataSource.length === 0) {
					allStyleArray.unshift(
						`#${this.xVirTableId} .xVirTable-body-wrapper.flex1.width100 >div {width:${this.styleWidthXVirTable}; }`
					);
				}
			}
			return allStyleArray.join("\n");
		}
	},
	watch: {
		"configs.selected"(selected) {
			if (selected?.length === 0) {
				this.selectedAll = false;
			}
		},
		"configs.dataSource": {
			// immediate: true,
			handler() {
				/* 触发列宽的重新计算 */
				this.resetOperationWidthDebounce();
			}
		},
		styleContent() {
			this.updateStyle(this.styleContent);
		}
	},
	methods: {
		/* 如果列的宽度撑不起容器宽度，适当增加列的宽度使之适应容器宽度 */
		resetColumnWidth(contentWrapperWidth) {
			const selectorTable = `#${this.xVirTableId}`;
			const $tableWrapper = $(selectorTable);
			const tableWrapperWidth = $tableWrapper.outerWidth();
			/* contentWrapperWidth 可能比 tableWrapperWidth宽，这样就有滑动条了*/
			const superfluous = tableWrapperWidth - contentWrapperWidth - 6;
			/* 有滑动条就尽量收缩 */
			const isGrow = superfluous > 1;
			const isShrink = superfluous < -2;

			console.log(
				"superfluous",
				superfluous,
				"isGrow",
				isGrow,
				"isShrink",
				isShrink
			);

			const selectorThead = `${selectorTable} >div[role=table] >div[role=thead] >div[role=tr] >div[role=th]`;
			const $tHead = $(selectorThead);

			/* 只收缩没有原始width的列 */
			const mayCalculateWidth = xU.filter(this.configs.columns, i => {
				if (i.prop === STATIC_WORD.OPERATION) {
					return false;
				}
				/* 已经确认设置了初始width */
				if (i.width) {
					return false;
				}
				/* 初始未设置width，且不是操作列 */
				return true;
			});

			if (isGrow) {
				const width = Math.floor(superfluous / mayCalculateWidth.length) - 0.5;
				xU.each($tHead, dom => {
					const prop = dom.dataset.prop;
					const inMayCalculateWidth = xU.some(
						mayCalculateWidth,
						i => i.prop === prop
					);
					if (inMayCalculateWidth) {
						const columnWidth = dom.offsetWidth + width;
						this.configs.columns[prop].__calcWidth = `${columnWidth}px`;
					}
				});
			}

			if (isShrink) {
				/* 如果superfluous能够cover，就还原 */
				if (mayCalculateWidth.length > 0) {
					/* 这是一个经验值，没有精心计算 */
					let originContentWrapperWidth = 10;

					xU.each($tHead, dom => {
						const prop = dom.dataset.prop;
						const inMayCalculateWidth = xU.some(
							mayCalculateWidth,
							i => i.prop === prop
						);
						if (inMayCalculateWidth) {
							originContentWrapperWidth += 200;
						} else {
							originContentWrapperWidth += dom.offsetWidth;
						}
					});

					/* 如果shirnk之后可以保证不出现滑动条,那么就重新计算宽度，否则没有必要 */
					if (originContentWrapperWidth < tableWrapperWidth) {
						const width =
							Math.floor(
								(tableWrapperWidth - originContentWrapperWidth) /
									mayCalculateWidth.length
							) - 0.5;

						xU.each(mayCalculateWidth, configs => {
							const columnWidth = 200 + width;
							configs.__calcWidth = `${columnWidth}px`;
						});
					}
				}
			}
		},
		onBodyScroll(left) {
			this.$refs.thead.scrollLeft = left;
		},
		/* 设置操作列的宽度 */
		resetOperationWidth() {
			if (this.configs.dataSource.length === 0) {
				return;
			}
			try {
				const $wrapper = $(
					`#${this.xVirTableId} div[role=tr] >div[role=td][data-prop=${STATIC_WORD.OPERATION}]`
				);
				const $child = $wrapper.find(">div");
				const wrapperWidth = $wrapper.outerWidth();
				const childWidth = $child.outerWidth();
				if (!wrapperWidth && !childWidth) {
					throw new Error("uninit");
				}
				if (wrapperWidth < childWidth) {
					this.styleWidthOperation = `${childWidth}px`;
				}
				this.layoutDebounce();
			} catch (error) {
				this.resetOperationWidthDebounce();
			}
		},
		/* 计算总的宽度，用户scroll的滑动条,取thead和body其中最宽的*/
		layout() {
			const selectorHead = `#${this.xVirTableId} >div[role=table] >div[role=thead] >div[role=tr] >div[role=th]`;
			const selectorBody = `#${this.xVirTableId} .xVirTable-body-item`;

			const bodyWidth = xU.map($(selectorBody), dom => dom.offsetWidth);
			bodyWidth.push(
				xU.reduce(
					$(selectorHead),
					(_width, dom) => {
						_width += dom.offsetWidth;
						return _width;
					},
					0
				)
			);
			const width = xU.max(bodyWidth);
			if (width) {
				this.styleWidthXVirTable = `${width}px`;
				this.resetColumnWidthDebounce(width);
			}
		},
		initStyle() {
			const $form = $(`#${this.xVirTableId}`);
			const $style = $("<style/>", { id: `style_${this.xVirTableId}` }).append(
				this.styleContent
			);
			$form.prepend($style);
		},
		updateStyle(styleContent: string) {
			const $style = $(`#style_${this.xVirTableId}`);
			$style.html(styleContent);
		},
		handleSelectedChange() {},
		handleSelectedChangeTh(e) {
			const { checked } = e.target;
			if (checked) {
				this.selectedAll = true;
				this.configs.selected = xU.map(this.configs.dataSource, i =>
					MutatingProps(i, this.selectedProp)
				);
			} else {
				this.configs.selected = [];
			}
		},
		handleSelectedChangeTd({ id }) {
			const isOnlyOne = this.selectedType === "one";
			const index = xU.findIndex(this.configs?.selected, i => i === id);
			if (index > -1) {
				if (isOnlyOne) {
					this.configs.selected = [];
				} else {
					this.configs.selected.splice(index, 1);
				}
			} else {
				if (isOnlyOne) {
					this.configs.selected = [id];
				} else {
					this.configs.selected.push(id);
				}
			}
		}
	},
	render() {
		const vDomTable = (
			<div id={this.xVirTableId} class="xVirTable-wrapper flex vertical">
				{/* 滑动条有6px  */}
				<div
					ref="thead"
					role="table"
					class="xVirTable-header-wrapper"
					style="padding-right: 6px;width:100%">
					{this.vDomThead}
				</div>
				<xVirTableBody
					onScroll={this.onBodyScroll}
					columnOrder={this.columnOrder}
					columns={this.configs?.columns}
					rowHeight={this.rowHeight}
					onSelectedChange={this.handleSelectedChangeTd}
					selectedConfigs={this.configs?.selectedConfigs}
					selected={this.configs?.selected}
				/>
			</div>
		);
		return vDomTable;
	}
});
