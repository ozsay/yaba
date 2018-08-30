import localforage from 'localforage';

export default async function () {
    return await localforage.getItem('settings') || {};
}
