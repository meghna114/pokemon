
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [], // Assuming list of users 
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    signup: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
