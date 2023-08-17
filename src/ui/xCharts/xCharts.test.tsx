import { defineComponent, reactive } from "vue";
import { defItem, xU } from "@ventose/ui";
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

		const ComparisonOfPeakClusterCpuUsage = {
			initOptions(props) {
				const series = [{ name: "CPU峰值利用率", data: [], type: "bar" }];
				return {
					legend: {
						data: series.map(i => i.name)
					},
					tooltip: {},
					toolbox: {
						show: true,
						orient: "vertical",
						left: "right",
						top: "center",
						feature: {
							saveAsImage: { show: true }
						}
					},
					xAxis: {
						type: "category",
						data: []
					},
					yAxis: {
						type: "value"
					},
					series
				};
			},
			updateOptions(options, dataset) {
				return {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					legend: {},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [
						{
							type: "category",
							data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
						}
					],
					yAxis: [
						{
							type: "value"
						}
					],
					series: [
						{
							name: "Direct",
							type: "bar",
							emphasis: {
								focus: "series"
							},
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: "Email",
							type: "bar",
							stack: "Ad",
							emphasis: {
								focus: "series"
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: "Union Ads",
							type: "bar",
							stack: "Ad",
							emphasis: {
								focus: "series"
							},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: "Video Ads",
							type: "bar",
							stack: "Ad",
							emphasis: {
								focus: "series"
							},
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: "Search Engine",
							type: "bar",
							data: [862, 1018, 964, 1026, 1679, 1600, 1570],
							emphasis: {
								focus: "series"
							},
							markLine: {
								lineStyle: {
									type: "dashed"
								},
								data: [[{ type: "min" }, { type: "max" }]]
							}
						},
						{
							name: "Baidu",
							type: "bar",
							barWidth: 5,
							stack: "Search Engine",
							emphasis: {
								focus: "series"
							},
							data: [620, 732, 701, 734, 1090, 1130, 1120]
						},
						{
							name: "Google",
							type: "bar",
							stack: "Search Engine",
							emphasis: {
								focus: "series"
							},
							data: [120, 132, 101, 134, 290, 230, 220]
						},
						{
							name: "Bing",
							type: "bar",
							stack: "Search Engine",
							emphasis: {
								focus: "series"
							},
							data: [60, 72, 71, 74, 190, 130, 110]
						},
						{
							name: "Others",
							type: "bar",
							stack: "Search Engine",
							emphasis: {
								focus: "series"
							},
							data: [62, 82, 91, 84, 109, 110, 120]
						}
					]
				};
			}
		};

		const chartsDataSource = [
			{
				id: "0724ea9948f1bfd17a3f3479915c185b",
				region: "网络区域",
				roomEnv: "机房环境",
				envType: "环境类型",
				platformId: "rancher001",
				clusterName: "local",
				clusterId: "local",
				nodeNum: 1,
				cpuNum: 8,
				cpuUsed: 1,
				cpuPeakUtilizationRate: 4,
				cpuUtilizationRate: 3,
				cpuAllocationRate: 13,
				memNum: 15.5,
				memUsed: 1.2,
				memAllocationRate: 9,
				memUtilizationRate: 71,
				podNum: 110,
				podUsed: 26,
				podUtilizationRate: 24,
				projectNum: 3,
				createDate: "2023-02-08 18:39:34",
				statisticalTime: "2023-08-16 23:59:59"
			},
			{
				id: "9453bb05376612b5c7bbc859cae92409",
				region: "网络区域",
				roomEnv: "机房环境",
				envType: "环境类型",
				platformId: "rancher001",
				clusterName: "ghca",
				clusterId: "c-2xlgn",
				nodeNum: 1,
				cpuNum: 8,
				cpuUsed: 2,
				cpuPeakUtilizationRate: 3,
				cpuUtilizationRate: 3,
				cpuAllocationRate: 25,
				memNum: 15.5,
				memUsed: 1.4,
				memAllocationRate: 10,
				memUtilizationRate: 28,
				podNum: 110,
				podUsed: 17,
				podUtilizationRate: 15,
				projectNum: 5,
				createDate: "2023-03-09 11:38:38",
				statisticalTime: "2023-08-16 23:59:59"
			}
		];

		return () => {
			return (
				<>
					<xCharts
						configs={ComparisonOfPeakClusterCpuUsage}
						dataset={chartsDataSource}
						class="flex1"
						style="height: 500px"
					/>
				</>
			);
		};
	}
});
