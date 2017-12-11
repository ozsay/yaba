export const ACTION_TYPE = 'GOTO_TAB';

export default function (index, isSecondary = true) {
    return { type: ACTION_TYPE, payload: { index, isSecondary } };
}
