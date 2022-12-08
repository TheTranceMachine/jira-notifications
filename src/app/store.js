import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/issues/IssuesSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
