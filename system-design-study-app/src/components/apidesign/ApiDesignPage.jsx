import React, { useState, Suspense, lazy } from 'react';
import { Box, Drawer, Toolbar, IconButton, Typography, CircularProgress, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close'; // Available if needed for modal
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Example for AI Scenario
import SidebarApiDesign from './SidebarApiDesign';
import { apiDesignAppData } from '../../data/apiDesignAppData'; // Data import

const drawerWidth = 240;

// Lazy load views
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const ProtocolsView = lazy(() => import('./ProtocolsView'));
const PatternsView = lazy(() => import('./PatternsView'));
const SecurityView = lazy(() => import('./SecurityView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

function ApiDesignPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('fundamentals'); // Default view
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiScenarioInput, setAiScenarioInput] = useState('');
  const [aiScenarioResponse, setAiScenarioResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScenarioSubmit = async () => {
    if (!aiScenarioInput.trim()) return;
    setIsAiLoading(true);
    setAiScenarioResponse('');
    // Simulate API call
    console.log("AI Scenario Input (API Design):", aiScenarioInput);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    setAiScenarioResponse(`AI Response for API Design: "${aiScenarioInput}". This is a placeholder. Integration pending.`);
    setIsAiLoading(false);
  };

  const renderView = () => {
    const commonProps = { appData: apiDesignAppData };
    switch (currentView) {
      case 'fundamentals':
        return <FundamentalsView {...commonProps} />;
      case 'protocols':
        return <ProtocolsView {...commonProps} />;
      case 'patterns':
        return <PatternsView {...commonProps} />;
      case 'security':
        return <SecurityView {...commonProps} />;
      case 'scenarios':
        return <ScenariosView {...commonProps} />;
      case 'practice':
        return <PracticeView {...commonProps} />;
      default:
        return <Typography variant="h6">Select a topic from the sidebar</Typography>;
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  // Temporary AppBar to avoid import errors if it's not defined elsewhere yet
  const AppBar = ({ children, ...props }) => (
    <Box component="header" {...props} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...props.sx }}>
      {children}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
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
            API Design
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="api design sections"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SidebarApiDesign currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <SidebarApiDesign currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/* For spacing */}
        <Suspense fallback={<CircularProgress />}>
          {renderView()}
        </Suspense>
        <Fab
          color="secondary"
          aria-label="ask ai"
          onClick={() => setIsAiModalOpen(true)}
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
        >
          <LightbulbIcon />
        </Fab>
      </Box>

      {/* AI Scenario Modal */}
      <Dialog open={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Ask AI About an API Design Scenario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ai-scenario-input-api"
            label="Describe an API design challenge or ask a question..."
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={aiScenarioInput}
            onChange={(e) => setAiScenarioInput(e.target.value)}
          />
          {isAiLoading && <CircularProgress sx={{ mt: 2 }} />}
          {aiScenarioResponse && (
            <Box sx={{ mt: 2, p: 2, border: '1px dashed grey', borderRadius: 1 }}>
              <Typography variant="subtitle1">AI Response:</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{aiScenarioResponse}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAiModalOpen(false)}>Cancel</Button>
          <Button onClick={handleScenarioSubmit} disabled={isAiLoading}>
            {isAiLoading ? 'Thinking...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ApiDesignPage;
