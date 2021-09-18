import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../constants/config';
import { Vocabulary } from '../../constants/types';

export const getVocabularies = createAsyncThunk<
  Vocabulary[],
  void,
  { rejectValue: { message: string } }
>('vocabulary/get', async (_, thunkApi) => {
  try {
    const response: { data: Vocabulary[] } = await axios.get(
      `${config.url.API_URL}/vocabulary`
    );
    return response.data;
  } catch (err: any) {
    console.log(err.message);
    return thunkApi.rejectWithValue({ message: err.message });
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
      `${config.url.API_URL}/vocabulary/${params.id}`
    );
    return response.data;
  } catch (err: any) {
    console.log(err.message);
    return thunkApi.rejectWithValue({ message: err.message });
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
    const response = await axios.post(
      `${config.url.API_URL}/vocabulary`,
      params
    );
    return response.data as Vocabulary;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ message: err.message });
  }
});

interface VocabularyState {
  fetching: boolean;
  vocabularies: Vocabulary[];
  posting: boolean;
  posted: boolean;
  error: string | null;
}

const initialState = {
  fetching: false,
  vocabularies: [],
  posting: false,
  posted: false,
  error: null,
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
        state.vocabularies = [...payload];
      })
      .addCase(getVocabularies.rejected, (state, { payload }) => {
        state.fetching = false;
        if (payload) {
          state.error = payload.message;
        }
      })
      .addCase(postVocabulary.pending, state => {
        state.posting = true;
        state.error = null;
      })
      .addCase(postVocabulary.fulfilled, state => {
        state.posting = false;
        state.posted = true;
        state.error = null;
      })
      .addCase(postVocabulary.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.error = payload.message;
        }
      });
  },
});

export default vocabularySlice.reducer;
