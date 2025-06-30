import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function KeyTakeawaysView({ appData }) {
  if (!appData || !appData.keyTakeaways || appData.keyTakeaways.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom component="h1">Key Takeaways</Typography>
        <Typography className="p-4">No key takeaways available for this topic yet.</Typography>
      </Box>
    );
  }

  const { keyTakeaways } = appData;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Key Takeaways: Networking & CDN
      </Typography>

      <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
        <List>
          {keyTakeaways.map((takeaway, index) => (
            <ListItem key={index} sx={{pb: 1, alignItems: 'flex-start'}}>
              <ListItemIcon sx={{minWidth: 32, mt: 0.5}}>
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{variant:'body1'}}
              >
                <RenderTextWithLinks text={takeaway} glossaryData={glossaryData} />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default KeyTakeawaysView;
