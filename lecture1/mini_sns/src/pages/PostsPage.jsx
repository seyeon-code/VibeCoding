import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, Typography, Tabs, Tab,
  Grid, Skeleton, Fab
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AnimalCard from '../components/common/AnimalCard.jsx';
import PostCard from '../components/common/PostCard.jsx';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const TABS = [
  { label: '전체', type: '' },
  { label: '🐶 입양동물', type: 'animal' },
  { label: '🏡 입양후기', type: 'review' },
  { label: '🔍 주인찾기', type: 'lost_found' },
  { label: '💝 봉사활동', type: 'volunteer' },
];

const PostsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || '';
  const tabIndex = TABS.findIndex(t => t.type === typeParam);
  const currentTab = tabIndex >= 0 ? tabIndex : 0;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase
        .from('posts')
        .select('*, users(display_name, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(30);
      if (typeParam) query = query.eq('post_type', typeParam);
      const { data } = await query;
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, [typeParam]);

  const handleTabChange = (_, newValue) => {
    const type = TABS[newValue].type;
    if (type) setSearchParams({ type });
    else setSearchParams({});
  };

  const renderPost = (post) => {
    if (post.post_type === 'animal' || post.post_type === 'lost_found') {
      return <AnimalCard key={post.id} post={post} />;
    }
    return <PostCard key={post.id} post={post} />;
  };

  return (
    <Box>
      <AppBar elevation={0} position="sticky" sx={{ top: 0, zIndex: 100 }}>
        <Toolbar sx={{ minHeight: 56 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            유기동물 이야기
          </Typography>
        </Toolbar>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            px: 1,
            '& .MuiTabs-indicator': { backgroundColor: '#FF8C69', height: 2 },
            '& .MuiTab-root': { color: '#C4A49A', minWidth: 'auto', px: 1.5 },
            '& .Mui-selected': { color: '#FF8C69 !important' },
          }}
        >
          {TABS.map((t, i) => (
            <Tab key={i} label={t.label} sx={{ fontSize: '0.8rem', minHeight: 44 }} />
          ))}
        </Tabs>
      </AppBar>

      <Box sx={{ px: 2.5, py: 2 }}>
        {loading ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
            {[1, 2, 3, 4].map(i => (
              <Box key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2.5, mb: 1 }} />
                <Skeleton width="80%" height={16} />
                <Skeleton width="60%" height={14} />
              </Box>
            ))}
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: 48, mb: 2 }}>🐾</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>아직 게시물이 없어요</Typography>
            <Typography variant="body2" color="text.secondary">첫 번째 게시물을 올려보세요!</Typography>
          </Box>
        ) : (
          <>
            {/* 동물/주인찾기 타입은 2열 그리드 */}
            {(!typeParam || typeParam === 'animal' || typeParam === 'lost_found') && (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                {posts
                  .filter(p => !typeParam || p.post_type === typeParam || p.post_type === 'animal' || p.post_type === 'lost_found')
                  .map(post => (post.post_type === 'animal' || post.post_type === 'lost_found')
                    ? <AnimalCard key={post.id} post={post} />
                    : <Box key={post.id} sx={{ gridColumn: '1 / -1' }}><PostCard post={post} /></Box>
                  )
                }
              </Box>
            )}
            {/* 후기/봉사활동은 단일 컬럼 */}
            {(typeParam === 'review' || typeParam === 'volunteer') && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
              </Box>
            )}
            {/* 전체 보기 - 동물은 그리드, 나머지는 단일 */}
            {!typeParam && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: posts.some(p => p.post_type !== 'animal' && p.post_type !== 'lost_found') ? 1.5 : 0 }}>
                {posts.filter(p => p.post_type !== 'animal' && p.post_type !== 'lost_found').map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      {/* 글쓰기 FAB */}
      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          boxShadow: '0 4px 16px rgba(255,140,105,0.4)',
        }}
        onClick={() => user ? navigate('/write') : navigate('/login')}
      >
        <AddRoundedIcon />
      </Fab>
    </Box>
  );
};

export default PostsPage;
