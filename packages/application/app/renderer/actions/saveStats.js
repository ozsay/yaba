import localforage from 'localforage';

export const ACTION_TYPE = 'STORE_STATS';

export default function ({
    stats, context, outputPath, asDefault = true,
}) {
    const key = {
        context,
        timestamp: Date.now(),
    };

    const stringifiedKey = JSON.stringify(key);

    const promises = [localforage.setItem(stringifiedKey, stats)];

    if (asDefault) {
        promises.push(localforage.setItem('default', stringifiedKey));
    }

    return { type: ACTION_TYPE, payload: Promise.all(promises) };
}
