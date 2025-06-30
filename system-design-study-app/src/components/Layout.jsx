import React from 'react';
import { Link as RouterLink, Link } from 'react-router-dom'; // Added Link for IconButton
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import NavMenu from './common/NavMenu';
import { topicsData } from '../data/topicsData'; // Import topicsData

// Helper function to generate topic menu items
const categoryToPathMapping = {
  'Caching': '/caches',
  'Caching Patterns': '/caches', // Assuming Caching Patterns are part of the Caching guide
  'Databases': '/databases',
  'Messaging Queues': '/messaging-queues',
  'API Design': '/api-design',
  'Load Balancing': '/load-balancing',
  'Scalability Concepts': '/scalability-concepts',
  'Core Concepts': '/networking-cdn', // Added for Networking & CDN
  // Note: 'Interview Approach' topics might not fit this pattern if they don't have sub-topic IDs
  // and are just sections of a single page. For now, we assume topicsData has relevant categories.
};

const generateTopicMenuItems = () => {
  return topicsData.map(topic => {
    const basePath = categoryToPathMapping[topic.category];
    if (basePath) {
      return {
        label: topic.title,
        path: `${basePath}#${topic.id}`, // Link to specific section within a study guide page
      };
    }
    // Fallback or default path if category not mapped, though ideally all should be.
    // This could link to a generic topic detail page if those still exist, or log an error.
    // For now, let's assume all relevant categories are in the mapping.
    // If not, these items might not render correctly or lead to broken links.
    console.warn(`Topic category "${topic.category}" not found in categoryToPathMapping for topic "${topic.title}".`);
    return {
      label: topic.title,
      path: `/topics/${topic.id}`, // Fallback, might be a dead link if /topics/:id routes are removed
    };
  }).filter(item => item.path.includes('#')); // Ensure only valid mapped items are included for now
};

const navItems = {
  home: { label: 'Home', path: '/' },
  topics: {
    label: 'All Topics', // Renamed for clarity
    items: generateTopicMenuItems(),
  },
  featuredStudyGuides: {
    label: 'Featured Study Guides',
    items: [
      { label: 'Caching Strategies', path: '/caches' },
      { label: 'Database Selection', path: '/databases' },
      { label: 'Messaging Queues', path: '/messaging-queues' },
      { label: 'Load Balancing', path: '/load-balancing' },
      { label: 'API Design', path: '/api-design' },
      { label: 'Scalability Concepts', path: '/scalability-concepts' },
      { label: 'Networking & CDN', path: '/networking-cdn' }, // Added new guide
      { label: 'Interview Approach', path: '/interview-approach' },
    ],
  },
  studyResources: {
    label: 'Study Resources',
    items: [
      { label: 'Glossary', path: '/glossary' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Interview Frameworks', path: '/interview-frameworks' },
      { label: 'Trade-off Analysis', path: '/trade-off-analysis' },
    ],
  },
  about: {
    label: 'About Us', // Renamed for clarity
    items: [
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
};

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
      {/* Mobile Drawer Navigation */}
      {Object.values(navItems).map((item) => {
        // For mobile, we render NavMenu differently or use Buttons for direct links
        // The current NavMenu is designed for desktop hover; for mobile, it's better to list items directly or use a different approach.
        // For simplicity here, we'll expand all items. A more sophisticated mobile NavMenu might be needed for true dropdowns.
        if (item.items) {
          return (
            <Box key={item.label} sx={{ width: '100%', my: 1 }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', textAlign: 'left', pl: 2, pt:1, pb:0.5 }}>{item.label}</Typography>
              {item.items.map(subItem => (
                <Button
                  key={subItem.label}
                  component={RouterLink}
                  to={subItem.path}
                  onClick={handleDrawerToggle} // Close drawer on item click
                  sx={{ display: 'block', width: '100%', my: 0.5, color: 'text.primary', justifyContent: 'flex-start', pl: 3 }}
                >
                  {subItem.label}
                </Button>
              ))}
            </Box>
          );
        } else {
          return (
            <Button
              key={item.label}
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle} // Close drawer on item click
              sx={{ display: 'block', width: '100%', my: 1, color: 'text.primary' }}
            >
              {item.label}
            </Button>
          );
        }
      })}
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
            <IconButton
              component={Link}
              to="/"
              color="inherit"
              aria-label="go home"
              edge="start" // Good for first item in toolbar
              sx={{ mr: 1, color: 'primary.contrastText' }} // Added margin right
            >
              <HomeIcon />
            </IconButton>
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
                {/* Home Button always visible */}
                <Button
                  component={RouterLink}
                  to={navItems.home.path}
                  sx={{ color: 'primary.contrastText', mx: 1 }}
                >
                  {navItems.home.label}
                </Button>
                {/* Dynamically render NavMenu for items with sub-items, and Button for direct links */}
                {Object.values(navItems).map((item) => {
                  if (item.label === navItems.home.label) return null; // Skip home, it's already rendered

                  return item.items ? (
                    <NavMenu key={item.label} menuTitle={item.label} menuItems={item.items} />
                  ) : (
                    <Button
                      key={item.label}
                      component={RouterLink}
                      to={item.path}
                      sx={{ color: 'primary.contrastText', mx: 1 }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
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
