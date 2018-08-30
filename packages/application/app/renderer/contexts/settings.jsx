import React, { Component } from 'react';

import loadSettings from '../actions/loadSettings';
import AppSettings from '../components/AppSettings';

const SettingsContext = React.createContext();

class Provider extends Component {
    constructor(props) {
        super(props);

        this.closeSettings = this.closeSettings.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);

        this.state = {};
    }

    componentDidMount() {
        loadSettings()
            .then((settings) => {
                this.setState({ settings });
            });
    }

    openSettings() {
        this.setState({ isOpen: true });
    }

    closeSettings() {
        this.setState({ isOpen: false });
    }

    saveSettings() {

    }

    render() {
        const { children } = this.props;
        const { settings, isOpen } = this.state;

        return (
            <SettingsContext.Provider value={{
                settings,
                openSettings: this.openSettings,
                closeSettings: this.closeSettings,
                saveSettings: this.saveSettings,
            }}
            >
                {settings && (
                    <React.Fragment>
                        <AppSettings
                            open={isOpen}
                            settings={settings}
                            onSave={this.saveSettings}
                            onClose={this.closeSettings}
                        />
                        {children}
                    </React.Fragment>
                )}
            </SettingsContext.Provider>
        );
    }
}

export default {
    Provider,
    Consumer: SettingsContext.Consumer,
};
