// src/pages/TradeOffAnalysisPage.jsx
import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import ComparisonView from '../components/common/ComparisonView'; // Import the updated ComparisonView
import { comparisonData } from '../data/comparisonData'; // Import your comparison data

const TradeOffAnalysisPage = () => {
  const comparisons = Object.values(comparisonData); // Get an array of comparison objects

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }} className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <Typography variant="h3" component="h1" gutterBottom className="text-center font-bold text-primary dark:text-primary-light mb-8">
        Trade-off Analysis
      </Typography>

      <Typography variant="body1" className="text-center text-neutral-700 dark:text-neutral-300 mb-10 max-w-3xl mx-auto">
        Understanding trade-offs is crucial in system design. Different technologies and architectural choices excel in different areas.
        This page visualizes common comparisons to help analyze their strengths and weaknesses across various criteria.
      </Typography>

      {comparisons.length > 0 ? (
        <Grid container spacing={4}>
          {comparisons.map((comparison, index) => (
            <Grid item xs={12} md={6} lg={comparison.radarData ? 12 : 6} key={index}> {/* Full width if has radar, else half */}
              <Paper elevation={3} sx={{ overflow: 'hidden' }} className="dark:bg-neutral-800">
                {/* Pass the whole comparison object to ComparisonView */}
                <ComparisonView comparison={comparison} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" className="text-center text-neutral-500 dark:text-neutral-400 mt-12">
          No comparison data available to display.
        </Typography>
      )}
    </Box>
  );
};

export default TradeOffAnalysisPage;
