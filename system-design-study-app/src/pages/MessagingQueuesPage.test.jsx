import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessagingQueuesPage from './MessagingQueuesPage';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock child components that are not the focus of this test
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
    // This mock is what MessagingQueuesPage's SidebarComponent prop will render inside the mocked TopicPageLayout
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
vi.mock('../components/messaging_queues/IntroModuleMQ', () => ({ default: () => <div data-testid="intro-module-mq">IntroModuleMQ Content</div> }));
vi.mock('../components/messaging_queues/DeepDiveModuleMQ', () => ({ default: () => <div data-testid="deepdive-module-mq">DeepDiveModuleMQ Content</div> })); // Added DeepDive
vi.mock('../components/messaging_queues/GuaranteesModuleMQ', () => ({ default: () => <div data-testid="guarantees-module-mq">GuaranteesModuleMQ Content</div> }));
vi.mock('../components/messaging_queues/ScalabilityModuleMQ', () => ({ default: () => <div data-testid="scalability-module-mq">ScalabilityModuleMQ Content</div> }));
vi.mock('../components/messaging_queues/FrameworksModuleMQ', () => ({ default: () => <div data-testid="frameworks-module-mq">FrameworksModuleMQ Content</div> })); // Renamed TechnologyComparisonMQ
vi.mock('../components/messaging_queues/ScenariosModuleMQ', () => ({ default: () => <div data-testid="scenarios-module-mq">ScenariosModuleMQ Content</div> }));
vi.mock('../components/messaging_queues/CheatSheetModuleMQ', () => ({ default: () => <div data-testid="cheatsheet-module-mq">CheatSheetModuleMQ Content</div> })); // Added CheatSheet
vi.mock('../components/messaging_queues/PracticeModuleMQ', () => ({ default: () => <div data-testid="practice-module-mq">PracticeModuleMQ Content</div> }));


const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('MessagingQueuesPage', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders TopicPageLayout with correct title', async () => { // Made async
    renderWithRouter(<MessagingQueuesPage />);
    await waitFor(() => { // Added waitFor
      expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
      // Corrected to specify heading level
      expect(screen.getByRole('heading', { name: 'Messaging Queues', level: 1 })).toBeInTheDocument();
    });
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<MessagingQueuesPage />);
    const sidebarMock = screen.getByTestId('topic-sidebar');
    expect(sidebarMock).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Messaging Queues', level: 2 })).toBeInTheDocument(); // From mock TopicSidebar

    // Check for some section titles
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Deep Dive')).toBeInTheDocument(); // Corrected title
    expect(screen.getByText('Practice Questions')).toBeInTheDocument();
  });

  it('renders the IntroModuleMQ by default', () => {
    renderWithRouter(<MessagingQueuesPage />);
    expect(screen.getByTestId('intro-module-mq')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', async () => { // Made async
    renderWithRouter(<MessagingQueuesPage />);

    // Initial view
    expect(screen.getByTestId('intro-module-mq')).toBeInTheDocument();
    expect(screen.queryByTestId('deepdive-module-mq')).not.toBeInTheDocument(); // Corrected testid

    fireEvent.click(screen.getByText('Deep Dive')); // Corrected click target

    await waitFor(() => {
      expect(screen.queryByTestId('intro-module-mq')).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('deepdive-module-mq')).toBeInTheDocument(); // Corrected testid
    expect(screen.getByText('Current View in Mock: deepdive')).toBeInTheDocument(); // Corrected view id
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<MessagingQueuesPage />);

    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    expect(contentPropContent.contains(screen.getByTestId('intro-module-mq'))).toBe(true);
  });
});
