import React from 'react';
import Card from '../common/Card';

const cheatSheetData = {
  "Core Concepts": [
    { term: "Producer", definition: "Application that sends messages." },
    { term: "Consumer", definition: "Application that receives messages." },
    { term: "Broker", definition: "Intermediary that manages message queues (e.g., RabbitMQ, Kafka)." },
    { term: "Queue", definition: "Ordered list of messages." },
    { term: "Message", definition: "Data packet sent by producer, consumed by consumer." },
    { term: "Exchange (AMQP)", definition: "Receives messages from producers and routes them to queues based on rules." },
    { term: "Topic (Kafka)", definition: "Named stream of messages in Kafka, divided into partitions." },
  ],
  "Delivery Guarantees": [
    { term: "At Most Once", definition: "Messages may be lost but are not redelivered. Highest performance." },
    { term: "At Least Once", definition: "No messages are lost, but duplicates are possible. Requires idempotent consumers." },
    { term: "Exactly Once", definition: "Every message is delivered and processed once. Most complex, highest integrity." },
  ],
  "Key Patterns": [
    { term: "Competing Consumers", definition: "Multiple consumers read from the same queue to distribute load." },
    { term: "Publish/Subscribe (Pub/Sub)", definition: "Producers publish messages to a topic/exchange, and multiple consumers subscribe to receive copies." },
    { term: "Request/Reply", definition: "Sender sends a message and expects a response, often using temporary reply queues." },
    { term: "Dead Letter Queue (DLQ)", definition: "Queue for messages that cannot be processed successfully after retries." },
    { term: "Message Priority", definition: "Processing messages based on assigned priority (not all systems support this well)." },
    { term: "Message Deduplication", definition: "Strategies to prevent processing duplicate messages (e.g., using unique message IDs)." },
  ],
  "Scalability & Performance": [
    { term: "Partitioning/Sharding", definition: "Dividing queue/topic data across multiple servers/disks (e.g., Kafka partitions)." },
    { term: "Clustering", definition: "Multiple broker instances working together for HA and load distribution." },
    { term: "Batching", definition: "Grouping multiple messages by producers or consumers to reduce overhead." },
    { term: "Connection Pooling", definition: "Reusing connections to the broker." },
    { term: "Message Compression", definition: "Reducing message size to save bandwidth and storage." },
  ],
  "Popular Technologies": [
    { term: "RabbitMQ", definition: "AMQP-based, flexible routing, mature. Good for traditional task queues and complex routing." },
    { term: "Apache Kafka", definition: "Distributed streaming platform, high-throughput, for real-time data pipelines & event sourcing." },
    { term: "AWS SQS", definition: "Managed queue service (Standard & FIFO). Easy to use in AWS." },
    { term: "Google Cloud Pub/Sub", definition: "Managed real-time messaging service in GCP." },
    { term: "Redis Streams", definition: "Lightweight, fast queues within Redis, good for simpler use cases." },
  ],
};

const CheatSheetModuleMQ = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
          Messaging Queues Cheat Sheet
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8"> {/* Added mb-8 */}
          A quick reference guide to core concepts, delivery guarantees, key patterns, popular technologies, and important considerations for messaging queue systems.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(cheatSheetData).map(([category, items]) => (
          <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300" padding="p-6">
            <h2 className="text-3xl font-bold text-secondary dark:text-secondary-light mb-5 border-b border-neutral-300 dark:border-neutral-700 pb-3">
              {category}
            </h2>
            <dl className="space-y-4"> {/* Increased spacing */}
              {items.map(item => (
                <div key={item.term} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4"> {/* Using 12-col grid for better alignment */}
                  <dt className="md:col-span-4 font-semibold text-xl text-neutral-800 dark:text-neutral-100 md:text-right">
                    {item.term}
                  </dt>
                  <dd className="md:col-span-8 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-primary-light/10 dark:bg-primary-dark/20 border border-primary/30" padding="p-6">
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mb-4">Key Takeaways &amp; Interview Sound Bites</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-200">
          <ul className="list-disc space-y-2 pl-5">
            <li>"Choose delivery guarantees (at-most-once, at-least-once, exactly-once) based on your application's tolerance for data loss versus its ability to handle duplicates (idempotency)."</li>
            <li>"Idempotent consumers are critical for systems using at-least-once delivery to prevent unintended side effects from message redelivery."</li>
            <li>"Kafka is a distributed streaming platform excelling at high-throughput event streams and log aggregation, while RabbitMQ is a versatile message broker strong in complex routing and traditional task queues."</li>
            <li>"Managed services like AWS SQS or Google Cloud Pub/Sub significantly reduce operational overhead but may introduce vendor lock-in and have different cost implications at scale."</li>
            <li>"Always monitor key queue metrics: depth (backlog), message processing latency, error rates, and consumer/producer throughput to ensure system health and identify bottlenecks."</li>
            <li>"Decoupling services with queues improves resilience, scalability, and allows teams to work independently."</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default CheatSheetModuleMQ;
