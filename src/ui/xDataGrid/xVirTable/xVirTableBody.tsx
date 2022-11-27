//@ts-nocheck
import { defineComponent } from "vue";
import { _ } from "../../loadCommonUtil";
import { usefnObserveDomResize } from "../../compositionAPI/useDomResize";
import { xVirTableTd } from "./xVirTableTd";

export const xVirTableBody = defineComponent({
	props: ["dataSource", "columnOrder", "columns", "rowHeight"],
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
				height: 0
			}
		};
	},
	mounted() {
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			this.setPerBlockHeight(this.$refs.wrapper.offsetHeight);
		});
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
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
			return _.map(this.virs1, (data: object, rowIndex: number) => {
				return (
					<div
						role="tr"
						class="xVirTable-row flex horizon"
						data-row-key={rowIndex}>
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
		vDomBody() {
			return (
				<div role="tbody" class="xVirTable-tbody">
					{this.vDomBodyTr}
				</div>
			);
		}
	},
	methods: {
		setPerBlockHeight: _.debounce(function (viewportHeight: number) {
			this.perBlockRowCount = Math.ceil(viewportHeight / this.rowHeight);
			this.perBlockHeight = this.perBlockRowCount * this.rowHeight;
		}, 33),
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
				this.$emit("update:top", top);
			}
		},
		setHeight() {
			const height = this.dataSource.length * this.rowHeight;
			/* @ts-ignore */
			this.styleWrapperAll.height = `${height}px`;
			this.$emit("update:scrollHeight", height);
		}
	},
	watch: {
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
				role="table"
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
