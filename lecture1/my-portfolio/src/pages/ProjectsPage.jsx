import { Box, Container, Typography, Chip, Grid, Alert } from '@mui/material';
import ProjectCard, { ProjectCardSkeleton } from '../components/common/ProjectCard';
import useProjects from '../hooks/useProjects';

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
          <Typography variant="h2" fontWeight={700} sx={{ color: 'primary.main', mb: 2 }}>
            Projects
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', lineHeight: 1.8, maxWidth: 520, mx: 'auto' }}>
            React와 Supabase로 구현한 프로젝트들을 소개합니다.
            <br />
            썸네일에 마우스를 올리면 자세한 설명을 볼 수 있습니다.
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            프로젝트를 불러오지 못했습니다: {error}
          </Alert>
        )}

        {/* Project Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
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

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">
              아직 등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectsPage;
