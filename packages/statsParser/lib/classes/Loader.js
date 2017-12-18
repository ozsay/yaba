export default class Loader {
    constructor({ loaderModule: { dir, pkgJson } }, index) {
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
            if (mod._raw.loaders && mod._raw.loaders.indexOf(this.id) > -1) {
                mod.loaders.push(this);
                this.modules.push(mod);
            }
        });
    }
}
