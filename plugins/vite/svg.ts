//@ts-nocheck

/* https://zhuanlan.zhihu.com/p/364275970 */
/* https://juejin.cn/post/6876812524338216973 */
import { compileTemplate } from "vue/compiler-sfc";
import fs from "fs";
import { optimize as optimizeSvg } from "svgo";
import PATH from "path";



export default function svgHelper(options = {}) {
	/* @ts-ignore */
	const { svgoConfig, svgo } = options;

	const svgRegex = /\.svg$/;

	return {
		name: "svg-loader",
		enforce: "pre",
		resolveid(id) {
			if (id.match(svgRegex)) {
				return id;
			}
		},

		async load(id) {
			if (!id.match(svgRegex)) {
				return;
			}

			const [path] = id.split("?", 2);
			let name = PATH.basename(path).replace(".svg", "");

			let svg = fs.readFileSync(path, "utf-8");
			if (svgo !== false) {
				/* @ts-ignore */
				svg = optimizeSvg(svg, svgoConfig).data;
			}
			const { code } = compileTemplate({
				id: JSON.stringify(id),
				source: svg,
				filename: path,
				transformAssetUrls: false
			});

			const target = `${code}; export default { name:"${name}", render:render };`;
			/*console.log(target); */
			return target
		}
	};
};