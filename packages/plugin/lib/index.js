const handleAssets = require('./assets');
const handleLoaders = require('./loaders');
const handleModules = require('./modules');
const handlePackages = require('./packages');

module.exports = [
    handleLoaders,
    handleModules,
    handlePackages,
    handleAssets,
];
