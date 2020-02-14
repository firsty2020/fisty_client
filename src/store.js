import { combineReducers } from 'redux';
import { auth } from './components/auth/authReducer';
import { dashboard } from './components/recruiter/Dashboard/dashboardReducer';
import { admin } from './components/admin/adminReducer';
import { connectRouter } from 'connected-react-router';


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    dashboard,
    admin,
});


export default createRootReducer;
