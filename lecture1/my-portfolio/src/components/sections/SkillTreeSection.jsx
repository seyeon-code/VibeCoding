import { Box, Container, Typography, Chip, Card, CardContent, LinearProgress } from '@mui/material';

const SKILLS = [
  { name: 'React', value: 0 },
  { name: 'JavaScript', value: 0 },
  { name: 'HTML / CSS', value: 0 },
];

const SkillTreeSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        py: { xs: 8, md: 10 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 */}
      <Box sx={{
        position: 'absolute', top: '50%', right: -60, transform: 'translateY(-50%)',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,143,232,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Chip
          label="⚡ Skills"
          size="small"
          sx={{
            mb: 3,
            bgcolor: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 600,
          }}
        />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
          여기는 Skill Tree 섹션입니다.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8 }}>
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
          {SKILLS.map(({ name, value }, idx) => (
            <Card key={name} sx={{ bgcolor: idx % 2 === 0 ? 'var(--color-bg-secondary)' : 'var(--color-bg-subtle)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    — % (예정)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'var(--color-border)',
                    '& .MuiLinearProgress-bar': {
                      background: idx % 2 === 0
                        ? 'var(--color-primary)'
                        : 'var(--color-accent-purple)',
                    },
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillTreeSection;
