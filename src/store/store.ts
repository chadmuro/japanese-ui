import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import vocabularyReducer from './slices/vocabularySlice';
import userReducer from './slices/userSlice';

const combinedReducer = combineReducers({
  category: categoryReducer,
  vocabulary: vocabularyReducer,
  user: userReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
