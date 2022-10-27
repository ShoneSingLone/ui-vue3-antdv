const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

const cleanDir = async (dirUrl) => {
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
    } catch (error) {

    } finally {
        console.log("dist clean done");
    }
};

cleanDir(pathD("../../dist/assets"));
