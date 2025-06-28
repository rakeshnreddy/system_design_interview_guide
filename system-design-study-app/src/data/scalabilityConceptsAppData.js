export const scalabilityConceptsAppData = {
  title: "Scalability & Architecture",
  overview: "{{Scalability}} in system design aims to ensure a system can handle growth in users, data volume, and transaction rates efficiently. This involves making trade-offs between different scaling strategies, such as {{Vertical Scaling (Scaling Up)|vertical scaling}} (increasing resources of a single server) versus {{Horizontal Scaling (Scaling Out)|horizontal scaling}} (adding more servers). Key considerations include maintaining {{Fault Tolerance}} (the system's ability to operate despite failures) and managing the increased complexity that often accompanies more distributed architectures. The goal is to achieve {{Performance}}, {{Availability}}, and {{Cost-Effectiveness}} at scale.",
  metrics: [
    {
      id: "scalability_factor",
      name: "{{Scalability Factor}}",
      description: "A measure of how much a system's {{Performance}} improves when resources are added. E.g., if doubling resources doubles {{Throughput}}, scalability factor is 2."
    },
    {
      id: "performance_under_load",
      name: "{{Performance Under Load}}",
      description: "How system {{Performance}} ({{Latency}}, {{Throughput}}, {{Error Rate}}) behaves as the load (requests, users, data volume) increases. Key metrics include response time at P95/P99."
    },
    {
      id: "cost_efficiency",
      name: "{{Cost Efficiency (Scalability)}}",
      description: "The cost of resources required to achieve a certain level of {{Performance}} or handle a certain load. Scalable systems aim for proportional (or better) cost increase with load."
    },
    {
      id: "resource_utilization",
      name: "{{Resource Utilization (%)}}",
      description: "The percentage of available resources (CPU, memory, network, disk I/O) being used. High utilization can indicate a bottleneck; low utilization might mean over-provisioning."
    }
  ],
  terminology: [
    {
      term: "{{Scalability}}",
      definition: "The ability of a system to handle a growing amount of work by adding resources, either hardware or software."
    },
    {
      term: "{{Horizontal Scaling (Scaling Out)}}",
      definition: "Adding more machines (nodes/servers) to a system to distribute the load. E.g., adding more web servers to a [load balancer](#/load-balancing) pool."
    },
    {
      term: "{{Vertical Scaling (Scaling Up)}}",
      definition: "Increasing the resources (CPU, RAM, storage) of existing machines in a system. E.g., upgrading a server to a more powerful one."
    },
    {
      term: "{{CAP Theorem}}",
      definition: "In a distributed data store, only two of the following three guarantees can be provided simultaneously: {{Consistency}}, {{Availability}}, and {{Partition Tolerance}}."
    },
    {
      term: "{{ACID Properties}}",
      definition: "{{Atomicity}}, {{Consistency}}, {{Isolation}}, {{Durability}}. A set of properties guaranteeing reliable transaction processing, common in relational [databases](#/databases)."
    },
    {
      term: "{{BASE Properties}}",
      definition: "{{Basically Available}}, {{Soft state}}, {{Eventual consistency}}. An alternative to {{ACID Properties|ACID}} for {{NoSQL}} [databases](#/databases), emphasizing {{Availability}} and {{Scalability}} over strict {{Consistency}}."
    },
    {
      term: "{{Stateless Architecture}}",
      definition: "Each request from client to server must contain all information needed to be understood; the server does not store any client session state between requests."
    },
    {
      term: "{{Stateful Architecture}}",
      definition: "The server stores information (state) about client sessions and uses this stored state to process requests."
    },
    {
      term: "{{N-tier Architecture}}",
      definition: "A client-server architecture in which presentation, application processing, and data management functions are physically separated into layers (tiers)."
    },
    {
      term: "{{Microservices Architecture}}",
      definition: "An architectural style that structures an application as a collection of small, autonomous services, modeled around a business domain."
    },
    {
      term: "{{Monolithic Architecture}}",
      definition: "An architectural style where an application is built as a single, unified unit. All components are tightly coupled and run as a single process."
    },
    {
      term: "{{Load Balancing}}",
      definition: "Distributing incoming network or application traffic across multiple backend servers to improve {{Performance}}, {{Availability}}, and {{Scalability}}. (See [Load Balancing](#/load-balancing))"
    },
    {
      term: "{{Caching}}",
      definition: "Storing frequently accessed data in a temporary, fast-access storage layer to reduce {{Latency}} and load on backend systems. (See [Caching](#/caches))"
    },
    {
      term: "{{Database Replication}}",
      definition: "Creating and maintaining multiple copies of a [database](#/databases) to improve {{Availability}}, {{Fault Tolerance}}, and read {{Scalability}} ({{Read Replicas}})."
    },
    {
      term: "{{Database Sharding (Partitioning)}}",
      definition: "Dividing a large [database](#/databases) into smaller, independent, more manageable parts called shards. Each shard can be hosted on a separate server."
    },
    {
      term: "{{Redundancy}}",
      definition: "Duplication of critical components or functions of a system with the intention of increasing {{Reliability}} and {{Fault Tolerance}}."
    },
    {
      term: "{{Fault Tolerance}}",
      definition: "The ability of a system to continue operating, possibly at a reduced level, rather than failing completely when some part of the system fails."
    },
    { id: "eventDriven", term: "{{Event-Driven Architecture}}", definition:
    "A design paradigm where services emit and react to events, enabling loose coupling and asynchronous workflows."
    },
    { id: "serviceMesh", term: "{{Service Mesh}}", definition:
    "An infrastructure layer for managing service-to-service communication (e.g., {{Istio}}, {{Linkerd}}), offering traffic control, security, and observability."
    }
  ],
  coreConcepts: [
    {
      id: "cap_theorem_explained",
      name: "CAP Theorem (Consistency, Availability, Partition Tolerance)",
      // visualLink: "diagram-cap-theorem.svg"
      diagram: `
graph TD
    subgraph CAP Theorem
        C[C - Consistency]
        A[A - Availability]
        P[P - Partition Tolerance]
    end
    C --- A
    A --- P
    P --- C

    subgraph Legend
      direction LR
      legend_text["In a network partition (P), a choice must be made between C and A."]
    end

    style C fill:#B0E0E6,stroke:#333,stroke-width:2px
    style A fill:#98FB98,stroke:#333,stroke-width:2px
    style P fill:#FFDAB9,stroke:#333,stroke-width:2px
    style legend_text fill:#fff,stroke:#d3d3d3,stroke-dasharray: 5 5
`,
      explanation: "The {{CAP Theorem}}, also known as Brewer's theorem, states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:\n\n1.  **{{Consistency}} (C)**: Every read receives the most recent write or an error. All nodes in the system see the same data at the same time. (Note: This 'C' is stricter than the 'C' in {{ACID Properties|ACID}}'s consistency).\n2.  **{{Availability}} (A)**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write. The system is available for operations.\n3.  **{{Partition Tolerance}} (P)**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes (i.e., a network partition). This means the system can sustain communication breakdowns between nodes and still function.\n\nIn the presence of a network partition (which is a given in most distributed systems), a system must choose between stronger {{Consistency}} (CP) or higher {{Availability}} (AP).",
      implications: "System designers must understand this trade-off. Forcing all three is not possible. Since network partitions are a reality in distributed systems, the choice is effectively between CP and AP systems. For example, a system prioritizing {{Consistency}} might return an error or timeout if it cannot guarantee the data is up-to-date during a partition, thus sacrificing {{Availability}}. An AP system might return older data to ensure it always responds.",
      choosing: "If strict data correctness is paramount (e.g., banking systems, financial transactions), choose CP. If uninterrupted service and responsiveness are more critical, and some data staleness is acceptable (e.g., social media feeds, product availability in e-commerce), choose AP. 'P' ({{Partition Tolerance}}) is generally considered a non-negotiable characteristic of any practical distributed system.",
      whenToUse: "This theorem applies when designing or choosing any distributed data store ([databases](#/databases), file systems, etc.). The choice (CP vs. AP) depends on the specific requirements of the application using the data store.",
      whenNotToUse: "Not directly applicable to single-node (non-distributed) systems, as {{Partition Tolerance}} is not a concern there.",
      interviewTalkingPoints: [
        "Clearly define C, A, and P.",
        "Explain that in the presence of P, you must choose between C or A.",
        "Provide examples of CP systems (e.g., RDBMS in strict modes, some {{NoSQL}} with specific configurations) and AP systems (e.g., {{Apache Cassandra|Cassandra}}, {{Amazon DynamoDB|DynamoDB}} by default).",
        "Discuss how the choice depends on business requirements (e.g., financial vs. social media)."
      ],
      defendingYourDecision: "For this system, which handles [e.g., user session data], we prioritized {{Availability}} and {{Partition Tolerance}} (AP) by choosing [e.g., {{Amazon DynamoDB|DynamoDB}}]. This is because ensuring users can always [e.g., log in and use core features] even if some data is slightly stale is more critical than strict {{Consistency}} across all nodes for this particular data. We handle potential staleness via [e.g., client-side refresh or {{Eventual Consistency|eventual consistency mechanisms}}]."
},
{
  id: "monolithVsMicroservices",
  name: "{{Monolithic Architecture|Monolith}} vs {{Microservices Architecture|Microservices}}",
  definition:
    "Contrast between a single deployable unit vs multiple independent services.",
  pros: ["{{Monolithic Architecture|Monolith}}: simpler deploy, easier local debugging", "{{Microservices Architecture|Microservices}}: independent {{Scalability|scaling}}, team autonomy"],
  cons: ["{{Monolithic Architecture|Monolith}}: limited scale, slower release cycle", "{{Microservices Architecture|Microservices}}: increased operational overhead, network {{Latency}}"],
  whenToUse:
    "{{Monolithic Architecture|Monolith}} for small teams/apps; {{Microservices Architecture|Microservices}} for large, complex domains requiring independent {{Scalability|scaling}}.",
  example:
    "{{Netflix}} moved from a Ruby monolith to hundreds of Java microservices for better {{Fault Isolation}}."
},
{
  id: "cqrsEventSourcing",
  name: "{{CQRS (Command Query Responsibility Segregation)|CQRS}} & {{Event Sourcing}}",
  definition: "{{CQRS (Command Query Responsibility Segregation)|Command Query Responsibility Segregation (CQRS)}} separates read and write operations for a data store. {{Event Sourcing}} involves persisting the state of a business entity as a sequence of state-changing events. They are often used together.",
  pros: ["{{CQRS (Command Query Responsibility Segregation)|CQRS}}: Optimized data schemas for read/write, improved {{Performance}} and {{Scalability}} for each.", "{{Event Sourcing}}: Reliable audit log, ability to reconstruct past states, simplifies {{Event-Driven Architecture}}."],
  cons: ["{{CQRS (Command Query Responsibility Segregation)|CQRS}}: Increased complexity, potential for {{Eventual Consistency}} between read and write models.", "{{Event Sourcing}}: Learning curve, querying event store directly can be complex (often necessitating {{CQRS (Command Query Responsibility Segregation)|CQRS}})."],
  whenToUse: "Complex domains where read and write workloads differ significantly, systems requiring strong auditing capabilities, or applications built on {{Event-Driven Architectures|event-driven architectures}}.",
  example: "An e-commerce platform might use {{CQRS (Command Query Responsibility Segregation)|CQRS}} for product catalog (high read, moderate write) and {{Event Sourcing}} for order management (reliable history of order state changes)."
},
{
  id: "sagaPattern",
  name: "{{Saga Pattern}}",
  definition: "A way to manage data {{Consistency}} across {{Microservices}} in distributed transactions. A saga is a sequence of local transactions. If one transaction fails, compensating transactions are executed to undo preceding work.",
  pros: ["Maintains data {{Consistency}} across services without distributed transactions ({{Two-Phase Commit (2PC)|2PC}}).", "Services remain loosely coupled."],
  cons: ["Complex to design and debug, especially compensating transactions.", "Can lead to {{Eventual Consistency}} issues if not carefully managed.", "Lack of {{Atomicity}} for the overall transaction can be a challenge."],
  whenToUse: "Long-lived transactions spanning multiple services where {{Eventual Consistency}} is acceptable, and direct distributed transactions are not feasible or desired.",
  example: "{{Saga Pattern|Saga}} used by an e-commerce checkout to coordinate inventory, payment, and shipping services. If payment fails, a compensating transaction might release the inventory."
},
{
  id: "stranglerFigPatternCore", // Differentiating from the one in 'advanced'
  name: "{{Strangler Fig Pattern}}",
  definition: "Incrementally replace parts of a {{Monolithic Architecture|monolith}} by routing new features or updated functionality to new {{Microservices}}, while the old system still handles other features. Over time, the new system 'strangles' the old one.",
  pros: ["Gradual migration with lower risk compared to a big-bang rewrite.", "Allows continuous delivery of new features during migration.", "Spreads out development effort."],
  cons: ["Can be complex to manage the routing layer (facade/proxy).", "Maintaining two systems simultaneously can be costly.", "Integration between old and new systems can be challenging."],
  whenToUse: "Migrating large, complex legacy {{Monolithic Applications|monolithic applications}} to a {{Microservices Architecture}} where a complete rewrite is too risky or time-consuming.",
  example: "A legacy banking system gradually moves customer account management to new {{Microservices}} while core transaction processing remains on the monolith, with a proxy routing API calls."
},
{
  id: "sidecarPattern",
  name: "{{Sidecar Pattern}}",
  definition: "Deploy components of an application into a separate process or container to provide isolation and encapsulation. The sidecar is attached to a parent application and shares its lifecycle.",
  pros: ["Reduces complexity in the main application by offloading cross-cutting concerns (e.g., logging, monitoring, networking).", "Allows use of different technologies for sidecar and main app.", "Reusable across multiple applications."],
  cons: ["Can increase overall resource consumption due to multiple processes/containers.", "Inter-process communication overhead.", "Adds deployment complexity if not managed with orchestrators like {{Kubernetes}}."],
  whenToUse: "To add common functionalities like logging, monitoring, configuration, or network proxies to an application without modifying its core code, especially in containerized environments.",
  example: "A {{Service Mesh}} like {{Istio}} uses sidecar proxies (e.g., {{Envoy Proxy|Envoy}}) deployed alongside each {{Microservice}} instance to manage traffic, security, and observability."
    },
    {
      id: "horizontal_vs_vertical_scaling",
      name: "{{Horizontal Scaling (Scaling Out)|Horizontal}} vs. {{Vertical Scaling (Scaling Up)|Vertical Scaling}}",
      // visualLink: "diagram-horizontal-vs-vertical.svg"
      horizontal: {
        name: "{{Horizontal Scaling (Scaling Out)}}",
        description: "Adding more machines (nodes/servers) to a system to distribute the load. For example, adding more web servers to a [load balancer](#/load-balancing) pool, or adding more nodes to a [database](#/databases) cluster.",
        pros: [
          "Can scale to very large capacities, potentially limitless with proper architecture.",
          "Improved {{Fault Tolerance}} and {{High Availability}}: failure of one node doesn't necessarily bring down the entire system.",
          "Can be more cost-effective by using commodity hardware (standard, less expensive servers).",
          "Allows for incremental {{Scalability|scaling}}; add capacity as needed."
        ],
        cons: [
          "Increased complexity in managing multiple servers (configuration management, deployment, monitoring, service discovery).",
          "Applications often need to be designed to be {{Stateless Architecture|stateless}} or manage distributed state effectively.",
          "Network {{Latency}} between nodes can become a {{Performance}} factor.",
          "[Load balancing](#/load-balancing) becomes essential to distribute traffic effectively."
        ]
      },
      vertical: {
        name: "{{Vertical Scaling (Scaling Up)}}",
        description: "Increasing the resources (CPU, RAM, storage, network bandwidth) of existing machines in a system. For example, upgrading a server to one with a more powerful CPU, more memory, or faster disks.",
        pros: [
          "Simpler to implement and manage initially, as it involves fewer machines.",
          "Applications may not need significant modification to benefit from increased resources (especially single-threaded or stateful apps).",
          "Lower network {{Latency}} for inter-process communication if components remain on the same machine.",
          "Can be very effective up to a certain point."
        ],
        cons: [
          "Has an upper limit; there's a maximum amount of resources a single server can have.",
          "Can be very expensive for high-end hardware; cost often increases non-linearly.",
          "Typically involves downtime during the upgrade process.",
          "Represents a {{Single Point of Failure (SPOF)|single point of failure}}; if the server fails, the system is down unless there's a hot standby and {{Failover}} mechanism."
        ]
      },
      whenToUseH: "Web server tiers, application server tiers, {{Microservices}}, distributed [databases](#/databases) ({{NoSQL}}, sharded {{SQL (Structured Query Language)|SQL}}), {{Stateless Architecture|stateless applications}}, tasks that can be easily parallelized.",
      whenToUseV: "Relational [databases](#/databases) (especially the primary write node, though {{Read Replicas}} help scale reads horizontally), {{Stateful Architecture|stateful applications}} that are difficult to distribute, single-threaded applications, or when initial simplicity is preferred and load is predictable.",
      interviewTalkingPoints: [
        "Define both clearly: adding more machines (horizontal) vs. more power to one machine (vertical).",
        "Discuss pros/cons of each regarding {{Scalability}} limits, {{Fault Tolerance}}, cost, and complexity.",
        "Explain that many large systems use a hybrid approach.",
        "Mention that {{Horizontal Scaling (Scaling Out)|horizontal scaling}} often requires {{Stateless Architecture|stateless application design}}."
      ],
      defendingYourDecision: "We opted for {{Horizontal Scaling (Scaling Out)|horizontal scaling}} for our [e.g., web server tier] because it offers better {{Fault Tolerance}} and allows us to scale incrementally using cost-effective commodity hardware. While it adds management complexity, the ability to handle large traffic spikes and avoid a {{Single Point of Failure (SPOF)|single point of failure}} is crucial. For our [e.g., primary database writer], we initially rely on {{Vertical Scaling (Scaling Up)|vertical scaling}} for simplicity, complemented by {{Read Replicas}} for read distribution."
    },
    {
      id: "stateless_vs_stateful",
      name: "{{Stateless Architecture|Stateless}} vs. {{Stateful Architecture|Stateful Architectures}}",
      stateless: {
        name: "{{Stateless Architecture}}",
        description: "The server does not store any client-specific session data between requests. Each request from a client must contain all the information needed by the server to understand and process the request. Any required state is typically stored on the client-side (e.g., in cookies, tokens) or in an external shared datastore (e.g., {{Redis}}, [database](#/databases)).",
        implications: "Significantly easier to scale horizontally, as any server instance can handle any client request. Improves resilience, as requests can be easily routed to healthy servers if one fails. Simplifies server-side logic and reduces server memory footprint per client. [Load balancing](#/load-balancing) is more straightforward.",
        sessionManagement: "Client manages its own state (e.g., {{JSON Web Tokens (JWT)|JWT}} in local storage) or session state is externalized to a shared distributed [cache](#/caches) (like {{Redis}} or {{Memcached}}) or [database](#/databases)."
      },
      stateful: {
        name: "{{Stateful Architecture}}",
        description: "The server stores client-specific session data in its memory or local storage. Subsequent requests from the same client rely on this stored state to be processed correctly.",
        implications: "Harder to scale horizontally because requests from a specific client often need to be routed to the same server that holds its state (requires '{{Sticky Sessions (Session Affinity)|sticky sessions}}' from [load balancers](#/load-balancing)). Complicates {{Failover}}, as session state on a failed server might be lost unless replicated or externalized. Can increase server memory usage.",
        sessionManagement: "Server manages session state directly, often in memory. This can be simpler for certain types of applications initially but poses {{Scalability}} challenges."
      },
      whenToUseStateless: "Most modern web applications, APIs, {{Microservices}}. Applications designed for cloud environments and {{Horizontal Scaling (Scaling Out)|horizontal scalability}}. When {{High Availability}} and resilience are critical.",
      whenToUseStateful: "Applications where maintaining state on the server significantly simplifies logic and {{Performance}} for specific interactions (e.g., some real-time gaming servers, collaborative tools before externalizing state). Legacy applications not designed for statelessness. Caution is advised for new large-scale systems.",
      interviewTalkingPoints: [
        "Define stateless (server holds no client session state) vs. stateful (server holds state).",
        "Explain why statelessness is crucial for {{Horizontal Scaling (Scaling Out)|horizontal scalability}} and resilience.",
        "Discuss how state is managed in {{Stateless Architectures|stateless architectures}} (client-side, distributed [cache](#/caches)).",
        "Mention challenges of {{Stateful Architectures|stateful architectures}} ({{Sticky Sessions (Session Affinity)|sticky sessions}}, {{Failover}} complexity)."
      ],
      defendingYourDecision: "We designed our [application/service] to be {{Stateless Architecture|stateless}} to ensure high {{Scalability}} and {{Availability}}. Client session data is [e.g., stored in {{JSON Web Tokens (JWT)|JWTs}} passed with each request / managed in an external {{Redis}} [cache](#/caches)], allowing any application server instance to handle any request. This simplifies [load balancing](#/load-balancing) and makes our system resilient to individual server failures."
    },
    {
      id: "consistency_models",
      name: "{{Consistency Models}}",
      models: [
        { name: "{{Strong Consistency}}", description: "After an update completes, any subsequent access (by any client) will return the updated value. Often found in traditional RDBMS.", mattersWhen: "Data integrity is paramount (e.g., financial transactions, inventory)." },
        { name: "{{Eventual Consistency}}", description: "If no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. Common in distributed {{NoSQL}} [databases](#/databases).", mattersWhen: "{{High Availability}} and {{Scalability}} are prioritized over immediate {{Consistency}} (e.g., social media likes, product views)." },
        { name: "{{Causal Consistency}}", description: "If operation A causes operation B, then all processes see operation A before operation B. Operations that are not causally related might be seen in different orders by different processes.", mattersWhen: "Preserving logical order of operations is important, but global order isn't strictly necessary (e.g., comment threads)." }
      ],
      interviewTalkingPoints: [
        "Differentiate between {{Strong Consistency}} and {{Eventual Consistency}}.",
        "Explain when {{Eventual Consistency}} is an acceptable trade-off (e.g., for higher {{Availability}}/{{Scalability}}).",
        "Mention {{Causal Consistency}} as a model that preserves logical flow."
      ],
      defendingYourDecision: "For [specific feature like social media likes], we opted for {{Eventual Consistency}}. This allows us to achieve {{High Availability}} and write {{Scalability}}, as updates can propagate through the system without requiring immediate global consensus. The slight potential for brief data staleness is acceptable for this non-critical feature, prioritizing user experience and system responsiveness."
    }
  ],
  scalingPatterns: [
    {
      id: "caching_scalability",
      name: "{{Caching for Scalability}}",
      description: "Reduces load on backend systems ([databases](#/databases), services) by serving frequently accessed data from a faster, temporary store. This improves response times and allows backends to handle more concurrent users with the same resources. (Refer to main [Caching](#/caches) section for details on types and strategies).",
      roleInScalability: "Decreases read load, improves {{Latency}}, reduces computational effort on backend services.",
      whenToUse: ["Read-heavy workloads.", "Frequently accessed, rarely changing data.", "To reduce {{Latency}} for users by [caching](#/caches) data closer to them ({{CDNs}}, client-side)."],
      whenNotToUse: ["Write-heavy workloads (though {{Write-Through Cache|write-through}}/{{Write-Back Cache|write-back}} can still use [caches](#/caches)).", "Highly dynamic data that changes with every request and cannot tolerate any staleness.", "When data access patterns are completely random and do not exhibit locality."],
      interviewTalkingPoints: [
        "Explain how [caching](#/caches) reduces {{Latency}} and backend load.",
        "Mention different [cache](#/caches) locations (client, {{CDN}}, server-side, distributed).",
        "Discuss {{Cache Invalidation}} strategies and {{TTLs (Time-To-Live)|TTLs}} as key challenges.",
        "Relate [caching](#/caches) to improving the {{Scalability}} of read-heavy components."
      ],
      defendingYourDecision: "We implemented a [e.g., distributed {{Redis}} [cache](#/caches)] to offload significant read traffic from our primary [database](#/databases). This pattern directly addresses our {{Scalability}} bottleneck for [specific read operations], improving response times and allowing the [database](#/databases) to handle more write operations and concurrent users effectively."
    },
    {
      id: "lb_scalability",
      name: "{{Load Balancing for Scalability}}",
      description: "Distributes incoming traffic across multiple backend servers, preventing any single server from becoming a bottleneck. Essential for {{Horizontal Scaling (Scaling Out)|horizontal scaling}}. (Refer to main [Load Balancing](#/load-balancing) section for algorithms and types).",
      roleInScalability: "Enables {{Horizontal Scaling (Scaling Out)|horizontal scaling}} by distributing requests, improves {{Availability}} by routing around failed servers, allows for efficient resource utilization by preventing server overload.",
      whenToUse: ["When you have multiple instances of a service/application.", "To achieve {{High Availability}} and {{Fault Tolerance}}.", "To enable {{Horizontal Scaling (Scaling Out)|horizontal scaling}} of {{Stateless Architecture|stateless services}}."],
      whenNotToUse: ["Single server deployments (though a [load balancer](#/load-balancing) can still be used as a {{Reverse Proxy}} or for {{SSL Termination}}).", "When the application itself is the bottleneck and adding more servers doesn't improve {{Performance}} without architectural changes."],
      interviewTalkingPoints: [
        "Explain that [load balancers](#/load-balancing) distribute traffic to enable {{Horizontal Scaling (Scaling Out)|horizontal scaling}}.",
        "Mention different LB algorithms ({{Round Robin}}, {{Least Connections}}, etc.) and their use cases.",
        "Discuss {{Layer 4 (L4) Load Balancing|L4}} vs. {{Layer 7 (L7) Load Balancing|L7 load balancing}}.",
        "Highlight its role in {{High Availability}} and {{Fault Tolerance}}."
      ],
      defendingYourDecision: "A [load balancer](#/load-balancing) was introduced in front of our [e.g., web server tier] to enable {{Horizontal Scaling (Scaling Out)|horizontal scaling}}. As traffic increased, we could add more server instances, and the [load balancer](#/load-balancing) distributes requests among them using [e.g., {{Least Connections}} algorithm], ensuring no single server is overwhelmed and improving overall system {{Availability}}."
    },
    {
      id: "db_scaling_strategies",
      name: "{{Database Scaling Strategies}}",
      strategies: [
        { name: "{{Read Replicas}}", description: "Replicating the primary [database](#/databases) to one or more read-only replicas. Read traffic is directed to replicas, reducing load on the primary. Primary handles writes.", useCases: "Read-heavy workloads." },
        { name: "{{Database Sharding (Partitioning)|Sharding (Horizontal Partitioning)}}", description: "Splitting a large [database](#/databases) into smaller, independent shards. Data is distributed across shards based on a shard key (e.g., user ID, region). Each shard can be on a separate server.", useCases: "Very large datasets, high write {{Throughput}} requirements." },
        { name: "{{Database Federation|Federation (Vertical Partitioning)}}", description: "Splitting a [database](#/databases) by function or data type into separate [databases](#/databases). E.g., product [database](#/databases), order [database](#/databases), user [database](#/databases).", useCases: "Systems with distinct functional areas that can be isolated." }
      ],
      interviewTalkingPoints: [
        "Distinguish between {{Read Replicas}} (for read {{Scalability|scaling}}) and {{Database Sharding (Partitioning)|sharding}} (for read/write {{Scalability|scaling}}).",
        "Explain different {{Sharding Strategies|sharding strategies}} (range, hash).",
        "Discuss challenges of {{Database Sharding (Partitioning)|sharding}} (cross-shard joins, transactions, hot spots)."
      ],
      defendingYourDecision: "For our [database](#/databases), we started with [e.g., {{Read Replicas}}] to handle increasing read load. As write volume and data size grew, we implemented [e.g., {{Database Sharding (Partitioning)|sharding by tenant ID}}] to distribute both read and write load, allowing us to scale beyond the capacity of a single write master."
    },
    {
      id: "async_processing_mq",
      name: "{{Asynchronous Processing with Message Queues}}",
      description: "{{Decoupling|Decoupling}} services by using [message queues](#/messaging-queues) (e.g., {{RabbitMQ}}, {{Apache Kafka|Kafka}}, {{Amazon SQS|SQS}}). Producers send tasks/messages to a queue, and consumers process them asynchronously at their own pace. (Refer to [Messaging Queues](#/messaging-queues) section).",
      roleInScalability: "{{Load Leveling}} (smooths out traffic spikes by queuing requests), improves resilience (tasks can be retried if a consumer fails), allows producer and consumer services to scale independently based on their specific loads.",
      whenToUse: ["For non-time-critical tasks that can be processed in the background (e.g., sending emails, generating reports, image processing).", "To {{Decoupling|decouple}} services and improve {{Fault Tolerance}}.", "To handle traffic spikes and prevent overloading downstream systems."],
      whenNotToUse: ["Synchronous operations where the client needs an immediate response.", "Very low-{{Latency}} tasks where the overhead of queuing/dequeuing is too high (though some MQs are very fast)."],
      interviewTalkingPoints: [
        "Explain how MQs {{Decoupling|decouple}} services and enable asynchronous processing.",
        "Discuss {{Load Leveling}} and improved resilience as key benefits for {{Scalability}}.",
        "Mention how producers and consumers can scale independently."
      ],
      defendingYourDecision: "We introduced a [message queue](#/messaging-queues) for [e.g., processing new user sign-ups and sending welcome emails] to {{Decoupling|decouple}} this from the synchronous registration flow. This allows the registration API to respond quickly and ensures that email sending can be retried and scaled independently, preventing it from becoming a bottleneck during peak sign-up periods."
    },
    {
      id: "microservices_scalability",
      name: "{{Microservices Architecture for Scalability}}",
      description: "Breaking down a {{Monolithic Architecture|monolithic application}} into smaller, independent services. Each {{Microservice}} is built around a specific business capability, can be developed, deployed, and scaled independently.",
      pros: [
        "Independent {{Scalability|scaling}} of services: each service can be scaled based on its specific resource needs and load, rather than scaling the entire monolith.",
        "{{Fault Isolation}}: failure in one service is less likely to affect other services if designed well.",
        "Technology diversity: teams can choose the best technology stack for their specific service.",
        "Improved development velocity through smaller, focused teams."
      ],
      challenges: [
        "Increased operational complexity: managing many services, inter-service communication, distributed tracing, and monitoring.",
        "Complexity of distributed transactions and ensuring data {{Consistency}} across services.",
        "Requires robust {{DevOps}} practices and automation for deployment and management.",
        "Network {{Latency}} and {{Reliability}} for inter-service calls must be considered."
      ],
      whenToUse: ["Large, complex applications that can be decomposed into well-defined, independent business domains.", "Organizations with multiple development teams that can work autonomously on different services.", "When different parts of the application have vastly different {{Scalability}} or resource requirements."],
      whenNotToUse: ["Small, simple applications where the overhead of distributed systems outweighs the benefits.", "Early-stage startups where rapid iteration on a monolith might be faster initially.", "If the team lacks experience in distributed systems design and operations."],
      interviewTalkingPoints: [
        "Explain how independent {{Scalability|scaling}} of services is a key {{Scalability}} benefit.",
        "Discuss {{Fault Isolation}} and technology diversity.",
        "Acknowledge the increased operational complexity, inter-service communication challenges, and need for robust {{DevOps}}."
      ],
      defendingYourDecision: "Adopting a {{Microservices Architecture}} allowed us to scale critical components like our [e.g., recommendation engine] independently of less frequently used services like [e.g., user profile management]. This targeted {{Scalability}}, along with {{Fault Isolation}}, was crucial for handling [specific business need, e.g., peak holiday traffic] efficiently and cost-effectively, despite the added operational complexity."
    }
  ],
  scenarios: [
    {
      id: "ecommerce_flash_sale",
      title: "Scaling an E-commerce Site for a Flash Sale",
      description: "Massive, sudden surge in traffic for a limited time. Needs to handle high {{Concurrent Users|concurrent users}}, reads (product views), and writes (orders).",
      considerations: [
        "Aggressive [caching](#/caches) ({{CDN}}, distributed [cache](#/caches) for product data, pricing).",
        "{{Horizontal Scaling (Scaling Out)|Horizontal scaling}} of web/app servers using [load balancers](#/load-balancing).",
        "Pre-scaling or {{Auto Scaling|auto-scaling}} of backend resources (servers, [database](#/databases) replicas).",
        "Use [message queues](#/messaging-queues) for order processing to {{Decoupling|decouple}} from frontend and handle write bursts.",
        "Potentially a separate, optimized read-only [database](#/databases) for browsing during peak."
      ]
    },
    {
      id: "real_time_analytics_dashboard",
      title: "Scaling a Real-Time Analytics Dashboard",
      description: "Ingests high-velocity data streams and needs to display up-to-date aggregations and visualizations with low {{Latency}}.",
      considerations: [
        "Stream processing engines (e.g., {{Kafka Streams}}, {{Apache Flink|Flink}}, {{Apache Spark|Spark Streaming}}).",
        "{{Time-Series Databases}} or {{NoSQL}} [databases](#/databases) optimized for writes and range queries.",
        "{{Horizontal Scaling (Scaling Out)|Horizontal scaling}} of ingestion and processing nodes.",
        "{{WebSockets}} or {{Server-Sent Events (SSE)|SSE}} for pushing updates to the dashboard.",
        "[Caching](#/caches) of frequently accessed query results."
      ]
    },
    {
      id: "chat_application_scaling",
      title: "Scaling a Chat Application",
      description: "Millions of {{Concurrent Users|concurrent users}}, high message volume, real-time delivery, message history.",
      considerations: [
        "{{WebSockets}} for persistent connections.",
        "{{Horizontal Scaling (Scaling Out)|Horizontal scaling}} of chat servers (connection managers).",
        "Distributed message store (e.g., {{Apache Cassandra|Cassandra}}, specialized chat DBs) for message history and fan-out.",
        "[Load balancing](#/load-balancing) for connection servers.",
        "Use of [message queues](#/messaging-queues) for presence updates or asynchronous tasks.",
        "Efficient data structures for managing online users and group chats."
      ]
    },
    {
      id: "eventDrivenDesign", // Changed key to id
      title: "{{Event-Driven Microservices}}",
      description:
        "Design a system where {{Microservices}} communicate via events (e.g., user signup triggers email, analytics, and profile services).",
      problem:
        "Synchronous {{HTTP}} calls between services create tight coupling and brittle interdependencies.",
      solution:
        "Use {{Apache Kafka|Kafka}} topics for user events; each service subscribes and processes its own logic asynchronously.",
      challenges:
        "Ensuring {{Eventual Consistency}} and handling out-of-order events.",
      learnings:
        "{{Event-Driven Architecture|Event-driven}} reduces coupling but requires careful schema versioning and error handling.",
      considerations: [] // Added empty considerations array
    },
    {
      id: "highScaleWebApp", // Changed key to id
      title: "High-Scale Web Application",
      description:
        "Architect a web application to support 1M {{QPS (Queries Per Second)|QPS}} with <200ms {{Latency}} target.",
      problem:
        "Single data center cannot handle global traffic with low {{Latency}}.",
      solution:
        "Deploy across multiple regions with geo-{{DNS}}, use {{CDNs}} for static assets, shard [databases](#/databases) by user id, and {{Auto Scaling|autoscale}} {{Stateless Architecture|stateless services}} behind [load balancers](#/load-balancing).",
      challenges:
        "Data {{Consistency}} across regions, {{Session Stickiness|session stickiness}}, and increased networking complexity.",
      learnings:
        "Geo-distributed architecture requires SLAs on cross-region {{Replication}} {{Latency|latency}} and robust monitoring.",
      considerations: [] // Added empty considerations array
    }
  ],
  advanced: [
    {
      id: "raft",
      name: "{{Raft Consensus Algorithm}}",
      definition:
        "A leader-based consensus protocol for replicated state machines, easier to understand than {{Paxos}}.",
      pros: ["Simpler to reason about", "{{Strong Consistency}} across replicas"],
      cons: ["Leader can become a bottleneck", "Complex leader election edge cases"],
      useCase:
        "Used in {{etcd}} and {{Consul}} for service discovery and configuration management."
    },
    {
      id: "stranglerFig",
      name: "{{Strangler Fig Pattern}}",
      definition:
        "Incrementally replace parts of a {{Monolithic Architecture|monolith}} by routing new features to {{Microservices}} until the monolith is ‘strangled.’",
      pros: ["Gradual migration with less risk"],
      cons: ["Complex routing layer required"],
      useCase:
        "Used by teams migrating legacy applications to cloud-native {{Microservices}}."
    }
  ],
  flashcards: [
    {
      front: "What is the difference between {{Horizontal Scaling (Scaling Out)|horizontal}} and {{Vertical Scaling (Scaling Up)|vertical scaling}}?",
      back: "{{Horizontal Scaling (Scaling Out)|Horizontal scaling (scale out)}} adds more machines. {{Vertical Scaling (Scaling Up)|Vertical scaling (scale up)}} increases resources of existing machines."
    },
    {
      front: "What are the three guarantees of the {{CAP Theorem}}?",
      back: "{{Consistency}}, {{Availability}}, {{Partition Tolerance}}. A distributed system can only provide two out of three."
    },
    {
      front: "How does a {{Stateless Architecture}} aid {{Scalability}}?",
      back: "Any server can handle any request, making it easy to distribute load across many servers without worrying about session data."
    },
    {
      front: "Name two common {{Database Scaling Strategies|database scaling strategies}}.",
      back: "{{Read Replicas}} and {{Database Sharding (Partitioning)|Sharding (Horizontal Partitioning)}}."
    },
    {
      front: "How do [message queues](#/messaging-queues) contribute to {{Scalability}}?",
      back: "They {{Decoupling|decouple}} services, enabling asynchronous processing, {{Load Leveling|load leveling}}, and independent {{Scalability|scaling}} of producer/consumer services."
    }
  ],
  decisionTree: {
    title: "Scalability Strategy Helper (Placeholder)",
    description: "This guide will help you choose appropriate scaling strategies or {{Consistency Models|consistency models}} based on your system's needs. (Coming Soon)"
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
  ],
  mermaidDiagrams: {
    capTriangle: `
    graph TD
      A[Availability] --- C[Consistency]
      C --- P[Partition Tolerance]
      P --- A
      classDef corner fill:#eef,stroke:#333,stroke-width:2px;
      class A,C,P corner;
  `,
    archComparison: `
    graph LR
      subgraph Monolith
        M1[UI] --> M2[Business Logic]
        M2 --> M3[Data Layer]
      end
      subgraph Microservices
        MS1[User Service] & MS2[Order Service] & MS3[Payment Service]
      end
      classDef monolith fill:#fdd,stroke:#333;
      classDef microservices fill:#dfd,stroke:#333;
      class M1,M2,M3 monolith;
      class MS1,MS2,MS3 microservices;
  `,
    statelessStateful: `
    flowchart LR
      subgraph Stateless
        LB1[Load Balancer] --> SrvA[Server A]
        LB1 --> SrvB[Server B]
      end
      subgraph Stateful
        LB2 --> SessSrv[(Session Server)]
        SessSrv --> SrvC
      end
  `,
    consistencyTimeline: `
    sequenceDiagram
      participant Writer
      participant NodeA
      participant NodeB
      Writer->>NodeA: write(X=1)
      Note right of NodeA: Strong Consistency -> NodeB unavailable until synced
      Writer->>NodeA: write(X=2)
      NodeA->>NodeB: replicate(X=2)
      Note right of NodeB: Eventual Consistency -> NodeB sees X=1 then X=2
  `
  }
};
