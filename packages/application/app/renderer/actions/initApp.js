import stats from '../../../../../stats.json';

export const ACTION_TYPE = 'INIT_APP';

export default function () {
    // return { type: ACTION_TYPE };
    return { type: ACTION_TYPE, payload: stats };
}
