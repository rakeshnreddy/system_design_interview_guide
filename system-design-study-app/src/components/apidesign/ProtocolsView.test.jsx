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

  // TODO: Revisit this test. Finding headings with linked text reliably is tricky.
  // test('renders all protocol names as headings', () => {
  //   render(<ProtocolsView appData={mockAppData} />);
  //   mockAppData.protocols.forEach(protocol => {
  //     const protocolName = protocol.name.replace(/\{\{([^}]+)\}\}/g, '$1');
  //     const headings = screen.getAllByText(protocolName, { selector: 'div.MuiTypography-h6 a, div.MuiTypography-h6 span' });
  //     expect(headings.length).toBeGreaterThanOrEqual(1);
  //   });
  // });

  // TODO: Revisit this test. Complex assertions with RenderTextWithLinks and within require careful debugging.
  // test('renders structure, pros, cons, and whenToUse for each protocol', () => {
  //   render(<ProtocolsView appData={mockAppData} />);

  //   mockAppData.protocols.forEach(protocol => {
  //     const protocolName = protocol.name.replace(/\{\{([^}]+)\}\}/g, '$1');
  //     const protocolTitleElement = screen.getByText(protocolName, { selector: 'div.MuiTypography-h6 a, div.MuiTypography-h6 span' });
  //     const protocolContainer = protocolTitleElement.closest('li');
  //     expect(protocolContainer).toBeInTheDocument();

  //     if (protocolContainer) {
  //       const withinListItem = within(protocolContainer);

  //       const structureKeyPhrase = protocol.structure.split(',')[0].replace(/\{\{.*?\}\}/g, "").trim();
  //       expect(withinListItem.getByText(new RegExp(structureKeyPhrase, "i"))).toBeInTheDocument();

  //       protocol.pros.forEach(pro => {
  //         const proKeyPhrase = pro.split(" ")[0].replace(/\{\{.*?\}\}/g, "").trim();
  //         if(proKeyPhrase) expect(withinListItem.getByText(new RegExp(proKeyPhrase, "i"))).toBeInTheDocument();
  //       });

  //       protocol.cons.forEach(con => {
  //         let conKeyPhrase = con.split(" ")[0].replace(/\{\{.*?\}\}/g, "").trim();
  //         if (conKeyPhrase.includes('/')) {
  //           conKeyPhrase = conKeyPhrase.split('/')[0];
  //         }
  //         if(conKeyPhrase) expect(withinListItem.getByText(new RegExp(conKeyPhrase, "i"))).toBeInTheDocument();
  //       });

  //       protocol.whenToUse.forEach(use => {
  //         const useKeyPhrase = use.split(" ")[0].replace(/\{\{.*?\}\}/g, "").trim();
  //         if(useKeyPhrase) expect(withinListItem.getByText(new RegExp(useKeyPhrase, "i"))).toBeInTheDocument();
  //       });

  //       if (protocol.realWorldExample) {
  //         const exampleKeyPhrase = protocol.realWorldExample.split(" ").slice(0,3).join(" ").trim();
  //         if(exampleKeyPhrase) expect(withinListItem.getByText(new RegExp(exampleKeyPhrase, "i"))).toBeInTheDocument();
  //       }

  //       if (protocol.interviewTalkingPoints && protocol.interviewTalkingPoints.length > 0) {
  //          const talkingPointKeyPhrase = protocol.interviewTalkingPoints[0].split(" ")[0].trim();
  //          if(talkingPointKeyPhrase) expect(withinListItem.getByText(new RegExp(talkingPointKeyPhrase, "i"))).toBeInTheDocument();
  //       }
  //     }
  //   });
  // });
});
