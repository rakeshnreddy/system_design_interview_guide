// src/components/databases/SectionPolyglotDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
// import Button from '../common/Button'; // Button was unused

const AccordionItem = ({ title, children, idx, openIdx, setOpenIdx, lastItem }) => {
    const isOpen = idx === openIdx;
    return (
        <div className={`bg-neutral-50 dark:bg-neutral-700/50 ${lastItem ? 'rounded-b-lg' : ''} ${idx === 0 && !isOpen ? 'rounded-t-lg' : ''} ${isOpen && idx === 0 ? 'rounded-t-lg' : ''}`}>
            <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex justify-between items-center p-4 font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600/50 transition-colors
                    ${isOpen ? 'bg-neutral-100 dark:bg-neutral-600/60' : ''}
                    ${idx === 0 ? 'rounded-t-lg' : ''}
                    ${isOpen && !lastItem ? '' : (lastItem && isOpen ? 'rounded-b-lg' : '')}
                    ${!isOpen && !lastItem ? 'border-b border-neutral-200 dark:border-neutral-600/70' : ''}
                    ${lastItem && !isOpen ? 'rounded-b-lg' : ''}
                `}
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className={`p-4 pt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700/30 ${lastItem ? 'rounded-b-lg' : 'border-b border-neutral-200 dark:border-neutral-600/70'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const SectionPolyglotDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Benefits of Polyglot Persistence", content: "<ul class='list-disc list-inside ml-4 my-2'><li><strong>Optimized for Task:</strong> Each part of the application uses a database best suited for its specific needs (e.g., SQL for transactions, DocumentDB for catalog, GraphDB for recommendations).</li><li><strong>Improved Performance & Scalability:</strong> Specialized databases handle their specific data types and access patterns more efficiently.</li><li><strong>Flexibility & Agility:</strong> Easier to adopt new technologies or change data models for specific services without impacting the entire system.</li></ul>" },
    { title: "Challenges of Polyglot Persistence", content: "<ul class='list-disc list-inside ml-4 my-2'><li><strong>Increased Complexity:</strong> Managing multiple database technologies (deployment, monitoring, expertise).</li><li><strong>Data Consistency:</strong> Ensuring data consistency across different databases can be very challenging (e.g., using event-driven architectures, eventual consistency, sagas).</li><li><strong>Transactional Integrity:</strong> Distributed transactions across different database types are complex or sometimes not possible.</li><li><strong>Operational Overhead:</strong> More systems to learn, maintain, and secure.</li><li><strong>Skill Set:</strong> Requires a team with diverse database expertise.</li></ul>" },
    { title: "Data Synchronization Strategies", content: "<p>How do you keep data in sync or move it between these different databases?</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>Event-Driven Architecture (EDA):</strong> Services publish events when data changes. Other services subscribe to these events to update their own datastores (e.g., using Kafka or RabbitMQ). This promotes loose coupling and eventual consistency.</li><li><strong>Batch ETL/ELT Processes:</strong> Periodically extract, transform, and load data between databases. Suitable for less time-sensitive data.</li><li><strong>Change Data Capture (CDC):</strong> Capturing row-level changes in a source database and streaming them to target systems.</li><li><strong>Application-Level Synchronization:</strong> Application code is responsible for writing to multiple databases or ensuring consistency. Can be complex and error-prone.</li></ul><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss the trade-offs of these approaches, especially focusing on consistency guarantees and operational complexity.</p>" },
    { title: "Example Scenario: E-commerce Platform", content: "<p>An e-commerce platform might use:</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>SQL Database:</strong> For orders, payments, user accounts (transactional, consistent data).</li><li><strong>Document Database:</strong> For product catalog (flexible attributes, nested data).</li><li><strong>Search Index:</strong> For product search functionality.</li><li><strong>Key-Value Store (Redis):</strong> For user sessions, shopping carts, caching.</li><li><strong>Graph Database:</strong> For product recommendations ('users who bought this also bought...').</li><li><strong>Wide-Column Store/Data Lake:</strong> For analytics on user behavior and sales data.</li></ul><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Be prepared to justify why you'd choose a specific database for a particular part of a larger system like e-commerce.</p>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Putting It All Together: Polyglot Persistence</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Using multiple database technologies strategically to solve different problems within a single system.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Polyglot persistence is the concept of using multiple database technologies within a single application or system, choosing the right database for the right job. Modern complex applications often have diverse data storage and querying needs that a single database cannot optimally satisfy. Instead of a one-size-fits-all approach, you leverage the strengths of various databases.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Why Polyglot Persistence?</h2>
        <p>
          No single database is perfect for all use cases. Relational databases excel at transactional integrity and complex joins; document databases offer schema flexibility; graph databases are unmatched for relationship-heavy data; key-value stores provide extreme speed for simple lookups; and search engines are built for text search. By combining these, you can build more robust, scalable, and performant systems, tailoring each component to its specific data needs.
        </p>

        <div className="my-6 p-4 sm:p-6 bg-primary-light/10 dark:bg-primary-dark/20 border-l-4 border-primary dark:border-primary-light rounded-r-md shadow">
            <p className="font-semibold text-primary dark:text-primary-light text-xl">
                "The core principle is to select the database that best fits the needs of each specific service or component within your application, rather than trying to force all data into a single, monolithic solution."
            </p>
        </div>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Considerations When Implementing:</h2>
        <ul>
          <li><strong>Data Partitioning Strategy:</strong> How is data divided among different services and their respective databases? Clear boundaries are essential.</li>
          <li><strong>Data Access Patterns:</strong> How will each service query its data? How will data be aggregated or joined across services/databases if needed?</li>
          <li><strong>Consistency Requirements:</strong> What level of consistency is needed between different data stores? Eventual consistency is a common pattern in polyglot systems.</li>
          <li><strong>Operational Complexity:</strong> Managing multiple database systems adds overhead for deployment, monitoring, backups, and security.</li>
          <li><strong>Team Skills:</strong> Ensure your team has, or can acquire, expertise in the chosen database technologies.</li>
          <li><strong>Data Synchronization:</strong> How will data be kept consistent or moved between different stores if necessary? (See E5 Deep Dive).</li>
        </ul>

        <p>
            For example, a sophisticated e-commerce application might use a relational database for core order and payment processing, a document database for its flexible product catalog, a graph database for generating product recommendations, and a search index for powering product search.
        </p>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Polyglot Systems</h2>
      </div>

      <div className="mt-2 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md">
        {deepDiveData.map((item, idx) => (
          <AccordionItem
            key={idx}
            idx={idx}
            title={item.title}
            openIdx={openAccordion}
            setOpenIdx={setOpenAccordion}
            lastItem={idx === deepDiveData.length - 1}
          >
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </AccordionItem>
        ))}
      </div>
    </Card>
  );
};
export default SectionPolyglotDB;
