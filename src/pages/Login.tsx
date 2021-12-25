import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from '../components/forms/Auth/LoginForm';

const Login = () => {
  const [page, setPage] = useState<'login' | 'signup'>('login');
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
      <LoginForm page={page} setPage={setPage} />
    </Box>
  );
};

export default Login;
