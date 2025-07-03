import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import MermaidDiagram from '../common/MermaidDiagram.jsx';
import { Link as RouterLink } from 'react-router-dom';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


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
                  <Typography variant="h6"><RenderTextWithLinks text={algo.name} glossaryData={glossaryData} /></Typography>
                  <ListItemText
                    primary={<strong>How it works:</strong>}
                    secondary={<RenderTextWithLinks text={algo.howItWorks} glossaryData={glossaryData} />}
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
                               primary={<RenderTextWithLinks text={pro} glossaryData={glossaryData} />}
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
                               primary={<RenderTextWithLinks text={con} glossaryData={glossaryData} />}
                              />
                          </ListItem>
                        ))}
                      </List>
                    }
                    sx={{mb: 1}}
                  />
                  <ListItemText
                    primary={<strong>Use Cases:</strong>}
                    secondary={<RenderTextWithLinks text={algo.useCases} glossaryData={glossaryData} />}
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
        <RenderTextWithLinks text={footerText} glossaryData={glossaryData} />
      </Typography>

      {appData.mermaidDiagrams && appData.mermaidDiagrams.roundRobin && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Round-Robin Distribution
          </Typography>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <MermaidDiagram
              diagramDefinition={appData.mermaidDiagrams.roundRobin}
              diagramId="round-robin-lb-diagram"
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default AlgorithmsView;
