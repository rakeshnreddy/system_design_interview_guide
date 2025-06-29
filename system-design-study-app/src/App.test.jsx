import { render, screen, waitFor, act } from '@testing-library/react'; // Added act
import { MemoryRouter } from 'react-router-dom';
import App from './App';

import { vi } from 'vitest';

// Mock the individual page components to control their loading behavior for testing Suspense
// We are testing App.jsx, so we mock its direct dependencies (the pages)
vi.mock('./pages/HomePage', () => ({ default: () => <div>Mocked HomePage</div> }));
vi.mock('./pages/CachesPage', () => ({ default: () => <div>Mocked CachesPage</div> }));
vi.mock('./pages/LoginPage', () => ({ default: () => <div>Mocked LoginPage</div> }));
vi.mock('./pages/SignupPage', () => ({ default: () => <div>Mocked SignupPage</div> }));
vi.mock('./pages/DatabasesPage', () => ({ default: () => <div>Mocked DatabasesPage</div> }));
vi.mock('./pages/MessagingQueuesPage', () => ({ default: () => <div>Mocked MessagingQueuesPage</div> }));
vi.mock('./components/loadbalancing/LoadBalancingPage', () => ({ default: () => <div>Mocked LoadBalancingPage</div> }));
vi.mock('./components/apidesign/ApiDesignPage', () => ({ default: () => <div>Mocked ApiDesignPage</div> }));
vi.mock('./components/scalabilityconcepts/ScalabilityConceptsPage', () => ({ default: () => <div>Mocked ScalabilityConceptsPage</div> }));
vi.mock('./components/interviewapproach/InterviewApproachPage', () => ({ default: () => <div>Mocked InterviewApproachPage</div> }));
vi.mock('./pages/AllTopicsPage.jsx', () => ({ default: () => <div>Mocked AllTopicsPage</div> }));
vi.mock('./pages/TopicDetailPage', () => ({ default: () => <div>Mocked TopicDetailPage</div> }));
vi.mock('./pages/GlossaryPage', () => ({ default: () => <div>Mocked GlossaryPage</div> }));
vi.mock('./pages/CaseStudiesPage', () => ({ default: () => <div>Mocked CaseStudiesPage</div> }));
vi.mock('./pages/CaseStudyDetailPage', () => ({ default: () => <div>Mocked CaseStudyDetailPage</div> }));
vi.mock('./pages/InterviewFrameworksPage', () => ({ default: () => <div>Mocked InterviewFrameworksPage</div> }));
vi.mock('./pages/TradeOffAnalysisPage', () => ({ default: () => <div>Mocked TradeOffAnalysisPage</div> }));


describe('App', () => {
  const renderAppWithRoute = (route = '/') => {
    // App.jsx now internally handles BrowserRouter, so for testing specific routes
    // with lazy loading, we need to ensure the test environment can manage history.
    // However, App itself creates BrowserRouter. For isolated route testing for App's content,
    // we'd typically mock navigation or test child components that use useRoutes/Outlet.
    // Since App wraps everything in its own Router, we render App directly.
    // To control the initial route for testing, we'd ideally pass initialEntries to a MemoryRouter *inside* App,
    // or refactor App to accept a router for more testability.
    // For now, we'll rely on the default route and navigation for broad checks.
    // Let's wrap App in MemoryRouter for testing specific route navigations if needed,
    // but App.jsx already includes <Router>. This can cause issues.
    // The best approach is to test navigation by simulating clicks if App uses its own BrowserRouter.

    // Correct approach: App.jsx has its own BrowserRouter.
    // To test specific routes, we need to navigate.
    // Or, for unit testing App's routing logic, we can wrap its <Routes> part in MemoryRouter.
    // Let's test the lazy loading behavior. We expect the spinner to show first.

    // We will use MemoryRouter here to control the initial entry for each test,
    // and we need to ensure App's internal BrowserRouter doesn't conflict.
    // The provided App.jsx already uses BrowserRouter. For these tests,
    // it's simpler to let App render as is and use user interactions to navigate,
    // or to modify App to accept a history object for testing.
    // Given the constraints, we'll render App and check for suspense behavior.
    // The mocks above will ensure that the actual page components are replaced by simple divs.

    window.history.pushState({}, 'Test page', route); // Navigate to the specified route
    return render(<App />);
  };

  it('renders the loading spinner and then the HomePage', async () => {
    renderAppWithRoute('/');
    // Check for the loading spinner (CircularProgress is used)
    // MUI's CircularProgress has role="progressbar"
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for the HomePage to load (mocked content)
    expect(await screen.findByText('Mocked HomePage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the CachesPage when navigated', async () => {
    // This test assumes navigation from home or direct load, covered by App's router.
    // For a direct load test of a specific route with lazy components,
    // the App component's internal router will handle it.
    renderAppWithRoute('/caches');

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for the CachesPage to load (mocked content)
    expect(await screen.findByText('Mocked CachesPage')).toBeInTheDocument();
  });

  it('renders layout elements like the sidebar', async () => { // Made test async
    await act(async () => {
      renderAppWithRoute('/');
    });
    // Check for a common layout element, e.g., a header navigation link from the new Layout.
    // The old test looked for "Caching Strategies" (likely from a sidebar).
    // The new Layout has "Home", "Topics", "About", "Contact" in the header.
    // We also need to wait for HomePage to load before checking layout elements around it.
    expect(await screen.findByText('Mocked HomePage')).toBeInTheDocument(); // Ensure page content is loaded
    expect(screen.getByRole('button', { name: /Topics/i })).toBeInTheDocument(); // Check for new header link
  });

  it('renders the loading spinner and then the AllTopicsPage when navigated', async () => {
    renderAppWithRoute('/topics');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked AllTopicsPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the TopicDetailPage when navigated', async () => {
    renderAppWithRoute('/topic/sample');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked TopicDetailPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the GlossaryPage when navigated', async () => {
    renderAppWithRoute('/glossary');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked GlossaryPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the CaseStudiesPage when navigated', async () => {
    renderAppWithRoute('/case-studies');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked CaseStudiesPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the CaseStudyDetailPage when navigated', async () => {
    renderAppWithRoute('/case-studies/sample');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked CaseStudyDetailPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the InterviewFrameworksPage when navigated', async () => {
    renderAppWithRoute('/interview-frameworks');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked InterviewFrameworksPage')).toBeInTheDocument();
  });

  it('renders the loading spinner and then the TradeOffAnalysisPage when navigated', async () => {
    renderAppWithRoute('/trade-off-analysis');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Mocked TradeOffAnalysisPage')).toBeInTheDocument();
  });
});
