import reducer, { accountDetails } from '../redux/userSlice';

describe('userSlice', () => {
  describe('reducers', () => {
    const initialState = { user: {}, fetching: false };

    it('sets status to fetching user when pending', () => {
      const action = { type: accountDetails.pending.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual('fetching user...');
    });

    it('sets status to error fetching user when rejected', () => {
      const action = { type: accountDetails.rejected.type };
      const state = reducer(initialState, action);
      expect(state.status).toEqual('error fetching user');
    });
  });
});
