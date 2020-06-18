import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { extractUserDataFromToken } from './auth';


const ProtectedRoute = ({ render, role, ...rest }) => {

    const authUser = extractUserDataFromToken();

    return (
        <Route {...rest} render={(props) => (
            authUser && authUser.role === role ?
                render(props) : <Redirect to='/login' />)}
        />);
};

export default ProtectedRoute;
