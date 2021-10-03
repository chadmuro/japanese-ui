import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { cyan } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    fontFamily: 'Quantico, sans-serif',
  },
  palette: {
    background: {
      paper: blueGrey[900],
    },
    primary: {
      main: cyan[200],
    },
    secondary: {
      main: yellow[500],
    },
    text: {
      primary: cyan[50],
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: cyan[50],
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          background: blueGrey[700],
          color: cyan[50],
        },
      },
    },
  },
});
