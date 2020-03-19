import { applyMiddleware, combineReducers, createStore } from 'redux';
import { auth } from './components/auth/authReducer';
import { dashboard } from './components/recruiter/recruiterReducer';
import { admin } from './components/admin/adminReducer';
import { common } from './common/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

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
    applyMiddleware(
        routerMiddleware(history),
        thunk,
    )
);


export default createRootReducer;
