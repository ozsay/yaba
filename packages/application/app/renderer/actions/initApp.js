export const ACTION_TYPE = 'INIT_APP';

export default function (stats) {
    return { type: ACTION_TYPE, payload: stats };
}
