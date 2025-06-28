// src/components/common/Glossary.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Glossary = ({ term, definition }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {term}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {definition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Glossary;
