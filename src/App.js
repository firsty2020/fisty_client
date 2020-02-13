import React from 'react';
import {
    Registration,
    SetPassword,
    Recruiter,
    Landing,
    Login,
    Admin,
} from './components';
import { Switch, Route } from 'react-router-dom';
import './assets/vibe/scss/styles.scss';
import './App.css';


function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/register" component={Registration}/>
                <Route path="/sign-up/:passwordToken" component={SetPassword}/>
                <Route path="/login" component={Login}/>
                <Route path="/recruiter" component={Recruiter}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/" component={Landing}/>
            </Switch>
        </div>
    );
}

export default App;
