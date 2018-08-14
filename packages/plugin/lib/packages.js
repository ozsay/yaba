const path = require('path');

const fs = require('fs-extra');

function locatePkgJson(moduleDir) {
    const p = `${moduleDir}/package.json`;
    return fs.access(p)
        .then(() => moduleDir)
        .catch(() => locatePkgJson(path.dirname(moduleDir)));
}

async function getPkgJson(filePath) {
    const data = await fs.readFile(`${filePath}/package.json`, 'utf8');
    return { dir: filePath, pkgJson: JSON.parse(data) };
}

module.exports = async function handlePackages() {
    const { options: { context } } = this.stats.compilation;
    const { modules, loaders } = this.output;

    const pkgJsons = await Promise.all(modules.map(async (module) => {
        const modulePath = path.resolve(context, module.name);
        const moduleDir = path.dirname(modulePath);

        const dir = await locatePkgJson(moduleDir);

        return { id: module.id, dir };
    }));

    const allpkgJsons = pkgJsons.concat(pkgJsons, await Promise.all(loaders.map(async ({ loader }) => {
        const moduleDir = path.dirname(loader);

        const dir = await locatePkgJson(moduleDir);

        return { dir };
    })));

    allpkgJsons.forEach(({ id, dir }) => {
        if (id !== undefined) {
            const module = modules.find(mod => mod.id === id);

            module.partOf = dir;
        }
    });

    const uniqPkgJsons = await Promise.all(allpkgJsons
        .map(({ dir }) => dir)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(getPkgJson));

    const contextPackageJson = await locatePkgJson(context);

    const rootPackage = uniqPkgJsons.find(p => p.dir === contextPackageJson);

    rootPackage.root = true;

    this.output.packages = Object.values(uniqPkgJsons);
};
