import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { FormWrapper } from '../FormWrapper';
import { useAppDispatch } from '../../../store/hooks';
import { signup, login } from '../../../store/slices/userSlice';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormProps {
  page: 'login' | 'signup';
  setPage: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
  posting: boolean;
}

const LoginForm = ({ page, setPage, posting }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    if (page === 'login') {
      dispatch(login(data));
    }
    if (page === 'signup') {
      dispatch(signup(data));
    }
  };

  useEffect(() => {
    reset();
  }, [reset, page]);

  return (
    <>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h1"
          variant="h6"
          sx={{ textAlign: 'center', mb: 1 }}
        >
          Japanese for JLPT
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          {page === 'login' ? 'Login' : 'Sign up'}
        </Typography>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              sx={{ mb: 1 }}
            />
          )}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 6,
              message: 'Username must be at least 6 characters',
            },
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              sx={{ mb: 1 }}
            />
          )}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={posting}
        >
          {page === 'login' ? 'Login' : 'Sign up'}
        </Button>
      </FormWrapper>
      <Typography component="p" variant="body2">
        {page === 'login'
          ? "Don't have an account?"
          : 'Already have an account?'}
        <Link
          component="span"
          variant="body2"
          sx={{ cursor: 'pointer', ml: 1 }}
          onClick={() => setPage(page === 'login' ? 'signup' : 'login')}
        >
          {page === 'login' ? 'Sign up' : 'Login'}
        </Link>
      </Typography>
    </>
  );
};
export default LoginForm;
