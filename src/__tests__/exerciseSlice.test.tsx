import reducer, { deleteExercise, getExercises } from '../redux/exerciseSlice';
const request = require('supertest');

describe('exerciseSlice', () => {
  describe('reducers', () => {
    const initialState = { exercises: [], fetching: false };

    it('sets status to fetching exercises when pending', () => {
      const action = { type: getExercises.pending.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual('fetching exercises...');
    });

    it('sets status to error fetching exercises when rejected', () => {
      const action = { type: getExercises.rejected.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual('error fetching exercises');
    });
    it('sets status to deleted exercise successfully', () => {
      const action = { type: deleteExercise.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual('deleted exercise successfully');
    });
  });
  describe('getExercises', () => {
    it('should be defined', () => {
      expect(getExercises).toBeDefined();
    });
    it('should fetch exercises', async () => {
      expect.assertions(3);
      const response = await getExercises();
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
      expect(response.length).toEqual(3);
    });
  });
});
