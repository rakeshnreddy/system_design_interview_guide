import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatabasesPage from './DatabasesPage';
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
jest.mock('../components/databases/SectionIntroDB', () => () => <div data-testid="intro-db">IntroDB Content</div>);
jest.mock('../components/databases/SectionSqlDB', () => () => <div data-testid="sql-db">SqlDB Content</div>);
jest.mock('../components/databases/SectionNoSqlDB', () => () => <div data-testid="nosql-db">NoSqlDB Content</div>);
jest.mock('../components/databases/SectionTransactionsDB', () => () => <div data-testid="transactions-db">TransactionsDB Content</div>);
jest.mock('../components/databases/SectionReplicationDB', () => () => <div data-testid="replication-db">ReplicationDB Content</div>);
jest.mock('../components/databases/SectionShardingDB', () => () => <div data-testid="sharding-db">ShardingDB Content</div>);
jest.mock('../components/databases/SectionCapTheoremDB', () => () => <div data-testid="cap-theorem-db">CapTheoremDB Content</div>);
jest.mock('../components/databases/SectionIndexesDB', () => () => <div data-testid="indexes-db">IndexesDB Content</div>);
jest.mock('../components/databases/SectionDataModelsDB', () => () => <div data-testid="data-models-db">DataModelsDB Content</div>);
jest.mock('../components/databases/SectionUseCasesDB', () => () => <div data-testid="use-cases-db">UseCasesDB Content</div>);
jest.mock('../components/databases/SectionGlossaryDB', () => () => <div data-testid="glossary-db">GlossaryDB Content</div>);

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('DatabasesPage', () => {
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
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Databases' })).toBeInTheDocument();
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Databases', level: 2 })).toBeInTheDocument(); // From mock

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('SQL Databases')).toBeInTheDocument();
    expect(screen.getByText('Glossary')).toBeInTheDocument();
  });

  it('renders the SectionIntroDB by default', () => {
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('intro-db')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', () => {
    renderWithRouter(<DatabasesPage />);
    expect(screen.getByTestId('intro-db')).toBeInTheDocument();
    expect(screen.queryByTestId('sql-db')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('SQL Databases'));

    expect(screen.queryByTestId('intro-db')).not.toBeInTheDocument();
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
