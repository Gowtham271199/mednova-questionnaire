import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Questionnaire from './components/Questionnaire';
import Navbar from './components/Navbar';
import Feedback from './components/Feedback';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import './App.css';

const AppRoutes = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Always show the login page at the root path */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Protect the routes that require authentication */}
        <Route path="/questionnaire" element={<PrivateRoute element={Questionnaire} />} />
        <Route path="/feedback" element={<PrivateRoute element={Feedback} />} />
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
