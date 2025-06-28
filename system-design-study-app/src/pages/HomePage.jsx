import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Changed Link to RouterLink for consistency
import Card from '../components/common/Card';
import Button from '../components/common/Button'; // Existing Button
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
import { Box, Typography, Button as MuiButton, Container } from '@mui/material'; // MUI components for Hero

const guides = [
  { path: '/caches', title: 'Caching Strategies', description: 'Master caching techniques, patterns, and trade-offs for high-performance systems.' },
  { path: '/databases', title: 'Database Selection', description: 'Learn to choose the right database by understanding SQL vs. NoSQL, CAP theorem, and various data models.' },
  { path: '/messaging-queues', title: 'Messaging Queues', description: 'Explore message brokers, delivery semantics, and patterns for resilient and scalable distributed systems.' },
  { path: '/load-balancing', title: 'Load Balancing', description: 'Understand various load balancing algorithms and their impact on system availability and performance.' },
  { path: '/api-design', title: 'API Design', description: 'Principles of designing robust, scalable, and maintainable APIs, including REST and GraphQL.' },
  { path: '/scalability-concepts', title: 'Scalability Concepts', description: 'Core concepts for scaling systems, including horizontal vs. vertical scaling, and statelessness.' },
  { path: '/glossary', title: 'Interactive Glossary', description: 'Quickly look up key system design terms, concepts, and definitions.' },
  { path: '/interview-approach', title: 'Interview Approach', description: 'Strategies and frameworks for effectively navigating the system design interview.' },
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
          // bgcolor removed to use page default
          color: 'var(--text-primary) !important',   // Ensure text color is theme-aware
          py: { xs: 6, sm: 8, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
              lineHeight: { xs: 1.2, sm: 1.3 },
              color: 'var(--text-primary) !important' // Explicitly set to ensure visibility
            }}
          >
            Ace Your System Design Interview
          </Typography>
          <Typography
            variant="h5"
            component="p"
            paragraph // This adds bottom margin, consider if mb: 4 is still needed or adjust
            sx={{
              // mb: 4, // Typography with paragraph prop already adds margin-bottom. Adjust if more space is needed.
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
              lineHeight: { xs: 1.3, sm: 1.4 },
              color: 'var(--text-secondary) !important' // Explicitly set for visibility
            }}
          >
            Comprehensive study guides designed to help you master complex topics and impress in your next technical interview.
          </Typography>
          {/* "Explore All Topics" MuiButton removed */}
        </Container>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6 } }}>

        {/* Guides Section */}
        <Typography variant="h4" component="h2" sx={{ mb: 6, fontWeight:'bold', color: 'var(--text-primary) !important' }}>
          Featured Study Guides
        </Typography>
        {/* Updated to make the grid responsive with more items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Card key={guide.title} className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-3">{guide.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 min-h-[60px] flex-grow">{guide.description}</p>
              <RouterLink to={guide.path} className="mt-auto">
                <Button variant="primary" size="lg" className="w-full">Start Learning</Button>
              </RouterLink>
            </Card>
          ))}
        </div>

        {/* Explore All Topics Card - This might be redundant if all topics are listed above, or could link to a more detailed search/filter page */}
        <div className="mt-12">
          <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-3 pt-5">Looking for More?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 px-5">
              Browse and search through our comprehensive list of all study topics.
            </p>
            <RouterLink to="/topics" className="mt-auto w-full p-5">
              <Button variant="secondary" size="lg" className="w-full">Go to All Topics Page</Button>
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
