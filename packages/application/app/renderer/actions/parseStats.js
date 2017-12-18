import parse from '@yaba/statsParser';

export const ACTION_TYPE = 'PARSE_STATS';

export default function (stats) {
    return { type: ACTION_TYPE, payload: parse(stats) };
}
