import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#7e22ce',
      contrastText: '#ffffff',
    },
    error: {
      main: '#af1212',
      light: '#ef4444',
      dark: '#7f1d1d',
      contrastText: '#ffffff',
    },
    info: {
      main: '#1d4ed8',
      light: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    success: {
      main: '#15803d',
      light: '#22c55e',
      dark: '#14532d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#050725',
      paper: '#112855',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.75)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
});