import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function PatternsView({ appData }) {
  if (!appData || !appData.scalingPatterns) {
    return <Typography>Loading scalability pattern data...</Typography>;
  }

  const renderPatternDetails = (pattern) => {
    switch (pattern.id) {
      case 'db_scaling_strategies':
        return (
          <List dense disablePadding sx={{ml: 2}}>
            {pattern.strategies.map(strategy => (
              <ListItem key={strategy.name} sx={{display:'block', mb:1}}>
                <Typography variant="subtitle2">{strategy.name}</Typography>
                <ListItemText secondary={strategy.description} />
                <ListItemText primary="Use Cases" secondary={strategy.useCases} />
              </ListItem>
            ))}
          </List>
        );
      case 'microservices_scalability':
        return (
          <>
            <ListItemText secondary={pattern.description} sx={{mb:1}}/>
            <Typography variant="body2"><strong>Pros:</strong> {pattern.pros.join(', ')}</Typography>
            <Typography variant="body2"><strong>Challenges:</strong> {pattern.challenges.join(', ')}</Typography>
          </>
        );
      default:
        return (
          <>
            <ListItemText secondary={pattern.description} sx={{mb:1}}/>
            {pattern.roleInScalability && <ListItemText primary="Role in Scalability" secondary={pattern.roleInScalability} />}
          </>
        );
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Common Scaling Patterns
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.scalingPatterns.map((pattern) => (
            <React.Fragment key={pattern.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{pattern.name}</Typography>
                {renderPatternDetails(pattern)}
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Information about common scaling patterns (Caching, Load Balancing, Database Scaling, Async Processing, Microservices) and their role in scalability will be displayed here using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default PatternsView;
