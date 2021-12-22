import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { WorkoutModal } from '../components/LogWorkoutModal';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('toggleWorkout', () => {
  test('toggle the workout modal open', () => {
    render(
      <Provider store={store}>
      <WorkoutModal
        user={{ uid: 'ZDGIjt1nP1bkbU8mSqJZ3QAO8103' }}
        renderWorkout={(toggleWorkout: any) => (
          <button className='toggle-test' onClick={toggleWorkout}>
            toggleWorkout
          </button>
        )}
      />
      </Provider>  
    );
    fireEvent.click(screen.getByText('toggleWorkout'));
    expect(screen.getByText('Add Exercises')).toBeTruthy();
  });
});
