import React from 'react';
import Card from './Card'; // Import the Card component
import TradeoffRadar from '../TradeoffRadar'; // Import the TradeoffRadar component
import { Typography, Box } from '@mui/material'; // Import MUI components for consistency

/**
 * Displays a comparison table for two items across multiple features.
 * Can also display a radar chart if radarData is provided.
 * @param {object} props - The component props.
 * @param {string} [props.comparisonTitle="Technology Comparison"] - The main title for the comparison.
 * @param {string} [props.item1Name="Item 1"] - The name of the first item being compared (for table).
 * @param {string} [props.item2Name="Item 2"] - The name of the second item being compared (for table).
 * @param {Array<object>} [props.featuresData] - Array of feature objects to compare in a table.
 * @param {string} props.featuresData[].featureName - The name of the feature.
 * @param {string} props.featuresData[].item1Detail - Detail for the first item for this feature.
 * @param {string} props.featuresData[].item2Detail - Detail for the second item for this feature.
 * @param {Array<object>} [props.radarData] - Data for the radar chart.
 * @param {string} [props.radarDataOptionAName="Option A"] - Name for Option A in radar chart.
 * @param {string} [props.radarDataOptionBName="Option B"] - Name for Option B in radar chart.
 * @param {string} [props.summaryText] - Optional summary text to display.
 * @param {object} [props.comparison] - An object containing all comparison data, including title, description, radarData etc.
 */
function ComparisonView({
  comparisonTitle, // Kept for direct prop passing
  item1Name,
  item2Name,
  featuresData,
  summaryText,
  radarData, // Kept for direct prop passing
  radarDataOptionAName,
  radarDataOptionBName,
  comparison // New prop to pass the whole comparison object
}) {

  // Use data from comparison object if provided, otherwise fallback to individual props
  const currentTitle = comparison?.title || comparisonTitle || "Technology Comparison";
  const currentDescription = comparison?.description;
  const currentRadarData = comparison?.radarData || radarData;
  const currentFeaturesData = comparison?.featuresData || featuresData; // Assuming featuresData might be part of comparison object too
  const currentSummaryText = comparison?.summaryText || summaryText;

  // Extract option names for radar chart from the first item in radarData if available
  const optionAName = currentRadarData?.[0]?.optionAName || radarDataOptionAName || "Option A";
  const optionBName = currentRadarData?.[0]?.optionBName || radarDataOptionBName || "Option B";


  if (!currentFeaturesData && !currentRadarData) {
    return (
      <Card padding="p-4 md:p-6" shadow="xl" rounded="lg">
        <Typography variant="h5" color="error" className="text-center">No comparison data available.</Typography>
      </Card>
    );
  }

  return (
    <Card padding="p-4 md:p-6" shadow="xl" rounded="lg" className="bg-white dark:bg-neutral-800">
      <Typography variant="h4" component="h2" className="text-2xl md:text-3xl font-bold mb-2 text-primary dark:text-primary-light text-center">
        {currentTitle}
      </Typography>
      {currentDescription && (
        <Typography variant="subtitle1" className="mb-6 text-neutral-600 dark:text-neutral-300 text-center">
          {currentDescription}
        </Typography>
      )}

      {currentRadarData && currentRadarData.length > 0 && (
        <Box sx={{ mb: 4 }}>
           {/* This h3 was part of the original request, but might be redundant if chart is self-explanatory */}
           {/* <Typography variant="h6" component="h3" className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
            {currentTitle} {/* Or a more specific title for the chart if needed *}
          </Typography> */}
          <TradeoffRadar
            data={currentRadarData}
            optionAName={optionAName}
            optionBName={optionBName}
          />
        </Box>
      )}

      {currentFeaturesData && currentFeaturesData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-1/4">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-3/8">
                  {comparison?.item1Name || item1Name || "Item 1"}
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-3/8">
                  {comparison?.item2Name || item2Name || "Item 2"}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {currentFeaturesData.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-neutral-800" : "bg-neutral-50 dark:bg-neutral-700/50"}>
                  <td className="px-4 py-4 align-top">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{feature.featureName}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300 align-top whitespace-pre-wrap">
                    {feature.item1Detail}
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300 align-top whitespace-pre-wrap">
                    {feature.item2Detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentSummaryText && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h3" className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
            Summary
          </Typography>
          <Typography variant="body2" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {currentSummaryText}
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default ComparisonView;
