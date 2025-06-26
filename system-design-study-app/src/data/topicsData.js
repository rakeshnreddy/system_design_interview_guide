export const topicsData = [
  {
    id: 'cache-client-side',
    title: 'Client-Side Caching',
    category: 'Caching',
    description: 'Caching data directly in the client application (e.g., browser or mobile cache).',
    content: 'Client-side caching reduces latency by storing recently accessed data on the user\'s device. It is useful for static or infrequently changing resources but requires strategies for invalidation and data freshness.'
  },
  {
    id: 'cache-cdn',
    title: 'CDN (Content Delivery Network)',
    category: 'Caching',
    description: 'Geographically distributed network of proxy servers caching content closer to users.',
    content: 'CDNs replicate content across edge locations worldwide, improving load times and reliability for static assets such as images or scripts.'
  },
  {
    id: 'cache-write-through',
    title: 'Write-Through Cache',
    category: 'Caching Patterns',
    description: 'Data is written to cache and origin simultaneously.',
    content: 'Write-through ensures the cache is always up to date, simplifying reads at the cost of higher write latency.'
  },
  {
    id: 'db-sql-vs-nosql',
    title: 'SQL vs NoSQL Databases',
    category: 'Databases',
    description: 'Understanding the differences, use cases, advantages, and disadvantages of SQL and NoSQL databases.',
    content: 'Relational databases provide ACID guarantees and flexible querying with SQL, whereas NoSQL options trade some consistency for scalability and schema flexibility.'
  },
  {
    id: 'db-cap-theorem',
    title: 'CAP Theorem',
    category: 'Databases',
    description: 'Exploring Consistency, Availability, and Partition Tolerance in distributed databases.',
    content: 'CAP states that a distributed system can provide at most two of the three guarantees. Designers must choose between CP and AP based on application needs.'
  },
  {
    id: 'mq-rabbitmq',
    title: 'RabbitMQ Overview',
    category: 'Messaging Queues',
    description: 'An overview of RabbitMQ, its architecture, and common use cases.',
    content: 'RabbitMQ is a popular open source message broker implementing the AMQP protocol. It supports flexible routing, acknowledgments, and plugins for reliability.'
  },
  {
    id: 'mq-kafka',
    title: 'Apache Kafka Fundamentals',
    category: 'Messaging Queues',
    description: 'Introduction to Apache Kafka for stream processing and message queuing.',
    content: 'Kafka is designed for high-throughput, persistent event streaming. Topics are partitioned for scalability and replicated for fault tolerance.'
  },
  {
    id: 'api-security',
    title: 'API Security Basics',
    category: 'API Design',
    description: 'Key considerations for securing APIs including authentication and encryption.',
    content: 'Secure APIs with TLS, token based authentication (OAuth, JWT), proper authorization checks, and input validation to prevent common vulnerabilities.'
  },
  {
    id: 'lb-round-robin',
    title: 'Load Balancing Algorithms',
    category: 'Load Balancing',
    description: 'Strategies like round-robin and least-connections to distribute traffic.',
    content: 'Load balancers spread requests across servers using algorithms. Round-robin is simple, while least-connections sends traffic to the least busy server.'
  },
  {
    id: 'scaling-horizontal',
    title: 'Horizontal vs Vertical Scaling',
    category: 'Scalability Concepts',
    description: 'Understanding when to add more servers versus more powerful servers.',
    content: 'Horizontal scaling adds more nodes to handle load, improving availability. Vertical scaling increases resources on a single node but has hardware limits.'
  }
];
