import localforage from 'localforage';

export default function (id) {
    return localforage.getItem('default')
        .then(val => localforage.getItem(val))
        .then(({ assets }) => localforage.getItem(assets[id]));
}
