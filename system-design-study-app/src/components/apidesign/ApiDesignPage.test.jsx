import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApiDesignPage from './ApiDesignPage';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock child components
vi.mock('../common/TopicPageLayout', () => ({
  default: ({ pageTitle, SidebarComponent, renderViewFunction, initialView, appData, topicId }) => {
    // Assuming React is in scope for React.useState due to Vitest/ Vite setup
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

vi.mock('../common/TopicSidebar', () => ({
  default: ({ topicTitle, sections, currentView, setCurrentView }) => (
    // This mock is what ApiDesignPage's SidebarComponent prop will render inside the mocked TopicPageLayout
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

// Mock view components based on ApiDesignPage.jsx
vi.mock('./FundamentalsView', () => ({ default: () => <div data-testid="fundamentals-view">FundamentalsView Content</div> }));
vi.mock('./ProtocolsView', () => ({ default: () => <div data-testid="protocols-view">ProtocolsView Content</div> }));
vi.mock('./PatternsView', () => ({ default: () => <div data-testid="patterns-view">PatternsView Content</div> }));
vi.mock('./SecurityView', () => ({ default: () => <div data-testid="security-view">SecurityView Content</div> }));
vi.mock('./ScenariosView', () => ({ default: () => <div data-testid="scenarios-view">ScenariosView Content</div> }));
vi.mock('./PracticeView', () => ({ default: () => <div data-testid="practice-view">PracticeView Content</div> }));


const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('ApiDesignPage', () => {
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
    renderWithRouter(<ApiDesignPage />);
    await waitFor(() => { // Added waitFor
      expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'API Design' })).toBeInTheDocument();
    });
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'API Design Topics', level: 2 })).toBeInTheDocument(); // Corrected mock heading

    // Check for actual section titles from ApiDesignPage.jsx
    expect(screen.getByText('Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Protocols (REST, gRPC, GraphQL)')).toBeInTheDocument();
    expect(screen.getByText('Practice Questions')).toBeInTheDocument(); // Example of another actual title
  });

  it('renders the FundamentalsView by default', () => {
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', async () => { // Made async
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('fundamentals-view')).toBeInTheDocument();
    expect(screen.queryByTestId('protocols-view')).not.toBeInTheDocument();

    // Use the actual title from apiDesignSidebarSections for clicking
    fireEvent.click(screen.getByText('Protocols (REST, gRPC, GraphQL)'));

    await waitFor(() => {
      expect(screen.queryByTestId('fundamentals-view')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('protocols-view')).toBeInTheDocument();
    // The 'currentView' in the mock paragraph is the section 'id'
    expect(screen.getByText('Current View in Mock: protocols')).toBeInTheDocument();
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<ApiDesignPage />);
    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    // Default view is FundamentalsView
    expect(contentPropContent.contains(screen.getByTestId('fundamentals-view'))).toBe(true);
  });
});
