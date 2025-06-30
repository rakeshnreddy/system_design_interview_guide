import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function CDNConceptsView({ appData }) {
  if (!appData || !appData.cdnConcepts) {
    return <Typography className="p-4">Loading CDN concepts data...</Typography>;
  }

  const { title, introduction, howItWorks, popularProviders, commonFeatures } = appData.cdnConcepts;

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom component="h1">
        <RenderTextWithLinks text={title || "CDN Deep Dive"} glossaryData={glossaryData} />
      </Typography>

      {introduction && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="body1" component="div" paragraph>
            <RenderTextWithLinks text={introduction} glossaryData={glossaryData} />
          </Typography>
        </Paper>
      )}

      {howItWorks && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            <RenderTextWithLinks text={howItWorks.title || "How CDNs Work"} glossaryData={glossaryData} />
          </Typography>
          <Typography variant="body2" component="div" paragraph>
            <RenderTextWithLinks text={howItWorks.description} glossaryData={glossaryData} />
          </Typography>
          {howItWorks.steps && howItWorks.steps.length > 0 && (
            <List dense sx={{ listStyleType: 'decimal', pl: 2.5 }}>
              {howItWorks.steps.map((step, index) => (
                <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
                  <ListItemText primaryTypographyProps={{variant:'body2', component: 'div'}}>
                    <RenderTextWithLinks text={step} glossaryData={glossaryData} />
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          )}
          {howItWorks.visualMetaphor && (
            <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', p:1, backgroundColor: 'action.hover', borderRadius:1 }}>
              <RenderTextWithLinks text={howItWorks.visualMetaphor} glossaryData={glossaryData} />
            </Typography>
          )}
        </Paper>
      )}

      {popularProviders && popularProviders.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Popular CDN Providers
          </Typography>
          <List dense>
            {popularProviders.map((provider, index) => (
              <React.Fragment key={provider.name}>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="span" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={provider.name} glossaryData={glossaryData} /></Typography>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={<RenderTextWithLinks text={provider.features} glossaryData={glossaryData} />}
                  />
                </ListItem>
                {index < popularProviders.length - 1 && <Divider component="li" light />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {commonFeatures && commonFeatures.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            Common CDN Features
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {commonFeatures.map((feature, index) => (
              <Chip
                key={index}
                label={<RenderTextWithLinks text={feature} glossaryData={glossaryData} />}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default CDNConceptsView;
