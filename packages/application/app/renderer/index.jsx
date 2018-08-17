import 'antd/dist/antd.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import initApp from './actions/initApp';

import store from './utils/store';
import history from './utils/history';

import Main from './scenes/Main';

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
