import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import 'bootstrap/dist/css/bootstrap.min.css';


const history = createBrowserHistory();
const store = createStore(
    createRootReducer(history),
    applyMiddleware(
        routerMiddleware(history),
        thunk,
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
