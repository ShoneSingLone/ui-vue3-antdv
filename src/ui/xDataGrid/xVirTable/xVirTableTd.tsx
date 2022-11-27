import { defineComponent } from "vue";

export const xVirTableTd = defineComponent({
	props: ["column", "data", "rowIndex"],
	computed: {
		prop() {
			return this.column?.prop;
		},
		cell() {
			return this.data[this.prop];
		},
		renderCell() {
			return this.column?.renderCell || false;
		},
		vDomCellContent() {
			if (this.renderCell) {
				return this.renderCell({
					record: this.data,
					cell: this.cell,
					index: this.rowIndex
				});
			}
			return this.data[this.prop];
		}
	},
	render() {
		return (
			<div role="td" class="xVirTable-cell" data-prop={this.prop}>
				{this.vDomCellContent}
			</div>
		);
	}
});
