// src/utils/textProcessing.js

/**
 * Extracts the first sentence of a definition.
 * @param {string} definition - The full definition string.
 * @returns {string} The first sentence or an empty string.
 */
export const getDefinitionSnippet = (definition) => {
  if (!definition) return '';
  // Split by period, question mark, or exclamation mark followed by a space or end of string
  const sentences = definition.match(/[^.!?]+[.!?](\s+|$)/g);
  if (sentences && sentences.length > 0) {
    return sentences[0].trim();
  }
  return definition; // Fallback to full definition if no clear sentence end found
};

/**
 * Parses text to find {{TermName}} patterns and prepares them for linking.
 * @param {string} text - The input text string.
 * @param {Array} termsData - The glossaryData array.
 * @returns {Array} An array of objects: { type: 'text' | 'link', content?: string, term?: object, displayText?: string }
 */
export const parseTextForGlossaryLinks = (text, termsData) => {
  if (!text || typeof text !== 'string') {
    return [{ type: 'text', content: text || '' }];
  }

  const parts = [];
  const regex = /\{\{([^}]+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add preceding text if any
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }

    const termNameInBrackets = match[1].trim(); // e.g., "API", "Cache Hit"
    let matchedTerm = null;

    // Attempt to find the term in termsData
    // Case-insensitive match, also check if termNameInBrackets is an ID
    for (const term of termsData) {
      if (term.id === termNameInBrackets.toLowerCase() ||
          term.term.toLowerCase() === termNameInBrackets.toLowerCase() ||
          term.term.toLowerCase().startsWith(termNameInBrackets.toLowerCase() + " (") // Handles cases like {{API}} matching "API (Application Programming Interface)"
         ) {
        matchedTerm = term;
        break;
      }
      // A more complex matching could involve generating an ID from termNameInBrackets and comparing
      // Or, if term.term itself is "API (Application Programming Interface)", try matching "{{API}}"
      const mainPartOfTerm = term.term.split('(')[0].trim().toLowerCase();
      if (mainPartOfTerm === termNameInBrackets.toLowerCase()) {
        matchedTerm = term;
        break;
      }
    }

    if (matchedTerm) {
      parts.push({
        type: 'link',
        term: matchedTerm, // The whole matched term object from glossaryData
        displayText: termNameInBrackets, // The text that was inside {{...}}
      });
    } else {
      // If no match, add the original {{TermName}} as text
      parts.push({ type: 'text', content: match[0] });
    }
    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  // If parts is empty and text was not, it means no {{}} were found, return original text
  if (parts.length === 0 && text) {
      return [{ type: 'text', content: text }];
  }

  return parts;
};
