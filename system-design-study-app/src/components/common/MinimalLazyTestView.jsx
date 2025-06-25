import React from 'react';
import { Typography, Box } from '@mui/material';

const MinimalLazyTestView = () => {
  return (
    <Box sx={{ my: 2, p: 2, bgcolor: 'lightgoldenrodyellow', border: '2px solid gold' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
        MINIMAL LAZY-LOADED TEST VIEW LOADED SUCCESSFULLY!
      </Typography>
      <Typography sx={{ color: 'black', mt: 1 }}>
        If you see this, Suspense and lazy-loading are working within TopicPageLayout.
      </Typography>
    </Box>
  );
};

export default MinimalLazyTestView;
