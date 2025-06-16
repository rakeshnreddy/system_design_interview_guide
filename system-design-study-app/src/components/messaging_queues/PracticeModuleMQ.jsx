import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { db } from '../../firebaseConfig'; // For saving/loading progress (optional)
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Quiz Data (can be moved to a data file)
const quizQuestions = [
  {
    id: 'q1',
    question: "Which delivery guarantee ensures messages are never lost but might result in duplicates?",
    options: ["At Most Once", "At Least Once", "Exactly Once"],
    answer: "At Least Once",
    explanation: "At Least Once guarantees that every message will be delivered, but due to retries (e.g., if an acknowledgment is lost), a message might be delivered multiple times. This necessitates idempotent consumers."
  },
  {
    id: 'q2',
    question: "In Kafka, what is the primary unit of parallelism and ordering?",
    options: ["Topic", "Broker", "Partition", "Consumer Group"],
    answer: "Partition",
    explanation: "Messages within a Kafka partition are ordered. A topic can have multiple partitions, allowing for parallel consumption by consumers in a group, with each consumer assigned specific partitions."
  },
  {
    id: 'q3',
    question: "What is a Dead Letter Queue (DLQ) primarily used for?",
    options: ["Storing high-priority messages", "Backing up all messages", "Handling messages that failed processing", "Load balancing messages"],
    answer: "Handling messages that failed processing",
    explanation: "DLQs isolate messages that cannot be processed successfully after a certain number of retries. This prevents 'poison pill' messages from blocking the main queue and allows for later analysis or manual intervention."
  },
  {
    id: 'q4',
    question: "Which AMQP exchange type routes messages to all bound queues, regardless of routing key?",
    options: ["Direct", "Topic", "Fanout", "Headers"],
    answer: "Fanout",
    explanation: "A Fanout exchange broadcasts incoming messages to all queues that are bound to it. It's useful for scenarios where multiple independent consumers need a copy of the same message."
  },
  {
    id: 'q5',
    question: "What does 'idempotency' mean for a message consumer?",
    options: ["It processes messages very quickly.", "It can only process one message at a time.", "Processing the same message multiple times has the same effect as processing it once.", "It acknowledges messages before processing."],
    answer: "Processing the same message multiple times has the same effect as processing it once.",
    explanation: "Idempotency is crucial for systems with at-least-once delivery. If a consumer receives a duplicate message, an idempotent operation ensures that no unintended side effects occur (e.g., charging a credit card twice)."
  }
];

// Pipeline Builder Data
const pipelineStages = {
  source: { name: "Data Source", types: ["User Clicks", "IoT Sensor", "Order API", "External Feed"] },
  ingestion: { name: "Ingestion/Broker", types: ["Kafka", "RabbitMQ", "AWS SQS", "Redis Streams", "HTTP Endpoint"] },
  processing: { name: "Processing", types: ["Stream Processor (Flink/Spark)", "Lambda Function", "Microservice A", "Validation Service"] },
  storage: { name: "Storage/Sink", types: ["Data Lake (S3/GCS)", "Data Warehouse (Snowflake/BigQuery)", "NoSQL DB (DynamoDB/Cassandra)", "Search Index (Elasticsearch)"] }
};


