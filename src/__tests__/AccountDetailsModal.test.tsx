import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AccountModal } from '../components/AccountDetailsModal';
import { Provider } from 'react-redux';
import store from '../redux/store';

test('renders the account details', () => {
  render(
    <Provider store={store}>
      <AccountModal
        renderAccount={(toggleAccount: any) => (
          <button className='toggle-test' onClick={toggleAccount}>
            toggleAccount 
          </button>
        )}
      />
    </Provider>
  );
  fireEvent.click(screen.getByText('toggleAccount'));
  expect(screen.getByText('Account Details')).toBeInTheDocument();
  expect(screen.getByTestId('email')).toBeInTheDocument();
  expect(screen.getByTestId('name')).toBeInTheDocument();
});
