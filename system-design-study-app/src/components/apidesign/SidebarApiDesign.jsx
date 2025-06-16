import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Fundamentals
import LanguageIcon from '@mui/icons-material/Language'; // Protocols
import PatternIcon from '@mui/icons-material/Pattern'; // Patterns (using a generic one)
import SecurityIcon from '@mui/icons-material/Security'; // Security
import AssignmentIcon from '@mui/icons-material/Assignment'; // Scenarios
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Practice

const sections = [
  { name: 'Fundamentals', view: 'fundamentals', icon: <InfoIcon /> },
  { name: 'Protocols/Styles', view: 'protocols', icon: <LanguageIcon /> },
  { name: 'Patterns', view: 'patterns', icon: <PatternIcon /> },
  { name: 'Security', view: 'security', icon: <SecurityIcon /> },
  { name: 'Scenarios', view: 'scenarios', icon: <AssignmentIcon /> },
  { name: 'Practice', view: 'practice', icon: <FitnessCenterIcon /> },
];

function SidebarApiDesign({ currentView, setCurrentView }) {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          API Design
        </Typography>
      </Toolbar>
      <List>
        {sections.map((section) => (
          <ListItem key={section.name} disablePadding>
            <ListItemButton
              selected={currentView === section.view}
              onClick={() => setCurrentView(section.view)}
            >
              <ListItemIcon>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SidebarApiDesign;
