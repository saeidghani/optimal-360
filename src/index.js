/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import NotificationProvider from './NotificationProvider';

import configureStore from './store/index';
import * as serviceWorker from './lib/service-worker';
import Routes from './routes/index';

// Load css
import './assets/styles/bundle.less';
import './assets/styles/bundle.css';

const { persistor, store, dispatch } = configureStore();
// persistor.purge(); // Debug to clear persist

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <NotificationProvider>
        <Router dispatch={dispatch} store={store}>
          <Routes />
        </Router>
      </NotificationProvider>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
