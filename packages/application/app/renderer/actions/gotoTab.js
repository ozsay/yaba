import history from '../utils/history';

export const ACTION_TYPE = 'GOTO_TAB';

export default function (index, type = 'main', additional) {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPE, payload: { index, type, additional } });
        const { tabs: { currentTab } } = getState();

        history.push(currentTab.link);
    };
}
