// src/components/caches/PracticeView.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import InteractiveDecisionTree from '../common/InteractiveDecisionTree';
import QuizView from '../common/QuizView';
import ComparisonView from '../common/ComparisonView'; // Import the new ComparisonView component

// --- Flashcard Component (Simplified) ---
const Flashcard = ({ card, isFlipped, onFlip }) => {
  return (
    <div
      className={`w-full h-64 p-4 rounded-lg shadow-xl cursor-pointer flex items-center justify-center text-center transition-transform duration-500 transform ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      onClick={onFlip}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front of the card */}
      <div className={`absolute w-full h-full flex items-center justify-center p-6 rounded-lg bg-primary-light dark:bg-primary text-neutral-900 dark:text-white shadow-lg ${isFlipped ? 'opacity-0 [transform:rotateY(180deg)]' : ''}`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        <p className="text-xl md:text-2xl font-semibold">{card.front}</p>
      </div>
      {/* Back of the card */}
      <div className={`absolute w-full h-full flex items-center justify-center p-6 rounded-lg bg-secondary-light dark:bg-secondary text-neutral-900 dark:text-white shadow-lg ${isFlipped ? '' : 'opacity-0 [transform:rotateY(-180deg)]' }`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        <p className="text-base md:text-lg leading-relaxed">{card.back}</p>
      </div>
    </div>
  );
};

const Flashcards = ({ flashcardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcardsData || flashcardsData.length === 0) {
    return <p className="text-sm text-neutral-500 dark:text-neutral-400">No flashcards available.</p>;
  }

  const handleNext = () => {
    setIsFlipped(false); // Show front of next card
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  const handlePrev = () => {
    setIsFlipped(false); // Show front of prev card
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
  };

  return (
    <div className="max-w-md mx-auto">
      <Flashcard card={flashcardsData[currentIndex]} isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)} />
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev} variant="outline">Previous</Button>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 self-center">
          Card {currentIndex + 1} of {flashcardsData.length}
        </p>
        <Button onClick={handleNext} variant="outline">Next</Button>
      </div>
    </div>
  );
};


// --- Main PracticeView Component ---
const PracticeView = ({ appData }) => {
  if (!appData) {
    return <p className="p-4 text-neutral-600 dark:text-neutral-400">Loading practice tools data...</p>;
  }

  return (
    <div className="p-1 md:p-4 space-y-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Practice Tools
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Solidify your understanding of caching with these interactive tools. Test your decision-making for strategy selection and refresh your knowledge of key terms.
        </p>
      </div>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Decision Tree Helper</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          Not sure which caching strategy fits your needs? Answer a series of questions to navigate through common decision points and arrive at a potential recommendation.
        </p>
        {appData.decisionTree ? (
          <InteractiveDecisionTree treeData={appData.decisionTree} />
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Decision tree data not available for this topic.</p>
        )}
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Flashcards</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          Test your recall of important caching terminology and concepts. Click a card to reveal the answer. Use the buttons to navigate through the set.
        </p>
        <Flashcards flashcardsData={appData.flashcards} />
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Knowledge Quiz</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          Test your understanding of key caching concepts with this short quiz.
        </p>
        {appData.quizData && appData.quizData.questions && appData.quizData.questions.length > 0 ? (
          <QuizView quizTitle={appData.quizData.title} questions={appData.quizData.questions} />
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Quiz data not available for this topic.</p>
        )}
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Technology Comparisons</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          Understand the trade-offs between popular caching technologies.
        </p>
        {appData.comparisonData && appData.comparisonData['redis-vs-memcached'] ? (
          <ComparisonView
            comparisonTitle={appData.comparisonData['redis-vs-memcached'].title}
            item1Name={appData.comparisonData['redis-vs-memcached'].item1Name}
            item2Name={appData.comparisonData['redis-vs-memcached'].item2Name}
            featuresData={appData.comparisonData['redis-vs-memcached'].features}
            summaryText={appData.comparisonData['redis-vs-memcached'].summary}
          />
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Comparison data not available for this topic.</p>
        )}
      </Card>

       {/* Reminder about typography plugin */}
      {/* <Card><p className="text-xs text-warning">Note: For optimal text rendering, the @tailwindcss/typography plugin should be installed and configured.</p></Card> */}
    </div>
  );
};

export default PracticeView;
