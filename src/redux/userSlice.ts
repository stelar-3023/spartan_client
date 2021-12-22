import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const accountDetails: any = createAsyncThunk(
  'user/getUserDetails',
  async () => {
    const response = await fetch('/profile/', {
      method: 'POST',
      headers: { jwt_token: localStorage.token },
    });
    if (response.ok) {
      const user = await response.json();
      return { user };
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }
);

const userSlice = createSlice({
  // State
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [accountDetails.pending]: (state: any, action: any) => {
      console.log('fetching user...');
      state.status = 'fetching user...';
    },
    [accountDetails.fulfilled]: (state: any, action: any) => {
      console.log('fetched user successfully');
      state.user = action.payload.user;
      
    },
    [accountDetails.rejected]: (state: any, action: any) => {
      console.log('error fetching user');
      state.status = 'error fetching user';
    },
  },
});

export default userSlice.reducer;
