import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../utils/textProcessing.js';
import { glossaryData } from '../../data/glossaryData.js';

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts }) => {
  if (typeof textParts === 'string') { // Handle plain string input for convenience
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

function PatternsView({ appData }) {
  if (!appData || !appData.patterns) {
    return <Typography>Loading API design pattern data...</Typography>;
  }

  const footerText = "Information about common API design patterns such as {{Pagination}}, {{Rate Limiting}}, {{API Versioning}}, etc., will be displayed here using data from apiDesignAppData.js. Consider how {{Idempotency}} plays a role in some patterns.";

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Common API Design Patterns
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.patterns.map((pattern) => (
            <React.Fragment key={pattern.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{pattern.name}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pattern.description, glossaryData)} />}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                {pattern.pros && pattern.pros.length > 0 && (
                  <>
                    <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Pros:</strong></Typography>
                    <List dense disablePadding sx={{ pl: 2 }}>
                      {pattern.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pro, glossaryData)} />}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {pattern.cons && pattern.cons.length > 0 && (
                  <>
                    <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Cons:</strong></Typography>
                    <List dense disablePadding sx={{ pl: 2 }}>
                      {pattern.cons.map((con, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(con, glossaryData)} />}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                 {pattern.useCases && (
                  <ListItemText
                    primary={<strong>Common Use Cases:</strong>}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pattern.useCases, glossaryData)} />}
                    secondaryTypographyProps={{ component: 'div' }}
                    sx={{ mt: 1 }}
                  />
                 )}
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

export default PatternsView;
