//@ts-nocheck
import { defineConfig } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { useDevServer } from "./plugins/vite/devServer";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import svgHelper from "./plugins/vite/svg";
import importToCdn from "./plugins/vite/importTo";

/* css in js =>lib 用 */
/* 包分析 */
import { visualizer } from "rollup-plugin-visualizer";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const isApp = process.env.type === "app";
const isLib = process.env.type === "lib";
const libName = process.env.libName;
const isUseDevServer = process.env.runPlugin === "useDevServer";

const globals = {
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
	cssInjectedByJsPlugin(),
	visualizer()
];

if (isUseDevServer) {
	plugins.unshift(useDevServer());
}

/* 默认打包lib */
const ConfigOptions = {
	base: "./",
	plugins,
	resolve: {
		alias: {
			/* 完整运行时，带编译 */
			vue: "vue/dist/vue.esm-bundler.js",
			"@": path.resolve(__dirname, "./src"),
			"@ventose/ui": path.resolve(__dirname, "./src/ui")
		}
	},
	build: {
		/* 没有混缩 */
		minify: false,
		outDir: "dist",
		rollupOptions: {
			external: Object.keys(globals),
			plugins: [],
			output: {
				globals
			}
		}
	}
};

ConfigOptions.build.lib = {
	formats: ["umd", "es"],
	entry: path.resolve(__dirname, "src/ui/index.tsx"),
	name: "VentoseUI",
	fileName: format => `VentoseUI.${format}.js`
};

if (isLib) {
	ConfigOptions.build.lib = {
		formats: ["umd", "es"],
		entry: path.resolve(__dirname, `entry/lib/${libName}.vue`),
		name: `VentoseUI.components.${libName}`,
		fileName: format => `VentoseUI.${libName}.${format}.js`
	};
	ConfigOptions.build.outDir = `dist_${libName}`;
}

if (isApp) {
	ConfigOptions.plugins = [
		importToCdn({
			modules: [
				{ name: "vue", var: "Vue", path: "./assets/libs/vue/3.2.31/vue.global.js" },
				{ name: "vue-router", var: "VueRouter", path: "./assets/libs/vue/router/4.0.12/vue-router.global.min.js" },
				{ name: "axios", var: "axios", path: "./assets/libs/axios/0.26.0/axios.min.js" },
				{name:"ant-design-vue",var:"antd",path:"./assets/libs/vue/atdv/3.1.0-rc.4/antd.min.js"},
				{name:"jquery",var:"$",path:"./assets/libs/jquery.js"},
				{name:"lodash",var:"_",path:"./assets/libs/lodash.js"},
				{name:"dayjs",var:"dayjs",path:"./assets/libs/dayjs"},
				{name:"jsondiffpatch",var:"jsondiffpatch",path:"./assets/libs/jsondiffpatch.umd.js"}
			]
		}),
		useVue(),
		useVueJsx(),
		svgHelper()
	];
	ConfigOptions.build = {
		outDir: "appdist"
	};
}

// https://vitejs.dev/config/
export default defineConfig(ConfigOptions);
