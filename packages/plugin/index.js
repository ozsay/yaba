const path = require('path');
const fs = require('fs');

const values = require('lodash.values');
const ipc = require('node-ipc');

ipc.config.id = 'yaba_plugin';
ipc.config.maxRetries = 0;
ipc.config.silent = true;

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

class YabaPlugin {
    constructor({ file = false } = {}) {
        this.file = file;
    }

    apply(compiler) {
        compiler.plugin('emit', (currCompiler, cb) => {
            ipc.connectTo('yaba_application', () => {
                const yabaApplication = ipc.of.yaba_application;

                yabaApplication.on('connect', () => {
                    const { context, output: { path: outputPath } } = currCompiler.options;
                    const stats = currCompiler.getStats().toJson();

                    const packages = {};

                    const pkgJsonsPromises = stats.modules.map(module => new Promise((resolve) => {
                        const modulePath = path.resolve(context, module.name);
                        const moduleDir = path.dirname(modulePath);

                        getPkgJson(moduleDir, ({ dir, pkgJson }) => {
                            resolve({ id: module.id, dir, pkgJson });
                        });
                    }));

                    Promise.all(pkgJsonsPromises).then((pkgJsons) => {
                        pkgJsons.forEach(({ id, dir, pkgJson }) => {
                            packages[dir] = { dir, pkgJson };

                            const module = stats.modules.find(mod => mod.id === id);

                            module.partOf = dir;
                        });

                        stats.packages = values(packages);

                        const finalStats = JSON.stringify(stats);

                        const statsPath = this.file === true ? path.resolve(outputPath, 'stats.json') : this.file;

                        if (statsPath) {
                            fs.writeFileSync(statsPath, finalStats);
                        }

                        yabaApplication.emit('message', finalStats);
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
