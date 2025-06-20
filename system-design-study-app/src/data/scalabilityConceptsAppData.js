export const scalabilityConceptsAppData = {
  title: "Scalability Concepts",
  metrics: [
    {
      id: "scalability_factor",
      name: "Scalability Factor",
      description: "A measure of how much a system's performance improves when resources are added. E.g., if doubling resources doubles throughput, scalability factor is 2."
    },
    {
      id: "performance_under_load",
      name: "Performance Under Load",
      description: "How system performance (latency, throughput, error rate) behaves as the load (requests, users, data volume) increases. Key metrics include response time at P95/P99."
    },
    {
      id: "cost_efficiency",
      name: "Cost Efficiency (Scalability)",
      description: "The cost of resources required to achieve a certain level of performance or handle a certain load. Scalable systems aim for proportional (or better) cost increase with load."
    },
    {
      id: "resource_utilization",
      name: "Resource Utilization (%)",
      description: "The percentage of available resources (CPU, memory, network, disk I/O) being used. High utilization can indicate a bottleneck; low utilization might mean over-provisioning."
    }
  ],
  terminology: [
    {
      term: "Scalability",
      definition: "The ability of a system to handle a growing amount of work by adding resources, either hardware or software."
    },
    {
      term: "Horizontal Scaling (Scaling Out)",
      definition: "Adding more machines (nodes/servers) to a system to distribute the load. E.g., adding more web servers to a load balancer pool."
    },
    {
      term: "Vertical Scaling (Scaling Up)",
      definition: "Increasing the resources (CPU, RAM, storage) of existing machines in a system. E.g., upgrading a server to a more powerful one."
    },
    {
      term: "CAP Theorem",
      definition: "In a distributed data store, only two of the following three guarantees can be provided simultaneously: Consistency, Availability, and Partition Tolerance."
    },
    {
      term: "ACID Properties",
      definition: "Atomicity, Consistency, Isolation, Durability. A set of properties guaranteeing reliable transaction processing, common in relational databases."
    },
    {
      term: "BASE Properties",
      definition: "Basically Available, Soft state, Eventual consistency. An alternative to ACID for NoSQL databases, emphasizing availability and scalability over strict consistency."
    },
    {
      term: "Stateless Architecture",
      definition: "Each request from client to server must contain all information needed to be understood; the server does not store any client session state between requests."
    },
    {
      term: "Stateful Architecture",
      definition: "The server stores information (state) about client sessions and uses this stored state to process requests."
    },
    {
      term: "N-tier Architecture",
      definition: "A client-server architecture in which presentation, application processing, and data management functions are physically separated into layers (tiers)."
    },
    {
      term: "Microservices Architecture",
      definition: "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain."
    },
    {
      term: "Monolithic Architecture",
      definition: "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process."
    },
    {
      term: "Load Balancing",
      definition: "Distributing incoming network or application traffic across multiple backend servers to improve performance, availability, and scalability."
    },
    {
      term: "Caching",
      definition: "Storing frequently accessed data in a temporary, fast-access storage layer to reduce latency and load on backend systems."
    },
    {
      term: "Database Replication",
      definition: "Creating and maintaining multiple copies of a database to improve availability, fault tolerance, and read scalability (read replicas)."
    },
    {
      term: "Database Sharding (Partitioning)",
      definition: "Dividing a large database into smaller, independent, more manageable parts called shards. Each shard can be hosted on a separate server."
    },
    {
      term: "Redundancy",
      definition: "Duplication of critical components or functions of a system with the intention of increasing reliability and fault tolerance."
    },
    {
      term: "Fault Tolerance",
      definition: "The ability of a system to continue operating, possibly at a reduced level, rather than failing completely when some part of the system fails."
    }
  ],
  coreConcepts: [
    {
      id: "cap_theorem_explained",
      name: "CAP Theorem (Consistency, Availability, Partition Tolerance)",
      // visualLink: "diagram-cap-theorem.svg"
      explanation: "The CAP theorem, also known as Brewer's theorem, states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:\n\n1.  **Consistency (C)**: Every read receives the most recent write or an error. All nodes in the system see the same data at the same time. (Note: This 'C' is stricter than the 'C' in ACID's consistency).\n2.  **Availability (A)**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write. The system is available for operations.\n3.  **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes (i.e., a network partition). This means the system can sustain communication breakdowns between nodes and still function.\n\nIn the presence of a network partition (which is a given in most distributed systems), a system must choose between stronger Consistency (CP) or higher Availability (AP).",
      implications: "System designers must understand this trade-off. Forcing all three is not possible. Since network partitions are a reality in distributed systems, the choice is effectively between CP and AP systems. For example, a system prioritizing consistency might return an error or timeout if it cannot guarantee the data is up-to-date during a partition, thus sacrificing availability. An AP system might return older data to ensure it always responds.",
      choosing: "If strict data correctness is paramount (e.g., banking systems, financial transactions), choose CP. If uninterrupted service and responsiveness are more critical, and some data staleness is acceptable (e.g., social media feeds, product availability in e-commerce), choose AP. 'P' (Partition Tolerance) is generally considered a non-negotiable characteristic of any practical distributed system.",
      whenToUse: "This theorem applies when designing or choosing any distributed data store (databases, file systems, etc.). The choice (CP vs. AP) depends on the specific requirements of the application using the data store.",
      whenNotToUse: "Not directly applicable to single-node (non-distributed) systems, as partition tolerance is not a concern there.",
      interviewTalkingPoints: [
        "Clearly define C, A, and P.",
        "Explain that in the presence of P, you must choose between C or A.",
        "Provide examples of CP systems (e.g., RDBMS in strict modes, some NoSQL with specific configurations) and AP systems (e.g., Cassandra, DynamoDB by default).",
        "Discuss how the choice depends on business requirements (e.g., financial vs. social media)."
      ],
      defendingYourDecision: "For this system, which handles [e.g., user session data], we prioritized Availability and Partition Tolerance (AP) by choosing [e.g., DynamoDB]. This is because ensuring users can always [e.g., log in and use core features] even if some data is slightly stale is more critical than strict consistency across all nodes for this particular data. We handle potential staleness via [e.g., client-side refresh or eventual consistency mechanisms]."
    },
    {
      id: "horizontal_vs_vertical_scaling",
      name: "Horizontal vs. Vertical Scaling",
      // visualLink: "diagram-horizontal-vs-vertical.svg"
      horizontal: {
        name: "Horizontal Scaling (Scaling Out)",
        description: "Adding more machines (nodes/servers) to a system to distribute the load. For example, adding more web servers to a load balancer pool, or adding more nodes to a database cluster.",
        pros: [
          "Can scale to very large capacities, potentially limitless with proper architecture.",
          "Improved fault tolerance and high availability: failure of one node doesn't necessarily bring down the entire system.",
          "Can be more cost-effective by using commodity hardware (standard, less expensive servers).",
          "Allows for incremental scaling; add capacity as needed."
        ],
        cons: [
          "Increased complexity in managing multiple servers (configuration management, deployment, monitoring, service discovery).",
          "Applications often need to be designed to be stateless or manage distributed state effectively.",
          "Network latency between nodes can become a performance factor.",
          "Load balancing becomes essential to distribute traffic effectively."
        ]
      },
      vertical: {
        name: "Vertical Scaling (Scaling Up)",
        description: "Increasing the resources (CPU, RAM, storage, network bandwidth) of existing machines in a system. For example, upgrading a server to one with a more powerful CPU, more memory, or faster disks.",
        pros: [
          "Simpler to implement and manage initially, as it involves fewer machines.",
          "Applications may not need significant modification to benefit from increased resources (especially single-threaded or stateful apps).",
          "Lower network latency for inter-process communication if components remain on the same machine.",
          "Can be very effective up to a certain point."
        ],
        cons: [
          "Has an upper limit; there's a maximum amount of resources a single server can have.",
          "Can be very expensive for high-end hardware; cost often increases non-linearly.",
          "Typically involves downtime during the upgrade process.",
          "Represents a single point of failure; if the server fails, the system is down unless there's a hot standby and failover mechanism."
        ]
      },
      whenToUseH: "Web server tiers, application server tiers, microservices, distributed databases (NoSQL, sharded SQL), stateless applications, tasks that can be easily parallelized.",
      whenToUseV: "Relational databases (especially the primary write node, though read replicas help scale reads horizontally), stateful applications that are difficult to distribute, single-threaded applications, or when initial simplicity is preferred and load is predictable.",
      interviewTalkingPoints: [
        "Define both clearly: adding more machines (horizontal) vs. more power to one machine (vertical).",
        "Discuss pros/cons of each regarding scalability limits, fault tolerance, cost, and complexity.",
        "Explain that many large systems use a hybrid approach.",
        "Mention that horizontal scaling often requires stateless application design."
      ],
      defendingYourDecision: "We opted for horizontal scaling for our [e.g., web server tier] because it offers better fault tolerance and allows us to scale incrementally using cost-effective commodity hardware. While it adds management complexity, the ability to handle large traffic spikes and avoid a single point of failure is crucial. For our [e.g., primary database writer], we initially rely on vertical scaling for simplicity, complemented by read replicas for read distribution."
    },
    {
      id: "stateless_vs_stateful",
      name: "Stateless vs. Stateful Architectures",
      stateless: {
        name: "Stateless Architecture",
        description: "The server does not store any client-specific session data between requests. Each request from a client must contain all the information needed by the server to understand and process the request. Any required state is typically stored on the client-side (e.g., in cookies, tokens) or in an external shared datastore (e.g., Redis, database).",
        implications: "Significantly easier to scale horizontally, as any server instance can handle any client request. Improves resilience, as requests can be easily routed to healthy servers if one fails. Simplifies server-side logic and reduces server memory footprint per client. Load balancing is more straightforward.",
        sessionManagement: "Client manages its own state (e.g., JWT in local storage) or session state is externalized to a shared distributed cache (like Redis or Memcached) or database."
      },
      stateful: {
        name: "Stateful Architecture",
        description: "The server stores client-specific session data in its memory or local storage. Subsequent requests from the same client rely on this stored state to be processed correctly.",
        implications: "Harder to scale horizontally because requests from a specific client often need to be routed to the same server that holds its state (requires 'sticky sessions' from load balancers). Complicates failover, as session state on a failed server might be lost unless replicated or externalized. Can increase server memory usage.",
        sessionManagement: "Server manages session state directly, often in memory. This can be simpler for certain types of applications initially but poses scaling challenges."
      },
      whenToUseStateless: "Most modern web applications, APIs, microservices. Applications designed for cloud environments and horizontal scalability. When high availability and resilience are critical.",
      whenToUseStateful: "Applications where maintaining state on the server significantly simplifies logic and performance for specific interactions (e.g., some real-time gaming servers, collaborative tools before externalizing state). Legacy applications not designed for statelessness. Caution is advised for new large-scale systems.",
      interviewTalkingPoints: [
        "Define stateless (server holds no client session state) vs. stateful (server holds state).",
        "Explain why statelessness is crucial for horizontal scalability and resilience.",
        "Discuss how state is managed in stateless architectures (client-side, distributed cache).",
        "Mention challenges of stateful architectures (sticky sessions, failover complexity)."
      ],
      defendingYourDecision: "We designed our [application/service] to be stateless to ensure high scalability and availability. Client session data is [e.g., stored in JWTs passed with each request / managed in an external Redis cache], allowing any application server instance to handle any request. This simplifies load balancing and makes our system resilient to individual server failures."
    },
    {
      id: "consistency_models",
      name: "Consistency Models",
      models: [
        { name: "Strong Consistency", description: "After an update completes, any subsequent access (by any client) will return the updated value. Often found in traditional RDBMS.", mattersWhen: "Data integrity is paramount (e.g., financial transactions, inventory)." },
        { name: "Eventual Consistency", description: "If no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. Common in distributed NoSQL databases.", mattersWhen: "High availability and scalability are prioritized over immediate consistency (e.g., social media likes, product views)." },
        { name: "Causal Consistency", description: "If operation A causes operation B, then all processes see operation A before operation B. Operations that are not causally related might be seen in different orders by different processes.", mattersWhen: "Preserving logical order of operations is important, but global order isn't strictly necessary (e.g., comment threads)." }
      ],
      interviewTalkingPoints: [
        "Differentiate between strong and eventual consistency.",
        "Explain when eventual consistency is an acceptable trade-off (e.g., for higher availability/scalability).",
        "Mention causal consistency as a model that preserves logical flow."
      ],
      defendingYourDecision: "For [specific feature like social media likes], we opted for eventual consistency. This allows us to achieve high availability and write scalability, as updates can propagate through the system without requiring immediate global consensus. The slight potential for brief data staleness is acceptable for this non-critical feature, prioritizing user experience and system responsiveness."
    }
  ],
  scalingPatterns: [
    {
      id: "caching_scalability",
      name: "Caching for Scalability",
      description: "Reduces load on backend systems (databases, services) by serving frequently accessed data from a faster, temporary store. This improves response times and allows backends to handle more concurrent users with the same resources. (Refer to main Caching section for details on types and strategies).",
      roleInScalability: "Decreases read load, improves latency, reduces computational effort on backend services.",
      whenToUse: ["Read-heavy workloads.", "Frequently accessed, rarely changing data.", "To reduce latency for users by caching data closer to them (CDNs, client-side)."],
      whenNotToUse: ["Write-heavy workloads (though write-through/write-back can still use caches).", "Highly dynamic data that changes with every request and cannot tolerate any staleness.", "When data access patterns are completely random and do not exhibit locality."],
      interviewTalkingPoints: [
        "Explain how caching reduces latency and backend load.",
        "Mention different cache locations (client, CDN, server-side, distributed).",
        "Discuss cache invalidation strategies and TTLs as key challenges.",
        "Relate caching to improving the scalability of read-heavy components."
      ],
      defendingYourDecision: "We implemented a [e.g., distributed Redis cache] to offload significant read traffic from our primary database. This pattern directly addresses our scalability bottleneck for [specific read operations], improving response times and allowing the database to handle more write operations and concurrent users effectively."
    },
    {
      id: "lb_scalability",
      name: "Load Balancing for Scalability",
      description: "Distributes incoming traffic across multiple backend servers, preventing any single server from becoming a bottleneck. Essential for horizontal scaling. (Refer to main Load Balancing section for algorithms and types).",
      roleInScalability: "Enables horizontal scaling by distributing requests, improves availability by routing around failed servers, allows for efficient resource utilization by preventing server overload.",
      whenToUse: ["When you have multiple instances of a service/application.", "To achieve high availability and fault tolerance.", "To enable horizontal scaling of stateless services."],
      whenNotToUse: ["Single server deployments (though a load balancer can still be used as a reverse proxy or for SSL termination).", "When the application itself is the bottleneck and adding more servers doesn't improve performance without architectural changes."],
      interviewTalkingPoints: [
        "Explain that load balancers distribute traffic to enable horizontal scaling.",
        "Mention different LB algorithms (Round Robin, Least Connections, etc.) and their use cases.",
        "Discuss L4 vs. L7 load balancing.",
        "Highlight its role in high availability and fault tolerance."
      ],
      defendingYourDecision: "A load balancer was introduced in front of our [e.g., web server tier] to enable horizontal scaling. As traffic increased, we could add more server instances, and the load balancer distributes requests among them using [e.g., Least Connections algorithm], ensuring no single server is overwhelmed and improving overall system availability."
    },
    {
      id: "db_scaling_strategies",
      name: "Database Scaling Strategies",
      strategies: [
        { name: "Read Replicas", description: "Replicating the primary database to one or more read-only replicas. Read traffic is directed to replicas, reducing load on the primary. Primary handles writes.", useCases: "Read-heavy workloads." },
        { name: "Sharding (Horizontal Partitioning)", description: "Splitting a large database into smaller, independent shards. Data is distributed across shards based on a shard key (e.g., user ID, region). Each shard can be on a separate server.", useCases: "Very large datasets, high write throughput requirements." },
        { name: "Federation (Vertical Partitioning)", description: "Splitting a database by function or data type into separate databases. E.g., product database, order database, user database.", useCases: "Systems with distinct functional areas that can be isolated." }
      ],
      interviewTalkingPoints: [
        "Distinguish between read replicas (for read scaling) and sharding (for read/write scaling).",
        "Explain different sharding strategies (range, hash).",
        "Discuss challenges of sharding (cross-shard joins, transactions, hot spots)."
      ],
      defendingYourDecision: "For our database, we started with [e.g., read replicas] to handle increasing read load. As write volume and data size grew, we implemented [e.g., sharding by tenant ID] to distribute both read and write load, allowing us to scale beyond the capacity of a single write master."
    },
    {
      id: "async_processing_mq",
      name: "Asynchronous Processing with Message Queues",
      description: "Decoupling services by using message queues (e.g., RabbitMQ, Kafka, SQS). Producers send tasks/messages to a queue, and consumers process them asynchronously at their own pace. (Refer to Messaging Queues section).",
      roleInScalability: "Load leveling (smooths out traffic spikes by queuing requests), improves resilience (tasks can be retried if a consumer fails), allows producer and consumer services to scale independently based on their specific loads.",
      whenToUse: ["For non-time-critical tasks that can be processed in the background (e.g., sending emails, generating reports, image processing).", "To decouple services and improve fault tolerance.", "To handle traffic spikes and prevent overloading downstream systems."],
      whenNotToUse: ["Synchronous operations where the client needs an immediate response.", "Very low-latency tasks where the overhead of queuing/dequeuing is too high (though some MQs are very fast)."],
      interviewTalkingPoints: [
        "Explain how MQs decouple services and enable asynchronous processing.",
        "Discuss load leveling and improved resilience as key benefits for scalability.",
        "Mention how producers and consumers can scale independently."
      ],
      defendingYourDecision: "We introduced a message queue for [e.g., processing new user sign-ups and sending welcome emails] to decouple this from the synchronous registration flow. This allows the registration API to respond quickly and ensures that email sending can be retried and scaled independently, preventing it from becoming a bottleneck during peak sign-up periods."
    },
    {
      id: "microservices_scalability",
      name: "Microservices Architecture for Scalability",
      description: "Breaking down a monolithic application into smaller, independent services. Each microservice is built around a specific business capability, can be developed, deployed, and scaled independently.",
      pros: [
        "Independent scaling of services: each service can be scaled based on its specific resource needs and load, rather than scaling the entire monolith.",
        "Fault isolation: failure in one service is less likely to affect other services if designed well.",
        "Technology diversity: teams can choose the best technology stack for their specific service.",
        "Improved development velocity through smaller, focused teams."
      ],
      challenges: [
        "Increased operational complexity: managing many services, inter-service communication, distributed tracing, and monitoring.",
        "Complexity of distributed transactions and ensuring data consistency across services.",
        "Requires robust DevOps practices and automation for deployment and management.",
        "Network latency and reliability for inter-service calls must be considered."
      ],
      whenToUse: ["Large, complex applications that can be decomposed into well-defined, independent business domains.", "Organizations with multiple development teams that can work autonomously on different services.", "When different parts of the application have vastly different scalability or resource requirements."],
      whenNotToUse: ["Small, simple applications where the overhead of distributed systems outweighs the benefits.", "Early-stage startups where rapid iteration on a monolith might be faster initially.", "If the team lacks experience in distributed systems design and operations."],
      interviewTalkingPoints: [
        "Explain how independent scaling of services is a key scalability benefit.",
        "Discuss fault isolation and technology diversity.",
        "Acknowledge the increased operational complexity, inter-service communication challenges, and need for robust DevOps."
      ],
      defendingYourDecision: "Adopting a microservices architecture allowed us to scale critical components like our [e.g., recommendation engine] independently of less frequently used services like [e.g., user profile management]. This targeted scalability, along with fault isolation, was crucial for handling [specific business need, e.g., peak holiday traffic] efficiently and cost-effectively, despite the added operational complexity."
    }
  ],
  scenarios: [
    {
      id: "ecommerce_flash_sale",
      title: "Scaling an E-commerce Site for a Flash Sale",
      description: "Massive, sudden surge in traffic for a limited time. Needs to handle high concurrent users, reads (product views), and writes (orders).",
      considerations: [
        "Aggressive caching (CDN, distributed cache for product data, pricing).",
        "Horizontal scaling of web/app servers using load balancers.",
        "Pre-scaling or auto-scaling of backend resources (servers, database replicas).",
        "Use message queues for order processing to decouple from frontend and handle write bursts.",
        "Potentially a separate, optimized read-only database for browsing during peak."
      ]
    },
    {
      id: "real_time_analytics_dashboard",
      title: "Scaling a Real-Time Analytics Dashboard",
      description: "Ingests high-velocity data streams and needs to display up-to-date aggregations and visualizations with low latency.",
      considerations: [
        "Stream processing engines (e.g., Kafka Streams, Flink, Spark Streaming).",
        "Time-series databases or NoSQL databases optimized for writes and range queries.",
        "Horizontal scaling of ingestion and processing nodes.",
        "WebSockets or SSE for pushing updates to the dashboard.",
        "Caching of frequently accessed query results."
      ]
    },
    {
      id: "chat_application_scaling",
      title: "Scaling a Chat Application",
      description: "Millions of concurrent users, high message volume, real-time delivery, message history.",
      considerations: [
        "WebSockets for persistent connections.",
        "Horizontal scaling of chat servers (connection managers).",
        "Distributed message store (e.g., Cassandra, specialized chat DBs) for message history and fan-out.",
        "Load balancing for connection servers.",
        "Use of message queues for presence updates or asynchronous tasks.",
        "Efficient data structures for managing online users and group chats."
      ]
    }
  ],
  flashcards: [
    {
      front: "What is the difference between horizontal and vertical scaling?",
      back: "Horizontal scaling (scale out) adds more machines. Vertical scaling (scale up) increases resources of existing machines."
    },
    {
      front: "What are the three guarantees of the CAP theorem?",
      back: "Consistency, Availability, Partition Tolerance. A distributed system can only provide two out of three."
    },
    {
      front: "How does a stateless architecture aid scalability?",
      back: "Any server can handle any request, making it easy to distribute load across many servers without worrying about session data."
    },
    {
      front: "Name two common database scaling strategies.",
      back: "Read Replicas and Sharding (Horizontal Partitioning)."
    },
    {
      front: "How do message queues contribute to scalability?",
      back: "They decouple services, enabling asynchronous processing, load leveling, and independent scaling of producer/consumer services."
    }
  ],
  decisionTree: {
    title: "Scalability Strategy Helper (Placeholder)",
    description: "This guide will help you choose appropriate scaling strategies or consistency models based on your system's needs. (Coming Soon)"
  },
  externalResources: [
    {
      id: "cap_theorem_gilbert_lynch",
      title: "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch)",
      url: "https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf",
      description: "The original paper formally proving the CAP theorem."
    },
    {
      id: "highly_scalable_systems_kleppmann",
      title: "Designing Data-Intensive Applications by Martin Kleppmann",
      url: "https://dataintensive.net/",
      description: "Excellent book covering scalability, data models, consistency, and distributed systems."
    },
    {
      id: "aws_scaling_best_practices",
      title: "AWS Best Practices for Auto Scaling",
      url: "https://aws.amazon.com/autoscaling/best-practices/",
      description: "Practical advice on auto-scaling from AWS, applicable broadly."
    },
    {
      id: "google_sre_book_scaling",
      title: "Site Reliability Engineering (Google Book) - Chapter on Distributed Systems",
      url: "https://sre.google/sre-book/distributed-systems/",
      description: "Insights into how Google handles distributed systems and scalability."
    }
  ]
};
