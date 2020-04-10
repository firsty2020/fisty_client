import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserFromToken } from './auth';


const ProtectedRoute = ({ render, role, ...rest }) => {

    const authUser = getUserFromToken();

    return (
        <Route {...rest} render={(props) => (
            authUser && authUser.role === role ?
                render(props) : <Redirect to='/login' />)}
        />);
};

export default ProtectedRoute;
