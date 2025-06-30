import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js'; // Assuming global glossary
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function OverviewView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading data...</Typography>;
  }

  const { overview, metrics, terminology } = appData;

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom component="h1">
        Networking & CDN: Overview & Core Concepts
      </Typography>

      {overview && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="body1" component="div" paragraph sx={{ whiteSpace: 'pre-line' }}>
            <RenderTextWithLinks text={overview} glossaryData={glossaryData} />
          </Typography>
        </Paper>
      )}

      {metrics && metrics.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Key Metrics
          </Typography>
          <List dense>
            {metrics.map((metric) => (
              <React.Fragment key={metric.id || metric.name}>
                <ListItem sx={{pb:1, pt:0.5}}>
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="span" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={metric.name} glossaryData={glossaryData} /></Typography>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                        <>
                            <RenderTextWithLinks text={metric.description} glossaryData={glossaryData} />
                            {metric.formula && (
                                <Typography variant="caption" display="block" sx={{mt:0.5, fontStyle: 'italic'}}>
                                    Formula: <RenderTextWithLinks text={metric.formula} glossaryData={glossaryData} />
                                </Typography>
                            )}
                        </>
                    }
                  />
                </ListItem>
                <Divider component="li" light />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {terminology && terminology.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Essential Terminology
          </Typography>
          <List dense>
            {terminology.map((term) => (
              <React.Fragment key={term.id || term.term}>
                <ListItem sx={{pb:1, pt:0.5}}>
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="span" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={term.term} glossaryData={glossaryData} /></Typography>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={<RenderTextWithLinks text={term.definition} glossaryData={glossaryData} />}
                  />
                </ListItem>
                <Divider component="li" light />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default OverviewView;
