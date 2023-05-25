const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

const cleanDir = async (dirUrl, subDir = "assets") => {
	try {
		dirUrl = pathD(dirUrl, subDir);
		if (!fs.existsSync(dirUrl)) {
			console.log(`[x] : no ${subDir}`);
			return;
		}
		const [dirs, files] = await _n.asyncAllDirAndFile([dirUrl]);
		let file;
		while ((file = files.pop())) {
			await fs.promises.unlink(file);
		}
		if (fs.promises.rm) {
			await fs.promises.rm(dirUrl, { recursive: true });
		} else {
			await fs.promises.rmdir(dirUrl, { recursive: true });
		}
		console.log("[✓] ", `${dirUrl} clean done`);
	} catch (error) {
		console.error(error);
	}
};
const copyStats = async () => {
	try {
		const statsHtmlPath = pathD("../../stats.html");
		if (!fs.existsSync(statsHtmlPath)) {
			console.log("[x] : no stats.html");
			return;
		}
		const content = await fs.promises.readFile(statsHtmlPath);
		await fs.promises.writeFile(
			pathD("../../public/assets/html/stats.html"),
			content
		);
		await fs.promises.unlink(statsHtmlPath);
		console.log("[✓] ", "stats.html move done");
	} catch (error) {
		console.error(error);
	}
};

(async () => {
	const dirs = await fs.promises.readdir(pathD("../.."));
	const distPathArray = dirs.filter(i => /^dist/.test(i)).map(i => pathD("../..", i));
	let distPath;
	while (distPath = distPathArray.pop()) {
		await cleanDir(distPath);
		await cleanDir(distPath, "libs");
	}
	await copyStats();
})();
