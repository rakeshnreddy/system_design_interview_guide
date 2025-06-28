import React from 'react';
import Card from '../common/Card'; // Using global Card component
import Button from '../common/Button'; // Using global Button component
import { Link } from 'react-router-dom'; // For external links, or use <a>

const HighlightMQ = ({ children, className }) => (
  <span className={`bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

const FrameworksModuleMQ = () => {
  const frameworks = [
    {
      name: "RabbitMQ",
      description: "A mature, open-source message broker that implements AMQP (Advanced Message Queuing Protocol). Known for its flexibility in routing, reliability, and a rich feature set including various exchange types, clustering, and a comprehensive management UI.",
      pros: ["Flexible routing (direct, topic, fanout, headers exchanges)", "Mature, battle-tested, and reliable", "Good management tools and UI", "Supports multiple protocols (AMQP, MQTT, STOMP)", "Message acknowledgements and persistence"],
      cons: ["Can be complex to configure for optimal performance and high availability", "Clustering setup requires careful planning", "Throughput might be lower than Kafka for very high-volume streaming"],
      useCases: "Complex routing scenarios, enterprise messaging, task queues where message order and delivery guarantees are critical, microservice communication.",
      website: "https://www.rabbitmq.com/"
    },
    {
      name: "Apache Kafka",
      description: "A distributed streaming platform designed for building real-time data pipelines and streaming applications. It excels at handling high-throughput, fault-tolerant, and scalable event streams by storing messages in a partitioned, replicated commit log.",
      pros: ["Extremely high throughput (millions of messages/sec)", "Excellent horizontal scalability and fault tolerance", "Durable message storage with stream history (replayable messages)", "Rich ecosystem (Kafka Streams, Kafka Connect, ksqlDB)"],
      cons: ["Higher operational complexity compared to traditional message brokers", "Point-to-point messaging (traditional queueing) can be less straightforward than RabbitMQ", "Historically dependent on Zookeeper (newer versions are removing this dependency via KRaft mode)"],
      useCases: "Real-time analytics, event sourcing, log aggregation, stream processing, data pipelines between systems, website activity tracking.",
      website: "https://kafka.apache.org/"
    },
    {
      name: "Redis (Streams & Pub/Sub)",
      description: "While primarily an in-memory data store, Redis offers robust messaging capabilities through Streams (a persistent append-only log structure) and Pub/Sub (fire-and-forget messaging). It's extremely fast for scenarios where data fits in memory or persistence needs are met by Redis's RDB/AOF mechanisms.",
      pros: ["Very fast due to in-memory nature", "Simple to use if already using Redis for caching or other purposes", "Redis Streams support consumer groups and persistence", "Low latency"],
      cons: ["Limited by server memory capacity for very large streams/queues (though Streams can spill to disk)", "Fewer advanced messaging features compared to dedicated brokers like Kafka/RabbitMQ", "Pub/Sub is not persistent", "Clustering for Streams is managed via Redis Cluster"],
      useCases: "Job queues, real-time notifications, lightweight chat systems, caching intermediate results, task distribution where extreme speed and simplicity are key.",
      website: "https://redis.io/"
    },
    {
      name: "AWS SQS (Simple Queue Service)",
      description: "A fully managed message queuing service from Amazon Web Services. It offers Standard (at-least-once, best-effort ordering) and FIFO (exactly-once processing, strict ordering) queues, providing high availability and scalability without needing to manage infrastructure.",
      pros: ["Fully managed, easy to set up and operate", "Highly scalable and available", "Pay-as-you-go pricing model", "Good integration with other AWS services (Lambda, EC2, S3)"],
      cons: ["Vendor lock-in (AWS ecosystem)", "Standard queues have best-effort ordering (duplicates possible, order not guaranteed)", "FIFO queues have lower throughput limits than Standard queues", "Can be more expensive at very high message volumes compared to self-hosted solutions"],
      useCases: "Decoupling microservices, serverless application task processing, background job queuing, buffering requests within the AWS ecosystem.",
      website: "https://aws.amazon.com/sqs/"
    },
    {
      name: "Google Cloud Pub/Sub",
      description: "A real-time, globally scalable messaging service from Google Cloud Platform. It's designed for speed, scalability, and reliability, supporting push and pull message delivery, filtering, and at-least-once delivery semantics.",
      pros: ["Globally scalable and available by default", "Low latency", "At-least-once delivery guarantee", "Strong integration with other GCP services (Dataflow, Functions, BigQuery)", "Message filtering capabilities", "Dead-letter topics"],
      cons: ["Vendor lock-in (GCP ecosystem)", "Pricing model can be complex for some specific, high-volume use cases", "Fewer client libraries compared to Kafka/RabbitMQ in some languages"],
      useCases: "Event ingestion from various sources, stream analytics, asynchronous task distribution, data integration pipelines within GCP, real-time notifications.",
      website: "https://cloud.google.com/pubsub"
    }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
          Messaging Frameworks &amp; Tools Comparison
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8"> {/* Added mb-8 */}
          Choosing the right messaging framework is a critical decision in system design. This section provides a comparative overview of popular technologies, highlighting their strengths, weaknesses, and ideal use cases to help you make informed choices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap for xl */}
        {frameworks.map(fw => {
          let cardId = '';
          if (fw.name === "RabbitMQ") {
            cardId = "mq-rabbitmq";
          } else if (fw.name === "Apache Kafka") {
            cardId = "mq-kafka";
          }
          // else if (fw.name.toLowerCase().includes("redis")) cardId = "mq-redis"; // Example if Redis was a specific topic

          return (
            <Card key={fw.name} id={cardId || undefined} className="flex flex-col h-full hover:shadow-2xl transition-shadow duration-300" padding="p-0"> {/* Removed base padding, handled internally */}
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-t-lg">
                <h2 className="text-2xl font-bold text-secondary dark:text-secondary-light">{fw.name}</h2>
              </div>
            <div className="p-5 flex-grow flex flex-col">
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 flex-grow">{fw.description}</p>

              <div className="mb-3">
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Pros:</h3>
                <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  {fw.pros.map(pro => <li key={pro}>{pro}</li>)}
                </ul>
              </div>

              <div className="mb-3">
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Cons:</h3>
                <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  {fw.cons.map(con => <li key={con}>{con}</li>)}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Common Use Cases:</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{fw.useCases}</p>
              </div>

              {fw.website && (
                <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <a
                    href={fw.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button variant="outline" size="md" className="w-full"> {/* Changed size to md */}
                      Visit Website
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </Card> // Removed semicolon here
        })}
      </div>
    </div>
  );
};

export default FrameworksModuleMQ;
