module.exports = async function handleLoaders() {
    const { modules } = this.stats.compilation;
    const loaders = [];

    modules.forEach((module) => {
        if (module.loaders && module.loaders.length) {
            const statsModule = this.output.modules.find(mod => mod.id === module.id);
            statsModule.loaders = [];

            module.loaders.forEach((loader) => {
                const indexOfLoader = loaders.findIndex(l => l.loader === loader.loader);

                if (indexOfLoader === -1) {
                    loaders.push(loader);
                    statsModule.loaders.push(loaders.length - 1);
                } else {
                    statsModule.loaders.push(indexOfLoader);
                }
            });
        }
    });

    this.output.loaders = loaders;
};
