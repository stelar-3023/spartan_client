import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addExercise: any = createAsyncThunk(
  'exercise/addExercise',
  async (exercise: any) => {
    console.log(exercise);
    const response = await fetch(
      `/exercises/${exercise.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }
    );
    if (response.ok) {
      // console.log(exercise);
      const exercises = await response.json();
      // console.log(exercises);
      return { exercises };
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }
);

export const getExercises: any = createAsyncThunk(
  'exercises/getExercises',
  async (email) => {
    const response = await fetch(`/exercises/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // console.log(response);
      const exercises = await response.json();
      // console.log(exercises);
      return { exercises };
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }
);

export const deleteExercise: any = createAsyncThunk(
  'exercises/deleteExercise',
  async (id) => {
    const response = await fetch(`/exercises/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const exercise = await response.json();
      return { exercise };
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }
);

export const updateExercise: any = createAsyncThunk(
  'exercises/updateExercise',
  async (exercise: any) => {
    const response = await fetch(
      `/exercises/${exercise.exercise_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }
    );
    if (response.ok) {
      const exercise = await response.json();
      return { exercise };
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }
);

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
  },
  reducers: {},
  extraReducers: {
    [getExercises.pending]: (state: any, action: any) => {
      console.log('fetching exercises...');
      state.status = 'fetching exercises...';
    },
    [getExercises.fulfilled]: (state: any, action: any) => {
      console.log('fetched exercises successfully');
      state.exercises = action.payload.exercises;
    },
    [getExercises.rejected]: (state: any, action: any) => {
      console.log('error fetching exercises');
      state.status = 'error fetching exercises';
    },
    [deleteExercise.fulfilled]: (state: any, action: any) => {
      console.log('deleted exercise successfully');
      let index = state.exercises.findIndex(
        ({ id }: any) => id === action.payload.id
      );
      state.exercises.splice(index, 1);
    },
    [updateExercise.fulfilled]: (state: any, action: any) => {
      // console.log(state, action);
      const index = state.exercises.findIndex(
        (exercise: any) =>
          exercise.exercise_id === action.payload.exercise.exercise_id
      );
      state.exercises[index] = {
        ...state.exercises[index],
        ...action.payload.exercise,
      };
    },
    [addExercise.fulfilled]: (state: any, action: any) => {
      console.log(state, action);
      console.log('added exercise successfully');
      state.exercises.push(action.payload.exercises);
    },
  },
});

export default exerciseSlice.reducer;
