export const messagingQueuesAppData = {
  title: "Messaging Queues",
  metrics: [
    {
      id: "throughput",
      title: "Throughput",
      description: "The rate at which messages are successfully processed by the queue system, often measured in messages per second or MB/second.",
      importance: "Critical for high-volume systems to ensure messages don't pile up."
    },
    {
      id: "latency",
      title: "End-to-End Latency",
      description: "The total time taken for a message from production by the producer to consumption by the consumer. Includes queueing time and processing time.",
      importance: "Crucial for real-time applications requiring quick message delivery."
    },
    {
      id: "message_durability",
      title: "Message Durability",
      description: "Ensures that messages are not lost in case of broker failure. Achieved through persistence to disk and replication.",
      importance: "Essential for applications where message loss is unacceptable (e.g., financial transactions)."
    },
    {
      id: "delivery_guarantees",
      title: "Delivery Guarantees",
      description: "Defines the assurance level for message delivery: At most once, At least once, Exactly once.",
      importance: "Depends on the application's tolerance for duplicate messages or message loss."
    },
    {
      id: "error_rate",
      title: "Error Rate",
      description: "The percentage of messages that fail to be processed correctly, either due to producer errors, consumer errors, or broker issues.",
      importance: "Needs to be monitored to ensure system reliability."
    },
    {
      id: "queue_depth",
      title: "Queue Depth/Lag",
      description: "The number of messages currently waiting in the queue to be processed. High queue depth can indicate consumer performance issues or insufficient consumer scaling.",
      importance: "Monitoring helps in understanding load and potential bottlenecks."
    },
    {
      id: "consumer_lag_kafka",
      title: "Consumer Lag (Kafka specific)",
      description: "The difference in offset between the latest message produced to a topic partition and the offset of the message being processed by a consumer group. Indicates how far behind a consumer is.",
      importance: "Key metric for Kafka consumers to ensure they are keeping up with producers."
    }
  ],
  terminology: [
    {
      id: "producer",
      title: "Producer (Publisher)",
      description: "An application component that creates and sends messages to a message queue or topic.",
    },
    {
      id: "consumer",
      title: "Consumer (Subscriber)",
      description: "An application component that subscribes to a message queue or topic and processes messages received from it.",
    },
    {
      id: "broker",
      title: "Broker",
      description: "The message queue server software that manages the storage and routing of messages between producers and consumers.",
    },
    {
      id: "queue",
      title: "Queue",
      description: "A data structure that stores messages in a sequence (often FIFO - First-In, First-Out) until they are processed by a consumer. Typically used in point-to-point messaging.",
    },
    {
      id: "topic",
      title: "Topic",
      description: "A named channel or category to which messages are published. Used in publish/subscribe messaging systems where multiple consumers can subscribe to the same topic.",
    },
    {
      id: "exchange_rabbitmq",
      title: "Exchange (RabbitMQ specific)",
      description: "In RabbitMQ, producers publish messages to an exchange, which then routes them to bound queues based on rules and bindings.",
      types: "Direct, Fanout, Topic, Headers"
    },
    {
      id: "dead_letter_queue",
      title: "Dead Letter Queue (DLQ)",
      description: "A dedicated queue where messages that cannot be processed successfully by a consumer (after retries, or due to errors) are sent for later analysis or manual intervention.",
      importance: "Prevents problematic messages from blocking processing and allows for error handling."
    },
    {
      id: "idempotency",
      title: "Idempotency",
      description: "Ensuring that processing the same message multiple times has the same effect as processing it once. Important for systems with 'at-least-once' delivery guarantees to prevent unintended side effects from duplicate messages.",
    },
    {
      id: "backpressure",
      title: "Backpressure",
      description: "A mechanism by which a consumer or broker can signal to a producer to slow down message production rate when the system is overloaded.",
      importance: "Prevents system overload and message loss."
    },
    {
      id: "message_acknowledgement",
      title: "Message Acknowledgement (Ack/Nack)",
      description: "A signal sent by a consumer to the broker indicating that a message has been successfully processed (Ack) or failed processing (Nack). The broker uses this to decide whether to redeliver the message or remove it from the queue.",
    },
    {
      id: "offset_kafka",
      title: "Offset (Kafka specific)",
      description: "A unique, sequential ID assigned to each message within a partition of a Kafka topic. Consumers track their progress by storing the offset of the last consumed message.",
    },
    {
      id: "consumer_group_kafka",
      title: "Consumer Group (Kafka specific)",
      description: "One or more consumers that jointly consume messages from one or more Kafka topic partitions. Each partition is consumed by only one consumer within a group, allowing for parallel processing.",
    }
  ],
  brokerpedia: [
    {
      id: "rabbitmq",
      title: "RabbitMQ",
      type: "Traditional Message Broker (AMQP)",
      architecture: "Implements AMQP (Advanced Message Queuing Protocol). Features exchanges (direct, topic, fanout, headers), queues, and bindings for powerful and flexible message routing. Supports clustering for high availability and persistence for message durability.",
      pros: [
        "Extremely flexible routing capabilities using exchanges and bindings, catering to complex messaging scenarios.",
        "Supports multiple messaging protocols (AMQP 0-9-1, AMQP 1.0, MQTT, STOMP), making it versatile for diverse clients.",
        "Mature platform with a comprehensive management UI, good client libraries, and strong community support.",
        "Offers message acknowledgements, persistence, and publisher confirms for reliable message delivery.",
        "Supports features like TTL, priority queues, and dead-letter exchanges for advanced message handling."
      ],
      cons: [
        "Can have lower raw throughput compared to log-based systems like Kafka, especially for very high-volume event streams not requiring complex routing.",
        "Clustering and achieving high availability can be complex to configure and manage correctly.",
        "Message ordering is guaranteed per queue, but achieving strict global ordering across distributed consumers or complex routing can be challenging.",
        "Performance can degrade if queues become very long or if there are many bindings/exchanges."
      ],
      whenToUse: [
        "Complex routing scenarios where messages need to be delivered to different queues based on content or attributes.",
        "Traditional task queues for web applications (e.g., sending emails, processing images asynchronously).",
        "RPC-style (request/reply) communication patterns over messaging.",
        "Systems requiring strong transactional behavior with messages or integration with diverse protocols.",
        "When fine-grained control over message delivery, acknowledgements, and dead-lettering is crucial."
      ],
      whenNotToUse: [
        "Extremely high-throughput event streaming where message replayability and strict ordering within partitions are key (Kafka is often preferred).",
        "Simple point-to-point or pub/sub scenarios where the overhead of AMQP's flexibility isn't needed.",
        "If operational simplicity is paramount and a managed cloud service like SQS or Pub/Sub can meet the needs without RabbitMQ's advanced features."
      ],
      interviewTalkingPoints: [
        "Highlight its AMQP protocol foundation and the flexibility of exchanges (topic, direct, fanout).",
        "Mention its support for various protocols (MQTT, STOMP) beyond AMQP.",
        "Discuss reliability features: persistence, acknowledgements, publisher confirms, DLQs.",
        "Contrast its routing capabilities with Kafka's log-based approach.",
        "Acknowledge potential throughput differences with Kafka and complexity in clustering."
      ],
      defendingYourDecision: "RabbitMQ was chosen for its robust and flexible routing capabilities, essential for our [specific application's complex workflow, e.g., order processing with multiple conditional steps]. Its support for AMQP, message acknowledgements, and dead-letter exchanges ensures reliable task distribution. While other systems might offer higher raw throughput, RabbitMQ's feature set and mature ecosystem provide the reliability and control needed for this service.",
      useCases: [
        "Task queues for web applications.",
        "RPC-style communication.",
        "Complex routing scenarios.",
        "Systems requiring strong transactional behavior with messages."
      ],
      deliveryGuarantees: "At-most-once, At-least-once. Exactly-once semantics can be achieved with careful application design (e.g., idempotent consumers, transactional operations)."
    },
    {
      id: "apache_kafka",
      title: "Apache Kafka",
      type: "Distributed Streaming Platform (Log-based)",
      architecture: "A distributed, partitioned, replicated commit log service. Producers append messages (records) to topics (logs), which are divided into partitions. Consumers read from partitions at their own pace, tracking their position with offsets. Data is stored durably for a configurable retention period.",
      pros: [
        "Extremely high throughput and scalability, capable of handling trillions of messages per day.",
        "Durable message storage with fault tolerance through replication of topic partitions across brokers.",
        "Excellent for stream processing applications (often used with Kafka Streams, ksqlDB, Flink, or Spark Streaming).",
        "Rich ecosystem, wide adoption, and strong community support. Good for building event-driven architectures.",
        "Supports message replayability as consumers can re-read messages from a specific offset."
      ],
      cons: [
        "Can be more complex to set up, manage, and tune compared to simpler message queues (requires Zookeeper/KRaft, careful capacity planning).",
        "Does not offer the same fine-grained, flexible routing options as AMQP brokers like RabbitMQ out-of-the-box. Routing is primarily topic and partition-based.",
        "Features like per-message TTL or delayed messages are not natively supported (though workarounds exist).",
        "Achieving true exactly-once semantics for end-to-end processing requires careful configuration of transactional producers/consumers or Kafka Streams.",
        "Can have higher end-to-end latency for individual messages compared to some traditional MQs if not optimized for low-latency use cases."
      ],
      whenToUse: [
        "High-throughput event streaming platforms (e.g., collecting telemetry, clickstream data, application logs).",
        "Real-time analytics and stream processing pipelines.",
        "Building event-driven architectures and for event sourcing.",
        "Data integration pipelines (ETL) between various systems.",
        "Commit logs for distributed systems."
      ],
      whenNotToUse: [
        "Simple task queues where the overhead of Kafka's infrastructure (Zookeeper/KRaft, brokers) is excessive.",
        "Applications requiring complex, fine-grained message routing based on headers or content without significant custom consumer logic.",
        "When very low latency for individual, critical messages is paramount and simpler brokers might suffice.",
        "If you need built-in support for RPC-style request/reply patterns (though possible, it's not a primary use case)."
      ],
      interviewTalkingPoints: [
        "Emphasize its distributed commit log architecture and high throughput.",
        "Discuss its use for streaming, event-driven architectures, and log aggregation.",
        "Mention partitions for parallelism and replication for fault tolerance.",
        "Contrast its message consumption model (pull-based, offsets) with traditional MQs.",
        "Acknowledge operational complexity and Zookeeper/KRaft dependency."
      ],
      defendingYourDecision: "Kafka was chosen for its ability to handle extremely high-throughput event streams from our [specific source, e.g., IoT devices] and its robust support for building a scalable, real-time analytics pipeline. The message replayability and durable storage are key for our data processing needs. While operationally more complex, its performance and ecosystem benefits for streaming make it the right choice.",
      useCases: [
        "Real-time analytics and stream processing.",
        "Log aggregation and event sourcing.",
        "Data pipelines and ETL.",
        "High-volume messaging systems."
      ],
      deliveryGuarantees: "At-most-once, At-least-once. Exactly-once semantics are possible with Kafka Streams API or by using transactional producers and idempotent consumers."
    },
    {
      id: "redis_streams",
      title: "Redis Streams",
      type: "In-Memory Data Structure Server (with Stream capabilities)",
      architecture: "A stream is an append-only log-like data structure within Redis. Messages are appended as entries containing field-value pairs. Supports consumer groups for distributed processing and message acknowledgements. Persistence relies on Redis's RDB/AOF mechanisms.",
      pros: [
        "Extremely fast due to Redis's in-memory nature, offering very low latency.",
        "Simple to use if already using Redis for caching or other purposes, minimal additional infrastructure.",
        "Supports consumer groups, allowing multiple consumers to process a stream in parallel and track their progress.",
        "Provides message acknowledgements for at-least-once delivery semantics.",
        "Can be used as a lightweight message broker, for task distribution, or for capturing time-series data."
      ],
      cons: [
        "Message storage is limited by available RAM primarily (though disk persistence is possible, performance is best for in-memory datasets).",
        "Durability guarantees are tied to Redis's persistence configuration (RDB snapshots, AOF logs), which can have trade-offs with performance or data loss windows.",
        "Fewer advanced features compared to dedicated brokers like Kafka or RabbitMQ (e.g., no complex routing exchanges, limited transaction support over streams).",
        "Scalability is linked to Redis cluster capabilities; managing a very large Redis cluster for streams can be complex.",
        "No built-in message replay beyond the stream's current content (older, trimmed messages are gone)."
      ],
      whenToUse: [
        "Real-time notifications, activity feeds, or chat-like features where speed is critical.",
        "Lightweight job queues where tasks are processed quickly and message volume fits within Redis's capacity.",
        "Buffering or collecting sensor data or metrics for short-term processing.",
        "Inter-service communication in microservices architectures already heavily reliant on Redis."
      ],
      whenNotToUse: [
        "Long-term, durable storage of massive event streams (Kafka is better suited).",
        "Complex message routing or transformation logic that would be better handled by a full-fledged broker.",
        "When strong, disk-based durability guarantees with zero data loss are paramount for every message, irrespective of Redis persistence settings.",
        "If you need features like message replay over extended historical periods."
      ],
      interviewTalkingPoints: [
        "Highlight its speed due to Redis's in-memory nature.",
        "Mention its use as a lightweight alternative when full Kafka/RabbitMQ is overkill.",
        "Discuss consumer groups for parallel processing.",
        "Acknowledge RAM limitations and durability reliance on Redis persistence."
      ],
      defendingYourDecision: "Redis Streams was chosen for its exceptional low latency in delivering real-time notifications within our existing Redis infrastructure. This avoids adding another specialized broker, simplifying our stack while providing the necessary speed and consumer group functionality for this specific feature.",
      useCases: [
        "Real-time notifications and activity feeds.",
        "Job queues where extreme speed is needed and message volume fits Redis capacity.",
        "Caching messages or sensor data.",
        "Inter-service communication in microservices architectures already using Redis."
      ],
      deliveryGuarantees: "At-least-once (with consumer acknowledgements and proper handling). Message loss is possible if Redis persistence is not configured or if a master fails before replicating to slaves when persistence is fsync-on-write."
    },
    {
      id: "aws_sqs",
      title: "AWS SQS (Simple Queue Service)",
      type: "Managed Queue Service",
      architecture: "Fully managed message queuing service by AWS. Offers Standard queues (at-least-once delivery, best-effort ordering) and FIFO queues (exactly-once processing, strict ordering within a message group).",
      pros: [
        "Fully managed by AWS, highly scalable, and durable with minimal operational overhead.",
        "Simple to use with a straightforward API and pay-as-you-go pricing.",
        "Excellent integration with other AWS services (Lambda, EC2, S3, SNS).",
        "Supports dead-letter queues (DLQs) for error handling, delay queues for postponed message delivery, and message timers.",
        "FIFO queues provide exactly-once processing and deduplication within a 5-minute interval."
      ],
      cons: [
        "Strong vendor lock-in with AWS.",
        "Standard queues might deliver messages out of order or, rarely, more than once (requires idempotent consumers).",
        "FIFO queues have throughput limits (though high, e.g., 3000 messages/sec per API action by default in some regions, can be increased) compared to standard queues.",
        "Maximum message size is 256KB (larger messages require workarounds like S3 integration).",
        "Visibility timeout mechanism needs careful handling to prevent messages from being processed multiple times unintentionally or getting stuck."
      ],
      whenToUse: [
        "Decoupling microservices and serverless functions within the AWS ecosystem.",
        "Asynchronous task processing (e.g., image processing, email sending, report generation).",
        "Buffering requests to protect downstream services from load spikes.",
        "Workflows requiring strictly ordered processing (using FIFO queues).",
        "When a simple, reliable, and highly scalable managed queue is needed without managing infrastructure."
      ],
      whenNotToUse: [
        "Applications outside the AWS ecosystem or requiring multi-cloud/on-premise deployment.",
        "When you need features of a full message broker like complex routing (RabbitMQ) or stream replay (Kafka).",
        "If message sizes frequently exceed 256KB without wanting to implement custom S3 integration logic.",
        "Extremely high throughput scenarios where FIFO queue limits might be a concern and standard queue's best-effort ordering isn't acceptable."
      ],
      interviewTalkingPoints: [
        "Distinguish between Standard and FIFO queues (ordering, delivery guarantees, throughput).",
        "Highlight its serverless nature, scalability, and ease of integration with other AWS services.",
        "Mention features like DLQs, delay queues, and visibility timeout.",
        "Acknowledge message size limits and potential for out-of-order/duplicate messages in Standard queues."
      ],
      defendingYourDecision: "AWS SQS was chosen for its simplicity, reliability, and seamless integration with our existing AWS Lambda functions for asynchronous task processing. The managed nature of SQS significantly reduces our operational burden. For [specific task], [Standard/FIFO] queues provide the right balance of [throughput/ordering/delivery guarantee] we need.",
      useCases: [
        "Decoupling microservices.",
        "Asynchronous task processing (e.g., image processing, email sending).",
        "Buffering requests to protect downstream services.",
        "Workflows requiring ordered processing (FIFO queues)."
      ],
      deliveryGuarantees: "Standard: At-least-once. FIFO: Exactly-once processing (within a message group ID, with deduplication)."
    },
    {
      id: "google_cloud_pubsub",
      title: "Google Cloud Pub/Sub",
      type: "Managed Messaging Service",
      architecture: "Globally distributed, scalable, and reliable real-time messaging service by Google Cloud. Supports push and pull delivery of messages. Messages are published to topics and delivered via subscriptions.",
      pros: [
        "Global by default, providing low latency and high availability across multiple regions.",
        "Massive scalability for both throughput and number of topics/subscriptions.",
        "At-least-once delivery guarantee, with features like message ordering (with ordering keys) and dead-letter topics.",
        "Integrates well with other Google Cloud services (e.g., Dataflow, Cloud Functions, BigQuery).",
        "Supports filtering messages at the subscription level."
      ],
      cons: [
        "Vendor lock-in with Google Cloud Platform.",
        "Achieving exactly-once processing semantics requires careful design in consumer applications (e.g., idempotent processing) as Pub/Sub itself provides at-least-once.",
        "Can be more expensive than self-hosting for very high, sustained throughput if usage patterns are not well-optimized or if using features like snapshot and seek extensively.",
        "While powerful, the global nature and some advanced features might add complexity for very simple use cases."
      ],
      whenToUse: [
        "Event ingestion for stream analytics and big data processing pipelines on Google Cloud.",
        "Asynchronous inter-service communication in applications deployed on Google Cloud.",
        "Real-time data distribution to multiple subscribers across different regions.",
        "Decoupling applications for improved resilience and scalability within the GCP ecosystem."
      ],
      whenNotToUse: [
        "Applications not hosted on Google Cloud or requiring multi-cloud/on-premise deployment without relying on GCP connectivity.",
        "Simple task queues where a lighter solution (like Redis or a simpler MQ) might suffice, unless already in GCP.",
        "When strict transactional messaging or complex routing capabilities of a traditional broker are needed.",
        "Cost-sensitive applications with extremely high message volumes that could be cheaper to self-host (after considering operational overhead)."
      ],
      interviewTalkingPoints: [
        "Highlight its global nature and automatic scalability.",
        "Mention its use for event ingestion and real-time data distribution in GCP.",
        "Discuss features like ordering keys, dead-letter topics, and push/pull subscriptions.",
        "Acknowledge its at-least-once delivery and the need for idempotent consumers for exactly-once processing."
      ],
      defendingYourDecision: "Google Cloud Pub/Sub was selected for its global scalability and seamless integration with our Google Cloud Dataflow jobs, enabling us to build a robust event-driven analytics platform. Its ability to handle massive data streams with low latency is critical for our real-time processing needs.",
      useCases: [
        "Event ingestion for stream analytics.",
        "Asynchronous inter-service communication.",
        "Real-time data distribution.",
        "Decoupling applications."
      ],
      deliveryGuarantees: "At-least-once. Ordering can be achieved by publishing messages with the same ordering key to the same region. Exactly-once processing requires idempotent consumers."
    }
  ],
  patterns: [
    {
      id: "point_to_point",
      title: "Point-to-Point Messaging",
      description: "A message is sent by a producer to a specific queue, and is then delivered to a single consumer that is listening to that queue. This ensures that each message is processed by only one receiver. If multiple consumers listen to the same queue, they compete for messages (competing consumers pattern).",
      suitability: "Task distribution where each task needs to be performed exactly once (e.g., processing an order, sending an email). Decoupling components where a specific action needs to be triggered in another service.",
      pros: [
        "Simple to understand and implement.",
        "Ensures a message is processed by only one consumer (load balancing among consumers is often built-in).",
        "Good for decoupling tasks from the originator."
      ],
      cons: [
        "Not suitable for broadcasting messages to multiple interested parties.",
        "Can become a bottleneck if the single queue or consumer cannot keep up with the message rate (though multiple competing consumers can alleviate this)."
      ],
      whenToUse: [
        "Distributing tasks to a pool of workers.",
        "Sending commands to a specific service instance.",
        "Any scenario where a message should trigger a single, specific action."
      ],
      whenNotToUse: [
        "When multiple, different types of consumers need to react to the same message (use Pub/Sub).",
        "For broadcasting information or events widely."
      ],
      interviewTalkingPoints: [
        "Explain it as a one-to-one message delivery to a logical consumer (even if multiple physical consumers compete on a queue).",
        "Contrast it with Publish/Subscribe.",
        "Mention its use for task queues and decoupling."
      ],
      defendingYourDecision: "Point-to-point messaging via a queue was chosen to ensure that each [specific task, e.g., payment processing request] is handled by only one worker service, preventing duplicate processing. This pattern allows us to reliably decouple the [requesting service] from the [processing service] and scale the number of workers based on queue depth."
    },
    {
      id: "publish_subscribe",
      title: "Publish/Subscribe (Pub/Sub)",
      description: "A producer (publisher) sends messages to a topic (or an exchange in RabbitMQ terms). Multiple consumers (subscribers) can subscribe to that topic. Each subscriber interested in messages on that topic receives a copy of every message published to it. Publishers don't need to know about subscribers, and subscribers don't know about each other.",
      suitability: "Broadcasting events, notifications, distributing real-time data updates to multiple interested parties. Decoupling systems where one event needs to trigger actions in multiple, potentially different, downstream services.",
      pros: [
        "Strong decoupling between publishers and subscribers.",
        "Allows multiple consumers to react to the same event independently.",
        "Scalable, as new subscribers can be added without affecting publishers or other subscribers."
      ],
      cons: [
        "Message delivery to all interested subscribers can be complex to manage and guarantee, especially if some subscribers are offline.",
        "Publishers have less control over message consumption compared to point-to-point.",
        "Can be harder to track message flow if not monitored properly."
      ],
      whenToUse: [
        "Distributing notifications (e.g., new user signed up, product back in stock).",
        "Broadcasting real-time data updates (e.g., stock prices, sports scores).",
        "Event-driven architectures where multiple services react to domain events.",
        "Fan-out scenarios where one piece of information needs to be processed in multiple ways by different systems."
      ],
      whenNotToUse: [
        "When a message is intended for only one specific recipient or should only be processed once (use Point-to-Point).",
        "RPC-style request/reply interactions (though it can be adapted, it's not the primary fit)."
      ],
      interviewTalkingPoints: [
        "Explain the one-to-many nature of message delivery from a topic.",
        "Highlight the decoupling between publishers and subscribers.",
        "Discuss its use for event notifications and fan-out scenarios.",
        "Mention how different brokers (e.g., Kafka topics, RabbitMQ fanout/topic exchanges) implement this."
      ],
      defendingYourDecision: "The Publish/Subscribe pattern was chosen for our [event notification system, e.g., new order notifications] because multiple downstream services (e.g., shipping, inventory, analytics) need to react independently to the same 'Order Created' event. This decouples the order service from these consumers and allows us to easily add new subscribers in the future without impacting existing flows."
    },
    {
      id: "request_reply",
      title: "Request/Reply (RPC over Messaging)",
      description: "A sender (requester) sends a message and expects a response from the receiver. Often implemented using a pair of queues: one for requests and one for replies, with a correlation ID to match requests to responses.",
      suitability: "Executing remote procedures asynchronously, service-to-service communication where a response is needed."
    },
    {
      id: "competing_consumers",
      title: "Competing Consumers",
      description: "Multiple consumers read from the same queue, allowing for parallel processing of messages. Each message is processed by only one of the consumers.",
      suitability: "Scaling message processing, improving throughput and resilience.",
      notes: "This is the default behavior for SQS standard queues or Kafka consumer groups."
    },
    {
      id: "priority_queue",
      title: "Priority Queue",
      description: "Messages are assigned a priority, and the broker attempts to deliver higher-priority messages before lower-priority ones. Not all brokers support this natively.",
      suitability: "Processing urgent tasks before less critical ones."
    },
    {
      id: "message_ordering",
      title: "Message Ordering",
      description: "Ensuring that messages are processed in the order they were sent. Can be strict (FIFO) or grouped (e.g., Kafka messages with the same key go to the same partition).",
      suitability: "Workflows where the sequence of operations matters (e.g., financial transactions, state machine updates)."
    },
    {
      id: "saga_pattern",
      title: "Saga Pattern (Choreography/Orchestration)",
      description: "Managing distributed transactions using a sequence of local transactions, each updating its own service's data and publishing an event/message that triggers the next local transaction in another service. Compensation actions are used to roll back if a step fails.",
      suitability: "Maintaining data consistency across microservices without using distributed ACID transactions."
    },
    {
      id: "event_sourcing",
      title: "Event Sourcing",
      description: "Persisting the state of a business entity as a sequence of state-changing events. Instead of storing the current state, all changes (events) are stored. The current state can be reconstructed by replaying the events. Often uses message queues to propagate events.",
      suitability: "Systems requiring strong audit trails, ability to reconstruct past states, or complex state transitions."
    }
  ],
  scenarios: [
    {
      id: "order_processing",
      title: "Order Processing System",
      description: "When an order is placed, various downstream services need to be notified (inventory, payment, shipping, notifications).",
      considerations: [
        "Reliability: No lost orders (at-least-once or exactly-once).",
        "Decoupling: Services should operate independently.",
        "Scalability: Handle peaks in order volume."
      ],
      solutionRationale: "RabbitMQ for reliable task distribution to different services. Kafka if order events also feed into analytics or event sourcing systems. SQS for a managed cloud solution."
    },
    {
      id: "real_time_notifications",
      title: "Real-time User Notifications",
      description: "Sending notifications (e.g., new message, friend request) to users in real-time.",
      considerations: [
        "Low latency.",
        "Fan-out to potentially many users or devices (Pub/Sub).",
        "Scalability to handle many concurrent users."
      ],
      solutionRationale: "Redis Pub/Sub for very low latency if message persistence is less critical. Kafka or Google Cloud Pub/Sub for scalable and durable pub/sub messaging to many clients."
    },
    {
      id: "log_aggregation",
      title: "Log Aggregation",
      description: "Collecting logs from many distributed services and applications for centralized storage, processing, and analysis.",
      considerations: [
        "High throughput to handle large volumes of log data.",
        "Durability to prevent log loss.",
        "Ability to buffer logs before they are processed and indexed."
      ],
      solutionRationale: "Apache Kafka is a very common choice due to its high throughput, scalability, and ability to act as a buffer for log data feeding into systems like Elasticsearch or Splunk."
    },
    {
      id: "asynchronous_task_processing",
      title: "Asynchronous Task Processing",
      description: "Offloading long-running tasks (e.g., video encoding, report generation, email sending) from a primary application thread to background workers.",
      considerations: [
        "Decoupling of task submission from execution.",
        "Ability to scale workers independently.",
        "Retry mechanisms for failed tasks (DLQs)."
      ],
      solutionRationale: "RabbitMQ or AWS SQS are excellent for traditional task queues. Redis can be used for simpler, faster tasks."
    }
  ],
  flashcards: [
    {
      id: "fc_producer_consumer",
      question: "What are the roles of a Producer and a Consumer in a messaging system?",
      answer: "A Producer sends messages. A Consumer receives and processes messages."
    },
    {
      id: "fc_broker_role",
      question: "What is the main function of a message Broker?",
      answer: "To manage the storage and routing of messages between producers and consumers."
    },
    {
      id: "fc_queue_vs_topic",
      question: "Difference between a Queue and a Topic?",
      answer: "Queue: Point-to-point, one consumer processes a message. Topic: Publish/subscribe, multiple consumers can receive a copy of the message."
    },
    {
      id: "fc_dlq",
      question: "What is a Dead Letter Queue (DLQ)?",
      answer: "A queue for messages that could not be processed successfully, used for error handling and analysis."
    },
    {
      id: "fc_idempotency_mq",
      question: "Why is idempotency important in message consumers?",
      answer: "To ensure that processing the same message multiple times (due to at-least-once delivery) doesn't cause unintended side effects."
    },
    {
      id: "fc_kafka_offset",
      question: "What is an 'offset' in Apache Kafka?",
      answer: "A unique ID for each message within a partition of a topic, used by consumers to track their reading progress."
    },
    {
      id: "fc_delivery_guarantees",
      question: "Name the three main message delivery guarantees.",
      answer: "At most once, At least once, Exactly once."
    },
    {
      id: "fc_backpressure",
      question: "What is backpressure in messaging systems?",
      answer: "A mechanism for consumers/brokers to signal producers to slow down message production to prevent overload."
    }
  ],
  codeSnippets: [
    {
      id: "python_rabbitmq_pika",
      title: "Python with RabbitMQ (Pika)",
      language: "python",
      code: `
import pika

# Producer
try:
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='hello')
    channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')
    print(" [x] Sent 'Hello World!'")
    connection.close()
except pika.exceptions.AMQPConnectionError as e:
    print(f"Error connecting to RabbitMQ: {e}")

# Consumer
def callback(ch, method, properties, body):
    print(f" [x] Received {body.decode()}")

try:
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='hello')
    channel.basic_consume(queue='hello', on_message_callback=callback, auto_ack=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
except pika.exceptions.AMQPConnectionError as e:
    print(f"Error connecting to RabbitMQ: {e}")
except KeyboardInterrupt:
    print('Interrupted')
    if 'channel' in locals() and channel.is_open:
        channel.stop_consuming()
    if 'connection' in locals() and connection.is_open:
        connection.close()
      `
    },
    {
      id: "nodejs_kafka_kafkajs",
      title: "Node.js with Kafka (kafkajs)",
      language: "javascript",
      code: `
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Replace with your Kafka brokers
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  });
  console.log('Message sent successfully');
  await producer.disconnect();

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
  // Note: consumer.run() is non-blocking. For a simple script,
  // you might need to add a way to keep it running or disconnect explicitly.
  // await consumer.disconnect(); // Call this when done consuming.
};

run().catch(e => console.error('[example/kafkajs] e.message', e));

// To stop the consumer, you'd typically call consumer.disconnect()
// For example, after a timeout or on a SIGINT signal.
// setTimeout(async () => {
//   await consumer.disconnect();
//   console.log('Consumer disconnected');
// }, 30000); // Disconnect after 30 seconds
      `
    }
  ],
  decisionTree: {
    title: "Messaging Queue Decision Tree (Placeholder)",
    description: "This section will feature an interactive decision tree to help guide the selection of a message broker based on criteria like throughput needs, delivery guarantees, persistence requirements, etc. (Coming Soon)"
  },
  externalResources: [
    {
      id: "rabbitmq_docs",
      title: "RabbitMQ Documentation",
      url: "https://www.rabbitmq.com/documentation.html",
      description: "Official RabbitMQ documentation."
    },
    {
      id: "kafka_docs",
      title: "Apache Kafka Documentation",
      url: "https://kafka.apache.org/documentation/",
      description: "Official Apache Kafka documentation."
    },
    {
      id: "aws_sqs_docs",
      title: "AWS SQS Developer Guide",
      url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
      description: "Official AWS SQS documentation."
    },
    {
      id: "gcp_pubsub_docs",
      title: "Google Cloud Pub/Sub Documentation",
      url: "https://cloud.google.com/pubsub/docs",
      description: "Official Google Cloud Pub/Sub documentation."
    },
    {
      id: "redis_streams_intro",
      title: "Redis Streams Introduction",
      url: "https://redis.io/docs/data-types/streams/",
      description: "Official Redis documentation for Streams."
    },
    {
      id: "enterprise_integration_patterns_mq",
      title: "Enterprise Integration Patterns (Messaging Patterns)",
      url: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/",
      description: "A catalog of patterns for enterprise application integration, many related to messaging."
    }
  ]
};
