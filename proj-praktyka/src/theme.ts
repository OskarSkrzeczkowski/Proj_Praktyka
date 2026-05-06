import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#7e22ce',
    },
    error: {
      main: '#af1212',
    },
    info: {
      main: '#1d4ed8',
    },
    success: {
      main: '#15803d',
    },
    background: {
      default: '#050725',
      paper: '#112855',
    },
  },
  shape: {
    borderRadius: 15,
  },
});