import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../constants/config';

export const getCategories = createAsyncThunk(
	'category/get',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${config.url.API_URL}/category`);
			return response.data;
		} catch (err) {
			console.log(err.message);
			return rejectWithValue(err.message);
		}
	}
);

export const postCategory = createAsyncThunk(
	'category/post',
	async (name, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${config.url.API_URL}/category`, {
				name,
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const initialState = {
	fetching: false,
	categories: [],
	posting: false,
	posted: false,
	error: null,
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getCategories.pending, () => {
				return {
					fetching: true,
				};
			})
			.addCase(getCategories.fulfilled, (_state, { payload }) => {
				return {
					fetching: false,
					categories: payload,
				};
			})
			.addCase(getCategories.rejected, (_state, { payload }) => {
				return {
					fetching: false,
					error: payload,
				};
			})
			.addCase(postCategory.pending, (_state, _action) => {
				return {
					posting: true,
					error: null,
				};
			})
			.addCase(postCategory.fulfilled, (_state, _action) => {
				return {
					posting: false,
					posted: true,
					error: null,
				};
			})
			.addCase(postCategory.rejected, (_state, { payload }) => {
				return {
					posting: false,
					error: payload,
				};
			});
	},
});

export default categorySlice.reducer;
