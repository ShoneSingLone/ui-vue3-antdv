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

const EXTERNAL_LIBS = {
	"element-plus": "ElementPlus",
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
		// minify: "terser",
		minify: false,
		outDir: "dist",
		terserOptions: {
			compress: {
				drop_debugger: true
			}
		},
		rollupOptions: {
			external: Object.keys(EXTERNAL_LIBS),
			plugins: [],
			output: {
				chunkFileNames: ({ name, type: assetType }) => {
					return "assets/chunk/[name].js";
				},
				assetFileNames: ({ name, type: assetType }) => {
					if (name === "style.css" && isLib) {
						return "VentoseUI.css";
					} else {
						return "assets/[ext]/[name].[ext]";
					}
				},
				globals: EXTERNAL_LIBS
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
		const outDir = `dist_VentoseUI`;
		ConfigOptions.build.outDir = outDir;
		ConfigOptions.plugins.push(
			visualizer({
				filename: `${outDir}/VentoseUI_stats.html`
			})
		);

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
		const outDir = `dist_VentoseUI_${libXxxName}`;
		ConfigOptions.build.outDir = outDir;
		ConfigOptions.plugins.push(
			visualizer({ filename: `${outDir}/${libXxxName}_stats.html` })
		);

		const [name, fileName] = (() => {
			if (libXxxName === "layer") {
				return ["layer", format => `layer.${format}.js`];
			}

			return [
				`VentoseUI.components.${libXxxName}`,
				format => `VentoseUI.${libXxxName}.${format}.js`
			];
		})();

		// plugins.unshift(dts());
		ConfigOptions.build.lib = {
			formats: ["umd", "es"],
			entry: path.resolve(__dirname, `entry/lib/${libXxxName}.vue`),
			name,
			fileName
		};
	}
}

function handleApp() {
	if (isApp) {
		ConfigOptions.plugins = [
			importToCdn({
				modules: [
					{
						name: "dayjs",
						var: "dayjs",
						path: "./assets/libs/dayjs.js"
					},
					{
						name: "axios",
						var: "axios",
						path: "./assets/libs/axios/0.26.0/axios.min.js"
					},
					{ name: "jquery", var: "$", path: "./assets/libs/jquery.js" },
					{ name: "lodash", var: "_", path: "./assets/libs/lodash.js" },
					{
						name: "jsondiffpatch",
						var: "jsondiffpatch",
						path: "./assets/libs/jsondiffpatch.umd.js"
					},
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
						name: "element-plus",
						var: "ElementPlus",
						path: "./assets/libs/element/index.full.min.js"
					},
					{
						name: "@ventose/ui",
						var: "VentoseUI",
						path: "./assets/libs/dist_VentoseUI/VentoseUI.umd.js",
						css: "./assets/libs/dist_VentoseUI/VentoseUI.css"
					}
				]
			}),
			useVue(),
			useVueJsx(),
			svgHelper()
		];
		ConfigOptions.build.outDir = "prod_website";
		ConfigOptions.build.rollupOptions.output.entryFileNames = _ => "[name].js";
	}
}
