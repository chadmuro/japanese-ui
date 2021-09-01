import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
