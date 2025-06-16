// src/components/caches/CodeLibraryView.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
// A proper syntax highlighter would be ideal here, e.g., Prism.js or react-syntax-highlighter.
// For now, using a simple pre/code block.
// To use react-syntax-highlighter:
// npm install react-syntax-highlighter
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

// Basic CodeBlock component if react-syntax-highlighter is not used/installed
const BasicCodeBlock = ({ code, language }) => (
  <pre className="bg-neutral-800 dark:bg-neutral-900 text-sm text-neutral-100 p-3 sm:p-4 rounded-md overflow-x-auto">
    <code className={`language-${language}`}>
      {code.trim()}
    </code>
  </pre>
);


const CodeLibraryView = ({ appData }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  if (!appData || !appData.codeSnippets) {
    return <p className="p-4 text-neutral-600 dark:text-neutral-400">Loading code snippets...</p>;
  }

  const languages = ['all', ...new Set(appData.codeSnippets.map(snippet => snippet.language))];

  const filteredSnippets = selectedLanguage === 'all'
    ? appData.codeSnippets
    : appData.codeSnippets.filter(snippet => snippet.language === selectedLanguage);

  return (
    <div className="p-1 md:p-4 space-y-8"> {/* Increased spacing */}
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Caching Code Library
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Illustrative code snippets demonstrating various caching implementations and patterns in different programming languages. These examples are for conceptual understanding and may require adaptation for production use.
        </p>
        <p className="text-sm text-warning dark:text-yellow-400">
          <strong>Note:</strong> For optimal syntax highlighting, the <code className="bg-neutral-200 dark:bg-neutral-700 p-0.5 rounded text-xs">react-syntax-highlighter</code> package is recommended.
          The examples below use basic preformatted text.
        </p>
      </div>

      <Card padding="p-6">
        <div className="mb-6"> {/* Increased margin */}
          <label htmlFor="languageFilter" className="block text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
            Filter by Language:
          </label>
          <select
            id="languageFilter"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full max-w-xs p-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary text-base"
          >
            {languages.map(lang => (
              <option key={lang} value={lang} className="capitalize">{lang}</option>
            ))}
          </select>
        </div>

        {filteredSnippets.length > 0 ? (
          <div className="space-y-8"> {/* Increased spacing */}
            {filteredSnippets.map((snippet, index) => (
              <Card key={index} className="shadow-lg bg-neutral-50 dark:bg-neutral-800/60" padding="p-0"> {/* Removed padding for full-width header */}
                <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-2xl font-semibold text-secondary dark:text-secondary-light capitalize">
                    {snippet.title}
                    <span className="ml-2 text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full align-middle">{snippet.language}</span>
                  </h3>
                </div>
                <div className="p-5">
                  {snippet.description && <p className="text-base text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">{snippet.description}</p>}
                  {/* Replace BasicCodeBlock with SyntaxHighlighter if installed */}
                  {/* <SyntaxHighlighter language={snippet.language} style={atomDark} showLineNumbers customStyle={{ borderRadius: '0.375rem', margin: '0' }}>
                    {snippet.code.trim()}
                  </SyntaxHighlighter> */}
                  <BasicCodeBlock code={snippet.code} language={snippet.language} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-base text-neutral-500 dark:text-neutral-400 py-4">No code snippets available for the selected language.</p>
        )}
      </Card>
      {/* Reminder about typography plugin */}
      {/* <Card><p className="text-xs text-warning">Note: For optimal text rendering, the @tailwindcss/typography plugin should be installed and configured.</p></Card> */}
    </div>
  );
};

export default CodeLibraryView;
