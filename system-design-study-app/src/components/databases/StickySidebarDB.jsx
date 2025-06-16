// src/components/databases/StickySidebarDB.jsx
import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Toolbar } from '@mui/material'; // Import MUI components

// Updated to accept currentView and setCurrentView
const StickySidebarDB = ({ sections, currentView, setCurrentView }) => {
  return (
    // Using a div container that will be placed inside MUI Drawer
    // Styling will be a mix of Tailwind for now, but could be fully MUI
    <div className="h-full flex flex-col">
      <Toolbar> {/* MUI Toolbar for consistent spacing like other sidebars */}
        <Typography variant="h6" noWrap component="div" className="text-primary dark:text-primary-light font-semibold">
          Database Topics
        </Typography>
      </Toolbar>
      <List component="nav" className="flex-grow p-0"> {/* Use MUI List for navigation items */}
        {sections.map(section => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={currentView === section.id}
              onClick={() => setCurrentView(section.id)}
              sx={{ // MUI sx prop for styling
                paddingLeft: '24px', // Indent items
                '&.Mui-selected': {
                  backgroundColor: 'action.selected', // Theme-aware selected color
                  borderLeft: `4px solid`,
                  borderColor: 'primary.main',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: 'action.hover', // Theme-aware hover color
                }
              }}
            >
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{
                  className: `text-sm ${currentView === section.id ? 'text-primary dark:text-primary-light font-semibold' : 'text-neutral-700 dark:text-neutral-300'}`
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default StickySidebarDB;
