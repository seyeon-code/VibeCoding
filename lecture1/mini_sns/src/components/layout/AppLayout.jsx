import { Outlet } from 'react-router-dom';
import BottomNav from '../common/BottomNav.jsx';
import { Box } from '@mui/material';

const AppLayout = () => (
  <Box sx={{ pb: '64px', minHeight: '100dvh', backgroundColor: 'background.default' }}>
    <Outlet />
    <BottomNav />
  </Box>
);

export default AppLayout;
