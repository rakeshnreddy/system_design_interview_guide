import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../components/common/SearchInput';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { topicsData } from '../data/topicsData';

const TOP_TOPICS = topicsData.slice(0, 10);

const TopicsListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(TOP_TOPICS);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = topicsData.filter(topic => {
      return topic.title.toLowerCase().includes(lowercasedFilter) ||
             topic.description.toLowerCase().includes(lowercasedFilter) ||
             topic.category.toLowerCase().includes(lowercasedFilter);
    });
    setFilteredTopics(filtered.slice(0, 10));
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
                <Link to={`/topic/${topic.id}`}>
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
