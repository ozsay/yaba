import updateStats from './updateStats';
import saveStats from './saveStats';

const { ipcRenderer } = window.require('electron');

export const ACTION_TYPE = 'STATS_LISTENER';

export default function (listener) {
    return (dispatch) => {
        ipcRenderer.on('statsUpdated', (event, data, outputPath, context) => {
            const stats = JSON.parse(data);

            listener()
                .then(() => {
                    dispatch(updateStats(stats));
                    dispatch(saveStats({ stats, context, outputPath }));
                })
                .catch(() => {});
        });
    };
}
