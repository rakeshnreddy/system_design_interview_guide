import React, { useState, Suspense, lazy } from 'react';
import { Box, Drawer, Toolbar, IconButton, Typography, CircularProgress, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SidebarScalabilityConcepts from './SidebarScalabilityConcepts';
import { scalabilityConceptsAppData } from '../../data/scalabilityConceptsAppData';

const drawerWidth = 240;

// Lazy load views
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const CoreConceptsView = lazy(() => import('./CoreConceptsView'));
const PatternsView = lazy(() => import('./PatternsView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

function ScalabilityConceptsPage(props) {
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
    console.log("AI Scenario Input (Scalability):", aiScenarioInput);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiScenarioResponse(`AI Response for Scalability: "${aiScenarioInput}". This is a placeholder. Integration pending.`);
    setIsAiLoading(false);
  };

  const renderView = () => {
    const commonProps = { appData: scalabilityConceptsAppData };
    switch (currentView) {
      case 'fundamentals':
        return <FundamentalsView {...commonProps} />;
      case 'coreConcepts':
        return <CoreConceptsView {...commonProps} />;
      case 'patterns':
        return <PatternsView {...commonProps} />;
      case 'scenarios':
        return <ScenariosView {...commonProps} />;
      case 'practice':
        return <PracticeView {...commonProps} />;
      default:
        return <Typography variant="h6">Select a topic from the sidebar</Typography>;
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  // Temporary AppBar
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
            Scalability Concepts
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="scalability concepts sections"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SidebarScalabilityConcepts currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <SidebarScalabilityConcepts currentView={currentView} setCurrentView={setCurrentView} />
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

      <Dialog open={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Ask AI About a Scalability Scenario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ai-scenario-input-scalability"
            label="Describe a scalability challenge or ask a question..."
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

export default ScalabilityConceptsPage;
