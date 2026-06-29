import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, Typography, Avatar, Button, Divider,
  TextField, IconButton, CircularProgress, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Card, CardMedia,
  CardContent, Grid, Alert
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, refreshProfile } = useAuth();

  const [myPosts, setMyPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ display_name: '', bio: '', adopted_pet_name: '', adopted_pet_photo: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchMyData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      const posts = data || [];
      setMyPosts(posts);
      setTotalLikes(posts.reduce((sum, p) => sum + (p.likes_count || 0), 0));
      setLoading(false);
    };
    fetchMyData();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditForm({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        adopted_pet_name: profile.adopted_pet_name || '',
        adopted_pet_photo: profile.adopted_pet_photo || '',
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveError('');
    const { error } = await supabase
      .from('users')
      .update({
        display_name: editForm.display_name.trim(),
        bio: editForm.bio.trim(),
        adopted_pet_name: editForm.adopted_pet_name.trim(),
        adopted_pet_photo: editForm.adopted_pet_photo.trim(),
      })
      .eq('id', user.id);
    if (error) {
      setSaveError('저장에 실패했어요. 다시 시도해주세요.');
    } else {
      await refreshProfile();
      setEditOpen(false);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const typeColors = {
    animal: '#FCE4EC',
    review: '#E8F5E9',
    lost_found: '#FFF3E0',
    volunteer: '#F3E5F5',
  };
  const typeLabels = { animal: '🐾', review: '🏡', lost_found: '🔍', volunteer: '💝' };

  if (!user) return null;

  return (
    <Box>
      <AppBar elevation={0} position="sticky" sx={{ top: 0, zIndex: 100 }}>
        <Toolbar sx={{ minHeight: 56, justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>마이페이지</Typography>
          <IconButton onClick={handleLogout} size="small">
            <LogoutRoundedIcon sx={{ color: 'text.secondary', fontSize: 22 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 프로필 헤더 */}
      <Box
        sx={{
          background: 'linear-gradient(160deg, #FFF0EA 0%, #FFE3D9 100%)',
          px: 2.5, py: 3,
          textAlign: 'center',
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 1.5 }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: '#FFD4C7' }}>
            {profile?.adopted_pet_photo
              ? <Box component="img" src={profile.adopted_pet_photo} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : (profile?.display_name?.[0] || '나')}
          </Avatar>
          <IconButton
            size="small"
            onClick={() => setEditOpen(true)}
            sx={{
              position: 'absolute', bottom: 0, right: -4,
              bgcolor: '#FF8C69', color: '#fff', width: 26, height: 26,
              '&:hover': { bgcolor: '#E8806A' },
            }}
          >
            <EditRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.25 }}>
          {profile?.display_name || '사용자'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          @{profile?.username || user.email?.split('@')[0]}
        </Typography>
        {profile?.bio && (
          <Typography variant="body2" sx={{ mb: 1.5, color: 'text.primary', maxWidth: 260, mx: 'auto' }}>
            {profile.bio}
          </Typography>
        )}

        {/* 입양한 반려동물 */}
        {profile?.adopted_pet_name && (
          <Chip
            icon={<PetsRoundedIcon sx={{ fontSize: '1rem !important' }} />}
            label={`${profile.adopted_pet_name}의 가족`}
            sx={{ bgcolor: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.8rem' }}
          />
        )}
      </Box>

      {/* 통계 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 2.5, bgcolor: 'background.paper', borderBottom: '1px solid #FFE3D9' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF8C69' }}>{myPosts.length}</Typography>
          <Typography variant="caption" color="text.secondary">게시물</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF8C69' }}>{totalLikes}</Typography>
          <Typography variant="caption" color="text.secondary">받은 좋아요</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF8C69' }}>
            {myPosts.filter(p => p.post_type === 'review').length}
          </Typography>
          <Typography variant="caption" color="text.secondary">후기</Typography>
        </Box>
      </Box>

      {/* 내 게시물 */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <GridViewRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>내 게시물</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Box key={i} sx={{ aspectRatio: '1/1', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ width: '100%', height: '100%', bgcolor: '#FFE3D9', borderRadius: 2 }} />
              </Box>
            ))}
          </Box>
        ) : myPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ fontSize: 40, mb: 1.5 }}>🐾</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>아직 게시물이 없어요</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              첫 게시물을 올려보세요!
            </Typography>
            <Button variant="contained" size="small" onClick={() => navigate('/write')}>
              게시물 작성하기
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
            {myPosts.map(post => (
              <Box
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                sx={{
                  aspectRatio: '1/1',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  bgcolor: typeColors[post.post_type] || '#FFF6F2',
                  transition: 'opacity 0.15s',
                  '&:active': { opacity: 0.8 },
                }}
              >
                {post.image_url ? (
                  <Box component="img" src={post.image_url} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '1.8rem' }}>
                    {typeLabels[post.post_type]}
                  </Box>
                )}
                {/* 좋아요 overlay */}
                <Box
                  sx={{
                    position: 'absolute', bottom: 4, right: 4,
                    display: 'flex', alignItems: 'center', gap: 0.25,
                    bgcolor: 'rgba(0,0,0,0.35)', borderRadius: 6, px: 0.75, py: 0.25,
                  }}
                >
                  <FavoriteRoundedIcon sx={{ fontSize: 10, color: '#FFB8A2' }} />
                  <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.6rem', fontWeight: 600 }}>
                    {post.likes_count || 0}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* 프로필 편집 다이얼로그 */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>프로필 편집</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {saveError && <Alert severity="error" sx={{ borderRadius: 2 }}>{saveError}</Alert>}
          <TextField
            label="닉네임"
            value={editForm.display_name}
            onChange={e => setEditForm(p => ({ ...p, display_name: e.target.value }))}
            fullWidth
            size="small"
          />
          <TextField
            label="소개글"
            value={editForm.bio}
            onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))}
            fullWidth
            size="small"
            multiline
            rows={2}
            placeholder="나를 소개해보세요"
          />
          <Divider sx={{ borderColor: '#FFE3D9' }}>🐾 입양한 반려동물</Divider>
          <TextField
            label="입양한 반려동물 이름"
            value={editForm.adopted_pet_name}
            onChange={e => setEditForm(p => ({ ...p, adopted_pet_name: e.target.value }))}
            fullWidth
            size="small"
            placeholder="예: 복실이"
          />
          <TextField
            label="반려동물 사진 URL"
            value={editForm.adopted_pet_photo}
            onChange={e => setEditForm(p => ({ ...p, adopted_pet_photo: e.target.value }))}
            fullWidth
            size="small"
            placeholder="이미지 URL을 입력하세요"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ color: 'text.secondary' }}>취소</Button>
          <Button variant="contained" onClick={handleSaveProfile} disabled={saving}>
            {saving ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : '저장하기'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPage;
