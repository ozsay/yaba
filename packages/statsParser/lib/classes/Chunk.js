export default class Chunk {
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
                    a.modules.push(module);
                });

                a.chunks.push(this);
            }
        });
    }

    get modulesSize() {
        let count = 0;

        this.modules.forEach((module) => {
            count += module.size;
        });

        return count;
    }

    doneInit() {
        delete this._raw;
    }
}
