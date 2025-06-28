export const topicsData = [
  {
    id: 'cache-client-side',
    title: '{{Client-Side Caching}}',
    category: 'Caching',
    description: '[Caching](#/caches) data directly in the client application (e.g., {{Browser Cache}} or {{Mobile Cache}}).',
    content: '{{Client-Side Caching}} reduces {{Latency}} by storing recently accessed data on the user\'s device. It is useful for static or infrequently changing resources but requires strategies for {{Cache Invalidation}} and data freshness.'
  },
  {
    id: 'cache-cdn',
    title: '{{CDN (Content Delivery Network)}}',
    category: 'Caching',
    description: 'Geographically distributed network of {{Proxy Servers}} [caching](#/caches) content closer to users.',
    content: '{{CDNs}} replicate content across {{Edge Locations}} worldwide, improving load times and reliability for {{Static Assets}} such as images or scripts.'
  },
  {
    id: 'cache-write-through',
    title: '{{Write-Through Cache}}',
    category: 'Caching Patterns',
    description: 'Data is written to [cache](#/caches) and origin simultaneously.',
    content: '{{Write-Through Cache|Write-through}} ensures the [cache](#/caches) is always up to date, simplifying reads at the cost of higher {{Write Latency}}.'
  },
  {
    id: 'db-sql-vs-nosql',
    title: '{{SQL (Structured Query Language)|SQL}} vs {{NoSQL (Not Only SQL)|NoSQL}} [Databases](#/databases)',
    category: 'Databases',
    description: 'Understanding the differences, use cases, advantages, and disadvantages of {{SQL (Structured Query Language)|SQL}} and {{NoSQL (Not Only SQL)|NoSQL}} [databases](#/databases).',
    content: '[Relational databases](#/databases?section=relational) provide {{ACID Properties}} guarantees and flexible querying with {{SQL (Structured Query Language)|SQL}}, whereas {{NoSQL (Not Only SQL)|NoSQL}} options trade some {{Consistency}} for {{Scalability}} and {{Schema Flexibility}}.'
  },
  {
    id: 'db-cap-theorem',
    title: '{{CAP Theorem}}',
    category: 'Databases',
    description: 'Exploring {{Consistency}}, {{Availability}}, and {{Partition Tolerance}} in distributed [databases](#/databases).',
    content: '{{CAP Theorem|CAP}} states that a distributed system can provide at most two of the three guarantees. Designers must choose between CP and AP based on application needs.'
  },
  {
    id: 'mq-rabbitmq',
    title: '{{RabbitMQ}} Overview',
    category: 'Messaging Queues',
    description: 'An overview of {{RabbitMQ}}, its architecture, and common use cases.',
    content: '{{RabbitMQ}} is a popular open source {{Message Broker}} implementing the {{AMQP}} protocol. It supports flexible routing, {{Message Acknowledgement|acknowledgments}}, and plugins for {{Reliability}}.'
  },
  {
    id: 'mq-kafka',
    title: '{{Apache Kafka}} Fundamentals',
    category: 'Messaging Queues',
    description: 'Introduction to {{Apache Kafka}} for stream processing and message queuing.',
    content: '{{Apache Kafka|Kafka}} is designed for high-{{Throughput}}, persistent event streaming. {{Topics}} are partitioned for {{Scalability}} and replicated for {{Fault Tolerance}}.'
  },
  {
    id: 'api-security',
    title: '{{API Security}} Basics',
    category: 'API Design',
    description: 'Key considerations for securing {{APIs}} including {{Authentication (AuthN)|authentication}} and {{Encryption|encryption}}.',
    content: 'Secure {{APIs}} with {{TLS/SSL (HTTPS)|TLS}}, token based {{Authentication (AuthN)|authentication}} ({{OAuth}}, {{JSON Web Tokens (JWT)|JWT}}), proper {{Authorization (AuthZ)|authorization}} checks, and {{Input Validation}} to prevent common vulnerabilities.'
  },
  {
    id: 'round-robin', // Changed from lb-round-robin to match element ID in AlgorithmsView.jsx
    title: '{{Load Balancing Algorithms}}', // Title can remain broad
    category: 'Load Balancing',
    description: 'Strategies like {{Round Robin}} and {{Least Connections}} to distribute traffic.',
    content: '[Load balancers](#/load-balancing) spread requests across servers using algorithms. {{Round Robin}} is simple, while {{Least Connections}} sends traffic to the least busy server.'
  },
  {
    id: 'scaling-horizontal',
    title: '{{Horizontal Scaling}} vs {{Vertical Scaling}}',
    category: 'Scalability Concepts',
    description: 'Understanding when to add more servers versus more powerful servers.',
    content: '{{Horizontal Scaling}} adds more nodes to handle load, improving {{Availability}}. {{Vertical Scaling}} increases resources on a single node but has hardware limits.'
  }
];
