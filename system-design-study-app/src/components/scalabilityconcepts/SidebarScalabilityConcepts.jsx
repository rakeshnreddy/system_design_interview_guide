import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Fundamentals
import HubIcon from '@mui/icons-material/Hub'; // Core Concepts (using Hub as a generic icon for interconnected concepts)
import PatternIcon from '@mui/icons-material/Pattern'; // Patterns
import AssignmentIcon from '@mui/icons-material/Assignment'; // Scenarios
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Practice

const sections = [
  { name: 'Fundamentals', view: 'fundamentals', icon: <InfoIcon /> },
  { name: 'Core Concepts', view: 'coreConcepts', icon: <HubIcon /> },
  { name: 'Scaling Patterns', view: 'patterns', icon: <PatternIcon /> },
  { name: 'Scenarios', view: 'scenarios', icon: <AssignmentIcon /> },
  { name: 'Practice', view: 'practice', icon: <FitnessCenterIcon /> },
];

function SidebarScalabilityConcepts({ currentView, setCurrentView }) {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Scalability
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

export default SidebarScalabilityConcepts;
