export const ACTION_TYPE = 'GOTO_TAB';

export default function (index, type = 'main', additional) {
    return { type: ACTION_TYPE, payload: { index, type, additional } };
}
