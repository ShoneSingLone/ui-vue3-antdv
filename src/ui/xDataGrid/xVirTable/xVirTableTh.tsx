import { defineComponent } from "vue";

export const xVirTableTh = defineComponent({
	props: ["column"],
	computed: {
		prop() {
			return this.column?.prop;
		},
		label() {
			return this.column?.label;
		},
		vDomCellContent() {
			return this.label;
		}
	},
	render() {
		return (
			<div role="th" class="xVirTable-cell" data-prop={this.prop}>
				{this.vDomCellContent}
			</div>
		);
	}
});
