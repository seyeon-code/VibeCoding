import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useAuth } from '../../contexts/AuthContext.jsx';

const tabs = [
  { label: '홈', icon: <HomeRoundedIcon />, path: '/' },
  { label: '동물', icon: <PetsRoundedIcon />, path: '/posts' },
  { label: '글쓰기', icon: <AddCircleRoundedIcon sx={{ fontSize: 32 }} />, path: '/write' },
  { label: '마이', icon: <PersonRoundedIcon />, path: '/my' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentValue = tabs.findIndex(t => t.path === location.pathname) ?? 0;

  const handleChange = (_, newValue) => {
    const path = tabs[newValue].path;
    if ((path === '/write' || path === '/my') && !user) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        zIndex: 1200,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <BottomNavigation
        value={currentValue === -1 ? false : currentValue}
        onChange={handleChange}
        showLabels
        sx={{ height: 64 }}
      >
        {tabs.map(({ label, icon }, i) => (
          <BottomNavigationAction
            key={i}
            label={label}
            icon={icon}
            sx={i === 2 ? { '& .MuiSvgIcon-root': { color: '#FF8C69' } } : {}}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
