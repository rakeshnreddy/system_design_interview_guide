export const glossaryData = [
  {
    "id": "api",
    "term": "API (Application Programming Interface)",
    "definition": "A set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange information.",
    "icon": "Network"
  },
  {
    "id": "microservices",
    "term": "Microservices Architecture",
    "definition": "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain. Each service is self-contained and can be deployed, scaled, and managed independently.",
    "icon": "Blocks"
  },
  {
    "id": "monolith",
    "term": "Monolithic Architecture",
    "definition": "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process.",
    "icon": "Library"
  },
  {
    "id": "load-balancer",
    "term": "Load Balancer",
    "definition": "A device or software that distributes network or application traffic across multiple servers. Load balancers are used to improve responsiveness and availability of applications.",
    "icon": "Waypoints"
  },
  {
    "id": "database",
    "term": "Database",
    "definition": "An organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
    "icon": "Database"
  },
  {
    id: "sql",
    term: "SQL (Structured Query Language)",
    definition: "A domain-specific language used in programming and designed for managing data held in a {{Relational Database Management System (RDBMS)}}, or for stream processing in a relational data stream management system (RDSMS).",
    icon: "DatabaseZap" // Lucide icon: DatabaseZap, FileText, Rows
  },
  {
    id: "nosql",
    term: "NoSQL Database",
    definition: "A database that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in [relational databases](#/databases?section=relational). NoSQL databases are often used in big data and real-time web applications.",
    icon: "DatabaseBackup" // Lucide icon: DatabaseBackup, Files, Container

  },
  {
    "id": "cache",
    "term": "Cache",
    "definition": "A hardware or software component that stores data so that future requests for that data can be served faster; the data stored in a cache might be the result of an earlier computation or a copy of data stored elsewhere.",
    "icon": "MemoryStick"
  },
  {
    "id": "cdn",
    "term": "CDN (Content Delivery Network)",
    "definition": "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end-users.",
    "icon": "Globe"
  },
  {
    "id": "message-queue",
    "term": "Message Queue",
    "definition": "A component of messaging middleware solutions that enables asynchronous communication between different parts of a distributed system. Messages are stored in a queue until they are processed by a consumer.",
    "icon": "Mailbox"
  },
  {
    id: "scalability",
    term: "Scalability",
    definition: "The property of a system to handle a growing amount of work by adding resources to the system. This can be achieved by scaling up ({{Vertical Scaling}}) or scaling out ({{Horizontal Scaling}}).",
    icon: "TrendingUp" // Lucide icon: TrendingUp, BarChartBig, AreaChart

  },
  {
    "id": "availability",
    "term": "Availability",
    "definition": "The proportion of time a system is in a functioning condition. High availability systems aim to minimize downtime and ensure continuous operation.",
    "icon": "ShieldCheck"
  },
  {
    "id": "consistency",
    "term": "Consistency (in CAP Theorem)",
    "definition": "Ensures that all nodes in a distributed system see the same data at the same time. After an update, all reads should return the updated value.",
    "icon": "GitCompareArrows"
  },
  {
    "id": "partition-tolerance",
    "term": "Partition Tolerance (in CAP Theorem)",
    "definition": "The ability of a distributed system to continue operating despite network partitions (communication breakdowns between nodes).",
    "icon": "NetworkOff"
  },
  {
    "id": "cap-theorem",
    "term": "CAP Theorem",
    "definition": "A theorem for distributed data stores that states it is impossible for a distributed system to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.",
    "icon": "Triangle"
  },
  {

    id: "acid",
    term: "ACID Properties",
    definition: "A set of properties ({{Atomicity}}, {{Consistency}}, {{Isolation}}, {{Durability}}) that guarantee {{Database Transaction|database transactions}} are processed reliably. Typically associated with [relational databases](#/databases?section=relational).",
    icon: "Lock" // Lucide icon: Lock, Shield, Gem
  },
  {
    id: "base",
    term: "BASE Properties",
    definition: "An alternative to {{ACID Properties|ACID}} ({{Basically Available}}, {{Soft state}}, {{Eventual consistency}}) often used by [NoSQL databases](#/databases?section=nosql), prioritizing {{Availability}} and {{Scalability}} over strict {{Consistency}}.",
    icon: "Unlock" // Lucide icon: Unlock, Waves, CloudDrizzle

  },
  {
    "id": "stateless-architecture",
    "term": "Stateless Architecture",
    "definition": "An architecture where each request from a client to a server must contain all the information needed to be understood by the server, without relying on any stored server-side session state.",
    "icon": "ServerOff"
  },
  {
    "id": "stateful-architecture",
    "term": "Stateful Architecture",
    "definition": "An architecture where the server stores information (state) about client sessions and uses this stored state to process requests.",
    "icon": "ServerCog"
  },
  {
    id: "sharding",
    term: "Sharding (Database)",
    definition: "A type of [database](#/databases) partitioning that separates very large [databases](#/databases) into smaller, faster, more easily managed parts called data shards. Each shard is often hosted on a separate server.",
    icon: "Spline" // Lucide icon: Spline, Ungroup, Columns
  },
  {
    id: "replication",
    term: "Replication (Database)",
    definition: "The process of creating and maintaining multiple copies of data on different [database](#/databases) servers. Replication can improve {{Availability}}, {{Fault Tolerance}}, and read {{Scalability}}.",
    icon: "Copy" // Lucide icon: Copy, Library, ServerCrash

  },
  {
    "id": "latency",
    "term": "Latency",
    "definition": "The delay before a transfer of data begins following an instruction for its transfer. In networking, it's the time it takes for a data packet to travel from one point to another.",
    "icon": "Timer"
  },
  {
    "id": "throughput",
    "term": "Throughput",
    "definition": "The rate at which data can be processed or transmitted by a system. Often measured in requests per second or data volume per unit of time.",
    "icon": "BarChartHorizontalBig"
  },
  {
    id: "dns",
    term: "DNS (Domain Name System)",
    definition: "A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names (e.g., www.example.com) into machine-readable {{IP Addresses}}.",
    icon: "BookMarked" // Lucide icon: BookMarked, LocateFixed, Compass

  },
  {
    "id": "oauth",
    "term": "OAuth",
    "definition": "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.",
    "icon": "KeyRound"
  },
  {
    id: "rest",
    term: "REST (Representational State Transfer)",
    definition: "An architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol—and in virtually all cases, the {{HTTP}} protocol is used.",
    icon: "Globe2" // Lucide icon: Globe2, HttpGet, Share2
  },
  {
    id: "grpc",
    term: "gRPC (Google Remote Procedure Call)",
    definition: "A high-performance, open-source universal RPC framework. gRPC typically uses {{Protocol Buffers}} as its interface definition language and message interchange format.",
    icon: "Cog" // Lucide icon: Cog, Binary, Settings2
  },
  {
    id: "websocket",
    term: "WebSocket",
    definition: "A communication protocol that provides full-duplex communication channels over a single {{TCP}} connection. It enables interaction between a client and a web server with lower overheads, facilitating real-time data transfer.",
    icon: "ArrowRightLeft" // Lucide icon: ArrowRightLeft, MessageCircle, RadioTower
  },
  {
    id: "docker",
    term: "Docker",
    definition: "A platform that uses OS-level virtualization to deliver software in packages called {{Containers}}. Containers are isolated from one another and bundle their own software, libraries and configuration files.",
    icon: "Container" // Lucide icon: Container, Box, PackageSearch
  },
  {
    id: "kubernetes",
    term: "Kubernetes (K8s)",
    definition: "An open-source {{Container Orchestration}} system for automating software deployment, scaling, and management. It groups {{Containers}} that make up an application into logical units for easy management and discovery.",
    icon: "Ship" // Lucide icon: Ship, Anchor, Workflow
  },
  {
    "id": "graphql",
    "term": "GraphQL",
    "definition": "A query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data."
  },
  {
    "id": "idempotency",
    "term": "Idempotency",
    "definition": "An operation is idempotent if making the same request multiple times produces the same result as making it once (e.g., PUT, DELETE)."
  },
  {
    "id": "pagination",
    "term": "Pagination",
    "definition": "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses. Common methods: offset-based, cursor-based."
  },
  {
    "id": "rate-limiting",
    "term": "Rate Limiting",
    "definition": "Restricting the number of API requests a client can make within a certain time window to prevent abuse and ensure fair usage."
  },
  {
    "id": "api-versioning",
    "term": "API Versioning",
    "definition": "Managing changes to an API over time by creating distinct versions (e.g., /v1/users, /v2/users) to avoid breaking existing client integrations."
  },
  {
    "id": "authentication-authn",
    "term": "Authentication (AuthN)",
    "definition": "The process of verifying the identity of a client or user trying to access the API (e.g., API keys, OAuth 2.0 tokens)."
  },
  {
    "id": "authorization-authz",
    "term": "Authorization (AuthZ)",
    "definition": "The process of determining whether an authenticated client or user has permission to perform a specific action or access a particular resource."
  },
  {
    "id": "openapi-specification-swagger",
    "term": "OpenAPI Specification (Swagger)",
    "definition": "A standard, language-agnostic interface description for RESTful APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code or documentation."
  },
  {
    "id": "webhook",
    "term": "Webhook",
    "definition": "An HTTP callback or HTTP POST that occurs when something happens; a simple event-notification via HTTP POST. Used for asynchronous communication from server to client."
  },
  {
    "id": "statelessness",
    "term": "Statelessness",
    "definition": "A characteristic of REST APIs where each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server."
  },
  {
    "id": "hypermedia",
    "term": "HATEOAS",
    "definition": "Hypermedia As The Engine Of Application State: REST constraint where responses include hyperlinks for discoverability."
  },
  {
    "id": "schemafirst",
    "term": "Schema-First",
    "definition": "Design approach where the API/schema is defined before implementation (common in GraphQL)."
  },
  {
    "id": "cache-hit",
    "term": "Cache Hit",
    "definition": "A request for data that is successfully found in the cache."
  },
  {
    "id": "cache-miss",
    "term": "Cache Miss",
    "definition": "A request for data that is not found in the cache, requiring a fetch from the origin data store."
  },
  {
    "id": "cache-entry",
    "term": "Cache Entry",
    "definition": "A piece of data stored in the cache, typically a key-value pair."
  },
  {
    "id": "time-to-live-ttl",
    "term": "Time To Live (TTL)",
    "definition": "A duration for which a cache entry is considered valid. After TTL expires, the entry may be removed or refreshed."
  },
  {
    "id": "stale-data",
    "term": "Stale Data",
    "definition": "Cached data that no longer matches the origin data because the origin data has changed and the cache hasn't been updated."
  },
  {
    "id": "cache-invalidation",
    "term": "Cache Invalidation",
    "definition": "The process of removing or marking a cache entry as invalid, forcing a refresh from the origin on the next request."
  },
  {
    "id": "thundering-herd",
    "term": "Thundering Herd",
    "definition": "A burst of traffic to the origin caused when a cache entry expires and many clients fetch from the database at once. Mitigated by techniques like request coalescing."
  },
  {
    "id": "orm",
    "term": "ORM (Object-Relational Mapping)",
    "definition": "A programming technique for converting data between incompatible type systems using object-oriented programming languages. Simplifies interaction with relational databases."
  },
  {
    "id": "index",
    "term": "Database Index",
    "definition": "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure."
  },
  {
    "id": "transaction",
    "term": "Database Transaction",
    "definition": "A sequence of one or more database operations (reads, writes, updates) that are executed as a single, atomic unit of work."
  },
  {
    "id": "newsql",
    "term": "NewSQL",
    "definition": "A class of modern relational databases that aim to provide the scalability of NoSQL systems while maintaining ACID guarantees of SQL systems. Examples include Google Spanner, CockroachDB."
  },
  {
    "id": "vip-virtual-ip-address",
    "term": "VIP (Virtual IP Address)",
    "definition": "A single IP address that clients connect to. The load balancer uses this IP to distribute requests to multiple backend servers."
  },
  {
    "id": "upstream-backend-server-origin-server",
    "term": "Upstream / Backend Server / Origin Server",
    "definition": "The pool of application servers that the load balancer distributes traffic to."
  },
  {
    "id": "server-pool-backend-pool",
    "term": "Server Pool / Backend Pool",
    "definition": "A group of backend servers configured to receive traffic for a specific application or service."
  },
  {
    "id": "health-checks",
    "term": "Health Checks",
    "definition": "Periodic checks performed by the load balancer to determine the status (health) of backend servers. Unhealthy servers are temporarily removed from rotation."
  },
  {
    "id": "sticky-sessions-session-affinity",
    "term": "Sticky Sessions (Session Affinity)",
    "definition": "A mechanism ensuring that requests from a specific client are consistently routed to the same backend server. Useful for applications that store session state locally on servers."
  },
  {
    "id": "layer-4-l4-load-balancing",
    "term": "Layer 4 (L4) Load Balancing",
    "definition": "Operates at the transport layer (TCP/UDP). Makes routing decisions based on IP addresses and ports. It doesn't inspect packet content."
  },
  {
    "id": "layer-7-l7-load-balancing",
    "term": "Layer 7 (L7) Load Balancing",
    "definition": "Operates at the application layer (HTTP/HTTPS). Can inspect content like HTTP headers, cookies, URLs to make more intelligent routing decisions."
  },
  {
    "id": "round-robin",
    "term": "Round Robin",
    "definition": "A basic algorithm that distributes requests sequentially to each server in a pool."
  },
  {
    "id": "least-connections",
    "term": "Least Connections",
    "definition": "An algorithm that directs traffic to the server with the fewest active connections."
  },
  {
    "id": "global-server-load-balancing-gslb",
    "term": "Global Server Load Balancing (GSLB)",
    "definition": "Load balancing across multiple geographically distributed data centers or server locations."
  },
  {
    "id": "failover",
    "term": "Failover",
    "definition": "The process of automatically redirecting traffic away from a failed server or data center to a healthy one."
  },
  {
    "id": "anycast",
    "term": "Anycast",
    "definition": "A network addressing technique where the same IP is advertised from multiple nodes. In load balancing, allows traffic to automatically route to the nearest or healthiest node (used in global DNS load balancing)."
  },
  {
    "id": "producer",
    "term": "Producer (Publisher)",
    "definition": "An application component that creates and sends messages to a message queue or topic."
  },
  {
    "id": "consumer",
    "term": "Consumer (Subscriber)",
    "definition": "An application component that subscribes to a message queue or topic and processes messages received from it."
  },
  {
    "id": "broker",
    "term": "Broker",
    "definition": "The message queue server software that manages the storage and routing of messages between producers and consumers."
  },
  {
    "id": "queue",
    "term": "Queue",
    "definition": "A data structure that stores messages in a sequence (often FIFO - First-In, First-Out) until they are processed by a consumer. Typically used in point-to-point messaging."
  },
  {
    "id": "topic",
    "term": "Topic",
    "definition": "A named channel or category to which messages are published. Used in publish/subscribe messaging systems where multiple consumers can subscribe to the same topic."
  },
  {
    "id": "exchange_rabbitmq",
    "term": "Exchange (RabbitMQ specific)",
    "definition": "In RabbitMQ, producers publish messages to an exchange, which then routes them to bound queues based on rules and bindings."
  },
  {
    "id": "dead_letter_queue",
    "term": "Dead Letter Queue (DLQ)",
    "definition": "A dedicated queue where messages that cannot be processed successfully by a consumer (after retries, or due to errors) are sent for later analysis or manual intervention."
  },
  {
    "id": "backpressure",
    "term": "Backpressure",
    "definition": "A mechanism to signal producers to slow down when consumers cannot keep up, preventing system overload."
  },
  {
    "id": "message_acknowledgement",
    "term": "Message Acknowledgement (Ack/Nack)",
    "definition": "A signal sent by a consumer to the broker indicating that a message has been successfully processed (Ack) or failed processing (Nack). The broker uses this to decide whether to redeliver the message or remove it from the queue."
  },
  {
    "id": "offset",
    "term": "Offset",
    "definition": "In Kafka, a sequential ID assigned to each message in a partition, used by consumers to track read position."
  },
  {
    "id": "consumer_group_kafka",
    "term": "Consumer Group (Kafka specific)",
    "definition": "One or more consumers that jointly consume messages from one or more Kafka topic partitions. Each partition is consumed by only one consumer within a group, allowing for parallel processing."
  },
  {
    "id": "publishSubscribe",
    "term": "Publish–Subscribe",
    "definition": "A messaging pattern where messages are broadcast to multiple subscribers based on topics or channels."
  },
  {
    "id": "n-tier-architecture",
    "term": "N-tier Architecture",
    "definition": "A client-server architecture in which presentation, application processing, and data management functions are physically separated into layers (tiers)."
  },
  {
    "id": "redundancy",
    "term": "Redundancy",
    "definition": "Duplication of critical components or functions of a system with the intention of increasing reliability and fault tolerance."
  },
  {
    "id": "fault-tolerance",
    "term": "Fault Tolerance",
    "definition": "The ability of a system to continue operating, possibly at a reduced level, rather than failing completely when some part of the system fails."
  },
  {
    "id": "eventDriven",
    "term": "Event-Driven Architecture",
    "definition": "A design paradigm where services emit and react to events, enabling loose coupling and asynchronous workflows."
  },
  {
    "id": "serviceMesh",
    "term": "Service Mesh",
    "definition": "An infrastructure layer for managing service-to-service communication (e.g., Istio, Linkerd), offering traffic control, security, and observability."
  },
  {
    "id": "tls-ssl",
    "term": "TLS/SSL (Transport Layer Security/Secure Sockets Layer)",
    "definition": "Cryptographic protocols that provide communications security over a computer network. TLS is the successor to SSL. They are widely used in applications such as web browsing ({{HTTPS}}), email, instant messaging, and VoIP.",
    "icon": "LockKeyhole"
  },
  {
    "id": "cdn-edge-server",
    "term": "CDN Edge Server (PoP)",
    "definition": "A server at a CDN's Point of Presence (PoP) located geographically close to users. It caches and delivers content, reducing latency and load on origin servers.",
    "icon": "Server"
  },
  {
    "id": "cdn-propagation",
    "term": "CDN Propagation",
    "definition": "The time it takes for content changes (updates or purges) from an origin server to be reflected across all edge servers in a CDN network.",
    "icon": "Replace"
  },
  {
    "id": "ttfb",
    "term": "Time to First Byte (TTFB)",
    "definition": "A metric that measures the responsiveness of a web server or other network resource. It's the time between the client making an HTTP request and receiving the first byte of the response from the server.",
    "icon": "Gauge"
  },
  {
    "id": "http-methods",
    "term": "HTTP Methods (Verbs)",
    "definition": "A set of request methods to indicate the desired action to be performed for a given resource. Common methods include GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.",
    "icon": "ListTodo"
  },
  {
    "id": "http-status-codes",
    "term": "HTTP Status Codes",
    "definition": "Standardized three-digit codes issued by a server in response to a client's request made to the server. Examples: 200 OK, 404 Not Found, 500 Internal Server Error.",
    "icon": "FileBadge"
  },
  {
    "id": "tcp",
    "term": "TCP (Transmission Control Protocol)",
    "definition": "One of the main protocols of the Internet protocol suite. It provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network.",
    "icon": "Network"
  },
  {
    "id": "udp",
    "term": "UDP (User Datagram Protocol)",
    "definition": "A simpler message-oriented transport layer protocol in the Internet protocol suite. It is connectionless and does not provide reliability, ordering, or data integrity checking, making it faster but less reliable than TCP.",
    "icon": "Network"
  },
  {
    "id": "network-sockets",
    "term": "Sockets (Network Sockets)",
    "definition": "An endpoint of a bidirectional inter-process communication flow across an Internet Protocol-based computer network, such as the Internet. A socket is identified by an IP address and a port number.",
    "icon": "PlugZap"
  },
  {
    "id": "cache-control",
    "term": "Cache-Control Headers",
    "definition": "HTTP headers that specify browser and proxy caching policies for a resource (e.g., `max-age`, `no-cache`, `public`, `private`). Essential for controlling how CDNs and clients cache content.",
    "icon": "History"
  },
  {
    "id": "ip-address",
    "term": "IP Address",
    "definition": "A numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: host or network interface identification and location addressing.",
    "icon": "LocateFixed"
  },
  {
    "id": "http",
    "term": "HTTP (Hypertext Transfer Protocol)",
    "definition": "The foundation of data communication for the World Wide Web. It is an application protocol for distributed, collaborative, hypermedia information systems.",
    "icon": "Globe2"
  },
  {
    "id": "https",
    "term": "HTTPS (HTTP Secure)",
    "definition": "An extension of the Hypertext Transfer Protocol (HTTP) for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL).",
    "icon": "LockKeyhole"
  }
];
