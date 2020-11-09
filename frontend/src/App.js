import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.scss';
import ProjectList from './components/projects/ProjectList';
import Project from './components/projects/Project';
import Header from './components/header/Header';
import Login from './components/user/Login';
import Register from './components/user/Register';
import SecureRoute from './components/SecureRoute'


class App extends Component {
  render() {
    return (
      <>
      <Header/>
      <Router>
      <Switch>
        <SecureRoute exact path='/projects' component={ProjectList}/> 
        <Route exact path='/' component={Login}/> 
        <Route exact path='/register' component={Register}/> 
        <SecureRoute path='/project/:name/:id' exact component={Project}/>
        <Redirect to="/" />
      </Switch>
    </Router>
      </>
    )
  }
}

export default App;