import { LoginModal } from '../components/LoginModal';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('toggleLogin', () => {
  test('toggle the login modal open', () => {
    render(
      <Provider store={store}>
        <LoginModal
          renderLogin={(toggleLogin: any) => (
            <button className='toggle-test' onClick={toggleLogin}>
              toggleLogin
            </button>
          )}
        />
      </Provider>
    );
    fireEvent.click(screen.getByText('toggleLogin'));
    expect(screen.getAllByText('Login')).toBeTruthy();
  });
});

test('render email input', () => {
  render(
    <Provider store={store}>
      <LoginModal
        renderLogin={(toggleLogin: any) => (
          <button className='toggle-test' onClick={toggleLogin}>
            toggleLogin
          </button>
        )}
      />
    </Provider>
  );
  fireEvent.click(screen.getByText('toggleLogin'));
  const inputElement = screen.getByTestId('email-input');
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute('type', 'email');
});

test('pass a valid email to test email input field', () => {
  render(
    <Provider store={store}>
      <LoginModal
        renderLogin={(toggleLogin: any) => (
          <button className='toggle-test' onClick={toggleLogin}>
            toggleLogin
          </button>
        )}
      />
    </Provider>
  );
  fireEvent.click(screen.getByText('toggleLogin'));
  const inputElement = screen.getByTestId('email-input');
  userEvent.type(inputElement, 'test@email.com');
  expect(screen.getByTestId('email-input')).toHaveValue('test@email.com');
});
