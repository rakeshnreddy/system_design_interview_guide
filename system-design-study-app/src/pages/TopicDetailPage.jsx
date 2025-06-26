import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
import { topicsData } from '../data/topicsData';

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const topic = topicsData.find(t => t.id === topicId);

  useEffect(() => {
    if (!topic) return;
    const originalTitle = document.title;
    const pageTitle = `${topic.title} | System Design Guide`;
    const pageDescription = topic.description;

    document.title = pageTitle;
    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true }
    ];
    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [topic]);

  if (!topic) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Topic Not Found
        </Typography>
        <Typography paragraph>
          We couldn't find the topic you're looking for.
        </Typography>
        <Link to="/topics">Back to Topics</Link>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        {topic.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Category: {topic.category}
      </Typography>
      <Typography paragraph>{topic.description}</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">{topic.content}</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Link to="/topics">Back to Topics</Link>
      </Box>
    </Container>
  );
};

export default TopicDetailPage;
