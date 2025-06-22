import React, { useState, Suspense, useEffect } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, CircularProgress, Fab, CssBaseline } from '@mui/material';
import { alpha } from '@mui/material/styles'; // Import alpha for transparent colors
import MenuIcon from '@mui/icons-material/Menu';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AiScenarioModal from './AiScenarioModal'; // Import the new modal

const drawerWidth = 240;

/**
 * A reusable layout component for topic pages, providing a consistent structure
 * with a sidebar, app bar, main content area, and an AI interaction modal.
 * @param {object} props - The component props.
 * @param {string} props.pageTitle - The title to display in the AppBar.
 * @param {React.ElementType} props.SidebarComponent - The specific sidebar component for the topic.
 * @param {Function} props.renderViewFunction - A function that takes `currentView` (string) and `appData` (object) and returns the JSX for the current view.
 * @param {string} [props.initialView='fundamentals'] - The key of the initial view to display.
 * @param {object} props.appData - The application data object for the current topic.
 * @param {string} [props.topicId] - A unique identifier for the topic, used for keys or unique element IDs.
 */
function TopicPageLayout({
  pageTitle,
  SidebarComponent,
  renderViewFunction,
  initialView = 'fundamentals',
  appData,
  topicId
  // aiModalTitle and aiModalTextFieldLabel are removed as AiScenarioModal handles its own text
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState(initialView);
  const [isAiModalOpenForTopic, setIsAiModalOpenForTopic] = useState(false); // New state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Simulate Firebase HTTPS Callable function
  // In a real app, Firebase app would be initialized, and getFunctions() would be used.
  // import { getFunctions, httpsCallable } from 'firebase/functions';
  // const functions = getFunctions(); // Assuming firebase app is initialized
  // const getAiFeedbackCallable = httpsCallable(functions, 'getAiFeedback');

  const mockSubmitToBackend = async (problem, solution) => {
    console.log(`Simulating Firebase call to 'getAiFeedback' with:`);
    console.log("Topic:", pageTitle);
    console.log("Problem:", problem);
    console.log("Solution:", solution);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Actual call would be:
      // const result = await getAiFeedbackCallable({
      //   topicTitle: pageTitle,
      //   problem: problem,
      //   userSolution: solution,
      // });
      // return result.data.feedback;

      // Mocked direct response for now:
      if (!problem || !solution) {
        // This basic validation could also be in AiScenarioModal or handled by the Firebase function more formally
        return "Error: Please ensure both a problem and your solution are provided to get feedback.";
      }
      return `Mock AI feedback for topic '${pageTitle}':
Problem: "${problem.substring(0, 80)}..."
Solution: "${solution.substring(0, 80)}..."
This is placeholder feedback. Real LLM integration pending.
Consider performance, scalability, and cost implications of your choices.`;

    } catch (error) {
      console.error("Error calling Firebase function (simulated):", error);
      return "Error getting feedback from AI (simulated). Check console for details.";
    }
  };

  // Reset view when initialView or topicId changes (if different page is loaded)
  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView, topicId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> {/* Ensures consistent baseline styling from MUI */}
      <AppBar
        position="fixed"
        sx={(theme) => ({
          width: '100%', // Changed: AppBar takes full width of its container from Layout.jsx
          // ml: { sm: `${drawerWidth}px` }, // REMOVED: No longer offset by topic sidebar
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
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
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
          minHeight: '100vh',
          bgcolor: 'grey.50',
          '@media (prefers-color-scheme: dark)': {
            bgcolor: 'grey.900',
          },
          // Removed width calculation here; it should fill the space left by the Drawer (nav) and its parent's padding.
          // width: { sm: `calc(100% - ${drawerWidth}px)` }, // REMOVED
        }}
      >
        <Toolbar /> {/* For spacing below the AppBar */}
        <Suspense fallback={
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // Adjust height: 100vh (viewport) - AppBar height (approx 64px) - main padding (2*24px)
            // This is an approximation. For exactness, AppBar height might need to be dynamic.
            height: 'calc(100vh - 64px - 48px)',
            width: '100%'
          }}>
            <CircularProgress size={60} />
          </Box>
        }>
          {renderViewFunction(currentView, appData)}
        </Suspense>
        <Fab
          color="secondary"
          aria-label="ask ai"
          onClick={() => setIsAiModalOpenForTopic(true)} // Use new state setter
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
        >
          <LightbulbIcon />
        </Fab>
      </Box>

      <AiScenarioModal
        isOpen={isAiModalOpenForTopic}
        onClose={() => setIsAiModalOpenForTopic(false)}
        topicTitle={pageTitle} // Pass pageTitle as topicTitle for the modal
        onSubmitToBackend={mockSubmitToBackend} // Pass the mock backend submitter
        // initialProblem can be set here if needed, e.g., from appData for the topic
      />
    </Box>
  );
}

export default TopicPageLayout;
