import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../constants/types';

export type UserResponse = {
  _id: string;
  username: string;
  role: string;
  accessToken: string;
};

type AuthProps = {
  username: string;
  password: string;
};

export const signup = createAsyncThunk<
  UserResponse,
  AuthProps,
  { rejectValue: { message: string } }
>('user/signup', async (params, thunkApi) => {
  try {
    const response = await axios.post('/user/signup', params);
    return response.data as UserResponse;
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

export const login = createAsyncThunk<
  UserResponse,
  AuthProps,
  { rejectValue: { message: string } }
>('user/login', async (params, thunkApi) => {
  try {
    const response = await axios.post('/user/login', params);
    return response.data as UserResponse;
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

export const checkAuth = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: { message: string } }
>('user/check', async (_, thunkApi) => {
  try {
    const response = await axios.post('/user/check');
    return response.data as UserResponse;
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

export const logout = createAction('user/logout');

export const resetUserState = createAction('user/resetState');

interface UserState {
  posting: boolean;
  posted: boolean;
  postError: string | null;
  user: User | null;
}

const initialState = {
  posting: false,
  posted: false,
  postError: null,
  user: null,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.posting = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.posting = false;
        state.posted = true;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = {
          _id: payload._id,
          username: payload.username,
          role: payload.role,
        };
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(login.pending, state => {
        state.posting = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.posting = false;
        state.posted = true;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = {
          _id: payload._id,
          username: payload.username,
          role: payload.role,
        };
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(checkAuth.pending, state => {
        state.posting = true;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.posting = false;
        state.posted = true;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = {
          _id: payload._id,
          username: payload.username,
          role: payload.role,
        };
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.posting = false;
        if (payload) {
          state.postError = payload.message;
        }
      })
      .addCase(logout, state => {
        state.user = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(resetUserState, state => {
        state.posting = false;
        state.posted = false;
        state.postError = null;
      });
  },
});

export default userSlice.reducer;
