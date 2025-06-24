import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CachesPage from './CachesPage';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock child components
vi.mock('../components/common/TopicPageLayout', () => ({
  default: ({ pageTitle, SidebarComponent, renderViewFunction, initialView, appData, topicId }) => {
    // This mock needs to simulate how TopicPageLayout uses its props,
    // especially renderViewFunction, to render the actual content.
    // The CachesPage test will pass its own SidebarComponent and renderViewFunction.
    // We need a way for the test to control the "currentView" that renderViewFunction receives.
    // The actual TopicPageLayout manages currentView internally. For the mock,
    // we can assume initialView is the one to render, or allow the test's interaction
    // with the mocked SidebarComponent to update a view state if necessary.

    // Let's try to directly use renderViewFunction with initialView or a view managed by the test.
    // The test's TopicSidebar mock already calls setCurrentView, which CachesPage uses.
    // So, CachesPage will manage currentView, and pass the correct renderViewFunction.
    // The mock for TopicPageLayout should just call the passed renderViewFunction.
    // It also needs to render the SidebarComponent.

    // A simplified state for the mock if needed, but CachesPage should handle the actual currentView.
    // For this mock, we'll rely on CachesPage to manage the currentView state that its
    // renderViewFunction will use.

    // The actual TopicPageLayout has its own state for currentView, initialized by initialView.
    // The SidebarComponent it receives is passed this currentView and a setter.
    // The renderViewFunction it receives is called with this currentView.

    // For the test, CachesPage provides its own SidebarComponent instance and its own renderViewFunction.
    // The mock of TopicPageLayout should render what CachesPage tells it to via these props.

    const [mockCurrentView, setMockCurrentView] = React.useState(initialView);

    return (
      <div data-testid="topic-page-layout">
        <h1>{pageTitle}</h1>
        <div data-testid="sidebar-prop-content">
          <SidebarComponent currentView={mockCurrentView} setCurrentView={setMockCurrentView} />
        </div>
        <div data-testid="content-prop-content">
          {renderViewFunction(mockCurrentView, appData)}
        </div>
      </div>
    );
  }
}));

vi.mock('../components/common/TopicSidebar', () => ({
  default: ({ topicTitle, sections, currentView, setCurrentView }) => (
    // This mock is what CachesPage's SidebarComponent prop will render inside the mocked TopicPageLayout
    <div data-testid="topic-sidebar">
      <h2>{topicTitle}</h2>
      <ul>
        {sections.map(section => (
          <li key={section.id} onClick={() => setCurrentView(section.id)}>
            {section.title}
          </li>
        ))}
      </ul>
      <p>Current View in Mock: {currentView}</p>
    </div>
  )
}));

// Mock view components
vi.mock('../components/caches/FundamentalsView', () => ({ default: () => <div data-testid="fundamentals-view">FundamentalsView Content</div> }));
vi.mock('../components/caches/PatternsView', () => ({ default: () => <div data-testid="patterns-view">PatternsView Content</div> }));
vi.mock('../components/caches/StrategiesView', () => ({ default: () => <div data-testid="strategies-view">StrategiesView Content</div> }));
vi.mock('../components/caches/CachepediaView', () => ({ default: () => <div data-testid="cachepedia-view">CachepediaView Content</div> }));
vi.mock('../components/caches/ScenariosView', () => ({ default: () => <div data-testid="scenarios-view">ScenariosView Content</div> }));
vi.mock('../components/caches/PracticeView', () => ({ default: () => <div data-testid="practice-view">PracticeView Content</div> }));
vi.mock('../components/caches/CodeLibraryView', () => ({ default: () => <div data-testid="code-library-view">CodeLibraryView Content</div> }));

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CachesPage', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders TopicPageLayout with correct title', async () => { // Made async
    renderWithRouter(<CachesPage />);
    await waitFor(() => { // Added waitFor
      expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Caching Strategies' })).toBeInTheDocument();
    });
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    // Corrected: The sidebar mock itself has an h2 with "Caching Topics"
    expect(screen.getByRole('heading', { name: 'Caching Topics', level: 2 })).toBeInTheDocument();

    expect(screen.getByText('Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Caching Patterns')).toBeInTheDocument();
    expect(screen.getByText('Code Library')).toBeInTheDocument();
  });

  it('renders the FundamentalsView by default', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', async () => { // Made async
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
    expect(screen.queryByTestId('patterns-view')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Caching Patterns'));

    await waitFor(() => {
      expect(screen.queryByTestId('fundamentals-view')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('patterns-view')).toBeInTheDocument();
    expect(screen.getByText('Current View in Mock: patterns')).toBeInTheDocument();
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<CachesPage />);
    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    expect(contentPropContent.contains(screen.getByTestId('fundamentals-view'))).toBe(true);
  });
});
