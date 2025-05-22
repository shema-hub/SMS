import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
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
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}
