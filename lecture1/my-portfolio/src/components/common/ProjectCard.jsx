import { useState, useRef, useEffect } from 'react';
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

const DESKTOP_W = 1280;

// 실제 사이트를 iframe으로 렌더링 후 축소 표시
const LivePreview = ({ url, title, description, hovered }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.25);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / DESKTOP_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{ position: 'absolute', inset: 0, overflow: 'hidden', bgcolor: '#fff' }}
    >
      {/* 로딩 중 스켈레톤 */}
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      )}

      {/* 라이브 iframe — 실제 사이트를 축소해서 표시 */}
      <iframe
        src={url}
        title={title}
        scrolling="no"
        onLoad={() => setLoaded(true)}
        style={{
          width: `${DESKTOP_W}px`,
          height: `${DESKTOP_W}px`,
          border: 'none',
          display: 'block',
          transformOrigin: 'top left',
          transform: `scale(${scale * (hovered ? 1.06 : 1)})`,
          transition: 'transform 0.4s ease',
          pointerEvents: 'none',
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* 호버 오버레이: 검정 반투명 + 흰 글씨 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <Typography
          fontWeight={700}
          textAlign="center"
          sx={{ color: 'white', fontSize: { xs: '0.95rem', sm: '1.05rem' }, mb: 1, lineHeight: 1.4 }}
        >
          {title}
        </Typography>
        <Typography
          textAlign="center"
          sx={{ color: 'rgba(255,255,255,0.88)', fontSize: { xs: '0.78rem', sm: '0.85rem' }, lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const ProjectCard = ({ title, description, tech_stack = [], detail_url, github_url }) => {
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
      {/* 썸네일 - 1:1 비율 라이브 미리보기 */}
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((v) => !v)}
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <LivePreview
          url={detail_url}
          title={title}
          description={description}
          hovered={hovered}
        />
      </Box>

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
    <Box sx={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <Skeleton
        variant="rectangular"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
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
