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

const HeartPaw = () => (
  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mr: 0.25 }}>
    <svg width="38" height="34" viewBox="0 0 38 34" fill="none">
      <defs>
        <radialGradient id="mhGrad" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#FFE8DF" />
          <stop offset="100%" stopColor="#FFCDB8" />
        </radialGradient>
        <radialGradient id="mhPad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFBDAD" />
          <stop offset="100%" stopColor="#FF9A82" />
        </radialGradient>
        <radialGradient id="mhToe" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFD0BE" />
          <stop offset="100%" stopColor="#FFB09A" />
        </radialGradient>
      </defs>
      {/* 하트 배경 */}
      <path
        d="M19,32 C11,25 2,20 2,12 C2,7 6,3 11,3 C13.5,3 16,5 19,8 C22,5 24.5,3 27,3 C32,3 36,7 36,12 C36,20 27,25 19,32 Z"
        fill="url(#mhGrad)"
      />
      {/* 연속선 루프 */}
      <path
        d="M19,8 C19,8 17.5,5 17,3.2 C16.5,1.5 19.5,1 20.5,2.8 C21.2,4 20.5,6 19,8"
        fill="none" stroke="#FFAA8A" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"
      />
      {/* 발바닥 (로그인과 동일 스타일, 축소+회전) */}
      <g transform="translate(19,20) scale(0.72) rotate(-12) translate(-19,-20)">
        <ellipse cx="11" cy="16" rx="3.2" ry="3.6" fill="url(#mhToe)" />
        <ellipse cx="16" cy="12.5" rx="3.5" ry="4" fill="url(#mhToe)" />
        <ellipse cx="22" cy="12.5" rx="3.5" ry="4" fill="url(#mhToe)" />
        <ellipse cx="27" cy="16" rx="3.2" ry="3.6" fill="url(#mhToe)" />
        <ellipse cx="19" cy="22.5" rx="8" ry="7" fill="url(#mhPad)" />
        <ellipse cx="16" cy="20" rx="3" ry="2.4" fill="white" opacity="0.25" />
      </g>
    </svg>
  </Box>
);

const CuteDog = () => (
  <svg width="118" height="138" viewBox="0 0 118 138" fill="none">
    {/* Left floppy ear */}
    <ellipse cx="23" cy="58" rx="18" ry="27" fill="#FFE8DE" transform="rotate(-22 23 58)" />
    <ellipse cx="23" cy="61" rx="11" ry="18" fill="#FFCDB8" transform="rotate(-22 23 61)" />
    {/* Right floppy ear */}
    <ellipse cx="95" cy="58" rx="18" ry="27" fill="#FFE8DE" transform="rotate(22 95 58)" />
    <ellipse cx="95" cy="61" rx="11" ry="18" fill="#FFCDB8" transform="rotate(22 95 61)" />
    {/* Body */}
    <ellipse cx="59" cy="114" rx="37" ry="30" fill="white" opacity="0.9" />
    {/* Head */}
    <circle cx="59" cy="67" r="40" fill="white" opacity="0.95" />
    {/* Fluffy forehead tuft */}
    <ellipse cx="59" cy="33" rx="24" ry="17" fill="white" opacity="0.65" />
    {/* Left eye */}
    <circle cx="43" cy="61" r="9" fill="#1A0A05" />
    <circle cx="45.8" cy="58.2" r="3.6" fill="white" />
    <circle cx="44" cy="63" r="1.4" fill="white" opacity="0.45" />
    {/* Right eye */}
    <circle cx="75" cy="61" r="9" fill="#1A0A05" />
    <circle cx="77.8" cy="58.2" r="3.6" fill="white" />
    <circle cx="76" cy="63" r="1.4" fill="white" opacity="0.45" />
    {/* Nose */}
    <ellipse cx="59" cy="75" rx="7" ry="5.5" fill="#1A0A05" />
    <circle cx="61.5" cy="73" r="2.2" fill="white" opacity="0.5" />
    {/* Happy smile */}
    <path d="M46 83 Q59 94 72 83" stroke="#1A0A05" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Rosy cheeks */}
    <ellipse cx="28" cy="78" rx="11" ry="7.5" fill="#FFB8A2" opacity="0.42" />
    <ellipse cx="90" cy="78" rx="11" ry="7.5" fill="#FFB8A2" opacity="0.42" />
    {/* Front paws */}
    <ellipse cx="42" cy="133" rx="16" ry="9" fill="white" opacity="0.88" />
    <ellipse cx="76" cy="133" rx="16" ry="9" fill="white" opacity="0.88" />
  </svg>
);

