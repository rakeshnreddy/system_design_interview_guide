import React from 'react';
import { Typography, Box } from '@mui/material';

const FundamentalsView = ({ appData }) => {
  // console.log("Simplified FundamentalsView (Pink Box) received appData:", appData);

  return (
    <Box
      sx={{
        height: '300px', // Fixed height
        width: '100%',   // Full width of its container
        bgcolor: 'deeppink',
        p: 3,
        border: '5px solid red',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2, // Margin to separate from green diagnostic box
      }}
      data-testid="pink-box-fundamentals-view" // Added for potential testing
    >
      <Typography variant="h4" component="h1" sx={{ color: 'white !important' }}>
        PINK BOX TEST: Fundamentals View
      </Typography>
      <Typography paragraph sx={{ color: 'white !important', mt: 2 }}>
        If you see this, the view component is rendering inside the blue-bordered box, below the green diagnostic.
      </Typography>
      {appData && appData.metrics && appData.metrics.length > 0 ? (
        <Typography sx={{ color: 'lightyellow !important', mt: 2 }}>
          Pink Box: Data available: Yes, {appData.metrics.length} metrics. First: {appData.metrics[0].name}
        </Typography>
      ) : (
        <Typography sx={{ color: 'yellow !important', fontWeight: 'bold', mt: 2 }}>
          Pink Box: Data available: No or empty metrics in appData.
        </Typography>
      )}
    </Box>
  );
};

export default FundamentalsView;
