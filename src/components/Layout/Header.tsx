import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Header = () => {
  const history = useHistory();

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
          >
            Japanese for Developers
          </Typography>
        </Box>
        <Box component="nav">
          <Link
            underline="hover"
            onClick={() => history.push('/')}
            sx={{ cursor: 'pointer', mr: 4 }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            onClick={() => history.push('/vocabulary')}
            sx={{ cursor: 'pointer', mr: 4 }}
          >
            Vocabulary
          </Link>
          <Link
            underline="hover"
            onClick={() => history.push('/category')}
            sx={{ cursor: 'pointer' }}
          >
            Category
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
