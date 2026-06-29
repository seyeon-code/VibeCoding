import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Box, Typography, Avatar, Chip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const typeConfig = {
  review: { label: '입양후기', color: '#E8F5E9', textColor: '#2E7D32', icon: '🐾' },
  lost_found: { label: '주인찾기', color: '#FFF3E0', textColor: '#E65100', icon: '🔍' },
  volunteer: { label: '봉사활동', color: '#F3E5F5', textColor: '#6A1B9A', icon: '💝' },
  animal: { label: '입양동물', color: '#FCE4EC', textColor: '#880E4F', icon: '🐶' },
};

const PostCard = ({ post, compact = false }) => {
  const navigate = useNavigate();
  const cfg = typeConfig[post.post_type] || typeConfig.animal;

  return (
    <Card
      onClick={() => navigate(`/posts/${post.id}`)}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.15s',
        '&:active': { transform: 'scale(0.97)' },
        display: compact ? 'flex' : 'block',
        mb: compact ? 0 : 0,
      }}
    >
      {post.image_url && (
        <CardMedia
          component="img"
          height={compact ? 80 : 200}
          image={post.image_url}
          alt={post.title || '게시물 이미지'}
          sx={{
            objectFit: 'cover',
            width: compact ? 80 : '100%',
            flexShrink: 0,
          }}
        />
      )}
      <CardContent sx={{ p: 2, flex: 1, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip
            label={cfg.icon + ' ' + cfg.label}
            size="small"
            sx={{ bgcolor: cfg.color, color: cfg.textColor, fontSize: '0.7rem', height: 22, fontWeight: 600 }}
          />
        </Box>
        {post.title && (
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '0.95rem' }} noWrap>
            {post.title}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: compact ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {post.caption}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Avatar sx={{ width: 22, height: 22, fontSize: '0.65rem' }}>
              {post.users?.display_name?.[0] || '익'}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {post.users?.display_name || '익명'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <FavoriteRoundedIcon sx={{ fontSize: 13, color: '#FFB8A2' }} />
              <Typography variant="caption" color="text.secondary">{post.likes_count ?? 0}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <ChatBubbleRoundedIcon sx={{ fontSize: 13, color: '#C4A49A' }} />
              <Typography variant="caption" color="text.secondary">{post.comments_count ?? 0}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
