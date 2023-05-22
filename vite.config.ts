//@ts-nocheck
import { defineConfig } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { useDevServer } from "./plugins/vite/devServer";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import svgHelper from "./plugins/vite/svg";
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
	ConfigOptions.build = {
		outDir: "appdist"
	};
	ConfigOptions.plugins = [useVue(), useVueJsx(), svgHelper()];
}

// https://vitejs.dev/config/
export default defineConfig(ConfigOptions);
