//@ts-nocheck
import { createApp, reactive } from "vue";
import "./AppStyle.less";
import { _, $, VentoseUIWithInstall, State_UI, $ } from "@ventose/ui";
import { router } from "./router";
import App from "./App.vue";
import mkit from "./components/mkit.vue";

const appPlugins = {
	install: (app, options /*{dependState, appPlugins}*/) => {
		/* isUsePopover 全局监听 [data-ui-popover] */
		app.use(VentoseUIWithInstall, {
			appPlugins,
			dependState: options.dependState
		});
		app.use({
			install: (app, { watch } = {}) => {
				app.component("mkit", mkit);
				//注册i8n实例并引入语言文件
				app.config.globalProperties.$t = State_UI.$t;
				State_UI.setAssetsBaseById("svg_assets_img");
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
