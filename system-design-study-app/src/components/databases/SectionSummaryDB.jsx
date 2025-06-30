// src/components/databases/SectionSummaryDB.jsx
import React from 'react';
import Card from '../common/Card';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const SectionSummaryDB = ({ appData }) => {
  const summaryInfo = appData?.databaseComparisonSummary;

  if (!summaryInfo || !summaryInfo.categories || summaryInfo.categories.length === 0) {
    return (
      <Card id="db-summary-comparison" padding="p-6 md:p-8" shadow="shadow-xl">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Database Comparison Summary
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">Summary data not available.</p>
      </Card>
    );
  }

  return (
    <Card id="db-summary-comparison" padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
        <RenderTextWithLinks text={summaryInfo.title || "Database Comparison Summary"} glossaryData={glossaryData} />
      </h1>
      {summaryInfo.introduction && (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          <p className="leading-relaxed">
            <RenderTextWithLinks text={summaryInfo.introduction} glossaryData={glossaryData} />
          </p>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-100 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Category</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Examples</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Data Model</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Consistency (Typical)</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Scalability (Horizontal)</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Pros</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">Cons</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200">When to Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
            {summaryInfo.categories.map((cat) => (
              <tr key={cat.name} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-3 py-4 whitespace-normal text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    <RenderTextWithLinks text={cat.name} glossaryData={glossaryData} />
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                    <RenderTextWithLinks text={cat.examples} glossaryData={glossaryData} />
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                    <RenderTextWithLinks text={cat.dataModel} glossaryData={glossaryData} />
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                    <RenderTextWithLinks text={cat.consistency} glossaryData={glossaryData} />
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                    <RenderTextWithLinks text={cat.scalability} glossaryData={glossaryData} />
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                  <ul className="list-disc list-inside pl-2">
                    {cat.pros?.map((pro, i) => <li key={i}><RenderTextWithLinks text={pro} glossaryData={glossaryData} /></li>)}
                  </ul>
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                  <ul className="list-disc list-inside pl-2">
                    {cat.cons?.map((con, i) => <li key={i}><RenderTextWithLinks text={con} glossaryData={glossaryData} /></li>)}
                  </ul>
                </td>
                <td className="px-3 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-300">
                    <RenderTextWithLinks text={cat.whenToUse} glossaryData={glossaryData} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default SectionSummaryDB;
