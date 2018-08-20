import localforage from 'localforage';
import _ from 'lodash';

const { remote } = window.require('electron');

const fs = remote.require('fs');
const path = remote.require('path');

function storeAssetInDB(outputPath, key, asset) {
    return new Promise((resolve) => {
        fs.readFile(path.resolve(outputPath, asset.name), (err, data) => {
            const assetKey = `${key}_asset_${asset.name}`;
            localforage.setItem(assetKey, data).then(() => resolve([asset.name, assetKey]));
        });
    });
}

export default function ({
    stats, context, outputPath, asDefault = true,
}) {
    const key = {
        context,
        timestamp: Date.now(),
    };

    const stringifiedKey = JSON.stringify(key);

    const storeAssets = stats.assets.map(asset => storeAssetInDB(outputPath, stringifiedKey, asset));

    return Promise.all(storeAssets)
        .then((assets) => {
            const promises = [localforage.setItem(stringifiedKey, { stats, assets: _.fromPairs(assets) })];

            if (asDefault) {
                promises.push(localforage.setItem('default', stringifiedKey));
            }

            return Promise.all(promises);
        });
}
