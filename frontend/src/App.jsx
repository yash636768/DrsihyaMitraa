import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';
import LabelFaces from './pages/LabelFaces';
import ChatInterface from './pages/ChatInterface';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

// Wrapper for layout that includes Sidebar
const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout><Dashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <DashboardLayout><Upload /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/gallery" element={
            <ProtectedRoute>
              <DashboardLayout><Gallery /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/label" element={
            <ProtectedRoute>
              <DashboardLayout><LabelFaces /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <DashboardLayout><ChatInterface /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout><Settings /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
