import React from 'react';
import {
    Registration,
    SetPassword,
    Dashboard,
    Landing
} from './components';
import {Switch, Route} from 'react-router-dom';
import DashboardLayout from './Vibe/layouts/DashboardLayout';
import './Vibe/vibe/scss/styles.scss';
import './App.css';


function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/register" component={Registration}/>
                <Route path="/sign-up/:passwordToken" component={SetPassword}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/vibe" component={DashboardLayout}/>
                <Route path="/" component={Landing}/>
            </Switch>
        </div>
    );
}

export default App;
