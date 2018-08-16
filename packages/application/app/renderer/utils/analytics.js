import uuidv4 from 'uuid/v4';

const { remote } = window.require('electron');

const sendAnalytics = remote.getGlobal('customModules').analytics;

function getOrCreateClientId() {
    const clientId = localStorage.getItem('clientId');

    if (!clientId) {
        const newId = uuidv4();

        localStorage.setItem('clientId', newId);

        return newId;
    }

    return clientId;
}

export default function send() {
    const clientId = getOrCreateClientId();

    sendAnalytics(clientId);
}
