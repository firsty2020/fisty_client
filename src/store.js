import { applyMiddleware, combineReducers, createStore } from 'redux';
import { auth } from './components/auth/authReducer';
import { dashboard } from './components/recruiter/recruiterReducer';
import { admin } from './components/admin/adminReducer';
import { common } from './common/commonReducer';
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

export const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            apiMiddleware,
            ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )

);


export default createRootReducer;
