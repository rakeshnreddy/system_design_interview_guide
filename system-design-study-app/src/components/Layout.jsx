import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Layout = ({ children }) => {
  const location = useLocation();

  // Define the paths that use their own special layout (TopicPageLayout)
  const topicPagePaths = [
    '/caches',
    '/databases',
    '/messaging-queues',
    '/load-balancing',
    '/api-design',
    '/scalability-concepts',
    '/interview-approach'
  ];

  // Check if the current path is one of the special topic pages
  const isTopicPage = topicPagePaths.some(path => location.pathname.startsWith(path));

  if (isTopicPage) {
    // For topic pages, render a minimal header for navigation back home,
    // and a content area that correctly fills the remaining space.
    return (
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh', fontFamily: 'sans' }}>
        {/* Row 1: The header takes up only the space it needs ('auto') */}
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              component={Link}
              to="/"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              System Design Guide
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Row 2: The content area takes up the rest of the available space ('1fr') */}
        <Box sx={{ overflowY: 'auto' }}>
          {children}
        </Box>
      </Box>
    );
  }

  // For all other pages (like Home), use the standard layout with the main sidebar.
  return (
    <div className="flex h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
