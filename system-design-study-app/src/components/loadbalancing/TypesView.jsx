import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../utils/textProcessing.js';
import { glossaryData } from '../../data/glossaryData';

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts, component = "span" }) => {
  if (typeof textParts === 'string') {
    return React.createElement(component, null, textParts);
  }
  if (!Array.isArray(textParts)) {
    return null;
  }
  const elements = textParts.map((part, index) => {
    if (part.type === 'link') {
      return (
        <RouterLink
          key={`${part.displayText}-${index}`}
          to={`/glossary?search=${encodeURIComponent(part.term.term)}`}
          className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
          title={getDefinitionSnippet(part.term.definition)}
        >
          {part.displayText}
        </RouterLink>
      );
    }
    return <React.Fragment key={`text-${index}`}>{part.content}</React.Fragment>;
  });
  return React.createElement(component, null, ...elements);
};


function TypesView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading load balancer types data...</Typography>;
  }

  if (!appData.lbTypes || appData.lbTypes.length === 0) {
    return <Typography className="p-4">No load balancer type data available.</Typography>;
  }
  const footerText = "Information about different types of load balancers (Hardware, Software, Cloud like {{AWS ELB}}) will be displayed here. These can perform at {{Layer 4 (L4) Load Balancing}} or {{Layer 7 (L7) Load Balancing}} levels.";


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Types of Load Balancers
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.lbTypes.map((lbType) => (
            <React.Fragment key={lbType.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{lbType.name}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(lbType.description, glossaryData)} component="div"/>}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Pros:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {lbType.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pro, glossaryData)} />}
                           />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Cons:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {lbType.cons.map((con, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(con, glossaryData)} />}
                          />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Use Cases:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(lbType.useCases, glossaryData)} component="div" />}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        <RenderProcessedText textParts={parseTextForGlossaryLinks(footerText, glossaryData)} />
      </Typography>
    </Box>
  );
}

export default TypesView;
