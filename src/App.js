import React from 'react';
import { Login, Registration, SetPassword, Dashboard } from './components';
import { Switch, Route } from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/register" component={Registration} />
                <Route path="/set-password/:passwordToken" component={SetPassword} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
