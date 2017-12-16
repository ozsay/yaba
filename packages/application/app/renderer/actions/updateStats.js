import parseStats from './parseStats';

export const ACTION_TYPE = 'UPDATE_STATS';

export default function (stats) {
    return dispatch => dispatch(parseStats(stats))
        .then(({ value: parsedStats }) => dispatch({ type: ACTION_TYPE, payload: parsedStats }));
}
