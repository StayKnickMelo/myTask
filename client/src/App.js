import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setToken';

import Nav from './components/layout/Nav';
import Login from './components/layout/Login';
import Questions from './components/questionsAdmin/Questions';
import UserQuestions from './components/questionsUsers/UserQuestions';

// State
import AppState from './context/AppState';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  return (
    <AppState>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/questions' component={Questions} />
            <Route exact path='/' component={UserQuestions}/>
          </Switch>




        </div>
      </Router>
    </AppState>
  );
}

export default App;
