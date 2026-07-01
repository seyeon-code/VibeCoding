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

const PhoneMockup = ({ src, title, description, hovered, onMouseEnter, onMouseLeave, onClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    /* 카드 배경 영역 */
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      sx={{
        position: 'relative',
        bgcolor: hovered ? 'rgba(0,0,0,0.55)' : '#EBF4FB',
        transition: 'background-color 0.35s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2.5, sm: 3 },
        minHeight: { xs: 240, sm: 280 },
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* 폰 프레임 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          background: '#1c1c1e',
          borderRadius: '28px',
          p: '8px 6px 10px',
          border: '1.5px solid #3a3a3c',
          boxShadow: hovered
            ? '0 20px 50px rgba(0,0,0,0.55)'
            : '0 12px 32px rgba(0,0,0,0.22)',
          transform: hovered ? 'scale(1.04) translateY(-4px)' : 'scale(1)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          width: { xs: 130, sm: 150 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '44px',
            height: '5px',
            background: '#3a3a3c',
            borderRadius: '3px',
          },
        }}
      >
        {/* 스크린 영역 */}
        <Box
          sx={{
            borderRadius: '22px',
            overflow: 'hidden',
            width: '100%',
            aspectRatio: '9/16',
            bgcolor: '#111',
            position: 'relative',
          }}
        >
          {/* 스켈레톤 */}
          {!imgLoaded && !imgError && (
            <Skeleton
              variant="rectangular"
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}

          {/* 그라디언트 폴백 */}
          {imgError && (
            <Box
              sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(160deg, #1E9FD9 0%, #2DC890 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, userSelect: 'none' }}>
                {title?.charAt(0) ?? '?'}
              </Typography>
            </Box>
          )}

          {/* 실제 스크린샷 */}
          {!imgError && (
            <Box
              component="img"
              src={src}
              alt={title}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgLoaded(true); setImgError(true); }}
              sx={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          )}
        </Box>
      </Box>

      {/* 호버 텍스트 오버레이 (배경 위 절대 위치) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          pb: 2,
          px: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          textAlign="center"
          sx={{ color: 'white', mb: 0.5, fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          textAlign="center"
          sx={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const ProjectCard = ({ title, description, tech_stack = [], thumbnail_url, detail_url, github_url }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(30,159,217,0.18)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <PhoneMockup
        src={thumbnail_url}
        title={title}
        description={description}
        hovered={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((v) => !v)}
      />

      {/* 기술 스택 */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
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

      {/* 버튼 */}
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
    <Box sx={{ bgcolor: '#EBF4FB', display: 'flex', justifyContent: 'center', py: 3, minHeight: 280 }}>
      <Skeleton variant="rounded" sx={{ width: 150, height: 240, borderRadius: '28px' }} />
    </Box>
    <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
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
