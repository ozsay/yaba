export const ACTION_TYPE = 'GET_PACKAGE_POPULARITY';

export default function (name) {
    const promises = [
        fetch(`https://api.npmjs.org/downloads/point/last-day/${name}`).then(response => response.json()),
        fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`).then(response => response.json()),
        fetch(`https://api.npmjs.org/downloads/point/last-month/${name}`).then(response => response.json()),
    ];

    return {
        type: ACTION_TYPE,
        payload: Promise.all(promises),
    };
}
