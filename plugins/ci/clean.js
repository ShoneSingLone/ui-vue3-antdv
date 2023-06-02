const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

(async () => {
	const dirs = await fs.promises.readdir(pathD("../.."));
	const distPathArray = dirs.filter(i => /^dist/.test(i)).map(i => pathD("../..", i));
	let dirUrl;
	while (dirUrl = distPathArray.pop()) {
		console.log('🚀:', 'clean', JSON.stringify(dirUrl, null, 2));
		try {
			await _n.asyncRmDir(pathD(dirUrl, "assets"));
			await _n.asyncCpDir(dirUrl, pathD("../../public/assets/libs"));
			await _n.asyncRmDir(pathD(dirUrl));
		} catch (error) {
			console.error(error);
		}
	}
})();
