import React from 'react';
import { Outlet,Link } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        onLogout();
      } else {
        alert('Logout failed');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/Home">Home</Link>
      <Link to="/Car">Car</Link>
      <Link to="/Slot">Slot</Link>
      <Link to="/Record">Record</Link>
      <Link to="/Payment">Payement</Link>
      <Link to="/Report">Report</Link>


      <button
        onClick={handleLogout}
        className="bg-gray-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
