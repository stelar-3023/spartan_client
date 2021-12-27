import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignupModal } from '../components/SignupModal';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('toggleSignup', () => {
  test('toggle the signup modal open', () => {
    render(
      <Provider store={store}>
        <SignupModal
          renderSignup={(toggleSignup) => (
            <button className='toggle-test' onClick={toggleSignup}>
              toggleSignup
            </button>
          )}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText('toggleSignup'));
    expect(screen.getByText('Sign up')).toBeTruthy();
  });
  test('render email input', () => {
    render(
      <Provider store={store}>
        <SignupModal
          renderSignup={(toggleSignup) => (
            <button className='toggle-test' onClick={toggleSignup}>
              toggleSignup
            </button>
          )}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText('toggleSignup'));
    const inputElement = screen.getByTestId('email-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
  });
  test('pass a valid email to test email input field', () => {
    render(
      <Provider store={store}>
        <SignupModal
          renderSignup={(toggleSignup) => (
            <button className='toggle-test' onClick={toggleSignup}>
              toggleSignup
            </button>
          )}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText('toggleSignup'));
    const inputElement = screen.getByTestId('email-input');
    userEvent.type(inputElement, 'test@email.com');
    expect(screen.getByTestId('email-input')).toHaveValue('test@email.com');
  });
});
