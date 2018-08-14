import createReason from './Reason';

export default class Module {
    constructor(module) {
        this._raw = module;

        this.id = module.id.toString();
        this.name = module.name;
        this.fullPath = module.resource;
        this.relativePath = module.relativePath;
        this.size = module.size;
        this.source = module.source;
        this.errors = module.errors;
        this.warnings = module.warnings;
        this.assets = [];
        this.loaders = [];
    }

    setIssuer(modules) {
        if (this._raw.issuerId !== null) {
            this.issuer = modules.find(m => m.id === this._raw.issuerId.toString());
        }
    }

    setReasons(modules) {
        this.reasons = this._raw.reasons
            .filter(reason => reason.type !== 'multi entry')
            .filter(reason => reason.type !== 'harmony import specifier')
            .map((reason, i) => createReason(reason, i));

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

    get display() {
        if (!this.fullPath) {
            return this.name;
        }

        const splittedPath = this.fullPath.split('/');
        return splittedPath[splittedPath.length - 1];
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
