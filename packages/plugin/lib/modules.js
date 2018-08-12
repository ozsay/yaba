const path = require('path');

module.exports = async function handleModules() {
    const { modules } = this.output;
    const { modules: compilationModules, options: { context } } = this.stats.compilation;

    modules.forEach((module, i) => {
        const compilationModule = compilationModules.find(cm => module.id === cm.id);
        module.resource = compilationModule.resource;
        module.relativePath = compilationModule.resource
            && path.relative(context, compilationModule.resource);
    });
};
