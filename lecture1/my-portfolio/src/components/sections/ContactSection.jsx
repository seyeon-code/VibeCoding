import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  TextField, Button, Chip, Avatar, Alert, CircularProgress,
  Divider, Tooltip,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { supabase } from '../../lib/supabase';

const CONTACT_INFO = [
  {
    icon: <EmailIcon sx={{ fontSize: 30 }} />,
    label: 'Email',
    value: 'your.email@gmail.com',
    href: 'mailto:your.email@gmail.com',
    color: '#1565C0',
  },
  {
    icon: <GitHubIcon sx={{ fontSize: 30 }} />,
    label: 'GitHub',
    value: 'github.com/seyeon-code',
    href: 'https://github.com/seyeon-code',
    color: '#6A1B9A',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
    label: 'Location',
    value: '대한민국, 서울',
    href: null,
    color: '#2E7D32',
  },
  {
    icon: <WorkIcon sx={{ fontSize: 30 }} />,
    label: 'Status',
    value: '새로운 기회를 찾고 있어요 ✨',
    href: null,
    color: '#1E9FD9',
  },
];

const EMOJI_OPTIONS = ['👋', '🙌', '💡', '🚀', '🌟', '❤️', '🎉', '🔥', '💻', '✨'];

const KEYWORD_OPTIONS = ['응원합니다', '같이 일해요', '프로젝트 제안', '정보 공유', '친구 신청', '기타'];

const glassCard = {
  background: 'rgba(255, 255, 255, 0.45)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(21, 101, 192, 0.12)',
  transition: 'all 0.3s ease',
};

