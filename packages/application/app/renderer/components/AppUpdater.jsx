import React from 'react';

import { Modal, notification, Button } from 'antd';

const { confirm } = Modal;
const { remote } = window.require('electron');

const { updater } = remote.getGlobal('customModules');

const IS_DEV = process.env.NODE_ENV === 'development';

export default class AppUpdater extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.appUpdater = updater.autoUpdater;
        this.appUpdater.logger = console;
        this.appUpdater.autoDownload = false;
    }

    componentDidMount() {
        const self = this;

        if (IS_DEV) return;

        this.appUpdater.on('update-available', () => {
            confirm({
                title: 'Application Update',
                content: 'There is a new update for the application. Would you like to '
                    + 'download and install it (done automatically)?',
                onOk() {
                    self.appUpdater.on('update-downloaded', () => {
                        const key = `open${Date.now()}`;

                        const btn = (
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    notification.close(key);
                                    self.appUpdater.quitAndInstall();
                                }}
                            >
                                Restart to update
                            </Button>
                        );

                        notification.open({
                            message: 'Application Update',
                            description: 'Update files were downloaded. Please restart to install updates.',
                            duration: 0,
                            btn,
                            key,
                        });
                    });

                    self.appUpdater.downloadUpdate();
                },
            });
        });

        this.appUpdater.checkForUpdates();
    }

    render() {
        return null;
    }
}
