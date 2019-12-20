import React from 'react';
import './App.css';
import Login from "./components/Login";

import { Route, Link, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import Jokes from "./components/Jokes";
import Register from "./components/Register";


// With protected Routes, you'll be redirected to another page without the if statement being truthy
const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props => {
        if(localStorage.getItem('token')) {
            return <Component {...props}/>;
        } else {
            return <Redirect to="/login"/>
        }
    }}/>
};


function App() {
    return (
        <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path="/jokes" component={Jokes}/>
        </div>
    );
}

export default App;