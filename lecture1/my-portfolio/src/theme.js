import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D93B2D',
      light: '#E8614F',
      dark: '#C1302A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C8E04A',
      contrastText: '#2C2C2C',
    },
    background: {
      default: '#FAF2EC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#888888',
      disabled: '#AAAAAA',
    },
    divider: '#EDE4DC',
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
          backgroundColor: '#D93B2D',
          '&:hover': { backgroundColor: '#C1302A' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #EDE4DC',
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EDE4DC',
        },
      },
    },
  },
});

export default theme;
