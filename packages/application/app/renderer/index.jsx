import 'typeface-roboto/index.css';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import initApp from './actions/initApp';

import store from './store';

import Main from './scenes/Main';

if (process.env.NODE_ENV !== 'production') {
    // const { whyDidYouUpdate } = require('why-did-you-update');
    // whyDidYouUpdate(React);
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Main />
            </Router>
        </Provider>
    );
}

store.dispatch(initApp())
    .then(() => {
        render(<App />, document.querySelector('#app'));
    });
