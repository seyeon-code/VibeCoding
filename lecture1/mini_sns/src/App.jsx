import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import WritePostPage from './pages/WritePostPage.jsx';
import MyPage from './pages/MyPage.jsx';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
      <CircularProgress sx={{ color: '#FFB8A2' }} />
    </Box>
  );
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/write" element={
            <ProtectedRoute><WritePostPage /></ProtectedRoute>
          } />
          <Route path="/my" element={
            <ProtectedRoute><MyPage /></ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
