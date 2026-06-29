import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Avatar } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';

const genderEmoji = { male: '♂', female: '♀', unknown: '?' };

const AnimalCard = ({ post, compact = false }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/posts/${post.id}`)}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:active': { transform: 'scale(0.97)' },
        width: compact ? 160 : '100%',
        flexShrink: 0,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={compact ? 120 : 200}
          image={post.image_url || `https://picsum.photos/seed/${post.id}/400/300`}
          alt={post.animal_name || '유기동물'}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'rgba(255,255,255,0.9)',
            borderRadius: 8,
            px: 1,
            py: 0.25,
          }}
        >
          <FavoriteRoundedIcon sx={{ fontSize: 13, color: '#FFB8A2' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.7rem' }}>
            {post.likes_count ?? 0}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: compact ? 1.5 : 2, '&:last-child': { pb: compact ? 1.5 : 2 } }}>
        <Typography
          variant={compact ? 'body2' : 'h5'}
          sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, noWrap: true }}
          noWrap
        >
          {post.animal_name || '이름 미정'}
        </Typography>
        {!compact && (
          <>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
              {post.animal_breed && (
                <Chip
                  icon={<PetsRoundedIcon sx={{ fontSize: '0.85rem !important' }} />}
                  label={post.animal_breed}
                  size="small"
                  sx={{ bgcolor: '#FFF6F2', fontSize: '0.72rem', height: 22 }}
                />
              )}
              {post.animal_gender && (
                <Chip
                  label={`${genderEmoji[post.animal_gender] || ''}  ${post.animal_gender === 'male' ? '수컷' : post.animal_gender === 'female' ? '암컷' : '미상'}`}
                  size="small"
                  sx={{ bgcolor: post.animal_gender === 'male' ? '#E3F2FD' : '#FCE4EC', fontSize: '0.72rem', height: 22 }}
                />
              )}
              {post.animal_age && (
                <Chip
                  label={post.animal_age}
                  size="small"
                  sx={{ bgcolor: '#F3E5F5', fontSize: '0.72rem', height: 22 }}
                />
              )}
            </Box>
            {post.animal_location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnRoundedIcon sx={{ fontSize: 14, color: '#FFB8A2' }} />
                <Typography variant="caption" color="text.secondary">
                  {post.animal_location}
                </Typography>
              </Box>
            )}
          </>
        )}
        {compact && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {post.animal_breed || post.animal_species || '종 미상'}
          </Typography>
        )}
        {!compact && post.shelter_name && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
            <Avatar sx={{ width: 22, height: 22, fontSize: '0.65rem' }}>
              {post.shelter_name[0]}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {post.shelter_name}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
