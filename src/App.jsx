import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Ensure .jsx extension
import LoginPage from './pages/LoginPage.jsx'; // Ensure .jsx extension
import Dashboard from './pages/Dashboard.jsx'; // Ensure .jsx extension
import CandidatesPage from './pages/CandidatesPage.jsx'; // Ensure .jsx extension
import InternshipsPage from './pages/InternshipsPage.jsx'; // Ensure .jsx extension
import ProfilePage from './pages/ProfilePage.jsx'; // Ensure .jsx extension
import MainLayout from './layouts/MainLayout.jsx'; // Ensure .jsx extension
import AuthRoute from './components/AuthRoute.jsx'; // Corrected import to match component name

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         <Route path="/login" element={<LoginPage />} />  
          <Route
            path="/"
            element={
              <AuthRoute> 
                <MainLayout />
              </AuthRoute>
            }
          >

            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="internships" element={<InternshipsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
