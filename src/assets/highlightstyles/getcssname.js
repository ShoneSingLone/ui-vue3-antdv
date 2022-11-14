const fs = require("fs").promises;
const path = require("path");
(async () => {

    const dirArray = await fs.readdir(path.resolve(__dirname));
    console.log(dirArray);
    const json = dirArray
        .filter(name => /.css$/g.test(name))
        .map(name => ({
            value: name,
            label: name
        }));
    const content = `export default ${JSON.stringify(json, null, 2)}`;
    await fs.writeFile("./csslist.mjs", content, "utf-8");
})();