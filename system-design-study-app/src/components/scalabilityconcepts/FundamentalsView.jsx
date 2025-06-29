import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function FundamentalsView({ appData }) {
  if (!appData || !appData.metrics || !appData.terminology) {
    return <Typography>Loading fundamental scalability data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scalability Fundamentals
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <List>
          {appData.metrics.map((metric) => (
            <React.Fragment key={metric.id}>
              <ListItem>
                <ListItemText
                  primary={<RenderTextWithLinks text={metric.name} glossaryData={glossaryData} />}
                  secondary={<RenderTextWithLinks text={metric.description} glossaryData={glossaryData} />}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Core Terminology
        </Typography>
        <List>
          {appData.terminology.map((term, index) => (
            <React.Fragment key={`${term.term}-${index}`}> {/* It seems term.id is not always present in scalabilityConceptsAppData for terminology */}
              <ListItem>
                <ListItemText
                  primary={<RenderTextWithLinks text={term.term} glossaryData={glossaryData} />}
                  secondary={<RenderTextWithLinks text={term.definition} glossaryData={glossaryData} />}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
       <Typography sx={{mt: 2}} variant="body1">
        More content related to scalability fundamentals will be displayed here, using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
