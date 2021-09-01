import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../constants/config';

export type Category = {
	_id: string;
	name: string;
};

export const getCategories = createAsyncThunk<
	Category[],
	void,
	{ rejectValue: { message: string } }
>('category/get', async (_, thunkApi) => {
	try {
		const response: { data: Category[] } = await axios.get(
			`${config.url.API_URL}/category`
		);
		return response.data as Category[];
	} catch (err: any) {
		console.log(err.message);
		return thunkApi.rejectWithValue({ message: err.message });
	}
});

export const postCategory = createAsyncThunk<
	Category,
	string,
	{
		rejectValue: { message: string };
	}
>('category/post', async (name, thunkApi) => {
	try {
		const response = await axios.post(`${config.url.API_URL}/category`, {
			name,
		});
		return response.data as Category;
	} catch (err: any) {
		return thunkApi.rejectWithValue({ message: err.message });
	}
});

interface CategoryState {
	fetching: boolean;
	categories: Category[];
	posting: boolean;
	posted: boolean;
	error: string | null;
}

const initialState = {
	fetching: false,
	categories: [],
	posting: false,
	posted: false,
	error: null,
} as CategoryState;

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getCategories.pending, state => {
				state.fetching = true;
			})
			.addCase(getCategories.fulfilled, (state, { payload }) => {
				state.fetching = false;
				state.categories = [...payload];
			})
			.addCase(getCategories.rejected, (state, { payload }) => {
				state.fetching = false;
				if (payload) {
					state.error = payload.message as string;
				}
			});
		// .addCase(postCategory.pending, (state, _action) => {
		// 	return {
		// 		posting: true,
		// 		error: null,
		// 	};
		// })
		// .addCase(postCategory.fulfilled, (state, _action) => {
		// 	return {
		// 		posting: false,
		// 		posted: true,
		// 		error: null,
		// 	};
		// })
		// .addCase(postCategory.rejected, (state, { payload }) => {
		// 	return {
		// 		posting: false,
		// 		error: payload,
		// 	};
		// });
	},
});

export default categorySlice.reducer;
