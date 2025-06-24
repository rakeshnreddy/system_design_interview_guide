import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InteractiveDecisionTree from './InteractiveDecisionTree';

// Mock common components
jest.mock('./Button', () => ({ children, onClick, disabled, className, ...rest }) => (
  <button data-testid="button" onClick={onClick} disabled={disabled} className={className} {...rest}>
    {children}
  </button>
));
jest.mock('./Card', () => ({ children, ...rest }) => <div data-testid="card" {...rest}>{children}</div>);


const mockTreeData = {
  title: "Test Decision Tree",
  startNode: "node1",
  nodes: {
    node1: {
      question: "Is it sunny?",
      description: "Consider the weather outside.",
      options: [
        { answer: "Yes, it is sunny", nextNode: "node2" },
        { answer: "No, it is not sunny", recommendation: "Stay indoors and read a book." },
      ],
    },
    node2: {
      question: "Is it warm?",
      options: [
        { answer: "Yes, it is warm", recommendation: "Go to the beach!" },
        { answer: "No, it is cool", recommendation: "Go for a hike." },
      ],
    },
  },
};

const invalidTreeData = {
  title: "Invalid Tree",
  // startNode: "node1", // Missing startNode
  nodes: {},
};

const treeDataWithMissingNode = {
    title: "Missing Node Tree",
    startNode: "node1",
    nodes: {
        // node1 is missing
        node2: { question: "Some question", options: []}
    }
};


describe('InteractiveDecisionTree', () => {
  test('renders error message with invalid treeData (missing startNode)', () => {
    render(<InteractiveDecisionTree treeData={invalidTreeData} />);
    expect(screen.getByText('Error: Decision tree data is invalid or missing.')).toBeInTheDocument();
  });

  test('renders error message if current node is not found', () => {
    render(<InteractiveDecisionTree treeData={treeDataWithMissingNode} />);
    expect(screen.getByText("Error: Current node 'node1' not found in tree data.")).toBeInTheDocument();
  });

  test('renders the initial question and options from startNode', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    expect(screen.getByText(mockTreeData.title)).toBeInTheDocument();
    expect(screen.getByText(mockTreeData.nodes.node1.question)).toBeInTheDocument();
    expect(screen.getByText(mockTreeData.nodes.node1.description)).toBeInTheDocument();
    mockTreeData.nodes.node1.options.forEach(opt => {
      expect(screen.getByText(opt.answer)).toBeInTheDocument();
    });
  });

  test('navigates to the next node when an option with nextNode is clicked', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    const yesSunnyButton = screen.getByText("Yes, it is sunny");
    fireEvent.click(yesSunnyButton);

    expect(screen.getByText(mockTreeData.nodes.node2.question)).toBeInTheDocument();
    mockTreeData.nodes.node2.options.forEach(opt => {
      expect(screen.getByText(opt.answer)).toBeInTheDocument();
    });
  });

  test('displays a recommendation when an option with recommendation is clicked', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    const noSunnyButton = screen.getByText("No, it is not sunny");
    fireEvent.click(noSunnyButton);

    expect(screen.getByText("Recommendation")).toBeInTheDocument();
    expect(screen.getByText(mockTreeData.nodes.node1.options[1].recommendation)).toBeInTheDocument();
    expect(screen.getByText("Path Taken:")).toBeInTheDocument();
    expect(screen.getByText("Start Over")).toBeInTheDocument();
  });

  test('displays the path taken to reach a recommendation', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    fireEvent.click(screen.getByText("Yes, it is sunny"));
    fireEvent.click(screen.getByText("No, it is cool")); // Leads to "Go for a hike."

    expect(screen.getByText("Recommendation")).toBeInTheDocument();
    expect(screen.getByText("Go for a hike.")).toBeInTheDocument();

    const pathItems = screen.getAllByRole('listitem');
    expect(pathItems).toHaveLength(2);
    expect(pathItems[0]).toHaveTextContent(`Q: ${mockTreeData.nodes.node1.question}`);
    expect(pathItems[0]).toHaveTextContent(`A: ${mockTreeData.nodes.node1.options[0].answer}`);
    expect(pathItems[1]).toHaveTextContent(`Q: ${mockTreeData.nodes.node2.question}`);
    expect(pathItems[1]).toHaveTextContent(`A: ${mockTreeData.nodes.node2.options[1].answer}`);
  });

  test('handles "Start Over" button correctly', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    fireEvent.click(screen.getByText("No, it is not sunny")); // Reach recommendation

    expect(screen.getByText("Recommendation")).toBeInTheDocument();
    const startOverButton = screen.getByText("Start Over");
    fireEvent.click(startOverButton);

    // Should be back to the initial state
    expect(screen.getByText(mockTreeData.nodes.node1.question)).toBeInTheDocument();
    expect(screen.queryByText("Recommendation")).not.toBeInTheDocument();
  });

  test('renders within a Card component', () => {
    render(<InteractiveDecisionTree treeData={mockTreeData} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
