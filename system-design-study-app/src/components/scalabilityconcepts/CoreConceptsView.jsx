import React from 'react';
import MermaidDiagram from '../common/MermaidDiagram';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Mermaid from '../common/Mermaid'; // Import Mermaid


function CoreConceptsView({ appData }) {
  if (!appData || !appData.coreConcepts) {
    return <Typography>Loading core scalability concepts data...</Typography>;
  }

  const renderConcept = (concept) => {
    switch (concept.id) {
      case 'cap_theorem_explained':
        return (
          <>
            {appData.mermaidDiagrams && appData.mermaidDiagrams.capTriangle && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Mermaid chart={appData.mermaidDiagrams.capTriangle} />
              </Box>
            )}
            <ListItemText component="div" primary="Explanation" secondary={concept.explanation} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div', sx: { whiteSpace: 'pre-line' } }} sx={{ mb: 1 }} />
            <ListItemText component="div" primary="Implications" secondary={concept.implications} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} sx={{ mb: 1 }} />
            <ListItemText component="div" primary="Choosing (CP vs AP)" secondary={concept.choosing} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} />
            {concept.visualLink && <Typography variant="caption" display="block" sx={{mt:1}}><em>Visual: {concept.visualLink} (placeholder)</em></Typography>}
          </>
        );
      case 'horizontal_vs_vertical_scaling':
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>Horizontal Scaling (Scaling Out)</Typography>
            <ListItemText component="div" secondary={concept.horizontal.description} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <Typography variant="body2"><strong>Pros:</strong> {concept.horizontal.pros.join(', ')}</Typography>
            <Typography variant="body2" sx={{mb:1}}><strong>Cons:</strong> {concept.horizontal.cons.join(', ')}</Typography>

            <Typography variant="subtitle1" gutterBottom sx={{mt:2}}>Vertical Scaling (Scaling Up)</Typography>
            <ListItemText component="div" secondary={concept.vertical.description} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <Typography variant="body2"><strong>Pros:</strong> {concept.vertical.pros.join(', ')}</Typography>
            <Typography variant="body2" sx={{mb:1}}><strong>Cons:</strong> {concept.vertical.cons.join(', ')}</Typography>
            <ListItemText component="div" primary="Common Use Cases" secondary={concept.useCases} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} />
            {concept.visualLink && <Typography variant="caption" display="block" sx={{mt:1}}><em>Visual: {concept.visualLink} (placeholder)</em></Typography>}
          </>
        );
      case 'stateless_vs_stateful':
        return (
          <>
            {appData.mermaidDiagrams && appData.mermaidDiagrams.statelessStateful && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Mermaid chart={appData.mermaidDiagrams.statelessStateful} />
              </Box>
            )}
            <Typography variant="subtitle1" gutterBottom>Stateless Architecture</Typography>
            <ListItemText component="div" secondary={concept.stateless.description} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <ListItemText component="div" primary="Implications" secondary={concept.stateless.implications} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <ListItemText component="div" primary="Session Management" secondary={concept.stateless.sessionManagement} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>

            <Typography variant="subtitle1" gutterBottom sx={{mt:2}}>Stateful Architecture</Typography>
            <ListItemText component="div" secondary={concept.stateful.description} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <ListItemText component="div" primary="Implications" secondary={concept.stateful.implications} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }} sx={{mb:1}}/>
            <ListItemText component="div" primary="Session Management" secondary={concept.stateful.sessionManagement} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }}/>
          </>
        );
      case 'consistency_models':
        return (
          <List dense disablePadding>
            {concept.models.map(model => (
              <ListItem key={model.name} sx={{display:'block', mb:1}}>
                <Typography variant="subtitle2">{model.name}</Typography>
                <ListItemText component="div" secondary={model.description} secondaryTypographyProps={{ component: 'div' }}/>
                <ListItemText component="div" primary="Matters When" secondary={model.mattersWhen} primaryTypographyProps={{ component: 'div' }} secondaryTypographyProps={{ component: 'div' }}/>
              </ListItem>
            ))}
            {appData.mermaidDiagrams && appData.mermaidDiagrams.consistencyTimeline && (
              <Box sx={{ my: 2, p: 1, border: '1px dashed grey', overflowX: 'auto' }}>
                <Typography variant="h6" gutterBottom sx={{mt: 2}}>Consistency Models Timeline</Typography>
                <Mermaid chart={appData.mermaidDiagrams.consistencyTimeline} />
              </Box>
            )}
          </List>
        );
      default:
        return <ListItemText component="div" secondary={concept.description || "Details not available."} secondaryTypographyProps={{ component: 'div' }} />;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Core Scalability Concepts
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.coreConcepts.map((concept) => {
            let elementId = concept.id; // Default to appData's id
            if (concept.id === 'horizontal_vs_vertical_scaling') {
              elementId = 'scaling-horizontal'; // Match topicsData.js id
            }
            // Add other mappings here if needed, e.g.
            // if (concept.id === 'cap_theorem_explained') {
            //   elementId = 'cap-theorem';
            // }

            return (
              <React.Fragment key={concept.id}>
                <ListItem id={elementId} sx={{ display: 'block', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>{concept.name}</Typography>
                  {renderConcept(concept)}
                  {concept.diagram && (
                    <Box sx={{ my: 2, p: 1, border: '1px dashed grey', overflowX: 'auto' }}>
                      <Typography variant="caption" display="block" sx={{mb: 1, fontStyle: 'italic'}}>Illustrative Diagram:</Typography>
                      <MermaidDiagram diagramDefinition={concept.diagram} diagramId={`${concept.id}-diagram`} />
                    </Box>
                  )}
                </ListItem>
                <Divider component="li" sx={{ mb: 2 }} />
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Detailed explanations of core scalability concepts like CAP Theorem, Horizontal vs. Vertical Scaling, Stateless vs. Stateful systems, and Consistency Models will be shown here, using data from <code>scalabilityConceptsAppData.js</code>. Some concepts may include illustrative diagrams.
      </Typography>
    </Box>
  );
}

export default CoreConceptsView;
