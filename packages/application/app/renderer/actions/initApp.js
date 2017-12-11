import localforage from 'localforage';

import loadStats from './loadStats';

export const ACTION_TYPE = 'INIT_APP';

export default function () {
    return (dispatch) => {
        return localforage.getItem('default')
            .then((key) => {
                if (key) {
                    return dispatch(loadStats(key));
                }

                return null;
            });
    };
}
