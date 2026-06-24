import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Card, CardContent, Button,
  Divider, TextField, Avatar, CircularProgress, Alert,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';

const avatarColors = ['#7C3AED', '#3B82F6', '#EC4899', '#10B981', '#F59E0B'];
const getAvatarColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
    checkLike();
    incrementViews();
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles!posts_author_profile_fkey(name, body_type)')
      .eq('id', id)
      .single();
    setPost(data);

    const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', id);
    setLikeCount(count || 0);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles!comments_author_profile_fkey(name)')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  const checkLike = async () => {
    if (!user) return;
    const { data } = await supabase.from('likes').select('id').eq('post_id', id).eq('user_id', user.id).maybeSingle();
    setLiked(!!data);
  };

  const incrementViews = async () => {
    await supabase.rpc('increment_views', { post_id: Number(id) });
  };

  const handleLike = async () => {
    if (!user) return;
    if (liked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', user.id);
      setLiked(false);
      setLikeCount(c => c - 1);
    } else {
      await supabase.from('likes').insert({ post_id: Number(id), user_id: user.id });
      setLiked(true);
      setLikeCount(c => c + 1);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !user) return;
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.from('comments').insert({
      content: commentText.trim(),
      post_id: Number(id),
      author_id: user.id,
    });
    if (err) {
      setError('댓글 작성에 실패했습니다.');
    } else {
      setCommentText('');
      fetchComments();
    }
    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId);
    fetchComments();
  };

  const handleDeletePost = async () => {
    if (!window.confirm('게시물을 삭제하시겠습니까?')) return;
    await supabase.from('posts').delete().eq('id', id);
    navigate('/posts');
  };

  const handleEditStart = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditError('');
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditError('');
  };

  const handleEditSave = async () => {
    if (!editTitle.trim()) { setEditError('제목을 입력해주세요.'); return; }
    if (!editContent.trim()) { setEditError('내용을 입력해주세요.'); return; }
    setEditSaving(true);
    setEditError('');
    const { error: err } = await supabase
      .from('posts')
      .update({ title: editTitle.trim(), content: editContent.trim() })
      .eq('id', id);
    if (err) {
      setEditError('수정에 실패했습니다. 다시 시도해주세요.');
    } else {
      setPost(prev => ({ ...prev, title: editTitle.trim(), content: editContent.trim() }));
      setIsEditing(false);
    }
    setEditSaving(false);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="text.secondary">게시물을 찾을 수 없습니다.</Typography>
        </Box>
      </Box>
    );
  }

  const profile = post.profiles;
  const isAuthor = user?.id === post.author_id;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 50%, #F5F3FF 100%)' }}>
      <Navbar />
      <Box sx={{ position: 'fixed', top: -150, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/posts')} sx={{ color: '#7C3AED', fontWeight: 600 }}>
            목록으로
          </Button>
          {isAuthor && !isEditing && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<EditIcon />} size="small" onClick={handleEditStart}
                sx={{ color: '#7C3AED', borderColor: 'rgba(124,58,237,0.4)', border: '1px solid' }}>
                수정
              </Button>
              <Button startIcon={<DeleteIcon />} color="error" size="small" onClick={handleDeletePost}>
                삭제
              </Button>
            </Box>
          )}
        </Box>

        {/* 게시물 카드 */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>

            {/* 수정 모드 */}
            {isEditing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>게시물 수정</Typography>
                {editError && <Alert severity="error" sx={{ borderRadius: 2 }}>{editError}</Alert>}
                <TextField
                  label="제목"
                  fullWidth
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <TextField
                  label="내용"
                  fullWidth
                  multiline
                  minRows={8}
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
                  <Button
                    startIcon={<CloseIcon />}
                    onClick={handleEditCancel}
                    disabled={editSaving}
                    sx={{ color: '#6B7280' }}
                  >
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckIcon />}
                    onClick={handleEditSave}
                    disabled={editSaving}
                    sx={{ fontWeight: 600 }}
                  >
                    {editSaving ? '저장 중...' : '저장'}
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 2.5, lineHeight: 1.4 }}>
                  {post.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Avatar sx={{ width: 40, height: 40, background: `linear-gradient(135deg, ${getAvatarColor(profile?.name)}, #3B82F6)`, fontWeight: 700, fontSize: '1rem' }}>
                    {profile?.name?.charAt(0) || '?'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{profile?.name || '알 수 없음'}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {post.updated_at !== post.created_at && (
                        <span style={{ marginLeft: 6, color: '#A78BFA' }}>(수정됨)</span>
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
                    <Typography variant="caption" color="text.secondary">{post.views}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: 'rgba(124,58,237,0.1)' }} />

                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.9, whiteSpace: 'pre-line', wordBreak: 'keep-all' }}>
                  {post.content}
                </Typography>

                {/* 좋아요 버튼 */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Box
                    onClick={handleLike}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer', p: 2, borderRadius: 3, border: liked ? '2px solid #EC4899' : '2px solid rgba(124,58,237,0.15)', background: liked ? 'rgba(236,72,153,0.06)' : 'rgba(255,255,255,0.6)', transition: 'all 0.2s', minWidth: 80, '&:hover': { background: 'rgba(236,72,153,0.08)', borderColor: '#EC4899' } }}
                  >
                    {liked
                      ? <FavoriteIcon sx={{ color: '#EC4899', fontSize: 28 }} />
                      : <FavoriteBorderIcon sx={{ color: '#9CA3AF', fontSize: 28 }} />}
                    <Typography variant="body2" fontWeight={600} sx={{ color: liked ? '#EC4899' : '#9CA3AF' }}>{likeCount}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        {/* 댓글 카드 */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2.5 }}>
              댓글 {comments.length}개
            </Typography>

            {comments.length === 0 ? (
              <Box sx={{ py: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">첫 번째 댓글을 남겨보세요!</Typography>
              </Box>
            ) : (
              comments.map((comment, idx) => (
                <Box key={comment.id}>
                  <Box sx={{ display: 'flex', gap: 1.5, py: 2 }}>
                    <Avatar sx={{ width: 36, height: 36, background: `linear-gradient(135deg, ${getAvatarColor(comment.profiles?.name)}, #3B82F6)`, fontSize: '0.875rem', fontWeight: 700, flexShrink: 0 }}>
                      {comment.profiles?.name?.charAt(0) || '?'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600} color="text.primary">{comment.profiles?.name || '알 수 없음'}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.created_at).toLocaleDateString('ko-KR')}
                        </Typography>
                        {user?.id === comment.author_id && (
                          <Button size="small" color="error" sx={{ minWidth: 0, p: 0, ml: 'auto', fontSize: '0.75rem' }} onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7 }}>{comment.content}</Typography>
                    </Box>
                  </Box>
                  {idx < comments.length - 1 && <Divider sx={{ borderColor: 'rgba(124,58,237,0.07)' }} />}
                </Box>
              ))
            )}

            <Divider sx={{ my: 2.5, borderColor: 'rgba(124,58,237,0.1)' }} />

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            {/* 댓글 작성 */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', fontSize: '0.875rem', fontWeight: 700, flexShrink: 0, mt: 0.5 }}>
                {user?.email?.charAt(0).toUpperCase()}
              </Avatar>
              <TextField
                multiline minRows={2} maxRows={5} fullWidth
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                size="small"
              />
              <Button
                variant="contained" color="primary" onClick={handleSubmitComment}
                disabled={!commentText.trim() || submitting}
                sx={{ mt: 0.5, minWidth: 48, px: 1.5 }}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PostDetailPage;