const PracticeModuleMQ = ({ user }) => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(null); // For Firebase

  const [pipeline, setPipeline] = useState({ source: null, ingestion: null, processing: null, storage: null });
  const [pipelineFeedback, setPipelineFeedback] = useState("");

  // Load progress from Firebase (optional)
  useEffect(() => {
    if (user && db) {
      const progressDocRef = doc(db, `users_mq_progress/${user.uid}/practice`, 'quiz');
      getDoc(progressDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnswers(data.answers || {});
          setScore(data.score || 0);
          setShowResults(data.showResults || false);
          setQuizProgress(data);
        }
      });
    }
  }, [user]);

  const handleOptionChange = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    setShowResults(false); // Reset results if an answer is changed
  };

  const handleSubmitQuiz = async () => {
    let currentScore = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);

    if (user && db) {
      const progressData = { answers, score: currentScore, showResults: true, lastAttempted: new Date() };
      try {
        await setDoc(doc(db, `users_mq_progress/${user.uid}/practice`, 'quiz'), progressData, { merge: true });
        setQuizProgress(progressData);
      } catch (error) {
        console.error("Error saving quiz progress:", error);
      }
    }
  };

  const handlePipelineChange = (stage, type) => {
    setPipeline(prev => ({ ...prev, [stage]: type }));
    setPipelineFeedback(""); // Clear feedback when pipeline changes
  };

  const handleCheckPipeline = () => {
    if (!pipeline.source || !pipeline.ingestion || !pipeline.processing || !pipeline.storage) {
      setPipelineFeedback("Please select a component for each stage of the pipeline.");
      return;
    }
    // Basic feedback logic (can be expanded)
    let feedback = `Your pipeline: ${pipeline.source} -> ${pipeline.ingestion} -> ${pipeline.processing} -> ${pipeline.storage}. `;
    if (pipeline.ingestion === "Kafka" && (pipeline.source === "User Clicks" || pipeline.source === "IoT Sensor")) {
      feedback += "Good choice using Kafka for high-throughput ingestion! ";
    }
    if (pipeline.ingestion === "Redis Streams" && pipeline.source === "Order API") {
      feedback += "Redis Streams can work for an Order API if traffic is manageable and you benefit from Redis's speed. Ensure persistence is configured. ";
    }
    if (pipeline.processing === "Stream Processor (Flink/Spark)" && pipeline.ingestion !== "Kafka") {
       feedback += "Flink/Spark are powerful for stream processing, often paired with Kafka. Ensure your chosen ingestion method can feed them efficiently. ";
    }
    setPipelineFeedback(feedback + "This is a basic check. Consider message guarantees, error handling, and specific component configurations for a real design.");
  };


  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
          Practice &amp; Application
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8"> {/* Added mb-8 */}
          Test your understanding with quizzes and apply your knowledge by building a conceptual data pipeline. Login to save progress.
        </p>
      </div>

      {!user && (
        <Card className="mb-8 text-center" padding="p-6">
           <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Login to Track Progress</h2>
          <p className="text-base text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
            Consider logging in (via the main sidebar) to save your quiz progress and potentially access more personalized interactive exercises in the future.
          </p>
        </Card>
      )}

      <Card className="mb-8" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Knowledge Check Quiz</h2>
        <div className="space-y-6">
          {quizQuestions.map((q, index) => (
            <div key={q.id} className="py-2">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                Question {index + 1}: {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map(option => (
                  <label key={option} className="flex items-center text-base text-neutral-700 dark:text-neutral-300 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700/50 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      className="mr-3 h-4 w-4 text-primary focus:ring-primary-dark border-neutral-400 dark:border-neutral-500"
                      disabled={showResults && user && quizProgress?.answers?.[q.id] !== undefined}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {showResults && (
                <div className={`mt-3 p-3 rounded-md text-sm ${answers[q.id] === q.answer ? 'bg-success/10 dark:bg-success/20 text-green-700 dark:text-green-200 border border-success/30' : 'bg-error/10 dark:bg-error/20 text-red-700 dark:text-red-200 border border-error/30'}`}>
                  <strong className="block mb-1">Your answer: {answers[q.id] || "Not answered"}</strong>
                  <strong className="block mb-1">Correct answer: {q.answer}</strong>
                  <p className="mt-1 text-xs italic opacity-90">{q.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleSubmitQuiz} variant="primary" size="lg" className="mt-8 w-full sm:w-auto" disabled={showResults && user && quizProgress?.showResults}>
          {showResults && user && quizProgress?.showResults ? "Results Submitted" : (showResults ? "Review Your Score" : "Submit Answers")}
        </Button>
        {showResults && (
          <p className="mt-4 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Your Score: <span className={score === quizQuestions.length ? "text-success" : "text-secondary"}>{score}</span> / {quizQuestions.length}
          </p>
        )}
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Mini Pipeline Builder</h2>
        <p className="text-base text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
          Select components for each stage to build a conceptual data pipeline using messaging queues. Consider the flow and purpose of each stage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-6">
          {Object.entries(pipelineStages).map(([stageKey, stageDetails]) => (
            <div key={stageKey}>
              <label htmlFor={`${stageKey}Select`} className="block text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-1 capitalize">{stageDetails.name}:</label>
              <select
                id={`${stageKey}Select`}
                value={pipeline[stageKey] || ""}
                onChange={(e) => handlePipelineChange(stageKey, e.target.value)}
                className="w-full p-2.5 text-base border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary"
              >
                <option value="" disabled>Select {stageDetails.name}</option>
                {stageDetails.types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          ))}
        </div>
        <Button onClick={handleCheckPipeline} variant="secondary" size="lg" className="w-full sm:w-auto">Check My Pipeline Design</Button>
        {pipelineFeedback && (
          <div className="mt-6 p-4 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 text-base border border-indigo-200 dark:border-indigo-700">
            <h4 className="text-xl font-semibold mb-2">Pipeline Feedback:</h4>
            <p className="leading-relaxed whitespace-pre-line">{pipelineFeedback}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PracticeModuleMQ;
