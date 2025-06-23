import React, { useState, useEffect } from 'react';
import Button from './Button'; // Import the common Button component

/**
 * Renders an interactive quiz component.
 * @param {object} props - The component props.
 * @param {string} props.quizTitle - The title of the quiz.
 * @param {Array<object>} props.questions - An array of question objects.
 * @param {string} props.questions[].id - Unique ID for the question.
 * @param {string} props.questions[].text - The question text.
 * @param {Array<object>} props.questions[].options - Array of option objects for the question.
 * @param {string} props.questions[].options[].id - Unique ID for the option.
 * @param {string} props.questions[].options[].text - Text for the option.
 * @param {string} props.questions[].correctOptionId - The ID of the correct option.
 * @param {string} props.questions[].explanation - Explanation shown after answering.
 */
function QuizView({ quizTitle, questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionId }
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanationFor, setShowExplanationFor] = useState(null); // Stores questionId
  const [selectedOption, setSelectedOption] = useState(null); // Stores selected option id for current question

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
    if (showExplanationFor === currentQuestion.id) return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

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
      <Card padding="p-4 md:p-6" shadow="xl" rounded="lg">
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
        <Button
          onClick={handleRetakeQuiz}
          variant="primary"
          className="mt-6"
        >
          Retake Quiz
        </Button>
      </div>
    );
  }

  return (
    <Card padding="p-4 md:p-6" shadow="xl" rounded="lg">
      <h2 className="text-2xl font-bold mb-2 text-primary dark:text-primary-light">{quizTitle}</h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-3">{currentQuestion.text}</h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            let optionButtonVariant = "outline"; // Default variant
            let optionButtonClassName = "w-full text-left justify-start ";

            if (showExplanationFor === currentQuestion.id) { // Answer submitted
              if (option.id === currentQuestion.correctOptionId) {
                optionButtonClassName += "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 ring-2 ring-green-500 hover:bg-green-300 dark:hover:bg-green-600";
              } else if (isSelected) {
                optionButtonClassName += "bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-100 ring-2 ring-red-500 hover:bg-red-300 dark:hover:bg-red-600";
              } else {
                optionButtonClassName += "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-not-allowed";
              }
            } else { // Answer not yet submitted
              optionButtonClassName += isSelected
                ? "bg-primary-light/30 dark:bg-primary/40 ring-2 ring-primary text-neutral-800 dark:text-neutral-100" // Custom style for selected, non-submitted
                : "hover:bg-primary-light/20 dark:hover:bg-neutral-600"; // Standard hover for non-selected
            }
            // Note: The common Button's own variant styles (bg, text color) will apply.
            // The className here is for overriding or adding specific states not covered by variants.

            return (
              <Button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showExplanationFor === currentQuestion.id && option.id !== currentQuestion.correctOptionId && !isSelected}
                variant={optionButtonVariant}
                className={optionButtonClassName}
              >
                {option.text}
              </Button>
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
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            variant="primary"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            variant="secondary"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default QuizView;
