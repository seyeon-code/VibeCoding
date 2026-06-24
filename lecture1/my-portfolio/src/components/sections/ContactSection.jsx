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
    icon: <EmailIcon sx={{ fontSize: 28 }} />,
    label: 'Email',
    value: 'your.email@gmail.com',
    href: 'mailto:your.email@gmail.com',
    color: '#60A5FA',
  },
  {
    icon: <GitHubIcon sx={{ fontSize: 28 }} />,
    label: 'GitHub',
    value: 'github.com/seyeon-code',
    href: 'https://github.com/seyeon-code',
    color: '#A78BFA',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
    label: 'Location',
    value: '대한민국, 서울',
    href: null,
    color: '#34D399',
  },
  {
    icon: <WorkIcon sx={{ fontSize: 28 }} />,
    label: 'Status',
    value: '새로운 기회를 찾고 있어요 ✨',
    href: null,
    color: '#FBBF24',
  },
];

const EMOJI_OPTIONS = ['👋', '🙌', '💡', '🚀', '🌟', '❤️', '🎉', '🔥', '💻', '✨'];

const KEYWORD_OPTIONS = ['응원합니다', '같이 일해요', '프로젝트 제안', '정보 공유', '친구 신청', '기타'];

const glassCard = {
  background: 'rgba(255, 255, 255, 0.32)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '16px',
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
        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 40%, #3B82F6 100%)',
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 */}
      <Box sx={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -150, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Contact"
            size="small"
            sx={{
              mb: 3,
              background: 'rgba(96,165,250,0.2)',
              color: '#93C5FD',
              border: '1px solid rgba(96,165,250,0.3)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
            }}
          />
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{ color: '#FFFFFF', mb: 2, fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.2 }}
          >
            함께 만들어가요
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
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
                      background: 'rgba(255,255,255,0.14)',
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${info.color}33`,
                    },
                  }),
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 52, height: 52, borderRadius: '12px',
                        background: `${info.color}1A`,
                        border: `1px solid ${info.color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: info.color, flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 0.3, fontWeight: 600, letterSpacing: '0.06em' }}>
                        {info.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500, wordBreak: 'break-all' }}>
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: { xs: 6, md: 8 } }} />

        {/* 방명록 섹션 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#FFFFFF', mb: 1 }}>
            방명록
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            여기에 흔적을 남겨주세요 👣
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 방명록 작성 폼 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ ...glassCard }}>
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEmotionsIcon sx={{ color: '#FBBF24', fontSize: 20 }} />
                  메시지 남기기
                </Typography>

                {success && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2.5, borderRadius: 2, background: 'rgba(52,211,153,0.12)', color: '#6EE7B7', border: '1px solid rgba(52,211,153,0.3)', '& .MuiAlert-icon': { color: '#34D399' } }}
                  >
                    방명록에 등록되었습니다! 감사합니다 🎉
                  </Alert>
                )}
                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2.5, borderRadius: 2, background: 'rgba(239,68,68,0.12)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)', '& .MuiAlert-icon': { color: '#EF4444' } }}
                  >
                    {error}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="이름 *"
                    fullWidth
                    size="small"
                    value={form.name}
                    onChange={handleChange('name')}
                    sx={inputSx}
                  />
                  <TextField
                    label="메시지 *"
                    fullWidth
                    size="small"
                    multiline
                    minRows={3}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="안녕하세요! 방문 감사합니다 😊"
                    sx={inputSx}
                  />
                  <TextField
                    label="이메일 (선택)"
                    fullWidth
                    size="small"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="비공개로 저장됩니다"
                    sx={inputSx}
                  />
                  <TextField
                    label="소속 / 직업 (선택)"
                    fullWidth
                    size="small"
                    value={form.organization}
                    onChange={handleChange('organization')}
                    placeholder="회사명, 학교, 직업 등"
                    sx={inputSx}
                  />

                  {/* 키워드 선택 */}
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
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
                            background: form.keyword === kw ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.07)',
                            color: form.keyword === kw ? '#93C5FD' : 'rgba(255,255,255,0.6)',
                            border: form.keyword === kw ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(255,255,255,0.12)',
                            '&:hover': { background: 'rgba(96,165,250,0.2)' },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* 이모지 선택 */}
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
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
                              background: form.emoji === emoji ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                              border: form.emoji === emoji ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.1)',
                              transition: 'all 0.15s',
                              '&:hover': { background: 'rgba(251,191,36,0.15)', transform: 'scale(1.1)' },
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
                      background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                      boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
                      '&:hover': { background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', transform: 'translateY(-1px)', boxShadow: '0 12px 28px rgba(59,130,246,0.45)' },
                      '&:disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
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
                  <CircularProgress sx={{ color: '#60A5FA' }} size={32} />
                </Box>
              ) : entries.length === 0 ? (
                <Card sx={{ ...glassCard }}>
                  <CardContent sx={{ py: 6, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>📭</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                      첫 번째 방명록을 남겨주세요!
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                entries.map((entry) => (
                  <Card key={entry.id} sx={{ ...glassCard, '&:hover': { background: 'rgba(255,255,255,0.42)', transform: 'translateX(4px)' } }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <Avatar
                          sx={{
                            width: 44, height: 44, flexShrink: 0, fontSize: '1.4rem',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                          }}
                        >
                          {entry.emoji}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.6 }}>
                            <Typography variant="body2" fontWeight={700} sx={{ color: '#E2E8F0' }}>
                              {entry.name}
                            </Typography>
                            {entry.organization && (
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', px: 1, py: 0.2, borderRadius: '4px' }}>
                                {entry.organization}
                              </Typography>
                            )}
                            {entry.keyword && (
                              <Chip
                                label={entry.keyword}
                                size="small"
                                sx={{ height: 18, fontSize: '0.65rem', background: 'rgba(96,165,250,0.15)', color: '#93C5FD', border: '1px solid rgba(96,165,250,0.25)' }}
                              />
                            )}
                          </Box>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, wordBreak: 'keep-all', mb: 1 }}>
                            {entry.message}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
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
        <Box sx={{ mt: { xs: 8, md: 10 }, textAlign: 'center', pt: 4, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 고세연. Built with React + MUI + Supabase ✨
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#E2E8F0',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(96,165,250,0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' },
  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.25)' },
};

export default ContactSection;
