import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // For mobile menu
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Placeholder for ThemeContext if you have one
// import { useThemeContext } from '../contexts/ThemeContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Topics', path: '/topics' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Placeholder for theme toggle function
  // const { mode, toggleTheme } = useThemeContext() || { mode: 'light', toggleTheme: () => console.log("Theme context not available") };
  const mode = 'light'; // Default to light for now
  const toggleTheme = () => console.log("Toggle theme clicked");


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'background.paper' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          SysDesign
        </RouterLink>
      </Typography>
      {navItems.map((item) => (
        <Button
          key={item.label}
          component={RouterLink}
          to={item.path}
          sx={{ display: 'block', width: '100%', my: 1, color: 'text.primary' }}
        >
          {item.label}
        </Button>
      ))}
      <IconButton sx={{ mt: 1 }} onClick={toggleTheme} color="inherit" aria-label="toggle theme">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" component="header" sx={{ bgcolor: 'primary.main' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                mr: 2,
                textDecoration: 'none',
                color: 'common.white',
                fontWeight: 'bold',
              }}
            >
              System Design Guide
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{ color: 'common.white', mx: 1 }}
                  >
                    {item.label}
                  </Button>
                ))}
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit" aria-label="toggle site theme">
                  {mode === 'dark' ? <Brightness7Icon sx={{color: 'common.white'}} /> : <Brightness4Icon sx={{color: 'common.white'}}/>}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Box component="nav">
          {mobileOpen && drawer}
        </Box>
      )}

      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 3, sm: 4, md: 5 } }}>
        {children}
      </Container>

      <Box component="footer" sx={{ bgcolor: 'grey.200', color: 'text.secondary', py: 3, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} System Design Guide. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <RouterLink to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</RouterLink>
            {' | '}
            <RouterLink to="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</RouterLink>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
