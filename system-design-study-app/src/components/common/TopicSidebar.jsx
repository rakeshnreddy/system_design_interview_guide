// src/components/common/TopicSidebar.jsx
import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Toolbar } from '@mui/material';

const TopicSidebar = ({ topicTitle, sections, currentView, setCurrentView }) => {
  return (
    <div className="h-full flex flex-col">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" className="text-primary dark:text-primary-light font-semibold">
          {topicTitle}
        </Typography>
      </Toolbar>
      <List component="nav" className="flex-grow p-0">
        {sections.map(section => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={currentView === section.id}
              onClick={() => setCurrentView(section.id)}
              sx={{
                paddingLeft: '24px',
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderLeft: `4px solid`,
                  borderColor: 'primary.main',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
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
export default TopicSidebar;
