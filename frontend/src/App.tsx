import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardLayout from './components/layout/DashboardLayout';
import SportsPage from './pages/sports/SportsPage';
import ProgressPage from './pages/progress/ProgressPage';
import InvestmentsPage from './pages/investments/InvestmentsPage';
import JobPage from './pages/job/JobPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import AIPage from './pages/ai/AIPage';
import { useAuthStore } from './store/useAuthStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/sports" />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="investments" element={<InvestmentsPage />} />
          <Route path="job" element={<JobPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="ai" element={<AIPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
