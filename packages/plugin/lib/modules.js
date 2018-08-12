const path = require('path');

module.exports = async function handleModules() {
    const { modules } = this.output;
    const { modules: compilationModules, options: { context } } = this.stats.compilation;

    modules.forEach((module, i) => {
        module.resource = compilationModules[i].resource;
        module.relativePath = compilationModules[i].resource
            && path.relative(context, compilationModules[i].resource);
    });
};
