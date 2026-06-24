import { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Card, Button, Chip,
  Pagination, Divider, InputAdornment, TextField, CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/common/Navbar';

const POSTS_PER_PAGE = 10;

const bodyTypeColors = {
  하체비만: { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
  스트레이트: { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
  웨이브: { bg: 'rgba(236,72,153,0.1)', color: '#EC4899' },
  내추럴: { bg: 'rgba(16,185,129,0.1)', color: '#10B981' },
};

const PostListPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    let query = supabase
      .from('posts')
      .select(`
        id, title, created_at, views, author_id,
        profiles!posts_author_profile_fkey(name, body_type),
        comments(count),
        likes(count)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (search.trim()) {
      query = query.ilike('title', `%${search.trim()}%`);
    }

    const { data, count, error } = await query;
    if (error) {
      console.error('posts 조회 오류:', error);
    }
    setPosts(data || []);
    setTotal(count || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 50%, #F5F3FF 100%)' }}>
      <Navbar />
      <Box sx={{ position: 'fixed', top: -150, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary">커뮤니티</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            다이어트 성공 후기, 식단 레시피, 체형별 운동법을 나눠요
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <TextField
            size="small" placeholder="제목 검색" value={search} onChange={handleSearch}
            sx={{ flex: 1, background: 'rgba(255,255,255,0.9)', borderRadius: 2 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#A78BFA', fontSize: 20 }} /></InputAdornment> }}
          />
          <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => navigate('/write')} sx={{ whiteSpace: 'nowrap', borderRadius: 2, px: 2.5 }}>
            글쓰기
          </Button>
        </Box>

        <Card sx={{ mb: 2, overflow: 'hidden' }}>
          {/* 헤더 행 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 90px 60px 60px 60px', px: 3, py: 1.5, background: 'rgba(124,58,237,0.06)', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
            {['제목', '작성자', '조회', '댓글', '좋아요'].map((h) => (
              <Typography key={h} variant="caption" color="text.secondary" fontWeight={600} textAlign={h === '제목' ? 'left' : 'center'}>{h}</Typography>
            ))}
          </Box>

          {loading ? (
            <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}><CircularProgress sx={{ color: '#7C3AED' }} /></Box>
          ) : posts.length === 0 ? (
            <Box sx={{ py: 6, textAlign: 'center' }}><Typography color="text.secondary">게시물이 없습니다.</Typography></Box>
          ) : (
            posts.map((post, idx) => {
              const profile = post.profiles;
              const commentCount = post.comments?.[0]?.count ?? 0;
              const likeCount = post.likes?.[0]?.count ?? 0;
              return (
                <Box key={post.id}>
                  <Box
                    onClick={() => navigate(`/posts/${post.id}`)}
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 90px 60px 60px 60px', px: 3, py: 2, cursor: 'pointer', transition: 'background 0.15s', '&:hover': { background: 'rgba(124,58,237,0.04)' } }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ '&:hover': { color: '#7C3AED' } }}>
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: 'block' }}>
                        {new Date(post.created_at).toLocaleDateString('ko-KR')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" fontWeight={600} color="text.primary">{profile?.name || '알 수 없음'}</Typography>
                      {profile?.body_type && (
                        <Chip label={profile.body_type} size="small" sx={{ height: 16, fontSize: '0.6rem', background: bodyTypeColors[profile.body_type]?.bg, color: bodyTypeColors[profile.body_type]?.color, border: 'none', mt: 0.3 }} />
                      )}
                    </Box>
                    {[
                      { icon: <VisibilityIcon sx={{ fontSize: 13, color: '#9CA3AF' }} />, val: post.views },
                      { icon: <ChatBubbleOutlinedIcon sx={{ fontSize: 13, color: '#9CA3AF' }} />, val: commentCount },
                      { icon: <FavoriteBorderIcon sx={{ fontSize: 13, color: '#F472B6' }} />, val: likeCount },
                    ].map(({ icon, val }, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        {icon}
                        <Typography variant="caption" color="text.secondary">{val}</Typography>
                      </Box>
                    ))}
                  </Box>
                  {idx < posts.length - 1 && <Divider sx={{ borderColor: 'rgba(124,58,237,0.07)' }} />}
                </Box>
              );
            })
          )}
        </Card>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} sx={{ '& .MuiPaginationItem-root.Mui-selected': { background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', color: 'white' } }} />
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
          총 {total}개의 게시물
        </Typography>
      </Container>
    </Box>
  );
};

export default PostListPage;
