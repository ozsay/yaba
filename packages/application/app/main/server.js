const path = require('path');
const fs = require('fs');
const ipc = require('node-ipc');
const { ipcMain } = require('electron');

ipc.config.id = 'yaba_application';
ipc.config.silent = true;

module.exports = function listen(window) {
    ipc.serve(() => {
        ipc.server.on('message', (message, socket) => {
            const { path: outputPath, context } = JSON.parse(message);

            fs.readFile(path.resolve(outputPath, 'stats.json'), 'utf-8', (err, stats) => {
                ipcMain.once('statsHandled', () => {
                    ipc.server.emit(socket, 'message');
                });

                window.webContents.send('statsUpdated', stats, outputPath, context);
            });
        });
    });

    ipc.server.start();
};
