// src/components/caches/ScenariosView.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const ScenariosView = ({ appData, onGenerateAIScenario }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  if (!appData || !appData.scenarios) {
    return <p className="p-4 text-neutral-600 dark:text-neutral-400">Loading scenarios data...</p>;
  }

  const scenarioKeys = Object.keys(appData.scenarios);

  const handleSelectScenario = (key) => {
    setSelectedScenario(appData.scenarios[key]);
  };

  return (
    <div className="p-1 md:p-4 space-y-8"> {/* Increased spacing */}
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Caching Case Studies &amp; AI Scenarios
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Apply your caching knowledge by exploring real-world case studies and test your design skills further with AI-generated problem scenarios. This section helps bridge theory and practice.
        </p>
      </div>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Explore Case Studies</h2>
        {scenarioKeys.length > 0 ? (
          <div className="mb-6">
            <label htmlFor="caseStudySelect" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Select a Case Study:</label>
            <select
              id="caseStudySelect"
              onChange={(e) => e.target.value ? handleSelectScenario(e.target.value) : setSelectedScenario(null)}
              value={selectedScenario ? Object.keys(appData.scenarios).find(key => appData.scenarios[key] === selectedScenario) : ""}
              className="w-full max-w-md p-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary"
            >
              <option value="">-- Select a Case Study --</option>
              {scenarioKeys.map(key => (
                <option key={key} value={key}>{appData.scenarios[key].title || key}</option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400">No predefined case studies available in appData.</p>
        )}

        {selectedScenario && (
          <Card className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" padding="p-6">
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">{selectedScenario.title}</h3>
            {/* Using prose here for better text formatting if plugin is active */}
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-neutral-700 dark:text-neutral-300">
              <p className="mb-2 leading-relaxed">{selectedScenario.description}</p>
              {selectedScenario.problem && <p><strong>Problem:</strong> {selectedScenario.problem}</p>}
              {selectedScenario.solution && typeof selectedScenario.solution === 'string' && <p><strong>Approach:</strong> {selectedScenario.solution}</p>}
              {selectedScenario.solution && typeof selectedScenario.solution === 'object' && (
                <>
                  <p><strong>Approach:</strong> {selectedScenario.solution.strategy}</p>
                  {selectedScenario.solution.components && <p className="text-sm"><strong>Components:</strong> {selectedScenario.solution.components.join(', ')}</p>}
                </>
              )}
              {selectedScenario.challenges && <p className="mt-2 text-sm"><strong>Challenges:</strong> {selectedScenario.challenges}</p>}
              {selectedScenario.learnings && <p className="mt-2 text-sm"><strong>Key Learnings:</strong> {selectedScenario.learnings}</p>}
            </div>
          </Card>
        )}
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">AI-Powered Scenario Practice</h2>
        <p className="text-base text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
          Ready to test your design skills? Click the button below to generate a unique caching problem scenario using AI. You can then propose your solution within a modal and (optionally) receive feedback if you've configured your Gemini API Key in `CachesPage.jsx`.
        </p>
        <Button onClick={onGenerateAIScenario} variant="primary" size="lg">
          Generate AI Design Scenario
        </Button>
         <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            Note: Ensure your Gemini API key is set up in CachesPage.jsx for this feature to work.
            The AI generation and feedback will appear in a modal.
        </p>
      </Card>
      {/* Reminder about typography plugin */}
      {/* <Card><p className="text-xs text-warning">Note: For optimal text rendering, the @tailwindcss/typography plugin should be installed and configured.</p></Card> */}
    </div>
  );
};

export default ScenariosView;
