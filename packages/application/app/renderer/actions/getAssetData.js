import localforage from 'localforage';

export const ACTION_TYPE = 'GET_ASSET_DATA';

export default function (id) {
    return dispatch => localforage.getItem('default')
        .then(val => localforage.getItem(val))
        .then(({ assets }) => localforage.getItem(assets[id]))
        .then(val => dispatch({ type: ACTION_TYPE, payload: val }));
}
