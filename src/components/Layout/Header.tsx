import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/userSlice';

const pages = [
  { name: 'Vocabulary', route: '/vocabulary' },
  { name: 'Category', route: '/category' },
  { name: 'Study', route: '/study' },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    if (matches) {
      handleCloseNavMenu();
    }
  }, [matches]);

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
        sx={{
          mt: {
            xs: 1,
            sm: 0,
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
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
          {matches ? (
            <>
              {pages.map(page => (
                <Link
                  key={page.name}
                  underline="hover"
                  onClick={() => history.push(page.route)}
                  sx={{ cursor: 'pointer', pr: 4 }}
                >
                  {page.name}
                </Link>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                aria-label="navigation of app"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                {pages.map(page => (
                  <MenuItem
                    key={page.name}
                    onClick={() => history.push(page.route)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
