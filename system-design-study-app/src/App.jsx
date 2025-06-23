import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CustomThemeProvider, useTheme as useCustomTheme } from './contexts/ThemeContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/muiThemes';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CachesPage from './pages/CachesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DatabasesPage from './pages/DatabasesPage';
import MessagingQueuesPage from './pages/MessagingQueuesPage';
import LoadBalancingPage from './components/loadbalancing/LoadBalancingPage';
import ApiDesignPage from './components/apidesign/ApiDesignPage';
import ScalabilityConceptsPage from './components/scalabilityconcepts/ScalabilityConceptsPage';
import InterviewApproachPage from './components/interviewapproach/InterviewApproachPage';
import './styles/global.css';

// Inner component to access both Auth and CustomTheme contexts
function AppContent() {
  const { themeMode } = useCustomTheme(); // Custom hook for light/dark mode state
  const muiTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  console.log('App.jsx: Imported lightTheme from muiThemes:', lightTheme);
  console.log('App.jsx: Imported darkTheme from muiThemes:', darkTheme);
  console.log('App.jsx: Current themeMode:', themeMode);
  console.log('App.jsx: Chosen muiTheme for MuiThemeProvider:', muiTheme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Normalizes styles and applies MUI's dark background in dark mode */}
      <Router>
        <Layout> {/* Layout now has access to AuthContext and benefits from MuiThemeProvider */}
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
          </Routes>
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
