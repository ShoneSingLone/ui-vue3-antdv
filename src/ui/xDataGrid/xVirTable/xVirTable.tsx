//@ts-nocheck
import { defineComponent } from "vue";
import { _ } from "../../loadCommonUtil";
import $ from "jquery";
import { xVirTableTh } from "./xVirTableTh";
import { xVirTableBody } from "./xVirTableBody";

/**
 * 展示列的顺序
 */
export const xVirTable = defineComponent({
	props: ["configs"],
	components: {
		xVirTableTh,
		xVirTableBody
	},
	mounted() {
		this.initStyle();
	},
	computed: {
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
			const _columnWidthArray = _.reduce(this.columnOrder, (columnStyle, prop: any) => {
				const configsColumn = this.configs.columns[prop] || {};
				const { width, minWidth } = configsColumn;
				if (width) {
					columnStyle.push(`#${this.xVirTableId} div[role=tr] div[role=th][data-prop=${prop}]{ width:${width}; }`)
					columnStyle.push(`#${this.xVirTableId} div[role=tr] div[role=td][data-prop=${prop}]{ width:${width}; }`)
				}
				if (minWidth) {
					columnStyle.push(`#${this.xVirTableId} div[role=tr] div[role=th][data-prop=${prop}]{ min-width:${minWidth}; }`)
					columnStyle.push(`#${this.xVirTableId} div[role=tr] div[role=td][data-prop=${prop}]{ min-width:${minWidth}; }`)
				}
				return columnStyle;
			}, []);
			return _columnWidthArray;
		},
		vDomThead() {
			return (
				<div role="thead" class="xVirTable-thead">
					<div role="tr" class="flex horizon">
						{_.map(this.columnOrder, (prop: string, index: number) => {
							const column = this.configs?.columns[prop];
							return <xVirTableTh column={column} index={index} key={prop} />;
						})}
					</div>
				</div>
			);
		},
		vDomMainTable() {
			return (
				<div id={this.xVirTableId} class="xVirTable-wrapper flex vertical">
					{/* 滑动条有6px  */}
					<div
						role="table"
						class="xVirTable-header-wrapper"
						style="padding-right: 6px;">
						{this.vDomThead}
					</div>
					<xVirTableBody
						dataSource={this.configs.dataSource}
						columnOrder={this.columnOrder}
						columns={this.configs?.columns}
						rowHeight={this.rowHeight}
					/>
				</div>
			);
		},
		styleContent() {
			const allStyleArray = [
				// `#${this.xVirTableId} *{ outline:1px solid red; }`,
				`#${this.xVirTableId} div[role=tr] >div{ }`,
				`#${this.xVirTableId} div[role=tr] div[role=th]{ width:300px;overflow:hidden;text-align:center; }`,
				`#${this.xVirTableId} div[role=tr] div[role=td]{ width:300px;overflow:hidden;height:${this.rowHeight}px;display: flex; justify-content: start; align-items: center;}`
			].concat(this.columnWidthArray);
			return allStyleArray.join("\n");
		}
	},
	watch: {
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
		}
	},
	render() {
		return this.vDomMainTable;
	}
});
