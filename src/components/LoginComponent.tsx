import { Fragment } from 'react';
import { Jumbotron, Nav, NavItem, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

export function Login(props: any) {
  return (
    <Fragment>
      <Jumbotron fluid>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Spartan Calisthenics</h1>
              <h2>A better way to train.</h2>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Navbar dark sticky='top' expand='sm'>
        <div className='container'>
          <Nav
            navbar
            style={{
              marginRight: 'auto',
            }}
          >
            <NavItem>
              <LoginModal
                setAuth={props.setAuth}
                renderLogin={(toggleLogin: any) => (
                  <NavLink
                    onClick={toggleLogin}
                    className='nav-link logged-out'
                    data-target='modal-login'
                    to='#'
                  >
                    Login
                  </NavLink>
                )}
              />
            </NavItem>
            <NavItem>
              <SignupModal
                setAuth={props.setAuth}
                renderSignup={(toggleSignup: any) => (
                  <NavLink
                    onClick={toggleSignup}
                    className='nav-link logged-out'
                    data-target='modal-signup'
                    to='#'
                  >
                    Sign up
                  </NavLink>
                )}
              />
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
}
