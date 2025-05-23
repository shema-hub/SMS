import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Car from './Pages/Car';
import Slot from './Pages/Slot';
import Report from './Pages/Report';
import Record from './Pages/Record';
import Payement from './Pages/Payement';

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Listen for custom event to toggle register view
    const handleShowRegister = () => setShowRegister(true);
    const handleShowLogin = () => setShowRegister(false);
    window.addEventListener('showRegister', handleShowRegister);
    window.addEventListener('showLogin', handleShowLogin);
    return () => {
      window.removeEventListener('showRegister', handleShowRegister);
      window.removeEventListener('showLogin', handleShowLogin);
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <>
        {showRegister ? (
          <Register onRegister={handleRegister} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <div className="text-center mt-4">
          {showRegister ? (
            <p>
              Already have an account?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/car" replace />} />
        <Route path="/car" element={<Car />} />
        <Route path="/slot" element={<Slot />} />
        <Route path="/report" element={<Report />} />
        <Route path="/record" element={<Record />} />
        <Route path="/payement" element={<Payement />} />
      </Routes>
    </BrowserRouter>
  );
}
