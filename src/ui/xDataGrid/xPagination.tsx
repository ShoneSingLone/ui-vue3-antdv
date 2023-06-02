//@ts-nocheck
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import { setPagination } from "./common";
import { State_UI } from "../State_UI";

const PAGE_SIZE_OPTIONS = ["10", "20", "30"];

export const xPagination = defineComponent({
	name: "xPagination",
	setup() {
		return { State_UI };
	},
	props: {
		onPaginationChange: {
			type: Function,
			default: false
		},
		pagination: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		/* pagination 对象上page,size,total对应的prop字符，可在appConfigs中自定义 */
		const { page, size, total } = State_UI.pagination;
		return {
			pageSizeOptions: PAGE_SIZE_OPTIONS,
			page,
			size,
			total
		};
	},
	methods: {
		onShowSizeChange: xU.debounce(function (page, size) {
			setPagination(this, { page, size });
			if (this.onPaginationChange) {
				this.onPaginationChange(this.pagination);
			}
		}, 30)
	},
	computed: {
		i18nMessage() {
			return {
				总条数: "总条数 {total}",
				条页: "{size}条/页",
				...this.State_UI.i18nMessage
			};
		}
	},
	render() {
		const { page, size, total } = State_UI.pagination;
		xU(page, size, total);

		if (!this.pagination[total]) {
			return null;
		}

		return (
			<aPagination
				v-model:current={this.pagination[page]}
				pageSizeOptions={this.pageSizeOptions}
				total={this.pagination[total]}
				pageSize={this.pagination[size]}
				show-size-changer
				showTotal={total =>
					this.$t("总条数", { total }, this.i18nMessage).label
				}
				onShowSizeChange={this.onShowSizeChange}
				onChange={this.onShowSizeChange}>
				{{
					buildOptionText: props => {
						return (
							<span>
								{this.$t("条页", { size: props.value }, this.i18nMessage).label}
							</span>
						);
					}
				}}
			</aPagination>
		);
	}
});
