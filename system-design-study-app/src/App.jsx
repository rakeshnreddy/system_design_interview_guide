import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CustomThemeProvider, useTheme as useCustomTheme } from './contexts/ThemeContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/muiThemes';
import Layout from './components/Layout';
import LoadingSpinner from './components/common/LoadingSpinner'; // Import the loading spinner
import './styles/global.css';

// Dynamically import page components
const HomePage = lazy(() => import('./pages/HomePage'));
const CachesPage = lazy(() => import('./pages/CachesPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DatabasesPage = lazy(() => import('./pages/DatabasesPage'));
const MessagingQueuesPage = lazy(() => import('./pages/MessagingQueuesPage'));
const LoadBalancingPage = lazy(() => import('./components/loadbalancing/LoadBalancingPage'));
const ApiDesignPage = lazy(() => import('./components/apidesign/ApiDesignPage'));
const ScalabilityConceptsPage = lazy(() => import('./components/scalabilityconcepts/ScalabilityConceptsPage'));
const InterviewApproachPage = lazy(() => import('./components/interviewapproach/InterviewApproachPage'));
const AllTopicsPage = lazy(() => import('./pages/AllTopicsPage.jsx')); // Renamed from TopicsListPage
const TopicDetailPage = lazy(() => import('./pages/TopicDetailPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const InterviewFrameworksPage = lazy(() => import('./pages/InterviewFrameworksPage'));
const TradeOffAnalysisPage = lazy(() => import('./pages/TradeOffAnalysisPage'));

// Inner component to access both Auth and CustomTheme contexts
function AppContent() {
  const { themeMode } = useCustomTheme(); // Custom hook for light/dark mode state
  const muiTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Normalizes styles and applies MUI's dark background in dark mode */}
      <Router>
        <Layout> {/* Layout now has access to AuthContext and benefits from MuiThemeProvider */}
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/caches" element={<CachesPage />} />
              <Route path="/databases" element={<DatabasesPage />} />
              <Route path="/messaging-queues" element={<MessagingQueuesPage />} />
              <Route path="/load-balancing" element={<LoadBalancingPage />} />
              <Route path="/api-design" element={<ApiDesignPage />} />
              <Route path="/scalability-concepts" element={<ScalabilityConceptsPage />} />
              <Route path="/interview-approach" element={<InterviewApproachPage />} />
              <Route path="/topics" element={<AllTopicsPage />} /> {/* Use AllTopicsPage */}
              <Route path="/topic/:topicId" element={<TopicDetailPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:caseStudyId" element={<CaseStudyDetailPage />} />
              <Route path="/interview-frameworks" element={<InterviewFrameworksPage />} />
              <Route path="/trade-off-analysis" element={<TradeOffAnalysisPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </AuthProvider>
  );
}
export default App;
