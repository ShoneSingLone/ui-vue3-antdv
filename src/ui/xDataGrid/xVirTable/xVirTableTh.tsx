import { defineComponent } from "vue";

export const xVirTableTh = defineComponent({
	props: ["column", "index"],
	computed: {
		prop() {
			return this.column?.prop;
		},
		label() {
			return this.column?.label;
		},
		renderHeader() {
			return this.column?.renderHeader || false;
		},
		vDomCellContent() {
			if (this.renderHeader) {
				return this.renderHeader({
					label: this.label,
					prop: this.prop,
					index: this.index
				});
			}
			return this.label;
		}
	},
	render() {
		return (
			<div
				role="th"
				class="xVirTable-cell"
				data-prop={this.prop}
				data-index={this.index}>
				{this.vDomCellContent}
			</div>
		);
	}
});
