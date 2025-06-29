import React from 'react';
import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import ProtocolsView from './ProtocolsView';

describe('ProtocolsView', () => {
  const mockAppData = {
    protocols: [
      {
        id: 'rest',
        name: 'REST (Representational State Transfer)',
        structure: 'Client-server, stateless, cacheable, layered system. Uses HTTP methods (GET, POST, PUT, DELETE).',
        pros: ['Simple, widely adopted', 'Scalable', 'Flexible (various data formats like JSON, XML)'],
        cons: ['Can be chatty (multiple requests)', 'Over-fetching/under-fetching data'],
        useCases: 'Public APIs, web services, mobile app backends.',
      },
      {
        id: 'graphql',
        name: 'GraphQL',
        structure: 'Query language for APIs. Clients request exactly the data they need.',
        pros: ['Solves over-fetching/under-fetching', 'Strongly typed schema', 'Real-time updates with Subscriptions'],
        cons: ['Complexity in server-side implementation', 'Caching can be more complex than REST'],
        useCases: 'Mobile apps, complex frontends, applications with diverse data requirements.',
      },
    ],
  };

  const emptyAppData = {
    protocols: [],
  };

  const nullAppData = { protocols: null }; // Or simply null, depending on how the component handles it
  const undefinedAppData = {};


  test('renders loading message when appData or appData.protocols is null/undefined', () => {
    const { rerender } = render(<ProtocolsView appData={nullAppData} />);
    expect(screen.getByText('Loading API protocol data...')).toBeInTheDocument();

    rerender(<ProtocolsView appData={undefinedAppData} />);
    expect(screen.getByText('Loading API protocol data...')).toBeInTheDocument();
  });

  test('renders main title', () => {
    render(<ProtocolsView appData={mockAppData} />);
    expect(screen.getByText('API Protocols & Styles')).toBeInTheDocument();
  });

  test('renders all protocols from appData', () => {
    render(<ProtocolsView appData={mockAppData} />);
    expect(screen.getByText('REST (Representational State Transfer)')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'GraphQL' })).toBeInTheDocument();
  });

  test('renders structure, pros, cons, and use cases for each protocol', () => {
    render(<ProtocolsView appData={mockAppData} />);
    const restData = mockAppData.protocols[0];
    const graphqlData = mockAppData.protocols[1];

    // Check REST data
    expect(screen.getByText(restData.structure)).toBeInTheDocument();
    restData.pros.forEach(pro => expect(screen.getByText(pro)).toBeInTheDocument());
    restData.cons.forEach(con => expect(screen.getByText(con)).toBeInTheDocument());
    expect(screen.getByText(restData.useCases)).toBeInTheDocument();

    // Check GraphQL data
    expect(screen.getByText(graphqlData.structure)).toBeInTheDocument();
    graphqlData.pros.forEach(pro => expect(screen.getByText(pro)).toBeInTheDocument());
    graphqlData.cons.forEach(con => expect(screen.getByText(con)).toBeInTheDocument());
    expect(screen.getByText(graphqlData.useCases)).toBeInTheDocument();
  });

  // The fix for nesting errors was to use secondaryTypographyProps={{ component: 'div' }}
  // These tests ensure content (including lists for pros/cons) is rendered.
  // Absence of console warnings during tests would be an indirect confirmation.
});
