import { configureStore } from '@reduxjs/toolkit';
import counterReduce from './filesSlice'
export const store = configureStore({
  reducer: {
    files: counterReduce
  },
});