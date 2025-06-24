import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TypesView from './TypesView';

// Mock child components if necessary, though for this view, direct rendering is okay
// jest.mock('@mui/material', () => ({
//   ...jest.requireActual('@mui/material'),
//   List: ({ children, ...props }) => <ul {...props}>{children}</ul>,
//   ListItem: ({ children, ...props }) => <li {...props}>{children}</li>,
//   ListItemText: ({ primary, secondary, secondaryTypographyProps, ...props }) => (
//     <div {...props}>
//       <span>{primary}</span>
//       {secondaryTypographyProps?.component === 'div' ? <div>{secondary}</div> : <p>{secondary}</p>}
//     </div>
//   ),
//   Typography: ({ children, ...props }) => <div {...props}>{children}</div>,
//   Paper: ({ children, ...props }) => <div {...props}>{children}</div>,
//   Box: ({ children, ...props }) => <div {...props}>{children}</div>,
//   Divider: (props) => <hr {...props} />,
// }));


describe('TypesView', () => {
  const mockAppData = {
    lbTypes: [
      {
        id: 'l4',
        name: 'Layer 4 (Network) Load Balancer',
        description: 'Distributes traffic based on network layer information (IP, port).',
        pros: ['Fast', 'Simple'],
        cons: ['Not content-aware'],
        useCases: 'General purpose TCP/UDP load balancing.',
      },
      {
        id: 'l7',
        name: 'Layer 7 (Application) Load Balancer',
        description: 'Distributes traffic based on application layer data (HTTP headers, cookies).',
        pros: ['Content-aware routing', 'SSL termination'],
        cons: ['Slower than L4', 'More complex'],
        useCases: 'Web applications, microservices.',
      },
    ],
  };

  const emptyAppData = {
    lbTypes: [],
  };

  const nullAppData = null;

  test('renders loading message when appData is null', () => {
    render(<TypesView appData={nullAppData} />);
    expect(screen.getByText('Loading load balancer types data...')).toBeInTheDocument();
  });

  test('renders no data message when lbTypes is empty', () => {
    render(<TypesView appData={emptyAppData} />);
    expect(screen.getByText('No load balancer type data available.')).toBeInTheDocument();
  });

  test('renders main title', () => {
    render(<TypesView appData={mockAppData} />);
    expect(screen.getByText('Types of Load Balancers')).toBeInTheDocument();
  });

  test('renders all load balancer types from appData', () => {
    render(<TypesView appData={mockAppData} />);
    expect(screen.getByText('Layer 4 (Network) Load Balancer')).toBeInTheDocument();
    expect(screen.getByText('Layer 7 (Application) Load Balancer')).toBeInTheDocument();
  });

  test('renders description, pros, cons, and use cases for each type', () => {
    render(<TypesView appData={mockAppData} />);
    const l4Data = mockAppData.lbTypes[0];
    const l7Data = mockAppData.lbTypes[1];

    // Check L4 data
    expect(screen.getByText(l4Data.description)).toBeInTheDocument();
    l4Data.pros.forEach(pro => expect(screen.getByText(pro)).toBeInTheDocument());
    l4Data.cons.forEach(con => expect(screen.getByText(con)).toBeInTheDocument());
    expect(screen.getByText(l4Data.useCases)).toBeInTheDocument();

    // Check L7 data
    expect(screen.getByText(l7Data.description)).toBeInTheDocument();
    l7Data.pros.forEach(pro => expect(screen.getByText(pro)).toBeInTheDocument());
    l7Data.cons.forEach(con => expect(screen.getByText(con)).toBeInTheDocument());
    expect(screen.getByText(l7Data.useCases)).toBeInTheDocument();
  });

  // The fix for nesting errors was to use secondaryTypographyProps={{ component: 'div' }}
  // While RTL doesn't easily allow checking the exact rendered tag without complex queries or snapshots,
  // these tests ensure that the content (including lists for pros/cons) is rendered.
  // The absence of console warnings during test runs (if configured to fail on them)
  // would be an indirect confirmation of the fix's success in a testing environment.
  // For direct DOM structure validation, snapshot testing or more specific queries might be used,
  // but that can make tests more brittle.
});
