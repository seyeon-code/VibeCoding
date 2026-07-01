import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2B9FE0',
      light: '#5BBFF0',
      dark: '#0E7DB5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2DC890',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F0F8FF',
      paper: '#DCF0FB',
    },
    text: {
      primary: '#0D1F35',
      secondary: '#3A6080',
      disabled: '#7AAAC8',
    },
    divider: '#B0D8F0',
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg, #2B9FE0 0%, #0E7DB5 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1A8FD0 0%, #0A6A9E 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #B0D8F0',
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(240,248,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #B0D8F0',
        },
      },
    },
  },
});

export default theme;
