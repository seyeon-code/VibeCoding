import { useState } from 'react';
import { Box, Card, CardActions, Button, Chip, Typography, Skeleton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

const TECH_STYLES = {
  React: { bg: '#E6F7FC', color: '#0A7EA4' },
  Supabase: { bg: '#E8F9F3', color: '#1A7F53' },
  PostgreSQL: { bg: '#EEF0F7', color: '#336791' },
  CSS3: { bg: '#E8EFF8', color: '#1572B6' },
  MUI: { bg: '#E3F0FF', color: '#007FFF' },
  'Unsplash API': { bg: '#F2F2F2', color: '#555555' },
  JavaScript: { bg: '#FEFCE8', color: '#A16207' },
  TypeScript: { bg: '#EEF4FF', color: '#3178C6' },
  HTML5: { bg: '#FEF0E8', color: '#E34F26' },
  'Node.js': { bg: '#EEFAEF', color: '#339933' },
  Firebase: { bg: '#FFF8E8', color: '#F57C00' },
};

const getTechStyle = (tech) => TECH_STYLES[tech] || { bg: '#F0F4F8', color: '#666666' };

const ProjectCard = ({ title, description, tech_stack = [], thumbnail_url, detail_url, github_url }) => {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(30,159,217,0.18)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          overflow: 'hidden',
          bgcolor: 'var(--color-bg-secondary)',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((v) => !v)}
      >
        {/* Skeleton placeholder */}
        {!imgLoaded && !imgError && (
          <Skeleton
            variant="rectangular"
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        )}

        {/* Fallback gradient */}
        {imgError && (
          <Box
            sx={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #1E9FD9 0%, #2DC890 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" color="white" fontWeight={700} sx={{ userSelect: 'none' }}>
              {title?.charAt(0) ?? '?'}
            </Typography>
          </Box>
        )}

        {/* Actual thumbnail */}
        {!imgError && (
          <Box
            component="img"
            src={thumbnail_url}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgLoaded(true); setImgError(true); }}
            sx={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.4s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
          />
        )}

        {/* Hover Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            bgcolor: 'rgba(0,0,0,0.62)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 1.5, sm: 2.5 },
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="h6"
            color="white"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 1, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Tech Stack */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {tech_stack.map((tech) => {
            const { bg, color } = getTechStyle(tech);
            return (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: bg,
                  color,
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  height: '22px',
                  borderRadius: '6px',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Action Buttons */}
      <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1, mt: 'auto' }}>
        {detail_url && (
          <Button
            variant="contained"
            size="small"
            href={detail_url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              flex: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '8px',
              py: 0.75,
              minWidth: 0,
            }}
          >
            Live Demo
          </Button>
        )}
        {github_url && (
          <Button
            variant="outlined"
            size="small"
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              flex: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '8px',
              py: 0.75,
              minWidth: 0,
              borderColor: 'var(--color-border)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                bgcolor: 'rgba(30,159,217,0.05)',
              },
            }}
          >
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export const ProjectCardSkeleton = () => (
  <Card
    elevation={0}
    sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid var(--color-border)', height: '100%' }}
  >
    <Box sx={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <Skeleton
        variant="rectangular"
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </Box>
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width={56} height={22} />
        <Skeleton variant="rounded" width={70} height={22} />
        <Skeleton variant="rounded" width={48} height={22} />
      </Box>
    </Box>
    <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 1 }}>
      <Skeleton variant="rounded" height={32} sx={{ flex: 1 }} />
      <Skeleton variant="rounded" height={32} sx={{ flex: 1 }} />
    </Box>
  </Card>
);

export default ProjectCard;
