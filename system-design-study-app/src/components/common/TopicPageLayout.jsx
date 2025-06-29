import React, { useState, Suspense, useEffect } from 'react';
import { Box, Drawer, Fab, CssBaseline } from '@mui/material';
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
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <CssBaseline />
      {/* Inner AppBar for topic title - REMOVED */}

      {/* Navigation Drawer (Sidebar) */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label={`${pageTitle} sections sidebar`}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              // Temporary drawer typically covers main AppBar, so no top offset needed here
              // It uses higher zIndex by default.
            },
          }}
        >
          <SidebarComponent currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={(theme) => ({
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: 'none', // Original style
              top: '64px', // Assuming main AppBar is 64px.
              height: 'calc(100vh - 64px)', // Adjust height to be below main AppBar
            },
          })}
          open
        >
          <SidebarComponent currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: 'background.paper', // Theme-aware background
          // marginLeft: { sm: `${drawerWidth}px` }, // This was part of original flex setup if AppBar not part of flex
          // width: { sm: `calc(100% - ${drawerWidth}px)` }, // This was part of original flex setup
        }}
      >
        {/* Toolbar spacer for the inner sticky AppBar - REMOVED */}
        {/* <Toolbar /> */}
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' /* Account for one main AppBar roughly */ }}>
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
