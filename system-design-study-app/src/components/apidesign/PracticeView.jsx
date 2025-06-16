import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function PracticeView({ appData }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Design Practice
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Practice Questions & Design Exercises
        </Typography>
        <Typography variant="body1">
          This section will feature interactive exercises, quizzes, API design challenges, and potentially OpenAPI/Swagger related tasks.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          (Content to be added. Data can be sourced from <code>apiDesignAppData.js</code> for flashcards, decision trees, or specific question data.)
        </Typography>
        {appData && appData.flashcards && appData.flashcards.length > 0 && (
          <Box sx={{mt: 3}}>
            <Typography variant="h6">Sample Flashcard Concept:</Typography>
            <Typography variant="body1"><strong>Q:</strong> {appData.flashcards[0].front}</Typography>
            <Typography variant="body1"><strong>A:</strong> {appData.flashcards[0].back}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default PracticeView;
