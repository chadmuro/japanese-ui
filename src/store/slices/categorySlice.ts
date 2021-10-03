import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../constants/config';
import { Category } from '../../constants/types';

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: { message: string } }
>('category/get', async (_, thunkApi) => {
  try {
    const response: { data: Category[] } = await axios.get(
      `${config.url.API_URL}/category`
    );
    return response.data;
  } catch (err: any) {
    if (err.response) {
      return thunkApi.rejectWithValue({
        message: err.response.data.message,
      });
    }
    return thunkApi.rejectWithValue({
      message: err.message,
    });
  }
});

type GetCategoryProps = {
  id: string;
};

export const getCategory = createAsyncThunk<
  Category,
  GetCategoryProps,
  { rejectValue: { message: string } }
>('category/getOne', async (params, thunkApi) => {
  try {
    const response: { data: Category } = await axios.get(
      `${config.url.API_URL}/category/${params.id}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response) {
      return thunkApi.rejectWithValue({
        message: err.response.data.message,
      });
    }
    return thunkApi.rejectWithValue({
      message: err.message,
    });
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
    if (err.response) {
      return thunkApi.rejectWithValue({
        message: err.response.data.message,
      });
    }
    return thunkApi.rejectWithValue({
      message: err.message,
    });
  }
});

export const resetCategoryState = createAction('category/resetState');

interface CategoryState {
  fetching: boolean;
  fetchError: string | null;
  categories: Category[];
  category: Category | null;
  posting: boolean;
  posted: boolean;
  postError: string | null;
}

const initialState = {
  fetching: false,
  fetchError: null,
  categories: [],
  category: null,
  posting: false,
  posted: false,
  postError: null,
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
        state.categories = payload;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.fetching = false;
        if (payload) {
          state.fetchError = payload.message;
        }
      })
      .addCase(getCategory.pending, state => {
        state.fetching = true;
        state.category = null;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.fetching = false;
        state.category = payload;
      })
      .addCase(getCategory.rejected, (state, { payload }) => {
        state.fetching = false;
        if (payload) {
          state.fetchError = payload.message;
        }
      })
      .addCase(postCategory.pending, state => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(postCategory.fulfilled, state => {
        state.posting = false;
        state.posted = true;
        state.postError = null;
      })
      .addCase(postCategory.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(resetCategoryState, state => {
        state.fetching = false;
        state.fetchError = null;
        state.posting = false;
        state.posted = false;
        state.postError = null;
      });
  },
});

export default categorySlice.reducer;
