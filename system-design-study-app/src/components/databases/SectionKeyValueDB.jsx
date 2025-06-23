// src/components/databases/SectionKeyValueDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button'; // Import Button
import Icon from '../common/Icon';   // Import Icon

// AccordionItem (Assuming it might be slightly different or want to keep it co-located for now)
// If identical to SectionSqlDB's, this could be moved to a common component.
const AccordionItem = ({ title, children, idx, openIdx, setOpenIdx, lastItem }) => {
    const isOpen = idx === openIdx;
    return (
        <div className={`bg-neutral-50 dark:bg-neutral-700/50 ${lastItem ? 'rounded-b-lg' : ''} ${idx === 0 && !isOpen ? 'rounded-t-lg' : ''} ${isOpen && idx === 0 ? 'rounded-t-lg' : ''}`}>
            <Button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                variant="outline"
                className={`w-full flex justify-between items-center p-4 font-semibold transition-colors
                    ${isOpen ? 'bg-neutral-100 dark:bg-neutral-600/60' : 'hover:bg-neutral-100 dark:hover:bg-neutral-600/50'}
                    ${idx === 0 ? 'rounded-t-lg' : ''}
                    ${isOpen && !lastItem ? '' : (lastItem && isOpen ? 'rounded-b-lg' : '')}
                    ${!isOpen && !lastItem ? 'border-b border-neutral-200 dark:border-neutral-600/70' : ''}
                    ${lastItem && !isOpen ? 'rounded-b-lg' : ''}
                    border-transparent text-neutral-700 dark:text-neutral-200`}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <Icon name={isOpen ? "chevron-up" : "chevron-down"} className="h-5 w-5" />
            </Button>
            {isOpen && (
                <div className={`p-4 pt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700/30 ${lastItem ? 'rounded-b-lg' : 'border-b border-neutral-200 dark:border-neutral-600/70'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const SectionKeyValueDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Data Modeling in Key-Value Stores", content: "<p>Data modeling is often about designing the keys. Keys can be simple (e.g., userID) or composite (e.g., <code>user:123:profile</code>, <code>product:abc:info</code>). Consider key design for access patterns, range queries (if supported), and avoiding hotspots.</p><p>Strategies include:<ul><li><strong>Direct Mapping:</strong> Object ID to object data.</li><li><strong>Aggregates:</strong> Storing related data together under one key (e.g., user profile and recent orders).</li><li><strong>Secondary Indexes:</strong> Some K-V stores support secondary indexes, or you can build them manually by creating additional K-V pairs that map attribute values back to primary keys.</li></ul></p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss key design strategies and their impact on performance and queryability.</p>" },
    { title: "Consistency Models (Eventual vs. Strong)", content: "<p>Many Key-Value stores, especially distributed ones, offer <strong>eventual consistency (AP in CAP)</strong> for higher availability and partition tolerance. Writes propagate through the system, and reads might temporarily see stale data. Some offer tunable consistency or limited strong consistency for certain operations.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss the implications of eventual consistency on application design (e.g., handling stale data, client-side conflict resolution if applicable).</p>" },
    { title: "Use Cases for In-Memory Key-Value Stores (e.g., Redis, Memcached)", content: "<p>In-memory K-V stores are extremely fast.</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>Caching:</strong> Most common use. Cache database query results, session data, web page fragments.</li><li><strong>Session Management:</strong> Storing user session state for web applications.</li><li><strong>Real-time Analytics:</strong> Counting, leaderboards, rate limiting.</li><li><strong>Message Brokering (Redis Streams/PubSub):</strong> Lightweight message passing.</li></ul><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Differentiate when to use Redis vs. Memcached (Redis has more data structures, persistence options, built-in replication/clustering).</p>" },
    { title: "Durability Options", content: "<p><strong>In-Memory:</strong> Fastest, but data lost on restart unless persistence is configured (e.g., Redis RDB snapshots, AOF logs).</p><p><strong>Disk-Based:</strong> Data stored on disk for durability (e.g., RocksDB, LevelDB, or K-V stores built on these like FoundationDB). Slower than pure in-memory but durable by default.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss trade-offs between performance and durability, and how persistence mechanisms like AOF/RDB work.</p>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Key-Value Stores</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Simplicity and speed through direct key-based access, ideal for caching and session management.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Key-Value stores are the simplest type of NoSQL database. Data is stored as a collection of key-value pairs. The key is unique, and it's used to retrieve the associated value. Values can be simple data types (strings, numbers) or complex objects (JSON, XML, binary data), offering high flexibility.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          <li><strong>Simple Data Model:</strong> Consists only of keys and values. Highly flexible as the value can be opaque to the store.</li>
          <li><strong>High Performance:</strong> Optimized for simple GET, PUT, and DELETE operations based on keys. Typically O(1) time complexity for lookups.</li>
          <li><strong>Excellent Scalability:</strong> Easily scalable horizontally by sharding or partitioning the keyspace across multiple servers.</li>
          <li><strong>Schema-less (Schema-on-Read):</strong> The database does not enforce a schema on the values; interpretation is up to the application.</li>
          <li><strong>Availability (typically AP in CAP):</strong> Often designed for high availability and partition tolerance, sometimes prioritizing these over strong consistency.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          <li>Caching (e.g., Memcached, Redis) for database query results, web page fragments, etc.</li>
          <li>Session Management for web applications, storing user session state.</li>
          <li>User Profiles and Preferences.</li>
          <li>Real-time data lookups like ad targeting, product recommendations where the key is a user or product ID.</li>
          <li>Storing configuration data or feature flags.</li>
          <li>Leaderboards and real-time counters.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p>Redis, Memcached, Amazon DynamoDB (can function as a highly scalable key-value store), Riak KV, etcd, Consul.</p>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Key-Value</h2>
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
export default SectionKeyValueDB;
