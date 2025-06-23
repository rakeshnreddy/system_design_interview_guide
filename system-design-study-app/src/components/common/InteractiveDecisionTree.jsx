import React, { useState, useEffect } from 'react';
import Button from './Button'; // Import the common Button component

/**
 * Renders an interactive decision tree based on provided data.
 * Users can click through options to reach a recommendation.
 * @param {object} props - The component props.
 * @param {object} props.treeData - The data structure for the decision tree.
 * @param {string} [props.treeData.title="Decision Tree"] - The title of the decision tree.
 * @param {string} props.treeData.startNode - The key of the starting node in `treeData.nodes`.
 * @param {object} props.treeData.nodes - An object where each key is a node ID.
 * @param {string} props.treeData.nodes[nodeId].question - The question for the current node.
 * @param {string} [props.treeData.nodes[nodeId].description] - Optional description for the question.
 * @param {Array<object>} props.treeData.nodes[nodeId].options - Array of options for the current node.
 * @param {string} props.treeData.nodes[nodeId].options[].answer - The text for the option button.
 * @param {string} [props.treeData.nodes[nodeId].options[].description] - Optional description for the option.
 * @param {string} [props.treeData.nodes[nodeId].options[].nextNode] - The key of the next node if this option is chosen.
 * @param {string} [props.treeData.nodes[nodeId].options[].recommendation] - The recommendation text if this option leads to a final answer.
 */
function InteractiveDecisionTree({ treeData }) {
  if (!treeData || !treeData.nodes || !treeData.startNode) {
    return <p className="text-red-500 p-4">Error: Decision tree data is invalid or missing.</p>;
  }

  const [currentNodeKey, setCurrentNodeKey] = useState(treeData.startNode);
  const [pathTaken, setPathTaken] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    setCurrentNodeKey(treeData.startNode);
    setPathTaken([]);
    setRecommendation(null);
  }, [treeData]);

  const handleOptionClick = (option) => {
    const currentNode = treeData.nodes[currentNodeKey];
    const newPathEntry = { question: currentNode.question, answer: option.answer };
    setPathTaken([...pathTaken, newPathEntry]);

    if (option.nextNode) {
      setCurrentNodeKey(option.nextNode);
      setRecommendation(null);
    } else if (option.recommendation) {
      setRecommendation(option.recommendation);
    }
  };

  const handleStartOver = () => {
    setCurrentNodeKey(treeData.startNode);
    setPathTaken([]);
    setRecommendation(null);
  };

  const currentNode = treeData.nodes[currentNodeKey];

  if (!currentNode) {
     return <p className="text-red-500">Error: Current node '{currentNodeKey}' not found in tree data.</p>;
  }

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-neutral-800 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-light">{treeData.title || "Decision Tree"}</h2>

      {recommendation ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">Recommendation</h3>
            <p className="text-neutral-700 dark:text-neutral-300 bg-green-50 dark:bg-neutral-700 p-3 rounded-md">{recommendation}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Path Taken:</h4>
            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-neutral-600 dark:text-neutral-400">
              {pathTaken.map((step, index) => (
                <li key={index}>
                  <strong>Q:</strong> {step.question} <br />
                  <span className="ml-4"><strong>A:</strong> {step.answer}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={handleStartOver}
            variant="primary"
            className="mt-6" // Removed size-specific padding as Button handles it
          >
            Start Over
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-neutral-800 dark:text-neutral-100">{currentNode.question}</h3>
            {currentNode.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{currentNode.description}</p>
            )}
          </div>
          <div className="space-y-3">
            {currentNode.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClick(option)}
                variant="outline" // Using outline variant for options, can be adjusted
                className="w-full text-left justify-start" // Ensure text is aligned left and button takes full width
              >
                <p className="font-medium">{option.answer}</p> {/* Removed dark/light specific text colors as Button handles variant */}
                {option.description && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{option.description}</p>}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveDecisionTree;
