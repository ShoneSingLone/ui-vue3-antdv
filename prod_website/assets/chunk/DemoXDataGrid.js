import{a as e}from"./app.js";import"../../entry/index.js";const a={status:[{label:"开通",value:"ACTIVATED"},{label:"未开通",value:"NONACTIVATED"}],statusFn(e){return"all"===e?[{label:"所有状态",value:""}].concat(this.status):this.status},serviceType:[{label:"镜像",value:1},{label:"SAAS",value:0}],support:[{label:"支持",value:1},{label:"不支持",value:0}],specType:[{label:"aarch64",value:"aarch64"},{label:"x86_64",value:"x86_64"}],vmStatus:[{label:"运行中",value:"ACTIVE"},{label:"--",value:"DELETE"}],instanceStatus:[{label:"已激活",value:7},{label:"删除成功",value:4}],op:[{label:"跳转",value:0},{label:"访问管理",value:1},{label:"变更",value:2},{label:"销毁",value:3},{label:"agent下载",value:4}]};const l=e({name:"DemoXDataGrid",methods:{handlePaginationChange(e){VentoseUI.xU("🚀:","pagination",JSON.stringify(e,null,2))}},data:()=>({configs_table:VentoseUI.defDataGridOption({async queryTableList(e){},dataSource:[],columns:{...VentoseUI.defCol({prop:"name",label:VentoseUI.$t("名称").label}),...VentoseUI.defCol({prop:"status",label:VentoseUI.$t("状态").label,renderCell:({record:e})=>`${VentoseUI.xU.valueToLabel(e.status,a.status)}`}),...VentoseUI.defCol({prop:"capacity",label:VentoseUI.$t("总容量").label,renderCell({record:e}){const{totalCapacity:a,usedCapacity:l,status:t}=e;return"ACTIVATION"===t?"--":`${l||"--"} / ${a||"--"} GB`}}),...VentoseUI.defCol({prop:"category",label:VentoseUI.$t("类别").label,renderCell:({record:e})=>e.tenant?VentoseUI.$t("租户").label:e.level?VentoseUI.$t("级VDC",{level:e.level||"1"}).label:"--"}),...VentoseUI.defCol({prop:"upperName",isShow:!1,label:VentoseUI.$t("上级名称").label}),...VentoseUI.defCol({prop:"startDate",label:VentoseUI.$t("开始时间").label,renderCell:({record:e})=>VentoseUI.xU.dateFormat(e.startDate)}),...VentoseUI.defCol({prop:"endDate",label:VentoseUI.$t("到期时间").label,renderCell:({record:e})=>VentoseUI.xU.dateFormat(e.endDate)})}})})},[["render",function(e,a,l,t,o,n){const s=Vue.resolveComponent("DemoAndCode"),r=Vue.resolveComponent("mkit"),u=Vue.resolveComponent("xDataGrid"),i=Vue.resolveComponent("xPagination");return Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[Vue.createVNode(s,{title:"xVirTable：虚拟列表用于无分页的大量数据展示",path:"/boundless/demo/table/DemoXDataGridxVirTable.sfc"}),Vue.createVNode(s,{title:"xVirTable动态添加行记录",path:"/boundless/demo/table/DemoXDataGridxVirTableDynamicAdd.sfc"}),Vue.createVNode(r,{md:"### xDataGrid"}),Vue.createVNode(u,{configs:o.configs_table},null,8,["configs"]),Vue.createVNode(r,{md:"### xPagination"}),Vue.createVNode(i,{class:"table-pagination",pagination:o.configs_table.pagination,onPaginationChange:n.handlePaginationChange},null,8,["pagination","onPaginationChange"])],64)}]]);export{l as default};
