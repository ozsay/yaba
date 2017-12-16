export const ACTION_TYPE = 'GET_PACKAGE_DATA';
//
// const { remote } = window.require('electron');
//
// function fetch(url) {
//     const http = remote.require('https');
//
//     return new Promise((resolve, reject) => {
//         http.get(url, (res) => {
//             res.setEncoding('utf8');
//             let rawData = '';
//             res.on('data', (chunk) => { rawData += chunk; });
//             res.on('end', () => {
//                 resolve({
//                     json: () => JSON.parse(rawData),
//                 });
//             });
//         });
//     });
// }

export default function (name) {
    const promises = [
        fetch(`https://api.npmjs.org/downloads/point/last-day/${name}`).then(response => response.json()),
        fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`).then(response => response.json()),
        fetch(`https://api.npmjs.org/downloads/point/last-month/${name}`).then(response => response.json()),
        fetch(`https://registry.npmjs.org/${name}`).then(response => response.json()),
    ];

    return {
        type: ACTION_TYPE,
        payload: Promise.all(promises),
    };
}
