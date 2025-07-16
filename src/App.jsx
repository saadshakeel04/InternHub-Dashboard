import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CandidatesPage from './pages/CandidatesPage';
import InternshipsPage from './pages/InternshipsPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './layouts/MainLayout';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Router>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
       <Route index element={<Navigate to="/dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="candidates" element={<CandidatesPage />} />
//             <Route path="internships" element={<InternshipsPage />} />
//             <Route path="profile" element={<ProfilePage />} />
    </Routes>
  </AuthProvider>
</Router>
  );
}
export default App;


//             path="/"
//             element={
//               <AuthRoute>
//                 <MainLayout />
//               </AuthRoute>
//             }
//           >
//             <Route index element={<Navigate to="/dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="candidates" element={<CandidatesPage />} />
//             <Route path="internships" element={<InternshipsPage />} />
//             <Route path="profile" element={<ProfilePage />} />
//           </Route>
//         </Routes>
//       </Router>