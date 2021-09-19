import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Header = () => {
  const history = useHistory();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
        sx={{
          flexWrap: 'wrap',
          mt: {
            xs: 1,
            sm: 0,
          },
          justifyContent: {
            xs: 'center',
            sm: 'space-between',
          },
        }}
      >
        <Box
          sx={{
            flexGrow: {
              xs: 0,
              sm: 1,
            },
            justifyContent: {
              xs: 'center',
              sm: 'space-between',
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
        {/* <Box
          sx={{
            '& > *': {
              marginLeft: theme.spacing(2),
              [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1),
              },
            },
          }}
        >
          <Button color="secondary" variant="outlined">
            Login
          </Button>
          <Button color="secondary" variant="contained">
            Sign up
          </Button>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
