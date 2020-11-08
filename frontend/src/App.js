import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.scss';
import ProjectList from './components/projects/ProjectList';
import Project from './components/projects/Project';
import Header from './components/header/Header';


class App extends Component {
  render() {
    return (
      <>
      <Header/>
      <Router>
      <Switch>
        <Route exact path='/' component={ProjectList}/> 
        <Route path='/project/:name/:id' exact component={Project}/>
        <Redirect to="/" />
      </Switch>
    </Router>
      </>
    )
  }
}

export default App;