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
        background: 'var(--gradient-soft)',
        borderBottom: '1px solid var(--color-border)',
        py: { xs: 8, md: 10 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 우측 상단 장식 */}
      <Box sx={{
        position: 'absolute', top: -50, right: -50,
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,184,238,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -40, left: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,143,232,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Chip
          label="🔍 Projects"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-accent-purple)',
            color: '#fff',
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
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              bgcolor: 'rgba(155,143,232,0.08)',
              borderColor: 'secondary.dark',
              color: 'secondary.dark',
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
