import gotoTab from './gotoTab';

export const ACTION_TYPE = 'ADD_SECONDARY_TAB';

export default function (element) {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPE, payload: element });

        dispatch(gotoTab(getState().tabs.secondaryTabs.length - 1));
    };
}
