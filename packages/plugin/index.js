const path = require('path');

const tmp = require('tmp');
const fs = require('fs-extra');
const values = require('lodash.values');
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

function getPkgJson(moduleDir, cb) {
    fs.access(`${moduleDir}/package.json`, (err) => {
        if (err) {
            getPkgJson(path.dirname(moduleDir), cb);
            return;
        }

        fs.readFile(`${moduleDir}/package.json`, 'utf8', (readErr, data) => {
            cb({
                dir: moduleDir,
                pkgJson: JSON.parse(data),
            });
        });
    });
}

function getPackages(context, modules) {
    const packages = {};

    const pkgJsonsPromises = modules.map(module => new Promise((resolve) => {
        const modulePath = path.resolve(context, module.name);
        const moduleDir = path.dirname(modulePath);

        getPkgJson(moduleDir, ({ dir, pkgJson }) => {
            resolve({ id: module.id, dir, pkgJson });
        });
    }));

    return Promise.all(pkgJsonsPromises).then((pkgJsons) => {
        pkgJsons.forEach(({ id, dir, pkgJson }) => {
            packages[dir] = { dir, pkgJson };

            const module = modules.find(mod => mod.id === id);

            module.partOf = dir;
        });

        return values(packages);
    });
}

class YabaPlugin {
    apply(compiler) {
        compiler.plugin('after-emit', (currCompiler, cb) => {
            ipc.connectTo('yaba_application', () => {
                const yabaApplication = ipc.of.yaba_application;

                yabaApplication.on('connect', () => {
                    const { context, output: { path: outputPath } } = currCompiler.options;
                    const stats = currCompiler.getStats().toJson();

                    getPackages(context, stats.modules)
                        .then((packages) => {
                            stats.packages = packages;

                            return writeAssets(outputPath, currCompiler.assets, stats);
                        })
                        .then((tmpPath) => {
                            yabaApplication.emit('message', JSON.stringify({ context, path: tmpPath }));
                        });
                });

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
