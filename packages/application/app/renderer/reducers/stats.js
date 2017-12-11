import { IMPORT_STATS_FULFILLED, UPDATE_STATS, LOAD_STATS_FULFILLED } from '../actions/types';

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
        this.isEntry = chunk.isEntry;
    }
}

class Asset {
    constructor(asset) {
        this.name = asset.name;
        this.size = asset.size;
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
        this.assets = assets.map(asset => new Asset(asset));
    }

    setMain(module) {
        this.mainModule = module;
    }

    doneInit() {
        delete this._raw;

        this.modules.forEach((module) => {
            module.doneInit();
        });
    }
}

function buildStats(stats) {
    const parsedStats = new Stats(stats);

    parsedStats.setModules(stats.modules);

    parsedStats.modules.forEach((module) => {
        module.setIssuer(parsedStats.modules);
        module.setReasons(parsedStats.modules);
        module.setChildren(parsedStats.modules);

        if (!module.issuer) {
            parsedStats.setMain(module);
        }
    });

    parsedStats.setChunks(stats.chunks);
    parsedStats.setAssets(stats.assets);

    parsedStats.doneInit();

    console.log(stats);

    return parsedStats;
}

export default function (state = null, { type, payload }) {
    if ((type === LOAD_STATS_FULFILLED && payload) || type === IMPORT_STATS_FULFILLED || type === UPDATE_STATS) {
        return buildStats(payload);
    }

    return state;
}
