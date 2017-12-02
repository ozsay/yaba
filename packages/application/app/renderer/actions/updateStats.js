export const ACTION_TYPE = 'UPDATE_STATS';

export default function (stats) {
    return { type: ACTION_TYPE, payload: stats };
}
