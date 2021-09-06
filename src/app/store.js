import { configureStore } from '@reduxjs/toolkit';
import sprintReducer from '../features/sprint/SprintSlice';

export const store = configureStore({
  reducer: {
    sprint: sprintReducer,
  },
});
