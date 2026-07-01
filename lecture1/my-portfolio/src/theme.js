import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5BB8EE',
      light: '#84CDEF',
      dark: '#2E96D4',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9B8FE8',
      light: '#BCB4F5',
      dark: '#7265D0',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F2F6FF',
    },
    text: {
      primary: '#1A2640',
      secondary: '#4A5A7A',
      disabled: '#8A98B8',
    },
    divider: '#D0DCF0',
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
          background: 'linear-gradient(135deg, #5BB8EE 0%, #9B8FE8 100%)',
          boxShadow: '0 4px 16px rgba(91,184,238,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #3DA8E0 0%, #7E72DE 100%)',
            boxShadow: '0 6px 20px rgba(91,184,238,0.45)',
          },
        },
        outlinedPrimary: {
          borderColor: '#5BB8EE',
          color: '#5BB8EE',
          '&:hover': {
            borderColor: '#9B8FE8',
            color: '#9B8FE8',
            backgroundColor: 'rgba(155,143,232,0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #D0DCF0',
          boxShadow: 'none',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #D0DCF0',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
