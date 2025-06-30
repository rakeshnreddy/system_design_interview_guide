import React from 'react';
import { render, screen, within } from '../../test-utils'; // Correct: 'within' is imported
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
    expect(screen.getByRole('heading', { name: 'API Protocols & Styles' })).toBeInTheDocument();
  });

  test('renders all protocols from appData', () => {
    render(<ProtocolsView appData={mockAppData} />);
    // Check for headings with the protocol names.
    // The name in mockAppData already includes {{Term}} which RenderTextWithLinks handles.
    mockAppData.protocols.forEach(protocol => {
      const protocolName = protocol.name.replace(/\{\{([^}]+)\}\}/g, '$1'); // Get text without {{}}
      // Ensure the heading (Typography variant h6) contains the link with the correct text
      const heading = screen.getByRole('heading', { level: 6, name: new RegExp(protocolName.split('(')[0].trim(), 'i') });
      expect(heading).toBeInTheDocument();
      expect(within(heading).getByText(protocolName)).toBeInTheDocument(); // Check if the full name is there (possibly as link text)
    });
  });

  test('renders structure, pros, cons, and whenToUse for each protocol', () => {
    render(<ProtocolsView appData={mockAppData} />);

    mockAppData.protocols.forEach(protocol => {
      const protocolName = protocol.name.replace(/\{\{([^}]+)\}\}/g, '$1');
      const protocolHeading = screen.getByRole('heading', { level: 6, name: new RegExp(protocolName.split('(')[0].trim(), 'i') });
      const protocolContainer = protocolHeading.closest('li');

      expect(protocolContainer).toBeInTheDocument();

      if (protocolContainer) {
        // Check structure: Use a more specific part of the string or a function matcher
        const structureText = protocol.structure.replace(/\{\{.*?\}\}/g, "").substring(0, 30); // First 30 chars, without glossary items
        expect(within(protocolContainer).getByText(new RegExp(structureText.trim().split(" ")[0], "i"))).toBeInTheDocument();

        protocol.pros.forEach(pro => {
          const proText = pro.replace(/\{\{.*?\}\}/g, "").substring(0, 20);
          expect(within(protocolContainer).getByText(new RegExp(proText.trim().split(" ")[0], "i"))).toBeInTheDocument();
        });

        protocol.cons.forEach(con => {
          const conText = con.replace(/\{\{.*?\}\}/g, "").substring(0, 20);
          expect(within(protocolContainer).getByText(new RegExp(conText.trim().split(" ")[0], "i"))).toBeInTheDocument();
        });

        protocol.whenToUse.forEach(use => {
          const useText = use.replace(/\{\{.*?\}\}/g, "").substring(0, 20);
          expect(within(protocolContainer).getByText(new RegExp(useText.trim().split(" ")[0], "i"))).toBeInTheDocument();
        });

        if (protocol.realWorldExample) {
          const exampleText = protocol.realWorldExample.substring(0, 30);
          expect(within(protocolContainer).getByText(new RegExp(exampleText.trim().split(" ").slice(0,2).join(" "), "i"))).toBeInTheDocument();
        }

        if (protocol.interviewTalkingPoints && protocol.interviewTalkingPoints.length > 0) {
           const talkingPointText = protocol.interviewTalkingPoints[0].substring(0,20);
           expect(within(protocolContainer).getByText(new RegExp(talkingPointText.trim().split(" ")[0], "i"))).toBeInTheDocument();
        }
      }
    });
  });

  // The fix for nesting errors was to use secondaryTypographyProps={{ component: 'div' }}
  // These tests ensure content (including lists for pros/cons) is rendered.
  // Absence of console warnings during tests would be an indirect confirmation.
});
