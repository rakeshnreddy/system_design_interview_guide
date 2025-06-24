import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/common/Card';
import Button from '../components/common/Button'; // Example usage of new Button

const guides = [
  { path: '/caches', title: 'Caching Strategies', description: 'Master caching techniques, patterns, and trade-offs for high-performance systems.' },
  { path: '/databases', title: 'Database Selection', description: 'Learn to choose the right database by understanding SQL vs. NoSQL, CAP theorem, and various data models.' },
  { path: '/messaging-queues', title: 'Messaging Queues', description: 'Explore message brokers, delivery semantics, and patterns for resilient and scalable distributed systems.' },
];

const HomePage = () => {
  const pageTitle = "System Design Interview Prep | Ace Your Interview";
  const pageDescription = "Comprehensive study guides on caching, databases, messaging queues, and more to help you ace your system design interview.";
  return (
    <div className="text-center">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <h1 className="text-5xl font-extrabold text-neutral-900 dark:text-white mb-6">
        Ace Your System Design Interview
      </h1>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-3xl mx-auto">
        Comprehensive study guides designed to help you master complex topics and impress in your next technical interview.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Card key={guide.title} className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
            <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-3">{guide.title}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 min-h-[60px] flex-grow">{guide.description}</p>
            <Link to={guide.path} className="mt-auto">
              <Button variant="primary" size="lg" className="w-full">Start Learning</Button>
            </Link>
          </Card>
        ))}
      </div>

      <Card padding="p-8" shadow="xl" rounded="xl" className="mt-16">
         <h3 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Why These Guides?</h3>
         <ul className="list-disc list-inside text-left max-w-xl mx-auto text-neutral-600 dark:text-neutral-300 space-y-2">
            <li>Curated content focusing on E5/Senior Engineer level concepts.</li>
            <li>Interactive elements to reinforce learning (coming soon!).</li>
            <li>Clear explanations of complex trade-offs and architectural patterns.</li>
            <li>Designed to build confidence for real interview scenarios.</li>
         </ul>
      </Card>
    </div>
  );
};
export default HomePage;
