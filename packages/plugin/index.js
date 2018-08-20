const path = require('path');
const util = require('util');

const ipc = require('node-ipc');
const tmp = require('tmp');
const fs = require('fs-extra');

const handlers = require('./lib');

const PLUGIN_NAME = 'YabaPlugin';

ipc.config.id = 'yaba_plugin';
ipc.config.maxRetries = 0;
ipc.config.silent = true;

const tmpDirAsync = util.promisify(tmp.dir);

class YabaPlugin {
    constructor({ originalSource = false, emitToFile = true } = {}) {
        this.originalSource = originalSource;
        this.emitToFile = emitToFile;
    }

    async handleStats(stats) {
        this.stats = stats;
        this.output = this.stats.toJson();

        this.output.options = {};

        const fields = ['context', 'devtool', 'mode'];

        for (const prop in this.stats.compilation.options) {
            if (fields.indexOf(prop) > -1) {
                this.output.options[prop] = this.stats.compilation.options[prop];
            }
        }

        this.outputDir = await tmpDirAsync({ unsafeCleanup: true });

        for (const handler of handlers) {
            await handler.call(this);
        }

        await fs.writeJson(path.resolve(this.outputDir, 'stats.json'), this.output);
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync(PLUGIN_NAME, (stats, cb) => {
            ipc.connectTo('yaba_application', () => {
                const yabaApplication = ipc.of.yaba_application;

                yabaApplication.on('connect', () => {
                    this.handleStats(stats)
                        .then(() => {
                            const { context } = this.stats.compilation.options;
                            yabaApplication.emit('message', JSON.stringify({ context, path: this.outputDir }));
                        })
                        .catch((e) => {
                            console.log(e);
                            cb();
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
                });
            });
        });
    }
}

module.exports = YabaPlugin;
