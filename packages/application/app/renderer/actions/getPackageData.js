export const ACTION_TYPE = 'GET_PACKAGE_DATA';

const { remote } = window.require('electron');

const fetch = remote.getGlobal('customModules').requester;

export default function (name) {
    const promises = [
        fetch(`https://api.npmjs.org/downloads/point/last-day/${name}`),
        fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`),
        fetch(`https://api.npmjs.org/downloads/point/last-month/${name}`),
        fetch(`https://registry.npmjs.org/${name}`),
    ];

    return {
        type: ACTION_TYPE,
        payload: Promise.all(promises),
    };
}
