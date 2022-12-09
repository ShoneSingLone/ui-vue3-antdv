<script lang="jsx">
import { Table } from "ant-design-vue";
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import { filterColIsShow } from "./common";
import { xPagination } from "./xPagination";
import { Cpt_UI_locale } from "../State_UI";

export default defineComponent({
	name: "XDataGrid",
	components: { xPagination },
	props: {
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	setup() {
		return { Cpt_UI_locale };
	},
	data() {
		return {
			State: { id: xU.genId("xDataGrid") }
		};
	},
	computed: {
		/*列*/
		Cpt_Columns() {
			/*如果分组，默认的filter无效，需要自己实现*/
			if (this.configs.isGroupingColumns) {
				return this.configs.columns;
			}
			let columns = null;
			columns = xU.map(this.Cpt_ColumnsOrder, prop =>
				xU.find(this.configs.columns, { prop })
			);
			columns = xU.filter(columns, i => filterColIsShow(i?.isShow, i?.prop));
			return columns;
		},
		/*列顺序 TODO:如果有排序的需求 */
		Cpt_ColumnsOrder() {
			const order = (() => {
				if (this.configs.columns_order) {
					return this.configs.columns_order;
				} else {
					return xU.map(this.configs.columns, i => i.prop);
				}
			})();
			return xU.filter(order, i => !!i);
		},
		Cpt_AntTableProperty() {
			if (this.configs.antTableProperty) {
				return this.configs.antTableProperty;
			} else {
				return {};
			}
		},
		/*表格*/
		Cpt_VNodeTable() {
			if (this.configs.renderTable) {
				return this.configs.renderTable({ vm: this });
			} else {
				const slots = {
					emptyText: () => (
						<div class="ant-empty ant-empty-normal">
							<div class="ant-empty-image">
								<svg
									class="ant-empty-img-simple"
									width="64"
									height="41"
									viewBox="0 0 64 41">
									<g transform="translate(0 1)" fill="none" fill-rule="evenodd">
										<ellipse
											class="ant-empty-img-simple-ellipse"
											fill="#F5F5F5"
											cx="32"
											cy="33"
											rx="32"
											ry="7"></ellipse>
										<g
											class="ant-empty-img-simple-g"
											fill-rule="nonzero"
											stroke="#D9D9D9">
											<path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
											<path
												d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
												fill="#FAFAFA"
												class="ant-empty-img-simple-path"></path>
										</g>
									</g>
								</svg>
							</div>
							<p class="ant-empty-description">
								{this.Cpt_UI_locale.Empty.description}
							</p>
						</div>
					),
					bodyCell: args => {
						const { column } = args;
						if (column && column.renderCell) {
							/* column index record text value */
							const vNode = column.renderCell(args);
							/*fix:返回null会判断为没有renderCell处理，直接取prop字段的数据*/
							if (xU.isNull(vNode) || xU.isUndefined(vNode)) {
								return "";
							}
							return vNode;
						}
					}
				};
				const scroll = (() => {
					if (this.configs.scroll) {
						return this.configs.scroll;
					}
					return { x: 300 };
				})();
				return (
					<Table
						loading={this.configs.isLoading}
						dataSource={this.configs.dataSource}
						columns={this.Cpt_Columns}
						scroll={scroll}
						pagination={false}
						locale={this.Cpt_UI_locale.Table}
						{...this.Cpt_AntTableProperty}
						v-slots={slots}
					/>
				);
			}
		},
		Cpt_VNodePagination() {
			if (this.configs.isHidePagination) {
				return null;
			}
			return (
				<xPagination
					class="table-pagination"
					pagination={this.configs.pagination}
					onPaginationChange={this.handlePaginationChange}
				/>
			);
		}
	},
	mounted() {
		if (this.configs.onMounted) {
			this.configs.onMounted({ id: this.State.id });
		}
	},
	methods: {
		async handlePaginationChange(pagination) {
			if (this?.configs?.onPaginationChange) {
				this.configs.isLoading = true;
				await this.configs.onPaginationChange(pagination);
				this.configs.isLoading = false;
			}
		}
	},
	render() {
		return (
			<div id={this.State.id}>
				{this.Cpt_VNodeTable}
				{this.Cpt_VNodePagination}
			</div>
		);
	}
});
</script>

<style>
.table-options {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 10px 0;
}

.table-filter {
	margin-left: 4px;
}

.table-pagination {
	padding: 10px 0;
}
</style>
