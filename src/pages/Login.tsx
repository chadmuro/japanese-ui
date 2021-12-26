import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from '../components/forms/Auth/LoginForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetUserState } from '../store/slices/userSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<'login' | 'signup'>('login');
  const { posting, posted } = useAppSelector(state => state.user);

  useEffect(() => {
    if (posted) {
      dispatch(resetUserState());
    }
  }, [posted, dispatch]);

  if (posted) {
    return <Redirect to="/create" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'background.paper',
        color: 'common.white',
      }}
    >
      <CssBaseline />
      <LoginForm page={page} setPage={setPage} posting={posting} />
    </Box>
  );
};

export default Login;
