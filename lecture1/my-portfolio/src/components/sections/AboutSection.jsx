import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        py: { xs: 8, md: 10 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Chip
          label="About Me Section"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-bg-peach)',
            color: 'var(--color-text-on-dark)',
            fontWeight: 600,
          }}
        />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
          여기는 About Me 섹션입니다.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
          간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/about')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '24px',
            fontWeight: 600,
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
};

export default AboutSection;
