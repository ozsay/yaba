import updateStats from './updateStats';

const { ipcRenderer } = window.require('electron');

export const ACTION_TYPE = 'STATS_LISTENER';

export default function (listener) {
    return (dispatch) => {
        ipcRenderer.on('statsUpdated', (event, data) => {
            const stats = JSON.parse(data);

            listener()
                .then(() => {
                    dispatch(updateStats(stats));
                })
                .catch(() => {});
        });
    };
}
