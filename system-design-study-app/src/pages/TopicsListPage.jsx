import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../components/common/SearchInput';
import Card from '../components/common/Card'; // Assuming Card component can be used here
import Button from '../components/common/Button'; // Assuming Button component can be used

// Sample aggregated topics data
// In a real app, this would be dynamically generated from all ...AppData.js files
const ALL_APP_TOPICS = [
  // From Caches
  {
    id: 'cache-client-side',
    title: 'Client-Side Caching',
    category: 'Caching',
    description: 'Caching data directly in the client application (e.g., browser cache, mobile app cache).',
    path: '/caches/client-side' // Example path, actual routing needs to be defined
  },
  {
    id: 'cache-cdn',
    title: 'CDN (Content Delivery Network)',
    category: 'Caching',
    description: 'Geographically distributed network of proxy servers caching content closer to users.',
    path: '/caches/cdn'
  },
  {
    id: 'cache-write-through',
    title: 'Write-Through Cache',
    category: 'Caching Patterns',
    description: 'Data is written to cache and origin simultaneously.',
    path: '/caches/write-patterns/write-through'
  },
  // From Databases (example structure)
  {
    id: 'db-sql-vs-nosql',
    title: 'SQL vs NoSQL Databases',
    category: 'Databases',
    description: 'Understanding the differences, use cases, advantages, and disadvantages of SQL and NoSQL databases.',
    path: '/databases/sql-vs-nosql'
  },
  {
    id: 'db-cap-theorem',
    title: 'CAP Theorem',
    category: 'Databases',
    description: 'Exploring Consistency, Availability, and Partition Tolerance in distributed database systems.',
    path: '/databases/cap-theorem'
  },
  // From Messaging Queues (example structure)
  {
    id: 'mq-rabbitmq',
    title: 'RabbitMQ Overview',
    category: 'Messaging Queues',
    description: 'An overview of RabbitMQ, its architecture, and common use cases.',
    path: '/messaging-queues/rabbitmq'
  },
  {
    id: 'mq-kafka',
    title: 'Apache Kafka Fundamentals',
    category: 'Messaging Queues',
    description: 'Introduction to Apache Kafka for stream processing and message queuing.',
    path: '/messaging-queues/kafka'
  },
  // Generic example
  {
    id: 'intro-react',
    title: 'Introduction to React',
    category: 'Web Development',
    description: 'Learn the basics of React, including components, props, and state.',
    path: '/learn/react-basics'
  },
  {
    id: 'js-async',
    title: 'Asynchronous JavaScript',
    category: 'JavaScript',
    description: 'Understand promises, async/await, and how to handle asynchronous operations in JavaScript.',
    path: '/learn/js-async'
  }
];

const TopicsListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(ALL_APP_TOPICS);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = ALL_APP_TOPICS.filter(topic => {
      return topic.title.toLowerCase().includes(lowercasedFilter) ||
             topic.description.toLowerCase().includes(lowercasedFilter) ||
             topic.category.toLowerCase().includes(lowercasedFilter);
    });
    setFilteredTopics(filtered);
  }, [searchTerm]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">All Topics</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-2">
          Search and explore all available study topics.
        </p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title, description, or category..."
        />
      </div>

      {filteredTopics.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map(topic => (
            <Card key={topic.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="p-5 flex-grow">
                <h2 className="text-xl font-semibold text-primary dark:text-primary-light mb-2">{topic.title}</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Category: {topic.category}</p>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-3">{topic.description}</p>
              </div>
              <div className="p-5 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
                <Link to={topic.path}>
                  <Button variant="secondary" size="sm" className="w-full">View Topic</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-500 dark:text-neutral-400">No topics found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TopicsListPage;
