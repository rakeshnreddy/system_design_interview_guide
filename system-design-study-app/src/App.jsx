import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CachesPage from './pages/CachesPage';
import DatabasesPage from './pages/DatabasesPage';
import MessagingQueuesPage from './pages/MessagingQueuesPage';
import LoadBalancingPage from './components/loadbalancing/LoadBalancingPage'; // Added import
import ApiDesignPage from './components/apidesign/ApiDesignPage'; // Added import
import ScalabilityConceptsPage from './components/scalabilityconcepts/ScalabilityConceptsPage'; // Added import
import InterviewApproachPage from './components/interviewapproach/InterviewApproachPage'; // Added import
import './styles/global.css'; // If you add global styles

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/caches" element={<CachesPage />} />
          <Route path="/databases" element={<DatabasesPage />} />
          <Route path="/messaging-queues" element={<MessagingQueuesPage />} />
          <Route path="/load-balancing" element={<LoadBalancingPage />} /> {/* Added route */}
          <Route path="/api-design" element={<ApiDesignPage />} /> {/* Added route */}
          <Route path="/scalability-concepts" element={<ScalabilityConceptsPage />} /> {/* Added route */}
          <Route path="/interview-approach" element={<InterviewApproachPage />} /> {/* Added route */}
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
