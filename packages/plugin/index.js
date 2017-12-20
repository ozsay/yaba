const path = require('path');

const tmp = require('tmp');
const fs = require('fs-extra');
const _ = require('lodash');
const ipc = require('node-ipc');

ipc.config.id = 'yaba_plugin';
ipc.config.maxRetries = 0;
ipc.config.silent = true;

function copyAsset(asset, outputPath, tmpPath) {
    const dest = path.resolve(tmpPath, path.relative(outputPath, asset.existsAt));

    return fs.copy(asset.existsAt, dest);
}

function writeAssets(outputPath, assets, stats) {
    return new Promise((resolve) => {
        tmp.dir((err, tmpPath) => {
            const copyPromises =
                Object.keys(assets).map(asset => copyAsset(assets[asset], outputPath, tmpPath));

            Promise.all([...copyPromises, fs.writeJson(path.resolve(tmpPath, 'stats.json'), stats)])
                .then(() => {
                    resolve(tmpPath);
                });
        });
    });
}

function getPkgJson(moduleDir) {
    return fs.access(`${moduleDir}/package.json`)
        .then(() => fs.readFile(`${moduleDir}/package.json`, 'utf8'))
        .then(data => ({
            dir: moduleDir,
            pkgJson: JSON.parse(data),
        }))
        .then(({ dir, pkgJson }) => {
            if (!pkgJson.name) {
                return Promise.reject();
            }

            return { dir, pkgJson };
        })
        .catch(() => getPkgJson(path.dirname(moduleDir)));
}

async function applyPackages(context, stats) {
    const { modules } = stats;
    const packages = {};

    const pkgJsons = await Promise.all(modules.map(async (module) => {
        const modulePath = path.resolve(context, module.name);
        const moduleDir = path.dirname(modulePath);

        const { dir, pkgJson } = await getPkgJson(moduleDir);

        return { id: module.id, dir, pkgJson };
    }));

    const allpkgJsons = pkgJsons.concat(pkgJsons, await Promise.all(stats.loaders.map(async (loader) => {
        const moduleDir = path.dirname(loader.module);

        const { dir, pkgJson } = await getPkgJson(moduleDir);

        return { dir, pkgJson };
    })));

    allpkgJsons.forEach(({ id, dir, pkgJson }) => {
        packages[dir] = { dir, pkgJson };

        if (!id) {
            return;
        }

        const module = modules.find(mod => mod.id === id);

        module.partOf = dir;
    });

    stats.packages = _.values(packages);
}

function applyMoreDataToModules(compiler, stats) {
    const { modules } = stats;

    _.forEach(modules, (module, i) => {
        module.resource = compiler.modules[i].resource;
        module.relativePath = compiler.modules[i].resource &&
            path.relative(compiler.options.context, compiler.modules[i].resource);
    });
}

async function applyLoaders(compiler, stats) {
    const { modules } = compiler;
    const loaders = [];

    modules.forEach((module) => {
        if (module.loaders && module.loaders.length) {
            const statsModule = stats.modules.find(mod => mod.id === module.id);
            statsModule.loaders = [];

            module.loaders.forEach((loader) => {
                const indexOfLoader = _.findIndex(loaders, loader);

                if (indexOfLoader === -1) {
                    loaders.push(loader);
                    statsModule.loaders.push(loaders.length - 1);
                } else {
                    statsModule.loaders.push(indexOfLoader);
                }
            });
        }
    });

    for (const loader of loaders) {
        loader.module = loader.loader;
    }

    stats.loaders = loaders;
}

async function createStats(compiler) {
    const { context, output: { path: outputPath } } = compiler.options;
    const stats = compiler.getStats().toJson();

    await applyLoaders(compiler, stats);

    await applyPackages(context, stats);

    await applyMoreDataToModules(compiler, stats);

    return writeAssets(outputPath, compiler.assets, stats);
}

class YabaPlugin {
    apply(compiler) {
        compiler.plugin('after-emit', (currCompiler, cb) => {
            ipc.connectTo('yaba_application', () => {
                const yabaApplication = ipc.of.yaba_application;
                const { context } = currCompiler.options;

                yabaApplication.on('connect', () => createStats(currCompiler)
                    .then((tmpPath) => {
                        yabaApplication.emit('message', JSON.stringify({ context, path: tmpPath }));
                    })
                    .catch((e) => {
                        console.log(e);
                        cb();
                    }));

                yabaApplication.on('message', () => {
                    ipc.disconnect('yaba_application');
                    cb();
                });

                yabaApplication.on('error', (err) => {
                    if (err.code === 'ENOENT') {
                        console.warn(`Couldn't connect to Yaba Application`);
                    }

                    cb();
                });
            });
        });
    }
}

module.exports = YabaPlugin;
