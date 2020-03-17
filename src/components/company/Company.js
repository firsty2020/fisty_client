import React from 'react';
import { Switch, Route } from 'react-router-dom';
import companyRoutes from './companyRoutes';

const Company = () => (
    <Switch>
        {companyRoutes.map((route) => (
            <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact
            />
        ))}
    </Switch>
);


export default Company;
