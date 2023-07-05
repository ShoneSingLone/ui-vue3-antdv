const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

(async () => {
    const [dirs, files] = await _n.asyncAllDirAndFile([pathD("../../src")]);
    const filePathArray = files.filter(i => /\.map$/.test(i));
    let fileUrl;
    while (fileUrl = filePathArray.pop()) {
        const jsUrl = fileUrl.replace(".map", "");
        try {
            await fs.promises.rm(fileUrl);
            await fs.promises.rm(jsUrl);
            console.log('🚀:', 'rm', fileUrl);
        } catch (error) {
            console.error(error);
        }
    }
})();
