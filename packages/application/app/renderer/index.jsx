import 'antd/dist/antd.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import initApp from './actions/initApp';
import gotoTab from './actions/gotoTab';

import store from './utils/store';
import history from './utils/history';
import sendAnalytics from './utils/analytics';

import Main from './scenes/Main';

if (process.env.NODE_ENV !== 'production') {
    // const { whyDidYouUpdate } = require('why-did-you-update');
    // whyDidYouUpdate(React);
}

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Main />
            </Router>
        </Provider>
    );
}

store.dispatch(initApp())
    .then(() => {
        render(<App />, document.querySelector('#app'));
    });
