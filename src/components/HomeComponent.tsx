import { Fragment, useEffect, useCallback } from 'react';
import { Jumbotron, Nav, NavItem, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { AccountModal } from './AccountDetailsModal';
import { WorkoutModal } from './LogWorkoutModal';
import { LogModal } from './LogModal';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { accountDetails } from '../redux/userSlice';
import { getExercises } from '../redux/exerciseSlice';

export function Home(props: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  // handleLogout goes here
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      props.setAuth(false);
      toast.success('Logged out successfully');
    } catch (error) {
      let errorMessage = 'Server Error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const initFetch = useCallback(() => {
    dispatch(accountDetails());
    dispatch(getExercises(user.user.user_email));
  }, [dispatch, user.user.user_email]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);


  // console.log('state: ', store.getState());

  return (
    <Fragment>
      <Jumbotron fluid>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 data-text='header'>Spartan Calisthenics</h1>
              <h2>A better way to train.</h2>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Navbar dark sticky='top' expand='sm'>
        <div className='container'>
          <Nav navbar style={{ marginRight: 'auto' }}>
            <NavItem>
              <AccountModal
                name={user.user_name}
                email={user.email}
                renderAccount={(toggleAccount: any) => (
                  <NavLink
                    onClick={toggleAccount}
                    className='nav-link logged-in'
                    data-target='modal-account'
                    to='#'
                  >
                    Account
                  </NavLink>
                )}
              />
            </NavItem>
            <NavItem>
              <WorkoutModal
                // email={email}
                renderWorkout={(toggleWorkout: any) => (
                  <NavLink
                    onClick={toggleWorkout}
                    className='nav-link logged-in'
                    data-target='modal-exercise'
                    to='#'
                  >
                    Log Workout
                  </NavLink>
                )}
              />
            </NavItem>
            <NavItem>
              <LogModal
                // email={email}
                renderLog={(toggleLog: any) => (
                  <NavLink
                    onClick={toggleLog}
                    className='nav-link logged-in'
                    to='#'
                    data-target='modal-log'
                  >
                    Log
                  </NavLink>
                )}
              />
            </NavItem>
            <NavItem>
              <NavLink
                onClick={(e) => handleLogout(e)}
                className='nav-link logged-in'
                to='#'
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
}
