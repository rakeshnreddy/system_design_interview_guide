// src/components/databases/SectionIntroDB.jsx
import React from 'react';
import Card from '../common/Card'; // Using global Card component

const SectionIntroDB = () => {
  return (
    // The Card component itself will be the main container for this section's content.
    // The id for scroll-spy is on the wrapper div in DatabasesPage.jsx
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      {/* Main section title using h1 as it's the primary heading for this loaded section */}
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
        The First Question: CAP Theorem
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none"> {/* Applied prose for better text styling */}
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
          Every serious database discussion for a distributed system starts with the CAP Theorem. It's not just theory; it's the fundamental trade-off that dictates your database's behavior during network partitions.
        </p>
      </div>

      {/* CAP Theorem Visual */}
      <div className="bg-neutral-100 dark:bg-neutral-800 p-4 sm:p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">Distributed System Design Choice:</h2>
          <div className="inline-block my-3 text-neutral-500 dark:text-neutral-400 transform scale-150">
            {/* Simplified line, SVG could be used for better graphics */}
            ↓
          </div>
          <p className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 bg-warning/20 dark:bg-warning/30 px-4 py-2 rounded-md inline-block border border-warning shadow">
            Must have Partition Tolerance (P)
          </p>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
            (Ability to continue operating despite network failures between nodes)
          </p>
          <div className="inline-block my-3 text-neutral-500 dark:text-neutral-400 transform scale-150">
            ↓
          </div>
          <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Then, you primarily choose between:</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
          {/* CP Choice Card */}
          <div className="p-5 rounded-lg bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-600 dark:border-blue-700 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Consistency (CP)</h4>
            <p className="text-base text-blue-600 dark:text-blue-400 leading-relaxed">
              Ensures all clients see the same data at the same time, even if it means some clients might have to wait or get an error if a partition occurs. Correctness over availability.
            </p>
            <div className="mt-4 pt-3 border-t border-blue-300 dark:border-blue-600">
              <p className="font-semibold text-sm text-blue-700 dark:text-blue-300">Often Favored By:</p>
              <p className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-1">SQL Databases, Graph Databases (with strong consistency needs)</p>
            </div>
          </div>

          {/* AP Choice Card */}
          <div className="p-5 rounded-lg bg-green-100 dark:bg-green-900/40 border-2 border-green-600 dark:border-green-700 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Availability (AP)</h4>
            <p className="text-base text-green-600 dark:text-green-400 leading-relaxed">
              Ensures the system always responds to requests, even if it means some clients might see slightly stale data during a partition. Uptime over perfect, immediate consistency.
            </p>
            <div className="mt-4 pt-3 border-t border-green-300 dark:border-green-600">
              <p className="font-semibold text-sm text-green-700 dark:text-green-300">Often Favored By:</p>
              <p className="font-mono text-sm text-green-600 dark:text-green-400 mt-1">Key-Value Stores, Document DBs, Wide-Column Stores</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6 text-center leading-relaxed">
          Note: This is a simplification. Many modern databases offer tunable consistency or hybrid approaches.
        </p>
      </div>

      <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Why This Matters for Interviews:</h2>
        <p className="leading-relaxed">
          Articulating your understanding of CAP and how it influences database selection for a given scenario (e.g., e-commerce cart vs. real-time bidding) is crucial.
          It demonstrates your ability to make reasoned trade-offs based on core system requirements and constraints.
        </p>
      </div>
    </Card>
  );
};
export default SectionIntroDB;
