import React, { useState, useEffect, useRef } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
// IMPORTANT: User must provide their Gemini API key here for AI features to work.
// This should ideally be handled via environment variables or a secure config service in a real app.
const GEMINI_API_KEY = "AIzaSyBFYfB6q6jTlXchN0t24-8THXXxXUn-ehU"; // Replace with your actual key

// Helper components (can be moved to a common file if used elsewhere)
const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-0"></div>
    <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-150"></div>
    <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-300"></div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">AI is thinking...</p>
  </div>
);

const UserMessage = ({ children }) => (
  <div className="flex justify-end mb-3">
    <div className="bg-primary text-white p-3 rounded-lg max-w-lg shadow">
      {children}
    </div>
  </div>
);

const AIMessage = ({ children, isLoading }) => (
  <div className="flex justify-start mb-3">
    <div className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 p-3 rounded-lg max-w-lg shadow">
      {isLoading ? <LoadingSpinner /> : children}
    </div>
  </div>
);

// Main Scenario Data (can be moved to a data file)
const scenarioCategories = {
  "E-commerce Order Processing": {
    description: "Designing a system to handle high volume e-commerce orders, ensuring no orders are lost and updates are sent to relevant services (inventory, shipping, notifications).",
    defaultPrompt: "Generate a system design for e-commerce order processing using messaging queues. Focus on decoupling services like order intake, payment processing, inventory management, and notifications. Specify queue types, message content, and error handling strategies."
  },
  "Real-time Analytics Pipeline": {
    description: "Building a pipeline to ingest and process real-time user activity data (clicks, views, interactions) for an analytics dashboard.",
    defaultPrompt: "Design a real-time analytics pipeline using Kafka. Detail the data ingestion points, Kafka topics, consumer groups for different analytics tasks (e.g., trend analysis, user behavior tracking), and how to handle data transformations and aggregations before storing in a data warehouse."
  },
  "IoT Data Ingestion": {
    description: "Handling data streams from thousands of IoT devices, ensuring data is reliably collected, processed for anomalies, and stored for later analysis.",
    defaultPrompt: "Outline a system for IoT data ingestion using MQTT and a message broker like RabbitMQ or EMQX, feeding into a processing backend. Discuss message formats from devices, handling device connectivity issues, and scaling the ingestion layer."
  },
  "Microservices Communication": {
    description: "Enabling reliable asynchronous communication between various microservices in a complex application, such as user registration, email notifications, and profile updates.",
    defaultPrompt: "Explain how messaging queues facilitate asynchronous communication in a microservices architecture. Provide an example scenario (e.g., user signup triggering multiple downstream actions) and discuss patterns like Choreography vs Orchestration with queues."
  }
};


