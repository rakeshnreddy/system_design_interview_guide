import React, { useState, useEffect } from 'react';

function QuizView({ quizTitle, questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionId }
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanationFor, setShowExplanationFor] = useState(null); // Stores questionId
  const [selectedOption, setSelectedOption] = useState(null); // Stores selected option id for current question

  // Reset state if questions prop changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setShowResults(false);
    setShowExplanationFor(null);
    setSelectedOption(null);
  }, [questions]);

  if (!questions || questions.length === 0) {
    return <p className="text-red-500">No quiz questions available.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId) => {
    if (showExplanationFor === currentQuestion.id) return; // Don't allow change after answer submitted for current q
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return; // Require an option to be selected

    const isCorrect = selectedOption === currentQuestion.correctOptionId;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOption
    }));
    setShowExplanationFor(currentQuestion.id);
  };

  const handleNextQuestion = () => {
    setShowExplanationFor(null);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setShowResults(false);
    setShowExplanationFor(null);
    setSelectedOption(null);
  };

  if (showResults) {
    return (
      <div className="p-4 md:p-6 bg-white dark:bg-neutral-800 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-light">{quizTitle} - Results</h2>
        <p className="text-xl mb-4">You got {score} out of {questions.length} correct!</p>
        <ul className="space-y-4">
          {questions.map((q) => {
            const userAnswerId = userAnswers[q.id];
            const userAnswerText = q.options.find(opt => opt.id === userAnswerId)?.text;
            const correctAnswerText = q.options.find(opt => opt.id === q.correctOptionId)?.text;
            const isUserCorrect = userAnswerId === q.correctOptionId;

            return (
              <li key={q.id} className={`p-3 rounded-md ${isUserCorrect ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                <p className="font-semibold text-neutral-800 dark:text-neutral-100">{q.text}</p>
                <p className={`text-sm ${isUserCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  Your answer: {userAnswerText || "Not answered"}
                </p>
                {!isUserCorrect && (
                  <p className="text-sm text-blue-600 dark:text-blue-400">Correct answer: {correctAnswerText}</p>
                )}
                <p className="text-xs mt-1 text-neutral-600 dark:text-neutral-400"><em>Explanation: {q.explanation}</em></p>
              </li>
            );
          })}
        </ul>
        <button
          onClick={handleRetakeQuiz}
          className="mt-6 px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors duration-150"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-neutral-800 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-primary dark:text-primary-light">{quizTitle}</h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-3">{currentQuestion.text}</h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            let buttonClass = "w-full text-left px-4 py-3 rounded-lg shadow transition-colors duration-150 focus:outline-none ";
            if (showExplanationFor === currentQuestion.id) { // Answer submitted
              if (option.id === currentQuestion.correctOptionId) {
                buttonClass += "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 ring-2 ring-green-500";
              } else if (isSelected) {
                buttonClass += "bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-100 ring-2 ring-red-500";
              } else {
                buttonClass += "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-not-allowed";
              }
            } else { // Answer not yet submitted
              buttonClass += isSelected
                ? "bg-primary-light/30 dark:bg-primary/40 ring-2 ring-primary text-neutral-800 dark:text-neutral-100"
                : "bg-neutral-100 dark:bg-neutral-700 hover:bg-primary-light/20 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showExplanationFor === currentQuestion.id}
                className={buttonClass}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      {showExplanationFor === currentQuestion.id && (
        <div className="mt-4 p-3 rounded-md bg-blue-50 dark:bg-neutral-700 border border-blue-200 dark:border-neutral-600">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300">Explanation:</h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="mt-6">
        {showExplanationFor !== currentQuestion.id ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors duration-150 disabled:opacity-50"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-lg shadow-md transition-colors duration-150"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizView;
