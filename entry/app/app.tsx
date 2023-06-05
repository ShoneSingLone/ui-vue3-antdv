//@ts-nocheck
import { createApp, reactive } from "vue";
import "@/AppStyle.less";
import { $, VentoseUIWithInstall, State_UI } from "@ventose/ui";
import { router } from "@/router";
import App from "@/App.vue";
import Mkit from "@/components/MarkdownIt.vue";
import { DemoAndCode } from "@/components/DemoAndCode";
import xMenuTreeVue from "../lib/xMenuTree.vue";

const appPlugins = {
	install: (app, options /*{dependState, appPlugins}*/) => {
		/* isUsePopover 全局监听 [data-ui-popover] */
		app.use(VentoseUIWithInstall, {
			appPlugins,
			dependState: options.dependState
		});

		app.use({
			install: (app, { watch } = {}) => {
				app.component(xMenuTreeVue.name, xMenuTreeVue);
				app.component("Mkit", Mkit);
				app.component("DemoAndCode", DemoAndCode);
				//注册i8n实例并引入语言文件
				app.config.globalProperties.$t = State_UI.$t;
				const link = document.getElementById("svg_assets_img");
				if (link) {
					//@ts-ignore
					const src = String(link.href);
					const index = src.match(/assets(.*)/)?.index || 0;
					State_UI.setBasePath(src.substring(0, index));
				}
				$("html").attr("lang", State_UI.language);
				watch && watch();
			}
		});
		app.use(router);
		return app;
	}
};

const State_App = reactive({});

document.title = "vue3+antdv+components";

createApp(App)
	.use(appPlugins, {
		dependState: State_App
	})
	.mount("#app");
