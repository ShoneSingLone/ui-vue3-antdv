import externalGlobals from "rollup-plugin-external-globals";
import fs from "fs";
import path from "path";
import { Plugin, UserConfig } from "vite";
import { load as CheerioLoad } from "cheerio";
import dayjs from "dayjs";

export interface Module {
	name: string;
	var: string;
	path: string | string[];
	css?: string | string[];
}

export interface Options {
	modules: (Module | ((prodUrl: string) => Module))[];
	prodUrl?: string;
}

/**
 * get npm module version
 * @param name
 * @returns
 */
function getModuleVersion(name: string): string {
	const pwd = process.cwd();
	const pkgFile = path.join(pwd, "node_modules", name, "package.json");
	if (fs.existsSync(pkgFile)) {
		const pkgJson = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
		return pkgJson.version;
	}
	/*如果没有找到，无所谓  */
	return name;
}

/**
 * 是否完整的 url
 * @param path
 * @returns
 */
function isFullPath(path: string) {
	return path.startsWith("http:") ||
		path.startsWith("https:") ||
		path.startsWith("//")
		? true
		: false;
}

function renderUrl(
	url: string,
	data: {
		name: string;
		version: string;
		path: string;
	}
) {
	const { path } = data;
	if (isFullPath(path)) {
		url = path;
	} else if (/^\.\//.test(path)) {
		console.log(path);
		return path;
	}

	return url
		.replace(/\{name\}/g, data.name)
		.replace(/\{version\}/g, data.version)
		.replace(/\{path\}/g, path);
}

function PluginImportToCDN(options: Options): Plugin[] {
	const {
		modules = [],
		prodUrl = "https://cdn.jsdelivr.net/npm/{name}@{version}/{path}"
	} = options;

	let isBuild = false;

	const data = modules.map(m => {
		let v: Module;
		if (typeof m === "function") {
			v = m(prodUrl);
		} else {
			v = m;
		}
		const version = getModuleVersion(v.name);
		let pathList: string[] = [];
		if (!Array.isArray(v.path)) {
			pathList.push(v.path);
		} else {
			pathList = v.path;
		}

		const data = {
			...v,
			version
		};

		pathList = pathList.map(p => {
			if (!version && !isFullPath(p)) {
				throw new Error(
					`modules: ${data.name} package.json file does not exist`
				);
			}
			return renderUrl(prodUrl, {
				...data,
				path: p
			});
		});

		let css = v.css || [];
		if (!Array.isArray(css) && css) {
			css = [css];
		}

		const cssList = !Array.isArray(css)
			? []
			: css.map(c =>
					renderUrl(prodUrl, {
						...data,
						path: c
					})
			  );

		return {
			...v,
			version,
			pathList,
			cssList
		};
	});

	const externalMap: {
		[name: string]: string;
	} = {};

	data.forEach(v => {
		externalMap[v.name] = v.var;
	});

	const externalLibs = Object.keys(externalMap);

	const plugins: Plugin[] = [
		{
			name: "vite-plugin-cdn-import",
			config(_, { command }) {
				const userConfig: UserConfig = {
					build: {
						rollupOptions: {}
					}
				};

				if (command === "build") {
					isBuild = true;

					userConfig!.build!.rollupOptions = {
						external: [...externalLibs],
						plugins: [externalGlobals(externalMap)]
					};
				} else {
					isBuild = false;
				}

				return userConfig;
			},
			transformIndexHtml(html) {
				const cssCode = data
					.map(v =>
						v.cssList
							.map(css => `<link href="${css}" rel="stylesheet">`)
							.join("\n")
					)
					.filter(v => v)
					.join("\n");

				const jsCode = !isBuild
					? ""
					: data
							.map(p =>
								p.pathList
									.map(url => `<script src="${url}"></script>`)
									.join("\n")
							)
							.join("\n");
				// fs.writeFileSync("./html.html", html, "utf-8");

				const $ = CheerioLoad(html);
				$("#app_version_info").html(
					`window.__APP_VERSION="${dayjs().format("YYYY-MM-DD-HH_mm_ss")}"`
				);
				const $body = $("body");
				const $mainJs = $("script[type=module]");
				const mainJs = $mainJs.prop("outerHTML");
				$mainJs.remove();
				const appDiv = $body.html();
				$body.empty();
				$body.html(`${appDiv}${jsCode}${mainJs}`);
				$("title").after(`${cssCode}`);
				return $.html();
			}
		}
	];

	return plugins;
}

export { PluginImportToCDN as Plugin, Options };

export default PluginImportToCDN;
