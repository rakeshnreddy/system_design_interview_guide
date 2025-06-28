export const databasesAppData = {
  title: "Databases",
  metrics: [
    {
      id: "iops",
      title: "{{IOPS (Input/Output Operations Per Second)}}",
      description: "Measures the number of read and write operations a storage device or system can perform per second. Critical for transaction-heavy workloads.",
      formula: "Total I/O Operations / Total Seconds",
      importance: "High for {{OLTP}} systems, less so for analytical workloads."
    },
    {
      id: "latency",
      title: "{{Latency}}",
      description: "The time taken for a single I/O operation to complete. Usually measured in milliseconds (ms). Lower latency is generally better.",
      importance: "Critical for user-facing applications and real-time systems."
    },
    {
      id: "throughput",
      title: "{{Throughput}}",
      description: "The rate at which data can be read from or written to a storage device or system. Usually measured in MB/s or GB/s.",
      formula: "Total Data Transferred / Total Seconds",
      importance: "Important for large data transfers, streaming, and analytical queries."
    },
    {
      id: "consistency",
      title: "{{Consistency}}",
      description: "Ensures that all clients see the same data at the same time, regardless of which node they connect to. Different levels include {{Strong Consistency}}, {{Eventual Consistency}}, and {{Causal Consistency}}.",
      importance: "Varies by application; critical for financial systems, flexible for social media feeds."
    },
    {
      id: "availability",
      title: "{{Availability}}",
      description: "The percentage of time a database system is operational and accessible. Often expressed in 'nines' (e.g., 99.999% availability).",
      importance: "Crucial for mission-critical applications where downtime is unacceptable."
    },
    {
      id: "durability",
      title: "{{Durability}}",
      description: "Guarantees that once a transaction is committed, the data will persist even in the event of power failures, crashes, or errors.",
      importance: "Essential for any application that cannot afford data loss."
    },
    {
      id: "scalability",
      title: "{{Scalability}}",
      description: "The ability of a database to handle increasing amounts of data and concurrent users. Can be {{Vertical Scaling|vertical (scaling up)}} or {{Horizontal Scaling|horizontal (scaling out)}}.",
      importance: "Key for growing applications and handling variable workloads."
    }
  ],
  terminology: [
    {
      id: "acid",
      title: "{{ACID Properties}}",
      description: "A set of properties ({{Atomicity}}, {{Consistency}}, {{Isolation}}, {{Durability}}) that guarantee reliable processing of database transactions.",
      details: "{{Atomicity}}: Transactions are all-or-nothing. {{Consistency}}: Transactions bring the database from one valid state to another. {{Isolation}}: Concurrent transactions are executed as if they were serial. {{Durability}}: Committed transactions survive failures."
    },
    {
      id: "base",
      title: "{{BASE Properties}}",
      description: "An alternative to {{ACID Properties|ACID}} for {{NoSQL}} databases, emphasizing availability over strict consistency ({{Basically Available}}, {{Soft state}}, {{Eventual consistency}}).",
      details: "{{Basically Available}}: The system guarantees availability. {{Soft state}}: The state of the system may change over time, even without input. {{Eventual consistency}}: The system will eventually become consistent over time, given no new updates."
    },
    {
      id: "cap_theorem",
      title: "{{CAP Theorem (Brewer's Theorem)}}",
      description: "States that a distributed data store cannot simultaneously provide more than two out of three guarantees: {{Consistency}}, {{Availability}}, and {{Partition Tolerance}}.",
      details: "{{Partition Tolerance}}: The system continues to operate despite network partitions. Systems usually choose between CP ({{Consistency}}/{{Partition Tolerance}}) and AP ({{Availability}}/{{Partition Tolerance}})."
    },
    {
      id: "sharding",
      title: "{{Sharding (Horizontal Partitioning)}}",
      description: "The process of breaking up a large database into smaller, more manageable pieces called shards. Data is distributed across shards based on a shard key.",
      benefits: "Improved {{Scalability}}, performance, and {{Availability}}."
    },
    {
      id: "replication",
      title: "{{Replication}}",
      description: "The process of creating and maintaining multiple copies of data on different database servers. Used for {{High Availability}}, {{Fault Tolerance}}, and read {{Scalability|scaling}}.",
      types: "{{Master-Slave Replication|Master-slave}}, {{Master-Master Replication|master-master}}, {{Peer-to-Peer Replication|peer-to-peer}}."
    },
    {
      id: "orm",
      title: "{{ORM (Object-Relational Mapping)}}",
      description: "A programming technique for converting data between incompatible type systems using object-oriented programming languages. Simplifies interaction with relational databases.",
      examples: "{{SQLAlchemy}} (Python), {{Hibernate}} (Java), {{Entity Framework}} (.NET)."
    },
    {
      id: "sql",
      title: "{{SQL (Structured Query Language)}}",
      description: "A domain-specific language used in programming and designed for managing data held in a relational database management system ({{RDBMS}}).",
    },
    {
      id: "nosql",
      title: "{{NoSQL (Not Only SQL)}}",
      description: "A broad category of database management systems that differ from traditional {{RDBMS}} in various ways, often providing more flexibility in schema design and {{Horizontal Scaling|horizontal scalability}}.",
      types: "{{Document Stores}}, {{Key-Value Stores}}, {{Column-Family Stores}}, {{Graph Databases}}."
    },
    {
      id: "index",
      title: "{{Database Index}}",
      description: "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure.",
    },
    {
      id: "transaction",
      title: "{{Database Transaction}}",
      description: "A sequence of one or more database operations (reads, writes, updates) that are executed as a single, atomic unit of work.",
    },
    {
      id: "newsql",
      title: "NewSQL",
      description: "A class of modern relational databases that aim to provide the {{Scalability}} of {{NoSQL}} systems while maintaining {{ACID Properties|ACID}} guarantees of {{SQL (Structured Query Language)|SQL}} systems. Examples include {{Google Spanner}}, {{CockroachDB}}."
    }
  ],
  databasepedia: [
    {
      id: "postgresql",
      title: "PostgreSQL",
      type: "{{SQL (Relational)}}",
      architecture: "Object-relational database system. Uses a single process per connection model (can be a limitation). {{MVCC (Multi-Version Concurrency Control)}} for handling concurrent transactions.",
      pros: [
        "Highly extensible (custom functions, data types, operators) and standards-compliant ({{SQL (Structured Query Language)|SQL}}).",
        "Strong {{ACID Properties|ACID compliance}} ensures data integrity and reliability for transactions.",
        "Rich feature set: {{JSONB}} support for document-like storage, {{Full-Text Search}}, {{GIS}} capabilities ({{PostGIS}}), window functions, {{CTEs (Common Table Expressions)}}.",
        "Large, active, and independent community providing excellent support and frequent updates.",
        "Supports complex queries, joins, and analytical functions effectively."
      ],
      cons: [
        "Can be more complex to manage and tune than {{MySQL}} for very simple use cases or by less experienced DBAs.",
        "Read {{Scalability|scalability}} can be challenging without proper architecture (e.g., {{Read Replicas}}, connection pooling). Less 'out-of-the-box' horizontally scalable for writes compared to some {{NoSQL (Not Only SQL)|NoSQL}} options.",
        "Default connection handling (one process per connection) can be resource-intensive at very high concurrency; requires tools like {{PgBouncer}}."
      ],
      whenToUse: [
        "Applications requiring strong data integrity, complex queries, and {{ACID Properties|ACID compliance}} (e.g., financial systems, ERPs).",
        "Geospatial data applications (using {{PostGIS}} extension).",
        "Data warehousing and analytical applications where complex {{SQL (Structured Query Language)|SQL}} is needed.",
        "Systems needing custom data types, functions, or procedural languages within the database.",
        "When you need a versatile database that can handle relational and some document-based workloads ({{JSONB}})."
      ],
      whenNotToUse: [
        "Simple read-heavy applications with basic {{CRUD}} operations where {{MySQL}}'s ease of use might be preferred if team is more familiar.",
        "Extreme write-intensive, horizontally scalable systems where a {{NoSQL (Not Only SQL)|NoSQL}} solution like {{Apache Cassandra|Cassandra}} might be a better fit from the start.",
        "Applications that require extreme low-latency key-value access where {{Redis}} or {{Amazon DynamoDB|DynamoDB}} might excel (though PostgreSQL can be very fast too)."
      ],
      interviewTalkingPoints: [
        "Mention its strong {{ACID Properties|ACID compliance}} and how it benefits transactional integrity.",
        "Highlight its extensibility ({{PostGIS}}, custom types, functions) for specific use cases.",
        "Discuss its {{MVCC (Multi-Version Concurrency Control)|MVCC}} model for concurrent access.",
        "Acknowledge potential challenges like connection scaling (and solutions like {{PgBouncer}}) and write {{Horizontal Scaling|horizontal scalability}} compared to {{NoSQL (Not Only SQL)|NoSQL}}.",
        "Point out its rich {{SQL (Structured Query Language)|SQL}} dialect and support for complex queries."
      ],
      defendingYourDecision: "{{PostgreSQL}} was chosen due to its robust {{ACID Properties|ACID compliance}} and data integrity features, which are critical for our [specific application domain, e.g., financial records]. Its support for complex {{SQL (Structured Query Language)|SQL}} queries and extensibility [e.g., {{PostGIS}} for geospatial data] allows us to handle diverse data needs efficiently. While simpler options exist, {{PostgreSQL}}'s reliability and feature set provide a solid foundation for future growth and complexity.",
      useCases: [
        "Complex web applications requiring data integrity.",
        "Geospatial data applications ({{PostGIS}}).",
        "Analytical applications and data warehousing.",
        "Applications needing custom data types or functions."
      ],
      dataModel: "Relational (tables with rows and columns, predefined schema)."
    },
    {
      id: "mysql",
      title: "MySQL",
      type: "{{SQL (Relational)}}",
      architecture: "Client-server model. Pluggable storage engine architecture ({{InnoDB}} for {{ACID Properties|ACID}}, {{MyISAM}} for read-speed historically). {{InnoDB}} is the common default.",
      pros: [
        "Widely adopted, well-documented, and large talent pool available.",
        "Relatively easy to set up, manage, and use, especially for simpler applications.",
        "Good performance for read-heavy workloads, common in many web applications.",
        "Mature ecosystem with many third-party tools, drivers, and {{ORM (Object-Relational Mapping)|ORM}} integrations.",
        "Supports {{Replication}} for read {{Scalability|scalability}} and {{High Availability}}."
      ],
      cons: [
        "Can be less feature-rich than {{PostgreSQL}} in areas like advanced {{SQL (Structured Query Language)|SQL}} functions, complex data types, or {{NoSQL (Not Only SQL)|NoSQL}}-like features (though improving).",
        "Historically, some storage engines (like {{MyISAM}}) lacked full {{ACID Properties|ACID compliance}} or features like foreign keys, leading to potential data integrity issues if not chosen carefully ({{InnoDB}} largely mitigates this).",
        "Write {{Scalability|scalability}} can be a bottleneck without implementing {{Sharding (Horizontal Partitioning)|sharding}} or other advanced architectures. Default {{Replication}} is single-master."
      ],
      whenToUse: [
        "Standard web applications (e.g., {{LAMP Stack|LAMP}}/{{LEMP Stack|LEMP}} stack components like {{WordPress}}, {{Drupal}}, {{Joomla}}).",
        "E-commerce platforms where transactional integrity (with {{InnoDB}}) and read performance are important.",
        "Read-intensive applications where ease of setup and a large support community are beneficial.",
        "When the team has strong existing {{MySQL}} expertise."
      ],
      whenNotToUse: [
        "Applications requiring complex {{SQL (Structured Query Language)|SQL}} queries, window functions, or advanced data types out-of-the-box ({{PostgreSQL}} might be better).",
        "Systems needing built-in support for features like {{GIS}} or advanced {{Full-Text Search}} where {{PostgreSQL}} + extensions shine.",
        "Workloads that require massive {{Horizontal Scaling|horizontal write scalability}} where a {{NoSQL (Not Only SQL)|NoSQL}} solution might be more appropriate from the start."
      ],
      interviewTalkingPoints: [
        "Emphasize its popularity, ease of use, and strong community support, making it a practical choice for many web applications.",
        "Mention {{InnoDB}} as the default storage engine for {{ACID Properties|ACID compliance}}.",
        "Discuss its read {{Scalability|scalability}} through {{Replication}}.",
        "Acknowledge its historical limitations compared to {{PostgreSQL}} but also its continuous improvements."
      ],
      defendingYourDecision: "{{MySQL}} (with {{InnoDB}}) was selected for its balance of ease of use, strong performance in read-heavy scenarios typical for [application type, e.g., content delivery], and its mature ecosystem. The team's familiarity and the wide availability of resources ensure rapid development and operational stability. For our current scale and transactional needs, it provides a reliable and cost-effective solution.",
      useCases: [
        "Web applications ({{LAMP Stack|LAMP}}/{{LEMP Stack|LEMP}} stack).",
        "E-commerce platforms.",
        "Content Management Systems (CMS) like {{WordPress}}, {{Drupal}}.",
        "Read-intensive applications."
      ],
      dataModel: "Relational (tables with rows and columns, predefined schema)."
    },
    {
      id: "mongodb",
      title: "MongoDB",
      type: "{{NoSQL (Document Store)}}",
      architecture: "Distributed document database. Stores data in {{BSON}} (Binary JSON-like) format. Supports {{Sharding (Horizontal Partitioning)|sharding}} and {{Replication}} (replica sets) natively for {{Scalability}} and {{Availability}}.",
      pros: [
        "Flexible schema ({{Schema-on-Read}}) allows for rapid iteration and handling of evolving or unstructured/semi-structured data.",
        "Good {{Horizontal Scaling|horizontal scalability}} and {{High Availability}} through automatic {{Sharding (Horizontal Partitioning)|sharding}} and replica sets.",
        "Developer-friendly query language (similar to {{JSON}}) and drivers for many programming languages.",
        "Rich document model can represent complex hierarchical relationships in a single document, reducing need for joins."
      ],
      cons: [
        "Multi-document {{ACID Properties|ACID transactions}} are supported only in recent versions and can add complexity or performance overhead compared to traditional {{RDBMS}} for such use cases.",
        "Joins (via `$lookup`) can be less performant and more complex than in {{SQL (Structured Query Language)|SQL}} databases; data modeling often emphasizes {{Denormalization}}.",
        "{{Eventual Consistency}} is the default for reads from secondary replicas, though tunable. Stronger {{Consistency}} can impact {{Latency}} or {{Throughput}}.",
        "Can consume more storage due to {{Denormalization}} and {{BSON}} overhead (field names stored in each document)."
      ],
      whenToUse: [
        "Applications with rapidly evolving schemas or dealing with unstructured/semi-structured data (e.g., IoT data, user-generated content).",
        "Content management systems, product catalogs where flexibility is key.",
        "Real-time analytics and logging where high write {{Throughput}} and {{Horizontal Scaling|horizontal scalability}} are needed.",
        "Mobile applications with diverse data types."
      ],
      whenNotToUse: [
        "Applications requiring complex multi-record {{ACID Properties|ACID transactions}} across different documents/collections as a core feature (relational DBs are often better).",
        "Systems with highly relational data requiring frequent, complex joins across many different entities.",
        "When a very rigid schema and strong data integrity enforced by the database are paramount for all data.",
        "If the team lacks experience in {{NoSQL (Not Only SQL)|NoSQL}} data modeling, as improper modeling can negate benefits."
      ],
      interviewTalkingPoints: [
        "Highlight its flexible schema and suitability for unstructured or rapidly changing data.",
        "Discuss its native support for {{Horizontal Scaling|horizontal scaling (sharding)}} and replica sets for {{Availability}}.",
        "Mention the {{BSON}} document model and its developer-friendly query language.",
        "Acknowledge trade-offs like {{Eventual Consistency}} (by default from secondaries) and complexities with multi-document transactions."
      ],
      defendingYourDecision: "{{MongoDB}} was chosen for its flexible schema, which is ideal for our [application domain, e.g., product catalog] where data structures evolve rapidly. Its native {{Horizontal Scaling|horizontal scalability}} via {{Sharding (Horizontal Partitioning)|sharding}} allows us to handle increasing data volumes and user load. The document model simplifies development for our object-oriented application structure.",
      useCases: [
        "Content management systems.",
        "Real-time analytics and logging.",
        "Mobile applications.",
        "Applications with rapidly evolving data structures."
      ],
      dataModel: "Document-oriented (collections of JSON-like documents)."
    },
    {
      id: "cassandra",
      title: "Apache Cassandra",
      type: "{{NoSQL (Wide-Column Store)}}",
      architecture: "Decentralized (masterless), distributed database designed for {{High Availability}} and linear {{Scalability}}. Data is partitioned across nodes in a ring using {{Consistent Hashing}}. Tunable {{Consistency}} per query.",
      pros: [
        "Excellent {{Horizontal Scaling|horizontal scalability}} and {{Fault Tolerance}}; scales linearly by adding nodes.",
        "High write {{Throughput}}, optimized for write-intensive workloads.",
        "No {{Single Point of Failure (SPOF)|single point of failure}} due to its masterless architecture.",
        "Good for geographically distributed applications with multi-datacenter {{Replication}} capabilities.",
        "Tunable {{Consistency}} allows balancing between {{Consistency}}, {{Availability}}, and {{Latency}}."
      ],
      cons: [
        "{{Eventual Consistency}} is a common operational model; achieving {{Strong Consistency}} can impact performance.",
        "Limited support for ad-hoc queries, aggregations, and joins. Data modeling must be query-driven ({{Denormalization}} is common).",
        "No native support for transactions across multiple tables or rows (though lightweight transactions exist for single partition operations).",
        "Steeper learning curve for data modeling and operational management compared to relational databases."
      ],
      whenToUse: [
        "Write-intensive applications (e.g., IoT data ingestion, logging, tracking user activity, metrics).",
        "Applications requiring very {{High Availability}} and linear {{Scalability}} across multiple data centers or geographic regions.",
        "Time-series data storage and analysis.",
        "Systems where {{Eventual Consistency}} is acceptable and high {{Throughput}}/{{Availability}} are paramount."
      ],
      whenNotToUse: [
        "Applications needing strong {{ACID Properties|ACID transactions}} for all operations.",
        "Systems requiring frequent ad-hoc queries, complex joins, or aggregations across the entire dataset.",
        "When low-latency reads of {{Strongly Consistent|strongly consistent}} data are always required.",
        "If the team is not prepared for query-first data modeling."
      ],
      interviewTalkingPoints: [
        "Emphasize its masterless architecture, ensuring no {{Single Point of Failure (SPOF)|single point of failure}} and {{High Availability}}.",
        "Highlight its linear {{Scalability}} for write-heavy workloads.",
        "Discuss its tunable {{Consistency}} and how it relates to {{CAP Theorem (Brewer's Theorem)|CAP theorem}} choices.",
        "Mention the importance of query-driven data modeling ({{Denormalization}})."
      ],
      defendingYourDecision: "{{Apache Cassandra|Cassandra}} was selected for its exceptional write {{Throughput}} and linear {{Scalability}}, critical for our [application, e.g., real-time sensor data logging]. Its masterless architecture provides the {{High Availability}} and {{Fault Tolerance}} needed for our distributed deployment. While data modeling is query-first, this approach is suitable for our well-defined access patterns.",
      useCases: [
        "Time-series data (IoT, metrics).",
        "Write-intensive applications (logging, tracking).",
        "Applications requiring {{High Availability}} and linear {{Scalability}} across multiple data centers.",
        "Messaging systems."
      ],
      dataModel: "Wide-column store (keyspaces containing tables, rows identified by a primary key, columns can vary per row)."
    },
    {
      id: "redis",
      title: "Redis (as a Database)",
      type: "{{NoSQL (Key-Value / Data Structure Server)}}",
      architecture: "In-memory data store, primarily single-threaded (for command execution) but highly performant due to non-blocking I/O. Can be used as a [cache](#/caches), [message broker](#/messaging-queues), or a persistent database with {{Redis Persistence}} ({{RDB (Redis Database Backup)|RDB}} snapshots and {{AOF (Append Only File)|AOF}} logs).",
      pros: [
        "Extremely fast due to its in-memory nature, providing sub-millisecond {{Latencies|latencies}}.",
        "Supports a rich set of data structures (strings, hashes, lists, sets, sorted sets, streams, {{HyperLogLogs}}, bitmaps, {{Geospatial Indexes}}).",
        "Versatile: excellent as a [cache](#/caches), session store, [message broker](#/messaging-queues), queue, or for real-time computations like leaderboards.",
        "Simple to use and deploy for basic use cases. Supports clustering for {{Horizontal Scaling|horizontal scalability}} and {{High Availability}}."
      ],
      cons: [
        "Data set size is primarily limited by available RAM (though disk {{Persistence}} options exist, performance is best when data fits in memory).",
        "Single-threaded command execution can be a bottleneck for CPU-bound workloads on multi-core machines if many complex commands are used (though I/O is often the actual limit).",
        "Complex queries involving multiple keys or ad-hoc querying are not its strong suit; primarily designed for key-based access.",
        "{{Durability}} guarantees depend heavily on the chosen {{Persistence}} configuration ({{RDB (Redis Database Backup)|RDB}} vs. {{AOF (Append Only File)|AOF}}) and can trade off performance."
      ],
      whenToUse: [
        "As a primary [caching](#/caches) layer to reduce {{Latency}} and load on backend databases.",
        "Session management for web applications.",
        "Real-time leaderboards, counters, and rate limiters.",
        "As a [message broker](#/messaging-queues) or task queue (especially with {{Redis Streams}}).",
        "When very low {{Latency}} access to data structures is required."
      ],
      whenNotToUse: [
        "As a primary database for very large datasets that far exceed available RAM and require strong disk-based {{Durability}} for all data without performance compromise.",
        "Applications requiring complex relational queries, joins, or strong {{ACID Properties|ACID transactions}} across multiple keys like a traditional {{RDBMS}}.",
        "When long-term storage of infrequently accessed data is the primary goal (could be expensive)."
      ],
      interviewTalkingPoints: [
        "Stress its in-memory nature and speed for [caching](#/caches) and real-time use cases.",
        "Mention its versatile data structures beyond simple key-value.",
        "Discuss its use for session stores, leaderboards, and as a [message queue](#/messaging-queues).",
        "Acknowledge RAM limitations and {{Persistence}} trade-offs ({{RDB (Redis Database Backup)|RDB}} vs. {{AOF (Append Only File)|AOF}})."
      ],
      defendingYourDecision: "{{Redis}} was chosen for its exceptional speed as an in-memory [cache](#/caches) and session store, drastically reducing {{Latency}} for frequently accessed data. Its rich data structures also allow us to efficiently implement [e.g., real-time leaderboards]. While {{Persistence}} is a consideration, for this specific use case, the benefits of its performance outweigh the need for {{RDBMS}}-level {{Durability}} for all cached data.",
      useCases: [
        "[Caching](#/caches) layer for applications.",
        "Session store.",
        "Real-time leaderboards and counters.",
        "[Message broker](#/messaging-queues) / task queue ({{Redis Streams}}).",
        "{{Rate Limiting}}."
      ],
      dataModel: "Key-value store with support for rich data structures."
    },
    {
      id: "dynamodb",
      title: "Amazon DynamoDB",
      type: "{{NoSQL (Key-Value / Document Store)}}",
      architecture: "Fully managed, serverless {{NoSQL (Not Only SQL)|NoSQL}} database service by AWS. Provides fast and predictable performance with seamless {{Scalability}}. Data is automatically partitioned and replicated across multiple {{Availability Zones}} within a region.",
      pros: [
        "Highly scalable (both {{Throughput}} and storage) with on-demand or provisioned capacity modes.",
        "Low and predictable {{Latency}}, often single-digit milliseconds.",
        "Fully managed service (no servers to manage, patching, etc.), reducing operational overhead.",
        "Flexible data model (key-value and document). Supports both primary key access and {{Secondary Indexes}} for more query flexibility.",
        "Strongly integrated with the AWS ecosystem ({{IAM}}, {{AWS Lambda|Lambda}}, {{Amazon Kinesis|Kinesis}}, etc.). {{Global Tables}} for multi-region, multi-active {{Replication}}."
      ],
      cons: [
        "Vendor lock-in with AWS; not easily portable to other environments.",
        "Can become expensive at very high {{Throughput}} if capacity is not planned or managed effectively (On-Demand can be pricier than well-utilized Provisioned).",
        "Query flexibility is limited compared to {{SQL (Structured Query Language)|SQL}} databases; designed for specific, known access patterns. Complex joins or ad-hoc queries are difficult.",
        "Transactions are supported but have limitations and different characteristics than {{RDBMS}} transactions.",
        "Steep learning curve for efficient data modeling to maximize performance and minimize cost (e.g., choosing partition keys, designing {{Secondary Indexes}})."
      ],
      whenToUse: [
        "Serverless applications leveraging the AWS ecosystem.",
        "Applications requiring massive scale and low, predictable {{Latency}} (e.g., gaming backends, ad tech, IoT data platforms).",
        "Mobile backends needing a scalable and managed database solution.",
        "When you need a key-value or document store with seamless {{Scalability}} and minimal operational burden."
      ],
      whenNotToUse: [
        "Applications requiring complex relational queries, joins, and strong {{ACID Properties|ACID transactions}} across many different entities.",
        "If you need to avoid vendor lock-in or plan to run in a multi-cloud/on-premise environment.",
        "Small-scale applications where the cost of even minimal provisioned {{Throughput}} might be a concern (though On-Demand helps here).",
        "When the primary access patterns are unknown or highly variable, making efficient data modeling difficult."
      ],
      interviewTalkingPoints: [
        "Emphasize its serverless nature and seamless {{Scalability}} ({{Throughput}} and storage).",
        "Highlight its low, predictable {{Latency}} and integration with AWS services.",
        "Discuss the importance of access pattern-driven data modeling.",
        "Mention options like On-Demand vs. Provisioned capacity, and {{Global Tables}}."
      ],
      defendingYourDecision: "{{Amazon DynamoDB|DynamoDB}} was selected for its serverless architecture and seamless {{Scalability}}, which aligns perfectly with our [e.g., event-driven, serverless backend]. Its predictable low {{Latency}} is crucial for [e.g., real-time bidding]. While data modeling requires careful planning around access patterns, this approach allows us to achieve the required performance and scale with minimal operational overhead within the AWS ecosystem.",
      useCases: [
        "Serverless applications.",
        "Applications requiring massive scale and low {{Latency}} (gaming, ad tech).",
        "Mobile backends.",
        "IoT applications."
      ],
      dataModel: "Key-value and document store (tables with items; items have attributes)."
    }
  ],
  patterns: [
    {
      id: "read-replicas",
      title: "{{Read Replicas}}",
      description: "A pattern where data from a primary database server is replicated (often asynchronously) to one or more secondary (replica) servers. Read requests are then offloaded to these replicas, reducing the read load on the primary server and improving overall read {{Throughput}} and {{Latency}} for clients.",
      suitability: "Applications with high read-to-write ratios (e.g., more reads than writes). Common for web applications, content delivery, and reporting systems.",
      tradeoffs: "Increased infrastructure cost for replica servers. Potential for {{Replication Lag}}, meaning replicas might serve slightly stale data ({{Eventual Consistency}}). Adds complexity to the database setup and management.",
      whenToUse: [
        "When read load is a bottleneck for the primary database.",
        "To improve read {{Latency}} for geographically distributed users by placing replicas closer to them.",
        "To isolate analytical queries or reporting workloads from the transactional primary database."
      ],
      whenNotToUse: [
        "Write-heavy workloads, as replicas don't help with write {{Scalability}} on the primary.",
        "Applications that require all reads to be strictly consistent with the latest writes (though some systems allow configuring {{Consistency}} for reads from replicas).",
        "When the cost of additional replica instances is prohibitive for the performance gain."
      ],
      interviewTalkingPoints: [
        "Explain how {{Read Replicas}} offload read traffic from the primary.",
        "Discuss the concept of {{Replication Lag}} and {{Eventual Consistency}}.",
        "Mention that it's a common pattern for scaling out read-heavy relational databases."
      ],
      defendingYourDecision: "We implemented {{Read Replicas}} because our application experiences a significantly higher read load than write load. This pattern allows us to scale out read capacity cost-effectively, improve read {{Latency}}, and reduce the burden on the primary database, ensuring it remains responsive for write operations. While {{Replication Lag}} is a factor, {{Eventual Consistency}} is acceptable for many of our read use cases."
    },
    {
      id: "sharding-strategies",
      title: "{{Sharding Strategies}}",
      description: "Methods for distributing data across multiple database shards.",
      strategies: [
        {
          name: "{{Range-Based Sharding}}",
          details: "Data is partitioned based on a range of values of the shard key. E.g., User IDs 1-1000 on Shard A, 1001-2000 on Shard B."
        },
        {
          name: "{{Hash-Based Sharding}}",
          details: "A hash function is applied to the shard key, and the result determines the shard. Ensures even data distribution but can make range queries difficult."
        },
        {
          name: "{{List-Based Sharding}}",
          details: "Data is partitioned based on a list of predefined values of the shard key. E.g., Users from 'North America' on Shard A, 'Europe' on Shard B."
        },
        {
          name: "{{Directory-Based Sharding}}",
          details: "A lookup table (directory) maps shard keys to specific shards. Offers flexibility but the directory can become a bottleneck."
        }
      ]
    },
    {
      id: "leader-follower",
      title: "{{Leader-Follower Replication (Master-Slave)}}",
      description: "One server (leader/master) handles all write operations. These writes are then replicated (usually asynchronously) to one or more follower/slave servers. Followers can handle read requests, thus scaling read capacity.",
      pros: ["Simplifies write {{Consistency}} as all writes go through a single leader.", "Good for read {{Scalability|scaling}} by offloading read queries to followers.", "Followers can also be used for {{Failover}} (promoted to leader if the primary fails)."],
      cons: ["The leader is a bottleneck for write operations; all writes must go through it.", "Leader is a {{Single Point of Failure (SPOF)|single point of failure}} for writes until a follower is promoted ({{Failover}} time).", "{{Replication Lag}} can mean followers serve stale data if replication is asynchronous."],
      whenToUse: [
        "Read-heavy applications where read capacity is a concern.",
        "When a clear single source of truth for writes is desired to simplify {{Consistency}} management.",
        "As a basis for {{High Availability}} setups (with automated {{Failover}} to a follower)."
      ],
      whenNotToUse: [
        "Extremely write-intensive applications where the single leader becomes a bottleneck.",
        "Applications requiring multi-master writes or active-active setups across different regions for write {{Latency}}.",
        "When zero data loss on leader failure is absolutely critical and synchronous {{Replication}} (which impacts performance) is not an option."
      ],
      interviewTalkingPoints: [
        "Explain the roles of leader (writes) and followers (reads, {{Failover}}).",
        "Discuss how it helps in read {{Scalability|scaling}}.",
        "Mention write bottleneck on the leader and {{Replication Lag}} as key trade-offs."
      ],
      defendingYourDecision: "{{Leader-Follower Replication (Master-Slave)|Leader-follower replication}} was implemented to scale our read traffic effectively and to provide a straightforward {{High Availability}} solution. By directing all writes to the leader, we maintain {{Strong Consistency}} for write operations, while followers handle the bulk of our read queries. Automated {{Failover}} to a follower ensures service continuity."
    },
    {
      id: "multi-leader",
      title: "{{Multi-Leader Replication (Master-Master)}}",
      description: "Multiple servers (leaders) can accept write operations. Changes made on one leader are replicated to other leaders and their followers. Useful for multi-datacenter deployments or applications requiring low write {{Latency}} across regions.",
      pros: ["Improved write {{Availability}} and lower write {{Latency}}, as writes can be handled by any leader (e.g., the closest one).", "Continues to accept writes even if some leaders are down or a data center is disconnected."],
      cons: ["Significant complexity in {{Conflict Resolution}} if the same data is modified concurrently on different leaders. Requires robust conflict detection and resolution strategies.", "{{Replication}} between leaders adds complexity and potential for inconsistencies if not handled carefully."],
      whenToUse: [
        "Geographically distributed applications where users need low write {{Latency}} to local data centers.",
        "Applications requiring high write {{Availability}}, where the system must continue accepting writes even if one data center goes offline.",
        "Collaborative applications where different users might update data concurrently from different locations."
      ],
      whenNotToUse: [
        "Applications where write conflicts are frequent and difficult to resolve automatically.",
        "Simpler applications where single-leader {{Replication}} provides sufficient {{Availability}} and {{Scalability}}.",
        "When the complexity of managing {{Conflict Resolution}} outweighs the benefits of multi-master writes."
      ],
      interviewTalkingPoints: [
        "Explain that multiple nodes can accept writes, improving write {{Latency}} and {{Availability}}.",
        "Crucially, discuss the challenge of write {{Conflict Resolution}}.",
        "Mention its suitability for multi-datacenter deployments."
      ],
      defendingYourDecision: "{{Multi-Leader Replication (Master-Master)|Multi-leader replication}} was chosen for our geographically distributed application to provide low write {{Latency}} for users in different regions and to ensure high write {{Availability}} even during partial data center outages. We've implemented a [specific {{Conflict Resolution}} strategy, e.g., {{Last-Write-Wins (LWW)|last-write-wins}}, {{CRDTs}}] to handle concurrent updates, which is acceptable for our use case."
    },
    {
      id: "quorum",
      title: "{{Quorum (Reads/Writes)}}",
      description: "In distributed systems, ensuring {{Consistency}} by requiring operations (reads or writes) to be acknowledged by a minimum number (quorum) of nodes before being considered successful. W + R > N (N=replicas, W=write quorum, R=read quorum).",
      details: "Helps tune {{Consistency}} vs. {{Availability}}. For example, if N=3, W=2, R=2 ensures {{Strong Consistency}}."
    },
    {
      id: "database-per-service",
      title: "{{Database per Service (Microservices)}}",
      description: "Each {{Microservice}} manages its own private database. This ensures loose coupling and allows services to choose the database technology best suited for their needs.",
      pros: "Service autonomy, independent {{Scalability|scaling}}, technology diversity.",
      cons: "Data {{Consistency}} across services requires {{Eventual Consistency}} mechanisms (e.g., {{Event Sourcing}}, {{Sagas}}), more complex to manage multiple databases."
    },
    {
      id: "cqrs",
      title: "{{CQRS (Command Query Responsibility Segregation)}}",
      description: "A pattern that separates read and update operations (models) for a data store. Commands update data, Queries read data. Often used with separate read and write databases.",
      pros: "Optimized data models for reads and writes, improved {{Scalability}} and performance.",
      cons: "Increased complexity, potential for {{Eventual Consistency}} between read/write models."
    }
  ],
  scenarios: [
    {
      id: "social-media-feed",
      title: "Choosing a DB for a Social Media Feed",
      description: "High write volume (new posts, likes), very high read volume (feeds). Needs to be scalable, available, and {{Eventual Consistency|eventually consistent}} is often acceptable for parts of the system.",
      considerations: [
        "{{NoSQL (Not Only SQL)|NoSQL}} databases like {{Apache Cassandra|Cassandra}} or {{Amazon DynamoDB|DynamoDB}} for the main feed data due to {{Scalability}} and write performance.",
        "{{Redis}} for [caching](#/caches) recent feed items or user timelines.",
        "{{Graph Database|Graph database}} (e.g., {{Neo4j}}) for social connections if complex relationship queries are frequent.",
        "Relational database for user accounts and metadata requiring {{Strong Consistency}}."
      ],
      solutionRationale: "A hybrid approach is common. {{Apache Cassandra|Cassandra}} for its write {{Throughput}} and linear {{Scalability}} for feed items. {{Redis}} for [caching](#/caches). {{PostgreSQL}}/{{MySQL}} for user profiles and transactional data."
    },
    {
      id: "ecommerce-inventory",
      title: "Choosing a DB for an E-commerce Inventory System",
      description: "Requires {{Strong Consistency}} ({{ACID Properties|ACID properties}}) to avoid overselling. High volume of reads (product views) and writes (orders, stock updates).",
      considerations: [
        "Relational databases ({{PostgreSQL}}, {{MySQL}}) are a strong fit due to {{ACID Properties|ACID compliance}}.",
        "Need for accurate stock counts and reliable transaction processing.",
        "{{Read Replicas}} can handle high read loads for product browsing.",
        "[Caching](#/caches) (e.g., {{Redis}}) for popular product details."
      ],
      solutionRationale: "{{PostgreSQL}} or {{MySQL}} with {{InnoDB}} for its {{ACID Properties|ACID properties}}. {{Read Replicas}} to scale reads. Potentially a {{NoSQL (Not Only SQL)|NoSQL}} solution for product catalogs if schema flexibility and search are major concerns, but inventory itself needs transactional integrity."
    },
    {
      id: "logging-platform",
      title: "Choosing a DB for a Logging Platform",
      description: "Extremely high write volume. Data is time-series based. Queries are often analytical or search-based over large datasets.",
      considerations: [
        "{{Time-Series Databases}} (e.g., {{InfluxDB}}, {{Prometheus}}) or {{Wide-Column Stores}} (e.g., {{Apache Cassandra|Cassandra}}, {{Elasticsearch}}).",
        "Ability to ingest data at a high rate.",
        "Efficient querying by time range and other metadata.",
        "{{Scalability}} and cost-effectiveness for storing large volumes of data."
      ],
      solutionRationale: "{{Elasticsearch}} for its powerful search and analytics capabilities on log data. {{Apache Cassandra|Cassandra}} for massive write {{Throughput}} and linear {{Scalability}} if search is less critical than ingestion and storage."
    },
    {
      id: "url-shortener",
      title: "Choosing a DB for a URL Shortener",
      description: "High read volume (redirects), moderate write volume (new short URLs). Low {{Latency}} is critical for redirects. Needs to store mappings from short codes to long URLs.",
      considerations: [
        "{{Key-Value Store|Key-value store}} like {{Redis}} or {{Amazon DynamoDB|DynamoDB}} for fast lookups.",
        "Data model is simple: short_code -> long_URL.",
        "{{Durability}} for the mappings is important.",
        "{{Scalability}} for reads."
      ],
      solutionRationale: "{{Redis}} if {{Latency}} is paramount and dataset can fit in memory (with {{Persistence}}). {{Amazon DynamoDB|DynamoDB}} or a similar managed {{Key-Value Store|key-value store}} for {{Scalability}} and {{Durability}} with low operational overhead."
    }
  ],
  flashcards: [
    {
      id: "fc_acid",
      question: "What are the {{ACID Properties}} of a transaction?",
      answer: "{{Atomicity}}, {{Consistency}}, {{Isolation}}, {{Durability}}."
    },
    {
      id: "fc_base",
      question: "What does {{BASE Properties|BASE}} stand for in database theory?",
      answer: "{{Basically Available}}, {{Soft state}}, {{Eventual consistency}}."
    },
    {
      id: "fc_cap",
      question: "What are the three guarantees in the {{CAP Theorem (Brewer's Theorem)|CAP theorem}}?",
      answer: "{{Consistency}}, {{Availability}}, {{Partition Tolerance}}. A distributed system can only provide two out of three."
    },
    {
      id: "fc_sharding",
      question: "What is {{Database Sharding|database sharding}}?",
      answer: "Partitioning a large database into smaller, faster, more manageable parts called shards."
    },
    {
      id: "fc_replication",
      question: "Why is {{Database Replication|database replication}} used?",
      answer: "For {{High Availability}}, {{Fault Tolerance}}, and scaling read operations."
    },
    {
      id: "fc_sql_vs_nosql",
      question: "What is a key difference between {{SQL (Structured Query Language)|SQL}} and {{NoSQL (Not Only SQL)|NoSQL}} databases regarding schema?",
      answer: "{{SQL (Structured Query Language)|SQL}} databases typically have a predefined schema ({{Schema-on-Write}}), while {{NoSQL (Not Only SQL)|NoSQL}} databases are often schemaless or have a flexible schema ({{Schema-on-Read}})."
    },
    {
      id: "fc_leader_follower_replication",
      question: "In {{Leader-Follower Replication (Master-Slave)|leader-follower replication}}, which node handles writes?",
      answer: "The leader (master) node."
    },
    {
      id: "fc_eventual_consistency",
      question: "What is {{Eventual Consistency}}?",
      answer: "A consistency model where, if no new updates are made to a given data item, all accesses to that item will eventually return the last updated value."
    },
    {
      id: "fc_iops",
      question: "What does {{IOPS (Input/Output Operations Per Second)|IOPS}} measure?",
      answer: "Input/Output Operations Per Second, a measure of storage performance."
    },
    {
      id: "fc_mongodb_data_model",
      question: "What is the primary data model of {{MongoDB}}?",
      answer: "Document-oriented ({{BSON}} documents)."
    },
    {
      id: "fc_cassandra_architecture",
      question: "What is a key characteristic of {{Apache Cassandra|Cassandra}}'s architecture?",
      answer: "Decentralized (masterless) architecture, providing {{High Availability}} and no {{Single Point of Failure (SPOF)|single point of failure}}."
    }
  ],
  codeSnippets: [
    {
      id: "python_postgresql_connect",
      title: "Python with PostgreSQL (psycopg2)",
      language: "python",
      code: `
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="your_db",
        user="your_user",
        password="your_password",
        host="your_host",
        port="5432"
    )
    cur = conn.cursor()

    # Example Query
    cur.execute("SELECT version();")
    db_version = cur.fetchone()
    print(f"PostgreSQL database version: {db_version}")

    # Example Insert
    # cur.execute("INSERT INTO your_table (column1, column2) VALUES (%s, %s);", ("value1", "value2"))
    # conn.commit()

    cur.close()
except (Exception, psycopg2.Error) as error:
    print(f"Error while connecting to PostgreSQL: {error}")
finally:
    if conn:
        conn.close()
      `
    },
    {
      id: "nodejs_mongodb_connect",
      title: "Node.js with MongoDB (mongodb driver)",
      language: "javascript",
      code: `
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://your_user:your_password@your_host:27017/your_db';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const db = client.db('your_db');
    const collection = db.collection('your_collection');

    // Example Find
    const findResult = await collection.find({}).limit(5).toArray();
    console.log('Found documents =>', findResult);

    // Example Insert
    // const insertResult = await collection.insertOne({ item: "example", qty: 10 });
    // console.log('Inserted document =>', insertResult);

  } catch (err) {
    console.error("Error connecting to MongoDB or performing operation", err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
      `
    },
    {
      id: "python_redis_connect",
      title: "Python with Redis (redis-py)",
      language: "python",
      code: `
import redis

try:
    r = redis.Redis(
        host='your_redis_host',
        port=6379,
        db=0,
        password='your_redis_password' # if applicable
    )

    # Set a key
    r.set('mykey', 'Hello from Python!')

    # Get a key
    value = r.get('mykey')
    print(f"Value for 'mykey': {value.decode('utf-8')}")

    # Example with Hashes
    r.hset('user:1000', mapping={'name': 'John Doe', 'email': 'john.doe@example.com'})
    user_name = r.hget('user:1000', 'name')
    print(f"User name: {user_name.decode('utf-8')}")

except redis.exceptions.ConnectionError as e:
    print(f"Could not connect to Redis: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
      `
    }
  ],
  comparisonData: {
    "sql-vs-nosql": {
      title: "Relational vs NoSQL Trade-offs",
      item1Name: "Relational DB ({{SQL (Structured Query Language)|SQL}})",
      item2Name: "{{NoSQL (Not Only SQL)|NoSQL}} Database",
      features: [
        { "featureName": "Schema Flexibility", "item1Detail": "Fixed schema, tables with predefined columns.", "item2Detail": "Schema-less or flexible schema ({{JSON}}, etc.), can evolve without downtime." },
        { "featureName": "Scaling", "item1Detail": "{{Vertical Scaling}} or {{Sharding (Horizontal Partitioning)|sharding}} with significant effort (joins become complex). Typically requires {{Master-Slave Replication|master-slave replication}} for read scale.", "item2Detail": "Designed for {{Horizontal Scaling}}; partitioning built-in (e.g., auto-sharding in {{Apache Cassandra|Cassandra}}/{{MongoDB}} clusters)." },
        { "featureName": "Consistency", "item1Detail": "{{ACID Properties|ACID transactions}} ensure {{Strong Consistency}} within a node (and across cluster with distributed transactions if supported).", "item2Detail": "Many {{NoSQL (Not Only SQL)|NoSQL}} sacrifice strict {{ACID Properties|ACID}} for {{Availability}}; often {{Eventual Consistency}} (though some, like {{MongoDB}} with replica sets, can do {{Strong Consistency}} reads)." },
        { "featureName": "Use Cases", "item1Detail": "Great for structured data and relationships (financial systems, inventory, where transactions are key).", "item2Detail": "Great for large-scale, unstructured or rapidly evolving data (social media feeds, IoT data, analytics). Often specific to type: document DB for {{JSON}}, wide-column for time-series, etc." },
        { "featureName": "Examples", "item1Detail": "{{MySQL}}, {{PostgreSQL}}, {{Oracle Database|Oracle}}.", "item2Detail": "{{MongoDB}} (Document), {{Apache Cassandra|Cassandra}} (Wide-Column), {{Redis}} (Key-Value), {{Neo4j}} (Graph)." }
      ]
    }
  },
  decisionTree: {
    title: "Database Decision Tree (Placeholder)",
    description: "This section will feature an interactive decision tree to help guide the selection of a database based on various criteria like data model, {{Consistency}} needs, {{Scalability}} requirements, etc. (Coming Soon)"
    // Structure for tree nodes and questions will be defined here later.
  },
  externalResources: [
    {
      id: "db_engines_ranking",
      title: "DB-Engines Ranking",
      url: "https://db-engines.com/en/ranking",
      description: "Popularity ranking of database management systems, updated monthly."
    },
    {
      id: "martin_kleppmann_dda",
      title: "Designing Data-Intensive Applications by Martin Kleppmann",
      url: "https://dataintensive.net/",
      description: "A highly recommended book covering the fundamental principles of data systems."
    },
    {
      id: "aws_databases",
      title: "AWS Databases",
      url: "https://aws.amazon.com/products/databases/",
      description: "Overview of database offerings on Amazon Web Services."
    },
    {
      id: "gcp_databases",
      title: "Google Cloud Databases",
      url: "https://cloud.google.com/products/databases",
      description: "Overview of database offerings on Google Cloud Platform."
    },
    {
      id: "azure_databases",
      title: "Azure Databases",
      url: "https://azure.microsoft.com/en-us/products/category/databases/",
      description: "Overview of database offerings on Microsoft Azure."
    }
  ],
  mermaidDiagrams: {
    masterSlave: `
    graph LR
      Master[(Master DB)] -- replicate --> Slave1[(Slave DB)]
      Master -- replicate --> Slave2[(Slave DB)]
      ClientRead --> Slave1
      ClientWrite --> Master
  `,
    masterMaster: `
    graph LR
      A[(Master A)] <--> B[(Master B)]
      A -- write --> B
      B -- write --> A
      Clients-->A
      Clients-->B
  `,
    consistentHashing: `
    graph TB
      subgraph Hash Ring
        direction LR
        N1(Node1) --- K1(Key1)
        N2(Node2)
        N3(Node3)
        K1 -- clockwise --> N2
      end
      click N1 "https://docs.example.com/node1"
  `
  }
};
