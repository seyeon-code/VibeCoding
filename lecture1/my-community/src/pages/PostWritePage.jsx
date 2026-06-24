import { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent,
  TextField, Button, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';

const PostWritePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요.'); return; }
    if (!content.trim()) { setError('내용을 입력해주세요.'); return; }
    setError('');
    setLoading(true);
    const { data, error: err } = await supabase.from('posts').insert({
      title: title.trim(),
      content: content.trim(),
      author_id: user.id,
    }).select('id').single();

    if (err) {
      setError('게시물 등록에 실패했습니다. 다시 시도해주세요.');
    } else {
      navigate(`/posts/${data.id}`);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 50%, #F5F3FF 100%)' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/posts')} sx={{ mb: 2, color: '#7C3AED', fontWeight: 600 }}>
          목록으로
        </Button>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 3 }}>
              글쓰기
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="제목 *" fullWidth value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="게시물 제목을 입력하세요"
              />
              <TextField
                label="내용 *" fullWidth multiline minRows={10}
                value={content} onChange={e => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
              />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => navigate('/posts')} sx={{ borderColor: 'rgba(124,58,237,0.4)', color: '#7C3AED' }}>
                  취소
                </Button>
                <Button
                  variant="contained" color="primary" endIcon={<SendIcon />}
                  onClick={handleSubmit} disabled={loading}
                  sx={{ fontWeight: 600, px: 3 }}
                >
                  {loading ? '등록 중...' : '게시물 등록'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PostWritePage;
