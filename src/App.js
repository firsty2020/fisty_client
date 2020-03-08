import React, { Suspense, lazy } from 'react';
import {
    Registration,
    SetPassword,
    Landing,
    Login,
    ProtectedRoute,
} from './components';
import { Switch, Route } from 'react-router-dom';
import './assets/vibe/scss/styles.scss';
import './App.css';

const Admin = lazy(() => import('./components/admin/Dashboard'));
const Recruiter = lazy(() => import('./components/recruiter/Dashboard'));

function App() {
    return (
        <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/register" component={Registration}/>
                    <Route path="/sign-up/:passwordToken" component={SetPassword}/>
                    <Route path="/login" component={Login}/>
                    <ProtectedRoute path="/recruiter" component={Recruiter}/>
                    <ProtectedRoute path="/admin" component={Admin}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
