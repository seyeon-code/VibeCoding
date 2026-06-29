import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext.jsx';

const sh = (c) => ({ filter: `drop-shadow(0 3px 6px ${c})`, display: 'block' });

const HomeIcon = ({ active }) => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" style={sh('rgba(255,120,70,0.38)')}>
    {/* 배경 라운드 스퀘어 */}
    <rect x="1" y="1" width="25" height="25" rx="8" fill={active ? '#FF8C69' : '#FFD4C7'} />
    {/* 상단 하이라이트 (3D 광택) */}
    <rect x="1" y="1" width="25" height="13" rx="8" fill="white" opacity="0.22" />
    <ellipse cx="8.5" cy="7" rx="5.5" ry="3.5" fill="white" opacity="0.2" />
    {/* 지붕 삼각형 */}
    <path d="M13.5 6 L21.5 13.5 H5.5 Z" fill="white" opacity="0.93" />
    {/* 집 몸통 */}
    <rect x="9" y="13.5" width="9" height="7.5" rx="1.5" fill="white" opacity="0.88" />
    {/* 문 */}
    <rect x="11.5" y="16" width="4" height="5" rx="1" fill={active ? '#FF8C69' : '#FFAD92'} opacity="0.82" />
  </svg>
);

const PawIcon = ({ active }) => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" style={sh('rgba(255,90,80,0.35)')}>
    <rect x="1" y="1" width="25" height="25" rx="8" fill={active ? '#FF7A6E' : '#FFCAC6'} />
    <rect x="1" y="1" width="25" height="13" rx="8" fill="white" opacity="0.22" />
    <ellipse cx="8.5" cy="7" rx="5.5" ry="3.5" fill="white" opacity="0.2" />
    {/* 발가락 3개 */}
    <ellipse cx="9.5" cy="12" rx="2.3" ry="2.6" fill="white" opacity="0.93" />
    <ellipse cx="13.5" cy="10" rx="2.6" ry="2.9" fill="white" opacity="0.93" />
    <ellipse cx="17.5" cy="12" rx="2.3" ry="2.6" fill="white" opacity="0.93" />
    {/* 메인 패드 */}
    <ellipse cx="13.5" cy="18.5" rx="5.5" ry="4.5" fill="white" opacity="0.88" />
  </svg>
);

const WriteIcon = ({ active }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={sh('rgba(240,98,146,0.45)')}>
    {/* 원형 배경 */}
    <circle cx="16" cy="16" r="14" fill={active ? '#F06292' : '#FFDDE8'} />
    <ellipse cx="10" cy="9" rx="7" ry="4.5" fill="white" opacity="0.22" />
    {/* 플러스 기호 */}
    <rect x="14.5" y="8.5" width="3" height="15" rx="1.5" fill="white" opacity="0.93" />
    <rect x="8.5" y="14.5" width="15" height="3" rx="1.5" fill="white" opacity="0.93" />
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" style={sh('rgba(149,117,205,0.38)')}>
    <rect x="1" y="1" width="25" height="25" rx="8" fill={active ? '#9575CD' : '#D4C4F0'} />
    <rect x="1" y="1" width="25" height="13" rx="8" fill="white" opacity="0.22" />
    <ellipse cx="8.5" cy="7" rx="5.5" ry="3.5" fill="white" opacity="0.2" />
    {/* 머리 */}
    <circle cx="13.5" cy="11" r="4" fill="white" opacity="0.93" />
    {/* 어깨/몸 */}
    <path d="M6 25 C6 19.5 9.5 16 13.5 16 C17.5 16 21 19.5 21 25" fill="white" opacity="0.88" />
  </svg>
);

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const paths = ['/', '/posts', '/write', '/my'];
  const active = paths.indexOf(location.pathname);

  const handleChange = (_, v) => {
    const path = paths[v];
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
        value={active === -1 ? false : active}
        onChange={handleChange}
        showLabels
        sx={{ height: 64 }}
      >
        <BottomNavigationAction label="홈"    icon={<HomeIcon    active={active === 0} />} />
        <BottomNavigationAction label="동물"  icon={<PawIcon     active={active === 1} />} />
        <BottomNavigationAction label="글쓰기" icon={<WriteIcon  active={active === 2} />} />
        <BottomNavigationAction label="마이"  icon={<ProfileIcon active={active === 3} />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
