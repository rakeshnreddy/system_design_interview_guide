export const glossaryData = [
  {
    id: "api",
    term: "API (Application Programming Interface)",
    definition: "A set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange information.",
    icon: "Network" // Lucide icon: Network, Code, Waypoints
  },
  {
    id: "microservices",
    term: "Microservices Architecture",
    definition: "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain. Each service is self-contained and can be deployed, scaled, and managed independently.",
    icon: "Blocks" // Lucide icon: Blocks, AppWindow, ServerCog
  },
  {
    id: "monolith",
    term: "Monolithic Architecture",
    definition: "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process.",
    icon: "Library" // Lucide icon: Library, Archive, Component
  },
  {
    id: "load-balancer",
    term: "Load Balancer",
    definition: "A device or software that distributes network or application traffic across multiple servers. Load balancers are used to improve responsiveness and availability of applications.",
    icon: "Waypoints" // Lucide icon: Waypoints, Server, Shuffle
  },
  {
    id: "database",
    term: "Database",
    definition: "An organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
    icon: "Database" // Lucide icon: Database, HardDrive, Cylinder
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
    id: "cache",
    term: "Cache",
    definition: "A hardware or software component that stores data so that future requests for that data can be served faster; the data stored in a cache might be the result of an earlier computation or a copy of data stored elsewhere.",
    icon: "MemoryStick" // Lucide icon: MemoryStick, Rabbit, History
  },
  {
    id: "cdn",
    term: "CDN (Content Delivery Network)",
    definition: "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end-users.",
    icon: "Globe" // Lucide icon: Globe, Cloud, ServerNetwork
  },
  {
    id: "message-queue",
    term: "Message Queue",
    definition: "A component of messaging middleware solutions that enables asynchronous communication between different parts of a distributed system. Messages are stored in a queue until they are processed by a consumer.",
    icon: "Mailbox" // Lucide icon: Mailbox, MessagesSquare, ListCollapse
  },
  {
    id: "scalability",
    term: "Scalability",
    definition: "The property of a system to handle a growing amount of work by adding resources to the system. This can be achieved by scaling up ({{Vertical Scaling}}) or scaling out ({{Horizontal Scaling}}).",
    icon: "TrendingUp" // Lucide icon: TrendingUp, BarChartBig, AreaChart
  },
  {
    id: "availability",
    term: "Availability",
    definition: "The proportion of time a system is in a functioning condition. High availability systems aim to minimize downtime and ensure continuous operation.",
    icon: "ShieldCheck" // Lucide icon: ShieldCheck, Power, Wifi
  },
  {
    id: "consistency",
    term: "Consistency (in CAP Theorem)",
    definition: "Ensures that all nodes in a distributed system see the same data at the same time. After an update, all reads should return the updated value.",
    icon: "GitCompareArrows" // Lucide icon: GitCompareArrows, CheckCircle, Scale
  },
  {
    id: "partition-tolerance",
    term: "Partition Tolerance (in CAP Theorem)",
    definition: "The ability of a distributed system to continue operating despite network partitions (communication breakdowns between nodes).",
    icon: "NetworkOff" // Lucide icon: NetworkOff, AlertTriangle, ShieldAlert
  },
  {
    id: "cap-theorem",
    term: "CAP Theorem",
    definition: "A theorem for distributed data stores that states it is impossible for a distributed system to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.",
    icon: "Triangle" // Lucide icon: Triangle, Balance, Puzzle
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
    id: "stateless",
    term: "Stateless Architecture",
    definition: "An architecture where each request from a client to a server must contain all the information needed to be understood by the server, without relying on any stored server-side session state.",
    icon: "ServerOff" // Lucide icon: ServerOff, CloudSnow, PackageOpen
  },
  {
    id: "stateful",
    term: "Stateful Architecture",
    definition: "An architecture where the server stores information (state) about client sessions and uses this stored state to process requests.",
    icon: "ServerCog" // Lucide icon: ServerCog, CloudCog, Package
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
    id: "latency",
    term: "Latency",
    definition: "The delay before a transfer of data begins following an instruction for its transfer. In networking, it's the time it takes for a data packet to travel from one point to another.",
    icon: "Timer" // Lucide icon: Timer, Gauge, Network
  },
  {
    id: "throughput",
    term: "Throughput",
    definition: "The rate at which data can be processed or transmitted by a system. Often measured in requests per second or data volume per unit of time.",
    icon: "BarChartHorizontalBig" // Lucide icon: BarChartHorizontalBig, Plane, Zap
  },
  {
    id: "dns",
    term: "DNS (Domain Name System)",
    definition: "A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names (e.g., www.example.com) into machine-readable {{IP Addresses}}.",
    icon: "BookMarked" // Lucide icon: BookMarked, LocateFixed, Compass
  },
  {
    id: "oauth",
    term: "OAuth",
    definition: "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.",
    icon: "KeyRound" // Lucide icon: KeyRound, UserCheck, ShieldQuestion
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
  }
];
