import { Box, Container, Typography, Button, Chip, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PLACEHOLDER_CARDS = [
  { id: 1, label: 'Project 1' },
  { id: 2, label: 'Project 2' },
  { id: 3, label: 'Project 3' },
];

const ProjectsSection = () => {
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
      <Container maxWidth="lg">
        <Chip
          label="Projects Section"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-bg-peach)',
            color: 'var(--color-text-on-dark)',
            fontWeight: 600,
          }}
        />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
          여기는 Projects 섹션입니다.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8 }}>
          대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {PLACEHOLDER_CARDS.map(({ id, label }) => (
            <Grid item xs={12} sm={4} key={id}>
              <Card
                sx={{
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'var(--color-bg-primary)',
                  border: '2px dashed var(--color-border)',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <CardContent>
                  <Typography variant="body1" fontWeight={600} sx={{ color: 'text.secondary' }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--color-text-muted)' }}>
                    썸네일 예정
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/projects')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '24px',
            fontWeight: 600,
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(217,59,45,0.06)',
              borderColor: 'primary.dark',
            },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
