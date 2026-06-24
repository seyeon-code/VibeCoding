import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    secondary: {
      main: '#3B82F6',
      light: '#93C5FD',
      dark: '#1D4ED8',
    },
    background: {
      default: '#F5F3FF',
      paper: 'rgba(255, 255, 255, 0.85)',
    },
    error: {
      main: '#EF4444',
    },
    text: {
      primary: '#1E1B4B',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(124, 58, 237, 0.12)',
          boxShadow: '0 4px 24px rgba(124, 58, 237, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)',
            boxShadow: '0 6px 20px rgba(124, 58, 237, 0.45)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.9)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7C3AED',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#7C3AED',
          },
        },
      },
    },
  },
});

export default theme;
