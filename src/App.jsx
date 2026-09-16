import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterRoleSelectionPage from './pages/auth/RegisterRoleSelectionPage';
import RegisterWorkerPage from './pages/auth/RegisterWorkerPage';
import RegisterEmployerPage from './pages/auth/RegisterEmployerPage';
import JobsListPage from './pages/public/JobsListPage';
import JobDetailsPage from './pages/public/JobDetailsPage';
import AboutPage from './pages/public/AboutPage';
import HowItWorksPage from './pages/public/HowItWorksPage';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerProfilePage from './pages/worker/WorkerProfilePage';
import SkillPassportPage from './pages/worker/SkillPassportPage';

// Employer Pages
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerWorkersPage from './pages/employer/EmployerWorkersPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWorkersPage from './pages/admin/AdminWorkersPage';
import AdminEmployersPage from './pages/admin/AdminEmployersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminJobsPage from './pages/admin/AdminJobsPage';

// Error Pages
import NotFoundPage from './pages/errors/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterRoleSelectionPage />} />
        <Route path="/register/worker" element={<RegisterWorkerPage />} />
        <Route path="/register/employer" element={<RegisterEmployerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/workers" element={<EmployerWorkersPage />} />
        <Route path="/employers" element={<AboutPage />} />
        <Route path="/jobs" element={<JobsListPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/training" element={<HowItWorksPage />} />
        <Route path="/contact" element={<AboutPage />} />
        
        {/* Worker Routes */}
        <Route path="/worker/dashboard" element={<ProtectedRoute requiredRole="worker"><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/worker/profile" element={<ProtectedRoute requiredRole="worker"><WorkerProfilePage /></ProtectedRoute>} />
        <Route path="/worker/skill-passport" element={<ProtectedRoute requiredRole="worker"><SkillPassportPage /></ProtectedRoute>} />
        <Route path="/worker/work-history" element={<ProtectedRoute requiredRole="worker"><SkillPassportPage /></ProtectedRoute>} />
        <Route path="/worker/certificates" element={<ProtectedRoute requiredRole="worker"><SkillPassportPage /></ProtectedRoute>} />
        <Route path="/worker/jobs" element={<ProtectedRoute requiredRole="worker"><JobsListPage /></ProtectedRoute>} />
        <Route path="/worker/applications" element={<ProtectedRoute requiredRole="worker"><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/worker/training" element={<ProtectedRoute requiredRole="worker"><HowItWorksPage /></ProtectedRoute>} />
        <Route path="/worker/benefits" element={<ProtectedRoute requiredRole="worker"><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/worker/insurance" element={<ProtectedRoute requiredRole="worker"><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/worker/settings" element={<ProtectedRoute requiredRole="worker"><WorkerProfilePage /></ProtectedRoute>} />
        
        {/* Employer Routes */}
        <Route path="/employer/dashboard" element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/profile" element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/workers" element={<ProtectedRoute requiredRole="employer"><EmployerWorkersPage /></ProtectedRoute>} />
        <Route path="/employer/workers/:id" element={<ProtectedRoute requiredRole="employer"><EmployerWorkersPage /></ProtectedRoute>} />
        <Route path="/employer/jobs" element={<ProtectedRoute requiredRole="employer"><JobsListPage /></ProtectedRoute>} />
        <Route path="/employer/post-job" element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/applications" element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/saved-workers" element={<ProtectedRoute requiredRole="employer"><EmployerWorkersPage /></ProtectedRoute>} />
        <Route path="/employer/settings" element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/workers" element={<ProtectedRoute requiredRole="admin"><AdminWorkersPage /></ProtectedRoute>} />
        <Route path="/admin/employers" element={<ProtectedRoute requiredRole="admin"><AdminEmployersPage /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute requiredRole="admin"><AdminJobsPage /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute requiredRole="admin"><AdminWorkersPage /></ProtectedRoute>} />
        <Route path="/admin/certificates" element={<ProtectedRoute requiredRole="admin"><AdminWorkersPage /></ProtectedRoute>} />
        <Route path="/admin/verification" element={<ProtectedRoute requiredRole="admin"><AdminWorkersPage /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AdminReportsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettingsPage /></ProtectedRoute>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
