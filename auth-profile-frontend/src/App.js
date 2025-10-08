
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { motion } from 'framer-motion';

function App() {
  const navigate = useNavigate(); 

  return (
    <>
      <Navbar />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 to-pink-400 px-4">
              <motion.h1
                className="text-5xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Welcome to Your App
              </motion.h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')} 
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:bg-yellow-300 hover:text-white transition-all duration-300"
              >
                Get Started
              </motion.button>
            </div>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            localStorage.getItem('token') ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
