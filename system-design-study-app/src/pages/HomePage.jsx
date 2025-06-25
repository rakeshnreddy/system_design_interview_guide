import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button'; // Existing Button
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
import { Box, Typography, Button as MuiButton, Container } from '@mui/material'; // MUI components for Hero

const guides = [
  { path: '/caches', title: 'Caching Strategies', description: 'Master caching techniques, patterns, and trade-offs for high-performance systems.' },
  { path: '/databases', title: 'Database Selection', description: 'Learn to choose the right database by understanding SQL vs. NoSQL, CAP theorem, and various data models.' },
  { path: '/messaging-queues', title: 'Messaging Queues', description: 'Explore message brokers, delivery semantics, and patterns for resilient and scalable distributed systems.' },
];

const HomePage = () => {
  const pageTitle = "System Design Interview Prep | Ace Your Interview";
  const pageDescription = "Comprehensive study guides on caching, databases, messaging queues, and more to help you ace your system design interview.";

  useEffect(() => {
    const originalTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'twitter:card', content: 'summary_large_image', isProperty: false },
      { name: 'twitter:title', content: pageTitle, isProperty: false },
      { name: 'twitter:description', content: pageDescription, isProperty: false },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.dark', // A distinct background color for the hero
          color: 'common.white',
          py: { xs: 6, sm: 8, md: 10 },
          textAlign: 'center',
          // Negative margins to make it full-width if Layout's main container has padding
          // This depends on how Layout's <main> padding is handled.
          // For now, assuming HomePage is directly within Layout's <Container>
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' } }}
          >
            Ace Your System Design Interview
          </Typography>
          <Typography
            variant="h5"
            component="p"
            paragraph
            sx={{ mb: 4, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            Comprehensive study guides designed to help you master complex topics and impress in your next technical interview.
          </Typography>
          <MuiButton
            variant="contained"
            color="secondary" // A contrasting color for CTA
            size="large"
            component={RouterLink}
            to="/topics"
            sx={{ padding: '10px 30px', fontSize: '1.1rem' }}
          >
            Explore All Topics
          </MuiButton>
        </Container>
      </Box>

      {/* Existing Content - wrapped in a div for centering if needed, or directly use Layout's container */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6 } }}> {/* Added padding for spacing after hero */}

        {/* Guides Section */}
        <Typography variant="h4" component="h2" sx={{ mb: 6, fontWeight:'bold' }}>
          Featured Study Guides
        </Typography>
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Card key={guide.title} className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-3">{guide.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 min-h-[60px] flex-grow">{guide.description}</p>
              <RouterLink to={guide.path} className="mt-auto">
                {/* Using the existing custom Button component */}
                <Button variant="primary" size="lg" className="w-full">Start Learning</Button>
              </RouterLink>
            </Card>
          ))}
        </div>

        {/* Explore All Topics Card */}
        <div className="mt-12">
          <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-3 pt-5">Explore All Topics</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 px-5">
              Browse and search through a comprehensive list of all study topics.
            </p>
            <RouterLink to="/topics" className="mt-auto w-full p-5">
              <Button variant="secondary" size="lg" className="w-full">Go to All Topics</Button>
            </RouterLink>
          </Card>
        </div>

        {/* Why These Guides? Card */}
        <Card padding="p-8" shadow="xl" rounded="xl" className="mt-16">
           <h3 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Why These Guides?</h3>
           <ul className="list-disc list-inside text-left max-w-xl mx-auto text-neutral-600 dark:text-neutral-300 space-y-2">
              <li>Curated content focusing on E5/Senior Engineer level concepts.</li>
              <li>Interactive elements to reinforce learning (coming soon!).</li>
              <li>Clear explanations of complex trade-offs and architectural patterns.</li>
              <li>Designed to build confidence for real interview scenarios.</li>
           </ul>
        </Card>
      </Box>
    </>
  );
};
export default HomePage;
