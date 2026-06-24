import { AppBar, Toolbar, Typography, Box, Button, Avatar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
      }}
    >
      <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <FitnessCenterIcon sx={{ color: '#7C3AED', mr: 1 }} />
        <Typography
          variant="h6"
          onClick={() => navigate('/posts')}
          sx={{
            fontWeight: 700,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            flexGrow: 1,
          }}
        >
          헬시마인드
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {profile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                {profile.name?.charAt(0)}
              </Avatar>
              <Typography variant="body2" fontWeight={600} sx={{ color: '#1E1B4B', display: { xs: 'none', sm: 'block' } }}>
                {profile.name}
              </Typography>
            </Box>
          )}
          <Button
            variant="text"
            onClick={() => navigate('/posts')}
            sx={{ color: '#6B7280', fontWeight: 500 }}
          >
            커뮤니티
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
            size="small"
            sx={{
              borderColor: 'rgba(124, 58, 237, 0.4)',
              color: '#7C3AED',
              '&:hover': { borderColor: '#7C3AED', background: 'rgba(124, 58, 237, 0.05)' },
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
