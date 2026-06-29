import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB8A2',
      light: '#FFD4C7',
      dark: '#E8906E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF8C69',
      light: '#FFAD92',
      dark: '#D96B48',
      contrastText: '#FFFFFF',
    },
    background: { default: '#FFF6F2', paper: '#FFFFFF' },
    text: { primary: '#3D1F14', secondary: '#8A6458' },
    divider: '#FFE3D9',
    error: { main: '#E57373' },
    success: { main: '#81C784' },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", sans-serif',
    h1: { fontSize: '1.875rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    h4: { fontSize: '1.1rem', fontWeight: 600 },
    h5: { fontSize: '1rem', fontWeight: 600 },
    h6: { fontSize: '0.9rem', fontWeight: 600 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FFB8A2 0%, #FF9B82 100%)',
          color: '#FFFFFF',
          '&:hover': { background: 'linear-gradient(135deg, #FF9B82 0%, #E8806A 100%)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(255,184,162,0.18)',
          overflow: 'hidden',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 500 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            backgroundColor: '#FFF6F2',
            '& fieldset': { borderColor: '#FFD4C7' },
            '&:hover fieldset': { borderColor: '#FFB8A2' },
            '&.Mui-focused fieldset': { borderColor: '#FF8C69' },
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #FFE3D9',
          height: 64,
          position: 'fixed',
          bottom: 0,
          width: '100%',
          maxWidth: 430,
          zIndex: 1200,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#C4A49A',
          '&.Mui-selected': { color: '#FF8C69' },
          minWidth: 0,
          padding: '6px 0',
        },
        label: { fontSize: '0.65rem', fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#3D1F14',
          boxShadow: '0 1px 0 #FFE3D9',
          position: 'fixed',
          top: 0,
          width: '100%',
          maxWidth: 430,
          zIndex: 1100,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: '#FFD4C7', color: '#E8806A' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          minHeight: 44,
        },
      },
    },
  },
});

export default theme;
