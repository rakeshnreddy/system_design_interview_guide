import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CachesPage from './pages/CachesPage';
import DatabasesPage from './pages/DatabasesPage';
import MessagingQueuesPage from './pages/MessagingQueuesPage';
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
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
