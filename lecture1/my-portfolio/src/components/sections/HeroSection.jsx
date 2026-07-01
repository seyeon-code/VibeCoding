import { Box, Container, Typography, Chip } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'var(--gradient-soft)',
        borderBottom: '1px solid var(--color-border)',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 원 */}
      <Box sx={{
        position: 'absolute', top: -80, right: -80,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,143,232,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -60, left: -60,
        width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,184,238,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          <Chip
            label="✨ Hello"
            size="small"
            sx={{ bgcolor: 'var(--color-primary)', color: '#fff', fontWeight: 600 }}
          />
          <Chip
            label="Portfolio"
            size="small"
            sx={{ bgcolor: 'var(--color-accent-purple)', color: '#fff', fontWeight: 600 }}
          />
        </Box>
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          여기는 Hero 섹션입니다.
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', lineHeight: 1.8 }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
