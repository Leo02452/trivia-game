import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Quiz from './pages/Quiz';

class App extends Component {
  renderRoutes() {
    return (
      <main>
        <Switch>
          <Route path="/quiz" component={ Quiz } />
          <Route path="/" exact component={ Login } />
        </Switch>
      </main>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;
