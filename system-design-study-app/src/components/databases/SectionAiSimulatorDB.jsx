// src/components/databases/SectionAiSimulatorDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
// Note: Actual Gemini API call logic would be more complex and ideally in a service hook.

const SectionAiSimulatorDB = ({ geminiKey, isAiLoading, setIsAiLoading, aiProblem, setAiProblem }) => {
    const [selectedCategory, setSelectedCategory] = useState('General NoSQL');
    const [customUserInput, setCustomUserInput] = useState('');

    const categories = [
        "General NoSQL Concepts",
        "CAP Theorem Trade-offs",
        "Data Modeling for Key-Value",
        "Data Modeling for Document",
        "Data Modeling for Wide-Column",
        "Data Modeling for Graph",
        "Choosing SQL vs. NoSQL",
        "Scaling Strategies for Databases",
        "Consistency Patterns",
        "Specific Use Case (e.g., E-commerce Product Catalog)",
        "Specific Use Case (e.g., Social Media Feed)",
        "Specific Use Case (e.g., IoT Data Ingestion)"
    ];

    const handleGenerateScenario = async () => {
        if (!geminiKey || geminiKey === "YOUR_GEMINI_API_KEY") {
            alert("Gemini API Key not provided in DatabasesPage.jsx. Please configure it to use this feature.");
            setAiProblem("AI feature disabled. API Key needed in DatabasesPage.jsx. \n\nExample Problem: Design a database solution for a rapidly growing social media platform's user profile service. Profiles contain varied attributes, and read performance for profiles is critical. What database type(s) would you choose and why? Discuss data modeling and scaling.");
            return;
        }

        setIsAiLoading(true);
        let prompt = `Generate a system design interview problem focused on database selection and design. The category is "${selectedCategory}".`;
        if (customUserInput.trim()) {
            prompt += ` Specific focus or constraints: "${customUserInput.trim()}".`;
        }
        prompt += ` The problem should require the interviewee to choose appropriate database types, justify their choices, and discuss basic data modeling or scaling considerations. Make it a concise problem statement suitable for an interview.`;

        setAiProblem(`Generating scenario for ${selectedCategory}... ${customUserInput ? 'With custom focus: ' + customUserInput : ''}`);

        try {
            // This is where you would call the actual Gemini API
            // For example:
            // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            // });
            // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            // const data = await response.json();
            // const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            // setAiProblem(generatedText || "Could not retrieve a problem. Please try again.");

            // Mock API call for now
            setTimeout(() => {
                let mockProblem = `Problem for category: "${selectedCategory}". `;
                if (customUserInput.trim()) {
                    mockProblem += `Taking into account your focus on: "${customUserInput.trim()}". `;
                }
                mockProblem += `A company is launching a new online learning platform. They expect millions of users. Key features include user accounts, course enrollment, video progress tracking, and discussion forums. Design the database architecture. What types of databases would you use for different parts of this system and why? Discuss potential data models and how you'd handle scaling for user load and new course content.`;
                setAiProblem(mockProblem);
                setIsAiLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Error generating AI scenario:", error);
            setAiProblem(`Error: ${error.message}. Check API key and network.`);
            setIsAiLoading(false);
        }
    };

    return (
        <Card padding="p-6 md:p-8" shadow="shadow-xl">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">✨ AI Interview Simulator</h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                Generate a unique system design problem focused on database selection and justification. Choose a category or add custom details for the AI to consider.
            </p>

            <div className="bg-neutral-100 dark:bg-neutral-800/70 p-4 sm:p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="category-selector" className="block text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Problem Category:</label>
                        <select
                            id="category-selector"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md p-2.5 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-primary focus:border-primary shadow-sm text-base"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="custom-input" className="block text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Optional: Custom Focus/Constraints:</label>
                        <input
                            type="text"
                            id="custom-input"
                            value={customUserInput}
                            onChange={(e) => setCustomUserInput(e.target.value)}
                            placeholder="e.g., focus on high availability, cost optimization"
                            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md p-2.5 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 focus:ring-primary focus:border-primary shadow-sm text-base"
                        />
                    </div>
                </div>

                <Button onClick={handleGenerateScenario} disabled={isAiLoading} variant="primary" size="lg" className="w-full md:w-auto">
                    {isAiLoading ? '🧠 Generating Problem...' : 'Generate AI Problem'}
                </Button>

                <div id="scenario-output" className="mt-6 p-4 bg-white dark:bg-neutral-700 rounded-md border border-neutral-300 dark:border-neutral-600 min-h-[150px] shadow-inner">
                    <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Generated Problem:</h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                        {aiProblem || "Your generated practice problem will appear here. Click 'Generate AI Problem' to start."}
                    </p>
                    {(!geminiKey || geminiKey === "YOUR_GEMINI_API_KEY") && !aiProblem.startsWith("AI feature disabled") && (
                        <p className="text-xs text-warning dark:text-yellow-400 mt-3">
                            (Mock response shown as API key is not set in DatabasesPage.jsx)
                        </p>
                    )}
                </div>
            </div>
            <div className="prose prose-base dark:prose-invert max-w-none mt-6 text-neutral-600 dark:text-neutral-400"> {/* Increased prose base size */}
                <p><strong>How to use:</strong> Select a category, add any specific keywords or constraints for the problem you want the AI to generate, then click "Generate AI Problem". Use the generated problem to practice your database design thinking. Consider aspects like CAP theorem, data modeling, scaling, consistency, and which database types fit the requirements.</p>
            </div>
        </Card>
    );
};
export default SectionAiSimulatorDB;
