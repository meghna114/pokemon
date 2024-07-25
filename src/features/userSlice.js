// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [], // Assuming you have a list of users in state for simplicity
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
