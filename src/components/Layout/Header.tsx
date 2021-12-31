import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/userSlice';

const Header = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
        sx={{
          mt: {
            xs: 2,
            sm: 0,
          },
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            flexGrow: {
              xs: 0,
              sm: 1,
            },
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{ cursor: 'pointer', width: 'fit-content' }}
            onClick={() => history.push('/')}
          >
            Japanese for JLPT
          </Typography>
        </Box>
        <Box component="nav">
          <Link
            underline="hover"
            onClick={() => history.push('/vocabulary')}
            sx={{ cursor: 'pointer', pr: 4 }}
          >
            Vocabulary
          </Link>
          <Link
            underline="hover"
            onClick={() => history.push('/category')}
            sx={{ cursor: 'pointer', pr: 4 }}
          >
            Category
          </Link>
          <Link
            underline="hover"
            onClick={() => history.push('/study')}
            sx={{ cursor: 'pointer', pr: 4 }}
          >
            Study
          </Link>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
