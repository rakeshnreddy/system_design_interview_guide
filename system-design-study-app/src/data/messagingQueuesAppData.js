export const messagingQueuesAppData = {
  overview: `Asynchronous messaging is a communication method where senders (producers) and receivers (consumers) of messages do not need to interact at the same time. Producers place messages into a queue, and consumers retrieve them when ready, allowing components to be {{Decoupling|decoupled}} and operate independently. This {{Decoupling}} is fundamental to building {{Resilient Systems|resilient}} and {{Scalable Systems|scalable}} distributed systems.

Queues enhance distributed systems by improving {{Reliability}}, {{Throughput}}, and {{Durability}}. {{Reliability}} is increased because messages persist in the queue even if consumers are temporarily unavailable, ensuring eventual processing. {{Throughput}} benefits as producers can offload tasks quickly without waiting for immediate processing, and multiple consumers can process messages in parallel. {{Durability}} is achieved by persisting messages, protecting against data loss in case of system failures, ensuring that critical information is not lost before it can be acted upon.`,
  title: "Messaging Queues",
  metrics: [
    {
      id: "throughput",
      title: "{{Throughput}}",
      description: "The rate at which messages are successfully processed by the queue system, often measured in messages per second or MB/second.",
      importance: "Critical for high-volume systems to ensure messages don't pile up."
    },
    {
      id: "latency",
      title: "{{End-to-End Latency}}",
      description: "The total time taken for a message from production by the producer to consumption by the consumer. Includes queueing time and processing time.",
      importance: "Crucial for real-time applications requiring quick message delivery."
    },
    {
      id: "message_durability",
      title: "{{Message Durability}}",
      description: "Ensures that messages are not lost in case of broker failure. Achieved through persistence to disk and {{Replication}}.",
      importance: "Essential for applications where message loss is unacceptable (e.g., financial transactions)."
    },
    {
      id: "delivery_guarantees",
      title: "{{Delivery Guarantees}}",
      description: "Defines the assurance level for message delivery: {{At Most Once}}, {{At Least Once}}, {{Exactly Once}}.",
      importance: "Depends on the application's tolerance for duplicate messages or message loss."
    },
    {
      id: "error_rate",
      title: "{{Error Rate}}",
      description: "The percentage of messages that fail to be processed correctly, either due to producer errors, consumer errors, or broker issues.",
      importance: "Needs to be monitored to ensure system {{Reliability}}."
    },
    {
      id: "queue_depth",
      title: "{{Queue Depth}}/Lag",
      description: "The number of messages currently waiting in the queue to be processed. High queue depth can indicate consumer performance issues or insufficient consumer scaling.",
      importance: "Monitoring helps in understanding load and potential bottlenecks."
    },
    {
      id: "consumer_lag_kafka",
      title: "{{Consumer Lag (Kafka specific)}}",
      description: "The difference in {{Offset}} between the latest message produced to a topic partition and the offset of the message being processed by a consumer group. Indicates how far behind a consumer is.",
      importance: "Key metric for {{Apache Kafka|Kafka}} consumers to ensure they are keeping up with producers."
    }
  ],
  terminology: [
    {
      id: "producer",
      title: "{{Producer (Publisher)}}",
      description: "An application component that creates and sends messages to a message queue or topic.",
    },
    {
      id: "consumer",
      title: "{{Consumer (Subscriber)}}",
      description: "An application component that subscribes to a message queue or topic and processes messages received from it.",
    },
    {
      id: "broker",
      title: "{{Broker}}",
      description: "The message queue server software that manages the storage and routing of messages between producers and consumers.",
    },
    {
      id: "queue",
      title: "{{Queue}}",
      description: "A data structure that stores messages in a sequence (often {{FIFO - First-In, First-Out}}) until they are processed by a consumer. Typically used in point-to-point messaging.",
    },
    {
      id: "topic",
      title: "{{Topic}}",
      description: "A named channel or category to which messages are published. Used in publish/subscribe messaging systems where multiple consumers can subscribe to the same topic.",
    },
    {
      id: "exchange_rabbitmq",
      title: "{{Exchange (RabbitMQ specific)}}",
      description: "In {{RabbitMQ}}, producers publish messages to an exchange, which then routes them to bound queues based on rules and bindings.",
      types: "{{Direct Exchange}}, {{Fanout Exchange}}, {{Topic Exchange}}, {{Headers Exchange}}"
    },
    {
      id: "dead_letter_queue",
      title: "{{Dead Letter Queue (DLQ)}}",
      description: "A dedicated queue where messages that cannot be processed successfully by a consumer (after retries, or due to errors) are sent for later analysis or manual intervention.",
      importance: "Prevents problematic messages from blocking processing and allows for error handling."
    },
    {
      id: "idempotency",
      title: "{{Idempotency}}",
      description: "Ensuring that processing the same message multiple times has the same effect as processing it once. Important for systems with '{{At Least Once}}' delivery guarantees to prevent unintended side effects from duplicate messages.",
    },
    {
      id: "backpressure",
      term: "{{Backpressure}}",
      definition: "A mechanism to signal producers to slow down when consumers cannot keep up, preventing system overload."
    },
    {
      id: "message_acknowledgement",
      title: "{{Message Acknowledgement (Ack/Nack)}}",
      description: "A signal sent by a consumer to the broker indicating that a message has been successfully processed (Ack) or failed processing (Nack). The broker uses this to decide whether to redeliver the message or remove it from the queue.",
    },
    {
      id: "offset",
      term: "{{Offset}}",
      definition: "In {{Apache Kafka|Kafka}}, a sequential ID assigned to each message in a partition, used by consumers to track read position."
    },
    {
      id: "consumer_group_kafka",
      title: "{{Consumer Group (Kafka specific)}}",
      description: "One or more consumers that jointly consume messages from one or more {{Apache Kafka|Kafka}} topic partitions. Each partition is consumed by only one consumer within a group, allowing for parallel processing.",
    },
    {
      id: "publishSubscribe",
      term: "{{Publish–Subscribe}}",
      definition: "A messaging pattern where messages are broadcast to multiple subscribers based on topics or channels."
    }
  ],
  deliverySemantics: [
    {
      term: "{{At-Least-Once Delivery|At-Least-Once}}",
      definition: "Guarantees that each message will be delivered one or more times. If an acknowledgment is not received, the message may be redelivered, potentially leading to duplicates.",
      pros: "Ensures no message loss, suitable for critical tasks where processing a message multiple times is acceptable or can be handled ({{Idempotency}}).",
      cons: "Requires consumers to be {{Idempotency|idempotent}} to handle potential duplicate messages correctly.",
      exampleScenario: "Order processing systems where duplicate orders can be detected and handled, ensuring every order is eventually processed."
    },
    {
      term: "{{At-Most-Once Delivery|At-Most-Once}}",
      definition: "Guarantees that each message will be delivered zero or one time. Messages might be lost if an acknowledgment fails or a system crashes before delivery confirmation.",
      pros: "Simple to implement, avoids duplicate messages. Suitable for non-critical data where occasional message loss is tolerable.",
      cons: "Potential for message loss; not suitable for critical data or tasks.",
      exampleScenario: "Real-time telemetry updates where losing a single data point is acceptable and out-of-sequence or duplicate data is problematic."
    },
    {
      term: "{{Exactly-Once Semantics|Exactly-Once}}",
      definition: "Guarantees that each message is delivered and processed exactly one time. This is the most complex to achieve and often involves coordination between the broker and the consumer application (e.g., transactional processing, deduplication mechanisms).",
      pros: "Ideal for critical applications where message loss and duplicate processing are unacceptable, like financial transactions.",
      cons: "Often incurs higher {{Latency}} and complexity in implementation. May require specialized broker features or careful application design.",
      exampleScenario: "Financial payment processing where each transaction must be processed once and only once to avoid incorrect fund transfers."
    }
  ],
  brokerpedia: [
    {
      id: "rabbitmq",
      name: "{{RabbitMQ}}",
      description: "An open-source message broker that implements the {{Advanced Message Queuing Protocol (AMQP)}}. Known for flexible routing, reliability features, and support for multiple messaging protocols and plugins.",
      pros: [
        "Extremely flexible routing capabilities ({{Topic Exchange|topic}}, {{Direct Exchange|direct}}, {{Fanout Exchange|fanout}}, {{Headers Exchange|headers exchanges}}).",
        "Supports multiple messaging protocols ({{AMQP}}, {{MQTT}}, {{STOMP}}).",
        "Mature platform with good management UI and client libraries.",
        "{{Message Acknowledgement (Ack/Nack)|Message acknowledgements}}, {{Persistence}}, and publisher confirms for {{Reliability}}.",
        "Advanced features like {{TTL (Time-To-Live)|TTL}}, {{Priority Queues}}, and {{Dead Letter Exchanges}}."
      ],
      cons: [
        "Lower raw {{Throughput}} compared to {{Apache Kafka|Kafka}} for simple streaming.",
        "Clustering and {{High Availability}} can be complex to manage.",
        "Message ordering guaranteed per queue; global ordering is challenging.",
        "{{Performance}} can degrade with very long queues or many bindings."
      ],
      whenToUse: "Use for complex routing needs, traditional task queues (e.g., image processing, email sending), RPC-style messaging, or when {{AMQP}} features are essential.",
      whenNotToUse: "Avoid for very high-{{Throughput}} event streaming where replayability is key ({{Apache Kafka|Kafka}} is better), or if operational simplicity of a managed service (like {{Amazon SQS|SQS}}) is preferred for simpler queueing needs.",
      interviewTalkingPoints: [
        "Explain {{AMQP}} and exchange types ({{Direct Exchange|direct}}, {{Topic Exchange|topic}}, {{Fanout Exchange|fanout}}).",
        "Discuss {{Reliability}} features: {{Persistence}}, {{Message Acknowledgement (Ack/Nack)|acknowledgements}}, {{Dead Letter Queues (DLQ)|DLQs}}.",
        "Contrast its routing flexibility with {{Apache Kafka|Kafka}}'s partition model.",
        "Mention support for various protocols beyond {{AMQP}}."
      ],
      defendingYourDecision: "We chose {{RabbitMQ}} for its robust routing capabilities needed for our order processing workflow, which requires messages to be conditionally routed to different services. Its support for {{Message Acknowledgement (Ack/Nack)|acknowledgements}} and {{Dead Letter Queues (DLQ)|dead-letter queues}} ensures task {{Reliability}}.",
      useCases: [
        "Task distribution in web applications.",
        "{{RPC (Request/Reply)|RPC (Request/Reply)}} patterns.",
        "Event-driven systems with complex routing logic.",
        "Integrating polyglot systems with its multi-protocol support."
      ]
    },
    {
      id: "apache_kafka",
      name: "{{Apache Kafka}}",
      description: "A distributed streaming platform built around a {{Publish–Subscribe}} log. Offers high-{{Throughput}}, fault-tolerant messaging and event streaming.",
      pros: [
        "Durable message storage with configurable retention",
        "High {{Throughput}} for both publishing and subscribing",
        "Partitioned consumer model for parallelism",
        "{{Exactly-Once Semantics}} with transactions"
      ],
      cons: [
        "Operational complexity ({{Apache ZooKeeper|Zookeeper}}/{{KRaft}}, cluster management)",
        "Steep learning curve for tuning {{Performance}}",
        "Not ideal for very small deployments or simple task queues"
      ],
      whenToUse: "Use when you need a durable, high-volume event streaming backbone (e.g., activity logs, metrics pipelines, real-time analytics).",
      whenNotToUse: "Avoid for simple task queues with low {{Throughput}} or when you need built-in complex routing or retry/backoff logic without custom implementation.",
      interviewTalkingPoints: [
        "Explain {{Apache Kafka|Kafka}}’s append-only log and partition {{Consumer Groups}}.",
        "Discuss how {{Apache Kafka|Kafka}} achieves {{Durability}} and high {{Throughput}}.",
        "Mention {{Exactly-Once Semantics}} with {{Apache Kafka|Kafka}} transactions."
      ],
      defendingYourDecision: "We chose {{Apache Kafka|Kafka}} for its ability to handle millions of events per second with {{Fault Tolerance}} and replay semantics, crucial for our real-time analytics platform.",
      useCases: [
        "Website clickstream analysis",
        "Real-time analytics pipelines",
        "{{Event Sourcing}} in {{Microservices}} architectures",
        "Log aggregation from distributed systems"
      ]
    },
    {
      id: "redis_streams",
      title: "{{Redis Streams}}",
      type: "In-Memory Data Structure Server (with Stream capabilities)",
      architecture: "A stream is an append-only log-like data structure within {{Redis}}. Messages are appended as entries containing field-value pairs. Supports {{Consumer Groups}} for distributed processing and {{Message Acknowledgement (Ack/Nack)|message acknowledgements}}. {{Persistence}} relies on {{Redis}}'s {{RDB (Redis Database Backup)|RDB}}/{{AOF (Append Only File)|AOF}} mechanisms.",
      pros: [
        "Extremely fast due to {{Redis}}'s in-memory nature, offering very low {{Latency}}.",
        "Simple to use if already using {{Redis}} for [caching](#/caches) or other purposes, minimal additional infrastructure.",
        "Supports {{Consumer Groups}}, allowing multiple consumers to process a stream in parallel and track their progress.",
        "Provides {{Message Acknowledgement (Ack/Nack)|message acknowledgements}} for {{At-Least-Once Delivery|at-least-once delivery semantics}}.",
        "Can be used as a lightweight {{Message Broker|message broker}}, for task distribution, or for capturing time-series data."
      ],
      cons: [
        "Message storage is limited by available RAM primarily (though disk {{Persistence}} is possible, {{Performance}} is best for in-memory datasets).",
        "{{Durability}} guarantees are tied to {{Redis}}'s {{Persistence}} configuration ({{RDB (Redis Database Backup)|RDB}} snapshots, {{AOF (Append Only File)|AOF}} logs), which can have trade-offs with {{Performance}} or data loss windows.",
        "Fewer advanced features compared to dedicated brokers like {{Apache Kafka|Kafka}} or {{RabbitMQ}} (e.g., no complex routing exchanges, limited transaction support over streams).",
        "{{Scalability}} is linked to {{Redis Cluster}} capabilities; managing a very large {{Redis Cluster}} for streams can be complex.",
        "No built-in message replay beyond the stream's current content (older, trimmed messages are gone)."
      ],
      whenToUse: [
        "Real-time notifications, activity feeds, or chat-like features where speed is critical.",
        "Lightweight job queues where tasks are processed quickly and message volume fits within {{Redis}}'s capacity.",
        "Buffering or collecting sensor data or metrics for short-term processing.",
        "Inter-service communication in {{Microservices}} architectures already heavily reliant on {{Redis}}."
      ],
      whenNotToUse: [
        "Long-term, durable storage of massive event streams ({{Apache Kafka|Kafka}} is better suited).",
        "Complex message routing or transformation logic that would be better handled by a full-fledged broker.",
        "When strong, disk-based {{Durability}} guarantees with zero data loss are paramount for every message, irrespective of {{Redis}} {{Persistence}} settings.",
        "If you need features like message replay over extended historical periods."
      ],
      interviewTalkingPoints: [
        "Highlight its speed due to {{Redis}}'s in-memory nature.",
        "Mention its use as a lightweight alternative when full {{Apache Kafka|Kafka}}/{{RabbitMQ}} is overkill.",
        "Discuss {{Consumer Groups}} for parallel processing.",
        "Acknowledge RAM limitations and {{Durability}} reliance on {{Redis}} {{Persistence}}."
      ],
      defendingYourDecision: "{{Redis Streams}} was chosen for its exceptional low {{Latency}} in delivering real-time notifications within our existing {{Redis}} infrastructure. This avoids adding another specialized broker, simplifying our stack while providing the necessary speed and {{Consumer Group (Kafka specific)|consumer group}} functionality for this specific feature.",
      useCases: [
        "Real-time notifications and activity feeds.",
        "Job queues where extreme speed is needed and message volume fits {{Redis}} capacity.",
        "[Caching](#/caches) messages or sensor data.",
        "Inter-service communication in {{Microservices}} architectures already using {{Redis}}."
      ],
      deliveryGuarantees: "{{At-Least-Once Delivery|At-least-once}} (with consumer acknowledgements and proper handling). Message loss is possible if {{Redis Persistence|Redis persistence}} is not configured or if a master fails before replicating to slaves when {{Persistence}} is fsync-on-write."
    },
    {
      id: "aws_sqs",
      name: "{{Amazon SQS}}",
      description: "A fully managed message queuing service offered by Amazon Web Services (AWS). Provides highly scalable and reliable queues for {{Decoupling|decoupling}} and scaling {{Microservices}}, distributed systems, and serverless applications.",
      pros: [
        "Fully managed, highly scalable, and durable with minimal operational overhead.",
        "Simple API and pay-as-you-go pricing.",
        "Excellent integration with other AWS services ({{AWS Lambda|Lambda}}, {{Amazon EC2|EC2}}, {{Amazon S3|S3}}).",
        "Supports Standard ({{At-Least-Once Delivery|at-least-once}}) and {{FIFO Queues|FIFO (exactly-once, ordered)}} queues.",
        "Features like {{Dead Letter Queues (DLQ)|dead-letter queues (DLQs)}} and {{Delay Queues}}."
      ],
      cons: [
        "Strong vendor lock-in with AWS.",
        "Standard queues can have out-of-order delivery and duplicates (requires {{Idempotency|idempotent}} consumers).",
        "{{FIFO Queues}} have {{Throughput}} limits compared to Standard queues.",
        "Maximum message size is 256KB (larger messages need {{Amazon S3|S3}} workarounds)."
      ],
      whenToUse: "Use for {{Decoupling|decoupling}} {{Microservices}} and serverless functions in AWS, asynchronous task processing (e.g., image processing), or buffering requests to downstream services.",
      whenNotToUse: "Avoid if outside the AWS ecosystem, or if you need features like complex client-side routing, message replay ({{Apache Kafka|Kafka}}-style), or very large messages without {{Amazon S3|S3}} integration.",
      interviewTalkingPoints: [
        "Differentiate Standard vs. {{FIFO Queues}} (ordering, delivery, {{Throughput}}).",
        "Highlight its serverless nature and AWS integration.",
        "Mention {{Dead Letter Queues (DLQ)|DLQs}}, {{Delay Queues}}, and visibility timeout.",
        "Acknowledge message size limits and Standard queue characteristics."
      ],
      defendingYourDecision: "We chose {{Amazon SQS}} for its simplicity and seamless integration with {{AWS Lambda}} for our asynchronous task processing. The managed nature of SQS significantly reduces operational burden, and {{FIFO Queues}} provide the {{Exactly-Once Semantics|exactly-once processing}} we need for financial transactions.",
      useCases: [
        "{{Decoupling}} {{Microservices}} in AWS.",
        "Background job processing with {{AWS Lambda|Lambda}}.",
        "Buffering requests to protect [databases](#/databases).",
        "Reliable task offloading for web applications."
      ]
    },
    {
      id: "google_cloud_pubsub",
      title: "{{Google Cloud Pub/Sub}}",
      type: "Managed Messaging Service",
      architecture: "Globally distributed, scalable, and reliable real-time messaging service by Google Cloud. Supports push and pull delivery of messages. Messages are published to topics and delivered via subscriptions.",
      pros: [
        "Global by default, providing low {{Latency}} and {{High Availability}} across multiple regions.",
        "Massive {{Scalability}} for both {{Throughput}} and number of topics/subscriptions.",
        "{{At-Least-Once Delivery|At-least-once delivery guarantee}}, with features like message ordering (with ordering keys) and {{Dead Letter Topics}}.",
        "Integrates well with other Google Cloud services (e.g., {{Google Cloud Dataflow|Dataflow}}, {{Google Cloud Functions|Cloud Functions}}, {{Google BigQuery|BigQuery}}).",
        "Supports filtering messages at the subscription level."
      ],
      cons: [
        "Vendor lock-in with Google Cloud Platform.",
        "Achieving {{Exactly-Once Semantics|exactly-once processing semantics}} requires careful design in consumer applications (e.g., {{Idempotency|idempotent processing}}) as Pub/Sub itself provides {{At-Least-Once Delivery|at-least-once}}.",
        "Can be more expensive than self-hosting for very high, sustained {{Throughput}} if usage patterns are not well-optimized or if using features like snapshot and seek extensively.",
        "While powerful, the global nature and some advanced features might add complexity for very simple use cases."
      ],
      whenToUse: [
        "Event ingestion for stream analytics and big data processing pipelines on Google Cloud.",
        "Asynchronous inter-service communication in applications deployed on Google Cloud.",
        "Real-time data distribution to multiple subscribers across different regions.",
        "{{Decoupling}} applications for improved resilience and {{Scalability}} within the GCP ecosystem."
      ],
      whenNotToUse: [
        "Applications not hosted on Google Cloud or requiring multi-cloud/on-premise deployment without relying on GCP connectivity.",
        "Simple task queues where a lighter solution (like {{Redis}} or a simpler MQ) might suffice, unless already in GCP.",
        "When strict transactional messaging or complex routing capabilities of a traditional broker are needed.",
        "Cost-sensitive applications with extremely high message volumes that could be cheaper to self-host (after considering operational overhead)."
      ],
      interviewTalkingPoints: [
        "Highlight its global nature and automatic {{Scalability}}.",
        "Mention its use for event ingestion and real-time data distribution in GCP.",
        "Discuss features like ordering keys, {{Dead Letter Topics}}, and push/pull subscriptions.",
        "Acknowledge its {{At-Least-Once Delivery|at-least-once delivery}} and the need for {{Idempotency|idempotent}} consumers for {{Exactly-Once Semantics|exactly-once processing}}."
      ],
      defendingYourDecision: "{{Google Cloud Pub/Sub}} was selected for its global {{Scalability}} and seamless integration with our {{Google Cloud Dataflow}} jobs, enabling us to build a robust event-driven analytics platform. Its ability to handle massive data streams with low {{Latency}} is critical for our real-time processing needs.",
      useCases: [
        "Event ingestion for stream analytics.",
        "Asynchronous inter-service communication.",
        "Real-time data distribution.",
        "{{Decoupling}} applications."
      ],
      deliveryGuarantees: "{{At-Least-Once Delivery|At-least-once}}. Ordering can be achieved by publishing messages with the same ordering key to the same region. {{Exactly-Once Semantics|Exactly-once processing}} requires {{Idempotency|idempotent}} consumers."
    }
  ],
  patterns: [
    {
      id: "point_to_point",
      title: "{{Point-to-Point Messaging}}",
      description: "A message is sent by a producer to a specific queue, and is then delivered to a single consumer that is listening to that queue. This ensures that each message is processed by only one receiver. If multiple consumers listen to the same queue, they compete for messages ({{Competing Consumers}} pattern).",
      suitability: "Task distribution where each task needs to be performed exactly once (e.g., processing an order, sending an email). {{Decoupling}} components where a specific action needs to be triggered in another service.",
      pros: [
        "Simple to understand and implement.",
        "Ensures a message is processed by only one consumer (load balancing among consumers is often built-in).",
        "Good for {{Decoupling|decoupling}} tasks from the originator."
      ],
      cons: [
        "Not suitable for broadcasting messages to multiple interested parties.",
        "Can become a bottleneck if the single queue or consumer cannot keep up with the message rate (though multiple {{Competing Consumers}} can alleviate this)."
      ],
      whenToUse: [
        "Distributing tasks to a pool of workers.",
        "Sending commands to a specific service instance.",
        "Any scenario where a message should trigger a single, specific action."
      ],
      whenNotToUse: [
        "When multiple, different types of consumers need to react to the same message (use {{Publish/Subscribe (Pub/Sub)}}).",
        "For broadcasting information or events widely."
      ],
      interviewTalkingPoints: [
        "Explain it as a one-to-one message delivery to a logical consumer (even if multiple physical consumers compete on a queue).",
        "Contrast it with {{Publish/Subscribe (Pub/Sub)}}.",
        "Mention its use for task queues and {{Decoupling}}."
      ],
      defendingYourDecision: "{{Point-to-Point Messaging}} via a queue was chosen to ensure that each [specific task, e.g., payment processing request] is handled by only one worker service, preventing duplicate processing. This pattern allows us to reliably {{Decoupling|decouple}} the [requesting service] from the [processing service] and scale the number of workers based on queue depth."
    },
    {
      id: "publish_subscribe",
      title: "{{Publish/Subscribe (Pub/Sub)}}",
      description: "A producer (publisher) sends messages to a topic (or an {{Exchange (RabbitMQ specific)|exchange}} in {{RabbitMQ}} terms). Multiple consumers (subscribers) can subscribe to that topic. Each subscriber interested in messages on that topic receives a copy of every message published to it. Publishers don't need to know about subscribers, and subscribers don't know about each other.",
      suitability: "Broadcasting events, notifications, distributing real-time data updates to multiple interested parties. {{Decoupling}} systems where one event needs to trigger actions in multiple, potentially different, downstream services.",
      pros: [
        "Strong {{Decoupling|decoupling}} between publishers and subscribers.",
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
        "When a message is intended for only one specific recipient or should only be processed once (use {{Point-to-Point Messaging}}).",
        "{{RPC (Remote Procedure Call)|RPC}}-style request/reply interactions (though it can be adapted, it's not the primary fit)."
      ],
      interviewTalkingPoints: [
        "Explain the one-to-many nature of message delivery from a topic.",
        "Highlight the {{Decoupling|decoupling}} between publishers and subscribers.",
        "Discuss its use for event notifications and fan-out scenarios.",
        "Mention how different brokers (e.g., {{Apache Kafka|Kafka}} topics, {{RabbitMQ}} {{Fanout Exchange|fanout}}/{{Topic Exchange|topic exchanges}}) implement this."
      ],
      defendingYourDecision: "The {{Publish/Subscribe (Pub/Sub)}} pattern was chosen for our [event notification system, e.g., new order notifications] because multiple downstream services (e.g., shipping, inventory, analytics) need to react independently to the same 'Order Created' event. This {{Decoupling|decouples}} the order service from these consumers and allows us to easily add new subscribers in the future without impacting existing flows."
    },
    {
      id: "request_reply",
      title: "{{Request/Reply (RPC over Messaging)}}",
      description: "A sender (requester) sends a message and expects a response from the receiver. Often implemented using a pair of queues: one for requests and one for replies, with a {{Correlation ID}} to match requests to responses.",
      suitability: "Executing remote procedures asynchronously, service-to-service communication where a response is needed."
    },
    {
      id: "competing_consumers",
      title: "{{Competing Consumers}}",
      description: "Multiple consumers read from the same queue, allowing for parallel processing of messages. Each message is processed by only one of the consumers.",
      suitability: "Scaling message processing, improving {{Throughput}} and resilience.",
      notes: "This is the default behavior for {{Amazon SQS|SQS}} standard queues or {{Apache Kafka|Kafka}} consumer groups."
    },
    {
      id: "priority_queue",
      title: "{{Priority Queue}}",
      description: "Messages are assigned a priority, and the broker attempts to deliver higher-priority messages before lower-priority ones. Not all brokers support this natively.",
      suitability: "Processing urgent tasks before less critical ones."
    },
    {
      id: "message_ordering",
      title: "{{Message Ordering}}",
      description: "Ensuring that messages are processed in the order they were sent. Can be strict ({{FIFO - First-In, First-Out|FIFO}}) or grouped (e.g., {{Apache Kafka|Kafka}} messages with the same key go to the same partition).",
      suitability: "Workflows where the sequence of operations matters (e.g., financial transactions, state machine updates)."
    },
    {
      id: "saga_pattern",
      title: "{{Saga Pattern (Choreography/Orchestration)}}",
      description: "Managing distributed transactions using a sequence of local transactions, each updating its own service's data and publishing an event/message that triggers the next local transaction in another service. Compensation actions are used to roll back if a step fails.",
      suitability: "Maintaining data {{Consistency}} across {{Microservices}} without using distributed {{ACID Properties|ACID transactions}}."
    },
    {
      id: "event_sourcing",
      title: "{{Event Sourcing}}",
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
        "{{Reliability}}: No lost orders ({{At-Least-Once Delivery|at-least-once}} or {{Exactly-Once Semantics|exactly-once}}).",
        "{{Decoupling}}: Services should operate independently.",
        "{{Scalability}}: Handle peaks in order volume."
      ],
      solutionRationale: "{{RabbitMQ}} for reliable task distribution to different services. {{Apache Kafka|Kafka}} if order events also feed into analytics or {{Event Sourcing}} systems. {{Amazon SQS|SQS}} for a managed cloud solution."
    },
    {
      id: "real_time_notifications",
      title: "Real-time User Notifications",
      description: "Sending notifications (e.g., new message, friend request) to users in real-time.",
      considerations: [
        "Low {{Latency}}.",
        "Fan-out to potentially many users or devices ({{Publish/Subscribe (Pub/Sub)|Pub/Sub}}).",
        "{{Scalability}} to handle many concurrent users."
      ],
      solutionRationale: "{{Redis Pub/Sub}} for very low {{Latency}} if message {{Persistence}} is less critical. {{Apache Kafka|Kafka}} or {{Google Cloud Pub/Sub}} for scalable and durable {{Publish/Subscribe (Pub/Sub)|pub/sub}} messaging to many clients."
    },
    {
      id: "log_aggregation",
      title: "Log Aggregation",
      description: "Collecting logs from many distributed services and applications for centralized storage, processing, and analysis.",
      considerations: [
        "High {{Throughput}} to handle large volumes of log data.",
        "{{Durability}} to prevent log loss.",
        "Ability to buffer logs before they are processed and indexed."
      ],
      solutionRationale: "{{Apache Kafka}} is a very common choice due to its high {{Throughput}}, {{Scalability}}, and ability to act as a buffer for log data feeding into systems like {{Elasticsearch}} or {{Splunk}}."
    },
    {
      id: "asynchronous_task_processing",
      title: "Asynchronous Task Processing",
      description: "Offloading long-running tasks (e.g., video encoding, report generation, email sending) from a primary application thread to background workers.",
      considerations: [
        "{{Decoupling}} of task submission from execution.",
        "Ability to scale workers independently.",
        "Retry mechanisms for failed tasks ({{Dead Letter Queues (DLQ)|DLQs}})."
      ],
      solutionRationale: "{{RabbitMQ}} or {{Amazon SQS|AWS SQS}} are excellent for traditional task queues. {{Redis}} can be used for simpler, faster tasks."
    },
    {
      key: "taskQueueProcessing",
      title: "Task Queue Processing",
      description:
        "A web application offloads image resizing jobs to a queue. Workers consume jobs and process images asynchronously, improving user {{Latency}}.",
      problem:
        "Synchronous image resizing blocks web requests and slows down user experience.",
      solution:
        "Use {{RabbitMQ}} with a work-queue pattern: web server publishes tasks; a pool of worker services subscribes and processes in parallel. Implement {{Message Acknowledgement (Ack/Nack)|acknowledgments}} and retries for failures.",
      challenges:
        "Ensuring {{Idempotency|idempotent}} task handlers to avoid duplicate processing on redelivery.",
      learnings:
        "{{Decoupling}} producers/consumers greatly improved {{Throughput}}; {{Idempotency}} is critical for {{Reliability}}."
    },
    {
      key: "eventStreaming",
      title: "Event Streaming for Analytics",
      description:
        "A retail platform streams customer click events to {{Apache Kafka|Kafka}}, which then feeds multiple downstream consumers for real-time dashboards and long-term data lakes.",
      problem:
        "Multiple analytics services competing for direct [database](#/databases) reads create load spikes.",
      solution:
        "Centralize events in {{Apache Kafka|Kafka}} topics. Downstream services subscribe independently without impacting primary [database](#/databases).",
      challenges:
        "{{Schema Evolution}} management as event formats change.",
      learnings:
        "Event logs provide replayability and {{Decoupling}} of analytics from production systems."
    }
  ],
  flashcards: [
    {
      id: "fc_producer_consumer",
      question: "What are the roles of a {{Producer (Publisher)|Producer}} and a {{Consumer (Subscriber)|Consumer}} in a messaging system?",
      answer: "A {{Producer (Publisher)|Producer}} sends messages. A {{Consumer (Subscriber)|Consumer}} receives and processes messages."
    },
    {
      id: "fc_broker_role",
      question: "What is the main function of a message {{Broker}}?",
      answer: "To manage the storage and routing of messages between producers and consumers."
    },
    {
      id: "fc_queue_vs_topic",
      question: "Difference between a {{Queue}} and a {{Topic}}?",
      answer: "{{Queue}}: {{Point-to-Point Messaging|Point-to-point}}, one consumer processes a message. {{Topic}}: {{Publish/Subscribe (Pub/Sub)|Publish/subscribe}}, multiple consumers can receive a copy of the message."
    },
    {
      id: "fc_dlq",
      question: "What is a {{Dead Letter Queue (DLQ)}}?",
      answer: "A queue for messages that could not be processed successfully, used for error handling and analysis."
    },
    {
      id: "fc_idempotency_mq",
      question: "Why is {{Idempotency}} important in message consumers?",
      answer: "To ensure that processing the same message multiple times (due to {{At-Least-Once Delivery|at-least-once delivery}}) doesn't cause unintended side effects."
    },
    {
      id: "fc_kafka_offset",
      question: "What is an '{{Offset}}' in {{Apache Kafka}}?",
      answer: "A unique ID for each message within a partition of a topic, used by consumers to track their reading progress."
    },
    {
      id: "fc_delivery_guarantees",
      question: "Name the three main message {{Delivery Guarantees}}.",
      answer: "{{At-Most-Once Delivery|At most once}}, {{At-Least-Once Delivery|At least once}}, {{Exactly-Once Semantics|Exactly once}}."
    },
    {
      id: "fc_backpressure",
      question: "What is {{Backpressure}} in messaging systems?",
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
  ],
  mermaidDiagrams: {
    pointToPoint: `
    sequenceDiagram
      participant Producer
      participant Queue
      participant Consumer
      Producer->>Queue: send(message)
      Queue->>Consumer: deliver(message)
      Consumer-->>Queue: ack
  `,
    pubSub: `
    sequenceDiagram
      participant Pub
      participant Broker
      participant Sub1
      participant Sub2
      Pub->>Broker: publish(topic,msg)
      Broker->>Sub1: deliver(msg)
      Broker->>Sub2: deliver(msg)
  `
  }
};
