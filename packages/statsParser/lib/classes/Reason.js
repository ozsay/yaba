export class Reason {
    constructor(reason) {
        this._raw = reason;

        this.userRequest = reason.userRequest;
    }

    setModule(modules) {
        if (this._raw.moduleId !== null) {
            this.module = modules.find(m => m.id === this._raw.moduleId.toString());
        }
    }

    doneInit() {
        delete this._raw;
    }

    get text() {
        return '';
    }
}

export class EntryReason extends Reason {
    constructor(reason) {
        super(reason);

        this.type = 'entry';
    }

    get text() {
        return `single entry as '${this.userRequest}'`;
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

    get text() {
        return `${this.type} at ${this.line}:[${this.start}-${this.end}] as '${this.userRequest}'`;
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

export default function createReason(reason, index) {
    if (reason.type === 'cjs require' || reason.type === 'cjs require context') {
        return new RequireReason(reason, index);
    }

    if (reason.type === 'harmony import'
        || reason.type === 'harmony side effect evaluation'
        || reason.type === 'harmony import specifier') {
        return new ImportReason(reason, index);
    }

    if (reason.type === 'single entry' || reason.type === 'multi entry') {
        return new EntryReason(reason, index);
    }

    if (reason.type === 'context element') {
        return new ContextElementReason(reason, index);
    }

    if (reason.type === 'amd require') {
        return new AMDReason(reason, index);
    }

    // throw new Error(reason);

    return new ContextElementReason(reason, index);
}
