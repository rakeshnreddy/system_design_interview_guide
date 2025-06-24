import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessagingQueuesPage from './MessagingQueuesPage';
import { BrowserRouter } from 'react-router-dom';

// Mock child components that are not the focus of this test
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
jest.mock('../components/messaging_queues/IntroModuleMQ', () => () => <div data-testid="intro-module-mq">IntroModuleMQ Content</div>);
jest.mock('../components/messaging_queues/ConceptsModuleMQ', () => () => <div data-testid="concepts-module-mq">ConceptsModuleMQ Content</div>);
jest.mock('../components/messaging_queues/ArchitecturesModuleMQ', () => () => <div data-testid="architectures-module-mq">ArchitecturesModuleMQ Content</div>);
jest.mock('../components/messaging_queues/GuaranteesModuleMQ', () => () => <div data-testid="guarantees-module-mq">GuaranteesModuleMQ Content</div>);
jest.mock('../components/messaging_queues/UseCasesModuleMQ', () => () => <div data-testid="usecases-module-mq">UseCasesModuleMQ Content</div>);
jest.mock('../components/messaging_queues/TechnologyComparisonMQ', () => () => <div data-testid="tech-comparison-module-mq">TechnologyComparisonMQ Content</div>);
jest.mock('../components/messaging_queues/ScalabilityModuleMQ', () => () => <div data-testid="scalability-module-mq">ScalabilityModuleMQ Content</div>);
jest.mock('../components/messaging_queues/ScenariosModuleMQ', () => () => <div data-testid="scenarios-module-mq">ScenariosModuleMQ Content</div>);
jest.mock('../components/messaging_queues/PracticeModuleMQ', () => () => <div data-testid="practice-module-mq">PracticeModuleMQ Content</div>);

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('MessagingQueuesPage', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders TopicPageLayout with correct title', () => {
    renderWithRouter(<MessagingQueuesPage />);
    expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Messaging Queues' })).toBeInTheDocument();
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<MessagingQueuesPage />);
    const sidebarMock = screen.getByTestId('topic-sidebar');
    expect(sidebarMock).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Messaging Queues', level: 2 })).toBeInTheDocument(); // From mock TopicSidebar

    // Check for some section titles
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Core Concepts')).toBeInTheDocument();
    expect(screen.getByText('Practice Questions')).toBeInTheDocument();
  });

  it('renders the IntroModuleMQ by default', () => {
    renderWithRouter(<MessagingQueuesPage />);
    expect(screen.getByTestId('intro-module-mq')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', () => {
    renderWithRouter(<MessagingQueuesPage />);

    // Initial view
    expect(screen.getByTestId('intro-module-mq')).toBeInTheDocument();
    expect(screen.queryByTestId('concepts-module-mq')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Core Concepts'));

    expect(screen.queryByTestId('intro-module-mq')).not.toBeInTheDocument();
    expect(screen.getByTestId('concepts-module-mq')).toBeInTheDocument();
    expect(screen.getByText('Current View in Mock: core-concepts')).toBeInTheDocument();
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<MessagingQueuesPage />);

    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    expect(contentPropContent.contains(screen.getByTestId('intro-module-mq'))).toBe(true);
  });
});
