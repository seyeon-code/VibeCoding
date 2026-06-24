import { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Divider, Alert, Tab, Tabs, MenuItem,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BODY_TYPES = ['하체비만', '스트레이트', '웨이브', '내추럴'];

const BG_DECO = (
  <>
    <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
  </>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 로그인 폼
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');

  // 회원가입 폼
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPw, setRegPw] = useState('');
  const [regPwConfirm, setRegPwConfirm] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBodyType, setRegBodyType] = useState('');

  const handleLogin = async () => {
    if (!loginEmail || !loginPw) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    setError('');
    setLoading(true);
    try {
      await signIn({ email: loginEmail, password: loginPw });
      navigate('/posts');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPw || !regPwConfirm) { setError('모든 필수 항목을 입력해주세요.'); return; }
    if (regPw !== regPwConfirm) { setError('비밀번호가 일치하지 않습니다.'); return; }
    if (regPw.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return; }
    setError('');
    setLoading(true);
    try {
      await signUp({ email: regEmail, password: regPw, name: regName, phone: regPhone, bodyType: regBodyType });
      setError('');
      alert('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
      setTab(0);
    } catch (e) {
      setError(e.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 50%, #F5F3FF 100%)', position: 'relative', overflow: 'hidden', px: 2 }}>
      {BG_DECO}
      <Card sx={{ width: '100%', maxWidth: 440, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.15)', boxShadow: '0 8px 40px rgba(124,58,237,0.12)', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', mb: 2, boxShadow: '0 4px 15px rgba(124,58,237,0.35)' }}>
              <FitnessCenterIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              헬시마인드
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              건강한 다이어트 커뮤니티
            </Typography>
          </Box>

          {/* 탭 */}
          <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); }} sx={{ mb: 2.5, '& .MuiTabs-indicator': { background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }, '& .Mui-selected': { color: '#7C3AED !important' } }}>
            <Tab label="로그인" sx={{ fontWeight: 600, flex: 1 }} />
            <Tab label="회원가입" sx={{ fontWeight: 600, flex: 1 }} />
          </Tabs>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          {/* 로그인 폼 */}
          {tab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="이메일" type="email" fullWidth value={loginEmail} onChange={e => setLoginEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <TextField label="비밀번호" type="password" fullWidth value={loginPw} onChange={e => setLoginPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <Button variant="contained" color="primary" fullWidth size="large" onClick={handleLogin} disabled={loading} sx={{ mt: 1, py: 1.4, fontWeight: 600, borderRadius: 2 }}>
                {loading ? '로그인 중...' : '로그인'}
              </Button>
              <Button variant="text" size="small" onClick={() => setTab(1)} sx={{ color: '#7C3AED' }}>
                계정이 없으신가요? 회원가입
              </Button>
            </Box>
          )}

          {/* 회원가입 폼 */}
          {tab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="이름 *" fullWidth value={regName} onChange={e => setRegName(e.target.value)} />
              <TextField label="이메일 *" type="email" fullWidth value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              <TextField label="비밀번호 * (6자 이상)" type="password" fullWidth value={regPw} onChange={e => setRegPw(e.target.value)} />
              <TextField label="비밀번호 확인 *" type="password" fullWidth value={regPwConfirm} onChange={e => setRegPwConfirm(e.target.value)} />
              <TextField label="전화번호" fullWidth value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder="010-0000-0000" />
              <TextField label="체형 선택" select fullWidth value={regBodyType} onChange={e => setRegBodyType(e.target.value)}>
                <MenuItem value=""><em>선택 안함</em></MenuItem>
                {BODY_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <Button variant="contained" color="primary" fullWidth size="large" onClick={handleRegister} disabled={loading} sx={{ mt: 1, py: 1.4, fontWeight: 600, borderRadius: 2 }}>
                {loading ? '가입 중...' : '회원가입'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
