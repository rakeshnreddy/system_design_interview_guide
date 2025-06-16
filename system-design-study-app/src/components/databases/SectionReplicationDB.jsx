// src/components/databases/SectionReplicationDB.jsx
import React from 'react';
import Card from '../../common/Card';

const SectionReplicationDB = () => {
  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
        Data Replication Strategies
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Data replication involves copying data from a source database to one or more destination databases. It's crucial for high availability, disaster recovery, read scalability, and geographically distributing data closer to users.
        </p>

        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">Primary-Secondary Replication (Leader-Follower)</h2>
          <p>
            Writes go to a single primary (leader/master) node. The primary then replicates changes to one or more secondary (follower/replica/slave) nodes. Reads can often be served by secondaries to reduce load on the primary.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Synchronous Replication:</strong> Primary waits for acknowledgment from at least one secondary before confirming the write. Ensures higher consistency but increases write latency.</li>
            <li><strong>Asynchronous Replication:</strong> Primary confirms write immediately and replicates to secondaries in the background. Lower write latency but potential for data loss on primary failure if changes haven't replicated.</li>
          </ul>
          <p className="mt-2"><strong>Pros:</strong> Simpler to manage consistency, good for read scaling.</p>
          <p><strong>Cons:</strong> Primary is a single point of failure for writes (failover needed), potential replication lag with async.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">Multi-Primary Replication (Multi-Leader)</h2>
          <p>
            Multiple nodes can accept writes. Changes are then replicated to other primary nodes and any secondary nodes.
          </p>
          <p className="mt-2"><strong>Pros:</strong> Improved write availability (writes can occur even if some primaries fail), lower write latency for geographically distributed applications (write to local primary).</p>
          <p><strong>Cons:</strong> Significantly more complex to manage, especially conflict resolution when the same data is modified concurrently on different primaries. Requires careful design to avoid data divergence.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">Quorum-Based Replication</h2>
          <p>
            Writes must be acknowledged by a majority (a quorum) of replicas before being considered successful (e.g., W > N/2). Reads must query a quorum of replicas (R > N/2). If W + R > N, it ensures strong consistency (at least one node read from has the latest write).
          </p>
          <p className="mt-2"><strong>Pros:</strong> Balances consistency, availability, and partition tolerance (often used in systems like Cassandra or Dynamo-style databases).</p>
          <p><strong>Cons:</strong> Can have higher latency for reads and writes due to coordination. Requires careful tuning of W, R, and N values.</p>
        </div>
        {/* TODO: Add diagrams for primary-secondary vs. multi-primary replication */}
      </div>
    </Card>
  );
};
export default SectionReplicationDB;
