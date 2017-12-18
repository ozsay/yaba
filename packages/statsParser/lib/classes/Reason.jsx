export class Reason {
    constructor(reason) {
        this._raw = reason;

        this.userRequest = reason.userRequest;
    }

    setModule(modules) {
        this.module = modules[this._raw.moduleId];
    }

    doneInit() {
        delete this._raw;
    }

    reasonText() {
        return '';
    }
}

export class EntryReason extends Reason {
    constructor(reason) {
        super(reason);

        this.type = 'entry';
    }

    reasonText() {
        return this.line;
    }
}

export class RequireReason extends Reason {
    constructor(reason) {
        super(reason);

        this.type = 'commonjs';
        const [line, column] = reason.loc.split(':');
        const [start, end] = column.split('-');

        this.line = line;
        this.start = start;
        this.end = end;
    }

    reasonText() {
        return `${this.line}:[${this.start}-${this.end}]`;
    }
}

export class ImportReason extends RequireReason {
    constructor(reason) {
        super(reason);

        this.type = 'es6';
    }
}

export class AMDReason extends RequireReason {
    constructor(reason) {
        super(reason);

        this.type = 'amd';
    }
}

export class ContextElementReason extends Reason {
    constructor(reason) {
        super(reason);

        this.type = 'context_element';
    }
}

export default function createReason(reason) {
    if (reason.type === 'cjs require' || reason.type === 'cjs require context') {
        return new RequireReason(reason);
    } else if (reason.type === 'harmony import') {
        return new ImportReason(reason);
    } else if (reason.type === 'single entry') {
        return new EntryReason(reason);
    } else if (reason.type === 'context element') {
        return new ContextElementReason(reason);
    } else if (reason.type === 'amd require') {
        return new AMDReason(reason);
    }

    throw new Error(reason);
}
