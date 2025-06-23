import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Button, // MUI Button will be replaced
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button'; // Import common Button

/**
 * A modal dialog for AI-powered scenario practice.
 * Allows users to generate a problem, submit a solution, and receive feedback.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {string} props.topicTitle - The title of the topic, used for customizing dialog text.
 * @param {Function} props.onSubmitToBackend - Async function that takes (problem, solution) and returns feedback.
 * @param {string} [props.initialProblem] - An optional initial problem to display.
 */
function AiScenarioModal({
  isOpen,
  onClose,
  topicTitle,
  onSubmitToBackend,
  initialProblem = ''
}) {
  const [generatedProblem, setGeneratedProblem] = useState(initialProblem);
  const [userSolution, setUserSolution] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens, but keep initialProblem if provided
      setGeneratedProblem(initialProblem || '');
      setUserSolution('');
      setFeedback('');
    }
  }, [isOpen, initialProblem]);

  useEffect(() => {
    // If an initial problem is provided when the component mounts / props update
    if (initialProblem && !generatedProblem) {
        setGeneratedProblem(initialProblem);
    }
  }, [initialProblem, generatedProblem]);


  const handleGenerateProblem = async () => {
    setIsLoadingProblem(true);
    setGeneratedProblem('');
    setUserSolution('');
    setFeedback('');
    // Mock problem generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setGeneratedProblem(
      `Design a ${topicTitle.toLowerCase()} solution for a high-traffic e-commerce website that needs to handle peak loads during flash sales. Consider aspects like data consistency, latency, and fault tolerance. What are the key components and trade-offs?`
    );
    setIsLoadingProblem(false);
  };

  const handleGetFeedback = async () => {
    if (!userSolution.trim()) {
      setFeedback("Please provide your solution before requesting feedback.");
      return;
    }
    setIsLoadingFeedback(true);
    setFeedback('');
    try {
      const result = await onSubmitToBackend(generatedProblem, userSolution);
      setFeedback(result);
    } catch (error) {
      console.error("Error getting feedback:", error);
      setFeedback("Sorry, an error occurred while fetching feedback.");
    }
    setIsLoadingFeedback(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        AI Scenario Practice: {topicTitle}
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Button // Common Button
            variant="outline"
            onClick={handleGenerateProblem}
            disabled={isLoadingProblem || isLoadingFeedback}
            className="w-full" // fullWidth equivalent
            leftIcon={isLoadingProblem ? <CircularProgress size={20} /> : null} // Adjusted size for icon
          >
            Generate New Problem
          </Button>
        </Box>

        {isLoadingProblem && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {generatedProblem && (
          <Box sx={{ my: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, backgroundColor: 'action.hover' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>Generated Problem:</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{generatedProblem}</Typography>
          </Box>
        )}

        <TextField
          label={`Your Solution for ${topicTitle} Scenario`}
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          placeholder="Describe your approach, components, trade-offs, etc."
          disabled={isLoadingProblem || isLoadingFeedback || !generatedProblem}
          sx={{ my: 2 }}
        />

        {isLoadingFeedback && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {feedback && (
          <Box sx={{ my: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, backgroundColor: feedback.startsWith("Sorry") ? 'error.light' : 'success.light' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>AI Feedback:</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{feedback}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        {/* Using common Button. MUI's "inherit" color for Button often means it takes on the text color of its parent.
            Our 'outline' variant with some custom styling might achieve a similar neutral look,
            or a new 'text' or 'ghost' variant could be added to common/Button.jsx if needed.
            For now, using 'outline' and potentially adding classes for a more subtle look.
        */}
        <Button
          onClick={onClose}
          variant="outline" // Closest to a neutral/text button
          className="text-neutral-700 dark:text-neutral-200 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600" // Attempt to mimic "color='inherit'"
        >
          Cancel
        </Button>
        <Button // Common Button
          onClick={handleGetFeedback}
          variant="primary" // 'primary' is similar to MUI's 'contained'
          disabled={isLoadingProblem || isLoadingFeedback || !userSolution.trim() || !generatedProblem}
          leftIcon={isLoadingFeedback ? <CircularProgress size={20} color="inherit"/> : null}  // color="inherit" might not work directly, Button handles icon color via text color
        >
          Get Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AiScenarioModal;