const ContactSection = () => {
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    message: '',
    email: '',
    organization: '',
    keyword: '',
    emoji: '👋',
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoadingEntries(true);
    const { data } = await supabase
      .from('guestbook')
      .select('id, name, message, organization, keyword, emoji, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    setEntries(data || []);
    setLoadingEntries(false);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleEmojiSelect = (emoji) => {
    setForm((prev) => ({ ...prev, emoji }));
  };

  const handleKeywordSelect = (keyword) => {
    setForm((prev) => ({
      ...prev,
      keyword: prev.keyword === keyword ? '' : keyword,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError('이름을 입력해주세요.'); return; }
    if (!form.message.trim()) { setError('메시지를 입력해주세요.'); return; }

    setSubmitting(true);
    setError('');

    const { error: err } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      email: form.email.trim() || null,
      organization: form.organization.trim() || null,
      keyword: form.keyword || null,
      emoji: form.emoji,
    });

    if (err) {
      setError('방명록 등록에 실패했습니다. 다시 시도해주세요.');
    } else {
      setSuccess(true);
      setForm({ name: '', message: '', email: '', organization: '', keyword: '', emoji: '👋' });
      fetchEntries();
      setTimeout(() => setSuccess(false), 4000);
    }
    setSubmitting(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(160deg, #FFFFFF 0%, #E3F2FD 30%, #90CAF9 65%, #42A5F5 100%)',
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 */}
      <Box sx={{ position: 'absolute', top: -180, right: -180, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(144,202,249,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -120, left: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Contact"
            size="small"
            sx={{
              mb: 3,
              background: 'rgba(21,101,192,0.12)',
              color: '#1565C0',
              border: '1px solid rgba(21,101,192,0.25)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
            }}
          />
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{ color: '#0D47A1', mb: 2, fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.2 }}
          >
            함께 만들어가요
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#1565C0', maxWidth: 520, mx: 'auto', lineHeight: 1.8, fontWeight: 500 }}
          >
            새로운 프로젝트, 협업 제안, 또는 간단한 인사라도 언제든 환영합니다.
          </Typography>
        </Box>

        {/* 연락처 카드 2x2 그리드 */}
        <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
          {CONTACT_INFO.map((info) => (
            <Grid key={info.label} size={{ xs: 12, sm: 6 }}>
              <Card
                component={info.href ? 'a' : 'div'}
                href={info.href || undefined}
                target={info.href?.startsWith('http') ? '_blank' : undefined}
                rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{
                  ...glassCard,
                  textDecoration: 'none',
                  display: 'block',
                  ...(info.href && {
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.65)',
                      transform: 'translateY(-4px)',
                      boxShadow: `0 16px 40px rgba(21,101,192,0.2)`,
                    },
                  }),
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 54, height: 54, borderRadius: '14px',
                        background: `${info.color}22`,
                        border: `2px solid ${info.color}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: info.color, flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: info.color, display: 'block', mb: 0.3, fontWeight: 700, letterSpacing: '0.06em' }}>
                        {info.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#1A1A1A', fontWeight: 600, wordBreak: 'break-all' }}>
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(21,101,192,0.15)', mb: { xs: 6, md: 8 } }} />

        {/* 방명록 섹션 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#0D47A1', mb: 1 }}>
            방명록
          </Typography>
          <Typography variant="body2" sx={{ color: '#1976D2', fontWeight: 500 }}>
            여기에 흔적을 남겨주세요 👣
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 방명록 작성 폼 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ ...glassCard }}>
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0D47A1', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEmotionsIcon sx={{ color: '#1E9FD9', fontSize: 22 }} />
                  메시지 남기기
                </Typography>

                {success && (
                  <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                    방명록에 등록되었습니다! 감사합니다 🎉
                  </Alert>
                )}
                {error && (
                  <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="이름 *" fullWidth size="small" value={form.name} onChange={handleChange('name')} sx={inputSx} />
                  <TextField label="메시지 *" fullWidth size="small" multiline minRows={3} value={form.message} onChange={handleChange('message')} placeholder="안녕하세요! 방문 감사합니다 😊" sx={inputSx} />
                  <TextField label="이메일 (선택)" fullWidth size="small" value={form.email} onChange={handleChange('email')} placeholder="비공개로 저장됩니다" sx={inputSx} />
                  <TextField label="소속 / 직업 (선택)" fullWidth size="small" value={form.organization} onChange={handleChange('organization')} placeholder="회사명, 학교, 직업 등" sx={inputSx} />

                  {/* 키워드 선택 */}
                  <Box>
                    <Typography variant="caption" sx={{ color: '#1565C0', mb: 1, display: 'block', fontWeight: 600 }}>
                      방문 목적 (선택)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {KEYWORD_OPTIONS.map((kw) => (
                        <Chip
                          key={kw}
                          label={kw}
                          size="small"
                          onClick={() => handleKeywordSelect(kw)}
                          sx={{
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            background: form.keyword === kw ? 'rgba(21,101,192,0.15)' : 'rgba(255,255,255,0.6)',
                            color: form.keyword === kw ? '#1255A8' : '#1565C0',
                            border: form.keyword === kw ? '1px solid rgba(21,101,192,0.5)' : '1px solid rgba(21,101,192,0.2)',
                            fontWeight: form.keyword === kw ? 700 : 500,
                            '&:hover': { background: 'rgba(21,101,192,0.1)' },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* 이모지 선택 */}
                  <Box>
                    <Typography variant="caption" sx={{ color: '#1565C0', mb: 1, display: 'block', fontWeight: 600 }}>
                      이모지 선택
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                      {EMOJI_OPTIONS.map((emoji) => (
                        <Tooltip key={emoji} title={emoji}>
                          <Box
                            onClick={() => handleEmojiSelect(emoji)}
                            sx={{
                              width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              borderRadius: '8px', fontSize: '1.2rem', cursor: 'pointer',
                              background: form.emoji === emoji ? 'rgba(30,159,217,0.15)' : 'rgba(255,255,255,0.5)',
                              border: form.emoji === emoji ? '2px solid rgba(30,159,217,0.5)' : '1px solid rgba(21,101,192,0.15)',
                              transition: 'all 0.15s',
                              '&:hover': { background: 'rgba(30,159,217,0.12)', transform: 'scale(1.1)' },
                            }}
                          >
                            {emoji}
                          </Box>
                        </Tooltip>
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon />}
                    sx={{
                      mt: 0.5, py: 1.2, fontWeight: 700, borderRadius: '10px',
                      background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)',
                      boxShadow: '0 6px 20px rgba(21,101,192,0.35)',
                      '&:hover': { background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)', transform: 'translateY(-1px)', boxShadow: '0 10px 24px rgba(21,101,192,0.45)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    {submitting ? '등록 중...' : '방명록 남기기'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 방명록 목록 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {loadingEntries ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress sx={{ color: '#1976D2' }} size={32} />
                </Box>
              ) : entries.length === 0 ? (
                <Card sx={{ ...glassCard }}>
                  <CardContent sx={{ py: 6, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>📭</Typography>
                    <Typography variant="body2" sx={{ color: '#1565C0', fontWeight: 500 }}>
                      첫 번째 방명록을 남겨주세요!
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                entries.map((entry) => (
                  <Card key={entry.id} sx={{ ...glassCard, '&:hover': { background: 'rgba(255,255,255,0.65)', transform: 'translateX(4px)' } }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <Avatar
                          sx={{
                            width: 46, height: 46, flexShrink: 0, fontSize: '1.5rem',
                            background: 'rgba(255,255,255,0.8)',
                            border: '2px solid rgba(21,101,192,0.2)',
                          }}
                        >
                          {entry.emoji}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.6 }}>
                            <Typography variant="body2" fontWeight={700} sx={{ color: '#0D47A1' }}>
                              {entry.name}
                            </Typography>
                            {entry.organization && (
                              <Typography variant="caption" sx={{ color: '#1976D2', background: 'rgba(21,101,192,0.1)', px: 1, py: 0.2, borderRadius: '4px', fontWeight: 600 }}>
                                {entry.organization}
                              </Typography>
                            )}
                            {entry.keyword && (
                              <Chip
                                label={entry.keyword}
                                size="small"
                                sx={{ height: 18, fontSize: '0.65rem', background: 'rgba(21,101,192,0.1)', color: '#1565C0', border: '1px solid rgba(21,101,192,0.25)', fontWeight: 600 }}
                              />
                            )}
                          </Box>
                          <Typography variant="body2" sx={{ color: '#1A1A1A', lineHeight: 1.7, wordBreak: 'keep-all', mb: 1, fontWeight: 500 }}>
                            {entry.message}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 11, color: '#90A4AE' }} />
                            <Typography variant="caption" sx={{ color: '#90A4AE', fontSize: '0.7rem' }}>
                              {formatDate(entry.created_at)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Grid>
        </Grid>

        {/* 푸터 */}
        <Box sx={{ mt: { xs: 8, md: 10 }, textAlign: 'center', pt: 4, borderTop: '1px solid rgba(21,101,192,0.12)' }}>
          <Typography variant="caption" sx={{ color: '#1976D2', fontWeight: 500 }}>
            © 2026 고세연. Built with React + MUI + Supabase ✨
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#1A1A1A',
    '& fieldset': { borderColor: 'rgba(21,101,192,0.25)' },
    '&:hover fieldset': { borderColor: 'rgba(21,101,192,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#1976D2' },
    background: 'rgba(255,255,255,0.6)',
    borderRadius: '10px',
  },
  '& .MuiInputLabel-root': { color: '#1565C0' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#1976D2' },
  '& .MuiInputBase-input::placeholder': { color: '#90A4AE' },
};

export default ContactSection;
