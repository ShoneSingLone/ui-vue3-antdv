import { Plugin, ViteDevServer } from "vite";
import { _n } from "@ventose/utils-node";
import { readFileSync } from "fs";
const pathD = _n.getPathD(__dirname);
type IframeMeta = {
	title?: string;
	entry: string;
};

const contentCollection = {};

export function useDevServer(): Plugin {
	return {
		name: "dev-server",
		closeBundle(...args) {
			const { type, libName } = process.env;
			console.log("closeBundle", __dirname, args, type, libName);
		},
		configureServer(server: ViteDevServer) {
			server.middlewares.use(
				async (req: any, res: any, next: any): Promise<any> => {
				/** 处理高亮css
					1.解析路径
					2.加载css 文本
					3.转发文本
				 */
					if (String(req.url).indexOf("public/assets/highlightstyles") > -1) {
						try {
							const assetsURL = pathD("../..", String(req.url).substring(1));
							let content = contentCollection[assetsURL];
							if (!content) {
								contentCollection[assetsURL] = content =
									readFileSync(assetsURL);
							}
							res.writeHead(200, { "Content-Type": "application/text" });
							res.end(content);
						} catch (error) {
							console.log(error);
							await next();
						}
					} else {
						await next();
					}
				}
			);
		}
	};
}
