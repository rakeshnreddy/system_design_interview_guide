import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed'; // Fundamentals
import ShuffleIcon from '@mui/icons-material/Shuffle'; // Algorithms
import AccountTreeIcon from '@mui/icons-material/AccountTree'; // Types
import AssignmentIcon from '@mui/icons-material/Assignment'; // Scenarios
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Practice

const sections = [
  { name: 'Fundamentals', view: 'fundamentals', icon: <SpeedIcon /> },
  { name: 'Algorithms', view: 'algorithms', icon: <ShuffleIcon /> },
  { name: 'Types', view: 'types', icon: <AccountTreeIcon /> },
  { name: 'Scenarios', view: 'scenarios', icon: <AssignmentIcon /> },
  { name: 'Practice', view: 'practice', icon: <FitnessCenterIcon /> },
];

function SidebarLoadBalancing({ currentView, setCurrentView }) {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Load Balancing
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

export default SidebarLoadBalancing;
