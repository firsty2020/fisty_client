import { applyMiddleware, combineReducers, createStore } from 'redux';
import { auth } from './components/auth/authReducer';
import { dashboard } from './components/recruiter/recruiterReducer';
import { admin } from './components/admin/adminReducer';
import { common } from './components/common/commonReducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import apiMiddleware from './apiMiddleware';
import { createBrowserHistory } from 'history';
import { compose } from 'redux';

export const history = createBrowserHistory();


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    dashboard,
    admin,
    common,
});

let _store = createStore(
    createRootReducer(history),
    applyMiddleware(
        routerMiddleware(history),
        thunk,
        apiMiddleware,
    ),

);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    _store = createStore(
        createRootReducer(history),
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                apiMiddleware,
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        )

    );
}

export const store = _store;

export default createRootReducer;
