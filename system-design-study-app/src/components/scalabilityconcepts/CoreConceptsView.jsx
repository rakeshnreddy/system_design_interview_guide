import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function CoreConceptsView({ appData }) {
  if (!appData || !appData.coreConcepts) {
    return <Typography>Loading core scalability concepts data...</Typography>;
  }

  const renderConcept = (concept) => {
    switch (concept.id) {
      case 'cap_theorem_explained':
        return (
          <>
            <ListItemText primary="Explanation" secondary={concept.explanation} sx={{ whiteSpace: 'pre-line', mb: 1 }} />
            <ListItemText primary="Implications" secondary={concept.implications} sx={{ mb: 1 }} />
            <ListItemText primary="Choosing (CP vs AP)" secondary={concept.choosing} />
            {concept.visualLink && <Typography variant="caption" display="block" sx={{mt:1}}><em>Visual: {concept.visualLink} (placeholder)</em></Typography>}
          </>
        );
      case 'horizontal_vs_vertical_scaling':
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>Horizontal Scaling (Scaling Out)</Typography>
            <ListItemText secondary={concept.horizontal.description} sx={{mb:1}}/>
            <Typography variant="body2"><strong>Pros:</strong> {concept.horizontal.pros.join(', ')}</Typography>
            <Typography variant="body2" sx={{mb:1}}><strong>Cons:</strong> {concept.horizontal.cons.join(', ')}</Typography>

            <Typography variant="subtitle1" gutterBottom sx={{mt:2}}>Vertical Scaling (Scaling Up)</Typography>
            <ListItemText secondary={concept.vertical.description} sx={{mb:1}}/>
            <Typography variant="body2"><strong>Pros:</strong> {concept.vertical.pros.join(', ')}</Typography>
            <Typography variant="body2" sx={{mb:1}}><strong>Cons:</strong> {concept.vertical.cons.join(', ')}</Typography>
            <ListItemText primary="Common Use Cases" secondary={concept.useCases} />
            {concept.visualLink && <Typography variant="caption" display="block" sx={{mt:1}}><em>Visual: {concept.visualLink} (placeholder)</em></Typography>}
          </>
        );
      case 'stateless_vs_stateful':
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>Stateless Architecture</Typography>
            <ListItemText secondary={concept.stateless.description} sx={{mb:1}}/>
            <ListItemText primary="Implications" secondary={concept.stateless.implications} sx={{mb:1}}/>
            <ListItemText primary="Session Management" secondary={concept.stateless.sessionManagement} sx={{mb:1}}/>

            <Typography variant="subtitle1" gutterBottom sx={{mt:2}}>Stateful Architecture</Typography>
            <ListItemText secondary={concept.stateful.description} sx={{mb:1}}/>
            <ListItemText primary="Implications" secondary={concept.stateful.implications} sx={{mb:1}}/>
            <ListItemText primary="Session Management" secondary={concept.stateful.sessionManagement}/>
          </>
        );
      case 'consistency_models':
        return (
          <List dense disablePadding>
            {concept.models.map(model => (
              <ListItem key={model.name} sx={{display:'block', mb:1}}>
                <Typography variant="subtitle2">{model.name}</Typography>
                <ListItemText secondary={model.description}/>
                <ListItemText primary="Matters When" secondary={model.mattersWhen}/>
              </ListItem>
            ))}
          </List>
        );
      default:
        return <ListItemText secondary={concept.description || "Details not available."} />;
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
                </ListItem>
                <Divider component="li" sx={{ mb: 2 }} />
              </React.Fragment>
            ); // Semicolon restored
          })}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Detailed explanations of core scalability concepts like CAP Theorem, Horizontal vs. Vertical Scaling, Stateless vs. Stateful systems, and Consistency Models will be shown here, using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default CoreConceptsView;
