import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Grid, Chip } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function UseCasesView({ appData }) {
  if (!appData || (!appData.useCasesAndTradeoffs && !appData.realWorldExamples)) {
    return <Typography className="p-4">Loading use cases and examples data...</Typography>;
  }

  const { title, effectiveUseCases, lessEffectiveOrChallenging, tradeoffs } = appData.useCasesAndTradeoffs || {};
  const examples = appData.realWorldExamples || [];

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom component="h1">
        <RenderTextWithLinks text={title || "CDN & Networking: Use Cases, Trade-offs & Examples"} glossaryData={glossaryData} />
      </Typography>

      {effectiveUseCases && effectiveUseCases.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Effective Use Cases for CDNs
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb:1 }}>
            {effectiveUseCases.map((useCase, index) => (
              <Chip key={index} label={<RenderTextWithLinks text={useCase} glossaryData={glossaryData}/>} color="primary" variant="outlined" size="small"/>
            ))}
          </Box>
        </Paper>
      )}

      {lessEffectiveOrChallenging && lessEffectiveOrChallenging.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Less Effective or More Challenging CDN Scenarios
          </Typography>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb:1 }}>
            {lessEffectiveOrChallenging.map((useCase, index) => (
              <Chip key={index} label={<RenderTextWithLinks text={useCase} glossaryData={glossaryData}/>} color="warning" variant="outlined" size="small"/>
            ))}
          </Box>
        </Paper>
      )}

      {tradeoffs && tradeoffs.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Key Trade-offs
          </Typography>
          <List dense>
            {tradeoffs.map((tradeoff, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{pb:1, pt:0.5}}>
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="span" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={tradeoff.aspect} glossaryData={glossaryData} /></Typography>}
                    secondary={<RenderTextWithLinks text={tradeoff.detail} glossaryData={glossaryData} />}
                  />
                </ListItem>
                {index < tradeoffs.length -1 && <Divider component="li" light />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {examples && examples.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Real-World Examples
          </Typography>
          {examples.map((example, index) => (
            <Box key={example.id || index} sx={{ mb: 2, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                <RenderTextWithLinks text={example.company} glossaryData={glossaryData} />
              </Typography>
              <Typography variant="body2" component="div">
                <RenderTextWithLinks text={example.example} glossaryData={glossaryData} />
              </Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}

export default UseCasesView;
