import React from 'react';
import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom';
import ScenariosView from './ScenariosView';

describe('ScenariosView', () => {
  const mockAppData = {
    scenarios: [
      {
        id: 'scenario1',
        title: 'High-Traffic E-commerce Site',
        description: 'A rapidly growing e-commerce platform experiencing frequent traffic spikes.',
        solution: {
          strategy: 'Utilize a combination of L7 and L4 load balancers with auto-scaling.',
          components: ['CDN', 'L7 Load Balancer (e.g., ALB/App Gateway)', 'L4 Load Balancer (e.g., NLB/Network LB)', 'Auto-scaling Groups for application servers'],
        },
      },
      {
        id: 'scenario2',
        title: 'Global Application Delivery',
        description: 'An application with users distributed worldwide, requiring low latency.',
        solution: {
          strategy: 'Employ Global Server Load Balancing (GSLB) and regional load balancers.',
          components: ['DNS-based GSLB', 'Regional L7/L4 Load Balancers', 'Anycast IP Addressing'],
        },
      },
    ],
  };

  const emptyAppData = {
    scenarios: [],
  };

  const nullAppData = null;

  test('renders loading message when appData is null', () => {
    render(<ScenariosView appData={nullAppData} />);
    expect(screen.getByText('Loading scenario data...')).toBeInTheDocument();
  });

  test('renders no data message when scenarios is empty', () => {
    render(<ScenariosView appData={emptyAppData} />);
    expect(screen.getByText('No load balancing scenario data available.')).toBeInTheDocument();
  });

  test('renders main title', () => {
    render(<ScenariosView appData={mockAppData} />);
    expect(screen.getByText('Load Balancing Scenarios')).toBeInTheDocument();
  });

  test('renders all scenarios from appData', () => {
    render(<ScenariosView appData={mockAppData} />);
    expect(screen.getByText('High-Traffic E-commerce Site')).toBeInTheDocument();
    expect(screen.getByText('Global Application Delivery')).toBeInTheDocument();
  });

  test('renders description, strategy, and components for each scenario', () => {
    render(<ScenariosView appData={mockAppData} />);
    const scenario1Data = mockAppData.scenarios[0];
    const scenario2Data = mockAppData.scenarios[1];

    // Check Scenario 1 data
    expect(screen.getByText(scenario1Data.description)).toBeInTheDocument();
    expect(screen.getByText(scenario1Data.solution.strategy)).toBeInTheDocument();
    scenario1Data.solution.components.forEach(component => expect(screen.getByText(component)).toBeInTheDocument());

    // Check Scenario 2 data
    expect(screen.getByText(scenario2Data.description)).toBeInTheDocument();
    expect(screen.getByText(scenario2Data.solution.strategy)).toBeInTheDocument();
    scenario2Data.solution.components.forEach(component => expect(screen.getByText(component)).toBeInTheDocument());
  });

  // Similar to TypesView, the nesting fix is indirectly verified by ensuring content renders correctly
  // and by the absence of console hydration errors during testing.
});
