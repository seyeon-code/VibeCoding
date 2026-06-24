import { Box, Container, Typography, Chip } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Chip
          label="Hero Section"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-accent)',
            color: 'var(--color-text-primary)',
            fontWeight: 600,
          }}
        />
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ color: 'primary.main', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
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
