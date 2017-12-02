import updateStats from './updateStats';

const { ipcRenderer } = window.require('electron');

export const ACTION_TYPE = 'STATS_LISTENER';

export default function () {
    return (dispatch) => {
        ipcRenderer.on('statsUpdated', (event, data) => {
            const stats = JSON.parse(data);
            dispatch(updateStats(stats));
        });
    };
}
