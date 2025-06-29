import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider, Link } from '@mui/material';
import { interviewApproachAppData } from '../../data/interviewApproachAppData';
import Mermaid from '../common/MermaidDiagram'; // Import Mermaid
import { setMetaTag, removeMetaTag } from '../../utils/metaUtils';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';
import { glossaryData } from '../../data/glossaryData.js'; // Needed for RenderTextWithLinks

// Helper function to render content items
const renderContentItem = (item, index) => {
  switch (item.type) {
    case 'paragraph':
      return <Typography variant="body1" paragraph key={index} className="text-neutral-700 dark:text-neutral-300 leading-relaxed"><RenderTextWithLinks text={item.text} glossaryData={glossaryData} /></Typography>;
    case 'heading':
      const HeadingVariant = `h${item.level + 2}`; // h3 -> h5, h2 -> h4, etc.
      return <Typography variant={HeadingVariant} component={HeadingVariant} gutterBottom key={index} className="mt-4 mb-2 font-semibold text-primary dark:text-primary-light"><RenderTextWithLinks text={item.text} glossaryData={glossaryData} /></Typography>;
    case 'list':
      return (
        <List dense key={index} className="mb-4">
          {item.items.map((listItem, idx) => (
            <ListItem key={idx} className="py-0">
              <ListItemText
                primaryTypographyProps={{ className: "text-neutral-700 dark:text-neutral-300" }}
                primary={<>• <RenderTextWithLinks text={listItem} glossaryData={glossaryData} /></>}
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
  const { title, sections, mermaidDiagrams } = interviewApproachAppData;
  const pageTitle = `${title} | System Design Interview Prep`;
  const pageDescription = "Master a structured approach for system design interviews. Learn frameworks, key principles, and common pitfalls to effectively design complex systems."; // Generic description

  useEffect(() => {
    const originalDocTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'og:type', content: 'website', isProperty: true },
      // Add other relevant tags like og:image, twitter:card etc. if available
      // { name: 'og:url', content: window.location.href, isProperty: true },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalDocTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

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
            {section.id === "framework" && mermaidDiagrams && mermaidDiagrams.frameworkFlow && (
              <Box sx={{ my: 3, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', overflowX: 'auto' }}>
                <Typography variant="h6" component="h3" gutterBottom className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                  Interview Framework Overview
                </Typography>
                <Mermaid chart={mermaidDiagrams.frameworkFlow} />
              </Box>
            )}
            {sectionIndex < sections.length - 1 && <Divider className="my-8 border-neutral-300 dark:border-neutral-700" />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default InterviewApproachPage;
