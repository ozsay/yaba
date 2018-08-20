const { ipcRenderer } = window.require('electron');

export default function (listener) {
    ipcRenderer.on('statsUpdated', (event, data, outputPath, context) => {
        const stats = JSON.parse(data);

        listener({ stats, context, outputPath })
            .then(() => {
                ipcRenderer.send('statsHandled');
            });
    });
}
