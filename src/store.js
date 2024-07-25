import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // Import the user reducer

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // Add userReducer to the store
  },
});


