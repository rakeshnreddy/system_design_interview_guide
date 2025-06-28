import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Mermaid from '../common/Mermaid';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { glossaryData } from '../../../data/glossaryData';

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts, component="span" }) => {
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


function AlgorithmsView({ appData }) {
  if (!appData) {
    return <Typography>Loading algorithm data...</Typography>;
  }

  if (!appData.algorithms || appData.algorithms.length === 0) {
    return <Typography className="p-4">No load balancing algorithm data available.</Typography>;
  }
  const footerText = "Detailed explanations of various load balancing algorithms, such as {{Round Robin}} and {{Least Connections}}, will be displayed here. These are critical for managing {{Throughput}} and ensuring {{Availability}}.";


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Algorithms
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.algorithms.map((algo) => {
            const elementId = algo.id.replace(/_/g, '-');
            return (
              <React.Fragment key={algo.id}>
                <ListItem id={elementId} sx={{ display: 'block', mb: 2 }}>
                  <Typography variant="h6">{algo.name}</Typography>
                  <ListItemText
                    primary={<strong>How it works:</strong>}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(algo.howItWorks, glossaryData)} component="div"/>}
                    sx={{mb: 1}}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                  <ListItemText
                    primary={<strong>Pros:</strong>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <List dense disablePadding>
                        {algo.pros.map((pro, index) => (
                          <ListItem key={index} sx={{pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                             <ListItemText
                               primaryTypographyProps={{ variant: 'body2'}}
                               primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pro, glossaryData)} />}
                              />
                          </ListItem>
                        ))}
                      </List>
                    }
                    sx={{mb: 1}}
                  />
                  <ListItemText
                    primary={<strong>Cons:</strong>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <List dense disablePadding>
                        {algo.cons.map((con, index) => (
                          <ListItem key={index} sx={{pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                             <ListItemText
                                primaryTypographyProps={{ variant: 'body2'}}
                                primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(con, glossaryData)} />}
                              />
                          </ListItem>
                        ))}
                      </List>
                    }
                    sx={{mb: 1}}
                  />
                  <ListItemText
                    primary={<strong>Use Cases:</strong>}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(algo.useCases, glossaryData)} component="div"/>}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                <Divider component="li" sx={{mb:2}}/>
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
      <Typography sx={{mt: 2}} variant="body1">
        <RenderProcessedText textParts={parseTextForGlossaryLinks(footerText, glossaryData)} />
      </Typography>

      {appData.mermaidDiagrams && appData.mermaidDiagrams.roundRobin && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Round-Robin Distribution
          </Typography>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Mermaid chart={appData.mermaidDiagrams.roundRobin} />
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default AlgorithmsView;
