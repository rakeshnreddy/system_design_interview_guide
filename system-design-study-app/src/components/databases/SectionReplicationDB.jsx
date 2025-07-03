// src/components/databases/SectionReplicationDB.jsx
import React from 'react';
import Card from '../common/Card';
import MermaidDiagram from '../common/MermaidDiagram.jsx';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const SectionReplicationDB = ({ appData }) => {
  const { mermaidDiagrams, patterns } = appData || {};

  const replicationPatterns = patterns?.filter(p =>
    p.id === 'leader-follower' ||
    p.id === 'multi-leader' ||
    p.id === 'quorum' ||
    p.id === 'active-passive-replication' ||
    p.id === 'active-active-replication'
  ) || [];

  const getDiagramForPattern = (patternId) => {
    if (!mermaidDiagrams) return null;
    if (patternId === 'leader-follower' && mermaidDiagrams.masterSlave) return mermaidDiagrams.masterSlave;
    if (patternId === 'multi-leader' && mermaidDiagrams.masterMaster) return mermaidDiagrams.masterMaster;
    // Add more specific diagram mappings if needed for other patterns
    return null;
  };

  if (!appData || replicationPatterns.length === 0) {
    return (
      <Card padding="p-6 md:p-8" shadow="shadow-xl">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Data Replication Strategies
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">Replication data not available.</p>
      </Card>
    );
  }

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
        Data Replication Strategies
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Data replication involves copying data from a source database to one or more destination databases. It's crucial for high availability, disaster recovery, read scalability, and geographically distributing data closer to users.
        </p>

        {replicationPatterns.map(pattern => (
          <div key={pattern.id}>
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
              <RenderTextWithLinks text={pattern.title} glossaryData={glossaryData} />
            </h2>
            <p className="mb-2"><RenderTextWithLinks text={pattern.description} glossaryData={glossaryData} /></p>

            {getDiagramForPattern(pattern.id) && (
              <div className="my-4 flex justify-center p-2 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800/30">
                <MermaidDiagram diagramDefinition={getDiagramForPattern(pattern.id)} diagramId={`${pattern.id}-diagram`} />
              </div>
            )}

            {pattern.details && (
                 <p className="text-sm my-2 p-2 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 rounded">
                    <RenderTextWithLinks text={pattern.details} glossaryData={glossaryData} />
                </p>
            )}

            {pattern.pros && pattern.pros.length > 0 && (
              <>
                <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mt-3 mb-1">Pros:</h4>
                <ul className="list-disc pl-7 space-y-1 text-base">
                  {pattern.pros.map((pro, index) => (
                    <li key={index}><RenderTextWithLinks text={pro} glossaryData={glossaryData} /></li>
                  ))}
                </ul>
              </>
            )}

            {pattern.cons && pattern.cons.length > 0 && (
              <>
                <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mt-3 mb-1">Cons:</h4>
                <ul className="list-disc pl-7 space-y-1 text-base">
                  {pattern.cons.map((con, index) => (
                    <li key={index}><RenderTextWithLinks text={con} glossaryData={glossaryData} /></li>
                  ))}
                </ul>
              </>
            )}

            {pattern.whenToUse && pattern.whenToUse.length > 0 && (
                 <>
                <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mt-3 mb-1">When to Use:</h4>
                <ul className="list-disc pl-7 space-y-1 text-base">
                  {pattern.whenToUse.map((useCase, index) => (
                    <li key={index}><RenderTextWithLinks text={useCase} glossaryData={glossaryData} /></li>
                  ))}
                </ul>
              </>
            )}

            {pattern.interviewTalkingPoints && pattern.interviewTalkingPoints.length > 0 && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 dark:border-amber-400 rounded">
                    <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Interview Talking Points:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                    {pattern.interviewTalkingPoints.map((point, index) => (
                        <li key={index}><RenderTextWithLinks text={point} glossaryData={glossaryData} /></li>
                    ))}
                    </ul>
                </div>
            )}
            {pattern.defendingYourDecision && (
                 <p className="text-sm italic mt-2 p-2 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 rounded">
                    <strong>Defending Your Decision:</strong> <RenderTextWithLinks text={pattern.defendingYourDecision} glossaryData={glossaryData} />
                </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
export default SectionReplicationDB;
