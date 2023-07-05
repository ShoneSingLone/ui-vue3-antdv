//@ts-nocheck
import { defineComponent, inject } from "vue";
import { xU } from "../../ventoseUtils";
import { usefnObserveDomResize } from "../../compositionAPI/useDomResize";
import { xVirTableTd } from "./xVirTableTd";

export type t_rowPayload = {
	rowIndex: number;
	rowData: object;
};

export const xVirTableBody = defineComponent({
	props: ["columnOrder", "columns", "rowHeight", "selectedConfigs", "selected"],
	emits: ["selectedChange", "update:scrollHeight", "scroll"],
	inject: ["xVirTable"],
	components: {
		xVirTableTd
	},
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			uniqBy: inject("uniqBy"),
			configs: inject("configs"),
			rowCache: {},
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	data(vm) {
		this.debounceSetPerBlockHeight = xU.debounce(function (
			viewportHeight: number
		) {
			this.viewportHeight = viewportHeight;
			this.perBlockRowCount = Math.ceil(viewportHeight / this.rowHeight);
			this.perBlockHeight = this.perBlockRowCount * this.rowHeight;
			this.setHeight();
		},
		64);

		return {
			isLoading: false,
			perBlockHeight: 1,
			perBlockRowCount: 0,
			blockInViewCount: 0,
			styleWrapperAll: {
				height: 0,
				position: "relative"
			},
			virs1: [],
			virs2: [],
			virs3: []
		};
	},
	mounted() {
		/* 监听body高度变化 */
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			this.xVirTable.layoutDebounce();
			this.debounceSetPerBlockHeight(this.$refs.wrapper.offsetHeight);
		});
		this.$watch(
			() => {
				return `${this.configs.dataSource.length}_${this.perBlockHeight}_${this.perBlockRowCount}_${this.styleWrapper1}_${this.styleWrapper2}_${this.styleWrapper3}`;
			},
			() => {
				this.updateCell();
			}
		);
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		fnIsSelected() {
			const { isSelect, prop } = this.selectedConfigs || {};
			if (xU.isFunction(isSelect)) {
				return rowInfo => {
					return isSelect.call(this, { ...rowInfo, selected: this.selected });
				};
			} else {
				/* 默认处理方式 */
				return ({ rowData }) => {
					const id = rowData[prop];
					return this.selected.includes(id);
				};
			}
		},
		fnIsDisabled() {
			const { isDisabled } = this.selectedConfigs || {};
			if (xU.isFunction(isDisabled)) {
				return (...args) => {
					return isDisabled.apply(this, args);
				};
			} else {
				return () => {
					return false;
				};
			}
		},
		positionBlock() {
			return this.blockInViewCount % 3;
		},
		/* style */
		styleWrapper1() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${
					this.blockInViewCount * this.perBlockHeight
				}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${
					(this.blockInViewCount + 2) * this.perBlockHeight
				}px)`;
			}
			return `transform:translateY(${
				(this.blockInViewCount + 1) * this.perBlockHeight
			}px)`;
		},
		styleWrapper2() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${
					(this.blockInViewCount + 1) * this.perBlockHeight
				}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${
					this.blockInViewCount * this.perBlockHeight
				}px)`;
			}
			return `transform:translateY(${
				(this.blockInViewCount - 1) * this.perBlockHeight
			}px)`;
		},
		styleWrapper3() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${
					(this.blockInViewCount + 2) * this.perBlockHeight
				}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${
					(this.blockInViewCount + 1) * this.perBlockHeight
				}px)`;
			}
			return `transform:translateY(${
				this.blockInViewCount * this.perBlockHeight
			}px)`;
		},
		vDomBodyTr1() {
			return this.genTr(this.virs1);
		},
		vDomBodyTr2() {
			return this.genTr(this.virs2);
		},
		vDomBodyTr3() {
			return this.genTr(this.virs3);
		}
	},
	methods: {
		clearCacheRow() {
			const props = xU.filter(this.rowCache, (value, prop) =>
				/^blockId/.test(prop)
			);
			xU.each(props, prop => delete this.rowCache[prop]);
		},
		onClickRow(payload: t_rowPayload) {
			if (this?.configs?.onClickRow) {
				this.configs.onClickRow(payload);
			}
		},
		genTr(rows) {
			const vDomBlock = (() => {
				if (!this.uniqBy) {
					return xU.map(rows, (data: object, rowIndex: number) => {
						const { __virRowIndex } = data;

						const payload = {
							rowIndex: __virRowIndex,
							rowData: data
						};
						return (
							<div
								role="tr"
								class="xVirTable-row flex horizon"
								data-row-key={__virRowIndex}
								onClick={() => this.onClickRow(payload)}>
								{this.genSelectedVDom(payload)}
								{xU.map(this.columnOrder, (prop: string, index: number) => {
									return (
										<xVirTableTd
											column={this.columns[prop]}
											data-index={index}
											v-model:data={data}
										/>
									);
								})}
							</div>
						);
					});
				} else {
					const blockId = xU.reduce(
						rows,
						(id, row) => {
							id += row[this.uniqBy];
							return id;
						},
						"blockId"
					);
					if (!this.rowCache[blockId]) {
						this.rowCache[blockId] = xU.map(
							rows,
							(data: object, rowIndex: number) => {
								if (!this.rowCache[data[this.uniqBy]]) {
									const { __virRowIndex } = data;
									this.rowCache[data[this.uniqBy]] = (
										<div
											role="tr"
											class="xVirTable-row flex horizon"
											data-row-key={__virRowIndex}>
											{this.genSelectedVDom({
												rowIndex: __virRowIndex,
												rowData: data
											})}
											{xU.map(
												this.columnOrder,
												(prop: string, index: number) => {
													return (
														<xVirTableTd
															column={this.columns[prop]}
															data-col-index={index}
															v-model:data={data}
														/>
													);
												}
											)}
										</div>
									);
								}
								return this.rowCache[data._id];
							}
						);
					}
					return this.rowCache[blockId];
				}
			})();
			return vDomBlock;
		},
		updateCell() {
			xU("updateCell");
			this.setVirs1();
			this.setVirs2();
			this.setVirs3();
		},
		setVirs1() {
			const position =
				Number(this.styleWrapper1.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			this.virs1 = this.fragment(start, end);
		},
		setVirs2() {
			const position =
				Number(this.styleWrapper2.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			this.virs2 = this.fragment(start, end);
		},
		setVirs3() {
			const position =
				Number(this.styleWrapper3.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			this.virs3 = this.fragment(start, end);
		},
		fragment(start: number, end: number): any {
			const targetRecords = this.configs.dataSource
				.slice(start, end)
				.map((i, index) => {
					/* 改行数据在DataSource中的实际下标 */
					i.__virRowIndex = start + index;
					return i;
				});
			return targetRecords;
		},
		genSelectedVDom(rowInfo) {
			if (!this.selectedConfigs) {
				return null;
			}
			const isSelected = this.fnIsSelected(rowInfo);
			let isDisabled = this.fnIsDisabled(rowInfo);
			const handleChange = e => {
				const { prop } = this.selectedConfigs;
				this.emitSelectedChange(e.target.checked, rowInfo.rowData[prop]);
			};
			let vDomChecked;
			if (xU.isString(isDisabled)) {
				isDisabled = true;
				const uiPopoverConfigs = { content: isDisabled };
				vDomChecked = (
					<ElCheckbox
						checked={isSelected}
						onChange={handleChange}
						disabled={true}
						v-uiPopover={uiPopoverConfigs}
					/>
				);
			} else {
				vDomChecked = (
					<ElCheckbox
						checked={isSelected}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				);
			}

			return (
				<div
					role="td"
					data-prop="xVirSelected"
					class="flex middle center xVirTable-cell xVirSelected_inner_element xVirSelected_inner_element_check">
					{vDomChecked}
				</div>
			);
		},
		emitSelectedChange(checked, id) {
			this.$emit("selectedChange", { checked, id });
		},
		setTop: xU.debounce(function () {
			if (this.$refs.refWrapper) {
				this.$refs.refWrapper.scrollTo({
					top: this.top,
					behavior: "smooth"
				});
			}
		}, 1000),
		updateTop(event: any) {
			if (event) {
				/* @ts-ignore */
				const top: number = event.target.scrollTop;
				const left: number = event.target.scrollLeft;
				/* 与header同步srollLeft */
				this.$emit("scroll", left);
				this.blockInViewCount = Math.floor(top / this.perBlockHeight);
			}
		},
		setHeight() {
			const height = this.configs.dataSource.length * this.rowHeight;
			if (!height) {
				delete this.styleWrapperAll.width;
			} else if (this.viewportHeight && height < this.viewportHeight) {
				/* @ts-ignore */
				this.styleWrapperAll.width = `calc(100% - 6px)`;
			} else {
				delete this.styleWrapperAll.width;
			}
			/* @ts-ignore */
			this.styleWrapperAll.height = `${height}px`;

			if (this.$refs.wrapper) {
				this.$nextTick(() => {
					if (this.$refs.wrapper.scrollTop > 1) {
						this.$refs.wrapper.scrollTop--;
					} else {
						this.$refs.wrapper.scrollTop++;
					}
				});
			}
		}
	},
	watch: {
		rowHeight: {
			immediate: true,
			async handler() {
				await xU.ensureValueDone(() => this.$refs?.wrapper?.offsetHeight);
				this.debounceSetPerBlockHeight(this.$refs.wrapper.offsetHeight);
			}
		},
		top() {
			this.setTop();
		},
		"configs.dataSource": {
			immediate: true,
			async handler() {
				await xU.ensureValueDone(() => this.perBlockHeight);
				this.updateCell();
				this.clearCacheRow();
				this.updateTop(false);
				this.setHeight();
			}
		}
	},
	render() {
		const vDomTableBody = (
			<div
				role="body"
				class="xVirTable-body-wrapper flex1 width100"
				ref="wrapper"
				onScroll={this.updateTop}>
				<div style={this.styleWrapperAll}>
					{/* 虚拟列表 start*/}
					<div class="xVirTable-body-item item1" style={this.styleWrapper1}>
						{this.vDomBodyTr1}
					</div>
					<div class="xVirTable-body-item item2" style={this.styleWrapper2}>
						{this.vDomBodyTr2}
					</div>
					<div class="xVirTable-body-item item3" style={this.styleWrapper3}>
						{this.vDomBodyTr3}
					</div>
					{/* 虚拟列表 end */}
				</div>
			</div>
		);
		return vDomTableBody;
	}
});
