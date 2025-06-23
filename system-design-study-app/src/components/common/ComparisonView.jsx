import React from 'react';

/**
 * Displays a comparison table for two items across multiple features.
 * @param {object} props - The component props.
 * @param {string} [props.comparisonTitle="Technology Comparison"] - The main title for the comparison.
 * @param {string} [props.item1Name="Item 1"] - The name of the first item being compared.
 * @param {string} [props.item2Name="Item 2"] - The name of the second item being compared.
 * @param {Array<object>} props.featuresData - Array of feature objects to compare.
 * @param {string} props.featuresData[].featureName - The name of the feature.
 * @param {string} props.featuresData[].item1Detail - Detail for the first item for this feature.
 * @param {string} props.featuresData[].item2Detail - Detail for the second item for this feature.
 * @param {string} [props.summaryText] - Optional summary text to display below the table.
 */
function ComparisonView({ comparisonTitle, item1Name, item2Name, featuresData, summaryText }) {
  if (!featuresData || featuresData.length === 0) {
    return <p className="text-red-500 p-4">No comparison data available.</p>; // Added padding for consistency
  }

  return (
    <Card padding="p-4 md:p-6" shadow="xl" rounded="lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary dark:text-primary-light text-center">
        {comparisonTitle || "Technology Comparison"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-50 dark:bg-neutral-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-1/4">
                Feature
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-3/8">
                {item1Name || "Item 1"}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider w-3/8">
                {item2Name || "Item 2"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
            {featuresData.map((feature, index) => (
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

      {summaryText && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">Summary</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">{summaryText}</p>
        </div>
      )}
    </div>
  );
}

export default ComparisonView;
