import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Moved import here
import '@testing-library/jest-dom';
import TopicPageLayout from './TopicPageLayout';
import { vi } from 'vitest';

// Mock ThemeSwitcher component if it's directly imported and used by TopicPageLayout
// Assuming ThemeSwitcher is NOT directly used by TopicPageLayout based on its current code.
// If it were, the mock would look like:
// vi.mock('../shared/ThemeSwitcher', () => ({ default: () => <div data-testid="theme-switcher-mock">ThemeSwitcher</div> }));

// The @docusaurus/theme-common/internal mock is likely unnecessary as TopicPageLayout
// doesn't seem to use it. MUI handles its own theme context.
// If a color mode hook from another library was truly used, it would be mocked here.

describe('TopicPageLayout', () => {
  vi.mock('./AiScenarioModal', () => ({ default: () => <div data-testid="ai-scenario-modal-mock">AiScenarioModal</div> }));

  // Define mocks/helpers at the describe level if they are used in multiple tests
  // or to potentially help with parsing/transformation issues.
  const MockSidebarComponent = () => <div data-testid="sidebar">Sidebar Content</div>;
  const mockRenderViewFunction = vi.fn();
  const mockAppData = { some: 'data' };

  beforeEach(() => {
    // Reset mocks before each test if needed
    mockRenderViewFunction.mockClear();
    // Set a default mock implementation if views are rendered in multiple tests
    mockRenderViewFunction.mockImplementation(() => <div data-testid="rendered-view">Rendered View Content</div>);
  });

  it('renders content props and pageTitle', () => { // No longer needs async
    render(
      <MemoryRouter>
        <TopicPageLayout
          SidebarComponent={MockSidebarComponent}
          renderViewFunction={mockRenderViewFunction}
        pageTitle="Test Topic Page"
        appData={mockAppData}
        initialView="testView"
        topicId="test-topic"
      />
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    expect(screen.getByTestId('rendered-view')).toBeInTheDocument();
    expect(screen.getByText('Rendered View Content')).toBeInTheDocument();
    expect(screen.getByText('Test Topic Page')).toBeInTheDocument(); // Checks AppBar title
    expect(mockRenderViewFunction).toHaveBeenCalledWith('testView', mockAppData);
  });

  it('opens AI Scenario Modal when FAB is clicked', () => { // No longer needs async
    // mockRenderViewFunction is already defined and reset via beforeEach
    render(
      <MemoryRouter>
        <TopicPageLayout
          SidebarComponent={MockSidebarComponent}
          renderViewFunction={mockRenderViewFunction}
        pageTitle="Test Topic with AI"
        appData={{}}
        initialView="default"
        topicId="ai-topic"
      />
    );

    const fabButton = screen.getByRole('button', { name: 'ask ai' }); // Changed regex to string
    fireEvent.click(fabButton);
    expect(screen.getByTestId('ai-scenario-modal-mock')).toBeInTheDocument();
  });
});
