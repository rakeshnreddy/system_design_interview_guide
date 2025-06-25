import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Topics', path: '/topics' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Layout = ({ children }) => {
  const muiMaterialTheme = useTheme();
  const isMobile = useMediaQuery(muiMaterialTheme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { themeMode, toggleTheme } = useCustomTheme();

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
        {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        component="header"
        sx={{
          bgcolor: 'primary.main',
          zIndex: (theme) => theme.zIndex.appBar // Ensure AppBar is above other content
        }}
      >
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
                color: 'primary.contrastText',
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
                    sx={{ color: 'primary.contrastText', mx: 1 }}
                  >
                    {item.label}
                  </Button>
                ))}
                <IconButton
                  sx={{ ml: 1, color: 'primary.contrastText' }}
                  onClick={toggleTheme}
                  aria-label="toggle site theme"
                >
                  {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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

      <Box
        component="footer"
        sx={{
          bgcolor: (theme) => theme.palette.action.hover, // Theme-aware footer background
          color: 'text.secondary',
          py: 3,
          mt: 'auto'
        }}
      >
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
