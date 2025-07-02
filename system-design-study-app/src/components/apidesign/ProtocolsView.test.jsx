import React from 'react';
import { render, screen, within } from '../../test-utils';
import '@testing-library/jest-dom';
import ProtocolsView from './ProtocolsView';

describe('ProtocolsView', () => {
  const mockAppData = {
    protocols: [
      {
        id: 'rest',
        name: '{{REST (Representational State Transfer)}}',
        structure: 'Client-server, {{Statelessness}}, cacheable, layered system. Uses {{HTTP}} methods (GET, POST, PUT, DELETE).',
        pros: ['Simple, widely adopted', 'Scalable', 'Flexible (various data formats like {{JSON}}, {{XML}})'],
        cons: ['Can be chatty (multiple requests)', '{{Over-fetching}}/{{Under-fetching}} data'],
        whenToUse: ['Public APIs, web services, mobile app backends.'],
        realWorldExample: 'Most public APIs like Twitter API (for standard operations), GitHub API.',
        interviewTalkingPoints: ['Discuss HTTP verbs.', 'Statelessness is key.']
      },
      {
        id: 'graphql',
        name: '{{GraphQL}}',
        structure: 'Query language for APIs. Clients request exactly the data they need. Developed by Facebook.',
        pros: ['Solves {{Over-fetching}}/{{Under-fetching}}', 'Strongly typed schema', 'Real-time updates with Subscriptions'],
        cons: ['Complexity in server-side implementation', '{{Caching}} can be more complex than REST'],
        whenToUse: ['Mobile apps, complex frontends, applications with diverse data requirements.'],
        realWorldExample: 'Facebook uses GraphQL for its mobile apps.',
        interviewTalkingPoints: ['Client-driven queries.', 'Single endpoint.']
      },
    ],
    mermaidDiagrams: {
        restFlow: "sequenceDiagram\nClient->>Server: GET /users\nServer-->>Client: 200 OK {data}",
        graphQLFlow: "sequenceDiagram\nClient->>GraphQL: Query { user { name } }\nGraphQL-->>Client: Response { user: { name: X } }"
    }
  };

  const emptyAppData = {
    protocols: [],
  };

  const nullAppData = { protocols: null };
  const undefinedAppData = {};


  test('renders loading message when appData or appData.protocols is null/undefined', () => {
    const { rerender } = render(<ProtocolsView appData={nullAppData} />);
    expect(screen.getByText('Loading API protocol data...')).toBeInTheDocument();

    rerender(<ProtocolsView appData={undefinedAppData} />);
    expect(screen.getByText('Loading API protocol data...')).toBeInTheDocument();
  });

  test('renders main title', () => {
    render(<ProtocolsView appData={mockAppData} />);
    expect(screen.getByRole('heading', { name: 'API Protocols & Styles', level: 4 })).toBeInTheDocument();
  });

  test('renders all protocol names as headings', () => {
    render(<ProtocolsView appData={mockAppData} />);
    mockAppData.protocols.forEach(protocol => {
      const protocolDisplayName = protocol.name.replace(/\{\{([^}]+)\}\}/g, (match, content) => {
        return content.split('|')[0];
      }).trim();

      // Find all elements styled as h6 by MUI (typically divs with specific classes)
      // The class "MuiTypography-h6" is a general class for h6 variants.
      const headingElements = document.querySelectorAll('div.MuiTypography-h6');
      let foundHeading = false;
      headingElements.forEach(headingEl => {
        if (within(headingEl).queryByText(protocolDisplayName)) {
          foundHeading = true;
        }
      });
      expect(foundHeading).toBe(true, `Heading for "${protocolDisplayName}" not found.`);
    });
  });

  test('renders structure, pros, cons, realWorldExample, interviewTalkingPoints and whenToUse for each protocol', () => {
    render(<ProtocolsView appData={mockAppData} />);

    mockAppData.protocols.forEach(protocol => {
      const protocolDisplayName = protocol.name.replace(/\{\{([^}]+)\}\}/g, (match, content) => {
        return content.split('|')[0];
      }).trim();

      // Find the specific heading element (div styled as h6) that contains the protocol display name.
      const allStyledHeadings = document.querySelectorAll('div.MuiTypography-h6');
      let targetHeadingElement = null;
      allStyledHeadings.forEach(sh => {
        if (within(sh).queryByText(protocolDisplayName)) {
          targetHeadingElement = sh;
        }
      });
      expect(targetHeadingElement).not.toBeNull(`Could not find heading element for ${protocolDisplayName}`);

      const protocolContainer = targetHeadingElement.closest('li');
      expect(protocolContainer).toBeInTheDocument();

      if (protocolContainer) {
        const withinProtocolContainer = within(protocolContainer);

        const getSafeSnippet = (text, length = 20) => {
          const braceIndex = text.indexOf("{{");
          let snippet;
          if (braceIndex === 0) { // Starts with a glossary term
            // We can't reliably use a snippet before the term, so we'll look for the term itself later if needed
            // For now, this approach might skip asserting content if it starts with a term and has no text after.
            // A more complex approach would be to extract the display text of the first term.
            // However, RenderTextWithLinks handles this, so we rely on its output.
            // The current test checks for presence of labels like "Pros:", "Cons:" and then *some* text from the items.
            // If an item is *only* a glossary term, this snippet approach for item content might not work.
            // Let's try taking text *after* the first term if it starts with one.
            const closingBraceIndex = text.indexOf("}}");
            if (closingBraceIndex !== -1 && text.length > closingBraceIndex + 2) {
                snippet = text.substring(closingBraceIndex + 2).trim().substring(0, length);
            } else { // Only a glossary term or nothing after
                snippet = text.replace(/\{\{([^}]+)\}\}/g, (match, content) => content.split('|')[0]).substring(0,length); // Use the display name of the term
            }
          } else if (braceIndex > 0) {
            snippet = text.substring(0, braceIndex).trim();
          } else {
            snippet = text.substring(0, length).trim();
          }
          return snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape for regex
        };

        // Check for Structure
        if (protocol.structure) {
          expect(withinProtocolContainer.getByText(/Structure \/ Key Characteristics:/i)).toBeInTheDocument();
          const structureSnippet = getSafeSnippet(protocol.structure, 30);
          if (structureSnippet) {
            expect(withinProtocolContainer.getByText(new RegExp(structureSnippet, "i"))).toBeInTheDocument();
          }
        }

        // Check for Pros
        if (protocol.pros && protocol.pros.length > 0) {
          expect(withinProtocolContainer.getByText(/Pros:/i)).toBeInTheDocument();
          protocol.pros.forEach(pro => {
            const proSnippet = getSafeSnippet(pro);
            if(proSnippet) expect(withinProtocolContainer.getByText(new RegExp(proSnippet, "i"))).toBeInTheDocument();
          });
        }

        // Check for Cons
        if (protocol.cons && protocol.cons.length > 0) {
          expect(withinProtocolContainer.getByText(/Cons:/i)).toBeInTheDocument();
          protocol.cons.forEach(con => {
            const conSnippet = getSafeSnippet(con);
            if (conSnippet && conSnippet.trim().length > 0) {
              // Use a function matcher to match text across element boundaries (e.g., glossary links)
              // Using queryAllByText and then filtering to avoid the "multiple elements" error
              const matchingElements = withinProtocolContainer.queryAllByText((content, node) => {
                // Remove all whitespace for comparison, as React may split text nodes
                const text = node.textContent.replace(/\s+/g, ' ').trim();
                const snippet = conSnippet.replace(/\\/g, '').replace(/\s+/g, ' ').trim();
                return text.toLowerCase().includes(snippet.toLowerCase());
              });
              // Expect at least one element to match the snippet
              expect(matchingElements.length).toBeGreaterThan(0);
            }
          });
        }

        // Check for When to Use
        if (protocol.whenToUse && protocol.whenToUse.length > 0) {
          expect(withinProtocolContainer.getByText(/When to Use:/i)).toBeInTheDocument();
          protocol.whenToUse.forEach(use => {
            const useSnippet = getSafeSnippet(use);
            if(useSnippet) expect(withinProtocolContainer.getByText(new RegExp(useSnippet, "i"))).toBeInTheDocument();
          });
        }

        // Check for Real-World Example
        if (protocol.realWorldExample) {
          expect(withinProtocolContainer.getByText(/Real-World Example:/i)).toBeInTheDocument();
           const exampleSnippet = getSafeSnippet(protocol.realWorldExample, 30);
           if(exampleSnippet) expect(withinProtocolContainer.getByText(new RegExp(exampleSnippet, "i"))).toBeInTheDocument();
        }

        // Check for Interview Talking Points
        if (protocol.interviewTalkingPoints && protocol.interviewTalkingPoints.length > 0) {
          expect(withinProtocolContainer.getByText(/Interview Talking Points:/i)).toBeInTheDocument();
           protocol.interviewTalkingPoints.forEach(point => {
            const pointSnippet = getSafeSnippet(point);
            if(pointSnippet) expect(withinProtocolContainer.getByText(new RegExp(pointSnippet, "i"))).toBeInTheDocument();
          });
        }
      }
    });
  });
});
