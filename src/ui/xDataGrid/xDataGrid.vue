<script lang="jsx">
import { ElTable } from "element-plus";
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
						<div class="x-empty x-empty-normal">
							<div class="x-empty-image">
								<xIcon icon="InsideEmpty" style="width:64px" />
							</div>
							<p class="x-empty-description">
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
					<ElTable
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
	watch: {
		"configs.pagination": {
			deep: true,
			handler(pagination) {
				xU(JSON.stringify(pagination));
			}
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
