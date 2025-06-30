import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const FrameworksModuleMQ = ({ appData }) => {
  const frameworks = appData?.brokerpedia || [];

  if (frameworks.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="prose max-w-none dark:prose-invert">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
            Messaging Frameworks &amp; Tools Comparison
          </h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">Broker data is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center md:text-left">
          Messaging Frameworks &amp; Tools Comparison
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
          Choosing the right messaging framework is a critical decision in system design. This section provides a comparative overview of popular technologies, highlighting their strengths, weaknesses, and ideal use cases to help you make informed choices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {frameworks.map(fw => {
          const cardId = `mq-${fw.id}`;
          // Ensure useCases is an array for consistent mapping; if it's a string, wrap it.
          const useCasesList = Array.isArray(fw.useCases) ? fw.useCases : (fw.useCases ? [fw.useCases] : []);

          return (
            <Card key={fw.id} id={cardId} className="flex flex-col h-full hover:shadow-2xl transition-shadow duration-300" padding="p-0">
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-t-lg">
                <h2 className="text-2xl font-bold text-secondary dark:text-secondary-light">
                  <RenderTextWithLinks text={fw.name || fw.title} glossaryData={glossaryData} />
                </h2>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 flex-grow">
                  <RenderTextWithLinks text={fw.description} glossaryData={glossaryData} />
                </p>

                {fw.pros && fw.pros.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Pros:</h3>
                    <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                      {fw.pros.map((pro, i) => <li key={i}><RenderTextWithLinks text={pro} glossaryData={glossaryData} /></li>)}
                    </ul>
                  </div>
                )}

                {fw.cons && fw.cons.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Cons:</h3>
                    <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                      {fw.cons.map((con, i) => <li key={i}><RenderTextWithLinks text={con} glossaryData={glossaryData} /></li>)}
                    </ul>
                  </div>
                )}

                {useCasesList.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Common Use Cases:</h3>
                    <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                      {useCasesList.map((uc, i) => <li key={i}><RenderTextWithLinks text={uc} glossaryData={glossaryData} /></li>)}
                    </ul>
                  </div>
                )}

                {fw.realWorldExamples && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Real-World Examples:</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <RenderTextWithLinks text={fw.realWorldExamples} glossaryData={glossaryData} />
                    </p>
                  </div>
                )}

                {fw.website && ( // Assuming appData might provide a 'website' field
                  <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <a href={fw.website} target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                      <Button variant="outline" size="md" className="w-full">
                        Visit Website
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FrameworksModuleMQ;
