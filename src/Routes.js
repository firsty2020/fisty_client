import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom'
import {
    CompleteRegistration,
    Landing,
    Login,
    ProtectedRoute,
    Registration,
    SetPassword,
} from './components';
import { adminRoutes, adminNavigation } from './components/admin/adminRoutes';
import { companyNavigation, companyRoutes } from './components/company/companyRoutes';
import {LoadSpinner} from './components/ui';


const Admin = lazy(() => import('./components/common/Dashboard'));
const Recruiter = lazy(() => import('./components/recruiter/Dashboard'));
const Company = lazy(() => import('./components/common/Dashboard.js'));


const Routes = () => (
    <Suspense fallback={<LoadSpinner/>}>
        <Switch>
            <Route
                path="/register"
                component={Registration}/>
            <Route
                path="/sign-up/:passwordToken"
                component={CompleteRegistration}/>
            <Route
                path="/set-password/:passwordToken"
                component={SetPassword}/>
            <Route
                path="/login"
                component={Login}/>
            <ProtectedRoute
                path="/recruiter"
                component={Recruiter}
                role='recruiter'
            />
            <ProtectedRoute
                path="/admin"
                role='admin'
                render={(props) =>
                    <Admin
                        {...props}
                        routes={adminRoutes}
                        navigation={adminNavigation}
                    />
                }
            />
            <ProtectedRoute
                path="/company"
                role='company'
                render={(props) =>
                    <Company
                        {...props}
                        routes={companyRoutes}
                        navigation={companyNavigation}
                    />
                }
            />
            <Route path="/" component={Landing}/>
        </Switch>
    </Suspense>
);


export default Routes;
