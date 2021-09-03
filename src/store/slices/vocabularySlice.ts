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

interface VocabularyState {
  fetching: boolean;
  vocabularies: Vocabulary[];
  error: string | null;
}

const initialState = {
  fetching: false,
  vocabularies: [],
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
      });
  },
});

export default vocabularySlice.reducer;
