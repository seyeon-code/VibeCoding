import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, Typography, TextField,
  Button, Chip, CircularProgress, Alert, ToggleButtonGroup,
  ToggleButton, Grid, Skeleton, Collapse, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const POST_TYPES = [
  { value: 'animal', label: '🐾 입양동물', desc: '보호소 유기동물 등록' },
  { value: 'review', label: '🏡 입양후기', desc: '입양 후 이야기 공유' },
  { value: 'lost_found', label: '🔍 주인찾기', desc: '잃어버린 동물 제보' },
  { value: 'volunteer', label: '💝 봉사활동', desc: '봉사 모집 공고' },
];

const ANIMAL_KEYWORDS = ['cute dog', 'stray dog', 'rescue cat', 'puppy', 'kitten', 'shelter pet', 'dog portrait', 'cat pet'];

const fetchImages = async (keyword) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (accessKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(keyword)}&count=9&client_id=${accessKey}`
      );
      if (res.ok) {
        const data = await res.json();
        return data.map(img => img.urls.regular);
      }
    } catch (_) {}
  }
  return Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/${keyword}${i + Date.now()}/400/300`);
};

const WritePostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [postType, setPostType] = useState('animal');
  const [form, setForm] = useState({
    title: '', caption: '', shelter_name: '',
    animal_name: '', animal_species: '', animal_breed: '',
    animal_age: '', animal_gender: '', animal_location: '',
    animal_personality: '', animal_health: '',
  });
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadImages = async (kw) => {
    setImageLoading(true);
    const q = kw || ANIMAL_KEYWORDS[Math.floor(Math.random() * ANIMAL_KEYWORDS.length)];
    const imgs = await fetchImages(q);
    setImages(imgs);
    setSelectedImage('');
    setImageLoading(false);
  };

  useEffect(() => { loadImages(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.caption.trim()) { setError('내용을 입력해주세요.'); return; }
    if (!selectedImage) { setError('이미지를 선택해주세요.'); return; }
    setSubmitting(true);
    setError('');

    const payload = {
      user_id: user.id,
      post_type: postType,
      caption: form.caption.trim(),
      image_url: selectedImage,
      title: form.title.trim() || null,
      shelter_name: form.shelter_name.trim() || null,
      animal_name: form.animal_name.trim() || null,
      animal_species: form.animal_species.trim() || null,
      animal_breed: form.animal_breed.trim() || null,
      animal_age: form.animal_age.trim() || null,
      animal_gender: form.animal_gender || null,
      animal_location: form.animal_location.trim() || null,
      animal_personality: form.animal_personality.trim() || null,
      animal_health: form.animal_health.trim() || null,
      likes_count: 0,
    };

    const { data, error: err } = await supabase.from('posts').insert(payload).select().single();
    if (err) { setError('게시물 등록에 실패했어요. 다시 시도해주세요.'); setSubmitting(false); return; }
    navigate(`/posts/${data.id}`);
  };

  const isAnimal = postType === 'animal' || postType === 'lost_found';

  return (
    <Box>
      <AppBar elevation={0} position="sticky" sx={{ top: 0, zIndex: 100 }}>
        <Toolbar sx={{ minHeight: 56, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" onClick={() => navigate(-1)}>
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>게시물 작성</Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ borderRadius: 20, px: 2.5 }}
          >
            {submitting ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : '게시'}
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="form" onSubmit={handleSubmit} sx={{ px: 2.5, py: 2.5 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        {/* 게시물 유형 선택 */}
        <Typography variant="h6" sx={{ mb: 1.5 }}>게시물 유형</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 3 }}>
          {POST_TYPES.map(t => (
            <Box
              key={t.value}
              onClick={() => setPostType(t.value)}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                border: '2px solid',
                borderColor: postType === t.value ? '#FF8C69' : '#FFE3D9',
                bgcolor: postType === t.value ? '#FFF0EA' : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              {postType === t.value && (
                <CheckCircleRoundedIcon sx={{ position: 'absolute', top: 8, right: 8, fontSize: 16, color: '#FF8C69' }} />
              )}
              <Typography sx={{ fontSize: '1.1rem', mb: 0.25 }}>{t.label}</Typography>
              <Typography variant="caption" color="text.secondary">{t.desc}</Typography>
            </Box>
          ))}
        </Box>

        {/* 제목 */}
        <TextField
          label="제목 (선택)"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          placeholder="게시물 제목을 입력하세요"
        />

        {/* 동물 이름 (animal 타입) */}
        {isAnimal && (
          <>
            <TextField
              label="동물 이름"
              name="animal_name"
              value={form.animal_name}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              placeholder="예: 복실이, 모카"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
              <TextField
                label="종"
                name="animal_species"
                value={form.animal_species}
                onChange={handleChange}
                size="small"
                placeholder="개 / 고양이 / 기타"
              />
              <TextField
                label="품종"
                name="animal_breed"
                value={form.animal_breed}
                onChange={handleChange}
                size="small"
                placeholder="말티즈, 믹스 등"
              />
              <TextField
                label="나이"
                name="animal_age"
                value={form.animal_age}
                onChange={handleChange}
                size="small"
                placeholder="예: 2살, 생후 3개월"
              />
              <FormControl size="small">
                <InputLabel>성별</InputLabel>
                <Select
                  label="성별"
                  name="animal_gender"
                  value={form.animal_gender}
                  onChange={handleChange}
                  sx={{ borderRadius: 2.5 }}
                >
                  <MenuItem value="male">♂ 수컷</MenuItem>
                  <MenuItem value="female">♀ 암컷</MenuItem>
                  <MenuItem value="unknown">미상</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="발견 장소"
              name="animal_location"
              value={form.animal_location}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              placeholder="예: 서울 강남구 역삼동"
            />
          </>
        )}

        {/* 보호소명 */}
        {(postType === 'animal' || postType === 'volunteer') && (
          <TextField
            label="보호소 / 단체명"
            name="shelter_name"
            value={form.shelter_name}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            placeholder="보호소 이름을 입력하세요"
          />
        )}

        {/* 성격 & 건강 정보 */}
        {isAnimal && (
          <>
            <TextField
              label="성격"
              name="animal_personality"
              value={form.animal_personality}
              onChange={handleChange}
              fullWidth
              size="small"
              multiline
              rows={2}
              sx={{ mb: 2 }}
              placeholder="예: 사람을 좋아하고 활발해요. 다른 강아지와도 잘 어울려요."
            />
            <TextField
              label="건강 정보"
              name="animal_health"
              value={form.animal_health}
              onChange={handleChange}
              fullWidth
              size="small"
              multiline
              rows={2}
              sx={{ mb: 2 }}
              placeholder="예: 예방접종 완료, 중성화 수술 완료, 건강 양호"
            />
          </>
        )}

        {/* 본문 */}
        <TextField
          label="내용 *"
          name="caption"
          value={form.caption}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 3 }}
          placeholder="따뜻한 이야기를 들려주세요..."
          required
        />

        {/* 이미지 선택 */}
        <Typography variant="h6" sx={{ mb: 1 }}>이미지 선택 *</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
          <TextField
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            size="small"
            placeholder="검색어 입력 (예: dog, cat)"
            sx={{ flex: 1 }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); loadImages(keyword); } }}
          />
          <Button
            variant="outlined"
            onClick={() => loadImages(keyword)}
            sx={{ borderColor: '#FFD4C7', color: 'text.secondary', flexShrink: 0, borderRadius: 12, px: 1.5 }}
            startIcon={<RefreshRoundedIcon />}
            size="small"
          >
            검색
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75, mb: 3 }}>
          {imageLoading
            ? Array.from({ length: 9 }, (_, i) => (
                <Skeleton key={i} variant="rectangular" sx={{ borderRadius: 1.5, aspectRatio: '1/1' }} />
              ))
            : images.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '3px solid',
                    borderColor: selectedImage === img ? '#FF8C69' : 'transparent',
                    position: 'relative',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {selectedImage === img && (
                    <Box sx={{
                      position: 'absolute', top: 4, right: 4,
                      bgcolor: '#FF8C69', borderRadius: '50%', p: 0.25,
                      display: 'flex', alignItems: 'center',
                    }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#fff' }} />
                    </Box>
                  )}
                </Box>
              ))
          }
        </Box>

        {selectedImage && (
          <Alert severity="success" icon="✅" sx={{ mb: 2, borderRadius: 2, fontSize: '0.8rem' }}>
            이미지가 선택됐어요
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={submitting || !form.caption.trim() || !selectedImage}
          sx={{ py: 1.8, fontSize: '1rem', borderRadius: 3 }}
        >
          {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : '게시물 등록하기 🐾'}
        </Button>
      </Box>
    </Box>
  );
};

export default WritePostPage;
