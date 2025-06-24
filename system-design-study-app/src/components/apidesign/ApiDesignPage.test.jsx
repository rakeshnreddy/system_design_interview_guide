import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApiDesignPage from './ApiDesignPage';
import { BrowserRouter } from 'react-router-dom';

// Mock child components
jest.mock('../common/TopicPageLayout', () => ({ children, sidebar, content, topicTitle }) => (
  <div data-testid="topic-page-layout">
    <h1>{topicTitle}</h1>
    <div data-testid="sidebar-prop-content">{sidebar}</div>
    <div data-testid="content-prop-content">{content}</div>
    {children}
  </div>
));

jest.mock('../common/TopicSidebar', () => ({ topicTitle, sections, currentView, setCurrentView }) => (
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
jest.mock('./IntroApiDesign', () => () => <div data-testid="intro-api">IntroApiDesign Content</div>);
jest.mock('./RestApiModule', () => () => <div data-testid="rest-api">RestApiModule Content</div>);
jest.mock('./GraphQlModule', () => () => <div data-testid="graphql-api">GraphQlModule Content</div>);
jest.mock('./GrpcApiModule', () => () => <div data-testid="grpc-api">GrpcApiModule Content</div>);
jest.mock('./WebSocketsModule', () => () => <div data-testid="websockets-api">WebSocketsModule Content</div>);
jest.mock('./WebhooksModule', () => () => <div data-testid="webhooks-api">WebhooksModule Content</div>);
jest.mock('./SecurityApiModule', () => () => <div data-testid="security-api">SecurityApiModule Content</div>);
jest.mock('./VersioningApiModule', () => () => <div data-testid="versioning-api">VersioningApiModule Content</div>);
jest.mock('./BestPracticesApiModule', () => () => <div data-testid="best-practices-api">BestPracticesApiModule Content</div>);
jest.mock('./ScenarioApiModule', () => () => <div data-testid="scenario-api">ScenarioApiModule Content</div>);

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('ApiDesignPage', () => {
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
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('topic-page-layout')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'API Design' })).toBeInTheDocument();
  });

  it('renders TopicSidebar with correct title and sections', () => {
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('topic-sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'API Design', level: 2 })).toBeInTheDocument(); // From mock

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('RESTful APIs')).toBeInTheDocument();
    expect(screen.getByText('Interactive Scenario')).toBeInTheDocument();
  });

  it('renders the IntroApiDesign by default', () => {
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('intro-api')).toBeInTheDocument();
  });

  it('switches view when a section in TopicSidebar is clicked', () => {
    renderWithRouter(<ApiDesignPage />);
    expect(screen.getByTestId('intro-api')).toBeInTheDocument();
    expect(screen.queryByTestId('rest-api')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('RESTful APIs'));

    expect(screen.queryByTestId('intro-api')).not.toBeInTheDocument();
    expect(screen.getByTestId('rest-api')).toBeInTheDocument();
    expect(screen.getByText('Current View in Mock: rest')).toBeInTheDocument();
  });

  it('passes the Sidebar and Content to TopicPageLayout', () => {
    renderWithRouter(<ApiDesignPage />);
    const sidebarPropContent = screen.getByTestId('sidebar-prop-content');
    expect(sidebarPropContent.contains(screen.getByTestId('topic-sidebar'))).toBe(true);

    const contentPropContent = screen.getByTestId('content-prop-content');
    expect(contentPropContent.contains(screen.getByTestId('intro-api'))).toBe(true);
  });
});
