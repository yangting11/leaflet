import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login/login'
import Layoutpage from './components/Layout/layout'
import Pageone from './pages/Pageone/pageone'
import Pagetwo from './pages/Pagetwo/pagetwo'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/">
                    {localStorage.getItem('user')?<Layoutpage>
                        <Switch>
                            <Route path='/pageone' component={Pageone}/>
                            <Route path='/pagetwo' component={Pagetwo}/>
                            <Redirect to="/pageone"/>
                        </Switch>
                    </Layoutpage>:<Redirect to="/login"/>}
                </Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
