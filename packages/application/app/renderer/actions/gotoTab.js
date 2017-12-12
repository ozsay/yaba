import history from '../utils/history';

export const ACTION_TYPE = 'GOTO_TAB';

export default function (index, isSecondary = true) {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPE, payload: { index, isSecondary } });
        const { tabs: { currentTab } } = getState();

        history.push(currentTab.link);
    };
}
