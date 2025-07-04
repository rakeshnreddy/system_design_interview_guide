import React from 'react';
// import { Link as RouterLink } from 'react-router-dom'; // Will add if Router is confirmed

const GlossaryTermDetail = ({ term }) => {
  if (!term) {
    return <p>No term selected or term data is unavailable.</p>;
  }

  // Assuming 'related' terms are strings that can be used in a search query
  // This might need adjustment if 'related' refers to term IDs.
  const createRelatedLink = (relatedTerm) => {
    // If we confirm Router is in use and AppRoutes.js is available for inspection,
    // we can make this a RouterLink and potentially construct a more direct path if possible.
    return `/glossary?search=${encodeURIComponent(relatedTerm)}`;
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg max-w-2xl mx-auto"> {/* Modal content already has dark bg from Modal.jsx */}
      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-neutral-100">{term.term}</h2>
      <div className="prose dark:prose-invert max-w-none"> {/* Using prose-invert for default dark mode prose styling if available and appropriate */}
        <p className="text-gray-700 dark:text-neutral-300 mb-4">{term.definition}</p>

        {term.details && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-neutral-200">Details</h3>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">{term.details}</p>
          </>
        )}

        {term.examples && term.examples.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-neutral-200">Examples</h3>
            <ul className="list-disc list-inside pl-5 text-gray-700 dark:text-neutral-300 mb-4">
              {term.examples.map((example, index) => (
                <li key={index} className="mb-1">{example}</li>
              ))}
            </ul>
          </>
        )}

        {term.related && term.related.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-neutral-200">Related Terms</h3>
            <p className="text-gray-700 dark:text-neutral-300">
              {term.related.map((relatedTerm, index) => (
                <React.Fragment key={relatedTerm}>
                  {/* Using <a> for now, can be RouterLink later */}
                  <a
                    href={createRelatedLink(relatedTerm)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                    // onClick={(e) => { e.preventDefault(); /* handle navigation if not a full page reload */ }}
                  >
                    {relatedTerm}
                  </a>
                  {index < term.related.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GlossaryTermDetail;
