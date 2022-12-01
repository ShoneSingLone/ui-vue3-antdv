//@ts-nocheck
import { defineComponent } from "vue";
import { _ } from "../../loadCommonUtil";
import { usefnObserveDomResize } from "../../compositionAPI/useDomResize";
import { xVirTableTd } from "./xVirTableTd";

export const xVirTableBody = defineComponent({
	props: [
		"dataSource",
		"columnOrder",
		"columns",
		"rowHeight",
		"selectedConfigs",
		"selected"
	],
	emits: ["selectedChange", "update:scrollHeight"],
	components: {
		xVirTableTd
	},
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	data(vm) {
		return {
			isLoading: false,
			perBlockHeight: 0,
			perBlockRowCount: 0,
			blockInViewCount: 0,
			styleWrapperAll: {
				height: 0,
				position: "relative"
			}
		};
	},
	mounted() {
		/* 监听body高度变化 */
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			this.setPerBlockHeight(this.$refs.wrapper.offsetHeight);
		});
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		fnIsSelected() {
			const { isSelect, prop } = this.selectedConfigs || {};
			if (_.isFunction(isSelect)) {
				return args => {
					return isSelect.call(this, args);
				};
			} else {
				return ({ rowData }) => {
					const id = rowData[prop];
					return this.selected.includes(id);
				};
			}
		},
		fnIsDisabled() {
			const { isDisabled } = this.selectedConfigs || {};
			if (_.isFunction(isDisabled)) {
				return () => {
					return isDisabled.call(this, args);
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
		virs1() {
			const position =
				Number(this.styleWrapper1.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			return this.dataSource.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		virs2() {
			const position =
				Number(this.styleWrapper2.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			return this.dataSource.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		virs3() {
			const position =
				Number(this.styleWrapper3.match(/(\d)/g).join("")) /
				this.perBlockHeight;
			const start = position * this.perBlockRowCount;
			const end = start + this.perBlockRowCount;
			return this.dataSource.slice(start, end).map((i, index) => ({
				...i,
				index: start + 1 + index
			}));
		},
		/* style */
		styleWrapper1() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${this.blockInViewCount * this.perBlockHeight
					}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${(this.blockInViewCount + 2) * this.perBlockHeight
					}px)`;
			}
			return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight
				}px)`;
		},
		styleWrapper2() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight
					}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${this.blockInViewCount * this.perBlockHeight
					}px)`;
			}
			return `transform:translateY(${(this.blockInViewCount - 1) * this.perBlockHeight
				}px)`;
		},
		styleWrapper3() {
			if (this.positionBlock === 0) {
				return `transform:translateY(${(this.blockInViewCount + 2) * this.perBlockHeight
					}px)`;
			}
			if (this.positionBlock === 1) {
				return `transform:translateY(${(this.blockInViewCount + 1) * this.perBlockHeight
					}px)`;
			}
			return `transform:translateY(${this.blockInViewCount * this.perBlockHeight
				}px)`;
		},
		vDomBodyTr1() {
			return _.map(this.virs1, (data: object, rowIndex: number) => {
				return (
					<div
						role="tr"
						class="xVirTable-row flex horizon"
						data-row-key={rowIndex}>
						{this.genSelectedVDom({ rowIndex, rowData: data })}
						{_.map(this.columnOrder, (prop: string, index: number) => {
							return (
								<xVirTableTd
									column={this.columns[prop]}
									data-index={index}
									rowIndex={rowIndex}
									data={data}
								/>
							);
						})}
					</div>
				);
			});
		},
		vDomBodyTr2() {
			return _.map(this.virs2, (data: object, rowIndex: number) => {
				return (
					<div
						role="tr"
						class="xVirTable-row flex horizon"
						data-row-key={rowIndex}>
						{this.genSelectedVDom({ rowIndex, rowData: data })}
						{_.map(this.columnOrder, (prop: string, index: number) => {
							return (
								<xVirTableTd
									column={this.columns[prop]}
									data-index={index}
									rowIndex={rowIndex}
									data={data}
								/>
							);
						})}
					</div>
				);
			});
		},
		vDomBodyTr3() {
			return _.map(this.virs3, (data: object, rowIndex: number) => {
				return (
					<div
						role="tr"
						class="xVirTable-row flex horizon"
						data-row-key={rowIndex}>
						{this.genSelectedVDom({ rowIndex, rowData: data })}
						{_.map(this.columnOrder, (prop: string, index: number) => {
							return (
								<xVirTableTd
									column={this.columns[prop]}
									data-index={index}
									rowIndex={rowIndex}
									data={data}
								/>
							);
						})}
					</div>
				);
			});
		},
	},
	methods: {
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
			if (_.isString(isDisabled)) {
				isDisabled = true;
				const uiPopoverConfigs = { content: isDisabled };
				vDomChecked = (
					<aCheckbox
						checked={isSelected}
						onChange={handleChange}
						disabled={true}
						v-uiPopover={uiPopoverConfigs}
					/>
				);
			} else {
				vDomChecked = (
					<aCheckbox
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
		setPerBlockHeight: _.debounce(function (viewportHeight: number) {
			this.viewportHeight = viewportHeight;
			this.perBlockRowCount = Math.ceil(viewportHeight / this.rowHeight);
			this.perBlockHeight = this.perBlockRowCount * this.rowHeight;
			this.setHeight();
		}, 64),
		setTop: _.debounce(function () {
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
				this.blockInViewCount = Math.floor(top / this.perBlockHeight);
			}
		},
		setHeight() {
			const height = this.dataSource.length * this.rowHeight;
			if (this.viewportHeight && height < this.viewportHeight) {
				/* @ts-ignore */
				this.styleWrapperAll.width = `calc(100% - 6px)`;
			} else {
				delete this.styleWrapperAll.width;
			}
			/* @ts-ignore */
			this.styleWrapperAll.height = `${height}px`;
		}
	},
	watch: {
		rowHeight() {
			this.setPerBlockHeight(this.$refs.wrapper.offsetHeight);
		},
		top() {
			this.setTop();
		},
		"dataSource.length": {
			immediate: true,
			handler() {
				this.updateTop(false);
				this.setHeight();
			}
		}
	},
	render() {
		return (
			<div
				role="body"
				class="xVirTable-body-wrapper flex1"
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
	}
});
