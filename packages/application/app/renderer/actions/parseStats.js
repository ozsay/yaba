import mime from 'mime-types';

class Reason {
    constructor(reason) {
        this._raw = reason;

        const [line, column] = reason.loc.split(':');
        const [start, end] = column.split('-');

        this.line = line;
        this.start = start;
        this.end = end;

        this.userRequest = reason.userRequest;

        if (reason.type === 'cjs require') {
            this.type = 'commonjs';
        } else if (reason.type === 'harmony import') {
            this.type = 'es6';
        } else if (reason.type === 'single entry') {
            this.type = 'entry';
        } else {
            throw new Error(reason.type);
        }
    }

    setModule(modules) {
        this.module = modules[this._raw.moduleId];
    }

    doneInit() {
        delete this._raw;
    }

    reasonText() {
        if (this.type === 'entry') {
            return this.line;
        }

        return `${this.line}:[${this.start}-${this.end}]`;
    }
}

class Module {
    constructor(module) {
        this._raw = module;

        this.id = module.id;
        this.name = module.name;
        this.size = module.size;
        this.source = module.source;
        this.errors = module.errors;
        this.warnings = module.warnings;
        this.assets = [];
    }

    setIssuer(modules) {
        this.issuer = modules[this._raw.issuerId];
    }

    setReasons(modules) {
        this.reasons = this._raw.reasons.map(reason => new Reason(reason));

        this.reasons.forEach((reason) => {
            reason.setModule(modules);
        });
    }

    setChildren(modules) {
        this.children = [];

        modules.forEach((module) => {
            if (module._raw.issuerId === this.id) {
                this.children.push(module);
            }
        });
    }

    setChunks(chunks) {
        this.chunks = [];

        chunks.forEach((chunk) => {
            if (this._raw.chunks.find(c2 => chunk.id === c2) !== undefined) {
                this.chunks.push(chunk);
                chunk.modules.push(this);
            }
        });
    }

    get totalSize() {
        let totalSize = this.size;

        this.children.forEach((child) => {
            totalSize += child.totalSize;
        });

        return totalSize;
    }

    get totalErrors() {
        let totalErrors = this.errors;

        this.children.forEach((child) => {
            totalErrors += child.totalErrors;
        });

        return totalErrors;
    }

    get totalWarnings() {
        let totalWarnings = this.warnings;

        this.children.forEach((child) => {
            totalWarnings += child.totalWarnings;
        });

        return totalWarnings;
    }

    doneInit() {
        delete this._raw;

        this.reasons.forEach((reason) => {
            reason.doneInit();
        });
    }
}

class Chunk {
    constructor(chunk) {
        this._raw = chunk;

        this.id = chunk.id;
        this.hash = chunk.hash;
        this.size = chunk.size;
        this.name = chunk.names[0];
        this.isEntry = chunk.entry;
        this.modules = [];
    }

    setAssets(assets) {
        this.assets = [];

        this._raw.files.forEach((asset) => {
            const a = assets.find(a2 => a2.name === asset);

            if (a) {
                this.assets.push(a);

                this.modules.forEach((module) => {
                    module.assets.push(a);
                });

                a.chunks.push(this);
            }
        });
    }

    doneInit() {
        delete this._raw;
    }
}

class Asset {
    constructor(asset, index) {
        this.id = index;
        this.name = asset.name;
        this.size = asset.size;
        this.mimeType = mime.lookup(asset.name);
        this.chunks = [];
    }
}

class Package {
    constructor({ dir, pkgJson }, index) {
        this.id = index;
        this.dir = dir;
        this.name = pkgJson.name;
        this.version = pkgJson.version;
        this.license = pkgJson.license;
        this.homepage = pkgJson.homepage;
        this.description = pkgJson.description;
        this.private = pkgJson.private;
        this.pkgJson = pkgJson;
    }

    setModules(modules) {
        this.modules = [];
        modules.forEach((mod) => {
            if (mod._raw.partOf === this.dir) {
                mod.package = this;
                this.modules.push(mod);
            }
        });
    }

    get size() {
        let size = 0;

        this.modules.forEach((mod) => {
            size += mod.size;
        });

        return size;
    }
}

class Stats {
    constructor(stats) {
        this._raw = stats;

        this.version = stats.version;
        this.hash = stats.hash;
        this.time = stats.time;

        this.errors = stats.errors;
        this.warnings = stats.warnings;
    }

    setModules(modules) {
        this.modules = modules.map(module => new Module(module));
    }

    setChunks(chunks) {
        this.chunks = chunks.map(chunk => new Chunk(chunk));
    }

    setAssets(assets) {
        this.assets = assets.map((asset, i) => new Asset(asset, i));
    }

    setPackages(packages) {
        this.packages = packages.map((_package, i) => new Package(_package, i));
    }

    setMain(module) {
        this.mainModule = module;
    }

    doneInit() {
        delete this._raw;

        this.modules.forEach((module) => {
            module.doneInit();
        });

        this.chunks.forEach((chunk) => {
            chunk.doneInit();
        });
    }
}

function buildStats(stats) {
    return new Promise((resolve, reject) => {
        try {
            const parsedStats = new Stats(stats);

            parsedStats.setModules(stats.modules);
            parsedStats.setChunks(stats.chunks);
            parsedStats.setAssets(stats.assets);
            parsedStats.setPackages(stats.packages);

            parsedStats.modules.forEach((module) => {
                module.setIssuer(parsedStats.modules);
                module.setReasons(parsedStats.modules);
                module.setChildren(parsedStats.modules);
                module.setChunks(parsedStats.chunks);

                if (!module.issuer) {
                    parsedStats.setMain(module);
                }
            });

            parsedStats.packages.forEach((pac) => {
                pac.setModules(parsedStats.modules);
            });

            parsedStats.chunks.forEach((chunk) => {
                chunk.setAssets(parsedStats.assets);
            });

            parsedStats.doneInit();

            console.log(stats);
            console.log(parsedStats);

            resolve(parsedStats);
        } catch (e) {
            reject(e);
        }
    });
}

export const ACTION_TYPE = 'PARSE_STATS';

export default function (stats) {
    return { type: ACTION_TYPE, payload: buildStats(stats) };
}
