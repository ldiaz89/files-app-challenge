import { configureStore } from '@reduxjs/toolkit';
import counterReduce from './filesSlice'
export const store = configureStore({
  reducer: {
    // Reducers will be defined here
    files: counterReduce
  },
});