const ScenariosModuleMQ = ({ user }) => {
  const [selectedScenario, setSelectedScenario] = useState(Object.keys(scenarioCategories)[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    // Initialize with scenario description
    setChatHistory([{
      role: 'ai',
      parts: `Let's explore the scenario: **${selectedScenario}**. ${scenarioCategories[selectedScenario].description} What aspects would you like to focus on, or shall I generate an initial design based on this? You can also type your own specific questions or design prompts.`
    }]);
    setCustomPrompt(""); // Clear custom prompt when scenario changes
  }, [selectedScenario]);

  const handleScenarioChange = (event) => {
    setSelectedScenario(event.target.value);
  };

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    const promptToSend = customPrompt || scenarioCategories[selectedScenario].defaultPrompt;
    if (!promptToSend) return;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
      alert("⚠️ Gemini API Key not set! Please add your API key in ScenariosModuleMQ.jsx to use this feature.");
      setChatHistory(prev => [...prev, { role: 'user', parts: promptToSend }, {role: 'ai', parts: "AI features are disabled. Please configure the Gemini API key."}]);
      return;
    }

    const userMessage = { role: 'user', parts: promptToSend };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setCustomPrompt("");

    try {
      // Prepare history for Gemini API (simplified, assumes 'parts' is a string)
      const historyForAPI = chatHistory.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.parts }] // Gemini API expects parts as an array of objects with a text key
      })).filter(msg => msg.parts[0].text); // Filter out any empty messages if they somehow occur

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [...historyForAPI, { role: 'user', parts: [{ text: promptToSend }] }],
          // generationConfig: { ... } // Optional: add temperature, topK, etc.
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again.";
      setChatHistory(prev => [...prev, { role: 'ai', parts: aiResponse }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatHistory(prev => [...prev, { role: 'ai', parts: `Error: ${error.message}. Ensure your API key is correct and has access.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center">
          Interactive Design Scenarios (with AI)
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed text-center mb-8">
          Engage with AI-powered scenarios to practice designing systems with messaging queues. Select a category, or provide your own prompt to the AI.
        </p>
      </div>

      {!user && (
        <Card className="mb-6 text-center" padding="p-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Login Required</h2>
          <p className="text-base text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
            Please log in to engage with interactive AI-powered design scenarios. Your progress and chat history may be saved if you are logged in.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            (Login functionality is available in the main sidebar of the Messaging Queues guide.)
          </p>
        </Card>
      )}

      {user && (
        <Card className="mb-6" padding="p-6">
          <div className="mb-5"> {/* Increased margin */}
            <label htmlFor="scenarioSelect" className="block text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-1">
              1. Select a Scenario Category:
            </label>
            <select
              id="scenarioSelect"
              value={selectedScenario}
              onChange={handleScenarioChange}
              className="w-full p-2.5 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary text-base"
            >
              {Object.keys(scenarioCategories).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div className="h-96 overflow-y-auto p-4 border border-neutral-300 dark:border-neutral-700 rounded-md mb-4 bg-neutral-50 dark:bg-neutral-800 shadow-inner"> {/* Added shadow-inner */}
            {chatHistory.map((msg, index) => (
              msg.role === 'user'
                ? <UserMessage key={index}>{msg.parts}</UserMessage>
                : <AIMessage key={index} isLoading={isLoading && index === chatHistory.length -1}>{msg.parts}</AIMessage>
            ))}
            {isLoading && chatHistory.length > 0 && chatHistory[chatHistory.length-1].role !== 'ai' && <AIMessage isLoading={true} />}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handlePromptSubmit}>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={`Ask about "${selectedScenario}" or type your own prompt... (Hint: try the default prompt if unsure)`}
              rows="4" // Increased rows
              className="w-full p-2.5 text-base border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary mb-3"
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <Button type="button" variant="outline" onClick={() => setCustomPrompt(scenarioCategories[selectedScenario].defaultPrompt)} disabled={isLoading} className="w-full sm:w-auto">
                Use Default Scenario Prompt
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? "AI Thinking..." : "Send to AI"}
              </Button>
            </div>
          </form>
          {(!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") && (
             <p className="mt-4 text-sm text-warning dark:text-yellow-400 text-center p-2 bg-warning/10 dark:bg-yellow-600/10 rounded-md">
               ⚠️ AI features require a valid Gemini API key. Please update the <code className="font-mono bg-neutral-200 dark:bg-neutral-700 p-0.5 rounded text-xs">GEMINI_API_KEY</code> constant in <code className="font-mono bg-neutral-200 dark:bg-neutral-700 p-0.5 rounded text-xs">ScenariosModuleMQ.jsx</code>.
             </p>
           )}
        </Card>
      )}

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">How to Use This Module</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            This interactive module allows you to explore common system design scenarios involving messaging queues with the help of an AI assistant (powered by Google Gemini).
          </p>
          <ol className="list-decimal space-y-2 pl-5"> {/* Changed to ordered list */}
            <li>If not already logged in, consider doing so via the main sidebar to potentially save or track your progress in the future (feature dependent).</li>
            <li>Select a predefined scenario category from the dropdown to get started. The AI will be primed with a description of this scenario.</li>
            <li>You can use the "Use Default Scenario Prompt" button to load a detailed prompt related to that scenario, or type your own specific questions or design requirements into the text area.</li>
            <li>Click "Send to AI". The AI will generate a response based on your input and the conversation history.</li>
            <li>Continue the conversation with the AI to refine the design, ask follow-up questions, explore trade-offs, or request alternative solutions.</li>
            <li><strong>Critical Evaluation:</strong> Remember that AI responses are for educational and brainstorming purposes. Always critically evaluate the suggestions and cross-reference with trusted resources and your own understanding.</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default ScenariosModuleMQ;
