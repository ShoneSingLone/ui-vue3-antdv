import { defineComponent } from "vue";
import $ from "jquery";

$(window).on("click.virTableTdId", function (e) {
	const virTableTdId = (() => {
		let $ele = $(e.target);
		let _virTableTdId = $ele.attr("id");
		if (/^virTableTdId_/.test(_virTableTdId)) {
			return _virTableTdId;
		} else {
			$ele = $ele.parents("[id^=virTableTdId_]");
			_virTableTdId = $ele.attr("id");
			return _virTableTdId;
		}
	})();
	$(window).trigger({
		type: "onAllCell",
		/* @ts-ignore */
		virTableTdId
	});
});

export const xVirTableTd = defineComponent({
	props: ["column", "data"],
	computed: {
		id() {
			return `virTableTdId_${this._.uid}`;
		},
		prop() {
			return this.column?.prop;
		},
		cell() {
			return this.data[this.prop];
		},
		renderEditor() {
			if (this.column?.renderEditor) {
				return this.column?.renderEditor;
			}
			return false;
		},
		renderCell() {
			if (this.column?.renderCell) {
				return this.column?.renderCell;
			}
			return false;
		},
		vDomCellContent() {
			/* 同时有editor 和 render 根据focus 判断展示 */
			if (this.renderEditor && this.renderCell) {
				if (this.isFocus) {
					return this.renderEditor({
						record: this.data,
						cell: this.cell,
						index: this.data.__virRowIndex
					});
				} else {
					return this.renderCell({
						record: this.data,
						cell: this.cell,
						index: this.data.__virRowIndex
					});
				}
			}
			/* 只有render */
			if (!this.renderEditor && this.renderCell) {
				return this.renderCell({
					record: this.data,
					cell: this.cell,
					index: this.data.__virRowIndex
				});
			}

			/* 只有 editor */
			if (this.renderEditor && !this.renderCell) {
				if (this.isFocus) {
					return this.renderEditor({
						record: this.data,
						cell: this.cell,
						index: this.data.__virRowIndex
					});
				} else {
					return this.cell;
				}
			}

			return this.cell;
		}
	},
	data(vm) {
		return {
			isFocus: false
		};
	},
	methods: {
		handleAllCell(e) {
			if (e.virTableTdId === this.id) {
				if (!this.isFocus) {
					this.isFocus = true;
					setTimeout(() => {
						$(this.$refs.cell).find("input").trigger("focus");
					}, 64);
				}
			} else {
				if (this.isFocus) {
					this.isFocus = false;
				}
			}
		}
	},
	mounted() {
		$(window).on("onAllCell", this.handleAllCell);
		if (this.renderEditor) {
			$(this.$refs.cell).addClass("cursor-editor");
		}
	},
	beforeUnmount() {
		$(window).off("onAllCell", this.handleAllCell);
	},
	render() {
		return (
			<div
				id={this.id}
				ref="cell"
				role="td"
				class="xVirTable-cell"
				data-prop={this.prop}
				data-row-index={this.data.__virRowIndex}>
				{this.vDomCellContent}
			</div>
		);
	}
});
