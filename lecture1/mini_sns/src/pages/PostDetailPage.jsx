import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography, Chip, Avatar,
  Button, TextField, CircularProgress, Divider, Card, CardContent,
  CardMedia, Dialog, DialogContent
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const genderLabel = { male: '♂ 수컷', female: '♀ 암컷', unknown: '미상' };

const AnimalInfoRow = ({ icon, label, value }) =>
  value ? (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.2, borderBottom: '1px solid #FFE3D9' }}>
      <Typography sx={{ fontSize: 18 }}>{icon}</Typography>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
      </Box>
    </Box>
  ) : null;

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [relatedPost, setRelatedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: p } = await supabase
        .from('reborn_posts')
        .select('*, reborn_users(id, display_name, avatar_url, username)')
        .eq('id', id)
        .single();

      if (!p) { navigate('/'); return; }
      setPost(p);
      setLikeCount(p.likes_count || 0);

      if (p.related_post_id) {
        const { data: rp } = await supabase
          .from('reborn_posts')
          .select('*')
          .eq('id', p.related_post_id)
          .single();
        setRelatedPost(rp);
      }

      const { data: c } = await supabase
        .from('reborn_comments')
        .select('*, reborn_users(display_name, avatar_url)')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      setComments(c || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!user) { navigate('/login'); return; }
    const newCount = liked ? likeCount - 1 : likeCount + 1;
    setLiked(!liked);
    setLikeCount(newCount);
    await supabase.from('reborn_posts').update({ likes_count: newCount }).eq('id', id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    const { data: profile } = await supabase.from('reborn_users').select('display_name, avatar_url').eq('id', user.id).single();
    const { data: c } = await supabase
      .from('reborn_comments')
      .insert({ content: newComment.trim(), user_id: user.id, post_id: id })
      .select()
      .single();
    if (c) {
      setComments(prev => [...prev, { ...c, users: profile }]);
      setNewComment('');
    }
    setSubmitting(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title || post.animal_name, text: post.caption, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사됐어요!');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
      <CircularProgress sx={{ color: '#FFB8A2' }} />
    </Box>
  );
  if (!post) return null;

  const isAnimal = post.post_type === 'animal';
  const isReview = post.post_type === 'review';
  const isVolunteer = post.post_type === 'volunteer';

  return (
    <Box sx={{ pb: 10 }}>
      {/* 앱바 */}
      <AppBar elevation={0} position="sticky" sx={{ top: 0, zIndex: 100 }}>
        <Toolbar sx={{ minHeight: 56 }}>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, ml: 1 }}>
            {isAnimal ? '입양 안내' : isReview ? '입양 후기' : isVolunteer ? '봉사활동' : '주인 찾기'}
          </Typography>
          <IconButton onClick={handleShare}>
            <ShareRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 이미지 */}
      {post.image_url && (
        <>
          <Box
            component="img"
            src={post.image_url}
            alt={post.animal_name || '게시물 이미지'}
            onClick={() => setImageOpen(true)}
            sx={{ width: '100%', height: 280, objectFit: 'cover', cursor: 'zoom-in', display: 'block' }}
          />
          <Dialog open={imageOpen} onClose={() => setImageOpen(false)} maxWidth="sm" fullWidth>
            <DialogContent sx={{ p: 0 }}>
              <Box component="img" src={post.image_url} sx={{ width: '100%', height: 'auto' }} />
            </DialogContent>
          </Dialog>
        </>
      )}

      <Box sx={{ px: 2.5, py: 2.5 }}>
        {/* 타입 배지 + 보호소명 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          {post.post_type === 'animal' && <Chip label="🐾 입양동물" size="small" sx={{ bgcolor: '#FCE4EC', color: '#880E4F', fontWeight: 600, height: 24 }} />}
          {post.post_type === 'review' && <Chip label="🏡 입양후기" size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, height: 24 }} />}
          {post.post_type === 'lost_found' && <Chip label="🔍 주인찾기" size="small" sx={{ bgcolor: '#FFF3E0', color: '#E65100', fontWeight: 600, height: 24 }} />}
          {post.post_type === 'volunteer' && <Chip label="💝 봉사활동" size="small" sx={{ bgcolor: '#F3E5F5', color: '#6A1B9A', fontWeight: 600, height: 24 }} />}
          {post.shelter_name && (
            <Typography variant="caption" color="text.secondary">
              {post.shelter_name}
            </Typography>
          )}
        </Box>

        {/* 제목 */}
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
          {post.title || post.animal_name || '제목 없음'}
        </Typography>

        {/* 작성자 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>
            {post.reborn_users?.display_name?.[0] || '익'}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.reborn_users?.display_name || '익명'}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.created_at).toLocaleDateString('ko-KR')}
          </Typography>
        </Box>

        {/* 동물 정보 (animal 타입) */}
        {isAnimal && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {post.animal_gender && (
                <Chip
                  label={genderLabel[post.animal_gender] || post.animal_gender}
                  size="small"
                  sx={{ bgcolor: post.animal_gender === 'male' ? '#E3F2FD' : '#FCE4EC', fontWeight: 600, height: 26 }}
                />
              )}
              {post.animal_breed && <Chip label={`🐾 ${post.animal_breed}`} size="small" sx={{ bgcolor: '#FFF6F2', height: 26 }} />}
              {post.animal_age && <Chip label={`🗓 ${post.animal_age}`} size="small" sx={{ bgcolor: '#FFF6F2', height: 26 }} />}
              {post.animal_species && <Chip label={post.animal_species} size="small" sx={{ bgcolor: '#F3E5F5', height: 26 }} />}
            </Box>
            <Box sx={{ bgcolor: '#FFF6F2', borderRadius: 3, px: 2, py: 0.5 }}>
              <AnimalInfoRow icon="📍" label="발견 장소" value={post.animal_location} />
              <AnimalInfoRow icon="🐾" label="성격" value={post.animal_personality} />
              <AnimalInfoRow icon="💊" label="건강 정보" value={post.animal_health} />
              <AnimalInfoRow icon="🏠" label="보호소" value={post.shelter_name} />
            </Box>
          </Box>
        )}

        {/* 연결된 입양 동물 카드 (review 타입) */}
        {isReview && relatedPost && (
          <Card
            onClick={() => navigate(`/posts/${relatedPost.id}`)}
            sx={{ cursor: 'pointer', display: 'flex', mb: 2.5, bgcolor: '#FFF6F2', boxShadow: 'none', border: '1.5px solid #FFD4C7' }}
          >
            {relatedPost.image_url && (
              <CardMedia
                component="img"
                image={relatedPost.image_url}
                sx={{ width: 80, height: 80, objectFit: 'cover', flexShrink: 0 }}
              />
            )}
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="caption" sx={{ color: '#FF8C69', fontWeight: 600, display: 'block' }}>🐾 입양한 친구</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{relatedPost.animal_name || '이름 미정'}</Typography>
              <Typography variant="caption" color="text.secondary">{relatedPost.animal_breed}</Typography>
            </CardContent>
          </Card>
        )}

        {/* 본문 */}
        <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, mb: 3, whiteSpace: 'pre-line' }}>
          {post.caption}
        </Typography>

        {/* 좋아요 & 입양신청 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={liked ? <FavoriteRoundedIcon sx={{ color: '#FF8C69' }} /> : <FavoriteBorderRoundedIcon />}
            onClick={handleLike}
            sx={{
              borderColor: liked ? '#FF8C69' : '#FFD4C7',
              color: liked ? '#FF8C69' : 'text.secondary',
              borderRadius: 24,
              flex: 1,
            }}
          >
            좋아요 {likeCount}
          </Button>
          {isAnimal && (
            <Button
              variant="contained"
              sx={{ flex: 2, borderRadius: 24 }}
              onClick={() => {
                if (!user) navigate('/login');
                else alert('입양 신청이 접수됐어요! 보호소에서 곧 연락드릴게요 🐾');
              }}
            >
              🐾 입양 신청하기
            </Button>
          )}
          {isVolunteer && (
            <Button
              variant="contained"
              sx={{ flex: 2, borderRadius: 24, bgcolor: '#AB47BC', '&:hover': { bgcolor: '#7B1FA2' } }}
              onClick={() => {
                if (!user) navigate('/login');
                else alert('봉사활동 신청이 완료됐어요! 💝');
              }}
            >
              💝 봉사 신청하기
            </Button>
          )}
        </Box>

        <Divider sx={{ borderColor: '#FFE3D9', mb: 3 }} />

        {/* 댓글 섹션 */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18, mr: 0.75, verticalAlign: 'middle' }} />
            댓글 {comments.length}
          </Typography>

          {comments.map(c => (
            <Box key={c.id} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', flexShrink: 0 }}>
                {c.reborn_users?.display_name?.[0] || '익'}
              </Avatar>
              <Box sx={{ flex: 1, bgcolor: '#FFF6F2', borderRadius: 2.5, px: 1.5, py: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>{c.reborn_users?.display_name || '익명'}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(c.created_at).toLocaleDateString('ko-KR')}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{c.content}</Typography>
              </Box>
            </Box>
          ))}

          {comments.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              첫 번째 댓글을 남겨보세요 🐾
            </Typography>
          )}

          {/* 댓글 입력 */}
          <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder={user ? '따뜻한 댓글을 남겨주세요...' : '로그인 후 댓글을 달 수 있어요'}
              size="small"
              fullWidth
              disabled={!user}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
            />
            <IconButton
              type="submit"
              disabled={!newComment.trim() || submitting || !user}
              sx={{
                bgcolor: '#FFB8A2',
                color: '#fff',
                '&:hover': { bgcolor: '#FF9B82' },
                '&:disabled': { bgcolor: '#FFE3D9' },
                flexShrink: 0,
              }}
            >
              {submitting ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <SendRoundedIcon fontSize="small" />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetailPage;
