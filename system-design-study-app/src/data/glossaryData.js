// system-design-study-app/src/data/glossaryData.js
const rawGlossaryData = [
  {
    term: "ACID Properties",
    definition: "A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee reliable processing of database transactions.",
    details: "Atomicity: Transactions are all-or-nothing. Consistency: Transactions bring the database from one valid state to another. Isolation: Concurrent transactions are executed as if they were serial. Durability: Committed transactions survive failures."
  },
  {
    term: "Active-Active Multi-Region Replication",
    definition: "In an active-active multi-region setup, multiple regions are simultaneously serving live traffic (reads and potentially writes). Data is replicated bidirectionally or in a mesh between these active regions.",
    details: "This setup aims for higher availability, lower latency for globally distributed users, and better resource utilization, but introduces complexity in managing data consistency and resolving write conflicts."
  },
  {
    term: "Active-Passive Multi-Region Replication",
    definition: "In an active-passive multi-region setup, one region (the active region) handles all live traffic, and data is replicated to one or more passive (standby/DR) regions which take over if the active region fails.",
    details: "This is simpler for failover compared to active-active but may result in higher latency for users distant from the active region and underutilization of passive resources during normal operations."
  },
  {
    term: "Adoption Rate / Usage Growth",
    definition: "Rate at which an API is being adopted by new clients or existing clients increase usage. Relevant for public or widely used internal APIs.",
    details: null
  },
  {
    term: "Advanced Message Queuing Protocol (AMQP)",
    definition: "An open standard application layer protocol for message-oriented middleware. RabbitMQ is a popular broker that implements AMQP.",
    details: "AMQP defines a set of rules for how messages should be structured, routed, and delivered, enabling interoperability between different messaging systems that support it."
  },
  {
    term: "Alerting",
    definition: "The process of notifying relevant personnel or systems when predefined thresholds for metrics are breached or critical events occur, indicating potential issues or failures in a system.",
    details: "Effective alerting is crucial for proactive issue resolution and maintaining system reliability."
  },
  {
    term: "Amazon DynamoDB",
    definition: "A fully managed, serverless NoSQL database service by AWS, providing fast and predictable performance with seamless scalability for key-value and document data.",
    details: "DynamoDB supports features like On-Demand/Provisioned capacity, Global Tables for multi-region replication, and integrates deeply with the AWS ecosystem."
  },
  {
    term: "Amazon EC2",
    definition: "Amazon Elastic Compute Cloud (EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.",
    details: "EC2 instances act as virtual servers where applications can be deployed."
  },
  {
    term: "Amazon Kinesis",
    definition: "A suite of services on AWS for collecting, processing, and analyzing real-time, streaming data at massive scale.",
    details: "Includes Kinesis Data Streams, Kinesis Data Firehose, Kinesis Data Analytics, and Kinesis Video Streams."
  },
  {
    term: "Amazon S3",
    definition: "Amazon Simple Storage Service (S3) is an object storage service offering industry-leading scalability, data availability, security, and performance.",
    details: "Often used for storing backups, static website assets, application data, and as a data lake foundation."
  },
  {
    term: "Amazon SQS",
    definition: "Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.",
    details: "SQS offers Standard (at-least-once) and FIFO (exactly-once, ordered) queues."
  },
  {
    term: "Anycast",
    definition: "A network addressing and routing methodology in which a single destination IP address is shared by devices (usually servers) in multiple geographic locations. Routers direct packets addressed to this destination to the location 'closest' to the sender in terms of network topology.",
    details: "Often used by CDNs and DNS services to provide lower latency and load distribution."
  },
  {
    term: "Apache Cassandra",
    definition: "A decentralized, distributed, wide-column NoSQL database designed for high availability and linear scalability, especially for write-intensive workloads.",
    details: "Features a masterless architecture, ensuring no single point of failure, and offers tunable consistency."
  },
  {
    term: "Apache Flink",
    definition: "An open-source, unified stream-processing and batch-processing framework. It is designed for high-performance, scalable, and accurate real-time data analytics.",
    details: "Flink provides event time semantics, exactly-once processing guarantees, and rich APIs for building complex streaming applications."
  },
  {
    term: "Apache Hadoop",
    definition: "An open-source software framework for storing data and running applications on clusters of commodity hardware. It provides massive storage for any kind of data, enormous processing power and the ability to handle virtually limitless concurrent tasks or jobs.",
    details: "Key components include HDFS (Hadoop Distributed File System) for storage and MapReduce (or more modern engines like Spark) for processing."
  },
  {
    term: "Apache Kafka",
    definition: "A distributed streaming platform built around a publish-subscribe log. Offers high-throughput, fault-tolerant messaging and event streaming.",
    details: "Used for building real-time data pipelines and streaming applications. It provides message persistence, partitioning for scalability, and consumer groups for parallel processing."
  },
  {
    term: "Apache Solr",
    definition: "An open-source enterprise search platform, written in Java. Its major features include full-text search, hit highlighting, faceted search, real-time indexing, dynamic clustering, database integration, and rich document (e.g., Word, PDF) handling.",
    details: "Solr is highly scalable, providing distributed search and index replication."
  },
  {
    term: "Apache Spark",
    definition: "A fast and general-purpose cluster computing system. It provides high-level APIs in Java, Scala, Python and R, and an optimized engine that supports general execution graphs.",
    details: "Widely used for big data processing, including batch processing, real-time stream processing (Spark Streaming), machine learning (MLlib), and graph processing (GraphX)."
  },
  {
    term: "Apache ZooKeeper",
    definition: "A centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services for distributed systems.",
    details: "Often used by systems like Apache Kafka (older versions) and HBase for cluster coordination."
  },
  {
    term: "API (Application Programming Interface)",
    definition: "Application Programming Interface (API) is a set of rules and protocols that allows different software applications to communicate and exchange data with each other, defining how components interact and enabling modularity, reusability, and integration.",
    details: "APIs are the contract specifying how software components should interact, often used for web services (REST, GraphQL, gRPC), libraries, or operating system calls."
  },
  {
    term: "API Gateway",
    definition: "A server that acts as a single entry point for all client requests to backend microservices. It can handle tasks like request routing, composition, authentication, rate limiting, and monitoring.",
    details: "Simplifies client interactions and provides a centralized place to manage cross-cutting concerns in a microservices architecture."
  },
  {
    term: "API Gateway Aggregation",
    definition: "An API Gateway acts as a single entry point, receives client requests, invokes multiple Microservices, aggregates their responses, and returns a consolidated response to the client.",
    details: "This pattern simplifies client interaction with Microservices, reduces chattiness, and can handle cross-cutting concerns like authentication and logging. However, the gateway can become a bottleneck or single point of failure if not designed well."
  },
  {
    term: "API Keys",
    definition: "Simple tokens assigned to applications or users to grant access to an API. Typically sent in a request header (e.g., X-API-Key).",
    details: "API Keys are easy to implement for basic authentication and are often used for server-to-server communication or identifying projects/applications making requests."
  },
  {
    term: "API Versioning",
    definition: "Managing changes to an API over time by creating distinct versions (e.g., /v1/users, /v2/users using URI Path Versioning, or via custom headers) to avoid breaking existing client integrations while allowing new features to be introduced.",
    details: "Common strategies include URI Path Versioning, Header Versioning, and Query Parameter Versioning. A clear deprecation policy for older versions is also important."
  },
  {
    term: "API Versioning (Custom Header)",
    definition: "API version is specified in a custom HTTP Header (e.g., Api-Version: 1 or Accept: application/vnd.myapi.v1+json).",
    details: "This approach keeps URIs clean and is considered more RESTful by some, but is less obvious to users browsing the API and requires clients to handle headers correctly."
  },
  {
    term: "API Versioning (URI Path)",
    definition: "API version is included in the URI path (e.g., /api/v1/resource, /api/v2/resource).",
    details: "This method is explicit and clear to users, and easy to route in load balancers/gateways, though some argue it violates REST principles."
  },
  {
    term: "ASICs (Application-Specific Integrated Circuits)",
    definition: "Integrated circuits customized for a particular use, rather than intended for general-purpose use. Hardware load balancers often use ASICs for high-performance traffic processing.",
    details: null
  },
  {
    term: "At-Least-Once Delivery",
    definition: "A message delivery guarantee ensuring that each message will be delivered one or more times to a consumer. While it prevents message loss, consumers must be designed to be idempotent to handle potential duplicate messages correctly. (Also known as At-Least-Once).",
    details: "This is a common semantic in reliable messaging systems where message loss is unacceptable, but duplicate processing needs to be managed by the consumer application."
  },
  {
    term: "At-Most-Once Delivery",
    definition: "A message delivery guarantee ensuring that each message will be delivered zero or one time. Messages might be lost under certain failure conditions.",
    details: "This semantic is simpler and has lower overhead but is unsuitable for critical messages where loss is not acceptable. Often referred to as 'fire and forget'."
  },
  {
    term: "Atomicity",
    definition: "A property of database transactions ensuring that all operations within a transaction are completed successfully as a single, indivisible unit; if any part of the transaction fails, the entire transaction is rolled back.",
    details: "Part of the ACID properties."
  },
  {
    term: "Authentication (AuthN)",
    definition: "The process of verifying the identity of a client or user trying to access an API or system (e.g., using API Keys, OAuth 2.0 tokens).",
    details: "Authentication confirms 'who you are'."
  },
  {
    term: "Authorization (AuthZ)",
    definition: "The process of determining whether an authenticated client or user has permission to perform a specific action or access a particular resource.",
    details: "Authorization confirms 'what you are allowed to do' after successful authentication."
  },
  {
    term: "Authorization Code Grant",
    definition: "An OAuth 2.0 grant type often used by web and mobile applications to obtain access tokens on behalf of a user. It involves redirecting the user to an authorization server to approve the access.",
    details: null
  },
  {
    term: "Auto Scaling",
    definition: "A cloud computing feature that automatically adjusts the amount of computational resources in a server farm—typically measured by the number of active servers—up or down based on actual usage.",
    details: "Helps maintain performance during traffic spikes and reduce costs during periods of low activity."
  },
  {
    term: "Availability",
    definition: "The percentage of time a system is operational and accessible when needed. Often expressed in 'nines' (e.g., 99.999% availability).",
    details: "High availability is a key non-functional requirement for many systems and is achieved through redundancy, fault tolerance, and robust monitoring."
  },
  {
    term: "Availability Zones",
    definition: "Isolated locations within data center regions from which public cloud services originate and operate. Each Availability Zone has its own power, cooling, and networking and is designed to be independent of other zones in the same region.",
    details: "Deploying applications across multiple Availability Zones enhances fault tolerance and high availability."
  },
  {
    term: "AWS ALB (Application Load Balancer)",
    definition: "A Layer 7 load balancing service by AWS that routes HTTP/HTTPS traffic based on content, such as path or host.",
    details: "Supports features like path-based routing, host-based routing, and integration with AWS services like EC2 Container Service (ECS) and Auto Scaling."
  },
  {
    term: "AWS ELB (Elastic Load Balancing)",
    definition: "A suite of load balancing services by AWS, including Application Load Balancer (ALB), Network Load Balancer (NLB), and Classic Load Balancer (CLB - older generation).",
    details: "Distributes incoming application or network traffic across multiple targets, such as Amazon EC2 instances, containers, and IP addresses."
  },
  {
    term: "AWS Lambda",
    definition: "A serverless compute service by AWS that lets you run code without provisioning or managing servers. You pay only for the compute time you consume.",
    details: "Lambda functions can be triggered by various events, such as HTTP requests via API Gateway, S3 bucket events, or messages from SQS queues."
  },
  {
    term: "AWS Route 53",
    definition: "A highly available and scalable cloud Domain Name System (DNS) web service by AWS. It is designed to give developers and businesses an extremely reliable and cost-effective way to route end users to Internet applications.",
    details: "Offers features like latency-based routing, geo DNS, and health checks for DNS failover."
  },
  {
    term: "Backpressure",
    definition: "A mechanism in data streaming or messaging systems to signal producers to slow down message production when consumers or downstream systems cannot keep up with the current rate of data flow, preventing overload.",
    details: "Helps maintain system stability under high load."
  },
  {
    term: "Backend for Frontend (BFF)",
    definition: "An API layer tailored to the specific needs of a particular client application (e.g., a BFF for a mobile app, another for a web app). It aggregates calls to downstream services and formats data for the frontend.",
    details: "BFFs optimize API interactions for specific client experiences, reducing over-fetching/under-fetching and simplifying frontend logic, but can lead to more services to manage."
  },
  {
    term: "Bandwidth",
    definition: "The maximum rate of data transfer across a given path, typically measured in bits per second (bps).",
    details: "Sufficient bandwidth is crucial for system performance, especially for data-intensive applications."
  },
  {
    term: "BASE Properties",
    definition: "An alternative to ACID for NoSQL databases, emphasizing availability over strict consistency (Basically Available, Soft state, Eventual consistency).",
    details: "Basically Available: The system guarantees availability. Soft state: The state of the system may change over time, even without input. Eventual consistency: The system will eventually become consistent over time, given no new updates."
  },
  {
    term: "Basically Available",
    definition: "A property in the BASE model indicating that the system guarantees availability, even if it means serving potentially stale data during partitions.",
    details: null
  },
  {
    term: "Bitmaps",
    definition: "A data structure that uses bits to represent a set of items or flags. Each bit corresponds to an element, and its value (0 or 1) indicates the presence or absence of a property.",
    details: "Redis supports bitmap data structures for efficient operations like counting unique users or tracking active days."
  },
  {
    term: "Bottleneck",
    definition: "A component or resource in a system that limits its overall performance or capacity. Identifying and mitigating bottlenecks is crucial for scalability.",
    details: null
  },
  {
    term: "Broken Object Level Authorization",
    definition: "A security vulnerability where an API endpoint exposes objects without properly verifying if the authenticated user has permission to access the specific requested object. Part of the OWASP API Security Top 10.",
    details: "Example: An API allows access to `/orders/{orderId}` but doesn't check if the logged-in user actually owns that `orderId`."
  },
  {
    term: "Broken User Authentication",
    definition: "Security flaws in authentication mechanisms that can allow attackers to compromise user accounts or gain unauthorized access. Part of the OWASP API Security Top 10.",
    details: "Examples include weak password policies, improper handling of session tokens, or vulnerabilities in credential recovery processes."
  },
  {
    term: "Broker",
    definition: "The message queue server software that manages the storage and routing of messages between producers and consumers.",
    details: "Examples include RabbitMQ, Apache Kafka, and managed services like AWS SQS."
  },
  {
    term: "Browser Cache",
    definition: "A type of client-side cache where a web browser stores copies of web resources (like images, CSS, JavaScript) locally on the user's computer to speed up subsequent visits to the same pages.",
    details: "Controlled by HTTP headers like `Cache-Control` and `Expires`."
  },
  {
    term: "BSON (Binary JSON)",
    definition: "A binary-encoded serialization format for JSON-like documents. MongoDB uses BSON internally to store documents.",
    details: "BSON extends JSON with additional data types like dates and binary data, and is designed for efficiency in storage and scanning."
  },
  {
    term: "Cache",
    definition: "A hardware or software component that stores data so that future requests for that data can be served faster; the data stored in a cache might be the result of an earlier computation or a copy of data stored elsewhere. (Also known as Caching).",
    details: "Caching is a fundamental technique for improving system performance by reducing latency and load on backend systems."
  },
  {
    term: "Cache Coherency",
    definition: "Ensures that all clients or nodes in a distributed system have a consistent view of the data stored in caches, especially when multiple caches store the same data and that data is updated.",
    details: "Mechanisms like cache invalidation protocols are used to maintain coherency and prevent stale reads. It's a key challenge in distributed caching."
  },
  {
    term: "Cache Entry",
    definition: "A piece of data stored in the cache, typically as a key-value pair.",
    details: null
  },
  {
    term: "Cache Eviction Policies",
    definition: "Algorithms used by a cache to decide which items to remove when the cache is full and new items need to be added. Examples include LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO (First-In, First-Out).",
    details: "The choice of eviction policy can significantly impact cache hit rates."
  },
  {
    term: "Cache Eviction Rate",
    definition: "The rate at which items are removed from the cache due to space limitations or Time-To-Live (TTL) expiry.",
    details: "Monitoring eviction rates helps in tuning cache size and policies."
  },
  {
    term: "Cache Hit",
    definition: "A request for data that is successfully found in the cache.",
    details: null
  },
  {
    term: "Cache Hit Ratio",
    definition: "The percentage of requests that are successfully served from the cache compared to the total number of requests. Formula: (Cache Hits / (Cache Hits + Cache Misses)) * 100%.",
    details: "A high cache hit ratio is a key indicator of cache effectiveness."
  },
  {
    term: "Cache Invalidation",
    definition: "The process of removing or marking a cache entry as invalid, forcing a refresh from the origin on the next request. This is crucial for maintaining data consistency between the cache and the source of truth.",
    details: "Common strategies include Time-To-Live (TTL) expiry, write-through invalidation, or event-based invalidation."
  },
  {
    term: "Cache Latency",
    definition: "The time taken to retrieve data from a cache. This should be significantly lower than retrieving data from the origin store.",
    details: null
  },
  {
    term: "Cache Miss",
    definition: "A request for data that is not found in the cache, requiring a fetch from the origin data store.",
    details: null
  },
  {
    term: "Cache Miss Rate",
    definition: "The percentage of requests that are not found in the cache and require a fetch from the origin data store. Formula: (Cache Misses / (Cache Hits + Cache Misses)) * 100%.",
    details: "Analyzing cache misses can help identify opportunities to improve cache content and strategies."
  },
  {
    term: "Cache Pollution",
    definition: "A situation where a cache is filled with items that are infrequently accessed or accessed only once, displacing more useful items. This can reduce the cache hit rate.",
    details: "Certain access patterns (like large scans) or suboptimal eviction policies can lead to cache pollution."
  },
  {
    term: "Cache-Aside (Lazy Loading)",
    definition: "A caching pattern where the application code first checks the cache for data. If it's a cache miss, the application reads the data from the database, then stores it in the cache before returning it to the client.",
    details: "This pattern loads data into the cache on demand, ensuring only requested data is cached. The application is responsible for managing cache interactions."
  },
  {
    term: "Cache-Control Headers",
    definition: "HTTP headers used to specify caching policies in both requests and responses. They control how, and for how long, individual resources should be cached by browsers and intermediary caches like CDNs.",
    details: "Common directives include `max-age`, `no-cache`, `no-store`, `public`, and `private`."
  },
  {
    term: "Cacheability",
    definition: "The characteristic of data or a resource that determines whether it is suitable for caching. Highly cacheable data is typically static or changes infrequently.",
    details: "REST APIs often leverage HTTP cacheability for GET requests on resources."
  },
  {
    term: "CAP Theorem (Brewer's Theorem)",
    definition: "States that a distributed data store cannot simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance. (Often referred to as CAP Theorem).",
    details: "In the presence of a network partition (P), a system must choose between strong Consistency (CP) or high Availability (AP)."
  },
  {
    term: "Causal Consistency",
    definition: "A consistency model ensuring that if operation A causally precedes operation B (e.g., A happens before B, and B depends on A), then all processes see operation A before operation B. Operations that are not causally related might be seen in different orders by different processes.",
    details: "Stronger than eventual consistency but weaker than strong consistency. Useful for preserving logical order in scenarios like comment threads."
  },
  {
    term: "CDN (Content Delivery Network)",
    definition: "A geographically distributed network of proxy servers and their data centers that cache content closer to end-users to improve access speed and availability. (Also known as Content Delivery Network).",
    details: "CDNs are crucial for delivering static assets (images, CSS, JS) and streaming media efficiently, reducing latency and origin server load."
  },
  {
    term: "Check-And-Set (CAS)",
    definition: "An atomic operation that compares the contents of a memory location to a given value and, only if they are the same, modifies the contents of that memory location to a new given value. This is done as a single atomic operation.",
    details: "Used in distributed caches like Memcached to prevent race conditions when multiple clients try to update the same item concurrently."
  },
  {
    term: "CI/CD (Continuous Integration/Continuous Delivery/Deployment)",
    definition: "A set of practices and tools that automate the process of building, testing, and deploying software changes, enabling faster and more reliable releases.",
    details: null
  },
  {
    term: "Citrix ADC",
    definition: "An application delivery controller (ADC) and load balancing solution from Citrix, available as hardware or software appliances. Formerly known as NetScaler ADC.",
    details: "Provides features like L4-L7 load balancing, SSL offloading, web application firewall (WAF), and global server load balancing (GSLB)."
  },
  {
    term: "Client Credentials Grant",
    definition: "An OAuth 2.0 grant type used when a client application requests an access token to access its own resources, not on behalf of a user (e.g., for server-to-server communication).",
    details: null
  },
  {
    term: "Client-Side Caching",
    definition: "Caching data directly in the client application (e.g., browser cache or mobile app cache). Data is stored on the user's device.",
    details: "Provides the fastest access as data is local, but storage is limited and cache invalidation can be challenging."
  },
  {
    term: "Cloud Load Balancers (Managed LBaaS)",
    definition: "Managed load balancing services provided by cloud platforms (e.g., AWS ELB/ALB, Google Cloud Load Balancing, Azure Load Balancer). They abstract away infrastructure and offer auto-scaling and high availability out of the box.",
    details: "Simplify deployment and management but may offer less customization than self-managed solutions."
  },
  {
    term: "CockroachDB",
    definition: "A distributed SQL database built on a transactional and strongly-consistent key-value store. It scales horizontally, survives disk, machine, rack, and even datacenter failures with minimal latency disruption and no manual intervention.",
    details: "Aims to provide both the scalability of NoSQL and the consistency of traditional SQL databases (NewSQL)."
  },
  {
    term: "Column-Family Stores",
    definition: "A type of NoSQL database that organizes data into column families (groups of related columns) rather than rows or documents. Examples include Apache Cassandra and HBase.",
    details: "Well-suited for write-intensive workloads and queries over specific columns for a range of rows."
  },
  {
    term: "Command Query Responsibility Segregation (CQRS)",
    definition: "An architectural pattern that separates read and update operations (models) for a data store. Commands update data, Queries read data. Often used with separate read and write databases.",
    details: "Can optimize data models for reads and writes independently, improving scalability and performance, but adds complexity and potential eventual consistency."
  },
  {
    term: "Competing Consumers",
    definition: "A messaging pattern where multiple consumers read from the same message queue, allowing for parallel processing of messages. Each message is typically processed by only one of the consumers.",
    details: "This pattern is used to scale message processing, improve throughput, and increase resilience."
  },
  {
    term: "Concurrent Users/Connections",
    definition: "The number of active users or connections being managed by a system (e.g., a load balancer or application server) simultaneously.",
    details: "A key metric for understanding system load and capacity."
  },
  {
    term: "Conflict Resolution",
    definition: "The process of managing and resolving inconsistencies that arise when the same data is modified concurrently in different locations or by different processes, especially in distributed systems or multi-leader replication setups.",
    details: "Strategies include Last-Write-Wins (LWW), CRDTs (Conflict-free Replicated Data Types), or manual intervention."
  },
  {
    term: "Consistency",
    definition: "Ensures that all clients see the same data at the same time, regardless of which node they connect to. Different levels include Strong Consistency, Eventual Consistency, and Causal Consistency.",
    details: "In the CAP theorem, consistency means that every read receives the most recent write or an error. In ACID properties, it means a transaction brings the database from one valid state to another."
  },
  {
    term: "Consistent Hashing",
    definition: "A hashing technique that minimizes the number of keys that need to be remapped when a hash table is resized (e.g., when servers are added or removed in a distributed cache or database sharding setup).",
    details: "Used in systems like Amazon DynamoDB and Apache Cassandra to distribute data across nodes."
  },
  {
    term: "Consul",
    definition: "A service mesh solution providing a full-featured control plane with service discovery, configuration, and segmentation functionality.",
    details: "Uses Raft for consensus and helps manage communication between microservices."
  },
  {
    term: "Consumer (Subscriber)",
    definition: "An application component that subscribes to a message queue or topic and processes messages received from it. (Also known as Subscriber).",
    details: null
  },
  {
    term: "Consumer Group (Kafka specific)",
    definition: "One or more consumers that jointly consume messages from one or more Apache Kafka topic partitions. Each partition is consumed by only one consumer within a group, allowing for parallel processing and load balancing.",
    details: null
  },
  {
    term: "Consumer Lag (Kafka specific)",
    definition: "The difference in offset between the latest message produced to a Kafka topic partition and the offset of the message currently being processed by a consumer group for that partition. Indicates how far behind a consumer is.",
    details: "Monitoring consumer lag is crucial for ensuring consumers are keeping up with producers."
  },
  {
    term: "Cookie-Based Sticky Sessions",
    definition: "A method of implementing session affinity where a load balancer issues a cookie to the client. The client includes this cookie in subsequent requests, allowing the load balancer to route the request back to the same backend server that handled the initial session.",
    details: "Useful for stateful applications where session data is stored locally on application servers."
  },
  {
    term: "Correlation ID",
    definition: "A unique identifier attached to requests and messages as they flow through a distributed system, allowing for tracing and correlating related operations across multiple services or components.",
    details: "Essential for debugging and monitoring in microservices architectures. Often used in request/reply patterns over messaging."
  },
  {
    term: "Cost Efficiency (Scalability)",
    definition: "The cost of resources required to achieve a certain level of performance or handle a certain load. Scalable systems aim for proportional (or better) cost increase with load.",
    details: null
  },
  {
    term: "Cost-Effectiveness",
    definition: "Designing a system that meets requirements without unnecessary expense. Considers hardware, software, operational, and development costs.",
    details: null
  },
  {
    term: "CRDTs (Conflict-free Replicated Data Types)",
    definition: "Data structures designed to be replicated across multiple computers in a network, where modifications can be made independently and concurrently without coordination between the replicas, and it is mathematically guaranteed that all replicas will eventually converge to the same state.",
    details: "Useful for collaborative applications and distributed systems that require high availability and partition tolerance."
  },
  {
    term: "Cross-Origin Resource Sharing (CORS)",
    definition: "A mechanism that uses additional HTTP Headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. Important for web-accessible APIs.",
    details: "Helps manage security restrictions imposed by the same-origin policy in web browsers."
  },
  {
    term: "CRUD (Create, Read, Update, Delete)",
    definition: "The four basic functions of persistent storage. In RESTful APIs, these often map to HTTP methods: POST (Create), GET (Read), PUT/PATCH (Update), DELETE (Delete).",
    details: null
  },
  {
    term: "CTEs (Common Table Expressions)",
    definition: "A temporary, named result set that you can reference within a SQL SELECT, INSERT, UPDATE, or DELETE statement. CTEs can help simplify complex queries by breaking them into smaller, more readable logical units.",
    details: "Supported by many modern SQL databases like PostgreSQL."
  },
  {
    term: "Cursor-Based Pagination (Seek Method / Keyset Pagination)",
    definition: "A pagination technique where the client receives a 'cursor' (an opaque pointer or a value from the last item of the current page) with a page of results. For the next page, the client sends this cursor back to the server, which then returns items that come after (or before) the item indicated by the cursor, based on a stable sort order.",
    details: "More performant and stable for large, dynamic datasets than offset pagination as it avoids database `OFFSET` operations."
  },
  {
    term: "Daily Active Users (DAU)",
    definition: "A metric that measures the number of unique users who engage with a product or service on a given day.",
    details: "Often used to gauge application scale and growth."
  },
  {
    term: "Data Model",
    definition: "The logical structure of data, including entities, attributes, and relationships, used in a database or application.",
    details: "Designing an appropriate data model is a crucial step in system design."
  },
  {
    term: "Data Replication",
    definition: "The process of creating and maintaining multiple copies of data on different database servers or storage systems. Used for high availability, fault tolerance, disaster recovery, and scaling read operations.",
    details: "Common patterns include master-slave, master-master, and peer-to-peer replication."
  },
  {
    term: "Database",
    definition: "An organized collection of data, generally stored and accessed electronically from a computer system. Databases are used to store, manage, and retrieve information efficiently.",
    details: "Can be broadly categorized into SQL (relational) and NoSQL (non-relational) types."
  },
  {
    term: "Database Index",
    definition: "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure. (Also known as Index (Database)).",
    details: "Indexes are crucial for optimizing query performance."
  },
  {
    term: "Database per Service (Microservices)",
    definition: "An architectural pattern in microservices where each microservice manages its own private database. This ensures loose coupling and allows services to choose the database technology best suited for their needs.",
    details: "Challenges include managing data consistency and transactions across services, often requiring eventual consistency mechanisms."
  },
  {
    term: "Database Replication",
    definition: "Creating and maintaining multiple copies of a database to improve availability, fault tolerance, and read scalability (Read Replicas).",
    details: "Can be synchronous or asynchronous. Common types include master-slave and master-master replication."
  },
  {
    term: "Database Sharding (Partitioning)",
    definition: "Dividing a large database into smaller, independent, more manageable parts called shards. Each shard can be on a separate server, distributing data and load.",
    details: "Strategies include range-based, hash-based, or list-based sharding. Improves scalability but adds complexity for queries and transactions spanning multiple shards."
  },
  {
    term: "Database Transaction",
    definition: "A sequence of one or more database operations (reads, writes, updates) that are executed as a single, atomic unit of work. Transactions should exhibit ACID properties in many systems. (Also known as Transaction (Database)).",
    details: null
  },
  {
    term: "DataLoader",
    definition: "A utility often used with GraphQL to batch and cache database calls or requests to other backend services within a single GraphQL request lifecycle. It helps solve the N+1 query problem.",
    details: "By collecting individual data requests and dispatching them as a single batch operation, DataLoader can significantly improve performance."
  },
  {
    term: "DDoS Protection",
    definition: "Mechanisms and strategies to defend against Distributed Denial of Service (DDoS) attacks, which attempt to make an online service unavailable by overwhelming it with traffic from multiple compromised computer systems.",
    details: "CDNs and specialized hardware/cloud services often provide DDoS mitigation capabilities."
  },
  {
    term: "Dead Letter Queue (DLQ)",
    definition: "A dedicated queue where messages that cannot be processed successfully by a consumer (after retries, or due to errors) are sent for later analysis or manual intervention.",
    details: "Prevents problematic messages from blocking processing in the main queue and allows for robust error handling in messaging systems."
  },
  {
    term: "Decoupling",
    definition: "Designing system components so that they are independent and have minimal knowledge of each other. Changes in one component should have limited impact on others.",
    details: "Messaging queues and well-defined APIs are common ways to achieve decoupling, improving system maintainability and resilience."
  },
  {
    term: "Deep Pagination",
    definition: "A problem associated with offset-based pagination where requesting pages deep into a large dataset (e.g., page 5000 of 10000) becomes very slow because the database has to scan and skip a large number of rows.",
    details: "Cursor-based pagination is often used to mitigate this issue."
  },
  {
    term: "Delay Queues",
    definition: "A feature in some message queuing systems (like AWS SQS) that allows producers to postpone the delivery of new messages to consumers for a specified period.",
    details: "Useful for scheduling tasks or delaying processing until a certain time."
  },
  {
    term: "Delivery Guarantees",
    definition: "Defines the assurance level for message delivery in a messaging system: At-Most-Once, At-Least-Once, or Exactly-Once.",
    details: "The choice depends on the application's tolerance for duplicate messages or message loss."
  },
  {
    term: "Denormalization",
    definition: "The process of intentionally introducing redundancy into a database by adding copies of data or grouping data to optimize read performance, at the expense of some write complexity and potential data anomalies if not managed carefully.",
    details: "Common in NoSQL databases and data warehousing to avoid complex joins."
  },
  {
    term: "DevOps",
    definition: "A set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.",
    details: "Emphasizes automation, collaboration, and monitoring."
  },
  {
    term: "Direct Exchange (RabbitMQ specific)",
    definition: "A type of exchange in RabbitMQ that routes messages to queues based on an exact match between the message's routing key and the binding key specified when the queue was bound to the exchange.",
    details: null
  },
  {
    term: "Directory-Based Sharding",
    definition: "A sharding strategy where a lookup table (directory or metadata service) maps shard keys (or ranges of keys) to the specific database shard where the corresponding data resides.",
    details: "Offers flexibility in mapping data to shards but the directory itself can become a bottleneck or single point of failure if not designed carefully."
  },
  {
    term: "Disaster Recovery (DR)",
    definition: "The process of preparing for and recovering from a disaster that affects IT systems and data. It involves strategies and plans to restore critical functions after a disruptive event.",
    details: "Multi-region deployments and data replication are key components of DR strategies."
  },
  {
    term: "Distributed Caches",
    definition: "External cache services (e.g., Redis, Memcached) running on separate servers, shared by multiple application instances or services.",
    details: "Highly scalable and ensures data consistency across instances but introduces network latency compared to local caches."
  },
  {
    term: "Distributed Denial of Service (DDoS)",
    definition: "A type of cyber attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet, typically by overwhelming the target with a flood of Internet traffic from multiple compromised computer systems (botnet).",
    details: null
  },
  {
    term: "Distributed Lock Manager",
    definition: "A system that provides distributed locking capabilities, allowing multiple processes or nodes in a distributed system to coordinate access to shared resources and prevent race conditions.",
    details: "Examples include ZooKeeper, etcd, or solutions built on Redis (like Redlock, with caveats)."
  },
  {
    term: "DNS (Domain Name System)",
    definition: "A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names (e.g., www.example.com) into machine-readable IP addresses. (Also known as Domain Name System).",
    details: "Plays a crucial role in web navigation and service discovery. CDNs and GSLB often leverage DNS for routing users to optimal servers."
  },
  {
    term: "DNS (Domain Name System) in CDNs",
    definition: "Directs users to the optimal CDN edge server, often using GeoDNS or latency-based routing to find the closest or best performing Point of Presence (PoP).",
    details: "This is a critical first step in how CDNs accelerate content delivery."
  },
  {
    term: "DNS Caching",
    definition: "The practice of storing DNS lookup results locally (e.g., by operating systems, browsers, or recursive DNS servers) for a period defined by the DNS record's Time-To-Live (TTL).",
    details: "Reduces DNS lookup latency and load on authoritative DNS servers, but can delay propagation of DNS changes if TTLs are long."
  },
  {
    term: "DNS Propagation",
    definition: "The time it takes for changes made to DNS records (e.g., updating an IP address for a domain) to be reflected across all DNS servers on the internet. This is influenced by DNS TTL values.",
    details: "Longer propagation times can delay failover or new service rollouts."
  },
  {
    term: "DNS TTL (Time-To-Live)",
    definition: "A setting for a DNS record that specifies how long a resolver is supposed to cache the DNS query before the query expires and a new one needs to be done.",
    details: "Shorter TTLs allow for faster propagation of DNS changes (e.g., for failover) but increase load on DNS servers. Longer TTLs reduce load but slow down updates."
  },
  {
    term: "DNS-based GSLB",
    definition: "Global Server Load Balancing (GSLB) implemented using DNS. The authoritative DNS server for a domain resolves client requests to different server IP addresses based on factors like client's geographic location (GeoDNS), server load, or data center health.",
    details: "A common technique for directing users to the nearest or best-performing data center."
  },
  {
    term: "DNS-based Load Balancing",
    definition: "A simple form of load balancing where DNS resolution returns different IP addresses for a domain in a round-robin fashion or based on other policies. Clients connect to the resolved IP.",
    details: "Limited by DNS caching and doesn't provide fine-grained health checks or session affinity like dedicated load balancers."
  },
  {
    term: "Docker",
    definition: "An open-source platform that automates the deployment, scaling, and management of applications by using OS-level virtualization to deliver software in packages called containers.",
    details: "Containers bundle application code with all its dependencies, ensuring consistency across environments."
  },
  {
    term: "Document Stores",
    definition: "A type of NoSQL database that stores data in documents, typically in JSON, BSON, or XML format. Each document can have a flexible schema.",
    details: "Examples include MongoDB and Couchbase. Well-suited for applications with evolving schemas or semi-structured data."
  },
  {
    term: "Drupal",
    definition: "A free and open-source content management system (CMS) written in PHP and distributed under the GNU General Public License.",
    details: "Often uses MySQL or PostgreSQL as its database backend."
  },
  {
    term: "Durability",
    definition: "A property of database transactions ensuring that once a transaction is committed, its changes will persist and survive any subsequent system failures (e.g., power outages, crashes). Part of the ACID properties.",
    details: "Achieved through mechanisms like write-ahead logging and data replication."
  },
  {
    term: "Edge Locations (PoPs)",
    definition: "Points of Presence (PoPs) in a Content Delivery Network (CDN) that are geographically distributed data centers housing cache servers. They are located closer to end-users to reduce latency.",
    details: null
  },
  {
    term: "Edge Server",
    definition: "A server in a Content Delivery Network (CDN) that is geographically close to users, responsible for caching and delivering content quickly.",
    details: null
  },
  {
    term: "Elasticsearch",
    definition: "A distributed, open-source search and analytics engine built on Apache Lucene. It provides a scalable solution for full-text search, log analytics, and real-time data analysis.",
    details: "Often used as part of the ELK Stack (Elasticsearch, Logstash, Kibana) for log management."
  },
  {
    term: "End-to-End Latency",
    definition: "The total time taken for a message or request from its production or initiation by the sender/client to its consumption or reception of a response by the receiver/client. Includes all intermediate steps like network hops, queueing time, and processing time.",
    details: "A critical performance metric for user-facing systems and real-time applications."
  },
  {
    term: "Entity Framework",
    definition: "An open-source object-relational mapper (ORM) for .NET. It enables .NET developers to work with relational data using domain-specific objects without having to focus on the underlying database tables and columns where this data is stored.",
    details: null
  },
  {
    term: "Envoy Proxy",
    definition: "An open-source edge and service proxy designed for cloud-native applications. Originally built at Lyft, it is now a CNCF graduated project.",
    details: "Often used as a sidecar proxy in service meshes like Istio due to its rich feature set for traffic management, observability, and security."
  },
  {
    term: "Error Rate",
    definition: "The percentage of requests or operations that result in errors, either from the system itself (e.g., server errors 5xx) or due to client issues (e.g., client errors 4xx).",
    details: "A key metric for monitoring system health and reliability."
  },
  {
    term: "etcd",
    definition: "A distributed, consistent key-value store used for shared configuration, service discovery, and scheduler coordination in distributed systems.",
    details: "Uses the Raft consensus algorithm to ensure strong consistency. Kubernetes uses etcd as its primary datastore."
  },
  {
    term: "Event Sourcing",
    definition: "An architectural pattern where the state of an application or entity is determined by a sequence of state-changing events. Instead of storing the current state directly, all events that modified the state are stored in chronological order.",
    details: "Provides a strong audit trail, allows reconstruction of past states, and facilitates debugging. Often used with CQRS and event-driven architectures."
  },
  {
    term: "Event-Driven Architecture",
    definition: "A software architecture paradigm promoting the production, detection, consumption of, and reaction to events. An event can be defined as 'a significant change in state'.",
    details: "Enables loose coupling between services and facilitates asynchronous communication, often using message queues or event streaming platforms like Kafka."
  },
  {
    term: "Eventual Consistency",
    definition: "A consistency model in distributed systems where, if no new updates are made to a given data item, all accesses to that item will eventually return the last updated value. However, reads shortly after a write might return stale data.",
    details: "Often chosen in systems that prioritize availability and partition tolerance (AP systems in CAP theorem) over strong consistency."
  },
  {
    term: "Exactly-Once Semantics",
    definition: "A message delivery guarantee ensuring that each message is delivered and processed by the consumer exactly one time. No messages are lost, and no messages are processed as duplicates.",
    details: "This is the strongest guarantee but often the most complex and resource-intensive to achieve, requiring coordination between broker, producer, and consumer."
  },
  {
    term: "Exchange (RabbitMQ specific)",
    definition: "In RabbitMQ, producers publish messages to an exchange, which then routes them to bound queues based on rules (exchange type) and bindings (routing keys).",
    details: "Types include Direct, Fanout, Topic, and Headers exchanges, providing flexible message routing capabilities."
  },
  {
    term: "Excessive Data Exposure",
    definition: "A security vulnerability where an API endpoint returns more data fields in a response than are actually needed by the client application for the current functionality. Part of the OWASP API Security Top 10.",
    details: "This can inadvertently expose sensitive information if the client doesn't filter it properly or if the data is intercepted."
  },
  {
    term: "F5 BIG-IP",
    definition: "A family of products from F5 Networks covering application delivery, security, performance, and availability. The BIG-IP Local Traffic Manager (LTM) is a well-known hardware and software load balancer.",
    details: null
  },
  {
    term: "Failover",
    definition: "The process of automatically switching to a redundant or standby server, system, or network upon the failure or abnormal termination of the previously active application, server, system, or network.",
    details: "Crucial for maintaining high availability and fault tolerance."
  },
  {
    term: "Fanout Exchange (RabbitMQ specific)",
    definition: "A type of exchange in RabbitMQ that routes messages to all queues that are bound to it, regardless of the routing key. It essentially broadcasts messages.",
    details: "Used for publish/subscribe scenarios where all subscribers need to receive every message."
  },
  {
    term: "Fan-out on write",
    definition: "A pattern where, upon a write operation (e.g., a user posting a new message), the system proactively delivers or pushes this update to all relevant recipients or caches (e.g., updating the timelines of all followers).",
    details: "Contrasts with fan-out on read, where recipients pull updates when they access the data. Fan-out on write can improve read latency but increases write load."
  },
  {
    term: "Fastly",
    definition: "A cloud computing services provider offering a content delivery network (CDN), edge compute platform, image optimization, security services (WAF, DDoS mitigation), and streaming solutions.",
    details: "Known for its real-time CDN capabilities and focus on developer control at the edge."
  },
  {
    term: "Fault Isolation",
    definition: "An architectural principle where system components are designed such that a failure in one component does not cascade and cause failures in other components.",
    details: "Microservices architectures aim to achieve fault isolation. Techniques include bulkheads, circuit breakers, and timeouts."
  },
  {
    term: "Fault Tolerance",
    definition: "The ability of a system to continue operating, possibly at a reduced level, rather than failing completely when some part of the system fails.",
    details: "Achieved through redundancy, error detection, and failover mechanisms."
  },
  {
    term: "FIFO (First-In, First-Out)",
    definition: "An eviction policy for caches or a processing order for queues where the items added first are the ones removed or processed first, regardless of access frequency or recency.",
    details: "Simple to implement but often not optimal for cache performance compared to LRU or LFU."
  },
  {
    term: "FIFO Queues (AWS SQS specific)",
    definition: "A type of queue in Amazon SQS that provides First-In, First-Out delivery and exactly-once processing of messages. Message order is strictly preserved within a message group.",
    details: "Useful for applications where the order of operations is critical, but they have lower throughput limits compared to SQS Standard Queues."
  },
  {
    term: "Fixed Window Counter (Rate Limiting)",
    definition: "A rate limiting algorithm that divides time into fixed windows (e.g., 1 minute). For each window, it counts the number of requests from a client. If the count exceeds a threshold, further requests in that window are rejected.",
    details: "Simple to implement but can lead to bursts of traffic at the window boundaries."
  },
  {
    term: "Floating IP",
    definition: "A virtual IP address that can be quickly reassigned from one server or network interface to another within the same network. Used in high availability setups to allow a standby server to take over the IP address of a failed primary server.",
    details: null
  },
  {
    term: "Functional Requirements",
    definition: "Define what a system is supposed to do, describing the specific behaviors, features, and functions of the system. They specify the tasks the system must perform.",
    details: "Examples: 'The system shall allow users to register an account,' 'The system shall allow users to search for products.'"
  },
  {
    term: "Full-Text Search",
    definition: "The capability of a search engine or database to search through the complete text content of documents or records, rather than just metadata or specific fields. It often includes features like relevance ranking, stemming, and support for complex queries.",
    details: "Databases like PostgreSQL (with tsvector) and search engines like Elasticsearch provide robust full-text search capabilities."
  },
  {
    term: "GeoDNS",
    definition: "A DNS service that resolves domain names to IP addresses based on the geographic location of the querying client. This allows users to be directed to servers or data centers closest to them, reducing latency.",
    details: "A common technique for implementing Global Server Load Balancing (GSLB)."
  },
  {
    term: "Geospatial Indexes",
    definition: "Specialized database indexes designed to optimize queries on geospatial data (e.g., points, lines, polygons representing geographic locations).",
    details: "Allow for efficient searching of data based on proximity or containment within geographic areas. Redis and PostgreSQL (with PostGIS) support geospatial indexing."
  },
  {
    term: "GIS (Geographic Information System)",
    definition: "A system designed to capture, store, manipulate, analyze, manage, and present all types of geographical data.",
    details: "PostGIS is a popular open-source extension for PostgreSQL that adds GIS capabilities."
  },
  {
    term: "Global Server Load Balancing (GSLB)",
    definition: "A method of distributing traffic to servers that are located in multiple geographic locations (data centers). Its primary goals are to improve application performance for users by directing them to the closest or best-performing data center, and to provide disaster recovery by redirecting traffic away from a failed data center.",
    details: "Common techniques include DNS-based GSLB and Anycast routing."
  },
  {
    term: "Google BigQuery",
    definition: "A fully managed, serverless data warehouse by Google Cloud that enables super-fast SQL queries using the processing power of Google's infrastructure. It's designed for large-scale data analytics.",
    details: null
  },
  {
    term: "Google Cloud Dataflow",
    definition: "A fully managed stream and batch data processing service by Google Cloud. It is used for building data pipelines for ETL, data analysis, and real-time computations.",
    details: "Based on Apache Beam, allowing for portable pipeline definitions."
  },
  {
    term: "Google Cloud Functions",
    definition: "A serverless execution environment for building and connecting cloud services on Google Cloud Platform. With Cloud Functions, you write simple, single-purpose functions that are attached to events emitted from your cloud infrastructure and services.",
    details: null
  },
  {
    term: "Google Cloud Load Balancing",
    definition: "A suite of managed load balancing services offered by Google Cloud Platform, providing global and regional load balancing for HTTP(S), TCP, and UDP traffic.",
    details: "Features include auto-scaling, health checks, and integration with other GCP services."
  },
  {
    term: "Google Cloud Pub/Sub",
    definition: "A globally distributed, scalable, and reliable real-time messaging service by Google Cloud. Supports push and pull delivery of messages, which are published to topics and delivered via subscriptions.",
    details: "Provides at-least-once delivery guarantee and integrates well with other Google Cloud services."
  },
  {
    term: "Google Spanner",
    definition: "A globally distributed, horizontally scalable, and strongly consistent relational database service built by Google. It combines the benefits of relational databases (ACID transactions, SQL) with NoSQL-like scalability.",
    details: "Provides features like external consistency and automatic sharding."
  },
  {
    term: "Graph Database",
    definition: "A type of NoSQL database that uses graph structures (nodes, edges, and properties) to represent and store data. Optimized for querying relationships between data points.",
    details: "Examples include Neo4j and Amazon Neptune. Well-suited for social networks, recommendation engines, and fraud detection."
  },
  {
    term: "GraphQL",
    definition: "A query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data. Clients request exactly the data they need via a single endpoint.",
    details: "Developed by Facebook to address over-fetching and under-fetching issues common with REST APIs."
  },
  {
    term: "gRPC (Google Remote Procedure Call)",
    definition: "A high-performance, open-source universal RPC (Remote Procedure Call) framework. Uses HTTP/2 for transport and Protocol Buffers as the interface description language.",
    details: "Excellent for internal microservice communication due to its efficiency and strong contract enforcement."
  },
  {
    term: "gRPC UI",
    definition: "A graphical user interface that allows developers to interact with gRPC services, similar to how Postman is used for REST APIs. It helps in exploring, testing, and debugging gRPC endpoints.",
    details: null
  },
  {
    term: "gRPC-Web",
    definition: "A JavaScript implementation of gRPC for browser clients. It allows web applications to directly communicate with gRPC services, typically through a proxy (like Envoy) that translates between gRPC-Web and standard gRPC.",
    details: null
  },
  {
    term: "grpcurl",
    definition: "A command-line tool that lets you interact with gRPC servers. It's like curl, but for gRPC. It can be used to list services and methods, call methods, and view responses.",
    details: null
  },
  {
    term: "Guava Cache",
    definition: "A local, in-memory caching library provided by Google's Guava libraries for Java. It offers features like size-based eviction, time-based expiration, and automatic loading of entries.",
    details: null
  },
  {
    term: "HAProxy",
    definition: "A free, open-source software that provides a high availability load balancer and proxy server for TCP and HTTP-based applications. It is known for its performance and reliability.",
    details: "Widely used for Layer 4 and Layer 7 load balancing."
  },
  {
    term: "Hardware Load Balancers",
    definition: "Dedicated physical appliances (hardware devices) specifically designed and optimized for load balancing tasks. Examples: F5 BIG-IP, Citrix ADC.",
    details: "Typically offer very high performance and advanced features but are expensive and less flexible than software solutions."
  },
  {
    term: "Hash-Based Sharding",
    definition: "A sharding strategy where a hash function is applied to a shard key (e.g., user ID). The output of the hash function determines which shard the data belongs to.",
    details: "Generally ensures even data distribution but can make range queries difficult."
  },
  {
    term: "HATEOAS (Hypermedia As The Engine Of Application State)",
    definition: "A constraint of the REST application architecture that distinguishes it from most other network application architectures. With HATEOAS, a client interacts with a network application entirely through hypermedia provided dynamically by application servers.",
    details: "Responses include links that guide the client on how to navigate the API and discover available actions."
  },
  {
    term: "HDFS (Hadoop Distributed File System)",
    definition: "A distributed file system designed to run on commodity hardware. It is highly fault-tolerant and is designed to be deployed on low-cost hardware. HDFS provides high-throughput access to application data and is suitable for applications that have large data sets.",
    details: "The primary storage system used by Hadoop applications."
  },
  {
    term: "Headers Exchange (RabbitMQ specific)",
    definition: "A type of exchange in RabbitMQ that routes messages based on matching header attributes in the message properties, rather than routing keys. Supports more complex routing logic.",
    details: null
  },
  {
    term: "Health Check",
    definition: "A regular probe (e.g., HTTP ping, TCP connect) that a load balancer or monitoring system performs to determine if a backend server or service is alive, responsive, and functioning correctly. Unhealthy servers are typically taken out of rotation or flagged for attention.",
    details: "Essential for ensuring traffic is only sent to operational servers and for triggering failover mechanisms."
  },
  {
    term: "Hibernate",
    definition: "An object-relational mapping (ORM) tool for the Java programming language. It provides a framework for mapping an object-oriented domain model to a traditional relational database.",
    details: null
  },
  {
    term: "High Availability (HA)",
    definition: "A characteristic of a system, which aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period. Achieved through redundancy, failover, and fault tolerance.",
    details: null
  },
  {
    term: "Horizontal Scaling (Scaling Out)",
    definition: "Adding more machines (nodes/servers) to a system to distribute the load. E.g., adding more web servers to a load balancer pool.",
    details: "Improves fault tolerance and can scale to very large capacities but increases management complexity."
  },
  {
    term: "HTTP (Hypertext Transfer Protocol)",
    definition: "An application protocol for distributed, collaborative, hypermedia information systems. It is the foundation of data communication for the World Wide Web.",
    details: "Defines methods like GET, POST, PUT, DELETE for interacting with resources."
  },
  {
    term: "HTTP Caching",
    definition: "The use of HTTP headers (like `Cache-Control`, `Expires`, `ETag`, `Last-Modified`) to control how web resources are cached by browsers and intermediary proxies (like CDNs).",
    details: "Leveraging HTTP caching effectively can significantly improve website performance and reduce server load."
  },
  {
    term: "HTTP Header Manipulation",
    definition: "The process by which a Layer 7 load balancer or proxy modifies HTTP headers in requests or responses. This can be used for adding, removing, or altering headers for various purposes like routing, security, or analytics.",
    details: null
  },
  {
    term: "HTTP Headers",
    definition: "Components of the header section of request and response messages in the Hypertext Transfer Protocol (HTTP). They define the operating parameters of an HTTP transaction.",
    details: "Examples include `Content-Type`, `Authorization`, `Cache-Control`, `User-Agent`."
  },
  {
    term: "HTTP Methods (Verbs)",
    definition: "A set of request methods to indicate the desired action to be performed for a given resource in HTTP. Common methods include GET (retrieve), POST (create/submit), PUT (update/replace), DELETE (remove), PATCH (partial update), HEAD (retrieve headers only), and OPTIONS (get communication options).",
    details: "These verbs are fundamental to RESTful API design."
  },
  {
    term: "HTTP Polling",
    definition: "A technique where a client repeatedly sends requests to a server at regular intervals to check for new data or updates. This can be inefficient due to many unnecessary requests if updates are infrequent.",
    details: "Often used as a simpler alternative to WebSockets or Server-Sent Events when real-time updates are needed but those technologies are not feasible."
  },
  {
    term: "HTTP Status Codes",
    definition: "Standardized three-digit codes issued by a server in response to a client's request made to the server, indicating the outcome of the request. Examples include 200 OK (success), 404 Not Found (resource not found), 500 Internal ServerError (server-side error).",
    details: "Crucial for clients to understand how to interpret API responses."
  },
  {
    term: "HTTP/1.1",
    definition: "A version of the Hypertext Transfer Protocol. It introduced features like persistent connections, pipelining, and chunked encoding, but can suffer from head-of-line blocking for multiple requests over a single connection.",
    details: null
  },
  {
    term: "HTTP/2",
    definition: "A major revision of the HTTP network protocol. Key features include request multiplexing over a single TCP connection, header compression (HPACK), and server push, leading to improved performance and reduced latency compared to HTTP/1.1.",
    details: "gRPC uses HTTP/2 as its transport protocol."
  },
  {
    term: "HTTP/3",
    definition: "The third major version of the Hypertext Transfer Protocol, which uses QUIC (a transport protocol built on UDP) instead of TCP. It aims to improve performance by solving TCP head-of-line blocking and offering faster connection establishment.",
    details: null
  },
  {
    term: "HTTPS (HTTP Secure)",
    definition: "An extension of the Hypertext Transfer Protocol (HTTP) for secure communication over a computer network. It is achieved by layering HTTP on top of the TLS/SSL protocol, thus adding security capabilities.",
    details: "Essential for protecting data confidentiality and integrity in transit."
  },
  {
    term: "HyperLogLogs",
    definition: "A probabilistic data structure used for estimating the cardinality (number of distinct elements) of a very large set with high accuracy using a small amount of memory.",
    details: "Redis supports HyperLogLog data structures."
  },
  {
    term: "Hypermedia",
    definition: "Text which is not constrained to be linear and which contains links to other text. In the context of HATEOAS, it refers to including links and forms in API responses to guide client interactions.",
    details: null
  },
  {
    term: "IaaS (Infrastructure as a Service)",
    definition: "A cloud computing model where a vendor provides users access to computing resources such as servers, storage, and networking. Users manage the operating systems, applications, and data.",
    details: "Examples include Amazon EC2, Google Compute Engine, and Azure Virtual Machines."
  },
  {
    term: "IAM (Identity and Access Management)",
    definition: "A framework of policies and technologies for ensuring that the right individuals have the appropriate access to technology resources. In cloud computing (e.g., AWS IAM), it manages users, groups, roles, and permissions.",
    details: null
  },
  {
    term: "Idempotency",
    definition: "An operation is idempotent if making the same request multiple times produces the same result and side effects as making it once. For example, a PUT request to update a resource is idempotent, as is a DELETE request.",
    details: "Idempotency is crucial for designing fault-tolerant systems where requests might be retried due to network issues or failures."
  },
  {
    term: "Idempotency Key",
    definition: "A unique key provided by the client in an API request (often in a header like `X-Idempotency-Key`) to ensure that if the same request is retried (e.g., due to network errors), it will not be processed multiple times by the server, thus preventing duplicate side-effects like creating multiple orders or processing a payment twice.",
    details: "The server stores the outcome of the first request associated with this key and returns that stored response for subsequent retries with the same key."
  },
  {
    term: "Index (Database)",
    definition: "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure. (Also known as Database Index).",
    details: "Indexes are crucial for optimizing query performance."
  },
  {
    term: "Indexing Strategies (Database)",
    definition: "The approach and techniques used to create and maintain indexes on database tables to optimize query performance. This includes choosing which columns to index, the type of index (e.g., B-tree, hash), and considering composite indexes.",
    details: "Effective indexing is critical for database performance but adds overhead to write operations."
  },
  {
    term: "InfluxDB",
    definition: "An open-source time series database (TSDB) developed by InfluxData. It is optimized for high-availability storage and retrieval of time series data in fields such as operations monitoring, application metrics, Internet of Things sensor data, and real-time analytics.",
    details: null
  },
  {
    term: "In-Memory Cache (Local)",
    definition: "Caching data within the main memory (RAM) of a single application instance. Examples: Ehcache, Guava Cache, ConcurrentHashMap.",
    details: "Provides extremely fast access but is limited by server RAM and not shared across instances."
  },
  {
    term: "InnoDB",
    definition: "A storage engine for MySQL and MariaDB. It provides ACID-compliant transactions, foreign key support, and crash recovery capabilities.",
    details: "It is typically the default storage engine for MySQL."
  },
  {
    term: "Input Validation",
    definition: "The process of ensuring that data input into a system meets predefined criteria for format, type, length, range, and content before it is processed or stored. This is a critical security measure to prevent vulnerabilities like injection attacks.",
    details: null
  },
  {
    term: "Interface Definition Language (IDL)",
    definition: "A language used to describe the interface of a software component, typically in a way that is independent of any specific programming language. Examples include Protocol Buffers (.proto files) for gRPC, or WSDL for SOAP APIs.",
    details: "IDLs enable communication between components written in different languages."
  },
  {
    term: "IOPS (Input/Output Operations Per Second)",
    definition: "A common performance measurement used to benchmark computer storage devices like hard disk drives (HDD), solid state drives (SSD), and storage area networks (SAN). It measures the number of read and write operations a device or system can perform per second.",
    details: "Crucial for transaction-heavy database workloads."
  },
  {
    term: "IP Address",
    definition: "A numerical label assigned to each device participating in a computer network that uses the Internet Protocol for communication. An IP address serves two main functions: host or network interface identification and location addressing.",
    details: null
  },
  {
    term: "IP Hash / Source IP Hash (Load Balancing)",
    definition: "A load balancing algorithm that calculates a hash based on the client's source IP address (and sometimes destination IP address) to determine which backend server receives the request. This ensures requests from the same client IP address are consistently routed to the same server.",
    details: "Provides session affinity but can lead to uneven load distribution if many clients share a NAT gateway."
  },
  {
    term: "Isolation",
    definition: "A property of database transactions ensuring that concurrent transactions are executed as if they were processed serially, one after another, rather than interfering with each other. This prevents issues like dirty reads, non-repeatable reads, and phantom reads. Part of the ACID properties.",
    details: "Databases achieve isolation through locking mechanisms and multi-version concurrency control (MVCC)."
  },
  {
    term: "Istio",
    definition: "An open-source service mesh that layers transparently onto existing distributed applications. It provides a way to control how microservices share data with one another, offering features like traffic management, security, and observability without requiring changes to the microservice code.",
    details: "Often uses Envoy as its sidecar proxy."
  },
  {
    term: "JanusGraph",
    definition: "An open-source, distributed graph database. It is optimized for storing and querying graphs containing billions of vertices and edges distributed across a multi-machine cluster.",
    details: "Supports various storage backends (like Cassandra, HBase) and indexing backends (like Elasticsearch, Solr)."
  },
  {
    term: "JavaScript Object Notation (JSON)",
    definition: "A lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999.",
    details: "Commonly used for API request/response payloads and configuration files."
  },
  {
    term: "JSONB",
    definition: "A binary representation of JSON data used in PostgreSQL. It stores JSON data in a decomposed binary format that is faster to process and allows for indexing of JSON fields.",
    details: "Offers significant performance advantages over storing JSON as text when querying or manipulating JSON data within PostgreSQL."
  },
  {
    term: "JSON Web Tokens (JWT)",
    definition: "A compact, URL-safe means of representing claims to be transferred between two parties. Often used for stateless authentication tokens in APIs. Contains a header, payload (claims), and signature.",
    details: "The signature ensures the token's integrity and authenticity."
  },
  {
    term: "Joomla",
    definition: "A free and open-source content management system (CMS) for publishing web content, developed by Open Source Matters, Inc. It is built on a model–view–controller web application framework that can be used independently of the CMS.",
    details: "Typically uses MySQL or PostgreSQL as its database."
  },
  {
    term: "Kafka Streams",
    definition: "A client library for building applications and microservices where the input and output data are stored in Apache Kafka clusters. It allows for distributed, real-time processing of event streams.",
    details: "Provides high-level abstractions like map, filter, join, and windowing operations on streams."
  },
  {
    term: "Key-Value Stores",
    definition: "A type of NoSQL database that stores data as a collection of key-value pairs. Each key is unique, and the value can be any type of data, from simple strings to complex objects.",
    details: "Examples include Redis and Memcached. Optimized for fast lookups by key."
  },
  {
    term: "KRaft (Kafka Raft)",
    definition: "A consensus protocol built into Apache Kafka that allows it to run without Apache ZooKeeper for metadata management and cluster coordination. This simplifies Kafka's architecture and operations.",
    details: "Introduced in later versions of Kafka as an alternative to ZooKeeper dependency."
  },
  {
    term: "Kubernetes",
    definition: "An open-source container orchestration system for automating software deployment, scaling, and management. It groups containers that make up an application into logical units for easy management and discovery.",
    details: null
  },
  {
    term: "LAMP Stack",
    definition: "An acronym for a popular open-source web service solution stack, consisting of Linux (operating system), Apache HTTP Server (web server), MySQL (database server), and PHP (programming language).",
    details: "Variations include LEMP (with Nginx instead of Apache)."
  },
  {
    term: "Last-Write-Wins (LWW)",
    definition: "A conflict resolution strategy used in distributed systems where, if multiple concurrent writes are made to the same data item, the write with the latest timestamp is chosen as the definitive version, and other writes are overridden.",
    details: "Simple to implement but can lead to lost updates if timestamps are not perfectly synchronized or if causality is important."
  },
  {
    term: "Latency",
    definition: "The delay before a transfer of data begins following an instruction for its transfer. In networking, it's the time it takes for a data packet to travel from one point to another. In system performance, it's often used to mean response time.",
    details: "Low latency is critical for user-facing applications and real-time systems."
  },
  {
    term: "Layer 4 (L4) Load Balancing",
    definition: "Operates at the transport layer (TCP/UDP) of the OSI model. Makes routing decisions based on source/destination IP addresses and ports. It doesn't inspect packet content.",
    details: "Generally faster than L7 load balancing due to simpler logic but offers less routing intelligence."
  },
  {
    term: "Layer 7 (L7) Load Balancing",
    definition: "Operates at the application layer (HTTP/HTTPS) of the OSI model. Can inspect content like HTTP headers, cookies, and URLs to make more intelligent routing decisions.",
    details: "Enables features like content-based routing, SSL termination, and cookie-based sticky sessions."
  },
  {
    term: "Leader Election",
    definition: "The process in distributed computing by which a single process is designated as the leader or coordinator of a group of processes. The leader is responsible for managing tasks, coordinating activities, or making decisions for the group.",
    details: "Consensus algorithms like Raft and Paxos include leader election mechanisms."
  },
  {
    term: "Leader-Follower Replication (Master-Slave)",
    definition: "A database replication model where one server (leader/master) handles all write operations. These writes are then replicated (usually asynchronously) to one or more follower/slave servers. Followers can handle read requests.",
    details: "Simplifies write consistency but the leader can be a bottleneck for writes and a single point of failure for write operations until a follower is promoted."
  },
  {
    term: "Leaky Bucket (Rate Limiting)",
    definition: "A rate limiting algorithm that processes requests at a fixed rate, similar to water leaking from a bucket at a constant speed. Incoming requests are added to a queue (the bucket). If the queue is full, new requests are discarded.",
    details: "Smooths out bursts of requests and ensures a steady processing rate."
  },
  {
    term: "Least Connections (Load Balancing)",
    definition: "A load balancing algorithm that directs new requests to the backend server that currently has the fewest active connections. This is a dynamic algorithm that adapts to current server load based on connection count.",
    details: "Helps prevent overloading individual servers, especially if connection times are variable."
  },
  {
    term: "Least Frequently Used (LFU)",
    definition: "A cache eviction policy that discards the items that have been accessed least frequently. Assumes that data accessed often in the past is likely to be accessed again.",
    details: "Can be effective for consistently popular items but may suffer from cache pollution if initial popularity doesn't last, and new items may be evicted too quickly."
  },
  {
    term: "Least Recently Used (LRU)",
    definition: "A cache eviction policy that discards the least recently accessed items first. Assumes that data accessed recently is likely to be accessed again soon.",
    details: "Generally good performance for many common access patterns but can perform poorly with cache scans."
  },
  {
    term: "Least Response Time (Load Balancing)",
    definition: "A load balancing algorithm that directs new requests to the server that currently exhibits the lowest average response time to recent health checks or actual processed requests. Some versions also factor in the number of active connections.",
    details: "Dynamically adapts to server performance fluctuations and can improve user-perceived latency."
  },
  {
    term: "LEMP Stack",
    definition: "An acronym for a popular open-source web service solution stack, consisting of Linux (operating system), Nginx (pronounced 'Engine-X', web server), MySQL/MariaDB (database server), and PHP/Python/Perl (programming language).",
    details: "Similar to LAMP, but uses Nginx instead of Apache."
  },
  {
    term: "Linkerd",
    definition: "An open-source service mesh for Kubernetes. It provides features like observability, reliability, and security for microservices without requiring changes to application code.",
    details: "Known for its simplicity, performance, and focus on security."
  },
  {
    term: "List-Based Sharding",
    definition: "A sharding strategy where data is partitioned based on a predefined list of values for a shard key. For example, specific regions or customer types could be mapped to different shards.",
    details: "Offers explicit control over data placement but can be less flexible if the list of values changes frequently."
  },
  {
    term: "Load Balancer",
    definition: "A device or software that distributes network or application traffic across multiple servers to improve responsiveness, availability, and scalability.",
    details: "Uses various algorithms and can operate at different network layers."
  },
  {
    term: "Load Balancing",
    definition: "Distributing incoming network or application traffic across multiple backend servers to improve performance, availability, and scalability.",
    details: "Uses various algorithms (e.g., Round Robin, Least Connections) and can operate at Layer 4 or Layer 7."
  },
  {
    term: "Load Leveling",
    definition: "A technique, often implemented using message queues, to smooth out bursts of traffic or workload by queuing requests. This prevents downstream systems from being overwhelmed during peak times and allows them to process tasks at a more consistent rate.",
    details: null
  },
  {
    term: "Local In-Memory Cache",
    definition: "Caching data within the main memory (RAM) of a single application instance. Examples: Ehcache, Guava Cache, ConcurrentHashMap.",
    details: "Provides extremely fast access but is limited by server RAM and not shared across instances."
  },
  {
    term: "Logging",
    definition: "The process of recording events, errors, and other operational information generated by a software application or system. Logs are essential for debugging, monitoring, auditing, and understanding system behavior.",
    details: null
  },
  {
    term: "Long Polling",
    definition: "A web application development pattern used to emulate server push behavior. The client sends an HTTP request to the server, and the server holds the request open until new data is available or a timeout occurs. Once data is sent or timeout happens, the client immediately sends another request.",
    details: "Reduces latency compared to regular polling but can be resource-intensive on the server."
  },
  {
    term: "Lua scripting",
    definition: "The ability to execute scripts written in the Lua programming language, often embedded within another system. Redis supports Lua scripting to perform complex atomic operations on the server side.",
    details: null
  },
  {
    term: "Maintainability",
    definition: "The ease with which a software system or component can be modified to correct faults, improve performance, or adapt to a changed environment. Key aspects include modularity, clear APIs, good documentation, and automation.",
    details: null
  },
  {
    term: "Man-in-the-Middle (MITM) Attacks",
    definition: "A type of cyberattack where the attacker secretly relays and possibly alters the communication between two parties who believe they are directly communicating with each other.",
    details: "HTTPS (TLS/SSL) is crucial for preventing MITM attacks by encrypting data in transit and verifying server identity."
  },
  {
    term: "MapReduce",
    definition: "A programming model and an associated implementation for processing and generating large data sets with a parallel, distributed algorithm on a cluster. A MapReduce program is composed of a Map() procedure that performs filtering and sorting, and a Reduce() procedure that performs a summary operation.",
    details: "A core component of early Hadoop ecosystems, though often supplemented or replaced by more modern engines like Apache Spark."
  },
  {
    term: "Master-Master Replication",
    definition: "A database replication model where multiple servers (masters) can accept write operations. Changes made on one master are replicated to other masters and their followers.",
    details: "Improves write availability and can lower write latency for geographically distributed applications, but introduces significant complexity in conflict resolution if the same data is modified concurrently on different masters."
  },
  {
    term: "Master-Slave Replication",
    definition: "A database replication model where one server (master/leader) handles all write operations. These writes are then replicated (usually asynchronously) to one or more slave/follower servers. Slaves can handle read requests.",
    details: "Simplifies write consistency but the master can be a bottleneck for writes and a single point of failure for write operations until a slave is promoted."
  },
  {
    term: "Mean Time Between Failures (MTBF)",
    definition: "A measure of the predicted elapsed time between inherent failures of a mechanical or electronic system, during normal system operation. It is a key indicator of system reliability.",
    details: null
  },
  {
    term: "Memcached",
    definition: "A general-purpose distributed memory caching system. It is often used to speed up dynamic database-driven websites by caching data and objects in RAM to reduce the number of times an external data source (such as a database or API) must be read.",
    details: "Known for its simplicity and speed for key-value caching. It is purely an in-memory store with no built-in persistence."
  },
  {
    term: "MPEG-DASH (Dynamic Adaptive Streaming over HTTP)",
    definition: "An adaptive bitrate streaming technique that enables high-quality streaming of media content over the Internet delivered from conventional HTTP web servers. Video content is broken into small segments, and the client adaptively requests segments of different quality based on network conditions.",
    details: null
  },
  {
    term: "Message Acknowledgement (Ack/Nack)",
    definition: "A signal sent by a message consumer to the message broker indicating that a message has been successfully processed (Ack) or failed processing (Nack). The broker uses this to decide whether to redeliver the message (on Nack or timeout) or remove it from the queue (on Ack).",
    details: "Crucial for implementing at-least-once or exactly-once delivery semantics."
  },
  {
    term: "Message Broker",
    definition: "An intermediary computer program module that translates a message from the formal messaging protocol of the sender to the formal messaging protocol of the receiver. Examples include RabbitMQ, Apache Kafka.",
    details: "Manages the storage and routing of messages between producers and consumers."
  },
  {
    term: "Message Durability",
    definition: "Ensures that messages in a messaging system are not lost in case of broker failure. Achieved through persistence to disk and replication across multiple broker nodes.",
    details: "Essential for applications where message loss is unacceptable."
  },
  {
    term: "Message Ordering",
    definition: "Ensuring that messages are processed in the order they were sent. Can be strict (FIFO) or grouped (e.g., Kafka messages with the same key go to the same partition, preserving order within that partition).",
    details: "Important for workflows where the sequence of operations matters."
  },
  {
    term: "Message Queue",
    definition: "A component in messaging systems that stores messages produced by senders (producers) until they are retrieved and processed by receivers (consumers). Enables asynchronous communication and decoupling of services.",
    details: "Examples include RabbitMQ, Apache Kafka, AWS SQS."
  },
  {
    term: "Metrics",
    definition: "Quantitative measurements used to track and assess the status, performance, and health of a system. Examples include latency, throughput, error rate, and resource utilization.",
    details: "Essential for monitoring, alerting, and capacity planning."
  },
  {
    term: "Microservice",
    definition: "A small, autonomous service in a microservices architecture, typically focused on a specific business capability. It can be developed, deployed, and scaled independently.",
    details: null
  },
  {
    term: "Microservices Architecture",
    definition: "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain. Each service is self-contained and can be deployed, scaled, and managed independently.",
    details: "Promotes agility, fault isolation, and technology diversity but introduces operational complexity."
  },
  {
    term: "Mobile Cache",
    definition: "Caching data directly within a mobile application on the user's device (e.g., smartphone or tablet). This can include caching API responses, images, user preferences, or other data to improve performance and enable offline access.",
    details: "Subject to device storage limitations and requires strategies for cache invalidation and data synchronization."
  },
  {
    term: "Modularity",
    definition: "The degree to which a system's components may be separated and recombined. A modular system is divided into smaller, independent modules that can be developed, tested, and maintained separately.",
    details: "Improves maintainability, reusability, and allows for parallel development."
  },
  {
    term: "MongoDB",
    definition: "A popular NoSQL document database that stores data in flexible, JSON-like documents (BSON). It supports ad-hoc queries, indexing, and replica sets for high availability and sharding for horizontal scalability.",
    details: null
  },
  {
    term: "Monitoring",
    definition: "The process of collecting, processing, analyzing, and displaying real-time quantitative data about a system's performance, availability, and health. This includes tracking metrics, logs, and traces.",
    details: "Essential for understanding system behavior, detecting issues, and ensuring operational stability."
  },
  {
    term: "Monolithic Architecture",
    definition: "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process.",
    details: "Simpler to develop and deploy initially but can become difficult to scale, maintain, and update as the application grows."
  },
  {
    term: "Monthly Active Users (MAU)",
    definition: "A metric that measures the number of unique users who engage with a product or service within a month.",
    details: "Often used alongside DAU to understand user engagement trends."
  },
  {
    term: "MQTT (Message Queuing Telemetry Transport)",
    definition: "A lightweight, publish-subscribe network protocol that transports messages between devices. It is designed for connections with remote locations where a 'small code footprint' is required or the network bandwidth is limited.",
    details: "Commonly used in IoT (Internet of Things) applications. RabbitMQ supports MQTT via a plugin."
  },
  {
    term: "Multi-Leader Replication (Master-Master)",
    definition: "A database replication model where multiple servers (leaders/masters) can accept write operations. Changes made on one leader are replicated to other leaders and their followers.",
    details: "Improves write availability and can lower write latency for geographically distributed applications, but introduces significant complexity in conflict resolution if the same data is modified concurrently on different masters."
  },
  {
    term: "Multiplexing (Request Multiplexing)",
    definition: "A technique where multiple logical streams of data (e.g., multiple HTTP requests or responses) are combined and transmitted over a single physical connection (e.g., a single TCP connection in HTTP/2).",
    details: "Reduces connection overhead and improves network utilization, a key feature of HTTP/2."
  },
  {
    term: "Multi-Version Concurrency Control (MVCC)",
    definition: "A concurrency control method used by some database management systems to provide concurrent access to the database and to avoid conflicts between readers and writers. Each transaction sees a snapshot of data as it was at a particular point in time.",
    details: "Allows readers to continue accessing data without being blocked by writers. Used in databases like PostgreSQL and InnoDB (MySQL)."
  },
  {
    term: "MySQL",
    definition: "A popular open-source relational database management system (RDBMS). It is widely used in web applications and is a common component of the LAMP/LEMP stack.",
    details: "Supports various storage engines, with InnoDB being the default for ACID compliance and transactional support."
  },
  {
    term: "N+1 Query Problem",
    definition: "An anti-pattern in data retrieval where an application makes one initial query to fetch a list of items, and then makes N additional queries (one for each item in the list) to fetch related data for those items. This results in excessive database calls and poor performance.",
    details: "Common in ORMs if not handled carefully. Techniques like eager loading, batching (e.g., GraphQL DataLoader), or joining data in the initial query can solve this."
  },
  {
    term: "NAT Gateway (Network Address Translation Gateway)",
    definition: "A service or device that enables instances in a private network to connect to the internet or other services, but prevents the internet from initiating a connection with those instances. It translates private IP addresses to a public IP address (or a pool of them).",
    details: "If many clients are behind a single NAT gateway, they will appear to have the same source IP, which can affect IP Hash load balancing."
  },
  {
    term: "Neo4j",
    definition: "A popular native graph database that stores data as nodes and relationships. It is optimized for querying and traversing graph structures and is ACID compliant.",
    details: "Often used for social networks, recommendation engines, and fraud detection."
  },
  {
    term: "Network Latency",
    definition: "The time it takes for a data packet to travel from its source to its destination across a network. This is a component of overall system latency.",
    details: "Influenced by distance, network congestion, and the number of hops."
  },
  {
    term: "Networking & Content Delivery Networks (CDN)",
    definition: "The study and application of computer networks, protocols (like TCP/IP, HTTP), and Content Delivery Networks (CDNs) to ensure efficient, reliable, and performant communication and content distribution in distributed systems.",
    details: "Key concepts include latency, bandwidth, DNS, and caching strategies at the edge."
  },
  {
    term: "NewSQL",
    definition: "A class of modern relational databases that aim to provide the scalability of NoSQL systems while maintaining the ACID guarantees of traditional SQL databases. Examples include Google Spanner and CockroachDB.",
    details: "Often designed for distributed environments and horizontal scalability."
  },
  {
    term: "Nginx",
    definition: "A high-performance open-source web server, reverse proxy, load balancer, and HTTP cache. Known for its stability, rich feature set, and low resource consumption.",
    details: "Widely used for serving static content, terminating SSL, and as a software load balancer."
  },
  {
    term: "Non-Functional Requirements (NFRs)",
    definition: "Define how a system is supposed to be, describing the qualities or constraints of the system rather than specific behaviors. They specify criteria that can be used to judge the operation of a system, rather than specific behaviors.",
    details: "Examples include performance (latency, throughput), scalability, availability, reliability, maintainability, security, and cost-effectiveness."
  },
  {
    term: "NoSQL (Not Only SQL)",
    definition: "A broad category of database management systems that differ from traditional relational databases (RDBMS) in various ways, often providing more flexibility in schema design and horizontal scalability. They are not primarily based on the relational model.",
    details: "Includes types like document stores (MongoDB), key-value stores (Redis), wide-column stores (Cassandra), and graph databases (Neo4j)."
  },
  {
    term: "N-tier Architecture",
    definition: "A client-server architecture in which presentation, application processing, and data management functions are physically or logically separated into distinct layers (tiers). Common examples include 2-tier, 3-tier, and N-tier.",
    details: "Promotes modularity and separation of concerns."
  },
  {
    term: "OAuth",
    definition: "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.",
    details: "OAuth 2.0 is the current version."
  },
  {
    term: "OAuth 2.0",
    definition: "An authorization framework that enables third-party applications to access web resources on behalf of a user, without exposing user credentials. Defines roles like Resource Owner, Client, Authorization Server, Resource Server, and grant types (e.g., Authorization Code Grant, Client Credentials Grant).",
    details: "The standard for delegated authorization on the web."
  },
  {
    term: "Object-Relational Mapping (ORM)",
    definition: "A programming technique for converting data between incompatible type systems using object-oriented programming languages. It allows developers to work with database data as objects in their application code, abstracting away SQL queries.",
    details: "Examples include SQLAlchemy (Python), Hibernate (Java), and Entity Framework (.NET)."
  },
  {
    term: "Offset",
    definition: "In Apache Kafka, a sequential ID assigned to each message within a partition of a topic. Consumers use offsets to track their current read position in each partition.",
    details: null
  },
  {
    term: "Offset Pagination (Page-Based)",
    definition: "A pagination technique where the client requests a specific page number and page size (e.g., `/items?page=2&limit=20`). The server skips `offset` (or `(page-1)*limit`) items and returns the next `limit` items from the database.",
    details: "Simple to implement but can be inefficient for large datasets (deep pagination problem) and prone to data consistency issues if items are frequently added or removed."
  },
  {
    term: "OLAP (Online Analytical Processing)",
    definition: "A category of software tools that provide analysis of data for business intelligence purposes. OLAP systems are characterized by their ability to perform complex analytical queries, including aggregations, slicing, and dicing of data, often on large historical datasets.",
    details: "Contrasts with OLTP (Online Transaction Processing), which focuses on day-to-day operational transactions."
  },
  {
    term: "OLTP (Online Transaction Processing)",
    definition: "A class of software programs capable of supporting transaction-oriented applications on the Internet. Typically, OLTP systems are used for order entry, financial transactions, customer relationship management (CRM), and retail sales.",
    details: "Characterized by a large number of short, atomic transactions and prioritizes fast query processing, data integrity, and high concurrency."
  },
  {
    term: "OpenAPI Specification (Swagger)",
    definition: "A standard, language-agnostic interface description for RESTful APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or network traffic inspection. (Also known as Swagger).",
    details: "Often used to generate API documentation, client SDKs, and server stubs."
  },
  {
    term: "Operational Considerations",
    definition: "Aspects of system design related to the ongoing operation, maintenance, monitoring, and management of the system once it is deployed. This includes logging, alerting, deployment strategies, and disaster recovery.",
    details: null
  },
  {
    term: "Oracle Database",
    definition: "A multi-model relational database management system produced and marketed by Oracle Corporation. It is a widely used commercial RDBMS.",
    details: null
  },
  {
    term: "Origin Offload",
    definition: "The reduction in traffic (requests and bandwidth) that the origin server has to handle due to a Content Delivery Network (CDN) or other caching layers serving content to users directly from the cache.",
    details: "A key metric for measuring CDN effectiveness."
  },
  {
    term: "Origin Server",
    definition: "The primary server or set of servers where the original, authoritative version of content or data is stored. In a CDN setup, edge servers fetch content from the origin server during a cache miss.",
    details: null
  },
  {
    term: "Over-fetching",
    definition: "A situation in API design, common with traditional REST APIs, where an API endpoint returns more data than the client actually needs for a particular view or operation. This wastes bandwidth and processing time.",
    details: "GraphQL aims to solve over-fetching by allowing clients to request only the specific data fields they require."
  },
  {
    term: "OWASP API Security Top 10",
    definition: "A list of the most critical security risks to APIs identified by the Open Web Application Security Project (OWASP). Includes issues like Broken Object Level Authorization, Broken User Authentication, Excessive Data Exposure, etc.",
    details: "Provides a valuable checklist for developers and security professionals to secure APIs."
  },
  {
    term: "P95/P99 Latency",
    definition: "Percentile latencies that measure the response time for 95% or 99% of requests. For example, P99 latency of 200ms means 99% of requests completed in 200ms or less, while 1% took longer.",
    details: "Often more meaningful than average latency for understanding worst-case performance and user experience."
  },
  {
    term: "PaaS (Platform as a Service)",
    definition: "A cloud computing model where a vendor provides a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure typically associated with developing and launching an app.",
    details: "Examples include AWS Elastic Beanstalk, Heroku, and Google App Engine."
  },
  {
    term: "Pagination",
    definition: "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses or UI display. Common methods include offset-based and cursor-based pagination.",
    details: "Essential for handling large result sets efficiently."
  },
  {
    term: "Partition Tolerance",
    definition: "The ability of a distributed system to continue operating despite network partitions (communication breakdowns between nodes). This is one of the three guarantees in the CAP Theorem.",
    details: "Generally considered a non-negotiable characteristic for most distributed systems."
  },
  {
    term: "Paxos",
    definition: "A family of protocols for solving consensus in a network of unreliable processors. Paxos ensures that a single value is chosen among a group of participants, and that the choice is final.",
    details: "Known for its correctness but also its complexity to understand and implement. Raft is a more understandable alternative."
  },
  {
    term: "Peer-to-Peer Replication",
    definition: "A database replication model where all nodes in a cluster are considered peers and can accept writes. Changes are propagated to other nodes in the cluster. This is similar to multi-master replication.",
    details: "Requires mechanisms for conflict resolution if the same data is modified concurrently on different peers."
  },
  {
    term: "Performance",
    definition: "A measure of how quickly and efficiently a system can respond to requests and process workloads. Key metrics include latency (response time) and throughput (requests per second).",
    details: null
  },
  {
    term: "Performance Under Load",
    definition: "How system performance (latency, throughput, error rate) behaves as the load (requests, users, data volume) increases.",
    details: "Monitoring this is crucial for understanding scalability and identifying bottlenecks."
  },
  {
    term: "Persistent Cache",
    definition: "A cache that stores its data on a persistent storage medium (like SSD or disk) in addition to or instead of RAM. This allows the cache to survive restarts or failures without losing all its data.",
    details: "Redis offers persistence options (RDB snapshots, AOF logs) to act as a persistent cache or database."
  },
  {
    term: "PgBouncer",
    definition: "A lightweight connection pooler for PostgreSQL. It sits between applications and PostgreSQL servers, managing a pool of database connections to reduce the overhead of establishing new connections for each request and to limit the total number of concurrent connections to the database.",
    details: null
  },
  {
    term: "Point-to-Point Messaging",
    definition: "A messaging pattern where a message is sent by a producer to a specific queue and is then delivered to a single consumer that is listening to that queue. This ensures that each message is processed by only one receiver.",
    details: "If multiple consumers listen to the same queue, they typically compete for messages (Competing Consumers pattern)."
  },
  {
    term: "Polyglot Persistence",
    definition: "The practice of using multiple database technologies within a single application or system, selecting the most appropriate database for each specific job, service, or data type.",
    details: "Common in microservices architectures where each service can choose its own optimal data store (e.g., relational DB for transactions, document DB for catalogs, graph DB for recommendations)."
  },
  {
    term: "PostGIS",
    definition: "An open-source software program that adds support for geographic objects to the PostgreSQL object-relational database. PostGIS follows the Simple Features for SQL specification from the Open Geospatial Consortium (OGC).",
    details: "Enables PostgreSQL to store and query geospatial data like points, lines, and polygons."
  },
  {
    term: "PostgreSQL",
    definition: "A powerful, open-source object-relational database system known for its reliability, feature robustness, and performance. It supports SQL, JSON, and has strong ACID compliance.",
    details: "Offers advanced features like MVCC, extensibility (custom types, functions), and extensions like PostGIS for geospatial data."
  },
  {
    term: "Priority Queue",
    definition: "A type of queue where messages are assigned a priority, and the message broker attempts to deliver higher-priority messages before lower-priority ones, even if the lower-priority messages were added to the queue earlier.",
    details: "Not all message brokers support priority queues natively. Useful for processing urgent tasks before less critical ones."
  },
  {
    term: "Probabilistic Early Recomputation",
    definition: "A technique to mitigate cache stampedes where, instead of strict TTL expiry, a small percentage of requests for a cached item may trigger its regeneration slightly before its actual expiry time. This helps stagger the load of recomputing popular items.",
    details: null
  },
  {
    term: "Producer (Publisher)",
    definition: "An application component that creates and sends messages to a message queue or topic. (Also known as Publisher).",
    details: null
  },
  {
    term: "Prometheus",
    definition: "An open-source systems monitoring and alerting toolkit originally built at SoundCloud. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true.",
    details: "Widely used for monitoring cloud-native applications and infrastructure, often integrated with Grafana for visualization."
  },
  {
    term: "Protocol Buffers (Protobuf)",
    definition: "A language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. Developed by Google.",
    details: "Often used as the interface definition language (IDL) and serialization format for gRPC."
  },
  {
    term: "Proxy Servers",
    definition: "An intermediary server that acts as a gateway between a client and other servers. It can be used for various purposes, including load balancing, caching, security (filtering traffic), or providing anonymity.",
    details: "Reverse proxies sit in front of backend servers, while forward proxies are used by clients to access the internet."
  },
  {
    term: "Publish-Subscribe",
    definition: "A messaging pattern where publishers categorize messages into topics without specific knowledge of which subscribers will receive them. Subscribers express interest in one or more topics and receive messages published to those topics, enabling decoupled, many-to-many communication. (Also known as Pub/Sub).",
    details: "This pattern is fundamental to event-driven architectures, allowing for scalable and resilient systems as producers and consumers are independent."
  },
  {
    term: "QPS (Queries Per Second)",
    definition: "A metric that measures the number of queries or requests a system (e.g., database, API, web server) handles per second. (Also known as RPS - Requests Per Second).",
    details: "A key indicator of system load and throughput capacity."
  },
  {
    term: "Queue",
    definition: "A data structure that stores messages or tasks in a sequence, typically processed in a First-In, First-Out (FIFO) manner. Used in messaging systems for point-to-point communication.",
    details: null
  },
  {
    term: "Queue Depth/Lag",
    definition: "The number of messages currently waiting in a message queue to be processed by consumers. High queue depth can indicate that consumers are not keeping up with the rate of message production, potentially leading to increased latency or system overload.",
    details: "Monitoring queue depth is important for understanding system load and identifying consumer performance issues."
  },
  {
    term: "QUIC (Quick UDP Internet Connections)",
    definition: "A general-purpose transport layer network protocol initially designed by Google. It is built on top of UDP and aims to reduce latency compared to TCP, especially for connection establishment and multiplexing streams.",
    details: "HTTP/3 uses QUIC as its underlying transport protocol."
  },
  {
    term: "Quorum (Reads/Writes)",
    definition: "In distributed systems, a mechanism to ensure consistency by requiring operations (reads or writes) to be acknowledged by a minimum number (a quorum) of nodes before being considered successful. Typically, if N is the number of replicas, W is the write quorum, and R is the read quorum, then W + R > N ensures strong consistency.",
    details: "Allows tuning between consistency, availability, and latency."
  },
  {
    term: "RabbitMQ",
    definition: "An open-source message broker that implements the Advanced Message Queuing Protocol (AMQP) and supports other protocols like MQTT and STOMP. Known for flexible routing, reliability features, and a mature ecosystem.",
    details: "Used for task queues, RPC-style messaging, and complex event routing."
  },
  {
    term: "Raft Consensus Algorithm",
    definition: "A consensus algorithm designed as an alternative to Paxos, with a focus on understandability. It ensures that a replicated log (state machine) remains consistent across multiple servers in a distributed system, even in the presence of failures. It achieves this through leader election, log replication, and safety mechanisms.",
    details: "Used in systems like etcd and Consul for service discovery and configuration management."
  },
  {
    term: "Random (Load Balancing)",
    definition: "A load balancing algorithm that distributes requests to backend servers purely randomly. No tracking of server state or load is involved.",
    details: "Extremely simple with minimal overhead, but distribution can be uneven and it doesn't consider server health or capacity."
  },
  {
    term: "Random Replacement (RR)",
    definition: "A cache eviction policy that randomly selects an item to discard when the cache needs to make space. It does not consider access history, frequency, or age.",
    details: "Simple to implement with low overhead but generally offers suboptimal performance compared to LRU or LFU."
  },
  {
    term: "Range-Based Sharding",
    definition: "A sharding strategy where data is partitioned based on a continuous range of values of a shard key. For example, User IDs 1-1000 on Shard A, 1001-2000 on Shard B, and so on.",
    details: "Makes range queries efficient but can lead to hot spots if data distribution is uneven within ranges."
  },
  {
    term: "Rate Limiting",
    definition: "The practice of restricting the number of API requests or operations a client or user can make within a specific time window. This is done to prevent abuse, ensure fair usage, and protect backend systems from overload.",
    details: "Common algorithms include Token Bucket, Leaky Bucket, Fixed Window Counter, and Sliding Window Log/Counter."
  },
  {
    term: "Rate Limiting Algorithms",
    definition: "Strategies used to implement rate limiting. Common algorithms include Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log, and Sliding Window Counter.",
    details: "The choice of algorithm depends on the specific requirements for burst handling and smoothness of traffic."
  },
  {
    term: "RDB (Redis Database Backup)",
    definition: "A persistence mechanism in Redis where snapshots of the in-memory dataset are saved to disk at specified intervals or on demand. These snapshots are point-in-time backups.",
    details: "Faster for restores compared to AOF but can result in some data loss between snapshots if Redis crashes."
  },
  {
    term: "RDBMS (Relational Database Management System)",
    definition: "A database management system based on the relational model, where data is organized into tables with rows and columns, and relationships between tables are defined using keys. SQL is the standard language for interacting with RDBMSs.",
    details: "Examples include MySQL, PostgreSQL, Oracle Database, and SQL Server."
  },
  {
    term: "Read Replicas",
    definition: "Copies of a primary database that are used to serve read-only queries. Data from the primary database is replicated (often asynchronously) to these replicas. This offloads read traffic from the primary, improving read throughput and overall system performance.",
    details: "Commonly used to scale read-heavy relational databases. The primary server still handles all write operations."
  },
  {
    term: "Read-Through Cache",
    definition: "A caching pattern where, on a cache miss, the cache itself is responsible for fetching the data from the underlying data store (e.g., database), storing it, and then returning it to the application. The application interacts only with the cache for reads.",
    details: "Simplifies application logic as it doesn't need to handle cache misses directly. Often used with Cache-Aside where the application handles the miss."
  },
  {
    term: "Recovery Point Objective (RPO)",
    definition: "The maximum acceptable amount of data loss an organization can tolerate, measured in time (e.g., seconds, minutes, hours). It dictates how frequently data backups or replication must occur.",
    details: "A critical metric in disaster recovery planning."
  },
  {
    term: "Recovery Time Objective (RTO)",
    definition: "The targeted duration of time within which a business process must be restored after a disaster or disruption in order to avoid unacceptable consequences associated with a break in business continuity.",
    details: "A critical metric in disaster recovery planning, indicating how quickly a system must be back online."
  },
  {
    term: "Redis",
    definition: "An open-source, in-memory data structure store, used as a database, cache, and message broker. It supports various data structures like strings, hashes, lists, sets, sorted sets, streams, and more.",
    details: "Known for its high performance, versatility, and features like persistence, replication, and Lua scripting."
  },
  {
    term: "Redis Cluster",
    definition: "The official sharding solution for Redis, allowing data to be distributed across multiple Redis nodes. Provides horizontal scalability and improved fault tolerance.",
    details: null
  },
  {
    term: "Redis Persistence",
    definition: "Mechanisms in Redis to save the in-memory dataset to disk, allowing data to survive restarts or failures. Options include RDB (snapshots) and AOF (Append Only File).",
    details: null
  },
  {
    term: "Redis Sentinel",
    definition: "A high availability solution for Redis that provides monitoring, notification, and automatic failover for Redis master-slave setups. If a master node fails, Sentinel promotes a slave to become the new master.",
    details: null
  },
  {
    term: "Redis Streams",
    definition: "An append-only log-like data structure in Redis that allows for storing and processing streams of messages or events. Supports consumer groups for distributed processing and message acknowledgements.",
    details: "Can be used as a lightweight message broker or for capturing time-series data."
  },
  {
    term: "Redundancy",
    definition: "The duplication of critical components or functions of a system with the intention of increasing reliability and fault tolerance. If one component fails, a redundant component can take over.",
    details: null
  },
  {
    term: "Relational Database",
    definition: "A database that stores and provides access to data points that are related to one another. Relational databases are based on the relational model, an intuitive, straightforward way of representing data in tables.",
    details: "Commonly use SQL for querying and maintain ACID properties. Examples: MySQL, PostgreSQL."
  },
  {
    term: "Reliability",
    definition: "The ability of a system or component to perform its required functions under stated conditions for a specified period of time. Often measured by Mean Time Between Failures (MTBF).",
    details: "Achieved through fault tolerance, redundancy, and robust error handling."
  },
  {
    term: "Replication",
    definition: "The process of creating and maintaining multiple copies of data on different database servers or storage systems. Used for high availability, fault tolerance, disaster recovery, and scaling read operations.",
    details: "Can be synchronous or asynchronous. Common patterns include master-slave, master-master, and peer-to-peer replication."
  },
  {
    term: "Replication Lag",
    definition: "The delay between a write operation occurring on a primary database server and that write being successfully replicated to and applied on a replica server. This means replicas might serve slightly stale data.",
    details: "A common consideration in asynchronously replicated systems. Monitoring replication lag is important for consistency-sensitive applications."
  },
  {
    term: "Request Coalescing",
    definition: "A technique to mitigate the Thundering Herd problem. When multiple concurrent requests for the same cache-missed item arrive, only one request is allowed to proceed to the origin server to fetch the data. Other requests wait for the first one to populate the cache, then read from it.",
    details: "Prevents redundant fetching and reduces load on the origin."
  },
  {
    term: "Request/Reply (RPC over Messaging)",
    definition: "A messaging pattern where a sender (requester) sends a message and expects a response from the receiver. Often implemented using a pair of queues: one for requests and one for replies, with a Correlation ID to match requests to responses.",
    details: "Allows for asynchronous execution of remote procedure calls."
  },
  {
    term: "Requests Per Second (RPS)",
    definition: "A metric that measures the number of requests a system (e.g., API, web server, load balancer) handles or processes per second. (Also known as QPS - Queries Per Second).",
    details: "A key indicator of system load and throughput capacity."
  },
  {
    term: "Resilient Systems",
    definition: "Systems designed to withstand and recover quickly from failures or disruptions, maintaining an acceptable level of service. Resilience involves fault tolerance, redundancy, and effective recovery mechanisms.",
    details: null
  },
  {
    term: "Resource Owner",
    definition: "In OAuth 2.0, an entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user.",
    details: null
  },
  {
    term: "Resource Server",
    definition: "In OAuth 2.0, the server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.",
    details: null
  },
  {
    term: "Resource Utilization (%)",
    definition: "The percentage of available resources (CPU, memory, network, disk I/O) being used by a system or component. High utilization can indicate a bottleneck; low utilization might mean over-provisioning.",
    details: "Monitoring resource utilization is crucial for capacity planning and performance optimization."
  },
  {
    term: "REST (Representational State Transfer)",
    definition: "An architectural style for designing networked applications, based on HTTP methods (GET, POST, PUT, DELETE), URIs for resources, and stateless communication. Typically uses JSON or XML for data exchange.",
    details: "Emphasizes principles like statelessness, uniform interface, and cacheability."
  },
  {
    term: "RESTful APIs",
    definition: "APIs that adhere to the principles and constraints of the REST (Representational State Transfer) architectural style.",
    details: null
  },
  {
    term: "Reverse Proxy",
    definition: "A type of proxy server that retrieves resources on behalf of a client from one or more backend servers. It sits in front of backend servers and forwards client requests to them. Common uses include load balancing, SSL termination, caching, and security.",
    details: "Nginx and HAProxy are often used as reverse proxies."
  },
  {
    term: "Round Robin (Load Balancing)",
    definition: "A basic load balancing algorithm that distributes incoming requests sequentially to each server in a pool, in a cyclical order.",
    details: "Simple to implement but does not account for varying server capacities or current load."
  },
  {
    term: "RPC (Remote Procedure Call)",
    definition: "A protocol that allows a program on one computer to execute a procedure (subroutine) in another address space (commonly on another computer on a shared network) without the programmer explicitly coding the details for this remote interaction.",
    details: "gRPC is a modern implementation of RPC."
  },
  {
    term: "SaaS (Software as a Service)",
    definition: "A software distribution model in which a third-party provider hosts applications and makes them available to customers over the Internet. Users typically access SaaS applications through a web browser or mobile app.",
    details: "Examples include Salesforce, Gmail, and Dropbox."
  },
  {
    term: "Saga Pattern",
    definition: "A design pattern for managing data consistency across microservices in distributed transactions. A saga is a sequence of local transactions. If one transaction fails, compensating transactions are executed to undo preceding work.",
    details: "Helps maintain eventual consistency without using complex distributed ACID transactions. Can be implemented via choreography (events) or orchestration (coordinator)."
  },
  {
    term: "Scalability",
    definition: "The ability of a system to handle a growing amount of work by adding resources, either hardware (e.g., servers) or software. It ensures that the system can maintain performance and availability as load increases.",
    details: "Key strategies include horizontal scaling (adding more machines) and vertical scaling (increasing resources of existing machines)."
  },
  {
    term: "Scalability Factor",
    definition: "A measure of how much a system's performance improves when resources are added. E.g., if doubling resources doubles throughput, the scalability factor is 2 (linear scalability).",
    details: null
  },
  {
    term: "Scalable Systems",
    definition: "Systems designed to efficiently handle increasing amounts of load (users, data, transactions) by adding resources, while maintaining performance and availability.",
    details: null
  },
  {
    term: "Schema Evolution",
    definition: "The process of managing changes to the structure or schema of data (e.g., database tables, message formats, API payloads) over time as application requirements evolve, while ensuring compatibility with existing data and applications.",
    details: "Important in event streaming systems like Kafka and for API versioning."
  },
  {
    term: "Schema Flexibility",
    definition: "The ability of a database or data store to accommodate changes in data structure without requiring a predefined, rigid schema. Common in NoSQL document databases.",
    details: null
  },
  {
    term: "Schema Stitching (GraphQL)",
    definition: "A technique in GraphQL that allows developers to create a single, unified GraphQL schema by merging multiple underlying GraphQL APIs or schemas from different services.",
    details: "Useful for building a unified API layer over a microservices architecture."
  },
  {
    term: "Schema-First Design",
    definition: "An API design approach where the API contract or schema (e.g., OpenAPI specification for REST, .proto files for gRPC, GraphQL schema definition language) is defined before writing any implementation code.",
    details: "Promotes clear contracts, enables parallel development, and facilitates tooling (e.g., code generation)."
  },
  {
    term: "Schema-on-Read",
    definition: "A data handling strategy where the structure or schema of the data is applied when the data is read, rather than when it is written. Common in NoSQL databases and data lakes.",
    details: "Offers flexibility in ingesting diverse data formats but requires consumers to understand and interpret the data structure."
  },
  {
    term: "Schema-on-Write",
    definition: "A data handling strategy where the structure or schema of the data is defined and enforced when the data is written to the store. Common in relational databases.",
    details: "Ensures data consistency and integrity at the time of storage but can be less flexible for evolving data structures."
  },
  {
    term: "SSL (Secure Sockets Layer)",
    definition: "See TLS (Transport Layer Security). SSL is the predecessor to TLS; modern usage of 'SSL' often refers to TLS.",
    details: "It's a cryptographic protocol that provides secure communication over a network."
  },
  {
    term: "Secondary Indexes",
    definition: "Database indexes created on columns other than the primary key. They allow for efficient querying based on these non-primary key attributes.",
    details: "Amazon DynamoDB supports Global Secondary Indexes (GSIs) and Local Secondary Indexes (LSIs)."
  },
  {
    term: "Security",
    definition: "The practice of protecting systems, networks, and data from unauthorized access, use, disclosure, alteration, or destruction. Involves measures like authentication, authorization, encryption, and input validation.",
    details: null
  },
  {
    term: "Semantic Versioning (SemVer)",
    definition: "A versioning scheme for software that uses a three-part version number (MAJOR.MINOR.PATCH) to convey the nature of changes. MAJOR version for incompatible API changes, MINOR version for adding functionality in a backward-compatible manner, and PATCH version for backward-compatible bug fixes.",
    details: "Helps manage dependencies and communicate changes to users."
  },
  {
    term: "Server Farm / Server Pool",
    definition: "A collection or group of backend servers that are configured to receive traffic from a load balancer for a specific application or service.",
    details: null
  },
  {
    term: "Server Pool / Backend Pool",
    definition: "A group of backend servers configured to receive traffic for a specific application or service from a load balancer.",
    details: null
  },
  {
    term: "Server Push (HTTP/2)",
    definition: "A feature of HTTP/2 where the server can proactively send resources to the client that it anticipates the client will need, without the client explicitly requesting them. This can improve page load times.",
    details: null
  },
  {
    term: "Server-Sent Events (SSE)",
    definition: "A technology that allows a web server to push updates to a web client over a single, long-lived HTTP connection. Communication is unidirectional (server to client).",
    details: "Simpler than WebSockets for server-to-client streaming of text-based events."
  },
  {
    term: "Service Discovery",
    definition: "The process by which services in a distributed system (especially microservices) locate and communicate with each other. As services can scale up or down and their network locations can change, a dynamic service discovery mechanism is needed.",
    details: "Tools like Consul, etcd, or Kubernetes' built-in service discovery are often used."
  },
  {
    term: "Service Mesh",
    definition: "An infrastructure layer for managing service-to-service communication in a microservices architecture. It provides features like traffic management (routing, load balancing), security (mutual TLS, authorization), and observability (metrics, tracing) transparently to the application code, often using sidecar proxies.",
    details: "Examples include Istio and Linkerd."
  },
  {
    term: "Session Affinity",
    definition: "A load balancing mechanism that directs all requests from a single client to the same backend server for the duration of a session. (Also known as Sticky Sessions).",
    details: "Important for stateful applications where session data is stored locally on servers."
  },
  {
    term: "Sharding (Database)",
    definition: "A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards. Each shard is often hosted on a separate server.",
    details: "Improves scalability and performance by distributing data and load. (Also known as Horizontal Partitioning)."
  },
  {
    term: "Sharding (Horizontal Partitioning)",
    definition: "The process of breaking up a large database into smaller, more manageable pieces called shards. Data is distributed across shards based on a shard key (e.g., user ID, region).",
    details: "Improves scalability and performance by distributing data and load across multiple servers. Also known as horizontal partitioning."
  },
  {
    term: "Sharding Strategies",
    definition: "Methods for distributing data across multiple database shards. Common strategies include Range-Based Sharding, Hash-Based Sharding, List-Based Sharding, and Directory-Based Sharding.",
    details: "The choice of strategy depends on data characteristics, query patterns, and scalability requirements."
  },
  {
    term: "Sidecar Pattern",
    definition: "An architectural pattern where components of an application are deployed into a separate process or container (the sidecar) to provide isolation and encapsulation. The sidecar is attached to a parent application and shares its lifecycle (e.g., network namespace, resources).",
    details: "Used for offloading cross-cutting concerns like logging, monitoring, configuration, or network proxies (e.g., Envoy in a service mesh)."
  },
  {
    term: "Single Point of Failure (SPOF)",
    definition: "A part of a system that, if it fails, will stop the entire system from working. Identifying and eliminating SPOFs through redundancy and failover mechanisms is crucial for high availability.",
    details: null
  },
  {
    term: "Slab Allocator",
    definition: "A memory management mechanism used in some systems (like Memcached) to reduce fragmentation and improve performance for allocating and deallocating fixed-size chunks of memory (slabs).",
    details: null
  },
  {
    term: "Sliding Window Counter (Rate Limiting)",
    definition: "A rate limiting algorithm that combines aspects of Fixed Window Counter and Sliding Window Log. It maintains counts for requests in the current window and a portion of the previous window, providing a smoother rate limit enforcement than Fixed Window.",
    details: null
  },
  {
    term: "Sliding Window Log (Rate Limiting)",
    definition: "A rate limiting algorithm that stores timestamps of incoming requests in a sorted set or list for each client. When a new request arrives, it removes timestamps older than the window period and checks if the remaining count is within the limit.",
    details: "Provides accurate rate limiting but can be memory-intensive if request rates are high."
  },
  {
    term: "Snowflake",
    definition: "A cloud-based data warehousing platform that provides a fully managed service for data storage, processing, and analytics. Known for its separation of storage and compute, allowing independent scaling.",
    details: null
  },
  {
    term: "SOAP (Simple Object Access Protocol)",
    definition: "A messaging protocol specification for exchanging structured information in the implementation of web services in computer networks. It relies on XML Information Set for its message format and usually relies on other Application Layer protocols, most notably HTTP or SMTP, for message negotiation and transmission.",
    details: "An older alternative to REST for web services, often considered more complex."
  },
  {
    term: "Sockets (Network Sockets)",
    definition: "An endpoint of a bidirectional inter-process communication flow across an Internet Protocol-based computer network, such as the Internet. A socket is identified by an IP address and a port number.",
    details: "Fundamental for network communication."
  },
  {
    term: "Soft state",
    definition: "A property in the BASE model indicating that the state of the system may change over time, even without input, due to eventual consistency. Data might be inconsistent temporarily.",
    details: null
  },
  {
    term: "Software Load Balancers",
    definition: "Applications that run on standard commodity hardware (physical servers, virtual machines, or containers) to distribute network or application traffic. Examples: Nginx, HAProxy, Envoy.",
    details: "Offer flexibility and cost-effectiveness compared to hardware load balancers."
  },
  {
    term: "Splunk",
    definition: "A software platform for searching, monitoring, and analyzing machine-generated big data, via a web-style interface. It captures, indexes, and correlates real-time data in a searchable repository from which it can generate graphs, reports, alerts, dashboards, and visualizations.",
    details: "Widely used for log management, security information and event management (SIEM), and operational intelligence."
  },
  {
    term: "SQL (Structured Query Language)",
    definition: "A domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS).",
    details: "SQL is used for querying, inserting, updating, and deleting data in relational databases."
  },
  {
    term: "SQLAlchemy",
    definition: "A popular open-source SQL toolkit and Object-Relational Mapper (ORM) for the Python programming language. It provides a full suite of well-known enterprise-level persistence patterns, designed for efficient and high-performing database access.",
    details: null
  },
  {
    term: "SSL Offloading (SSL Termination)",
    definition: "The process where a Layer 7 load balancer or a dedicated SSL accelerator handles incoming HTTPS connections by decrypting the SSL/TLS traffic and then forwarding unencrypted HTTP traffic to the backend servers. This offloads the computationally expensive SSL/TLS handshake and encryption/decryption processes from the application servers.",
    details: "Frees up backend server CPU resources for application logic. The load balancer can also re-encrypt traffic to the backend if needed (SSL initiation)."
  },
  {
    term: "SSL Termination (SSL Offloading)",
    definition: "The process where an L7 load balancer handles incoming HTTPS connections by decrypting the SSL/TLS traffic and then forwarding unencrypted HTTP traffic to the backend servers. This offloads the computationally expensive SSL/TLS handshake and encryption/decryption processes from the application servers, freeing up their CPU resources for application logic. The load balancer then encrypts traffic again when sending responses back to the client if needed.",
    details: null
  },
  {
    term: "Stale Data",
    definition: "Cached data that no longer matches the corresponding data in the origin store because the origin data has changed and the cache has not yet been updated or invalidated.",
    details: "Cache invalidation strategies are used to minimize stale data."
  },
  {
    term: "Stale-while-revalidate",
    definition: "A cache control directive or strategy where a cache can serve stale (expired) content to a client while it asynchronously fetches a fresh version from the origin server in the background. This prioritizes availability and perceived performance.",
    details: "Helps avoid latency spikes when cached content expires, especially for popular items."
  },
  {
    term: "Stateful Architecture",
    definition: "An architecture where the server stores client-specific session data in its memory or local storage. Subsequent requests from the same client rely on this stored state to be processed correctly.",
    details: "Harder to scale horizontally and complicates failover compared to stateless architectures."
  },
  {
    term: "Stateless Architecture",
    definition: "An architecture where each request from a client to a server must contain all the information needed by the server to understand and process the request. The server does not store any client session state between requests.",
    details: "Crucial for horizontal scalability and resilience, as any server can handle any request."
  },
  {
    term: "Statelessness",
    definition: "A characteristic of REST APIs and other distributed systems where each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server from previous requests.",
    details: "Promotes scalability as any server instance can handle any request."
  },
  {
    term: "Static Assets",
    definition: "Files used by a website or application that do not change frequently and are not dynamically generated. Examples include images, CSS stylesheets, JavaScript files, fonts, and videos.",
    details: "Often cached by browsers and CDNs to improve performance."
  },
  {
    term: "Sticky Sessions (Session Affinity)",
    definition: "A mechanism in load balancing that ensures requests from a specific client are consistently routed to the same backend server for the duration of a session. (Also known as Session Affinity).",
    details: "Useful for applications that store session state locally on servers."
  },
  {
    term: "STOMP (Simple Text Oriented Messaging Protocol)",
    definition: "A simple text-based protocol, designed for working with message-oriented middleware (MOM). It provides an interoperable wire format that allows STOMP clients to talk with any STOMP message broker.",
    details: "RabbitMQ supports STOMP via a plugin."
  },
  {
    term: "Strangler Fig Pattern",
    definition: "An architectural pattern for incrementally migrating a legacy monolithic system to a new system (often microservices) by gradually replacing parts of the monolith with new services. New functionality is built in the new system, and requests are routed to either the old or new system via a facade or proxy. Over time, the new system 'strangles' the old one.",
    details: "Reduces the risk of a big-bang rewrite and allows for continuous delivery during migration."
  },
  {
    term: "Strong Consistency",
    definition: "A consistency model ensuring that after an update completes, any subsequent access (by any client, from any node) will return the updated value. All observers see operations in the same order.",
    details: "Often found in traditional RDBMS and systems prioritizing data integrity over availability during partitions (CP systems)."
  },
  {
    term: "System Interface Definition",
    definition: "The process of defining the APIs (Application Programming Interfaces) that a system will expose for interaction with clients or other services. This includes specifying endpoints, request/response formats, and communication protocols.",
    details: "A key step in system design, clarifying how different parts of the system will communicate."
  },
  {
    term: "TCP (Transmission Control Protocol)",
    definition: "A connection-oriented protocol that provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network. Part of the TCP/IP suite.",
    details: "Used by many application protocols like HTTP, FTP, and SMTP."
  },
  {
    term: "TCP/IP Model",
    definition: "A conceptual model and set of communications protocols used in the Internet and similar computer networks. It is commonly known as TCP/IP because its foundational protocols are the Transmission Control Protocol (TCP) and the Internet Protocol (IP).",
    details: "Organized into layers (e.g., Application, Transport, Internet, Link)."
  },
  {
    term: "Throttling",
    definition: "See Rate Limiting. The process of controlling the rate at which requests or operations are processed to prevent system overload or abuse.",
    details: null
  },
  {
    term: "Throughput",
    definition: "The rate at which a system can process requests or data, typically measured in requests per second (RPS/QPS) or data volume per unit time (e.g., MB/s, GB/s).",
    details: "A key performance metric indicating system capacity."
  },
  {
    term: "Thundering Herd",
    definition: "A burst of traffic to the origin server caused when a popular cache entry expires or is invalidated, leading to many clients trying to fetch the same data from the origin simultaneously. (Also known as Cache Stampede).",
    details: "This can overwhelm the origin server. Mitigation techniques include request coalescing, early expiration, or stale-while-revalidate strategies."
  },
  {
    term: "TiDB",
    definition: "An open-source, distributed, Hybrid Transactional/Analytical Processing (HTAP) database. It is MySQL compatible and features horizontal scalability, strong consistency, and high availability.",
    details: "Aims to provide both OLTP scalability and OLAP capabilities in a single database (NewSQL)."
  },
  {
    term: "Time To First Byte (TTFB)",
    definition: "The time it takes for a user or client to receive the first byte of the response after the browser or client sends a request. It includes DNS lookup time, connection establishment time, and server processing time.",
    details: "A high TTFB can indicate a slow network, server, or application processing. CDNs and caching help reduce TTFB."
  },
  {
    term: "Time To Live (TTL)",
    definition: "A duration for which a cache entry is considered valid. After TTL expires, the entry may be removed from the cache or marked for refresh from the origin data store.",
    details: "Setting appropriate TTLs is a key aspect of cache management to balance data freshness with cache hit rates."
  },
  {
    term: "Time-Series Databases (TSDB)",
    definition: "Databases optimized for storing and querying data points indexed in time order. They are commonly used for monitoring data, sensor data, financial data, and other applications where data is collected over time.",
    details: "Examples include InfluxDB and Prometheus."
  },
  {
    term: "TLS (Transport Layer Security)",
    definition: "Transport Layer Security (TLS) is a cryptographic protocol designed to provide secure communication over a computer network. It is the successor to SSL (Secure Sockets Layer). Modern usage of 'SSL' often refers to TLS. (Also known as SSL).",
    details: "TLS is essential for protecting data confidentiality and integrity in transit, forming the basis of HTTPS."
  },
  {
    term: "Token Bucket (Rate Limiting)",
    definition: "A rate limiting algorithm where a bucket holds a certain number of tokens. Tokens are replenished at a fixed rate. Each incoming request consumes one token. If the bucket is empty, requests are rejected or queued.",
    details: "Allows for bursts of traffic up to the bucket size while maintaining an average rate."
  },
  {
    term: "Topic",
    definition: "In publish/subscribe messaging systems, a named channel or category to which messages are published by producers. Multiple consumers can subscribe to the same topic to receive copies of those messages.",
    details: "Used in systems like Apache Kafka and RabbitMQ (via topic exchanges)."
  },
  {
    term: "Topic Exchange (RabbitMQ specific)",
    definition: "A type of exchange in RabbitMQ that routes messages to queues based on wildcard matches between the message's routing key and the binding patterns specified when queues are bound to the exchange.",
    details: "Allows for flexible and powerful routing based on hierarchical routing keys (e.g., 'stock.us.nyse')."
  },
  {
    term: "Traefik",
    definition: "A modern HTTP reverse proxy and load balancer that makes deploying microservices easy. Traefik integrates with existing infrastructure components (Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS, ...) and configures itself automatically and dynamically.",
    details: "Known for its ease of use and automatic service discovery capabilities."
  },
  {
    term: "Transaction (Database)",
    definition: "A sequence of one or more database operations (reads, writes, updates) that are executed as a single, atomic unit of work. Transactions should exhibit ACID properties in many systems. (Also known as Database Transaction).",
    details: null
  },
  {
    term: "Transport Layer Security (TLS)",
    definition: "A cryptographic protocol designed to provide secure communication over a computer network. It is the successor to SSL (Secure Sockets Layer).",
    details: "Essential for HTTPS, ensuring data confidentiality and integrity."
  },
  {
    term: "Two-Phase Commit (2PC)",
    definition: "A distributed algorithm that coordinates all the processes that participate in a distributed atomic transaction on whether to commit or abort (roll back) the transaction. It involves a prepare phase and a commit phase.",
    details: "Ensures atomicity across multiple participants but can be slow and prone to blocking if the coordinator fails. Often avoided in microservices in favor of Sagas."
  },
  {
    term: "UDP (User Datagram Protocol)",
    definition: "A connectionless protocol that, like TCP, is used in transmitting data between computers on the Internet. Unlike TCP, UDP does not provide reliability, ordering, or error checking. It is faster but less reliable than TCP.",
    details: "Used for applications where speed is critical and some data loss is acceptable, such as video/audio streaming, DNS, and online gaming."
  },
  {
    term: "Under-fetching",
    definition: "A situation in API design, common with traditional REST APIs, where a client needs to make multiple requests to different endpoints to gather all the data required for a particular view or operation. This increases latency and complexity for the client.",
    details: "GraphQL aims to solve under-fetching by allowing clients to request all necessary data, including related resources, in a single query."
  },
  {
    term: "Uniform Interface",
    definition: "A fundamental constraint of the REST architectural style. It simplifies and decouples the architecture, which enables each part to evolve independently. Key aspects include resource identification via URIs, manipulation of resources through representations (like JSON), self-descriptive messages, and HATEOAS.",
    details: null
  },
  {
    term: "Upstream / Backend Server / Origin Server",
    definition: "The pool of application servers to which a load balancer distributes traffic.",
    details: "These are the servers that actually process the client requests."
  },
  {
    term: "Uptime (%)",
    definition: "The percentage of time an API or system is operational and available for requests. Typically measured in 'nines' (e.g., 99.9%, 99.99%).",
    details: "A key indicator of system availability and reliability."
  },
  {
    term: "URL Hash (Load Balancing)",
    definition: "A load balancing algorithm that calculates a hash of the request URL (or part of it) and uses this hash to determine which backend server should handle the request.",
    details: "Useful for ensuring requests for the same URL go to the same backend server, which can improve cache hit rates on backend caches."
  },
  {
    term: "Vertical Scaling (Scaling Up)",
    definition: "Increasing the resources (CPU, RAM, storage) of existing machines in a system. E.g., upgrading a server to a more powerful one.",
    details: "Simpler initially but has upper limits and can be expensive for high-end hardware. Often involves downtime for upgrades."
  },
  {
    term: "Virtual IP Address (VIP)",
    definition: "A single IP address that clients connect to, which is then managed by a load balancer. The load balancer uses this VIP to distribute incoming requests to multiple backend servers in a server pool.",
    details: "Abstracts the individual IP addresses of backend servers from clients."
  },
  {
    term: "VoltDB",
    definition: "An in-memory, distributed SQL database designed for high-throughput transactional (OLTP) applications that require extreme low latency and scalability.",
    details: "A NewSQL database that aims to combine ACID properties with horizontal scalability."
  },
  {
    term: "VRRP (Virtual Router Redundancy Protocol)",
    definition: "A computer networking protocol that provides for automatic assignment of available IP routers to participating hosts. This increases the availability and reliability of routing paths via gateway selections on an IP subnetwork.",
    details: "Often used to create highly available load balancer setups by allowing a passive load balancer to take over a virtual IP address if the active one fails."
  },
  {
    term: "WAL (Write-Ahead Logging)",
    definition: "A standard method for ensuring data integrity and durability in database systems. Before any changes are made to the actual data pages on disk, the changes are first recorded in a log file (the write-ahead log). This allows the system to recover to a consistent state in case of a crash.",
    details: "Used by many relational databases and some persistent caches like Redis (AOF option)."
  },
  {
    term: "Web Application Firewall (WAF)",
    definition: "A type of firewall that monitors, filters, or blocks HTTP traffic to and from a web application. A WAF is differentiated from a regular network firewall in that a WAF is able to filter the content of specific web applications while regular firewalls serve as a safety gate between servers.",
    details: "Helps protect against common web attacks like SQL injection, Cross-Site Scripting (XSS), and file inclusion."
  },
  {
    term: "Webhook",
    definition: "An HTTP callback or HTTP POST that occurs when something happens; a simple event-notification via HTTP POST. Used for asynchronous communication from a server to a client or another server when a specific event occurs.",
    details: "Example: A payment gateway sends a webhook to an e-commerce site to notify about a successful payment."
  },
  {
    term: "WebSockets",
    definition: "A communication protocol that provides full-duplex communication channels over a single, long-lived TCP connection. It is initiated via an HTTP handshake.",
    details: "Enables real-time, bi-directional communication between client and server, suitable for chat applications, live updates, and online games."
  },
  {
    term: "Weighted Least Connections (Load Balancing)",
    definition: "A load balancing algorithm that combines the Least Connections method with server weights. The load balancer selects the server with the fewest active connections relative to its assigned weight (e.g., (connections / weight) should be minimal).",
    details: "Balances load effectively in heterogeneous server environments by considering both current connection load and server capacity."
  },
  {
    term: "Weighted Round Robin (Load Balancing)",
    definition: "A load balancing algorithm where servers are assigned a static weight (a numerical value) based on their capacity. Servers with higher weights receive a proportionally larger number of requests in the round-robin cycle.",
    details: "Allows for more balanced distribution in heterogeneous server pools but weights are static and don't adapt to real-time load."
  },
  {
    term: "Wide-Column Stores",
    definition: "A type of NoSQL database that organizes data into tables (column families) where rows are identified by a key, and each row can have a different set of columns. Data is often versioned by timestamp.",
    details: "Examples include Apache Cassandra and Google Bigtable. Suited for very large datasets and high write throughput."
  },
  {
    term: "WordPress",
    definition: "A free and open-source content management system (CMS) based on PHP and MySQL. It is one of the most popular CMS platforms globally, used for blogs, websites, and e-commerce (with plugins like WooCommerce).",
    details: null
  },
  {
    term: "Write Latency",
    definition: "The time taken for a write operation (e.g., inserting or updating data in a database or cache) to complete and be acknowledged.",
    details: "A critical performance metric for write-intensive applications."
  },
  {
    term: "Write-Around Cache",
    definition: "A caching pattern where data is written directly to the primary data store, bypassing the cache entirely. Only on a cache miss during a read operation is the data loaded into the cache.",
    details: "Lowers write latency and prevents cache pollution with write-only data, but recently written data will have higher initial read latency."
  },
  {
    term: "Write-Back Cache (Write-Behind)",
    definition: "A caching pattern where data is written directly to the cache, and the cache acknowledges the write immediately. The cache then asynchronously writes the data to the primary data store after a delay or in batches.",
    details: "Offers the lowest write latency and highest write throughput but carries a risk of data loss if the cache fails before persisting to the origin. Requires mechanisms for durability."
  },
  {
    term: "Write-Through Cache",
    definition: "A caching pattern where data is written to the cache and the primary data store (origin) simultaneously, in a single transaction. The operation completes only after both writes are successful.",
    details: "Ensures high data consistency between cache and origin but results in higher write latency as it waits for both writes to complete."
  },
  {
    term: "XSS (Cross-Site Scripting)",
    definition: "A type of security vulnerability typically found in web applications. XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same-origin policy.",
    details: "Proper input validation and output encoding are crucial for preventing XSS."
  }
];

export const glossaryData = [...rawGlossaryData].sort((a, b) => a.term.localeCompare(b.term));
