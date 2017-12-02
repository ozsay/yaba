const ipc = require('node-ipc');

ipc.config.id = 'yaba_application';
ipc.config.silent = true;

module.exports = function listen(window) {
    ipc.serve(() => {
        ipc.server.on('message', (stats, socket) => {
            ipc.server.emit(socket, 'message');

            window.webContents.send('statsUpdated', stats);
        });
    });

    ipc.server.start();
};
