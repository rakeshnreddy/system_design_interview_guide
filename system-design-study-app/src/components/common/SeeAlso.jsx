// src/components/common/SeeAlso.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const SeeAlso = ({ links }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          See Also
        </Typography>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SeeAlso;
