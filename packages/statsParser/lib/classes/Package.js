export default class Package {
    constructor({ dir, pkgJson, root = false }, index) {
        this.id = index.toString();
        this.dir = dir;
        this.root = root;
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
