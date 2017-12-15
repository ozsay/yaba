import history from '../utils/history';

export const ACTION_TYPE = 'GOTO_TAB';

export default function (index, type = 'main') {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPE, payload: { index, type } });
        const { tabs: { currentTab } } = getState();

        history.push(currentTab.link);
    };
}
