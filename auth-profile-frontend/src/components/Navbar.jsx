import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let user = null;
  const userStr = localStorage.getItem('user');
  try {
    if (userStr && userStr !== 'undefined') {
      user = JSON.parse(userStr);
    } else {
      localStorage.removeItem('user');
    }
  } catch (e) {
    console.error('Failed to parse user:', e);
    localStorage.removeItem('user');
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 shadow-lg sticky top-0 z-50"
    >
      {/* Left Section */}
      <div className="flex items-center gap-6 text-lg font-semibold">
        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Right Section */}
      {token && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {/* User Badge */}
          <span className="bg-white text-indigo-600 font-medium px-4 py-1 rounded-full shadow-md flex items-center gap-2">
            👤 {user?.name || 'User'}
          </span>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="px-4 py-2 rounded-md bg-white text-indigo-600 font-semibold hover:bg-yellow-300 hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Profile
          </Link>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
