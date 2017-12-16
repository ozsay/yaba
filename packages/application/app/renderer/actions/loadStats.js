import localforage from 'localforage';

import updateStats from './updateStats';

export const ACTION_TYPE = 'LOAD_STATS';

export default function (key) {
    return dispatch => dispatch({ type: ACTION_TYPE, payload: localforage.getItem(key) })
        .then(({ value: { stats } }) => {
            if (stats) {
                return dispatch(updateStats(stats));
            }

            return null;
        });
}
