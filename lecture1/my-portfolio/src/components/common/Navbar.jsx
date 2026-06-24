import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: 'primary.main', letterSpacing: 1 }}
          >
            My Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_ITEMS.map(({ label, to }) => (
              <Button
                key={to}
                component={NavLink}
                to={to}
                end={to === '/'}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  borderRadius: '20px',
                  px: 2,
                  '&.active': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(217, 59, 45, 0.08)',
                  },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(217, 59, 45, 0.06)',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