const ic = (c) => ({ filter: `drop-shadow(0 2px 5px ${c})`, display: 'block' });

const Icon3DPaw = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={ic('rgba(255,120,70,0.32)')}>
    <rect x="1" y="1" width="28" height="28" rx="9" fill="#FF8C69" />
    <rect x="1" y="1" width="28" height="15" rx="9" fill="white" opacity="0.2" />
    <ellipse cx="9" cy="7.5" rx="5.5" ry="3.5" fill="white" opacity="0.18" />
    <ellipse cx="10" cy="13.5" rx="2.7" ry="3.1" fill="white" opacity="0.93" />
    <ellipse cx="15" cy="11" rx="3" ry="3.4" fill="white" opacity="0.93" />
    <ellipse cx="20" cy="13.5" rx="2.7" ry="3.1" fill="white" opacity="0.93" />
    <ellipse cx="15" cy="20.5" rx="6" ry="5" fill="white" opacity="0.88" />
  </svg>
);

const Icon3DHouse = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={ic('rgba(60,180,100,0.3)')}>
    <rect x="1" y="1" width="28" height="28" rx="9" fill="#66BB6A" />
    <rect x="1" y="1" width="28" height="15" rx="9" fill="white" opacity="0.2" />
    <ellipse cx="9" cy="7.5" rx="5.5" ry="3.5" fill="white" opacity="0.18" />
    <path d="M15 6 L23.5 14 H6.5 Z" fill="white" opacity="0.93" />
    <rect x="10" y="14" width="10" height="9" rx="2" fill="white" opacity="0.88" />
    <rect x="13" y="17" width="4" height="6" rx="1.2" fill="#66BB6A" opacity="0.75" />
  </svg>
);

const Icon3DMagnify = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={ic('rgba(70,130,210,0.3)')}>
    <rect x="1" y="1" width="28" height="28" rx="9" fill="#42A5F5" />
    <rect x="1" y="1" width="28" height="15" rx="9" fill="white" opacity="0.2" />
    <ellipse cx="9" cy="7.5" rx="5.5" ry="3.5" fill="white" opacity="0.18" />
    <circle cx="13.5" cy="14.5" r="6" fill="none" stroke="white" strokeWidth="2.8" opacity="0.93" />
    <line x1="18" y1="19" x2="23.5" y2="24.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.93" />
  </svg>
);

const Icon3DHeart = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={ic('rgba(190,100,210,0.3)')}>
    <rect x="1" y="1" width="28" height="28" rx="9" fill="#BA68C8" />
    <rect x="1" y="1" width="28" height="15" rx="9" fill="white" opacity="0.2" />
    <ellipse cx="9" cy="7.5" rx="5.5" ry="3.5" fill="white" opacity="0.18" />
    <path d="M15 23 C15 23 6 17 6 11 C6 8 8.5 6 11 6 C12.8 6 14.2 7.2 15 9 C15.8 7.2 17.2 6 19 6 C21.5 6 24 8 24 11 C24 17 15 23 15 23 Z" fill="white" opacity="0.9" />
  </svg>
);

