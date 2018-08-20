import 'antd/dist/antd.css';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import history from './utils/history';

import Main from './scenes/Main';

import StatsContext from './contexts/stats';

function App() {
    return (
        <StatsContext.Provider>
            <Router history={history}>
                <Main />
            </Router>
        </StatsContext.Provider>
    );
}

render(<App />, document.querySelector('#app'));
