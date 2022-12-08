const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

const cleanDir = async dirUrl => {
	try {
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
		console.log("✓ ","dist clean done");
		const statsHtmlPath = pathD("../../dist/stats.html");
		await fs.promises.copyFile(statsHtmlPath, pathD("../../public/stats.html"));
		await fs.promises.unlink(statsHtmlPath);
		await fs.promises.unlink(pathD("../../stats.html"));
		console.log("✓ ","stats.html move done");
	} catch (error) {
		console.error(error);
	}
};

cleanDir(pathD("../../dist/assets"));
