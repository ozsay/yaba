import React from 'react';
import { Router } from 'react-router-dom';

import history from '../utils/history';

import Main from '../scenes/Main';

import StatsContext from '../contexts/stats';
import SettingsContext from '../contexts/settings';

import AppUpdater from './AppUpdater';

export default function App() {
    return (
        <StatsContext.Provider>
            <SettingsContext.Provider>
                <Router history={history}>
                    <React.Fragment>
                        <AppUpdater />
                        <Main />
                    </React.Fragment>
                </Router>
            </SettingsContext.Provider>
        </StatsContext.Provider>
    );
}
