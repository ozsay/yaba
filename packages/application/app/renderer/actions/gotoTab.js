import history from '../utils/history';

export const ACTION_TYPE = 'GOTO_TAB';

export default function (url, replace = false) {
    if (replace) {
        history.replace(url);
    } else {
        history.push(url);
    }
}
