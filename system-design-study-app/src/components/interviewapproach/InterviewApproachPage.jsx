import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { interviewApproachAppData } from '../../data/interviewApproachAppData';

// Helper function to render content items
const renderContentItem = (item, index) => {
  switch (item.type) {
    case 'paragraph':
      return <Typography variant="body1" paragraph key={index} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.text}</Typography>;
    case 'heading':
      const HeadingVariant = `h${item.level + 2}`; // h3 -> h5, h2 -> h4, etc.
      return <Typography variant={HeadingVariant} component={HeadingVariant} gutterBottom key={index} className="mt-4 mb-2 font-semibold text-primary dark:text-primary-light">{item.text}</Typography>;
    case 'list':
      return (
        <List dense key={index} className="mb-4">
          {item.items.map((listItem, idx) => (
            <ListItem key={idx} className="py-0">
              <ListItemText
                primaryTypographyProps={{ className: "text-neutral-700 dark:text-neutral-300" }}
                primary={`• ${listItem}`}
              />
            </ListItem>
          ))}
        </List>
      );
    default:
      return null;
  }
};

function InterviewApproachPage() {
  const { title, sections } = interviewApproachAppData;

  // Temporary AppBar to avoid import errors if it's not defined elsewhere yet
  // In a real app, this would be part of a shared Layout component
  const AppBar = ({ children, ...props }) => (
    <Box component="header" {...props} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...props.sx, backgroundColor: 'transparent', boxShadow: 'none' }}>
      {children}
    </Box>
  );
   const Toolbar = ({ children, ...props }) => (
    <Box component="div" {...props} sx={{ display: 'flex', alignItems: 'center', minHeight: { xs: 56, sm: 64 }, px:2, ...props.sx }}>
      {children}
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }} className="bg-white dark:bg-neutral-900 min-h-screen">
      {/* Simplified AppBar for context, assuming main layout handles the real one */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h4" component="h1" className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={0} className="p-4 md:p-6 lg:p-8 bg-transparent">
        {sections.map((section, sectionIndex) => (
          <Box component="section" key={section.id} className="mb-8">
            <Typography variant="h5" component="h2" gutterBottom className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 border-b-2 border-primary dark:border-primary-light pb-2 mb-4">
              {section.title}
            </Typography>
            {section.content.map(renderContentItem)}
            {sectionIndex < sections.length - 1 && <Divider className="my-8 border-neutral-300 dark:border-neutral-700" />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default InterviewApproachPage;
