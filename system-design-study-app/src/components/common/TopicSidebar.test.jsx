import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicSidebar from './TopicSidebar';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { vi } from 'vitest';

// The @docusaurus/theme-common/internal mock is likely unnecessary as TopicSidebar
// doesn't seem to use it directly. MUI handles its own theme context.
// vi.mock('@docusaurus/theme-common/internal', () => ({
//   useColorMode: () => ({
//     colorMode: 'light',
//     setColorMode: vi.fn(),
//   }),
// }));

// Mock ThemeSwitcher component if it's directly or indirectly rendered by TopicSidebar.
// Based on TopicSidebar.jsx, it does not seem to render ThemeSwitcher directly.
// vi.mock('../shared/ThemeSwitcher', () => ({ default: () => <div data-testid="theme-switcher-mock">ThemeSwitcher</div> }));


describe('TopicSidebar', () => {
  const mockSections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'details', title: 'Details' },
    { id: 'conclusion', title: 'Conclusion' },
  ];
  const mockSetCurrentView = vi.fn();
  const topicTitle = "Test Topic";

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    mockSetCurrentView.mockClear();
  });

  it('renders the topic title', () => {
    renderWithRouter(
      <TopicSidebar
        topicTitle={topicTitle}
        sections={mockSections}
        currentView="intro"
        setCurrentView={mockSetCurrentView}
      />
    );
    expect(screen.getByText(topicTitle)).toBeInTheDocument();
  });

  it('renders all section links', () => {
    renderWithRouter(
      <TopicSidebar
        topicTitle={topicTitle}
        sections={mockSections}
        currentView="intro"
        setCurrentView={mockSetCurrentView}
      />
    );
    mockSections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  it('calls setCurrentView with the section id when a section link is clicked', () => {
    renderWithRouter(
      <TopicSidebar
        topicTitle={topicTitle}
        sections={mockSections}
        currentView="intro"
        setCurrentView={mockSetCurrentView}
      />
    );
    const detailsLink = screen.getByText('Details');
    fireEvent.click(detailsLink);
    expect(mockSetCurrentView).toHaveBeenCalledWith('details');
  });

  it('applies active styles to the currentView link', () => {
    const currentViewId = 'details';
    renderWithRouter(
      <TopicSidebar
        topicTitle={topicTitle}
        sections={mockSections}
        currentView={currentViewId}
        setCurrentView={mockSetCurrentView}
      />
    );
    const activeLink = screen.getByText('Details');
    // Check for a class that indicates active state.
    // This depends on how active state is implemented in TopicSidebar.
    // Assuming it adds a class like 'text-primary' or similar for active links.
    // Or check for 'font-semibold' as per the component's code.
    expect(activeLink).toHaveClass('font-semibold'); // Based on TopicSidebar current implementation
    expect(activeLink).toHaveClass('text-primary'); // Based on TopicSidebar current implementation

    const inactiveLink = screen.getByText('Introduction');
    expect(inactiveLink).not.toHaveClass('font-semibold');
    expect(inactiveLink).not.toHaveClass('text-primary');
  });

  // Removed the test for "Back to Home" link as it's not part of TopicSidebar's direct responsibility.
  // That link is usually part of a higher-level layout component.

});
