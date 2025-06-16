// src/pages/CachesPage.jsx
import React, { useState, useEffect } from 'react';
import SidebarCaches from '../components/caches/SidebarCaches';
// import FundamentalsView from '../components/caches/FundamentalsView';
// ... other view imports

import Modal from '../components/common/Modal';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Import actual app data
import { cachesAppData } from '../data/cachesAppData';
import FundamentalsView from '../components/caches/FundamentalsView';
import CachepediaView from '../components/caches/CachepediaView';

import PatternsView from '../components/caches/PatternsView';

  // const FundamentalsView = ({ appData }) => <PlaceholderView title="Fundamentals" appData={appData} />; Removed placeholder
import ScenariosView from '../components/caches/ScenariosView';

  // const CachepediaView = ({ appData }) => <PlaceholderView title="Cachepedia" appData={appData} />; Removed placeholder
import PracticeView from '../components/caches/PracticeView';

import CodeLibraryView from '../components/caches/CodeLibraryView';



const CachesPage = () => {
  const [currentView, setCurrentView] = useState('fundamentals');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiScenarioProblem, setAiScenarioProblem] = useState('');
  const [aiScenarioSolution, setAiScenarioSolution] = useState(''); // User's solution
  const [aiScenarioFeedback, setAiScenarioFeedback] = useState(''); // AI's feedback
  const [isAiLoading, setIsAiLoading] = useState(false);

  // IMPORTANT: User must provide their Gemini API key here.
  // This should ideally be managed via environment variables in a real application.
  const GEMINI_API_KEY = "AIzaSyBFYfB6q6jTlXchN0t24-8THXXxXUn-ehU"; // TODO: Remind user to fill this

  useEffect(() => {
    const hashView = window.location.hash.substring(1);
    const validViews = ['fundamentals', 'cachepedia', 'patterns', 'scenarios', 'practice', 'code'];
    if (hashView && validViews.includes(hashView)) {
      setCurrentView(hashView);
    } else {
      setCurrentView('fundamentals');
      if (typeof window !== 'undefined') window.location.hash = 'fundamentals';
    }
  }, []);

  const handleNavClick = (viewName) => {
    setCurrentView(viewName);
    if (typeof window !== 'undefined') window.location.hash = viewName;
  };

  // mockAppData is no longer needed as cachesAppData is imported.
  // const mockAppData = {
  //    metrics: [{id:1, name: "Hit Rate", description: "The percentage of requests that are successfully served from the cache.", talk:"Aim for high hit rates!"}],
  //    terminology: [{term:"Cache Hit", definition:"Data found in cache."}],
  //    cachepedia: {}, writePatterns: [], evictionPolicies: [],
  //    scenarios: {}, flashcards: [], codeSnippets: [], decisionTree: {}
  // };

  const handleGenerateAiScenario = async () => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
      alert("⚠️ Gemini API Key not set! Please add your API key in CachesPage.jsx to use AI features.");
      setAiScenarioProblem("AI features are disabled. Please configure the Gemini API key. Sample problem: Design a caching strategy for a rapidly growing social media application's news feed, focusing on minimizing latency and handling the 'thundering herd' problem.");
      setAiScenarioFeedback("");
      setAiScenarioSolution("");
      setIsAiModalOpen(true);
      return;
    }
    setIsAiLoading(true);
    setAiScenarioProblem("Generating scenario...");
    setAiScenarioFeedback("");
    setAiScenarioSolution("");
    setIsAiModalOpen(true);

    try {
      // const response = await callGeminiAPI("Generate a complex caching system design problem.");
      // setAiScenarioProblem(response.text()); // Simplified
      // Mock response:
      setTimeout(() => {
        setAiScenarioProblem("Design a caching strategy for a global e-commerce platform's product catalog and user session data. The platform experiences flash sales and highly variable traffic. Consider data consistency for pricing/inventory and personalization for user sessions.");
        setIsAiLoading(false);
      }, 1200);
    } catch (error) {
      setAiScenarioProblem("Error generating AI scenario: " + error.message);
      setIsAiLoading(false);
    }
  };

  const handleGetAiFeedback = async () => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
      alert("⚠️ Gemini API Key not set!");
      setAiScenarioFeedback("AI feedback is disabled. Please configure the Gemini API key.");
      return;
    }
    if (!aiScenarioSolution.trim()) {
      alert("Please enter your solution before getting feedback.");
      return;
    }
    setIsAiLoading(true);
    setAiScenarioFeedback("Getting feedback...");
    try {
      // const response = await callGeminiAPI(`Problem: ${aiScenarioProblem}\nSolution: ${aiScenarioSolution}\nProvide feedback:`);
      // setAiScenarioFeedback(response.text()); // Simplified
      // Mock response:
      setTimeout(() => {
        setAiScenarioFeedback("Your approach to use a distributed cache for product data is solid. For user sessions, consider edge caching or a replicated in-memory cache for faster access. Ensure your TTL strategy for flash sale pricing is aggressive and that inventory updates correctly invalidate/update the cache to prevent stale data. Good use of read-through for catalog misses.");
        setIsAiLoading(false);
      }, 1500);
    } catch (error) {
      setAiScenarioFeedback("Error getting AI feedback: " + error.message);
      setIsAiLoading(false);
    }
  };

  // --- Placeholder View Components (to be replaced by imports) ---
  const PlaceholderView = ({ title, appData }) => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-4">{title}</h1>
        <Card>
            <p className="text-neutral-700 dark:text-neutral-300">
                Content for {title.toLowerCase()} coming soon. This view will be populated by importing its respective component
                (e.g., <code className="bg-neutral-200 dark:bg-neutral-700 p-1 rounded text-sm">{title.replace(' & ','')}View.jsx</code>).
            </p>
            {title === 'Fundamentals' && appData.metrics && <p className="mt-2">Loaded {appData.metrics.length} metric(s).</p>}
        </Card>
    </div>
  );

  // const PatternsView = ({ appData }) => <PlaceholderView title="Patterns & Policies" appData={appData} />; Removed placeholder
  // const ScenariosView = ({ appData, onGenerateAIScenario }) => ( ... ); Removed placeholder
  // const PracticeView = ({ appData }) => <PlaceholderView title="Practice Tools" appData={appData} />; Removed placeholder
  // const CodeLibraryView = ({ appData }) => <PlaceholderView title="Code Library" appData={appData} />; Removed placeholder

  // --- End Placeholder Components (SidebarCaches was here) ---

  const renderView = () => {
    // Use the imported cachesAppData
    const dataToPass = cachesAppData;
    switch (currentView) {
      case 'fundamentals': return <FundamentalsView appData={dataToPass} />;
      case 'cachepedia': return <CachepediaView appData={dataToPass} />;
      case 'patterns': return <PatternsView appData={dataToPass} />;
      case 'scenarios': return <ScenariosView appData={dataToPass} onGenerateAIScenario={handleGenerateAiScenario} />;
      case 'practice': return <PracticeView appData={dataToPass} />;
      case 'code': return <CodeLibraryView appData={dataToPass} />;
      default: return <FundamentalsView appData={dataToPass} />;
    }
  };

  return (
    <div className="flex flex-1"> {/* flex-1 to take available space in parent Layout */}
      <SidebarCaches currentView={currentView} onNavClick={handleNavClick} />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-neutral-50 dark:bg-neutral-900">
        {renderView()}
      </main>

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="AI-Powered Scenario Practice" size="2xl">
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Generated Problem:</h3>
                <Card className="bg-neutral-100 dark:bg-neutral-700 p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap">{aiScenarioProblem || "Loading problem..."}</p>
                </Card>
            </div>
            <div>
                <label htmlFor="aiSolutionTextarea" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Your Proposed Solution:</label>
                <textarea
                    id="aiSolutionTextarea"
                    value={aiScenarioSolution}
                    onChange={(e) => setAiScenarioSolution(e.target.value)}
                    placeholder="Describe your caching strategy, components, patterns, and justifications here..."
                    rows="6"
                    className="w-full p-2 text-sm sm:text-base border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary"
                    disabled={isAiLoading && aiScenarioFeedback}
                />
            </div>
            <Button onClick={handleGetAiFeedback} disabled={isAiLoading || !aiScenarioProblem || aiScenarioProblem.startsWith("AI features are disabled") || aiScenarioProblem.startsWith("Error generating AI scenario")}>
                {isAiLoading && !aiScenarioFeedback ? 'Getting feedback...' : 'Get AI Feedback'}
            </Button>
            {aiScenarioFeedback && (
                 <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">AI Feedback:</h3>
                    <Card className="bg-neutral-100 dark:bg-neutral-700 p-3 sm:p-4">
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap">{aiScenarioFeedback}</p>
                    </Card>
                </div>
            )}
        </div>
      </Modal>
    </div>
  );
};
export default CachesPage;
