const fs = require("fs").promises;
const path = require("path");
const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);

(async () => {
	const dirArray = await fs.readdir(
		pathD("../../public/assets/highlightstyles")
	);
	console.log(dirArray);
	const json = dirArray
		.filter(name => /.css$/g.test(name))
		.map(name => ({
			value: name,
			label: name
		}));
	const content = `export const MkitCsslist = ${JSON.stringify(json, null, 2)}`;
	await fs.writeFile(
		pathD("../../src/components/MkitCsslist.js"),
		content,
		"utf-8"
	);
})();
