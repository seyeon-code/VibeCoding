import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Tab, Tabs,
  CircularProgress, Alert, InputAdornment, IconButton
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useAuth } from '../contexts/AuthContext.jsx';

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
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Box sx={{ fontSize: 72, lineHeight: 1, mb: 1 }}>🐾</Box>
        <Typography variant="h1" sx={{ fontWeight: 800, color: '#E8806A', letterSpacing: '-1px', fontSize: '2.5rem' }}>
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
