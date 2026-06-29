import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, AppBar, Toolbar, IconButton, Skeleton,
  Button, Chip, Card, CardContent, CardMedia, Avatar
} from '@mui/material';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { supabase } from '../lib/supabase.js';
import AnimalCard from '../components/common/AnimalCard.jsx';
import PostCard from '../components/common/PostCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const SectionHeader = ({ title, emoji, onMore }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 700 }}>
      {emoji} {title}
    </Typography>
    {onMore && (
      <Button
        size="small"
        endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: '0.7rem !important' }} />}
        onClick={onMore}
        sx={{ color: 'text.secondary', fontSize: '0.75rem', p: 0 }}
      >
        더보기
      </Button>
    )}
  </Box>
);

const EmptyState = ({ text }) => (
  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
    <Typography variant="body2">{text}</Typography>
  </Box>
);

const HorizontalList = ({ children }) => (
  <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1, mx: -2.5, px: 2.5, '&::-webkit-scrollbar': { display: 'none' } }}>
    {children}
  </Box>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lostFound, setLostFound] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [a, r, l, v] = await Promise.all([
        supabase.from('posts').select('*, users(display_name, avatar_url)').eq('post_type', 'animal').order('likes_count').limit(6),
        supabase.from('posts').select('*, users(display_name, avatar_url)').eq('post_type', 'review').order('created_at', { ascending: false }).limit(5),
        supabase.from('posts').select('*, users(display_name, avatar_url)').eq('post_type', 'lost_found').order('created_at', { ascending: false }).limit(5),
        supabase.from('posts').select('*, users(display_name, avatar_url)').eq('post_type', 'volunteer').order('created_at', { ascending: false }).limit(3),
      ]);
      setAnimals(a.data || []);
      setReviews(r.data || []);
      setLostFound(l.data || []);
      setVolunteers(v.data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <Box>
      {/* 상단 앱바 */}
      <AppBar elevation={0} position="sticky" sx={{ top: 0, zIndex: 100 }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#E8806A', letterSpacing: '-0.5px' }}>
            🐾 Re:born
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small">
              <NotificationsNoneRoundedIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: 2.5, py: 2 }}>
        {/* 히어로 배너 */}
        <Box
          sx={{
            borderRadius: 4,
            background: 'linear-gradient(135deg, #FFB8A2 0%, #FF8C69 100%)',
            p: 3,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', right: -10, top: -10, fontSize: 90, opacity: 0.18 }}>🐾</Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, mb: 0.5 }}>
            Re:born과 함께
          </Typography>
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 1.5, lineHeight: 1.2 }}>
            유기동물에게<br />새 가족을 🤍
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="🐶 입양 신청" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.75rem' }} onClick={() => navigate('/posts?type=animal')} />
            <Chip label="💝 봉사활동" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.75rem' }} onClick={() => navigate('/posts?type=volunteer')} />
          </Box>
        </Box>

        {/* 추천 입양 동물 */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="입양 신청이 필요해요" emoji="🐾" onMore={() => navigate('/posts?type=animal')} />
          {loading ? (
            <HorizontalList>
              {[1, 2, 3].map(i => (
                <Box key={i} sx={{ width: 160, flexShrink: 0 }}>
                  <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2.5, mb: 1 }} />
                  <Skeleton width="80%" height={16} />
                  <Skeleton width="60%" height={14} />
                </Box>
              ))}
            </HorizontalList>
          ) : animals.length === 0 ? (
            <EmptyState text="아직 등록된 유기동물이 없어요. 첫 번째로 등록해 보세요!" />
          ) : (
            <HorizontalList>
              {animals.map(post => (
                <AnimalCard key={post.id} post={post} compact />
              ))}
            </HorizontalList>
          )}
        </Box>

        {/* 입양 후기 */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="따뜻한 입양 후기" emoji="🏡" onMore={() => navigate('/posts?type=review')} />
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[1, 2].map(i => (
                <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 2.5 }} />
              ))}
            </Box>
          ) : reviews.length === 0 ? (
            <EmptyState text="아직 입양 후기가 없어요. 소중한 이야기를 나눠주세요!" />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {reviews.slice(0, 3).map(post => (
                <PostCard key={post.id} post={post} compact />
              ))}
            </Box>
          )}
        </Box>

        {/* 주인을 찾아요 */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="우리를 기억해주세요" emoji="🔍" onMore={() => navigate('/posts?type=lost_found')} />
          {loading ? (
            <HorizontalList>
              {[1, 2, 3].map(i => (
                <Skeleton key={i} variant="rectangular" width={160} height={160} sx={{ borderRadius: 2.5, flexShrink: 0 }} />
              ))}
            </HorizontalList>
          ) : lostFound.length === 0 ? (
            <EmptyState text="현재 주인을 찾는 친구가 없어요 😊" />
          ) : (
            <HorizontalList>
              {lostFound.map(post => (
                <AnimalCard key={post.id} post={post} compact />
              ))}
            </HorizontalList>
          )}
        </Box>

        {/* 봉사활동 */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="봉사활동 모집 중" emoji="💝" onMore={() => navigate('/posts?type=volunteer')} />
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 2.5 }} />
            </Box>
          ) : volunteers.length === 0 ? (
            <EmptyState text="현재 봉사활동 모집이 없어요. 보호소를 도와주세요!" />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {volunteers.map(post => (
                <Card
                  key={post.id}
                  onClick={() => navigate(`/posts/${post.id}`)}
                  sx={{ cursor: 'pointer', '&:active': { transform: 'scale(0.98)' }, display: 'flex', alignItems: 'center', p: 0 }}
                >
                  {post.image_url && (
                    <CardMedia
                      component="img"
                      image={post.image_url}
                      sx={{ width: 80, height: 80, objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <CardContent sx={{ flex: 1, p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                      <VolunteerActivismRoundedIcon sx={{ fontSize: 14, color: '#AB47BC' }} />
                      <Typography variant="caption" sx={{ color: '#AB47BC', fontWeight: 600 }}>
                        {post.shelter_name || '보호소'}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                      {post.title || post.caption}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {post.caption}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* CTA 배너 */}
        {!user && (
          <Box
            sx={{
              borderRadius: 3,
              bgcolor: '#FFF0EA',
              border: '1.5px solid #FFD4C7',
              p: 2.5,
              mb: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
              Re:born 멤버가 되어보세요 🐾
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              입양 후기를 남기고 봉사활동도 신청하세요
            </Typography>
            <Button variant="contained" size="small" onClick={() => navigate('/login')}>
              지금 시작하기
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
