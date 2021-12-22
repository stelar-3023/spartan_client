import reducer, { getExercises } from '../redux/exerciseSlice';

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
    })
})