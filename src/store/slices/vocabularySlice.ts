import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Vocabulary } from '../../constants/types';

export const getVocabularies = createAsyncThunk<
  Vocabulary[],
  void,
  { rejectValue: { message: string } }
>('vocabulary/get', async (_, thunkApi) => {
  try {
    const response: { data: Vocabulary[] } = await axios.get('/vocabulary');
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

type GetVocabularyProps = {
  id: string;
};

export const getVocabulary = createAsyncThunk<
  Vocabulary,
  GetVocabularyProps,
  { rejectValue: { message: string } }
>('vocabulary/getOne', async (params, thunkApi) => {
  try {
    const response: { data: Vocabulary } = await axios.get(
      `/vocabulary/${params.id}`
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

type PostVocabularyProps = {
  japanese: string;
  reading: string;
  english: string;
  categories?: string[];
};

export const postVocabulary = createAsyncThunk<
  Vocabulary,
  PostVocabularyProps,
  { rejectValue: { message: string } }
>('vocabulary/post', async (params, thunkApi) => {
  try {
    const state: any = thunkApi.getState();
    const response = await axios.post('/vocabulary', params, {
      headers: {
        role: state.user.user.role,
      },
    });
    return response.data as Vocabulary;
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

type UpdateVocabularyProps = {
  id: string;
  japanese: string;
  reading: string;
  english: string;
  categories?: string[];
};

export const updateVocabulary = createAsyncThunk<
  Vocabulary,
  UpdateVocabularyProps,
  { rejectValue: { message: string } }
>('vocabulary/update', async (params, thunkApi) => {
  try {
    const state: any = thunkApi.getState();
    const response = await axios.put(`/vocabulary/${params.id}`, params, {
      headers: {
        role: state.user.user.role,
      },
    });
    return response.data as Vocabulary;
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

export const resetVocabularyState = createAction('vocabulary/resetState');

interface VocabularyState {
  fetching: boolean;
  fetchError: string | null;
  vocabularies: Vocabulary[];
  vocabulary: Vocabulary | null;
  posting: boolean;
  posted: boolean;
  postError: string | null;
}

const initialState = {
  fetching: false,
  fetchError: null,
  vocabularies: [],
  vocabulary: null,
  posting: false,
  posted: false,
  postError: null,
} as VocabularyState;

export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getVocabularies.pending, state => {
        state.fetching = true;
      })
      .addCase(getVocabularies.fulfilled, (state, { payload }) => {
        state.fetching = false;
        state.vocabularies = payload;
      })
      .addCase(getVocabularies.rejected, (state, { payload }) => {
        state.fetching = false;
        if (payload) {
          state.fetchError = payload.message;
        }
      })
      .addCase(getVocabulary.pending, state => {
        state.fetching = true;
        state.vocabulary = null;
      })
      .addCase(getVocabulary.fulfilled, (state, { payload }) => {
        state.fetching = false;
        state.vocabulary = payload;
      })
      .addCase(getVocabulary.rejected, (state, { payload }) => {
        state.fetching = false;
        if (payload) {
          state.fetchError = payload.message;
        }
      })
      .addCase(postVocabulary.pending, state => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(postVocabulary.fulfilled, state => {
        state.posting = false;
        state.posted = true;
        state.postError = null;
      })
      .addCase(postVocabulary.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(updateVocabulary.pending, state => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(updateVocabulary.fulfilled, state => {
        state.posting = false;
        state.posted = true;
        state.postError = null;
      })
      .addCase(updateVocabulary.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(resetVocabularyState, state => {
        state.fetching = false;
        state.fetchError = null;
        state.posting = false;
        state.posted = false;
        state.postError = null;
      });
  },
});

export default vocabularySlice.reducer;
