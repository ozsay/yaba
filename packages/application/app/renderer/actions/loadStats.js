import localforage from 'localforage';

export const ACTION_TYPE = 'LOAD_STATS';

export default function (key) {
    return { type: ACTION_TYPE, payload: localforage.getItem(key) };
}
