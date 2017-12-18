import Module from './Module';
import Chunk from './Chunk';
import Asset from './Asset';
import Package from './Package';

export default class Stats {
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
