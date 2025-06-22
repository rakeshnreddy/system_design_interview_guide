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
      <AppBar
        position="fixed"
        sx={(theme) => ({
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: alpha(theme.palette.background.default, 0.85),
          backdropFilter: 'blur(8px)',
          boxShadow: theme.shadows[1],
          color: 'text.primary',
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
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper', borderRight: 'none' },
          }}
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
          bgcolor: 'grey.50',
          '@media (prefers-color-scheme: dark)': {
            bgcolor: 'grey.900',
          },
        }}
      >
        <Toolbar />
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
