import { defineComponent, inject } from "vue";
import $ from "jquery";

$(window).on("click.virTableTdId", function (e) {
	const virTableTdId = (() => {
		let $ele = $(e.target);
		let _virTableTdId = $ele.attr("id");
		//@ts-ignore
		if (/^virTableTdId_/.test(_virTableTdId)) {
			return _virTableTdId;
		} else {
			//@ts-ignore
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
	emits: ["update:data"],
	setup() {
		return {
			configs: inject("configs")
		};
	},
	computed: {
		record() {
			const vm = this;
			return new Proxy(vm.data, {
				get(obj, prop) {
					return vm.data[prop];
				},
				set(obj, prop, val) {
					vm.data[prop] = val;
					vm.configs.dataSource[vm.data.__virRowIndex][prop] = val;
					return true;
				}
			});
		},
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
		}
	},
	data(vm) {
		return {
			isFocus: false,
			count: 0
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
				data-count={this.count}
				data-prop={this.prop}
				data-row-index={this.data.__virRowIndex}>
				{(() => {
					/* 同时有editor 和 render 根据focus 判断展示 */
					if (this.renderEditor && this.renderCell) {
						if (this.isFocus) {
							return this.renderEditor({
								configs: this.configs,
								record: this.record,
								cell: this.cell,
								index: this.data.__virRowIndex
							});
						} else {
							return this.renderCell({
								configs: this.configs,
								record: this.record,
								cell: this.cell,
								index: this.data.__virRowIndex
							});
						}
					}
					/* 只有render */
					if (!this.renderEditor && this.renderCell) {
						return this.renderCell({
							configs: this.configs,
							record: this.record,
							cell: this.cell,
							index: this.data.__virRowIndex
						});
					}

					/* 只有 editor */
					if (this.renderEditor && !this.renderCell) {
						if (this.isFocus) {
							return this.renderEditor({
								configs: this.configs,
								record: this.record,
								cell: this.cell,
								index: this.data.__virRowIndex
							});
						} else {
							return this.cell;
						}
					}
					return this.cell;
				})()}
			</div>
		);
	}
});
