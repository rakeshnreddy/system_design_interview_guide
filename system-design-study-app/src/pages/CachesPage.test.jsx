import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CachesPage from './CachesPage';
import { BrowserRouter } from 'react-router-dom';

// Mock child components
jest.mock('../components/common/TopicPageLayout', () => ({ children, sidebar, content, topicTitle }) => (
  <div data-testid="topic-page-layout">
    <h1>{topicTitle}</h1>
    <div data-testid="sidebar-prop-content">{sidebar}</div>
    <div data-testid="content-prop-content">{content}</div>
    {children}
  </div>
));

jest.mock('../components/common/TopicSidebar', () => ({ topicTitle, sections, currentView, setCurrentView }) => (
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
));

// Mock view components
jest.mock('../components/caches/FundamentalsView', () => () => <div data-testid="fundamentals-view">FundamentalsView Content</div>);
jest.mock('../components/caches/PatternsView', () => () => <div data-testid="patterns-view">PatternsView Content</div>);
jest.mock('../components/caches/StrategiesView', () => () => <div data-testid="strategies-view">StrategiesView Content</div>);
jest.mock('../components/caches/CachepediaView', () => () => <div data-testid="cachepedia-view">CachepediaView Content</div>);
jest.mock('../components/caches/ScenariosView', () => () => <div data-testid="scenarios-view">ScenariosView Content</div>);
jest.mock('../components/caches/PracticeView', () => () => <div data-testid="practice-view">PracticeView Content</div>);
jest.mock('../components/caches/CodeLibraryView', () => () => <div data-testid="code-library-view">CodeLibraryView Content</div>);

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CachesPage', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders TopicPageLayout with correct title', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Caching Strategies' })).toBeInTheDocument();
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Caching Strategies', level: 2 })).toBeInTheDocument(); // From mock

    expect(screen.getByText('Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Caching Patterns')).toBeInTheDocument();
    expect(screen.getByText('Code Library')).toBeInTheDocument();
  });

  it('renders the FundamentalsView by default', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', () => {
    renderWithRouter(<CachesPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
    expect(screen.queryByTestId('patterns-view')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Caching Patterns'));

    expect(screen.queryByTestId('fundamentals-view')).not.toBeInTheDocument();
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
