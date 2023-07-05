import $ from "jquery";
import { defineComponent } from "vue";
import "./xInfoCard.less";
import { xU } from "../ventoseUtils";

export const InfoCardCol = defineComponent({
	props: ["col"],
	computed: {
		isHide() {
			return this.col.isHide || false;
		},
		styleLabel() {
			return {};
		},
		vDomLabel() {
			return this.col.label;
		},
		vDomContent() {
			return this.col.value;
		}
	},
	render() {
		if (this.isHide) {
			return null;
		}

		return (
			<>
				<div class="x-descriptions-item-label" style={this.styleLabel}>
					{this.vDomLabel}
				</div>
				<div class="x-descriptions-item-content flex1">{this.vDomContent}</div>
			</>
		);
	}
});

export const InfoCardRow = defineComponent({
	props: ["row"],
	computed: {
		colArray() {
			return this?.row?.colArray || false;
		},
		vDomCol() {
			if (this.row) {
				return xU.map(this.colArray, col => {
					return <InfoCardCol col={col} />;
				});
			}
			return null;
		},
		styleRow() {
			if (this?.row?.style) {
				return this.row.style;
			}
			return "";
		}
	},
	render() {
		return (
			<div
				class="InfoCardRow x-descriptions-row flex middle"
				style={this.styleRow}>
				{this.vDomCol}
			</div>
		);
	}
});

export const xInfoCard = defineComponent({
	props: ["info", "title"],
	methods: {
		updateLableStyle(styleObject) {
			const styleString = xU
				.map(
					xU.merge(
						{ "min-width": "120px", "text-align": "right" },
						styleObject
					),
					(value, prop) => `${prop}: ${value}`
				)
				.join(";");

			const styleContent = `#${this.id} .x-descriptions-item-label {${styleString}}`;
			if (!this.$styleEle) {
				const $form = $(`#${this.id}`);
				const $style = $("<style/>", { id: `style_${this.id}` });
				$form.prepend($style);
				this.$styleEle = $style;
			}
			this.$styleEle.html(styleContent);
		}
	},
	mounted() {
		this.$watch(
			"info.colLabelWidth",
			width => {
				if (width) {
					xU("width", width);
					this.updateLableStyle({ width });
				}
			},
			{
				immediate: true,
				deep: true
			}
		);
	},
	computed: {
		id() {
			return `InfoCard_${this._.uid}`;
		},
		colLabelWidth() {
			return this?.info?.colLabelWidth || "120px";
		},
		rowArray() {
			return this?.info?.rowArray || false;
		},
		vDomTitle() {
			if (!this.title) {
				return null;
			}
			return (
				<div class="x-descriptions-header">
					<div class="x-descriptions-title">{this.title}</div>
				</div>
			);
		},
		vDomDescriptions() {
			if (this.rowArray) {
				return (
					<div class="x-descriptions-view">
						{xU.map(this.rowArray, row => {
							return <InfoCardRow row={row} />;
						})}
					</div>
				);
			}
			if (this.$slots.default) {
				return this.$slots.default();
			}
			return null;
		}
	},
	render() {
		return (
			<div
				class="x-descriptions x-descriptions-middle x-descriptions-bordered x-infomation-card"
				id={this.id}>
				{this.vDomTitle}
				{this.vDomDescriptions}
			</div>
		);
	}
});
