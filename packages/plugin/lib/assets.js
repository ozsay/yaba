const path = require('path');

const fs = require('fs-extra');

function copyAsset(asset, outputPath, tmpPath) {
    const dest = path.resolve(tmpPath, path.relative(outputPath, asset.existsAt));

    return fs.copy(asset.existsAt, dest);
}

module.exports = async function handleAssets() {
    const { assets, outputOptions: { path: outputPath } } = this.stats.compilation;

    await Promise.all(Object.keys(assets).map(asset => copyAsset(assets[asset], outputPath, this.outputDir)));
};
