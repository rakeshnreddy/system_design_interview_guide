import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../utils/textProcessing.js';
import { glossaryData } from '../../data/glossaryData.js';

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts }) => {
  if (typeof textParts === 'string') {
    return <>{textParts}</>;
  }
  if (!Array.isArray(textParts)) {
    return null;
  }
  return (
    <>
      {textParts.map((part, index) => {
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
      })}
    </>
  );
};

function ScenariosView({ appData }) {
  if (!appData || !appData.scenarios) {
    return <Typography>Loading API design scenario data...</Typography>;
  }
  const footerText = "Real-world API design scenarios and example solutions/considerations will be presented here, using data from apiDesignAppData.js. These often involve choosing between {{REST}}, {{GraphQL}}, or {{gRPC}} based on needs like {{Pagination}} or {{Real-time data}}.";


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Design Scenarios
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.scenarios.map((scenario) => (
            <React.Fragment key={scenario.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{scenario.title}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(scenario.description, glossaryData)} />}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Key Considerations / Solution Sketch:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {scenario.considerations.map((item, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(item, glossaryData)} />}
                          />
                        </ListItem>
                      ))}
                    </List>
                  }
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

export default ScenariosView;
