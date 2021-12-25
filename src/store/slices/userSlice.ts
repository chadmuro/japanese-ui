import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../constants/types';

type SignupProps = {
  username: string;
  password: string;
};

export const signup = createAsyncThunk<
  User,
  SignupProps,
  { rejectValue: { message: string } }
>('user/signup', async (params, thunkApi) => {
  try {
    const response = await axios.post('/user', params);
    return response.data as User;
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
