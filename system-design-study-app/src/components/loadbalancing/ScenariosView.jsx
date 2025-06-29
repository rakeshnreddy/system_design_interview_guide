import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../utils/textProcessing.js';
import { glossaryData } from '../../data/glossaryData.js';

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


function ScenariosView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading scenario data...</Typography>;
  }

  if (!appData.scenarios || appData.scenarios.length === 0) {
    return <Typography className="p-4">No load balancing scenario data available.</Typography>;
  }
  const footerText = "Real-world load balancing scenarios, such as handling {{Flash Sales}} or scaling {{Microservices}}, and their solutions will be presented here.";


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Scenarios
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.scenarios.map((scenario) => (
            <React.Fragment key={scenario.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{scenario.title}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(scenario.description, glossaryData)} component="div"/>}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Solution / Strategy:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(scenario.solution.strategy, glossaryData)} component="div"/>}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Key Components:</strong></Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {scenario.solution.components.map((component, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                      <ListItemText
                        primaryTypographyProps={{ variant: 'body2' }}
                        primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(component, glossaryData)} />}
                      />
                    </ListItem>
                  ))}
                </List>
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

export default ScenariosView;
