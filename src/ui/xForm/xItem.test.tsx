import { defineComponent, reactive } from "vue";
import { defItem } from "@ventose/ui";
import dayjs from "dayjs";

export default defineComponent({
	setup() {
		const conditions = reactive(
			defItem({
				value: null,
				placeholder: "环境",
				prop: "envType",
				itemType: "Select",
				allowClear: true,
				style: { width: "140px" },
				options: [
					{ label: "环境类型", value: "环境类型" },
					{ label: "环境类型2", value: "环境类型2" },
					{ label: "环境类型3", value: "环境类型3" }
				]
			})
		);
		return () => {
			return (
				<>
					<xItem configs={conditions.envType} />
					<div>{typeof conditions.envType.value}</div>
					<div>{conditions.envType.value}</div>
				</>
			);
		};
	}
});
