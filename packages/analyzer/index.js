import * as analyzers from './lib';

export default async function (stats, options) {
    return Promise.all(options.map(option => analyzers[option](stats)));
}
