import { configureStore } from '@reduxjs/toolkit';
import userReducer, { addActivityDate } from './userSlice.js';

// Configure Redux store with the user reducer
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


export default store