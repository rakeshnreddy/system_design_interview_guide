import React, { useState, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, CircularProgress, Fab, CssBaseline } from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AiScenarioModal from './AiScenarioModal';

const drawerWidth = 240;

function TopicPageLayout({
  pageTitle,
  SidebarComponent,
  renderViewFunction,
  initialView = 'fundamentals',
  appData,
  topicId
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState(initialView);
  const [isAiModalOpenForTopic, setIsAiModalOpenForTopic] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mockSubmitToBackend = async (problem, solution) => {
    console.log(`Simulating Firebase call to 'getAiFeedback' with:`);
    console.log("Topic:", pageTitle);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Mock AI feedback for topic '${pageTitle}'. Real LLM integration pending.`;
  };

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView, topicId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* This AppBar is for the content within TopicPageLayout, not the main site AppBar */}
      <AppBar
        position="sticky" // Changed from "fixed"
        sx={(theme) => ({
          top: 0, // Stick to the top of its scrolling container
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: alpha(theme.palette.background.default, 0.85),
          backdropFilter: 'blur(8px)',
          boxShadow: theme.shadows[1],
          color: 'text.primary',
          zIndex: theme.zIndex.appBar - 100 // Lower zIndex than main AppBar
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* FIX: Home button is added here for consistent navigation */}
          <IconButton
            color="inherit"
            aria-label="go home"
            component={Link}
            to="/"
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label={`${pageTitle} sections sidebar`}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' },
          }}
        >
          <SidebarComponent currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={(theme) => ({ // Added theme access for toolbar height
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: 'none',
              // Offset by main AppBar height (assuming default toolbar height)
              // This assumes TopicPageLayout is rendered directly in a context where 0,0 is below main AppBar
              // More robustly, this offset should come from the actual main AppBar's height via theme or context
              // Using a fixed 64px which is a common MUI AppBar height.
              top: '64px',
              height: 'calc(100vh - 64px)', // Ensure it fills viewport height below appbar
            },
          })}
          open
        >
          <SidebarComponent currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: 'background.paper', // Use theme-aware background color
          border: '5px dashed blue',     // Added border for visibility
          minHeight: 'calc(100vh - 150px)', // Added minHeight to ensure it takes space
        }}
      >
        <Toolbar />
        <div style={{ border: '2px solid green', padding: '10px', margin: '10px', backgroundColor: 'lightgreen', color: 'black' }}>
          <Typography><strong>Diagnostic Info:</strong></Typography>
          <Typography>Current View Prop (for Sidebar): {currentView}</Typography>
          <Typography>Initial View Prop (from page): {initialView}</Typography>
          <Typography>Topic ID: {topicId}</Typography>
          <Typography>Page Title: {pageTitle}</Typography>
          <Typography>appData available: {appData ? 'Yes' : 'No'}</Typography>
        </div>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 112px)' }}>
            <CircularProgress size={60} />
          </Box>
        }>
          {renderViewFunction(currentView, appData)}
        </Suspense>
        <Fab
          color="secondary"
          aria-label="ask ai"
          onClick={() => setIsAiModalOpenForTopic(true)}
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
        >
          <LightbulbIcon />
        </Fab>
      </Box>

      <AiScenarioModal
        isOpen={isAiModalOpenForTopic}
        onClose={() => setIsAiModalOpenForTopic(false)}
        topicTitle={pageTitle}
        onSubmitToBackend={mockSubmitToBackend}
      />
    </Box>
  );
}

export default TopicPageLayout;
