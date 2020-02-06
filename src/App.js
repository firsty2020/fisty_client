import React from 'react';
import {Login, Registration, SetPassword, Dashboard} from './components';
import {Switch, Route} from 'react-router-dom';
import DashboardLayout from './Vibe/layouts/DashboardLayout';
import './Vibe/vibe/scss/styles.scss';


function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/register" component={Registration}/>
                <Route path="/set-password/:passwordToken"
                       component={SetPassword}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/vibe" component={DashboardLayout}/>
                <Route path="/" component={Login}/>
            </Switch>
        </div>
    );
}

export default App;
