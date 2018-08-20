const { app, BrowserWindow } = require('electron');

const listen = require('./server');

global.customModules = {
    analytics: require('./analytics'),
    requester: require('./requester'),
    sizer: require('./sizer'),
    updater: require('electron-updater'),
};

const isDevelopment = process.env.NODE_ENV !== 'production';

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
let mainWindow;

function createMainWindow() {
    // Construct new BrowserWindow
    const window = new BrowserWindow({ title: `yaba v${app.getVersion()}` });

    // Set url for `win`
    // points to `webpack-dev-server` in development
    // points to `index.html` in production
    const url = isDevelopment
        ? `http://localhost:${process.env.PORT}`
        : `file://${__dirname}/index.html`;

    if (isDevelopment) {
        window.webContents.openDevTools();
        require('./devtools');
    }

    window.loadURL(url);
    window.maximize();

    window.on('closed', () => {
        mainWindow = null;
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
}

// Quit application when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications to stay open
    // until the user explicitly quits
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On macOS it is common to re-create a window
    // even after all windows have been closed
    if (mainWindow === null) mainWindow = createMainWindow();
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow();

    listen(mainWindow);
});
