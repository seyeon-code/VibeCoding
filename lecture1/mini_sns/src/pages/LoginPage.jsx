import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Tab, Tabs,
  CircularProgress, Alert, InputAdornment, IconButton
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useAuth } from '../contexts/AuthContext.jsx';

const PawIllustration = () => (
  <svg width="140" height="148" viewBox="0 0 140 148" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#FFE8DF" />
        <stop offset="100%" stopColor="#FFCDB8" />
      </radialGradient>
      <radialGradient id="mainPad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFBDAD" />
        <stop offset="100%" stopColor="#FF9A82" />
      </radialGradient>
      <radialGradient id="toePad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFD0BE" />
        <stop offset="100%" stopColor="#FFB09A" />
      </radialGradient>
      <filter id="heartShadow" x="-18%" y="-12%" width="136%" height="136%">
        <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#FFB8A2" floodOpacity="0.28" />
      </filter>
      <filter id="pawShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#FFB8A2" floodOpacity="0.22" />
      </filter>
    </defs>

    {/* 하트 배경 (연속선 일러스트 느낌) */}
    <g filter="url(#heartShadow)">
      <path
        d="M70,118 C40,100 10,76 10,48 C10,30 24,16 42,16 C52,16 61,22 70,32 C79,22 88,16 98,16 C116,16 130,30 130,48 C130,76 100,100 70,118 Z"
        fill="url(#bgGrad)"
      />
    </g>

    {/* 연속선 루프 (상단 교차점) */}
    <path
      d="M70,32 C70,32 67.5,24 66.5,19 C65.5,14 70,11.5 72.5,15 C74.5,18 72.5,25 70,32"
      fill="none"
      stroke="#FFAA8A"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.55"
    />
    {/* 하단 꼬리 */}
    <path
      d="M70,118 C78,125 92,130 101,126 C107,122 106,117 101,116"
      fill="none"
      stroke="#FFAA8A"
      strokeWidth="2.8"
      strokeLinecap="round"
      opacity="0.45"
    />

    {/* 장식 이모지 */}
    <text x="16" y="44" fontSize="12" opacity="0.65">💗</text>
    <text x="108" y="36" fontSize="10" opacity="0.55">💕</text>
    <text x="113" y="100" fontSize="11" opacity="0.5">✨</text>
    <text x="10" y="102" fontSize="9" opacity="0.48">✨</text>

    {/* 발바닥 그룹 */}
    <g filter="url(#pawShadow)" transform="translate(70,72) scale(0.78) rotate(-12) translate(-70,-72)">
      <ellipse cx="42" cy="52" rx="10" ry="11.5" fill="url(#toePad)" />
      <ellipse cx="59" cy="40" rx="11" ry="12.5" fill="url(#toePad)" />
      <ellipse cx="80" cy="40" rx="11" ry="12.5" fill="url(#toePad)" />
      <ellipse cx="97" cy="52" rx="10" ry="11.5" fill="url(#toePad)" />
      <ellipse cx="70" cy="82" rx="27" ry="24" fill="url(#mainPad)" />
      <ellipse cx="40" cy="49" rx="4.5" ry="5" fill="white" opacity="0.28" />
      <ellipse cx="57" cy="37" rx="5" ry="5.5" fill="white" opacity="0.28" />
      <ellipse cx="78" cy="37" rx="5" ry="5.5" fill="white" opacity="0.28" />
      <ellipse cx="95" cy="49" rx="4.5" ry="5" fill="white" opacity="0.28" />
      <ellipse cx="61" cy="74" rx="10" ry="8" fill="white" opacity="0.18" />
      <text x="62" y="87" fontSize="14" fill="white" opacity="0.52" fontFamily="sans-serif">♡</text>
    </g>
  </svg>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', displayName: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 0) {
        const { error: err } = await signIn(form.email, form.password);
        if (err) throw err;
        sessionStorage.removeItem('reborn_guest');
        navigate('/');
      } else {
        if (!form.displayName.trim()) throw new Error('닉네임을 입력해주세요.');
        const { error: err } = await signUp(form.email, form.password, {
          display_name: form.displayName,
          username: form.email.split('@')[0],
        });
        if (err) throw err;
        setError('');
        setTab(0);
        setForm(prev => ({ ...prev, password: '', displayName: '' }));
        alert('회원가입이 완료됐어요! 이메일을 확인해 주세요 🐾');
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Invalid login')) setError('이메일 또는 비밀번호가 올바르지 않아요.');
      else if (msg.includes('already registered')) setError('이미 가입된 이메일이에요.');
      else if (msg.includes('Password should')) setError('비밀번호는 6자 이상이어야 해요.');
      else setError(msg || '잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(160deg, #FFF0EA 0%, #FFE3D9 50%, #FFD4C7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 4,
      }}
    >
      {/* 로고 영역 */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'inline-block', mb: 0.5 }}>
          <PawIllustration />
        </Box>
        <Typography variant="h1" sx={{ fontWeight: 800, color: '#E8806A', letterSpacing: '-1px', fontSize: '2.5rem', mt: -1 }}>
          Re:born
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          유기동물에게 새로운 가족을 🤍
        </Typography>
      </Box>

      {/* 로그인/회원가입 카드 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(255,140,105,0.15)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => { setTab(v); setError(''); }}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#FF8C69', height: 3 },
            '& .MuiTab-root': { color: '#C4A49A' },
            '& .Mui-selected': { color: '#FF8C69 !important' },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2, fontSize: '0.8rem' }}>
              {error}
            </Alert>
          )}

          {tab === 1 && (
            <TextField
              label="닉네임"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              fullWidth
              size="small"
              placeholder="프로필에 표시될 이름"
            />
          )}

          <TextField
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            placeholder="example@email.com"
          />

          <TextField
            label="비밀번호"
            name="password"
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            placeholder={tab === 1 ? '6자 이상' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPw(p => !p)} edge="end" size="small">
                    {showPw ? <VisibilityOffRoundedIcon fontSize="small" /> : <VisibilityRoundedIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 1, py: 1.5, fontSize: '1rem' }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : (tab === 0 ? '로그인' : '회원가입')}
          </Button>

          {tab === 0 && (
            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', cursor: 'pointer', mt: 0.5 }}
              onClick={() => setTab(1)}
            >
              계정이 없으신가요? <Box component="span" sx={{ color: '#FF8C69', fontWeight: 600 }}>회원가입</Box>
            </Typography>
          )}
        </Box>
      </Box>

      {/* 둘러보기 버튼 */}
      <Button
        variant="text"
        onClick={() => {
          sessionStorage.setItem('reborn_guest', '1');
          navigate('/');
        }}
        sx={{ mt: 3, color: 'text.secondary', fontSize: '0.85rem' }}
      >
        로그인 없이 둘러보기 →
      </Button>
    </Box>
  );
};

export default LoginPage;
