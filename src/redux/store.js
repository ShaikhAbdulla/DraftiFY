import { configureStore } from '@reduxjs/toolkit';
import draftReducer from './slices/draftSlice';

const store = configureStore({
  reducer: {
    drafts: draftReducer,
  },
});

export default store;
