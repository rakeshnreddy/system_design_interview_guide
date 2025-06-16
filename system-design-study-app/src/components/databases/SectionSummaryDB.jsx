// src/components/databases/SectionSummaryDB.jsx
import React from 'react';
import Card from '../common/Card';

const summaryData = [
  { type: "Relational (SQL)", model: "Tables with rows & columns, predefined schema", consistency: "Strong (ACID)", scalability: "Vertical, Read Replicas, Sharding (complex)", useCases: "Transactions, complex queries, data integrity crucial (finance, ERP)" },
  { type: "Key-Value Store", model: "Key-Value pairs", consistency: "Often Eventual (AP), some offer Strong options", scalability: "Horizontal (very high)", useCases: "Caching, session store, leaderboards, real-time lookups" },
  { type: "Wide-Column Store", model: "Column families, rows with dynamic columns, timestamped versions", consistency: "Tunable (Eventual to Strong per operation)", scalability: "Horizontal (massive)", useCases: "Time-series, analytics, IoT, high-write scenarios" },
  { type: "Document Database", model: "JSON/BSON-like documents, flexible schema", consistency: "Often Eventual (AP), some offer Stronger options", scalability: "Horizontal (sharding)", useCases: "Content management, product catalogs, user profiles, semi-structured data" },
  { type: "Search Index", model: "Inverted index, documents with text fields", consistency: "Eventual (near real-time indexing)", scalability: "Horizontal (sharding)", useCases: "Full-text search, log analytics, faceted search, recommendations" },
  { type: "Graph Database", model: "Nodes, Edges, Properties", consistency: "Often Strong (ACID for graph operations)", scalability: "Varies, can be complex for distributed graphs", useCases: "Social networks, fraud detection, knowledge graphs, recommendation engines" },
];

const SectionSummaryDB = () => {
  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
        Database Comparison Summary
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
        <p className="leading-relaxed">
          A quick overview of the different database types discussed, highlighting their core characteristics and common applications. Remember that these are generalizations, and specific implementations can vary.
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-100 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Database Type</th>
              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Primary Model</th>
              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Consistency (Typical)</th>
              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Scalability (Horizontal)</th>
              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Common Use Cases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
            {summaryData.map((db) => (
              <tr key={db.type} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-4 py-4 whitespace-normal text-sm font-medium text-neutral-900 dark:text-neutral-100">{db.type}</td>
                <td className="px-4 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">{db.model}</td>
                <td className="px-4 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">{db.consistency}</td>
                <td className="px-4 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">{db.scalability}</td>
                <td className="px-4 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">{db.useCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default SectionSummaryDB;
