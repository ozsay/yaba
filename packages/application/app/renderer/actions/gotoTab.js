import history from '../utils/history';

export default function (url, replace = false) {
    if (replace) {
        history.replace(url);
    } else {
        history.push(url);
    }
}
