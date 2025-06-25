import React, { useEffect } from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';
import { setMetaTag, removeMetaTag } from '../utils/metaUtils'; // Assuming metaUtils is one level up

const AboutPage = () => {
  const pageTitle = "About Us | System Design Guide";
  const pageDescription = "Learn more about the System Design Guide and its mission to help software engineers prepare for technical interviews.";

  useEffect(() => {
    const originalTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  return (
    <Paper elevation={0} sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the System Design Guide! Our mission is to provide comprehensive, easy-to-understand resources for software engineers preparing for system design interviews. We believe that a strong understanding of system design principles is crucial for building scalable, reliable, and efficient software.
      </Typography>
      <Typography variant="body1" paragraph>
        This platform offers curated study materials, covering a wide range of topics from fundamental concepts like caching and databases to advanced architectural patterns. Whether you're aiming for a senior engineering role or just looking to solidify your knowledge, our guides are designed to help you succeed.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
        Our Vision
      </Typography>
      <Typography variant="body1" paragraph>
        We aim to be the go-to resource for system design interview preparation, continuously updating our content and incorporating interactive learning tools to make the study process engaging and effective.
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for visiting, and happy learning!
      </Typography>
    </Paper>
  );
};

export default AboutPage;
