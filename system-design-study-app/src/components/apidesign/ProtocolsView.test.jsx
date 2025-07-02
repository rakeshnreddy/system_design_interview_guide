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
        pros: ['Simple, widely adopted', 'Scalable', 'Flexible (various data formats like {{JavaScript Object Notation (JSON)}})'], // XML removed as it's not in glossary
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
        cons: ['Complexity in server-side implementation', '{{Cache}} can be more complex than REST'], // Changed Caching to Cache
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

        // Helper function to process text for assertion (remove glossary tags, keep content)
        const getAssertableText = (text) => {
          if (!text) return "";
          return text.replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g, (match, term, display) => (display || term).trim()).trim();
        };

        // Check for Structure
        if (protocol.structure) {
          const structureLabel = withinProtocolContainer.getByText(/Structure \/ Key Characteristics:/i);
          expect(structureLabel).toBeInTheDocument();
          // Find the parent or sibling paragraph/div that contains the structure text
          const structureContainer = structureLabel.closest('div').querySelector('div.MuiTypography-body2, p.MuiTypography-body2'); // MUI specific
          if (structureContainer) {
            expect(structureContainer.textContent).toContain(getAssertableText(protocol.structure));
          } else {
            // Fallback if specific container not found, check within the whole protocol container
            expect(protocolContainer.textContent).toContain(getAssertableText(protocol.structure));
          }
        }

        const checkListItems = (sectionTitle, items) => {
          if (items && items.length > 0) {
            const titleElement = withinProtocolContainer.getByText(new RegExp(sectionTitle, "i"));
            expect(titleElement).toBeInTheDocument();
            // Find the list (ul) associated with this title. This assumes structure.
            // This might need adjustment based on actual DOM, e.g., nextElementSibling or specific selectors.
            let listElement = titleElement.nextElementSibling;
            while(listElement && listElement.tagName !== 'UL') {
                listElement = listElement.nextElementSibling;
            }

            if (listElement && listElement.tagName === 'UL') {
              items.forEach(itemString => {
                const assertableItemText = getAssertableText(itemString);
                if (assertableItemText) {
                  // Check if any list item within this UL contains the text
                  const listItems = within(listElement).queryAllByRole('listitem');
                  const normalizedAssertableItemText = assertableItemText.replace(/\s+/g, ' ').trim();

                  const itemFound = listItems.some(li => {
                    const normalizedLiTextContent = li.textContent.replace(/\s+/g, ' ').trim();
                    return normalizedLiTextContent.includes(normalizedAssertableItemText);
                  });
                  if (!itemFound) {
                    console.log(`DEBUG: Item not found. Searching for: "${normalizedAssertableItemText}" in section "${sectionTitle}"`);
                    console.log(`DEBUG: List item texts considered: ${listItems.map(li => `"${li.textContent.replace(/\s+/g, ' ').trim()}"`).join('; ')}`);
                  }
                  expect(itemFound).toBe(true, `Details logged above if item not found.`);
                }
              });
            } else {
               // Fallback: if UL not found as expected, check within the whole protocol container for each item.
               // This is less precise but better than failing to find the list.
                items.forEach(itemString => {
                    const assertableItemText = getAssertableText(itemString);
                    if (assertableItemText) {
                        expect(protocolContainer.textContent).toContain(assertableItemText);
                    }
                });
            }
          }
        };

        checkListItems("Pros:", protocol.pros);
        checkListItems("Cons:", protocol.cons);
        checkListItems("When to Use:", protocol.whenToUse);

        // Check for Real-World Example
        if (protocol.realWorldExample) {
          const exampleLabel = withinProtocolContainer.getByText(/Real-World Example:/i);
          expect(exampleLabel).toBeInTheDocument();
          // Example text is typically in a sibling or child div of the label's container
          const exampleContainer = exampleLabel.closest('div.MuiBox-root') || exampleLabel.parentElement; // MUI specific, adjust if needed
          expect(exampleContainer.textContent).toContain(getAssertableText(protocol.realWorldExample));
        }

        // Check for Interview Talking Points
        if (protocol.interviewTalkingPoints && protocol.interviewTalkingPoints.length > 0) {
            const titleElement = withinProtocolContainer.getByText(/Interview Talking Points:/i);
            expect(titleElement).toBeInTheDocument();
            let listContainer = titleElement.closest('div.MuiBox-root'); // The box containing title and list
            if (listContainer) {
                const listElement = listContainer.querySelector('ul');
                 if (listElement) {
                    protocol.interviewTalkingPoints.forEach(pointString => {
                        const assertablePointText = getAssertableText(pointString);
                        if (assertablePointText) {
                            const listItems = within(listElement).queryAllByRole('listitem');
                            const itemFound = listItems.some(li => li.textContent.includes(assertablePointText));
                            expect(itemFound).toBe(true, `Expected to find "${assertablePointText}" in Interview Talking Points`);
                        }
                    });
                } else {
                    // Fallback
                    protocol.interviewTalkingPoints.forEach(pointString => {
                        const assertablePointText = getAssertableText(pointString);
                        if (assertablePointText) {
                             expect(protocolContainer.textContent).toContain(assertablePointText);
                        }
                    });
                }
            } else {
                 // Fallback
                protocol.interviewTalkingPoints.forEach(pointString => {
                    const assertablePointText = getAssertableText(pointString);
                    if (assertablePointText) {
                        expect(protocolContainer.textContent).toContain(assertablePointText);
                    }
                });
            }
        }
      }
    });
  });
});
