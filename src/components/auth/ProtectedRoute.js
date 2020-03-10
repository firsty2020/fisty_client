import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserFromToken } from './auth';


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const authUser = getUserFromToken();

    return (
        <Route {...rest} render={(props) => (
            authUser && authUser.role === rest.role ?
                <Component {...props} /> : <Redirect to='/login' />)}
        />);
};

export default ProtectedRoute;
