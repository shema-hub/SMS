import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

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

  return (
    <>
      {user ? (
        <>
          <Navbar onLogout={handleLogout} />
          <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
            {/* Admin content goes here */}
          </div>
        </>
      ) : (
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
      )}
    </>
  );
}
