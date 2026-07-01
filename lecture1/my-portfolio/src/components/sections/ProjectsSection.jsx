import { Box, Container, Typography, Button, Chip, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectCard, { ProjectCardSkeleton } from '../common/ProjectCard';
import useProjects from '../../hooks/useProjects';

const ProjectsSection = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects({ limit: 4 });

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
          label="🔍 Projects"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-accent-mint)',
            color: 'var(--color-text-on-dark)',
            fontWeight: 600,
          }}
        />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2, color: 'text.primary' }}>
          대표 프로젝트
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, lineHeight: 1.8 }}>
          React와 Supabase로 구현한 실제 작동하는 프로젝트들입니다.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
            프로젝트를 불러오지 못했습니다: {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Grid item xs={6} key={i}>
                  <ProjectCardSkeleton />
                </Grid>
              ))
            : projects.map((project) => (
                <Grid item xs={6} key={project.id}>
                  <ProjectCard {...project} />
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
              bgcolor: 'rgba(30,159,217,0.07)',
              borderColor: 'primary.dark',
            },
          }}
        >
          전체 프로젝트 보기
        </Button>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
