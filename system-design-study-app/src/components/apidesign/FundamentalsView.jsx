import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { glossaryData } from '../../../data/glossaryData';

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


function FundamentalsView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading fundamental API design data...</Typography>;
  }

  const overviewText = appData.overview || "Overview of API design fundamentals, covering key principles like {{REST}}, {{GraphQL}}, and the importance of {{Stateless Architecture}} in modern APIs.";

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Design Fundamentals
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          <RenderProcessedText textParts={parseTextForGlossaryLinks(overviewText, glossaryData)} />
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <List>
          {!appData.metrics || appData.metrics.length === 0 ? (
            <ListItem><ListItemText primary="No metrics data available." /></ListItem>
          ) : (
            appData.metrics.map((metric) => (
                <React.Fragment key={metric.id}>
                  <ListItem>
                  <ListItemText
                    primary={metric.name}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(metric.description, glossaryData)} />}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Core Terminology
        </Typography>
        <List>
          {!appData.terminology || appData.terminology.length === 0 ? (
            <ListItem><ListItemText primary="No terminology data available." /></ListItem>
          ) : (
            appData.terminology.map((term) => (
                <React.Fragment key={term.id || term.term}>
                  <ListItem>
                  <ListItemText
                    primary={term.term}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(term.definition, glossaryData)} />}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
       <Typography sx={{mt: 2}} variant="body1">
        <RenderProcessedText textParts={parseTextForGlossaryLinks("More content related to API design fundamentals will be displayed here, such as discussions on {{Idempotency}} and {{API Versioning}}.", glossaryData)} />
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
