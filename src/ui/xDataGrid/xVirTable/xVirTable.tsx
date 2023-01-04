//@ts-nocheck
import { defineComponent, provide } from "vue";
import { xU } from "../../ventoseUtils";
import $ from "jquery";
import { xVirTableTh } from "./xVirTableTh";
import { xVirTableBody } from "./xVirTableBody";

export function defXVirTableConfigs(options) {
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
	},
	data() {
		return {
			selectedAll: false,
			dataSource: []
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
		columnWidthArray() {
			const _columnWidthArray = xU.reduce(
				this.columnOrder,
				(columnStyle, prop: any) => {
					const configsColumn = this.configs.columns[prop] || {};
					const { width } = configsColumn;
					if (width) {
						columnStyle.push(
							`#${this.xVirTableId} div[role=tr] div[role=th][data-prop=${prop}]{ width:${width}; min-width:${width}; max-width:${width}; }`
						);
						columnStyle.push(
							`#${this.xVirTableId} div[role=tr] div[role=td][data-prop=${prop}]{ width:${width}; min-width:${width}; max-width:${width}; }`
						);
					}
					return columnStyle;
				},
				[]
			);
			return _columnWidthArray;
		},
		vDomTheadSelect() {
			/* 没有this.selectedConfigs配置项连 空位都不要 */
			if (!this.selectedType) {
				return null;
			}
			let vDomTheadSelect = (
				<aCheckbox
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
				// `#${this.xVirTableId} *{ outline:1px solid red; }`,
				`#${this.xVirTableId} div[role=tr] >div{flex:1; }`,
				`#${this.xVirTableId} div[role=tr] div[role=th]{ width:300px;overflow:hidden;text-align:center; }`,
				`#${this.xVirTableId} div[role=tr] div[role=td]{ width:300px;overflow:hidden;height:${this.rowHeight}px;display: flex; justify-content: start; align-items: center;}`
			].concat(this.columnWidthArray, this.customClass);
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
			immediate: true,
			handler() {
				this.dataSource = this.configs.dataSource;
			}
		},
		styleContent() {
			this.updateStyle(this.styleContent);
		}
	},
	methods: {
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
				this.configs.selected = xU.map(
					this.configs.dataSource,
					i => i[this.selectedProp]
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
		console.time("virTable");
		const vDomTable = (
			<div id={this.xVirTableId} class="xVirTable-wrapper flex vertical">
				{/* 滑动条有6px  */}
				<div
					role="table"
					class="xVirTable-header-wrapper"
					style="padding-right: 6px;">
					{this.vDomThead}
				</div>
				<xVirTableBody
					columnOrder={this.columnOrder}
					columns={this.configs?.columns}
					rowHeight={this.rowHeight}
					onSelectedChange={this.handleSelectedChangeTd}
					selectedConfigs={this.configs?.selectedConfigs}
					selected={this.configs?.selected}
				/>
			</div>
		);
		console.timeEnd("virTable");
		return vDomTable;
	}
});
