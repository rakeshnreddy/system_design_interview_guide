import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizView from './QuizView';
import { vi } from 'vitest';

// Mock common components
vi.mock('./Button', () => ({ children, onClick, disabled, className, ...rest }) => (
  <button data-testid="button" onClick={onClick} disabled={disabled} className={className} {...rest}>
    {children}
  </button>
));
vi.mock('./Card', () => ({ children, ...rest }) => <div data-testid="card" {...rest}>{children}</div>);

const mockQuizData = {
  quizTitle: "Test Quiz",
  questions: [
    {
      id: "q1",
      text: "What is 2 + 2?",
      options: [
        { id: "q1opt1", text: "3" },
        { id: "q1opt2", text: "4" },
        { id: "q1opt3", text: "5" },
      ],
      correctOptionId: "q1opt2",
      explanation: "2 + 2 equals 4.",
    },
    {
      id: "q2",
      text: "What is the capital of France?",
      options: [
        { id: "q2opt1", text: "Berlin" },
        { id: "q2opt2", text: "Madrid" },
        { id: "q2opt3", text: "Paris" },
      ],
      correctOptionId: "q2opt3",
      explanation: "Paris is the capital of France.",
    },
  ],
};

const emptyQuizData = {
  quizTitle: "Empty Quiz",
  questions: [],
};

describe('QuizView', () => {
  test('renders error message if no questions are provided', () => {
    render(<QuizView quizTitle="No Questions Quiz" questions={[]} />);
    expect(screen.getByText('No quiz questions available.')).toBeInTheDocument();
  });

  test('renders error message if questions prop is undefined', () => {
    render(<QuizView quizTitle="Undefined Questions Quiz" questions={undefined} />);
    expect(screen.getByText('No quiz questions available.')).toBeInTheDocument();
  });

  test('renders the first question and its options', () => {
    render(<QuizView {...mockQuizData} />);
    expect(screen.getByText(mockQuizData.quizTitle)).toBeInTheDocument();
    expect(screen.getByText(`Question 1 of ${mockQuizData.questions.length}`)).toBeInTheDocument();
    expect(screen.getByText(mockQuizData.questions[0].text)).toBeInTheDocument();
    mockQuizData.questions[0].options.forEach(opt => {
      expect(screen.getByText(opt.text)).toBeInTheDocument();
    });
    expect(screen.getByText('Submit Answer')).toBeDisabled(); // Initially disabled
  });

  test('enables Submit Answer button when an option is selected', () => {
    render(<QuizView {...mockQuizData} />);
    fireEvent.click(screen.getByText(mockQuizData.questions[0].options[0].text)); // Select first option
    expect(screen.getByText('Submit Answer')).toBeEnabled();
  });

  test('shows explanation and correct/incorrect status after submitting an answer', () => {
    render(<QuizView {...mockQuizData} />);
    const question1 = mockQuizData.questions[0];

    // Select correct answer
    fireEvent.click(screen.getByText(question1.options[1].text)); // "4"
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText('Explanation:')).toBeInTheDocument();
    expect(screen.getByText(question1.explanation)).toBeInTheDocument();
    // Correct option should be visibly correct (e.g., specific styling, not easily testable with RTL without more specific selectors/attributes)
    // Incorrect options should be visibly distinct or disabled

    // Check for "Next Question" button
    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });

  test('navigates to the next question', () => {
    render(<QuizView {...mockQuizData} />);
    fireEvent.click(screen.getByText(mockQuizData.questions[0].options[0].text));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Next Question'));

    expect(screen.getByText(`Question 2 of ${mockQuizData.questions.length}`)).toBeInTheDocument();
    expect(screen.getByText(mockQuizData.questions[1].text)).toBeInTheDocument();
  });

  test('shows results after the last question', () => {
    render(<QuizView {...mockQuizData} />);
    // Answer first question
    fireEvent.click(screen.getByText(mockQuizData.questions[0].options[1].text)); // Correct
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Next Question'));

    // Answer second question
    fireEvent.click(screen.getByText(mockQuizData.questions[1].options[2].text)); // Correct
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Show Results'));

    expect(screen.getByText(`${mockQuizData.quizTitle} - Results`)).toBeInTheDocument();
    expect(screen.getByText(`You got 2 out of ${mockQuizData.questions.length} correct!`)).toBeInTheDocument();
    expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
  });

  test('calculates score correctly', () => {
    render(<QuizView {...mockQuizData} />);
    // Q1: Correct
    fireEvent.click(screen.getByText(mockQuizData.questions[0].options[1].text));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Next Question'));

    // Q2: Incorrect
    fireEvent.click(screen.getByText(mockQuizData.questions[1].options[0].text));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Show Results'));

    expect(screen.getByText(`You got 1 out of ${mockQuizData.questions.length} correct!`)).toBeInTheDocument();
  });


  test('handles "Retake Quiz" button correctly', () => {
    render(<QuizView {...mockQuizData} />);
    // Go to results page
    fireEvent.click(screen.getByText(mockQuizData.questions[0].options[0].text));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText(mockQuizData.questions[1].options[0].text));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText('Show Results'));

    expect(screen.getByText(`${mockQuizData.quizTitle} - Results`)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retake Quiz'));

    // Should be back to the first question
    expect(screen.getByText(`Question 1 of ${mockQuizData.questions.length}`)).toBeInTheDocument();
    expect(screen.getByText(mockQuizData.questions[0].text)).toBeInTheDocument();
  });

  test('renders within a Card component', () => {
    render(<QuizView {...mockQuizData} />);
    expect(screen.getAllByTestId('card').length).toBeGreaterThan(0); // QuizView uses Card for questions and results
  });
});
