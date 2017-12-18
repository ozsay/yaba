import mime from 'mime-types';

export default class Asset {
    constructor(asset, index) {
        this.id = index;
        this.name = asset.name;
        this.size = asset.size;
        this.mimeType = mime.lookup(asset.name);
        this.chunks = [];
        this.modules = [];
    }
}
