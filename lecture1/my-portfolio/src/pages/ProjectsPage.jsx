import { Box, Container, Typography, Chip } from '@mui/material';

const ProjectsPage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Chip
          label="Projects Page"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-accent)',
            color: 'var(--color-text-primary)',
            fontWeight: 600,
          }}
        />
        <Typography variant="h2" fontWeight={700} sx={{ color: 'primary.main', mb: 3 }}>
          Projects
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
          Projects 페이지가 개발될 공간입니다.
          <br />
          포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
