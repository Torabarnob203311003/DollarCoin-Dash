// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPageRouter from './Components/LoginPage.jsx';
import DashboardLayout from './Components/DashboardLayout.jsx';
import UserManagementPage from './Components/UserManagementPage.jsx';
import DashboardOverview from './Components/DashboardOverview.jsx';

// Placeholder for other dashboard pages
const SettingsPage = () => <div className="text-white text-xl">Settings Page under construction. ⚙️</div>;
const DashboardOverviewFallback = () => <div className="text-white text-xl">Welcome to your Dashboard Overview! 👋</div>;


// This component wraps the private routes (Dashboard)
const ProtectedRoute = ({ children, isAuthenticated }) => {
  // In a real app, 'isAuthenticated' would check your Auth context/state
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  // Simple state to simulate user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to 'true' to easily view the dashboard

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public/Authentication Routes --- */}
        
        {/* If the user hits the root, redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login, Forgot, Reset all use the same component logic */}
        <Route path="/login" element={<LoginPageRouter />} />
        <Route path="/forgot-password" element={<LoginPageRouter />} />
        <Route path="/reset-password" element={<LoginPageRouter />} />

        {/* --- Protected Dashboard Routes --- */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<DashboardOverviewFallback />} />
        </Route>
        
        {/* --- 404 Catch-all --- */}
        <Route path="*" element={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-4xl">404 | Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}