import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Home } from './HomeComponent';
import { Login } from './LoginComponent';
import exercise from '../img/exercise.jpg';

export function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const setAuth = (boolean: any) => {
    setIsAuthenticated(boolean);
  };


  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route
            exact
            path='/'
            render={(props: any) =>
              !isAuthenticated ? (
                <Login setAuth={setAuth} {...props} />
              ) : (
                <Redirect to='/home' />
              )
            }
          />
          <Route
            path='/home'
            render={(props: any) =>
              isAuthenticated ? (
                <Home setAuth={setAuth} {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
        </Switch>
      </div>
      <img src={exercise} alt='exercise' className='exercise-img' />
    </Router>
  );
}
