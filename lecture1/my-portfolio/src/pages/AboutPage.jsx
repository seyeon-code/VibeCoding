import { Box, Container, Typography, Chip } from '@mui/material';

const AboutPage = () => {
  return (
    <Box
      sx={{
        background: 'var(--gradient-soft)',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{
        position: 'absolute', top: -60, right: -60,
        width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,143,232,0.16) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Chip
          label="🏡 About Me"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-accent-purple)',
            color: '#fff',
            fontWeight: 600,
          }}
        />
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            mb: 3,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          About Me
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
          About Me 페이지가 개발될 공간입니다.
          <br />
          상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutPage;
