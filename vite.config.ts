//@ts-nocheck
import { defineConfig } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { useDevServer } from "./plugins/vite/devServer";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import svgHelper from "./plugins/vite/svg";
import importToCdn from "./plugins/vite/importTo";
import dts from "vite-plugin-dts";

/* css in js =>lib 用 */
/* 包分析 */
import { visualizer } from "rollup-plugin-visualizer";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const isApp = process.env.type === "app";
const isLib = process.env.type === "lib";
const isLibXXX = process.env.type === "lib.xxx";
const libXxxName = process.env.libName;
const isUseDevServer = process.env.runPlugin === "useDevServer";

const externalLibs = {
	"ant-design-vue": "antd",
	vue: "Vue",
	jquery: "$",
	lodash: "_",
	dayjs: "dayjs",
	moment: "dayjs",
	axios: "axios",
	jsondiffpatch: "jsondiffpatch",
	"@ventose/ui": "VentoseUI"
};

const plugins = [
	useVue(),
	useVueJsx(),
	svgHelper(),
	// cssInjectedByJsPlugin(),
	visualizer(),
	/* 可访问public里面的静态资源 */
	useDevServer()
];

/* 默认打包lib */
const ConfigOptions = {
	base: "./",
	plugins,
	resolve: {
		alias: {
			/* 完整运行时，带编译 */
			vue: "vue/dist/vue.esm-bundler.js",
			"@": path.resolve(__dirname, "./src"),
			"@ventose/ui": path.resolve(__dirname, "./src/ui/index.tsx")
		}
	},
	build: {
		cssMinify: true,
		minify: false,
		outDir: "dist",
		terserOptions: {
			compress: {
				drop_debugger: true
			}
		},
		rollupOptions: {
			external: Object.keys(externalLibs),
			plugins: [],
			output: {
				assetFileNames: ({ name }) => {
					if (name === "style.css" && isLib) {
						return "VentoseUI.css";
					} else {
						return "[name].[ext]";
					}
				},
				globals: externalLibs
			}
		}
	}
};

handleVentoseUI();
handleVentoseUIxxx();
handleApp();

// https://vitejs.dev/config/
export default defineConfig(ConfigOptions);

function handleVentoseUI() {
	/* VentoseUI */
	if (isLib) {
		ConfigOptions.build.outDir = `dist_VentoseUI`;

		ConfigOptions.build.lib = {
			formats: ["umd", "es"],
			entry: path.resolve(__dirname, "src/ui/index.tsx"),
			name: "VentoseUI",
			fileName: format => `VentoseUI.${format}.js`
		};
	}
}

function handleVentoseUIxxx() {
	/* VentoseUI.xxx 依赖VentoseUI或者其他，总之没有打入VentoseUI */
	if (isLibXXX) {
		ConfigOptions.build.outDir = `dist_VentoseUI_${libXxxName}`;
		// plugins.unshift(dts());
		ConfigOptions.build.lib = {
			formats: ["umd", "es"],
			entry: path.resolve(__dirname, `entry/lib/${libXxxName}.vue`),
			name: `VentoseUI.components.${libXxxName}`,
			fileName: format => `VentoseUI.${libXxxName}.${format}.js`
		};
	}
}

function handleApp() {
	if (isApp) {
		ConfigOptions.plugins = [
			importToCdn({
				modules: [
					{
						name: "vue",
						var: "Vue",
						path: "./assets/libs/vue/3.2.31/vue.global.js"
					},
					{
						name: "vue-router",
						var: "VueRouter",
						path: "./assets/libs/vue/router/4.0.12/vue-router.global.min.js"
					},
					{
						name: "axios",
						var: "axios",
						path: "./assets/libs/axios/0.26.0/axios.min.js"
					},
					{
						name: "ant-design-vue",
						var: "antd",
						path: "./assets/libs/vue/atdv/3.1.0-rc.4/antd.min.js"
					},
					{ name: "jquery", var: "$", path: "./assets/libs/jquery.js" },
					{ name: "lodash", var: "_", path: "./assets/libs/lodash.js" },
					{ name: "dayjs", var: "dayjs", path: "./assets/libs/dayjs" },
					{
						name: "jsondiffpatch",
						var: "jsondiffpatch",
						path: "./assets/libs/jsondiffpatch.umd.js"
					}
				]
			}),
			useVue(),
			useVueJsx(),
			svgHelper()
		];
		ConfigOptions.build.outDir = "prod_website";
	}
}
