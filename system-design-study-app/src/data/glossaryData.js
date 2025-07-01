export const glossaryData = [
  {
    "id": "acid-properties",
    "term": "ACID Properties",
    "definition": "A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee reliable processing of database transactions.",
    "details": "Atomicity: Transactions are all-or-nothing. Consistency: Transactions bring the database from one valid state to another. Isolation: Concurrent transactions are executed as if they were serial. Durability: Committed transactions survive failures.",
    "synonyms": []
  },
  {
    "id": "api",
    "term": "API",
    "definition": "Application Programming Interface: A set of rules and protocols that allows different software applications to communicate with each other.",
    "details": "A contract or set of rules allowing different software applications to communicate and exchange data with each other.",
    "synonyms": []
  },
  {
    "id": "api-gateway-aggregation",
    "term": "API Gateway Aggregation",
    "definition": "An API Gateway acts as a single entry point, receives client requests, invokes multiple Microservices, aggregates their responses, and returns a consolidated response to the client.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "api-key",
    "term": "API Keys",
    "definition": "Simple tokens assigned to applications or users to grant access to an API. Typically sent in a request header (e.g., X-API-Key).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "api-versioning",
    "term": "API Versioning",
    "definition": "Managing changes to an API over time by creating distinct versions (e.g., /v1/users, /v2/users) to avoid breaking existing client integrations.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "api-versioning-strategy",
    "term": "API Versioning Strategies",
    "definition": "As APIs evolve, changes are inevitable. API versioning is crucial for introducing these changes without breaking existing client integrations. The primary goal is to allow clients to continue using an older version of the API while new clients can adopt newer versions. Maintaining backward compatibility for as long as feasible is a key principle, but when breaking changes are necessary, a versioning strategy must be in place.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "api-versioning-custom-header-",
    "term": "API Versioning (Custom Header)",
    "definition": "Version is specified in a custom HTTP Header (e.g., Api-Version: 1 or Accept: application/vnd.myapi.v1+json).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "api-versioning-uri-path-",
    "term": "API Versioning (URI Path)",
    "definition": "Version is included in the URI path (e.g., /api/v1/resource, /api/v2/resource).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "apache-cassandra",
    "term": "Apache Cassandra",
    "definition": "Decentralized (masterless), distributed database designed for High Availability and linear Scalability. Data is partitioned across nodes in a ring using Consistent Hashing. Tunable Consistency per query.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "apache-kafka",
    "term": "Apache Kafka",
    "definition": "A distributed streaming platform built around a Publish–Subscribe log. Offers high-throughput, fault-tolerant messaging and event streaming.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "at-least-once-delivery",
    "term": "At-Least-Once Delivery",
    "definition": "A delivery guarantee in messaging systems ensuring that each message will be delivered one or more times. Consumers must handle potential duplicates.",
    "details": "This guarantee ensures that each message will be delivered one or more times to a consumer. If an acknowledgment (ack) from the consumer is not received by the broker (e.g., due to network issues or consumer crash before acking), the message may be redelivered. This prevents message loss but can lead to duplicate message processing.",
    "synonyms": ["At-Least-Once"]
  },
  {
    "id": "at-most-once-delivery",
    "term": "At-Most-Once Delivery",
    "definition": "This guarantee ensures that each message will be delivered zero or one time. Messages might be lost if the broker fails before a message is delivered, or if a consumer fails after receiving but before processing and the message isn't requeued. It's often referred to as 'fire and forget'.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "authentication-authn-",
    "term": "Authentication (AuthN)",
    "definition": "The process of verifying the identity of a client or user trying to access the API (e.g., API Keys, OAuth 2.0 tokens).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "authorization-authz-",
    "term": "Authorization (AuthZ)",
    "definition": "The process of determining whether an authenticated client or user has permission to perform a specific action or access a particular resource.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "availability",
    "term": "Availability",
    "definition": "The proportion of time a system is in a functioning condition. High availability systems aim to minimize downtime and ensure continuous operation.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "aws-sq",
    "term": "Amazon SQS",
    "definition": "A fully managed message queuing service offered by Amazon Web Services (AWS). Provides highly scalable and reliable queues for Decoupling and scaling Microservices, distributed systems, and serverless applications.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "anycast",
    "term": "Anycast",
    "definition": "A network addressing technique where the same IP is advertised from multiple nodes. In load balancing, allows traffic to automatically route to the nearest or healthiest node (used in global DNS load balancing).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "base-properties",
    "term": "BASE Properties",
    "definition": "An alternative to ACID (Basically Available, Soft state, Eventual consistency) often used by NoSQL databases, prioritizing Availability and Scalability over strict Consistency.",
    "details": "Basically Available: The system guarantees availability. Soft state: The state of the system may change over time, even without input. Eventual consistency: The system will eventually become consistent over time, given no new updates.",
    "synonyms": []
  },
  {
    "id": "backend-for-frontend-bff-",
    "term": "Backend for Frontend (BFF)",
    "definition": "An API layer tailored to the specific needs of a particular client application (e.g., a BFF for a mobile app, another for a web app). It aggregates calls to downstream services and formats data for the frontend.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "backpressure",
    "term": "Backpressure",
    "definition": "A mechanism to signal producers to slow down when consumers cannot keep up, preventing system overload.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "broker",
    "term": "Broker",
    "definition": "The message queue server software that manages the storage and routing of messages between producers and consumers.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cap-theorem",
    "term": "CAP Theorem",
    "definition": "A theorem for distributed data stores that states it is impossible for a distributed system to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.",
    "details": "In a distributed data store, only two of the following three guarantees can be provided simultaneously: Consistency, Availability, and Partition Tolerance.",
    "synonyms": []
  },
  {
    "id": "cap-theorem-brewer's-theorem-",
    "term": "CAP Theorem (Brewer's Theorem)",
    "definition": "States that a distributed data store cannot simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cdn",
    "term": "CDN",
    "definition": "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end-users.",
    "details": "Geographically distributed network of proxy servers (Points of Presence - PoPs) caching content closer to users to reduce latency.",
    "synonyms": []
  },
  {
    "id": "cdn-content-delivery-network-",
    "term": "CDN (Content Delivery Network)",
    "definition": "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end-users.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cdn-edge-server-pop-",
    "term": "CDN Edge Server (PoP)",
    "definition": "A server at a CDN's Point of Presence (PoP) located geographically close to users. It caches and delivers content, reducing latency and load on origin servers.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cdn-propagation",
    "term": "CDN Propagation",
    "definition": "The time it takes for content changes (updates or purges) from an origin server to be reflected across all edge servers in a CDN network.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cqrs-command-query-responsibility-segregation-",
    "term": "CQRS (Command Query Responsibility Segregation)",
    "definition": "A pattern that separates read and update operations (models) for a data store. Commands update data, Queries read data. Often used with separate read and write databases.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cache",
    "term": "Cache",
    "definition": "A hardware or software component that stores data so that future requests for that data can be served faster; the data stored in a cache might be the result of an earlier computation or a copy of data stored elsewhere.",
    "details": "Storing frequently accessed data in a temporary, fast-access storage layer to reduce Latency and load on backend systems. (See Caching)",
    "synonyms": []
  },
  {
    "id": "cache-control-header",
    "term": "Cache-Control Headers",
    "definition": "HTTP headers that specify browser and proxy caching policies for a resource (e.g., `max-age`, `no-cache`, `public`, `private`). Essential for controlling how CDNs and clients cache content.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cache-entry",
    "term": "Cache Entry",
    "definition": "A piece of data stored in the cache, typically a key-value pair.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cache-hit",
    "term": "Cache Hit",
    "definition": "A request for data that is successfully found in the cache.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cache-hit-ratio",
    "term": "Cache Hit Ratio",
    "definition": "Percentage of requests served from CDN cache.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cache-invalidation",
    "term": "Cache Invalidation",
    "definition": "The process of removing or marking a cache entry as invalid, forcing a refresh from the origin on the next request.",
    "details": "The process of removing or marking a cache entry as invalid, forcing a refresh from the origin on the next request. This is crucial for maintaining data consistency between the cache and the source of truth, such as a database that might be undergoing updates.",
    "synonyms": []
  },
  {
    "id": "cache-miss",
    "term": "Cache Miss",
    "definition": "A request for data that is not found in the cache, requiring a fetch from the origin data store (see Cache Invalidation strategy).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "causal-consistency",
    "term": "Causal Consistency",
    "definition": "If operation A causes operation B, then all processes see operation A before operation B. Operations that are not causally related might be seen in different orders by different processes.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "client-side-caching",
    "term": "Client-Side Caching",
    "definition": "Caching data directly in the client application (e.g., browser cache, mobile app cache). Data is stored on the user's device.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cloud-load-balancer-managed-lbaa-",
    "term": "Cloud Load Balancers (Managed LBaaS)",
    "definition": "Managed load balancing services provided by cloud platforms (e.g., AWS ELB/ALB, Google Cloud Load Balancing). They abstract away infrastructure and offer Auto Scaling, High Availability out of the box.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "competing-consumer",
    "term": "Competing Consumers",
    "definition": "Multiple consumers read from the same queue, allowing for parallel processing of messages. Each message is processed by only one of the consumers.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "consistency",
    "term": "Consistency",
    "definition": "Ensures that all clients see the same data at the same time, regardless of which node they connect to. Different levels include Strong Consistency, Eventual Consistency, and Causal Consistency.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "consistency-model",
    "term": "Consistency Models",
    "definition": "Definition needed for Consistency Models.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "consistency-in-cap-theorem-",
    "term": "Consistency (in CAP Theorem)",
    "definition": "Ensures that all nodes in a distributed system see the same data at the same time. After an update, all reads should return the updated value.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "consumer",
    "term": "Consumer",
    "definition": "An application component that subscribes to a message queue or topic and processes messages received from it.",
    "details": "",
    "synonyms": ["Subscriber"]
  },
  {
    "id": "consumer-group-kafka-specific-",
    "term": "Consumer Group (Kafka specific)",
    "definition": "One or more consumers that jointly consume messages from one or more Kafka topic partitions. Each partition is consumed by only one consumer within a group, allowing for parallel processing.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cross-origin-resource-sharing-cor-",
    "term": "Cross-Origin Resource Sharing (CORS)",
    "definition": "A mechanism that uses additional HTTP Headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. Important for web-accessible APIs.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "cursor-based-pagination-seek-method--keyset-pagination-",
    "term": "Cursor-Based Pagination (Seek Method / Keyset Pagination)",
    "definition": "Client receives a 'cursor' (an opaque pointer or a value from the last item of the current page, e.g., timestamp or ID) with a page of results. For the next page, the client sends this cursor back to the server. The server then returns items that come after (or before) the item indicated by the cursor, based on a stable sort order.",
    "details": "",
    "synonyms": []
  }
  {
    "id": "dns",
    "term": "DNS",
    "definition": "A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names (e.g., www.example.com) into machine-readable IP Addresses.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "dns-domain-name-system--in-cdn",
    "term": "DNS (Domain Name System) in CDNs",
    "definition": "Directs users to the optimal CDN edge server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database",
    "term": "Database",
    "definition": "An organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database-index",
    "term": "Database Index",
    "definition": "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database-per-service-microservice-",
    "term": "Database per Service (Microservices)",
    "definition": "Each Microservice manages its own private database. This ensures loose coupling and allows services to choose the database technology best suited for their needs.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database-replication",
    "term": "Database Replication",
    "definition": "Creating and maintaining multiple copies of a database to improve Availability, Fault Tolerance, and read Scalability (Read Replicas).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database-sharding-partitioning-",
    "term": "Database Sharding (Partitioning)",
    "definition": "Dividing a large database into smaller, independent, more manageable parts called shards. Each shard can be on a separate server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "database-transaction",
    "term": "Database Transaction",
    "definition": "A sequence of one or more database operations (reads, writes, updates) that are executed as a single, atomic unit of work.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "dead-letter-queue-dlq-",
    "term": "Dead Letter Queue (DLQ)",
    "definition": "A dedicated queue where messages that cannot be processed successfully by a consumer (after retries, or due to errors) are sent for later analysis or manual intervention.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "distributed-cache",
    "term": "Distributed Caches",
    "definition": "External cache service (e.g., Redis, Memcached) running on separate servers, shared by multiple application instances or services.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "docker",
    "term": "Docker",
    "definition": "A platform that uses OS-level virtualization to deliver software in packages called Containers. Containers are isolated from one another and bundle their own software, libraries and configuration files.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "durability",
    "term": "Durability",
    "definition": "Guarantees that once a transaction is committed, the data will persist even in the event of power failures, crashes, or errors.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "edge-server",
    "term": "Edge Server",
    "definition": "CDN server geographically close to users for fast content delivery.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "event-driven-architecture",
    "term": "Event-Driven Architecture",
    "definition": "A design paradigm where services emit and react to events, enabling loose coupling and asynchronous workflows.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "event-sourcing",
    "term": "Event Sourcing",
    "definition": "Persisting the state of a business entity as a sequence of state-changing events. Instead of storing the current state, all changes (events) are stored. The current state can be reconstructed by replaying the events. Often uses message queues to propagate events.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "eventual-consistency",
    "term": "Eventual Consistency",
    "definition": "If no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. Common in distributed NoSQL databases.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "exactly-once-semantic",
    "term": "Exactly-Once Semantics",
    "definition": "This is the strongest guarantee, ensuring that each message is delivered and processed by the logical consumer exactly one time. No messages are lost, and no messages are processed as duplicates. This is the most complex semantic to achieve in distributed systems.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "exchange-rabbitmq-specific-",
    "term": "Exchange (RabbitMQ specific)",
    "definition": "In RabbitMQ, producers publish messages to an exchange, which then routes them to bound queues based on rules and bindings.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "fifo-first-in-first-out-",
    "term": "FIFO (First-In, First-Out)",
    "definition": "Discards items in the order they were added to the cache, regardless of how often or how recently they were accessed. It treats the cache like a queue.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "failover",
    "term": "Failover",
    "definition": "The process of automatically redirecting traffic away from a failed server or data center to a healthy one.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "fault-tolerance",
    "term": "Fault Tolerance",
    "definition": "The ability of a system to continue operating, possibly at a reduced level, rather than failing completely when some part of the system fails.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "functional-requirement",
    "term": "Functional Requirements",
    "definition": "Definition needed for Functional Requirements.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "grpc",
    "term": "GraphQL",
    "definition": "A query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "global-server-load-balancing-gslb-",
    "term": "Global Server Load Balancing (GSLB)",
    "definition": "Load balancing across multiple geographically distributed data centers or server locations.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "google-cloud-pub-sub",
    "term": "Google Cloud Pub/Sub",
    "definition": "Definition needed for Google Cloud Pub/Sub.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "grpc-google-remote-procedure-call-",
    "term": "gRPC (Google Remote Procedure Call)",
    "definition": "A high-performance, open-source universal RPC framework. gRPC typically uses Protocol Buffers as its interface definition language and message interchange format.",
    "details": "A high-performance, open-source universal RPC (Remote Procedure Call) framework. Uses HTTP/2 for transport and Protocol Buffers as the interface description language.",
    "synonyms": []
  },
  {
    "id": "hateoa",
    "term": "HATEOAS",
    "definition": "Hypermedia As The Engine Of Application State: REST constraint where responses include hyperlinks for discoverability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http",
    "term": "HTTP",
    "definition": "The foundation of data communication for the World Wide Web. It is an application protocol for distributed, collaborative, hypermedia information systems.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http-method-verb-",
    "term": "HTTP Methods (Verbs)",
    "definition": "A set of request methods to indicate the desired action to be performed for a given resource. Common methods include GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http-status-code",
    "term": "HTTP Status Codes",
    "definition": "Standardized three-digit codes issued by a server in response to a client's request made to the server. Examples: 200 OK, 404 Not Found, 500 Internal Server Error.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http--http",
    "term": "HTTP/1.1",
    "definition": "A version of the Hypertext Transfer Protocol. It introduced features like persistent connections, pipelining, and chunked encoding, but can suffer from head-of-line blocking for multiple requests over a single connection.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http-",
    "term": "HTTP/2",
    "definition": "A major revision of the HTTP network protocol. Key features include request multiplexing over a single TCP connection, header compression (HPACK), and server push, leading to improved performance and reduced latency compared to HTTP/1.1.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http-http",
    "term": "HTTP/HTTPS",
    "definition": "Protocol for web data communication. HTTPS is the secure, encrypted version.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "http",
    "term": "HTTPS",
    "definition": "An extension of the Hypertext Transfer Protocol (HTTP) for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "hardware-load-balancer",
    "term": "Hardware Load Balancers",
    "definition": "Dedicated physical appliances (hardware devices) specifically designed and optimized for load balancing tasks. Examples: F5 BIG-IP, Citrix ADC.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "health-check",
    "term": "Health Check",
    "definition": "A regular probe (HTTP ping, TCP connect, etc.) that a load balancer performs to determine if a backend server is alive and responsive. Unhealthy servers are taken out of rotation until they recover.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "health-check",
    "term": "Health Checks",
    "definition": "Periodic checks performed by the load balancer to determine the status (health) of backend servers. Unhealthy servers are temporarily removed from rotation.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "horizontal-scaling-scaling-out-",
    "term": "Horizontal Scaling (Scaling Out)",
    "definition": "Adding more machines (nodes/servers) to a system to distribute the load. E.g., adding more web servers to a load balancer pool.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "hypermedium",
    "term": "Hypermedia",
    "definition": "Definition needed for Hypermedia.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "ip-address",
    "term": "IP Address",
    "definition": "A numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: host or network interface identification and location addressing.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "ip-hash--source-ip-hash",
    "term": "IP Hash / Source IP Hash",
    "definition": "Calculates a hash based on the client's source IP Address (and sometimes destination IP) to determine which backend server receives the request. Ensures requests from the same client IP Address go to the same server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "idempotency",
    "term": "Idempotency",
    "definition": "An operation is idempotent if making the same request multiple times produces the same result as making it once (e.g., HTTP PUT, DELETE).",
    "details": "Ensuring that processing the same message multiple times has the same effect as processing it once. Important for systems with 'At Least Once' delivery guarantees to prevent unintended side effects from duplicate messages.",
    "synonyms": []
  },
  {
    "id": "idempotency-key",
    "term": "Idempotency Key",
    "definition": "A unique key provided by the client to ensure repeated requests do not create duplicates (useful for payment or create operations).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "in-memory-cache-local-",
    "term": "In-Memory Caches (Local)",
    "definition": "Caching data within the main memory (RAM) of a single application instance. Examples: Ehcache, Guava Cache, ConcurrentHashMap.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "index",
    "term": "Index",
    "definition": "Definition needed for Index.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "input-validation",
    "term": "Input Validation",
    "definition": "Validating all data received by the API (e.g., path parameters, query parameters, request body) for type, format, length, range, and allowed characters to prevent injection attacks and other security vulnerabilities.",
    "details": "",
    "synonyms": []
  }
  {
    "id": "json-web-token-jwt-",
    "term": "JSON Web Tokens (JWT)",
    "definition": "A compact, URL-safe means of representing claims to be transferred between two parties. Often used for Stateless authentication tokens. Contains a header, payload (claims), and signature.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "kubernete",
    "term": "Kubernetes",
    "definition": "An open-source Container Orchestration system for automating software deployment, scaling, and management. It groups Containers that make up an application into logical units for easy management and discovery.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "lfu-least-frequently-used-",
    "term": "LFU (Least Frequently Used)",
    "definition": "Discards the items that have been accessed least frequently. This policy assumes that data that has been accessed often in the past will likely be accessed again in the future, regardless of when it was last accessed. It requires maintaining a counter for each cache entry.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "lru-least-recently-used-",
    "term": "LRU (Least Recently Used)",
    "definition": "Discards the least recently accessed items first. This policy operates on the assumption that data accessed recently is likely to be accessed again in the near future. It maintains a timestamp or a queue of cache entries based on their last access time.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "latency",
    "term": "Latency",
    "definition": "The delay before a transfer of data begins following an instruction for its transfer. In networking, it's the time it takes for a data packet to travel from one point to another.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "layer-4-l4-load-balancing",
    "term": "Layer 4 (L4) Load Balancing",
    "definition": "Operates at the transport layer (TCP/UDP). Makes routing decisions based on IP addresses and ports. It doesn't inspect packet content.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "layer-7-l7-load-balancing",
    "term": "Layer 7 (L7) Load Balancing",
    "definition": "Operates at the application layer (HTTP/HTTPS). Can inspect content like HTTP headers, cookies, URLs to make more intelligent routing decisions.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "leader-follower-replication-master-slave-",
    "term": "Leader-Follower Replication (Master-Slave)",
    "definition": "One server (leader/master) handles all write operations. These writes are then replicated (usually asynchronously) to one or more follower/slave servers. Followers can handle read requests, thus scaling read capacity.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "least-connection",
    "term": "Least Connections",
    "definition": "An algorithm that directs traffic to the server with the fewest active connections.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "least-response-time-or-fastest-response-",
    "term": "Least Response Time (or Fastest Response)",
    "definition": "Directs new requests to the server that currently exhibits the lowest average response time to recent Health Checks or, in more advanced implementations, to actual processed requests. Some versions also factor in the number of active connections (e.g., 'Least Response Time & Least Connections').",
    "details": "",
    "synonyms": []
  },
  {
    "id": "load-balancer",
    "term": "Load Balancer",
    "definition": "A device or software that distributes network or application traffic across multiple servers. Load balancers are used to improve responsiveness and availability of applications.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "load-balancing",
    "term": "Load Balancing",
    "definition": "Distributing incoming network or application traffic across multiple backend servers to improve Performance, Availability, and Scalability. (See Load Balancing)",
    "details": "",
    "synonyms": []
  },
  {
    "id": "message-acknowledgement-ack-nack-",
    "term": "Message Acknowledgement (Ack/Nack)",
    "definition": "A signal sent by a consumer to the broker indicating that a message has been successfully processed (Ack) or failed processing (Nack). The broker uses this to decide whether to redeliver the message or remove it from the queue.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "message-ordering",
    "term": "Message Ordering",
    "definition": "Ensuring that messages are processed in the order they were sent. Can be strict (FIFO) or grouped (e.g., Kafka messages with the same key go to the same partition).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "message-queue",
    "term": "Message Queue",
    "definition": "A component of messaging middleware solutions that enables asynchronous communication between different parts of a distributed system. Messages are stored in a queue until they are processed by a consumer.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "microservice",
    "term": "Microservice",
    "definition": "Definition needed for Microservice.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "microservices-architecture",
    "term": "Microservices Architecture",
    "definition": "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain. Each service is self-contained and can be deployed, scaled, and managed independently.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "mongodb",
    "term": "MongoDB",
    "definition": "Distributed document database. Stores data in BSON (Binary JSON-like) format. Supports Sharding (Horizontal Partitioning) and Replication (replica sets) natively for Scalability and Availability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "monolithic-architecture",
    "term": "Monolithic Architecture",
    "definition": "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "multi-leader-replication-master-master-",
    "term": "Multi-Leader Replication (Master-Master)",
    "definition": "Multiple servers (leaders) can accept write operations. Changes made on one leader are replicated to other leaders and their followers. Useful for multi-datacenter deployments or applications requiring low write Latency across regions.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "n-tier-architecture",
    "term": "N-tier Architecture",
    "definition": "A client-server architecture in which presentation, application processing, and data management functions are physically separated into layers (tiers).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "nosql-database",
    "term": "NoSQL Database",
    "definition": "A database that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. NoSQL databases are often used in big data and real-time web applications.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "nosql-not-only-sql-",
    "term": "NoSQL (Not Only SQL)",
    "definition": "A broad category of database management systems that differ from traditional RDBMS in various ways, often providing more flexibility in schema design and horizontal scalability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "newsql",
    "term": "NewSQL",
    "definition": "A class of modern relational databases that aim to provide the scalability of NoSQL systems while maintaining ACID guarantees of SQL systems. Examples include Google Spanner, CockroachDB.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "non-functional-requirement",
    "term": "Non-Functional Requirements",
    "definition": "Definition needed for Non-Functional Requirements.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "oauth",
    "term": "OAuth",
    "definition": "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "oauth-2-0",
    "term": "OAuth 2.0",
    "definition": "An authorization framework that enables third-party applications to access web resources on behalf of a user, without exposing user credentials. Defines roles like Resource Owner, Client, Authorization Server, Resource Server, and grant types (e.g., Authorization Code Grant, Client Credentials Grant).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "owasp-api-security-top-10",
    "term": "OWASP API Security Top 10",
    "definition": "A list of the most critical security risks to APIs identified by the Open Web Application Security Project (OWASP). Includes issues like Broken Object Level Authorization, Broken User Authentication, Excessive Data Exposure, etc.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "offset",
    "term": "Offset",
    "definition": "In Kafka, a sequential ID assigned to each message in a partition, used by consumers to track read position.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "offset-pagination-page-based-",
    "term": "Offset Pagination (Page-Based)",
    "definition": "Client requests a specific page number and page size (e.g., `/items?page=2&limit=20` or `/items?offset=20&limit=20`). The server skips `offset` (or `(page-1)*limit`) items and returns the next `limit` items from the database.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "openapi-specification-swagger-",
    "term": "OpenAPI Specification (Swagger)",
    "definition": "A standard, language-agnostic interface description for RESTful APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code or documentation.",
    "details": "A standard, language-agnostic interface description for RESTful APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code or documentation.",
    "synonyms": []
  },
  {
    "id": "origin-offload",
    "term": "Origin Offload",
    "definition": "Reduction in traffic the origin server handles due to CDN.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "origin-server",
    "term": "Origin Server",
    "definition": "The primary server storing the original content.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "orm-object-relational-mapping-",
    "term": "ORM (Object-Relational Mapping)",
    "definition": "A programming technique for converting data between incompatible type systems using object-oriented programming languages. Simplifies interaction with relational databases.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "pagination",
    "term": "Pagination",
    "definition": "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses. Common methods: offset-based, cursor-based.",
    "details": "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses. Common methods: Offset-based, Cursor-based.",
    "synonyms": []
  },
  {
    "id": "partition-tolerance",
    "term": "Partition Tolerance",
    "definition": "The ability of a distributed system to continue operating despite network partitions (communication breakdowns between nodes).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "partition-tolerance-in-cap-theorem-",
    "term": "Partition Tolerance (in CAP Theorem)",
    "definition": "The ability of a distributed system to continue operating despite network partitions (communication breakdowns between nodes).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "performance",
    "term": "Performance",
    "definition": "Definition needed for Performance.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "point-to-point-messaging",
    "term": "Point-to-Point Messaging",
    "definition": "A message is sent by a producer to a specific queue, and is then delivered to a single consumer that is listening to that queue. This ensures that each message is processed by only one receiver. If multiple consumers listen to the same queue, they compete for messages (Competing Consumers pattern).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "postgresql",
    "term": "PostgreSQL",
    "definition": "Object-relational database system. Uses a single process per connection model (can be a limitation). MVCC (Multi-Version Concurrency Control) for handling concurrent transactions.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "priority-queue",
    "term": "Priority Queue",
    "definition": "Messages are assigned a priority, and the broker attempts to deliver higher-priority messages before lower-priority ones. Not all brokers support this natively.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "producer-publisher-",
    "term": "Producer (Publisher)",
    "definition": "An application component that creates and sends messages to a message queue or topic.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "protocol-buffer-protobuf-",
    "term": "Protocol Buffers (Protobuf)",
    "definition": "A language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. Developed by Google, it's often used with gRPC (Google Remote Procedure Call).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "publish-subscribe",
    "term": "Publish-Subscribe",
    "definition": "A messaging pattern where publishers categorize messages into topics without knowing the subscribers, and subscribers express interest in one or more topics to receive messages.",
    "details": "A messaging pattern where messages are broadcast to multiple subscribers based on topics or channels.",
    "synonyms": ["Pub/Sub"]
  },
  {
    "id": "qps-queries-per-second-",
    "term": "QPS (Queries Per Second)",
    "definition": "Definition needed for QPS (Queries Per Second).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "queue",
    "term": "Queue",
    "definition": "A data structure that stores messages in a sequence (often FIFO - First-In, First-Out) until they are processed by a consumer. Typically used in point-to-point messaging.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "quorum-reads-write-",
    "term": "Quorum (Reads/Writes)",
    "definition": "In distributed systems, ensuring Consistency by requiring operations (reads or writes) to be acknowledged by a minimum number (quorum) of nodes before being considered successful. W + R > N (N=replicas, W=write quorum, R=read quorum).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "rest",
    "term": "REST",
    "definition": "An architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol—and in virtually all cases, the HTTP protocol is used.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "rest-representational-state-transfer-",
    "term": "REST (Representational State Transfer)",
    "definition": "An architectural style for designing networked applications, based on HTTP methods, URIs for resources, and Stateless communication.",
    "details": "An architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol—and in virtually all cases, the HTTP protocol is used.",
    "synonyms": []
  },
  {
    "id": "rabbitmq",
    "term": "RabbitMQ",
    "definition": "An open-source message broker that implements the Advanced Message Queuing Protocol (AMQP). Known for flexible routing, reliability features, and support for multiple messaging protocols and plugins.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "raft-consensus-algorithm",
    "term": "Raft Consensus Algorithm",
    "definition": "A leader-based consensus protocol for replicated state machines, easier to understand than Paxos.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "random",
    "term": "Random",
    "definition": "Distributes requests to backend servers purely randomly. No tracking of server state or load is involved.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "random-replacement-rr-",
    "term": "Random Replacement (RR)",
    "definition": "Randomly selects an item to discard when the cache needs to make space. There is no consideration of access history, frequency, or age.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "rate-limiting",
    "term": "Rate Limiting",
    "definition": "Restricting the number of API requests a client can make within a certain time window to prevent abuse and ensure fair usage.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "rate-limiting-algorithm",
    "term": "Rate Limiting Algorithms",
    "definition": "Strategies to control the number of requests a client can make. Common algorithms: Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log, Sliding Window Counter.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "read-replica",
    "term": "Read Replicas",
    "definition": "A pattern where data from a primary database server is replicated (often asynchronously) to one or more secondary (replica) servers. Read requests are then offloaded to these replicas, reducing the read load on the primary server and improving overall read Throughput and Latency for clients.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "redis",
    "term": "Redis",
    "definition": "In-memory data store, primarily single-threaded (for command execution) but highly performant due to non-blocking I/O. Can be used as a cache, message broker, or a persistent database with Redis Persistence (RDB snapshots and AOF logs).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "redis-stream",
    "term": "Redis Streams",
    "definition": "Definition needed for Redis Streams.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "redundancy",
    "term": "Redundancy",
    "definition": "Duplication of critical components or functions of a system with the intention of increasing reliability and fault tolerance.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "relational-database-management-system-rdbm-",
    "term": "Relational Database Management System (RDBMS)",
    "definition": "Definition needed for Relational Database Management System (RDBMS).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "reliability",
    "term": "Reliability",
    "definition": "Definition needed for Reliability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "replication",
    "term": "Replication",
    "definition": "The process of creating and maintaining multiple copies of data on different database servers. Used for High Availability, Fault Tolerance, and read scaling.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "replication-database-",
    "term": "Replication (Database)",
    "definition": "The process of creating and maintaining multiple copies of data on different database servers. Replication can improve Availability, Fault Tolerance, and read Scalability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "request-reply-rpc-over-messaging-",
    "term": "Request/Reply (RPC over Messaging)",
    "definition": "A sender (requester) sends a message and expects a response from the receiver. Often implemented using a pair of queues: one for requests and one for replies, with a Correlation ID to match requests to responses.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "round-robin",
    "term": "Round Robin",
    "definition": "A basic algorithm that distributes requests sequentially to each server in a pool.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sql",
    "term": "SQL",
    "definition": "A domain-specific language used in programming and designed for managing data held in a Relational Database Management System (RDBMS), or for stream processing in a relational data stream management system (RDSMS).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sql-structured-query-language-",
    "term": "SQL (Structured Query Language)",
    "definition": "A domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "saga-pattern-choreography-orchestration-",
    "term": "Saga Pattern (Choreography/Orchestration)",
    "definition": "Managing distributed transactions using a sequence of local transactions, each updating its own service's data and publishing an event/message that triggers the next local transaction in another service. Compensation actions are used to roll back if a step fails.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "scalability",
    "term": "Scalability",
    "definition": "The property of a system to handle a growing amount of work by adding resources to the system. This can be achieved by scaling up (Vertical Scaling) or scaling out (Horizontal Scaling).",
    "details": "The ability of a system to handle a growing amount of work by adding resources, either hardware or software.",
    "synonyms": []
  },
  {
    "id": "schema-first",
    "term": "Schema-First",
    "definition": "Design approach where the API/schema is defined before implementation (common in GraphQL).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "schema-first-design",
    "term": "Schema-First Design",
    "definition": "Design approach where the API/schema is defined before implementation (common in GraphQL).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "server-pool--backend-pool",
    "term": "Server Pool / Backend Pool",
    "definition": "A group of backend servers configured to receive traffic for a specific application or service.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "service-mesh",
    "term": "Service Mesh",
    "definition": "An infrastructure layer for managing service-to-service communication (e.g., Istio, Linkerd), offering traffic control, security, and observability.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "session-affinity",
    "term": "Session Affinity",
    "definition": "Definition needed for Session Affinity.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sharding-database-",
    "term": "Sharding (Database)",
    "definition": "A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards. Each shard is often hosted on a separate server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sharding-horizontal-partitioning-",
    "term": "Sharding (Horizontal Partitioning)",
    "definition": "The process of breaking up a large database into smaller, more manageable pieces called shards. Data is distributed across shards based on a shard key.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sharding-strategy",
    "term": "Sharding Strategies",
    "definition": "Methods for distributing data across multiple database shards.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sidecar-pattern",
    "term": "Sidecar Pattern",
    "definition": "Deploy components of an application into a separate process or container to provide isolation and encapsulation. The sidecar is attached to a parent application and shares its lifecycle.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "software-load-balancer",
    "term": "Software Load Balancers",
    "definition": "Applications that run on standard commodity hardware (physical servers, virtual machines, or containers). Examples: Nginx, HAProxy, Envoy, Traefik.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "socket-network-socket-",
    "term": "Sockets (Network Sockets)",
    "definition": "An endpoint of a bidirectional inter-process communication flow across an Internet Protocol-based computer network, such as the Internet. A socket is identified by an IP address and a port number.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "stale-data",
    "term": "Stale Data",
    "definition": "Cached data that no longer matches the origin data because the origin data has changed and the cache hasn't been updated.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "stateful-architecture",
    "term": "Stateful Architecture",
    "definition": "An architecture where the server stores information (state) about client sessions and uses this stored state to process requests.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "stateless-architecture",
    "term": "Stateless Architecture",
    "definition": "An architecture where each request from a client to a server must contain all the information needed to be understood by the server, without relying on any stored server-side session state.",
    "details": "Each request from client to server must contain all information needed to be understood; the server does not store any client session state between requests.",
    "synonyms": []
  },
  {
    "id": "statelessnes",
    "term": "Statelessness",
    "definition": "A characteristic of REST APIs where each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "sticky-session-session-affinity-",
    "term": "Sticky Sessions (Session Affinity)",
    "definition": "A mechanism ensuring that requests from a specific client are consistently routed to the same backend server. Useful for applications that store session state locally on servers.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "strangler-fig-pattern",
    "term": "Strangler Fig Pattern",
    "definition": "Incrementally replace parts of a monolith by routing new features to Microservices until the monolith is ‘strangled.’",
    "details": "",
    "synonyms": []
  },
  {
    "id": "strong-consistency",
    "term": "Strong Consistency",
    "definition": "After an update completes, any subsequent access (by any client) will return the updated value. Often found in traditional RDBMS.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "synchronous-api",
    "term": "Synchronous APIs",
    "definition": "Definition needed for Synchronous APIs.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "tcp",
    "term": "TCP",
    "definition": "One of the main protocols of the Internet protocol suite. It provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "tcp-ip-model",
    "term": "TCP/IP Model",
    "definition": "Suite of protocols for internet communication. TCP provides reliable, ordered, error-checked delivery.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "tls-ssl",
    "term": "TLS (SSL)",
    "definition": "Transport Layer Security (TLS), formerly Secure Sockets Layer (SSL), are cryptographic protocols that provide communications security over a computer network.",
    "details": "TLS is the successor to SSL.",
    "synonyms": ["SSL","Transport Layer Security","Secure Sockets Layer"]
  },
  {
    "id": "tls-ssl-http-",
    "term": "TLS/SSL (HTTPS)",
    "definition": "Using Transport Layer Security (TLS) or its predecessor Secure Sockets Layer (SSL) to encrypt data in transit between the client and the API server (HTTPS).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "tls-ssl-transport-layer-security-secure-socket-layer-",
    "term": "TLS/SSL (Transport Layer Security/Secure Sockets Layer)",
    "definition": "Cryptographic protocols that provide communications security over a computer network. TLS is the successor to SSL. They are widely used in applications such as web browsing (HTTPS), email, instant messaging, and VoIP.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "ttfb",
    "term": "TTFB",
    "definition": "A metric that measures the responsiveness of a web server or other network resource. It's the time between the client making an HTTP request and receiving the first byte of the response from the server.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "thundering-herd",
    "term": "Thundering Herd",
    "definition": "A burst of traffic to the origin caused when a cache entry expires and many clients fetch from the database at once. Mitigated by techniques like request coalescing.",
    "details": "A burst of traffic to the origin caused when a cache entry expires and many clients fetch from the database at once. Mitigated by techniques like Request Coalescing.",
    "synonyms": []
  },
  {
    "id": "throughput",
    "term": "Throughput",
    "definition": "The rate at which data can be processed or transmitted by a system. Often measured in requests per second or data volume per unit of time.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "throughput-cdn-",
    "term": "Throughput (CDN)",
    "definition": "The rate of successful data transfer through the CDN.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "time-to-first-byte-ttfb-",
    "term": "Time to First Byte (TTFB)",
    "definition": "A metric that measures the responsiveness of a web server or other network resource. It's the time between the client making an HTTP request and receiving the first byte of the response from the server.",
    "details": "The time it takes for a user to receive the first byte of the response after the browser sends a request. A high TTFB can indicate a slow load balancer or backend server.",
    "synonyms": []
  },
  {
    "id": "time-to-live-ttl-",
    "term": "Time To Live (TTL)",
    "definition": "A duration for which a cache entry is considered valid. After TTL expires, the entry may be removed or refreshed.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "topic",
    "term": "Topic",
    "definition": "A named channel or category to which messages are published. Used in publish/subscribe messaging systems where multiple consumers can subscribe to the same topic.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "transaction",
    "term": "Transaction",
    "definition": "Definition needed for Transaction.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "udp",
    "term": "UDP",
    "definition": "A simpler message-oriented transport layer protocol in the Internet protocol suite. It is connectionless and does not provide reliability, ordering, or data integrity checking, making it faster but less reliable than TCP.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "uniform-interface",
    "term": "Uniform Interface",
    "definition": "Definition needed for Uniform Interface.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "upstream--backend-server--origin-server",
    "term": "Upstream / Backend Server / Origin Server",
    "definition": "The pool of application servers that the load balancer distributes traffic to.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "url-hash",
    "term": "URL Hash",
    "definition": "Calculates a hash of the request URL (or part of it) and uses this to determine the backend server. Useful for caching strategies proxies.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "vip-virtual-ip-address-",
    "term": "VIP (Virtual IP Address)",
    "definition": "A single IP address that clients connect to. The load balancer uses this IP to distribute requests to multiple backend servers.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "vertical-scaling-scaling-up-",
    "term": "Vertical Scaling (Scaling Up)",
    "definition": "Increasing the resources (CPU, RAM, storage) of existing machines in a system. E.g., upgrading a server to a more powerful one.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "websocket",
    "term": "WebSocket",
    "definition": "A communication protocol that provides full-duplex communication channels over a single TCP connection. It enables interaction between a client and a web server with lower overheads, facilitating real-time data transfer.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "webhook",
    "term": "Webhook",
    "definition": "An HTTP callback or HTTP POST that occurs when something happens; a simple event-notification via HTTP POST. Used for asynchronous communication from server to client.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "weighted-least-connection",
    "term": "Weighted Least Connections",
    "definition": "Combines Least Connections with server weights. The load balancer selects the server with the fewest active connections relative to its assigned weight (e.g., (connections / weight) should be minimal).",
    "details": "",
    "synonyms": []
  },
  {
    "id": "weighted-round-robin",
    "term": "Weighted Round Robin",
    "definition": "Servers are assigned a static weight (a numerical value) based on their capacity or perceived Performance (e.g., CPU power, RAM). Servers with higher weights receive a proportionally larger number of requests in the round-robin cycle.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "write-around",
    "term": "Write-Around",
    "definition": "Data is written directly to the primary data store, bypassing the cache entirely. Only on a cache miss during a read operation is the data loaded into the cache.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "write-back-write-behind-",
    "term": "Write-Back (Write-Behind)",
    "definition": "Data is written directly to the cache, and the cache acknowledges the write immediately. The cache then asynchronously writes the data to the primary data store after a delay or in batches.",
    "details": "",
    "synonyms": []
  },
  {
    "id": "write-through",
    "term": "Write-Through",
    "definition": "Data is written to the cache and the primary data store (origin) simultaneously, in a single transaction. The operation completes only after both writes are successful.",
    "details": "",
    "synonyms": []
  }
];
