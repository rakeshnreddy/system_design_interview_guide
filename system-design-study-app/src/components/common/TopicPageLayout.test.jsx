import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  // Mock necessary child components that TopicPageLayout *does* use or pass props to,
  // if they interfere with the test or are complex.
  // For example, if SidebarComponent or AiScenarioModal were complex:
  vi.mock('./AiScenarioModal', () => ({ default: () => <div data-testid="ai-scenario-modal-mock">AiScenarioModal</div> }));
  // The SidebarComponent is passed as a prop, so its internals are less likely to interfere
  // unless it throws errors during render.

  it('renders content props and pageTitle', async () => { // Made test async
    const MockSidebarComponent = () => <div data-testid="sidebar">Sidebar Content</div>;
    const mockRenderViewFunction = vi.fn(() => <div data-testid="rendered-view">Rendered View Content</div>);
    const mockAppData = { some: 'data' };
    const { MemoryRouter } = await import('react-router-dom'); // Import MemoryRouter

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

  // Removed 'renders the topic title' as it's covered above
  // Removed 'renders ThemeSwitcher' as it's not directly part of TopicPageLayout's responsibility in the new structure

  it('opens AI Scenario Modal when FAB is clicked', async () => { // Made test async
    const MockSidebarComponent = () => <div data-testid="sidebar">Sidebar Content</div>;
    const mockRenderViewFunction = vi.fn(() => <div data-testid="rendered-view">Rendered View Content</div>);
    const { MemoryRouter } = await import('react-router-dom'); // Import MemoryRouter

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

    const fabButton = screen.getByRole('button', { name: /ask ai/i });
    fireEvent.click(fabButton);
    expect(screen.getByTestId('ai-scenario-modal-mock')).toBeInTheDocument();
  });
});