const SectionHeader = ({ title, icon, onMore }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
    </Box>
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
        supabase.from('reborn_posts').select('*, reborn_users(display_name, avatar_url)').eq('post_type', 'animal').order('likes_count').limit(6),
        supabase.from('reborn_posts').select('*, reborn_users(display_name, avatar_url)').eq('post_type', 'review').order('created_at', { ascending: false }).limit(5),
        supabase.from('reborn_posts').select('*, reborn_users(display_name, avatar_url)').eq('post_type', 'lost_found').order('created_at', { ascending: false }).limit(5),
        supabase.from('reborn_posts').select('*, reborn_users(display_name, avatar_url)').eq('post_type', 'volunteer').order('created_at', { ascending: false }).limit(3),
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
        <Toolbar sx={{ justifyContent: 'center', position: 'relative', minHeight: 56 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HeartPaw />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#E8806A', letterSpacing: '-0.5px' }}>
              Re:born
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', right: 8 }}>
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
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #FFB8A2 0%, #FF8C69 100%)',
            p: 3,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', right: -8, bottom: -6, opacity: 0.92 }}>
            <CuteDog />
          </Box>
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
          <SectionHeader title="입양 신청이 필요해요" icon={<Icon3DPaw />} onMore={() => navigate('/posts?type=animal')} />
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
          <SectionHeader title="따뜻한 입양 후기" icon={<Icon3DHouse />} onMore={() => navigate('/posts?type=review')} />
          {loading ? (
            <HorizontalList>
              {[1, 2, 3].map(i => (
                <Box key={i} sx={{ width: 200, flexShrink: 0 }}>
                  <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '16px 16px 0 0' }} />
                  <Skeleton width="90%" height={16} sx={{ mt: 1, mx: 'auto' }} />
                  <Skeleton width="70%" height={14} sx={{ mx: 'auto' }} />
                </Box>
              ))}
            </HorizontalList>
          ) : reviews.length === 0 ? (
            <EmptyState text="아직 입양 후기가 없어요. 소중한 이야기를 나눠주세요!" />
          ) : (
            <HorizontalList>
              {reviews.slice(0, 5).map(post => (
                <Box
                  key={post.id}
                  onClick={() => navigate(`/posts/${post.id}`)}
                  sx={{
                    width: 210,
                    flexShrink: 0,
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(255,184,162,0.18)',
                    transition: 'transform 0.15s',
                    '&:active': { transform: 'scale(0.97)' },
                  }}
                >
                  {/* 4:3 비율 이미지 */}
                  <Box sx={{ width: '100%', paddingTop: '72%', position: 'relative', overflow: 'hidden', bgcolor: '#FFE3D9' }}>
                    {post.image_url && (
                      <Box
                        component="img"
                        src={post.image_url}
                        alt={post.title || '입양후기'}
                        sx={{
                          position: 'absolute',
                          top: 0, left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                      <Chip label="🏡 입양후기" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.92)', color: '#2E7D32', fontSize: '0.65rem', height: 20, fontWeight: 700 }} />
                    </Box>
                  </Box>
                  {/* 텍스트 영역 */}
                  <Box sx={{ px: 1.5, pt: 1.25, pb: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {post.title || post.caption}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.45 }}
                    >
                      {post.caption}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.25 }}>
                      <Avatar sx={{ width: 16, height: 16, fontSize: '0.55rem' }}>
                        {post.reborn_users?.display_name?.[0] || '익'}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {post.reborn_users?.display_name || '익명'}
                      </Typography>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.25 }}>
                        <FavoriteRoundedIcon sx={{ fontSize: 11, color: '#FFB8A2' }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{post.likes_count ?? 0}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </HorizontalList>
          )}
        </Box>

        {/* 주인을 찾아요 */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="우리를 기억해주세요" icon={<Icon3DMagnify />} onMore={() => navigate('/posts?type=lost_found')} />
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
          <SectionHeader title="봉사활동 모집 중" icon={<Icon3DHeart />} onMore={() => navigate('/posts?type=volunteer')} />
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
              borderRadius: '20px',
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
