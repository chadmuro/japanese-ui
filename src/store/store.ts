import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import vocabularyReducer from './slices/vocabularySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    vocabulary: vocabularyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
