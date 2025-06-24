import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatabasesPage from './DatabasesPage';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock child components
vi.mock('../components/common/TopicPageLayout', () => ({
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

vi.mock('../components/common/TopicSidebar', () => ({
  default: ({ topicTitle, sections, currentView, setCurrentView }) => (
    // This mock is what DatabasesPage's SidebarComponent prop will render inside the mocked TopicPageLayout
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
vi.mock('../components/databases/SectionIntroDB', () => ({ default: () => <div data-testid="intro-db">IntroDB Content</div> }));
vi.mock('../components/databases/SectionSqlDB', () => ({ default: () => <div data-testid="sql-db">SqlDB Content</div> }));
vi.mock('../components/databases/SectionNoSqlDB', () => ({ default: () => <div data-testid="nosql-db">NoSqlDB Content</div> })); // Assuming this mock might exist if tested
vi.mock('../components/databases/SectionTransactionsDB', () => ({ default: () => <div data-testid="transactions-db">TransactionsDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionReplicationDB', () => ({ default: () => <div data-testid="replication-db">ReplicationDB Content</div> }));
vi.mock('../components/databases/SectionShardingDB', () => ({ default: () => <div data-testid="sharding-db">ShardingDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionCapTheoremDB', () => ({ default: () => <div data-testid="cap-theorem-db">CapTheoremDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionIndexesDB', () => ({ default: () => <div data-testid="indexes-db">IndexesDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionDataModelsDB', () => ({ default: () => <div data-testid="data-models-db">DataModelsDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionUseCasesDB', () => ({ default: () => <div data-testid="use-cases-db">UseCasesDB Content</div> })); // Assuming this mock might exist
vi.mock('../components/databases/SectionGlossaryDB', () => ({ default: () => <div data-testid="glossary-db">GlossaryDB Content</div> })); // Assuming this mock might exist


const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('DatabasesPage', () => {
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
    renderWithRouter(<DatabasesPage />);
    await waitFor(() => { // Added waitFor
      expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
      // Corrected to match pageTitle prop
      expect(screen.getByRole('heading', { name: 'Databases Deep Dive' })).toBeInTheDocument();
    });
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    // Corrected to match topicTitle prop in SidebarComponentWithProps
    expect(screen.getByRole('heading', { name: 'Database Topics', level: 2 })).toBeInTheDocument();

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    // Corrected to match actual section titles
    expect(screen.getByText('Relational (SQL)')).toBeInTheDocument();
    expect(screen.getByText('DB Comparison Summary')).toBeInTheDocument();
  });

  it('renders the SectionIntroDB by default', () => {
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('intro-db')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', async () => { // Made async
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('intro-db')).toBeInTheDocument();
    expect(screen.queryByTestId('sql-db')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Relational (SQL)')); // Corrected click target

    await waitFor(() => {
      expect(screen.queryByTestId('intro-db')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('sql-db')).toBeInTheDocument();
    expect(screen.getByText('Current View in Mock: sql')).toBeInTheDocument();
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<DatabasesPage />);
    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    expect(contentPropContent.contains(screen.getByTestId('intro-db'))).toBe(true);
  });
});
