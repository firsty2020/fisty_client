import React, { Suspense, lazy } from 'react';
import {
    Registration,
    SetPassword,
    Landing,
    Login,
    ProtectedRoute,
    CompleteRegistration,
} from './components';
import { Switch, Route } from 'react-router-dom';
import './assets/vibe/scss/styles.scss';
import './App.css';


const Admin = lazy(() => import('./components/admin/Dashboard'));
const Recruiter = lazy(() => import('./components/recruiter/Dashboard'));
const Company = lazy(() => import('./components/company/CompanyDashboard.js'));


const App = () => (
    <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/register" component={Registration}/>
                <Route path="/sign-up/:passwordToken" component={CompleteRegistration}/>
                <Route path="/set-password/:passwordToken" component={SetPassword}/>
                <Route path="/login" component={Login}/>
                <ProtectedRoute
                    path="/recruiter"
                    component={Recruiter}
                    role='recruiter'
                />
                <ProtectedRoute
                    path="/admin"
                    component={Admin}
                    role='admin'
                />
                <ProtectedRoute
                    path="/company"
                    component={Company}
                    role='company'
                />
                <Route path="/" component={Landing}/>
            </Switch>
        </Suspense>
    </div>
);

export default App;
