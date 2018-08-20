import localforage from 'localforage';

import parseStats from './parseStats';

export default async function (key) {
    const finalKey = key || await localforage.getItem('default');

    const { stats } = await localforage.getItem(finalKey);

    return parseStats(stats);
}
