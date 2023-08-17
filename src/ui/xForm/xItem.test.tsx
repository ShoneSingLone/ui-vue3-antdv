import { defineComponent, reactive } from "vue";
import { defItem } from "@ventose/ui";
import dayjs from "dayjs";

export default defineComponent({
	setup() {
		const conditions = reactive(
			defItem({
				value: null,
				label: "环境",
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
					<mkit md="antdv重置清空value会变成undefined，xItem重置为null，不然undefined会被判定为没有value" />
					<xItem configs={conditions.envType} />
					<div>
						<h5>typeof conditions.envType.value</h5>{" "}
						{typeof conditions.envType.value}
					</div>
					<div>
						<h5>conditions.envType.value </h5>
						{conditions.envType.value}
					</div>
				</>
			);
		};
	}
});
