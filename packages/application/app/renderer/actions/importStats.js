export const ACTION_TYPE = 'IMPORT_STATS';

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener('loadend', () => {
            resolve(JSON.parse(reader.result));
        }, { once: true });

        reader.readAsText(file);
    });
}

export default function (fileHandler) {
    return { type: ACTION_TYPE, payload: readFile(fileHandler) };
}
